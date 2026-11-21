import type { PagedResult } from "@/types/api/common";
import type { TriStateFilter } from "@/types/api/dashboard";
import type { PostStatus } from "@/types/api/post";

export type GetAllCategoriesResponse = {
  id: string;
  name: string;
  slug: string;
};

export enum CategorySortBy {
  Newest = "Newest",
  Oldest = "Oldest",
  NameAscending = "NameAscending",
  NameDescending = "NameDescending",
  MostPosts = "MostPosts",
  FewestPosts = "FewestPosts",
}

export const categorySortByLabels: Record<CategorySortBy, string> = {
  [CategorySortBy.Newest]: "Newest",
  [CategorySortBy.Oldest]: "Oldest",
  [CategorySortBy.NameAscending]: "Name A–Z",
  [CategorySortBy.NameDescending]: "Name Z–A",
  [CategorySortBy.MostPosts]: "Most posts",
  [CategorySortBy.FewestPosts]: "Fewest posts",
};

export type AdminCategoryResponse = {
  id: string;
  name: string;
  slug: string;
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  postsCount: number;
};

export type AdminCategoriesResult = PagedResult<AdminCategoryResponse> & {
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type AdminCategoriesFilters = {
  term: string;
  sortBy: CategorySortBy;
  deleted: TriStateFilter;
  postStatuses: PostStatus[];
};

export type AdminCategoriesParams = AdminCategoriesFilters & {
  page: number;
  pageSize: number;
};

export type CreateCategoryRequest = {
  name: string;
};

export type UpdateCategoryRequest = {
  id: string;
  name: string;
};

export type CreateCategoryResponse = GetAllCategoriesResponse;
export type UpdateCategoryResponse = GetAllCategoriesResponse;
export type RestoreCategoryResponse = GetAllCategoriesResponse;

export type DeleteCategoryResponse = {
  success: boolean;
};
