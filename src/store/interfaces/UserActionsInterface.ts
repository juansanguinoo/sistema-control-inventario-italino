import { AppError } from "../../domain/errors/AppError";
import { UserModel } from "../../domain/models/UserModel";
import { UserActionsTypes } from "../enums/UserActionsEnum";

export interface GetAllUsersAction {
  type: UserActionsTypes.GET_ALL_USERS;
}

export interface GetAllUsersSuccessAction {
  type: UserActionsTypes.GET_ALL_USERS_SUCCESS;
  payload: UserModel[];
}

export interface GetAllUsersFailureAction {
  type: UserActionsTypes.GET_ALL_USERS_FAILURE;
  payload: AppError;
}

export interface GetUserAction {
  type: UserActionsTypes.GET_USER_BY_ID;
}

export interface GetUserSuccessAction {
  type: UserActionsTypes.GET_USER_BY_ID_SUCCESS;
  payload: UserModel;
}

export interface GetUserFailureAction {
  type: UserActionsTypes.GET_USER_BY_ID_FAILURE;
  payload: AppError;
}

export interface CreateUserAction {
  type: UserActionsTypes.CREATE_USER;
}

export interface CreateUserSuccessAction {
  type: UserActionsTypes.CREATE_USER_SUCCESS;
  payload: UserModel;
}

export interface CreateUserFailureAction {
  type: UserActionsTypes.CREATE_USER_FAILURE;
  payload: AppError;
}

export interface UpdateUserAction {
  type: UserActionsTypes.UPDATE_USER;
}

export interface UpdateUserSuccessAction {
  type: UserActionsTypes.UPDATE_USER_SUCCESS;
  payload: UserModel;
}

export interface UpdateUserFailureAction {
  type: UserActionsTypes.UPDATE_USER_FAILURE;
  payload: AppError;
}

export interface DeleteUserAction {
  type: UserActionsTypes.DELETE_USER;
}

export interface DeleteUserSuccessAction {
  type: UserActionsTypes.DELETE_USER_SUCCESS;
  payload: number;
}

export interface DeleteUserFailureAction {
  type: UserActionsTypes.DELETE_USER_FAILURE;
  payload: AppError;
}

export interface LoginUserAction {
  type: UserActionsTypes.LOGIN_USER;
}

export interface LoginUserSuccessAction {
  type: UserActionsTypes.LOGIN_USER_SUCCESS;
  payload: { UserModel: UserModel; token?: string };
}

export interface LoginUserFailureAction {
  type: UserActionsTypes.LOGIN_USER_FAILURE;
  payload: AppError;
}

export interface CheckLoginAction {
  type: UserActionsTypes.CHECK_LOGIN;
}

export interface CheckLoginSuccessAction {
  type: UserActionsTypes.CHECK_LOGIN_SUCCESS;
  payload: { UserModel: UserModel; token?: string };
}

export interface CheckLoginFailureAction {
  type: UserActionsTypes.CHECK_LOGIN_FAILURE;
  payload: AppError;
}

export interface LogoutUserAction {
  type: UserActionsTypes.LOGOUT_USER;
}

export interface UpdatePasswordAction {
  type: UserActionsTypes.UPDATE_PASSWORD;
}

export interface UpdatePasswordSuccessAction {
  type: UserActionsTypes.UPDATE_PASSWORD_SUCCESS;
  payload: UserModel;
}

export interface UpdatePasswordFailureAction {
  type: UserActionsTypes.UPDATE_PASSWORD_FAILURE;
  payload: AppError;
}
