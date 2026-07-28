import Cookies from "js-cookie";
import { apiClient } from "@/lib/api/client";
import type {
  ConfirmLoginRequest,
  ConfirmLoginResponse,
  LoginRequest,
  LoginResponse,
  ResendLoginVerificationCodeRequest,
  ResendLoginVerificationCodeResponse,
} from "@/types/api/auth";

function storeAuthTokens(accessToken: string, refreshToken: string) {
  Cookies.set("token", accessToken, { expires: 7 });
  Cookies.set("refreshToken", refreshToken, { expires: 7 });
}

export async function login(payload: LoginRequest): Promise<LoginResponse> {
  const result = await apiClient<LoginResponse>("/auth/login", {
    method: "POST",
    body: payload,
  });

  if (!result.requiresTwoFactor && result.accessToken && result.refreshToken) {
    storeAuthTokens(result.accessToken, result.refreshToken);
  }

  return result;
}

export async function confirmLogin(
  payload: ConfirmLoginRequest,
): Promise<ConfirmLoginResponse> {
  const result = await apiClient<ConfirmLoginResponse>("/auth/confirm-login", {
    method: "POST",
    body: payload,
  });

  storeAuthTokens(result.accessToken, result.refreshToken);

  return result;
}

export async function resendLoginVerificationCode(
  payload: ResendLoginVerificationCodeRequest,
): Promise<ResendLoginVerificationCodeResponse> {
  return apiClient<ResendLoginVerificationCodeResponse>(
    "/auth/resend-login-code",
    {
      method: "POST",
      body: payload,
    },
  );
}
