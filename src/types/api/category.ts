export type GetAllCategoriesResponse = {
  id: string;
  name: string;
  slug: string;
};

export type GetDeletedCategoriesResponse = {
  id: string;
  name: string;
  slug: string;
  deletedAt: string | null;
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
