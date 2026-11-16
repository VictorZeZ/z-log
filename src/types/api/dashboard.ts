import type { UserLevel } from "@/types/api/account";

export type DashboardProfileResponse = {
  id: string;
  fullName: string;
  level: UserLevel;
  isEmailConfirmed: boolean;
  twoFactorEnabled: boolean;
  createdAt: string;
};

export type PostOverviewResponse = {
  totalCount: number;
  draftCount: number;
  pendingApprovalCount: number;
  publishedCount: number;
  rejectedCount: number;
  totalViewCount: number;
};

export type UserLevelTotalsResponse = {
  normalCount: number;
  authorCount: number;
  adminCount: number;
  ownerCount: number;
};

export type UserOverviewResponse = {
  totalCount: number;
  levels: UserLevelTotalsResponse;
  activeCount: number;
  bannedCount: number;
  deletedCount: number;
  emailConfirmedCount: number;
  emailUnconfirmedCount: number;
  twoFactorEnabledCount: number;
};

export type CategoryOverviewResponse = {
  totalCount: number;
  activeCount: number;
  deletedCount: number;
};

export type SiteOverviewResponse = {
  posts: PostOverviewResponse;
  users: UserOverviewResponse;
  categories: CategoryOverviewResponse;
};

export type GetDashboardOverviewResponse = {
  profile: DashboardProfileResponse;
  myPosts: PostOverviewResponse;
  // Present only when the caller is Admin or Owner.
  site: SiteOverviewResponse | null;
};

export type TriStateFilter = "All" | "Yes" | "No";

export type PostStatusTotalsResponse = {
  draftCount: number;
  pendingApprovalCount: number;
  publishedCount: number;
  rejectedCount: number;
};

export type PostDailyCountResponse = PostStatusTotalsResponse & {
  date: string;
  totalCount: number;
};

export type PostsDailyReportResponse = {
  from: string;
  to: string;
  categoryId: string | null;
  authorId: string | null;
  totalCount: number;
  statusTotals: PostStatusTotalsResponse;
  days: PostDailyCountResponse[];
};

export type UserDailyCountResponse = UserLevelTotalsResponse & {
  date: string;
  registeredCount: number;
  bannedCount: number;
  deletedCount: number;
};

export type UsersDailyReportResponse = {
  from: string;
  to: string;
  emailConfirmed: TriStateFilter;
  twoFactorEnabled: TriStateFilter;
  registeredCount: number;
  bannedCount: number;
  deletedCount: number;
  levelTotals: UserLevelTotalsResponse;
  days: UserDailyCountResponse[];
};

export type CategoryDailyCountResponse = {
  date: string;
  createdCount: number;
  deletedCount: number;
};

export type CategoriesDailyReportResponse = {
  from: string;
  to: string;
  createdCount: number;
  deletedCount: number;
  days: CategoryDailyCountResponse[];
};

export type GetMySessionsResponse = {
  id: string;
  deviceInfo: string;
  isCurrent: boolean;
  createdAt: string;
  expiresAt: string;
};

export type RevokeSessionResponse = {
  success: boolean;
};

export type PostsReportFilters = {
  categoryId?: string;
  authorId?: string;
};