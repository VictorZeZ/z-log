import { apiClient } from "@/lib/api/client";
import type {
  CreateCategoryRequest,
  CreateCategoryResponse,
  DeleteCategoryResponse,
  GetAllCategoriesResponse,
  GetDeletedCategoriesResponse,
  RestoreCategoryResponse,
  UpdateCategoryRequest,
  UpdateCategoryResponse,
} from "@/types/api/category";

export async function getAllCategories(): Promise<GetAllCategoriesResponse[]> {
  return apiClient<GetAllCategoriesResponse[]>("/categories", {
    method: "GET",
  });
}

export async function getDeletedCategories(): Promise<
  GetDeletedCategoriesResponse[]
> {
  return apiClient<GetDeletedCategoriesResponse[]>("/categories/deleted", {
    method: "GET",
  });
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
