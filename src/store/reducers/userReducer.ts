import { UserModel } from "../../domain/models/UserModel";
import { UserAction } from "../actions/userAction";
import { UserActionsTypes } from "../enums/UserActionsEnum";

export interface UserState {
  loading: boolean;
  users: UserModel[] | [];
  user: UserModel | null;
  error: Error | null;
  token?: string | null;
  loggedIn: boolean;
}

const initialState: UserState = {
  loading: false,
  users: [],
  user: null,
  error: null,
  token: null,
  loggedIn: false,
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
    case UserActionsTypes.LOGIN_USER:
    case UserActionsTypes.CHECK_LOGIN:
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
    case UserActionsTypes.LOGIN_USER_FAILURE:
    case UserActionsTypes.CHECK_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        users: [],
        token: null,
        loggedIn: false,
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
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };

    case UserActionsTypes.LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        user: action.payload.UserModel,
        token: action.payload.token,
        loggedIn: true,
      };

    case UserActionsTypes.CHECK_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        user: action.payload.UserModel,
        token: action.payload.token,
        loggedIn: true,
      };

    default:
      return state;
  }
};
