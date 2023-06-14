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
import { adaptOrder } from "../../infrastructure/adapters/orderAdapter";

export type OrderAction =
  | GetAllOrdersAction
  | GetAllOrdersSuccessAction
  | GetAllOrdersFailureAction
  | GetOrderAction
  | GetOrderSuccessAction
  | GetOrderFailureAction
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
