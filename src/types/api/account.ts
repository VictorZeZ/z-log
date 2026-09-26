export enum UserLevel {
  Normal = "Normal",
  Author = "Author",
  Admin = "Admin",
  Owner = "Owner",
}

const USER_LEVEL_RANK: Record<UserLevel, number> = {
  [UserLevel.Normal]: 0,
  [UserLevel.Author]: 1,
  [UserLevel.Admin]: 2,
  [UserLevel.Owner]: 3,
};

// UserLevel is no longer numeric (the backend now serializes enums by name),
// so ordinal comparisons must go through this rank map instead of `>=`.
export function isUserLevelAtLeast(
  level: UserLevel,
  minimum: UserLevel,
): boolean {
  return USER_LEVEL_RANK[level] >= USER_LEVEL_RANK[minimum];
}

export const userLevelLabels: Record<UserLevel, string> = {
  [UserLevel.Normal]: "Normal",
  [UserLevel.Author]: "Author",
  [UserLevel.Admin]: "Admin",
  [UserLevel.Owner]: "Owner",
};

export type GetUserByIdResponse = {
  id: string;
  email: string;
  fullName: string;
  level: UserLevel;
  isBanned: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string | null;
};
