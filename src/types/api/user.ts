import type { UserLevel } from "@/types/api/account";
import type { PagedResult } from "@/types/api/common";

export type UserSearchResult = {
  id: string;
  fullName: string;
  // Only present for Admin and Owner callers.
  email: string | null;
  level: UserLevel;
  createdAt: string;
  publishedPostsCount: number;
  totalViewCount: number;
};

export type UserSearchResultsPage = PagedResult<UserSearchResult> & {
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type SearchUsersParams = {
  term: string;
  page: number;
  pageSize: number;
};

export type GetUserDetailsResponse = {
  id: string;
  email: string;
  fullName: string;
  level: UserLevel;
  isBanned: boolean;
  isDeleted: boolean;
  isEmailConfirmed: boolean;
  twoFactorEnabled: boolean;
  createdAt: string;
  updatedAt: string | null;
};
