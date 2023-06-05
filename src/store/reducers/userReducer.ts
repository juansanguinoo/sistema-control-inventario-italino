import { UserModel } from "../../domain/models/UserModel";
import { UserAction } from "../actions/userAction";
import { UserActionsTypes } from "../enums/UserActionsEnum";

export interface UserState {
  loading: boolean;
  users: UserModel[] | [];
  error: Error | null;
}

const initialState: UserState = {
  loading: false,
  users: [],
  error: null,
};

export const userReducer = (
  state: UserState = initialState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case UserActionsTypes.GET_ALL_USERS:
    case UserActionsTypes.GET_USER_BY_ID:
    case UserActionsTypes.CREATE_USER:
    case UserActionsTypes.UPDATE_USER:
    case UserActionsTypes.DELETE_USER:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case UserActionsTypes.GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        users: action.payload,
      };

    case UserActionsTypes.CREATE_USER_FAILURE:
    case UserActionsTypes.DELETE_USER_FAILURE:
    case UserActionsTypes.GET_ALL_USERS_FAILURE:
    case UserActionsTypes.GET_USER_BY_ID_FAILURE:
    case UserActionsTypes.UPDATE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        users: [],
      };

    case UserActionsTypes.CREATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        users: [...state.users, action.payload],
      };

    case UserActionsTypes.DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        users: state.users.filter((user) => user.id !== action.payload),
      };

    case UserActionsTypes.GET_USER_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        users: [action.payload],
      };

    case UserActionsTypes.UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        users: state.users,
      };

    default:
      return state;
  }
};
