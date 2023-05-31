import { CategoryModel } from "../../domain/models/CategoryModel";
import { CategoryAction } from "../actions/categoryActions";
import { CategoryActionTypes } from "../enums/CategoryActionsEnum";

export interface CategoryState {
  loading: boolean;
  categories: CategoryModel[] | [];
  error: Error | null;
}

const initialState: CategoryState = {
  loading: false,
  categories: [],
  error: null,
};

export const categoryReducer = (
  state = initialState,
  action: CategoryAction
): CategoryState => {
  switch (action.type) {
    case CategoryActionTypes.GET_CATEGORIES:
    case CategoryActionTypes.CREATE_CATEGORY:
    case CategoryActionTypes.UPDATE_CATEGORY:
    case CategoryActionTypes.DELETE_CATEGORY:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case CategoryActionTypes.GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload,
        error: null,
      };

    case CategoryActionTypes.GET_CATEGORIES_FAILURE:
    case CategoryActionTypes.CREATE_CATEGORY_FAILURE:
    case CategoryActionTypes.UPDATE_CATEGORY_FAILURE:
    case CategoryActionTypes.DELETE_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        categories: [],
      };

    case CategoryActionTypes.CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: [...state.categories, action.payload],
        error: null,
      };

    case CategoryActionTypes.UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: state.categories,
        error: null,
      };

    case CategoryActionTypes.DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: state.categories.filter(
          (category) => category.idCategory !== action.payload
        ),
        error: null,
      };

    default:
      return state;
  }
};
