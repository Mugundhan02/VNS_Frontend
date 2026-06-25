export interface LoginRequest {
  userName: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  userName: string;
  companyName: string;
}

export interface RegisterRequest {
  companyName: string;
  userName: string;
  emailId: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterResponse {
  companyUserId: number;
  userName: string;
  password: string;
  companyName: string;
}

export interface ForgotPasswordRequest {
  emailId: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface AuthUser {
  userName: string;
  companyName: string;
  role: string;
}
