import { apiClient } from "@/lib/api/client";
import type { GetAllCategoriesResponse } from "@/types/api/category";

export async function getAllCategories(): Promise<GetAllCategoriesResponse[]> {
  return apiClient<GetAllCategoriesResponse[]>("/categories", {
    method: "GET",
  });
}
