import { apiClient } from "@/lib/api/client";
import type { GetUserByIdResponse } from "@/types/api/account";

export async function getCurrentUser(): Promise<GetUserByIdResponse> {
  return apiClient<GetUserByIdResponse>("/account/me", {
    method: "GET",
  });
}
