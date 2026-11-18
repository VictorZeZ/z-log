import { apiClient } from "@/lib/api/client";
import type {
  AdminCategoriesParams,
  AdminCategoriesResult,
  CreateCategoryRequest,
  CreateCategoryResponse,
  DeleteCategoryResponse,
  GetAllCategoriesResponse,
  RestoreCategoryResponse,
  UpdateCategoryRequest,
  UpdateCategoryResponse,
} from "@/types/api/category";

export async function getAllCategories(): Promise<GetAllCategoriesResponse[]> {
  return apiClient<GetAllCategoriesResponse[]>("/categories", {
    method: "GET",
  });
}

export async function getAdminCategories({
  page,
  pageSize,
  sortBy,
  deleted,
  postStatuses,
}: AdminCategoriesParams): Promise<AdminCategoriesResult> {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    sortBy,
    deleted,
  });
  postStatuses.forEach((status) => params.append("postStatuses", status));

  return apiClient<AdminCategoriesResult>(
    `/admin/categories?${params.toString()}`,
    { method: "GET" },
  );
}

export async function createCategory(
  payload: CreateCategoryRequest,
): Promise<CreateCategoryResponse> {
  return apiClient<CreateCategoryResponse>("/categories", {
    method: "POST",
    body: payload,
  });
}

export async function updateCategory({
  id,
  name,
}: UpdateCategoryRequest): Promise<UpdateCategoryResponse> {
  return apiClient<UpdateCategoryResponse>(
    `/categories/${encodeURIComponent(id)}`,
    {
      method: "PUT",
      body: { name },
    },
  );
}

export async function deleteCategory(
  categoryId: string,
): Promise<DeleteCategoryResponse> {
  return apiClient<DeleteCategoryResponse>(
    `/categories/${encodeURIComponent(categoryId)}`,
    { method: "DELETE" },
  );
}

export async function restoreCategory(
  categoryId: string,
): Promise<RestoreCategoryResponse> {
  return apiClient<RestoreCategoryResponse>(
    `/categories/${encodeURIComponent(categoryId)}/restore`,
    { method: "PUT" },
  );
}
