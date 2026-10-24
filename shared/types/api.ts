export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
  };
}

export type ApiErrorCode =
  | 'VALIDATION_ERROR'
  | 'DUPLICATE_ACCOUNT'
  | 'INVALID_CREDENTIALS'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'EXPIRED_TOKEN'
  | 'INVALID_TOKEN'
  | 'RATE_LIMITED'
  | 'NOT_FOUND'
  | 'SERVER_ERROR';
