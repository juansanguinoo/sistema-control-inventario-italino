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

export interface GetOrdersByUserAction {
  type: OrderActionsTypes.GET_ORDERS_BY_USER;
}

export interface GetOrdersByUserSuccessAction {
  type: OrderActionsTypes.GET_ORDERS_BY_USER_SUCCESS;
  payload: OrderResponseModel[];
}

export interface GetOrdersByUserFailureAction {
  type: OrderActionsTypes.GET_ORDERS_BY_USER_FAILURE;
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
  payload: OrderResponseModel;
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

export interface CreateOrderReturnAction {
  type: OrderActionsTypes.CREATE_ORDER_RETURN;
}

export interface CreateOrderReturnSuccessAction {
  type: OrderActionsTypes.CREATE_ORDER_RETURN_SUCCESS;
  payload: OrderResponseModel;
}

export interface CreateOrderReturnFailureAction {
  type: OrderActionsTypes.CREATE_ORDER_RETURN_FAILURE;
  payload: AppError;
}

export interface GetOrderAndReturnByIdAction {
  type: OrderActionsTypes.GET_ORDER_AND_RETURN_BY_ID;
}

export interface GetOrderAndReturnByIdSuccessAction {
  type: OrderActionsTypes.GET_ORDER_AND_RETURN_BY_ID_SUCCESS;
  payload: OrderResponseModel;
}

export interface GetOrderAndReturnByIdFailureAction {
  type: OrderActionsTypes.GET_ORDER_AND_RETURN_BY_ID_FAILURE;
  payload: AppError;
}

export interface GetOrderByReferenceAction {
  type: OrderActionsTypes.GET_ORDER_BY_REFERENCE;
}

export interface GetOrderByReferenceSuccessAction {
  type: OrderActionsTypes.GET_ORDER_BY_REFERENCE_SUCCESS;
  payload: OrderResponseModel[];
}

export interface GetOrderByReferenceFailureAction {
  type: OrderActionsTypes.GET_ORDER_BY_REFERENCE_FAILURE;
  payload: AppError;
}

export interface GetOrderByReferenceFilterAction {
  type: OrderActionsTypes.GET_ORDER_BY_REFERENCE_FILTER;
}

export interface GetOrderByReferenceFilterSuccessAction {
  type: OrderActionsTypes.GET_ORDER_BY_REFERENCE_FILTER_SUCCESS;
  payload: OrderResponseModel[];
}

export interface GetOrderByReferenceFilterFailureAction {
  type: OrderActionsTypes.GET_ORDER_BY_REFERENCE_FILTER_FAILURE;
  payload: AppError;
}
