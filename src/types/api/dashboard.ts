import type { DailyCount } from "@/types/api/common";
import type { UserLevel } from "@/types/api/account";
import type { PostSummaryResponse } from "@/types/api/post";

export type DashboardScope = "mine" | "site";

export type PostStatusDailyCount = {
  date: string;
  draftCount: number;
  pendingApprovalCount: number;
  publishedCount: number;
  rejectedCount: number;
};

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
  dailyBreakdown: PostStatusDailyCount[];
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
export type SiteContentResponse = {
  draftCount: number;
  pendingApprovalCount: number;
  publishedCount: number;
  rejectedCount: number;
  totalViewCount: number;
  dailyBreakdown: PostStatusDailyCount[];
};

// Present only when the caller is Admin/Owner (elevated).
export type PlatformStatsResponse = {
  totalUserCount: number;
  bannedUserCount: number;
  totalPostCount: number;
  totalViewCount: number;
  registrationsPerDay: DailyCount[];
  topPosts: PostSummaryResponse[];
  topAuthors: {
    authorId: string;
    fullName: string;
    postCount: number;
    totalViewCount: number;
  }[];
};

// Present only when the caller is exactly Owner level.
export type OwnerOverviewResponse = {
  normalCount: number;
  authorCount: number;
  adminCount: number;
  ownerCount: number;
};

export type GetDashboardResponse = {
  from: string;
  to: string;
  profile: DashboardProfileResponse;
  myContent: MyContentResponse;
  authorInsights: AuthorInsightsResponse | null;
  moderationQueue: ModerationQueueResponse | null;
  siteContent: SiteContentResponse | null;
  platformStats: PlatformStatsResponse | null;
  ownerOverview: OwnerOverviewResponse | null;
};
