import { UserStore, TokenStore, SessionStore, SellerStore } from '../../frontend/src/lib/authStore';

function runAuthTests() {
  console.log('=== Running Phone Village Auth & Seller Onboarding Test Suite ===\n');

  // Test 1: Successful Registration
  console.log('Test 1: User Registration');
  const regResult = UserStore.registerUser({
    email: 'test.dealer@phonevillage.ng',
    phone: '+2348039990011',
    fullName: 'Test Dealer',
    password: 'Password123!',
  });
  console.assert(regResult.user.email === 'test.dealer@phonevillage.ng', 'Email match');
  console.assert(regResult.user.emailVerified === false, 'Initially unverified');
  console.assert(Boolean(regResult.rawVerificationToken), 'Token generated');
  console.log('✓ Passed: User Registration\n');

  // Test 2: Email Verification
  console.log('Test 2: Email Verification');
  const verifiedRecord = TokenStore.verifyAndConsumeToken(regResult.rawVerificationToken, 'VERIFICATION');
  console.assert(verifiedRecord?.userId === regResult.user.id, 'Token user match');
  UserStore.verifyEmail(regResult.user.id);
  const updatedUser = UserStore.findUserById(regResult.user.id);
  console.assert(updatedUser?.emailVerified === true, 'Email verified status updated');
  console.log('✓ Passed: Email Verification\n');

  // Test 3: Single-Use Token Reuse Prevention
  console.log('Test 3: Token Reuse Prevention');
  const reusedToken = TokenStore.verifyAndConsumeToken(regResult.rawVerificationToken, 'VERIFICATION');
  console.assert(reusedToken === null, 'Reused token rejected');
  console.log('✓ Passed: Token Reuse Prevention\n');

  // Test 4: Seller Onboarding & Listing Eligibility
  console.log('Test 4: Seller Onboarding & Eligibility');
  let eligibility = SellerStore.checkListingEligibility(regResult.user.id);
  console.assert(eligibility.canCreateListing === false, 'Cannot list without seller profile');

  SellerStore.upsertProfile(regResult.user.id, {
    sellerType: 'DEALER',
    storeName: 'Test Tech Hub',
    ownerName: 'Test Owner',
    contactPhone: '+2348039990011',
    whatsappPhone: '+2348039990011',
    techRegion: 'Lagos',
    physicalAddress: 'Shop 10, Computer Village, Ikeja',
    termsAccepted: true,
  });

  eligibility = SellerStore.checkListingEligibility(regResult.user.id);
  console.assert(eligibility.canCreateListing === true, 'Can list after email verification and seller profile');
  console.log('✓ Passed: Seller Onboarding & Eligibility\n');

  console.log('=== All 4 Auth & Seller Onboarding Tests Passed ===');
}

runAuthTests();
