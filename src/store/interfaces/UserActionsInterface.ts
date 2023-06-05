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
  payload: number;
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
