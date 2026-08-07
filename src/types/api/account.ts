export enum UserLevel {
  Normal = 0,
  Author = 1,
  Admin = 2,
  Owner = 3,
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
