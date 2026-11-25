import { apiClient } from "@/lib/api/client";
import type {
  GetUserDetailsResponse,
  SearchUsersParams,
  UserSearchResultsPage,
} from "@/types/api/user";

export async function searchUsers({
  term,
  page,
  pageSize,
}: SearchUsersParams): Promise<UserSearchResultsPage> {
  const params = new URLSearchParams({
    term,
    page: String(page),
    pageSize: String(pageSize),
  });

  return apiClient<UserSearchResultsPage>(
    `/users/search?${params.toString()}`,
    { method: "GET" },
  );
}

export async function getUserDetails(
  userId: string,
): Promise<GetUserDetailsResponse> {
  return apiClient<GetUserDetailsResponse>(
    `/admin/users/${encodeURIComponent(userId)}`,
    { method: "GET" },
  );
}
