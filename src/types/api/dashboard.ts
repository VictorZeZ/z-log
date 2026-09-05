import type { DailyCount } from "@/types/api/common";
import type { UserLevel } from "@/types/api/account";

export type DashboardProfileResponse = {
  id: string;
  fullName: string;
  level: UserLevel;
  isEmailConfirmed: boolean;
  twoFactorEnabled: boolean;
  createdAt: string;
};

export type MyContentResponse = {
  draftCount: number;
  pendingApprovalCount: number;
  publishedCount: number;
  rejectedCount: number;
  totalViewCount: number;
};

// Present only when the caller is Author level or higher.
export type AuthorInsightsResponse = {
  postsPerDay: DailyCount[];
};

// Present only when the caller is Admin/Owner (elevated).
export type ModerationQueueResponse = {
  pendingApprovalCount: number;
  activeCategoryCount: number;
};

// Present only when the caller is Admin/Owner (elevated).
export type PlatformStatsResponse = {
  totalUserCount: number;
  bannedUserCount: number;
  totalPostCount: number;
  totalViewCount: number;
  registrationsPerDay: DailyCount[];
};

// Present only when the caller is exactly Owner level.
export type OwnerOverviewResponse = {
  normalCount: number;
  authorCount: number;
  adminCount: number;
  ownerCount: number;
};

export type GetDashboardResponse = {
  profile: DashboardProfileResponse;
  myContent: MyContentResponse;
  authorInsights: AuthorInsightsResponse | null;
  moderationQueue: ModerationQueueResponse | null;
  platformStats: PlatformStatsResponse | null;
  ownerOverview: OwnerOverviewResponse | null;
};
