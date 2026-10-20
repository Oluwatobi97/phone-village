# API Specification
The endpoints below are candidates, not proof of existing routes. Confirm the API framework and payload/error conventions first.

Candidate public operations:
- search/list/paginate listings
- fetch listing details
- fetch public seller or dealer profile and active listings

Candidate authenticated operations:
- register/sign in/out/current user under approved auth
- create/update/archive own listings
- manage favourites
- enquiries/messages or offers if approved
- submit reports
- moderator actions with server-side role checks

Validate path/query/body server-side. Bound pagination. Return only public fields. Enforce ownership and role permissions for protected actions. Rate-limit abuse-prone operations. Return safe errors without stack traces. Never trust client-supplied IDs, roles, prices, or ownership. Contract changes must update the spec, shared types, handlers, clients, tests, and changelog as applicable.
