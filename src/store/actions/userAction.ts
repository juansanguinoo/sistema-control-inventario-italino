import { Dispatch } from "redux";
import {
  CreateUserAction,
  CreateUserFailureAction,
  CreateUserSuccessAction,
  DeleteUserAction,
  DeleteUserFailureAction,
  DeleteUserSuccessAction,
  GetAllUsersAction,
  GetAllUsersFailureAction,
  GetAllUsersSuccessAction,
  GetUserAction,
  GetUserFailureAction,
  GetUserSuccessAction,
  UpdateUserAction,
  UpdateUserFailureAction,
  UpdateUserSuccessAction,
} from "../interfaces/UserActionsInterface";
import { container } from "../../config/inversifyContainer";
import { GetAllUserUseCase } from "../../domain/useCases/user/GetAllUserUseCase";
import { TYPES } from "../../config/types";
import { UserActionsTypes } from "../enums/UserActionsEnum";
import { AppError } from "../../domain/errors/AppError";
import { adaptUsers } from "../../infrastructure/adapters/userAdapter";
import { GetUserUseCase } from "../../domain/useCases/user/GetUserUseCase";
import { adaptUser } from "../../infrastructure/adapters/userAdapter";
import { UserModel } from "../../domain/models/UserModel";
import { CreateUserUseCase } from "../../domain/useCases/user/CreateUserUseCase";
import { UpdateUserUseCase } from "../../domain/useCases/user/UpdateUserUseCase";
import { DeleteUserUseCase } from "../../domain/useCases/user/DeleteUserUseCase";

export type UserAction =
  | GetAllUsersAction
  | GetAllUsersSuccessAction
  | GetAllUsersFailureAction
  | GetUserAction
  | GetUserSuccessAction
  | GetUserFailureAction
  | CreateUserAction
  | CreateUserSuccessAction
  | CreateUserFailureAction
  | UpdateUserAction
  | UpdateUserSuccessAction
  | UpdateUserFailureAction
  | DeleteUserAction
  | DeleteUserSuccessAction
  | DeleteUserFailureAction;

export const getAllUsers = () => {
  return async (dispatch: Dispatch<UserAction>) => {
    const useCase = container.get<GetAllUserUseCase>(TYPES.GetAllUsersUseCase);

    dispatch({ type: UserActionsTypes.GET_ALL_USERS });

    try {
      const response = await useCase.execute();
      dispatch({
        type: UserActionsTypes.GET_ALL_USERS_SUCCESS,
        payload: adaptUsers(response.data!),
      });
    } catch (error: any) {
      const handleError = new AppError(
        `Ocurrió un error al obtener los usuarios ${error}`
      );
      dispatch({
        type: UserActionsTypes.GET_ALL_USERS_FAILURE,
        payload: handleError,
      });
    }
  };
};

export const getUserById = (idUser: number) => {
  return async (dispatch: Dispatch<UserAction>) => {
    const useCase = container.get<GetUserUseCase>(TYPES.GetUserUseCase);

    dispatch({ type: UserActionsTypes.GET_USER_BY_ID });

    try {
      const response = await useCase.execute(idUser);
      dispatch({
        type: UserActionsTypes.GET_USER_BY_ID_SUCCESS,
        payload: adaptUser(response.data!),
      });
    } catch (error: any) {
      const handleError = new AppError(
        `Ocurrió un error al obtener el usuario ${error}`
      );
      dispatch({
        type: UserActionsTypes.GET_USER_BY_ID_FAILURE,
        payload: handleError,
      });
    }
  };
};

export const createUser = (user: UserModel) => {
  return async (dispatch: Dispatch<UserAction>) => {
    const useCase = container.get<CreateUserUseCase>(TYPES.CreateUserUseCase);
    dispatch({ type: UserActionsTypes.CREATE_USER });

    try {
      const response = await useCase.execute(user);
      dispatch({
        type: UserActionsTypes.CREATE_USER_SUCCESS,
        payload: adaptUser(response.data!),
      });
    } catch (error: any) {
      const handleError = new AppError(
        `Ocurrió un error al crear el usuario ${error}`
      );
      dispatch({
        type: UserActionsTypes.CREATE_USER_FAILURE,
        payload: handleError,
      });
    }
  };
};

export const updateUser = (idUser: number, user: UserModel) => {
  return async (dispatch: Dispatch<UserAction>) => {
    const useCase = container.get<UpdateUserUseCase>(TYPES.UpdateUserUseCase);
    dispatch({ type: UserActionsTypes.UPDATE_USER });

    try {
      await useCase.execute(idUser, user);
      dispatch({
        type: UserActionsTypes.UPDATE_USER_SUCCESS,
        payload: idUser,
      });
    } catch (error: any) {
      const handleError = new AppError(
        `Ocurrió un error al actualizar el usuario ${error}`
      );
      dispatch({
        type: UserActionsTypes.UPDATE_USER_FAILURE,
        payload: handleError,
      });
    }
  };
};

export const deleteUser = (idUser: number) => {
  return async (dispatch: Dispatch<UserAction>) => {
    const useCase = container.get<DeleteUserUseCase>(TYPES.DeleteUserUseCase);
    dispatch({ type: UserActionsTypes.DELETE_USER });

    try {
      await useCase.execute(idUser);
      dispatch({
        type: UserActionsTypes.DELETE_USER_SUCCESS,
        payload: idUser,
      });
    } catch (error: any) {
      const handleError = new AppError(
        `Ocurrió un error al eliminar el usuario ${error}`
      );
      dispatch({
        type: UserActionsTypes.DELETE_USER_FAILURE,
        payload: handleError,
      });
    }
  };
};
