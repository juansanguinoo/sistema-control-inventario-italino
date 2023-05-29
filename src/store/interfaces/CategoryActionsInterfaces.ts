import { AppError } from "../../domain/errors/AppError";
import { Category } from "../../domain/models/Category";
import { CategoryActionTypes } from "../enums/CategoryActionsEnum";

export interface GetCategoriesAction {
  type: CategoryActionTypes.GET_CATEGORIES;
}

export interface GetCategoriesSuccessAction {
  type: CategoryActionTypes.GET_CATEGORIES_SUCCESS;
  payload: Category[];
}

export interface GetCategoriesFailureAction {
  type: CategoryActionTypes.GET_CATEGORIES_FAILURE;
  payload: AppError;
}

export interface CreateCategoryAction {
  type: CategoryActionTypes.CREATE_CATEGORY;
}

export interface CreateCategorySuccessAction {
  type: CategoryActionTypes.CREATE_CATEGORY_SUCCESS;
  payload: Category;
}

export interface CreateCategoryFailureAction {
  type: CategoryActionTypes.CREATE_CATEGORY_FAILURE;
  payload: AppError;
}

export interface UpdateCategoryAction {
  type: CategoryActionTypes.UPDATE_CATEGORY;
}

export interface UpdateCategorySuccessAction {
  type: CategoryActionTypes.UPDATE_CATEGORY_SUCCESS;
  payload: Category;
}

export interface UpdateCategoryFailureAction {
  type: CategoryActionTypes.UPDATE_CATEGORY_FAILURE;
  payload: AppError;
}

export interface DeleteCategoryAction {
  type: CategoryActionTypes.DELETE_CATEGORY;
}

export interface DeleteCategorySuccessAction {
  type: CategoryActionTypes.DELETE_CATEGORY_SUCCESS;
  payload: number; // categoryId
}

export interface DeleteCategoryFailureAction {
  type: CategoryActionTypes.DELETE_CATEGORY_FAILURE;
  payload: AppError;
}
