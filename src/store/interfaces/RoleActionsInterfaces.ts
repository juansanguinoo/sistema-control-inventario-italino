import { AppError } from "../../domain/errors/AppError";
import { ActivityModel } from "../../domain/models/ActivitiesModel";
import { RoleModel } from "../../domain/models/RoleModel";
import { RoleActionType } from "../enums/RoleActionsEnum";

export interface GetAllRolesAction {
  type: RoleActionType.GET_ALL_ROLES;
}

export interface GetAllRolesSuccessAction {
  type: RoleActionType.GET_ALL_ROLES_SUCCESS;
  payload: RoleModel[];
}

export interface GetAllRolesFailureAction {
  type: RoleActionType.GET_ALL_ROLES_FAILURE;
  payload: AppError;
}

export interface GetRoleAction {
  type: RoleActionType.GET_ROLE;
}

export interface GetRoleSuccessAction {
  type: RoleActionType.GET_ROLE_SUCCESS;
  payload: RoleModel;
}

export interface GetRoleFailureAction {
  type: RoleActionType.GET_ROLE_FAILURE;
  payload: AppError;
}

export interface CreateRoleAction {
  type: RoleActionType.CREATE_ROLE;
}

export interface CreateRoleSuccessAction {
  type: RoleActionType.CREATE_ROLE_SUCCESS;
  payload: RoleModel;
}

export interface CreateRoleFailureAction {
  type: RoleActionType.CREATE_ROLE_FAILURE;
  payload: AppError;
}

export interface UpdateRoleAction {
  type: RoleActionType.UPDATE_ROLE;
}

export interface UpdateRoleSuccessAction {
  type: RoleActionType.UPDATE_ROLE_SUCCESS;
  payload: number;
}

export interface UpdateRoleFailureAction {
  type: RoleActionType.UPDATE_ROLE_FAILURE;
  payload: AppError;
}

export interface DeleteRoleAction {
  type: RoleActionType.DELETE_ROLE;
}

export interface DeleteRoleSuccessAction {
  type: RoleActionType.DELETE_ROLE_SUCCESS;
  payload: number;
}

export interface DeleteRoleFailureAction {
  type: RoleActionType.DELETE_ROLE_FAILURE;
  payload: AppError;
}

export interface GetAllActivitiesAction {
  type: RoleActionType.GET_ALL_ACTIVITIES;
}

export interface GetAllActivitiesSuccessAction {
  type: RoleActionType.GET_ALL_ACTIVITIES_SUCCESS;
  payload: ActivityModel[];
}

export interface GetAllActivitiesFailureAction {
  type: RoleActionType.GET_ALL_ACTIVITIES_FAILURE;
  payload: AppError;
}
