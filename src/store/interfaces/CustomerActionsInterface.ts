import { AppError } from "../../domain/errors/AppError";
import { CustomerModel } from "../../domain/models/CustomerModel";
import { CustomerActionsTypes } from "../enums/CustomerActionsEnum";

export interface GetAllCustomersAction {
  type: CustomerActionsTypes.GET_ALL_CUSTOMERS;
}

export interface GetAllCustomersSuccessAction {
  type: CustomerActionsTypes.GET_ALL_CUSTOMERS_SUCCESS;
  payload: CustomerModel[];
}

export interface GetAllCustomersFailureAction {
  type: CustomerActionsTypes.GET_ALL_CUSTOMERS_FAILURE;
  payload: AppError;
}

export interface GetCustomerAction {
  type: CustomerActionsTypes.GET_CUSTOMER_BY_ID;
}

export interface GetCustomerSuccessAction {
  type: CustomerActionsTypes.GET_CUSTOMER_BY_ID_SUCCESS;
  payload: CustomerModel;
}

export interface GetCustomerFailureAction {
  type: CustomerActionsTypes.GET_CUSTOMER_BY_ID_FAILURE;
  payload: AppError;
}

export interface CreateCustomerAction {
  type: CustomerActionsTypes.CREATE_CUSTOMER;
}

export interface CreateCustomerSuccessAction {
  type: CustomerActionsTypes.CREATE_CUSTOMER_SUCCESS;
  payload: CustomerModel;
}

export interface CreateCustomerFailureAction {
  type: CustomerActionsTypes.CREATE_CUSTOMER_FAILURE;
  payload: AppError;
}

export interface UpdateCustomerAction {
  type: CustomerActionsTypes.UPDATE_CUSTOMER;
}

export interface UpdateCustomerSuccessAction {
  type: CustomerActionsTypes.UPDATE_CUSTOMER_SUCCESS;
  payload: CustomerModel;
}

export interface UpdateCustomerFailureAction {
  type: CustomerActionsTypes.UPDATE_CUSTOMER_FAILURE;
  payload: AppError;
}

export interface DeleteCustomerAction {
  type: CustomerActionsTypes.DELETE_CUSTOMER;
}

export interface DeleteCustomerSuccessAction {
  type: CustomerActionsTypes.DELETE_CUSTOMER_SUCCESS;
  payload: number;
}

export interface DeleteCustomerFailureAction {
  type: CustomerActionsTypes.DELETE_CUSTOMER_FAILURE;
  payload: AppError;
}

export interface GetCustomerByUserIdAction {
  type: CustomerActionsTypes.GET_CUSTOMER_BY_USER_ID;
}

export interface GetCustomerByUserIdSuccessAction {
  type: CustomerActionsTypes.GET_CUSTOMER_BY_USER_ID_SUCCESS;
  payload: CustomerModel[];
}

export interface GetCustomerByUserIdFailureAction {
  type: CustomerActionsTypes.GET_CUSTOMER_BY_USER_ID_FAILURE;
  payload: AppError;
}

export interface GetCustomersByNameOrNitAction {
  type: CustomerActionsTypes.GET_CUSTOMERS_BY_NAME_OR_NIT;
}

export interface GetCustomersByNameOrNitSuccessAction {
  type: CustomerActionsTypes.GET_CUSTOMERS_BY_NAME_OR_NIT_SUCCESS;
  payload: CustomerModel[];
}

export interface GetCustomersByNameOrNitFailureAction {
  type: CustomerActionsTypes.GET_CUSTOMERS_BY_NAME_OR_NIT_FAILURE;
  payload: AppError;
}
