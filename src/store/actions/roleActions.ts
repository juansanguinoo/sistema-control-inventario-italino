import { Dispatch } from "redux";
import {
  CreateRoleAction,
  CreateRoleFailureAction,
  CreateRoleSuccessAction,
  DeleteRoleAction,
  DeleteRoleFailureAction,
  DeleteRoleSuccessAction,
  GetAllActivitiesAction,
  GetAllActivitiesFailureAction,
  GetAllActivitiesSuccessAction,
  GetAllRolesAction,
  GetAllRolesFailureAction,
  GetAllRolesSuccessAction,
  GetRoleAction,
  GetRoleFailureAction,
  GetRoleSuccessAction,
  UpdateRoleAction,
  UpdateRoleFailureAction,
  UpdateRoleSuccessAction,
} from "../interfaces/RoleActionsInterfaces";
import { container } from "../../config/inversifyContainer";
import { GetAllRolesUseCase } from "../../domain/useCases/role/GetAllRoleUseCase";
import { TYPES } from "../../config/types";
import { RoleActionType } from "../enums/RoleActionsEnum";
import { AppError } from "../../domain/errors/AppError";
import {
  adaptActivities,
  adaptRole,
  adaptRoles,
} from "../../infrastructure/adapters/roleAdapter";
import { GetRoleUseCase } from "../../domain/useCases/role/GetRoleUseCase";
import { RoleModel } from "../../domain/models/RoleModel";
import { CreateRoleUseCase } from "../../domain/useCases/role/CreateRoleUseCase";
import { UpdateRoleUseCase } from "../../domain/useCases/role/UpdateRoleUseCase";
import { DeleteRoleUseCase } from "../../domain/useCases/role/DeleteRoleUseCase";
import { GetAllActivitiesUseCase } from "../../domain/useCases/role/GetAllActivitiesUseCase";

export type RoleAction =
  | GetAllRolesAction
  | GetAllRolesSuccessAction
  | GetAllRolesFailureAction
  | GetRoleAction
  | GetRoleSuccessAction
  | GetRoleFailureAction
  | CreateRoleAction
  | CreateRoleSuccessAction
  | CreateRoleFailureAction
  | UpdateRoleAction
  | UpdateRoleSuccessAction
  | UpdateRoleFailureAction
  | DeleteRoleAction
  | DeleteRoleSuccessAction
  | DeleteRoleFailureAction
  | GetAllActivitiesAction
  | GetAllActivitiesSuccessAction
  | GetAllActivitiesFailureAction;

export const getAllRoles = () => {
  return async (dispatch: Dispatch<RoleAction>) => {
    const useCase = container.get<GetAllRolesUseCase>(TYPES.GetAllRolesUseCase);

    dispatch({ type: RoleActionType.GET_ALL_ROLES });

    try {
      const response = await useCase.execute();
      dispatch({
        type: RoleActionType.GET_ALL_ROLES_SUCCESS,
        payload: adaptRoles(response.data!),
      });
    } catch (error: any) {
      const handleError = new AppError(
        `Ocurrió un error al obtener los usuarios ${error}`
      );
      dispatch({
        type: RoleActionType.GET_ALL_ROLES_FAILURE,
        payload: handleError,
      });
    }
  };
};

export const getRoleById = (idRole: number) => {
  return async (dispatch: Dispatch<RoleAction>) => {
    const useCase = container.get<GetRoleUseCase>(TYPES.GetRoleUseCase);

    dispatch({ type: RoleActionType.GET_ROLE });

    try {
      const response = await useCase.execute(idRole);
      dispatch({
        type: RoleActionType.GET_ROLE_SUCCESS,
        payload: adaptRole(response.data!),
      });
    } catch (error: any) {
      const handleError = new AppError(
        `Ocurrió un error al obtener los usuarios ${error}`
      );
      dispatch({
        type: RoleActionType.GET_ROLE_FAILURE,
        payload: handleError,
      });
    }
  };
};

export const createRole = (role: RoleModel) => {
  return async (dispatch: Dispatch<RoleAction>) => {
    const useCase = container.get<CreateRoleUseCase>(TYPES.CreateRoleUseCase);

    dispatch({ type: RoleActionType.CREATE_ROLE });

    try {
      const response = await useCase.execute(role);
      dispatch({
        type: RoleActionType.CREATE_ROLE_SUCCESS,
        payload: adaptRole(response.data!),
      });
    } catch (error: any) {
      const handleError = new AppError(
        `Ocurrió un error al crear el rol ${error}`
      );
      dispatch({
        type: RoleActionType.CREATE_ROLE_FAILURE,
        payload: handleError,
      });
    }
  };
};

export const updateRole = (idRole: number, role: RoleModel) => {
  return async (dispatch: Dispatch<RoleAction>) => {
    const useCase = container.get<UpdateRoleUseCase>(TYPES.UpdateRoleUseCase);

    dispatch({ type: RoleActionType.UPDATE_ROLE });

    try {
      const roleUpdated = await useCase.execute(idRole, role);
      dispatch({
        type: RoleActionType.UPDATE_ROLE_SUCCESS,
        payload: adaptRole(roleUpdated.data!),
      });
    } catch (error: any) {
      const handleError = new AppError(
        `Ocurrió un error al actualizar el rol ${error}`
      );
      dispatch({
        type: RoleActionType.UPDATE_ROLE_FAILURE,
        payload: handleError,
      });
    }
  };
};

export const deleteRole = (idRole: number) => {
  return async (dispatch: Dispatch<RoleAction>) => {
    const useCase = container.get<DeleteRoleUseCase>(TYPES.DeleteRoleUseCase);

    dispatch({ type: RoleActionType.DELETE_ROLE });

    try {
      await useCase.execute(idRole);
      dispatch({
        type: RoleActionType.DELETE_ROLE_SUCCESS,
        payload: idRole,
      });
    } catch (error: any) {
      const handleError = new AppError(
        `Ocurrió un error al eliminar el rol ${error}`
      );
      dispatch({
        type: RoleActionType.DELETE_ROLE_FAILURE,
        payload: handleError,
      });
    }
  };
};

export const getAllActivities = () => {
  return async (dispatch: Dispatch<RoleAction>) => {
    const useCase = container.get<GetAllActivitiesUseCase>(
      TYPES.GetAllActivitiesUseCase
    );

    dispatch({ type: RoleActionType.GET_ALL_ACTIVITIES });

    try {
      const response = await useCase.execute();
      dispatch({
        type: RoleActionType.GET_ALL_ACTIVITIES_SUCCESS,
        payload: adaptActivities(response.data!),
      });
    } catch (error: any) {
      const handleError = new AppError(
        `Ocurrió un error al obtener los usuarios ${error}`
      );
      dispatch({
        type: RoleActionType.GET_ALL_ACTIVITIES_FAILURE,
        payload: handleError,
      });
    }
  };
};
