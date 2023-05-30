import { Dispatch } from "redux";
import {
  CreateCategoryAction,
  CreateCategoryFailureAction,
  CreateCategorySuccessAction,
  DeleteCategoryAction,
  DeleteCategoryFailureAction,
  DeleteCategorySuccessAction,
  GetCategoriesAction,
  GetCategoriesFailureAction,
  GetCategoriesSuccessAction,
  UpdateCategoryAction,
  UpdateCategoryFailureAction,
  UpdateCategorySuccessAction,
} from "../interfaces/CategoryActionsInterfaces";
import { CategoryActionTypes } from "../enums/CategoryActionsEnum";
import { GetCategoriesUseCase } from "../../domain/useCases/category/GetCategoriesUseCase";
import { TYPES } from "../../config/types";
import { Container } from "inversify";
import { Category } from "../../domain/models/Category";
import { CreateCategoryUseCase } from "../../domain/useCases/category/CreateCategoryUseCase";
import { UpdateCategoryUseCase } from "../../domain/useCases/category/UpdateCategoryUseCase";
import { DeleteCategoryUseCase } from "../../domain/useCases/category/DeleteCategoryUseCase";
import { container } from "../../config/inversifyContainer";
import { AppError } from "../../domain/errors/AppError";
import {
  adaptCategories,
  adaptCategory,
} from "../../infrastructure/adapters/categoryAdapter";

export type CategoryAction =
  | GetCategoriesAction
  | GetCategoriesSuccessAction
  | GetCategoriesFailureAction
  | CreateCategoryAction
  | CreateCategorySuccessAction
  | CreateCategoryFailureAction
  | UpdateCategoryAction
  | UpdateCategorySuccessAction
  | UpdateCategoryFailureAction
  | DeleteCategoryAction
  | DeleteCategorySuccessAction
  | DeleteCategoryFailureAction;

export const getCategories = () => {
  return async (dispatch: Dispatch<CategoryAction>) => {
    const useCase = container.get<GetCategoriesUseCase>(
      TYPES.GetCategoriesUseCase
    );

    dispatch({ type: CategoryActionTypes.GET_CATEGORIES });

    try {
      const categories = await useCase.execute();
      dispatch({
        type: CategoryActionTypes.GET_CATEGORIES_SUCCESS,
        payload: adaptCategories(categories.data!),
      });
    } catch (error: any) {
      const handleError = new AppError(
        `Ocurrió un error al obtener las categorías ${error}`
      );
      dispatch({
        type: CategoryActionTypes.GET_CATEGORIES_FAILURE,
        payload: handleError,
      });
    }
  };
};

export const createCategory = (category: Category) => {
  return async (dispatch: Dispatch, container: Container) => {
    const useCase = container.get<CreateCategoryUseCase>(
      TYPES.CreateCategoryUseCase
    );

    dispatch({ type: CategoryActionTypes.CREATE_CATEGORY });

    try {
      const createdCategory = await useCase.execute(category);
      dispatch({
        type: CategoryActionTypes.CREATE_CATEGORY_SUCCESS,
        payload: adaptCategory(createdCategory.data!),
      });
    } catch (error) {
      dispatch({
        type: CategoryActionTypes.CREATE_CATEGORY_FAILURE,
        payload: error,
      });
    }
  };
};

export const updateCategory = (idCategory: number, category: Category) => {
  return async (dispatch: Dispatch, container: Container) => {
    const useCase = container.get<UpdateCategoryUseCase>(
      TYPES.UpdateCategoryUseCase
    );

    dispatch({ type: CategoryActionTypes.UPDATE_CATEGORY });

    try {
      const updatedCategory = await useCase.execute(idCategory, category);
      dispatch({
        type: CategoryActionTypes.UPDATE_CATEGORY_SUCCESS,
        payload: updatedCategory.data!,
      });
    } catch (error) {
      dispatch({
        type: CategoryActionTypes.UPDATE_CATEGORY_FAILURE,
        payload: error,
      });
    }
  };
};

export const deleteCategory = (idCategory: number) => {
  return async (dispatch: Dispatch, container: Container) => {
    const useCase = container.get<DeleteCategoryUseCase>(
      TYPES.DeleteCategoryUseCase
    );

    dispatch({ type: CategoryActionTypes.DELETE_CATEGORY });

    try {
      const deleteCategory = await useCase.execute(idCategory);
      dispatch({
        type: CategoryActionTypes.DELETE_CATEGORY_SUCCESS,
        payload: deleteCategory.data!,
      });
    } catch (error) {
      dispatch({
        type: CategoryActionTypes.DELETE_CATEGORY_FAILURE,
        payload: error,
      });
    }
  };
};
