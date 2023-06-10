import { Dispatch } from "redux";
import {
  CheckLoginAction,
  CheckLoginFailureAction,
  CheckLoginSuccessAction,
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
  LoginUserAction,
  LoginUserFailureAction,
  LoginUserSuccessAction,
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
import { LoginUserUseCase } from "../../domain/useCases/user/LoginUserUseCase";
import { CheckLoginUserUseCase } from "../../domain/useCases/user/CheckLoginUserUseCase";

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
  | DeleteUserFailureAction
  | LoginUserAction
  | LoginUserSuccessAction
  | LoginUserFailureAction
  | CheckLoginAction
  | CheckLoginSuccessAction
  | CheckLoginFailureAction;

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

export const loginUser = (email: string, password: string) => {
  return async (dispatch: Dispatch<UserAction>) => {
    const useCase = container.get<LoginUserUseCase>(TYPES.LoginUserUseCase);

    dispatch({ type: UserActionsTypes.LOGIN_USER });

    try {
      const response = await useCase.execute(email, password);

      if (response.token) {
        sessionStorage.setItem("token", response.token);
      }

      dispatch({
        type: UserActionsTypes.LOGIN_USER_SUCCESS,
        payload: {
          UserModel: adaptUser(response.data!),
          token: response.token,
        },
      });
    } catch (error: any) {
      const handleError = new AppError(
        `Ocurrió un error al obtener el usuario ${error}`
      );
      dispatch({
        type: UserActionsTypes.LOGIN_USER_FAILURE,
        payload: handleError,
      });
    }
  };
};

export const checkLogin = () => {
  return async (dispatch: Dispatch<UserAction>) => {
    const useCase = container.get<CheckLoginUserUseCase>(
      TYPES.CheckLoginUserUseCase
    );

    dispatch({ type: UserActionsTypes.CHECK_LOGIN });

    try {
      const response = await useCase.execute();

      if (response.token) {
        sessionStorage.setItem("token", response.token);
      }
      dispatch({
        type: UserActionsTypes.CHECK_LOGIN_SUCCESS,
        payload: {
          UserModel: adaptUser(response.data!),
          token: response.token,
        },
      });
    } catch (error: any) {
      const handleError = new AppError(
        `Ocurrió un error al obtener el usuario ${error}`
      );
      dispatch({
        type: UserActionsTypes.CHECK_LOGIN_FAILURE,
        payload: handleError,
      });
    }
  };
};
