import { Dispatch } from "react";
import {
  CreateCustomerAction,
  CreateCustomerFailureAction,
  CreateCustomerSuccessAction,
  GetAllCustomersAction,
  GetAllCustomersFailureAction,
  GetAllCustomersSuccessAction,
  GetCustomerAction,
  GetCustomerFailureAction,
  GetCustomerSuccessAction,
  UpdateCustomerAction,
  UpdateCustomerFailureAction,
  UpdateCustomerSuccessAction,
  DeleteCustomerAction,
  DeleteCustomerFailureAction,
  DeleteCustomerSuccessAction,
  GetCustomerByUserIdAction,
  GetCustomerByUserIdFailureAction,
  GetCustomerByUserIdSuccessAction,
} from "../interfaces/CustomerActionsInterface";
import { container } from "../../config/inversifyContainer";
import { GetAllCustomerUseCase } from "../../domain/useCases/customer/GetAllCustomerUseCase";
import { TYPES } from "../../config/types";
import { CustomerActionsTypes } from "../enums/CustomerActionsEnum";
import {
  adaptCustomer,
  adaptCustomers,
} from "../../infrastructure/adapters/customerAdapter";
import { AppError } from "../../domain/errors/AppError";
import { GetCustomerUseCase } from "../../domain/useCases/customer/GetCustomerUseCase";
import { CustomerModel } from "../../domain/models/CustomerModel";
import { CreateCustomerUseCase } from "../../domain/useCases/customer/CreateCustomerUseCase";
import { UpdateCustomerUseCase } from "../../domain/useCases/customer/UpdateCustomerUseCase";
import { DeleteCustomerUseCase } from "../../domain/useCases/customer/DeleteCustomerUseCase";
import { GetCustomerByUserIdUseCase } from "../../domain/useCases/customer/GetCustomerByUserIdUseCase";

export type CustomerAction =
  | GetAllCustomersAction
  | GetAllCustomersSuccessAction
  | GetAllCustomersFailureAction
  | GetCustomerAction
  | GetCustomerSuccessAction
  | GetCustomerFailureAction
  | CreateCustomerAction
  | CreateCustomerSuccessAction
  | CreateCustomerFailureAction
  | UpdateCustomerAction
  | UpdateCustomerSuccessAction
  | UpdateCustomerFailureAction
  | DeleteCustomerAction
  | DeleteCustomerSuccessAction
  | DeleteCustomerFailureAction
  | GetCustomerByUserIdAction
  | GetCustomerByUserIdSuccessAction
  | GetCustomerByUserIdFailureAction;

export const getAllCustomers = () => {
  return async (dispatch: Dispatch<CustomerAction>) => {
    const useCase = container.get<GetAllCustomerUseCase>(
      TYPES.GetAllCustomerUseCase
    );

    dispatch({ type: CustomerActionsTypes.GET_ALL_CUSTOMERS });

    try {
      const response = await useCase.execute();
      dispatch({
        type: CustomerActionsTypes.GET_ALL_CUSTOMERS_SUCCESS,
        payload: adaptCustomers(response.data!),
      });
    } catch (error) {
      const handleError = new AppError(
        `Ocurrió un error al obtener los usuarios ${error}`
      );
      dispatch({
        type: CustomerActionsTypes.GET_ALL_CUSTOMERS_FAILURE,
        payload: handleError,
      });
    }
  };
};

export const getCustomerById = (idCustomer: number) => {
  return async (dispatch: Dispatch<CustomerAction>) => {
    const useCase = container.get<GetCustomerUseCase>(TYPES.GetCustomerUseCase);

    dispatch({ type: CustomerActionsTypes.GET_CUSTOMER_BY_ID });

    try {
      const response = await useCase.execute(idCustomer);
      dispatch({
        type: CustomerActionsTypes.GET_CUSTOMER_BY_ID_SUCCESS,
        payload: adaptCustomer(response.data!),
      });
    } catch (error) {
      const handleError = new AppError(
        `Ocurrió un error al obtener los usuarios ${error}`
      );
      dispatch({
        type: CustomerActionsTypes.GET_CUSTOMER_BY_ID_FAILURE,
        payload: handleError,
      });
    }
  };
};

export const getCustomerByUserId = (idUser: number) => {
  return async (dispatch: Dispatch<CustomerAction>) => {
    const useCase = container.get<GetCustomerByUserIdUseCase>(
      TYPES.GetCustomerByUserIdUseCase
    );

    dispatch({ type: CustomerActionsTypes.GET_CUSTOMER_BY_USER_ID });

    try {
      const response = await useCase.execute(idUser);
      dispatch({
        type: CustomerActionsTypes.GET_CUSTOMER_BY_USER_ID_SUCCESS,
        payload: adaptCustomers(response.data!),
      });
    } catch (error) {
      const handleError = new AppError(
        `Ocurrió un error al obtener los usuarios ${error}`
      );
      dispatch({
        type: CustomerActionsTypes.GET_CUSTOMER_BY_USER_ID_FAILURE,
        payload: handleError,
      });
    }
  };
};

export const createCustomer = (customer: CustomerModel) => {
  return async (dispatch: Dispatch<CustomerAction>) => {
    const useCase = container.get<CreateCustomerUseCase>(
      TYPES.CreateCustomerUseCase
    );
    dispatch({ type: CustomerActionsTypes.CREATE_CUSTOMER });

    try {
      const response = await useCase.execute(customer);
      dispatch({
        type: CustomerActionsTypes.CREATE_CUSTOMER_SUCCESS,
        payload: adaptCustomer(response.data!),
      });
    } catch (error: any) {
      const handleError = new AppError(
        `Ocurrió un error al crear el usuario ${error}`
      );
      dispatch({
        type: CustomerActionsTypes.CREATE_CUSTOMER_FAILURE,
        payload: handleError,
      });
    }
  };
};

export const updateCustomer = (idCustomer: number, customer: CustomerModel) => {
  return async (dispatch: Dispatch<CustomerAction>) => {
    const useCase = container.get<UpdateCustomerUseCase>(
      TYPES.UpdateCustomerUseCase
    );
    dispatch({ type: CustomerActionsTypes.UPDATE_CUSTOMER });

    try {
      const response = await useCase.execute(idCustomer, customer);
      dispatch({
        type: CustomerActionsTypes.UPDATE_CUSTOMER_SUCCESS,
        payload: adaptCustomer(response.data!),
      });
    } catch (error: any) {
      const handleError = new AppError(
        `Ocurrió un error al actualizar el usuario ${error}`
      );
      dispatch({
        type: CustomerActionsTypes.UPDATE_CUSTOMER_FAILURE,
        payload: handleError,
      });
    }
  };
};

export const deleteCustomer = (idCustomer: number) => {
  return async (dispatch: Dispatch<CustomerAction>) => {
    const useCase = container.get<DeleteCustomerUseCase>(
      TYPES.DeleteCustomerUseCase
    );
    dispatch({ type: CustomerActionsTypes.DELETE_CUSTOMER });

    try {
      await useCase.execute(idCustomer);
      dispatch({
        type: CustomerActionsTypes.DELETE_CUSTOMER_SUCCESS,
        payload: idCustomer,
      });
    } catch (error: any) {
      const handleError = new AppError(
        `Ocurrió un error al eliminar el usuario ${error}`
      );
      dispatch({
        type: CustomerActionsTypes.DELETE_CUSTOMER_FAILURE,
        payload: handleError,
      });
    }
  };
};
