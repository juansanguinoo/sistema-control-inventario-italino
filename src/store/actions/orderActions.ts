import { Dispatch } from "redux";
import {
  CreateOrderAction,
  CreateOrderFailureAction,
  CreateOrderSuccessAction,
  DeleteOrderAction,
  DeleteOrderFailureAction,
  DeleteOrderSuccessAction,
  GetAllOrdersAction,
  GetAllOrdersFailureAction,
  GetAllOrdersSuccessAction,
  GetOrderAction,
  GetOrderFailureAction,
  GetOrderSuccessAction,
  GetOrdersByUserAction,
  GetOrdersByUserFailureAction,
  GetOrdersByUserSuccessAction,
  UpdateOrderAction,
  UpdateOrderFailureAction,
  UpdateOrderSuccessAction,
} from "../interfaces/OrderActionsInterface";
import { container } from "../../config/inversifyContainer";
import { CreateOrderUseCase } from "../../domain/useCases/order/CreateOrderUseCase";
import { TYPES } from "../../config/types";
import { OrderActionsTypes } from "../enums/OrderActionsEnum";
import { AppError } from "../../domain/errors/AppError";
import { OrderRequest } from "../../domain/models/OrderRequest";
import {
  adaptOrder,
  adaptOrders,
} from "../../infrastructure/adapters/orderAdapter";
import { GetAllOrdersUseCase } from "../../domain/useCases/order/GetAllOrdersUseCase";
import { GetOrderByUserIdUseCase } from "../../domain/useCases/order/GetOrderByUserIdUseCase";
import { GetOrderByIdUseCase } from "../../domain/useCases/order/GetOrderByIdUseCase";
import { UpdateOrderUseCase } from "../../domain/useCases/order/UpdateOrderUseCase";

export type OrderAction =
  | GetAllOrdersAction
  | GetAllOrdersSuccessAction
  | GetAllOrdersFailureAction
  | GetOrderAction
  | GetOrderSuccessAction
  | GetOrderFailureAction
  | GetOrdersByUserAction
  | GetOrdersByUserSuccessAction
  | GetOrdersByUserFailureAction
  | CreateOrderAction
  | CreateOrderSuccessAction
  | CreateOrderFailureAction
  | UpdateOrderAction
  | UpdateOrderSuccessAction
  | UpdateOrderFailureAction
  | DeleteOrderAction
  | DeleteOrderSuccessAction
  | DeleteOrderFailureAction;

export const createOrder = (order: OrderRequest) => {
  return async (dispatch: Dispatch<OrderAction>) => {
    const useCase = container.get<CreateOrderUseCase>(TYPES.CreateOrderUseCase);

    dispatch({ type: OrderActionsTypes.CREATE_ORDER });

    try {
      const result = await useCase.execute(order);

      dispatch({
        type: OrderActionsTypes.CREATE_ORDER_SUCCESS,
        payload: adaptOrder(result.data!),
      });
    } catch (error) {
      const handleError = new AppError(
        `Ocurrió un error al crear la orden ${error}`
      );
      dispatch({
        type: OrderActionsTypes.CREATE_ORDER_FAILURE,
        payload: handleError,
      });
    }
  };
};

export const getAllOrders = () => {
  return async (dispatch: Dispatch<OrderAction>) => {
    const useCase = container.get<GetAllOrdersUseCase>(
      TYPES.GetAllOrdersUseCase
    );

    dispatch({ type: OrderActionsTypes.GET_ALL_ORDERS });

    try {
      const result = await useCase.execute();

      dispatch({
        type: OrderActionsTypes.GET_ALL_ORDERS_SUCCESS,
        payload: adaptOrders(result.data!),
      });
    } catch (error) {
      const handleError = new AppError(
        `Ocurrió un error al obtener las ordenes ${error}`
      );
      dispatch({
        type: OrderActionsTypes.GET_ALL_ORDERS_FAILURE,
        payload: handleError,
      });
    }
  };
};

export const getOrdersByUserId = (userId: number) => {
  return async (dispatch: Dispatch<OrderAction>) => {
    const useCase = container.get<GetOrderByUserIdUseCase>(
      TYPES.GetOrderByUserIdUseCase
    );

    dispatch({ type: OrderActionsTypes.GET_ORDERS_BY_USER });

    try {
      const result = await useCase.execute(userId);

      dispatch({
        type: OrderActionsTypes.GET_ORDERS_BY_USER_SUCCESS,
        payload: adaptOrders(result.data!),
      });
    } catch (error) {
      const handleError = new AppError(
        `Ocurrió un error al obtener las ordenes ${error}`
      );
      dispatch({
        type: OrderActionsTypes.GET_ORDERS_BY_USER_FAILURE,
        payload: handleError,
      });
    }
  };
};

export const getOrderById = (orderId: number) => {
  return async (dispatch: Dispatch<OrderAction>) => {
    const useCase = container.get<GetOrderByIdUseCase>(
      TYPES.GetOrderByIdUseCase
    );

    dispatch({ type: OrderActionsTypes.GET_ORDER });

    try {
      const result = await useCase.execute(orderId);

      dispatch({
        type: OrderActionsTypes.GET_ORDER_SUCCESS,
        payload: adaptOrder(result.data!),
      });
    } catch (error) {
      const handleError = new AppError(
        `Ocurrió un error al obtener la orden ${error}`
      );
      dispatch({
        type: OrderActionsTypes.GET_ORDER_FAILURE,
        payload: handleError,
      });
    }
  };
};

export const updateOrder = (order: OrderRequest) => {
  return async (dispatch: Dispatch<OrderAction>) => {
    const useCase = container.get<UpdateOrderUseCase>(TYPES.UpdateOrderUseCase);

    dispatch({ type: OrderActionsTypes.UPDATE_ORDER });

    try {
      const result = await useCase.execute(order);

      dispatch({
        type: OrderActionsTypes.UPDATE_ORDER_SUCCESS,
        payload: adaptOrder(result.data!),
      });
    } catch (error) {
      const handleError = new AppError(
        `Ocurrió un error al actualizar la orden ${error}`
      );
      dispatch({
        type: OrderActionsTypes.UPDATE_ORDER_FAILURE,
        payload: handleError,
      });
    }
  };
};
