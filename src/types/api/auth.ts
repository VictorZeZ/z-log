export type RegisterRequest = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export type RegisterResponse = {
  id: string;
  email: string;
  expiryMinutes: number;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  requiresTwoFactor: boolean;
  challengeId: string | null;
  accessToken: string | null;
  refreshToken: string | null;
};

export type LogoutRequest = {
  refreshToken: string;
};

export type LogoutResponse = {
  success: boolean;
};

export type RefreshTokenRequest = {
  refreshToken: string;
};

export type RefreshTokenResponse = {
  accessToken: string;
  refreshToken: string;
};

export type ConfirmEmailRequest = {
  email: string;
  code: string;
};

export type ConfirmEmailResponse = {
  id: string;
  email: string;
  fullName: string;
  accessToken: string;
  refreshToken: string;
};

export type ConfirmLoginRequest = {
  challengeId: string;
  code: string;
};

export type ConfirmLoginResponse = {
  accessToken: string;
  refreshToken: string;
};

export type ForgotPasswordRequest = {
  email: string;
};

export type ForgotPasswordResponse = {
  success: boolean;
};

export type ResetPasswordRequest = {
  email: string;
  code: string;
  newPassword: string;
};

export type ResetPasswordResponse = {
  success: boolean;
};

export type ResendLoginVerificationCodeRequest = {
  challengeId: string;
};

export type ResendLoginVerificationCodeResponse = {
  success: boolean;
  challengeId: string;
  expiresAt: string;
};
