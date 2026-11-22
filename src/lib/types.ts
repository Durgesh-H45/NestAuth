export interface UserProfile {
  id: number;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export interface SignupPayload {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  details?: string[] | string;
  coldStart?: boolean;
  durationMs?: number;
}
