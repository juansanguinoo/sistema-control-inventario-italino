import { AppError } from "../../domain/errors/AppError";
import { OrderResponseModel } from "../../domain/models/OrderResponseModel";
import { OrderActionsTypes } from "../enums/OrderActionsEnum";

export interface GetAllOrdersAction {
  type: OrderActionsTypes.GET_ALL_ORDERS;
}

export interface GetAllOrdersSuccessAction {
  type: OrderActionsTypes.GET_ALL_ORDERS_SUCCESS;
  payload: OrderResponseModel[];
}

export interface GetAllOrdersFailureAction {
  type: OrderActionsTypes.GET_ALL_ORDERS_FAILURE;
  payload: AppError;
}

export interface GetOrderAction {
  type: OrderActionsTypes.GET_ORDER;
}

export interface GetOrderSuccessAction {
  type: OrderActionsTypes.GET_ORDER_SUCCESS;
  payload: OrderResponseModel;
}

export interface GetOrderFailureAction {
  type: OrderActionsTypes.GET_ORDER_FAILURE;
  payload: AppError;
}

export interface CreateOrderAction {
  type: OrderActionsTypes.CREATE_ORDER;
}

export interface CreateOrderSuccessAction {
  type: OrderActionsTypes.CREATE_ORDER_SUCCESS;
  payload: OrderResponseModel;
}

export interface CreateOrderFailureAction {
  type: OrderActionsTypes.CREATE_ORDER_FAILURE;
  payload: AppError;
}

export interface UpdateOrderAction {
  type: OrderActionsTypes.UPDATE_ORDER;
}

export interface UpdateOrderSuccessAction {
  type: OrderActionsTypes.UPDATE_ORDER_SUCCESS;
  payload: number;
}

export interface UpdateOrderFailureAction {
  type: OrderActionsTypes.UPDATE_ORDER_FAILURE;
  payload: AppError;
}

export interface DeleteOrderAction {
  type: OrderActionsTypes.DELETE_ORDER;
}

export interface DeleteOrderSuccessAction {
  type: OrderActionsTypes.DELETE_ORDER_SUCCESS;
  payload: number;
}

export interface DeleteOrderFailureAction {
  type: OrderActionsTypes.DELETE_ORDER_FAILURE;
  payload: AppError;
}
