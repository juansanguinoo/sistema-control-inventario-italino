import { Dispatch } from "redux";
import {
  CreateOrderAction,
  CreateOrderFailureAction,
  CreateOrderReturnAction,
  CreateOrderReturnFailureAction,
  CreateOrderReturnSuccessAction,
  CreateOrderSuccessAction,
  DeleteOrderAction,
  DeleteOrderFailureAction,
  DeleteOrderSuccessAction,
  GetAllOrdersAction,
  GetAllOrdersFailureAction,
  GetAllOrdersSuccessAction,
  GetOrderAction,
  GetOrderAndReturnByIdAction,
  GetOrderAndReturnByIdFailureAction,
  GetOrderAndReturnByIdSuccessAction,
  GetOrderByReferenceAction,
  GetOrderByReferenceFailureAction,
  GetOrderByReferenceFilterAction,
  GetOrderByReferenceFilterFailureAction,
  GetOrderByReferenceFilterSuccessAction,
  GetOrderByReferenceSuccessAction,
  GetOrderFailureAction,
  GetOrderStatsAction,
  GetOrderStatsFailureAction,
  GetOrderStatsSuccessAction,
  GetOrderSuccessAction,
  GetOrdersByUserAction,
  GetOrdersByUserFailureAction,
  GetOrdersByUserSuccessAction,
  GetOrdersProductionAction,
  GetOrdersProductionFailureAction,
  GetOrdersProductionSuccessAction,
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
  adaptOrdersProduction,
} from "../../infrastructure/adapters/orderAdapter";
import { GetAllOrdersUseCase } from "../../domain/useCases/order/GetAllOrdersUseCase";
import { GetOrderByUserIdUseCase } from "../../domain/useCases/order/GetOrderByUserIdUseCase";
import { GetOrderByIdUseCase } from "../../domain/useCases/order/GetOrderByIdUseCase";
import { UpdateOrderUseCase } from "../../domain/useCases/order/UpdateOrderUseCase";
import { OrderReturnRequest } from "../../domain/models/OrderReturnRequest";
import { CreateOrderReturnUseCase } from "../../domain/useCases/order/CreateOrderReturnUseCase";
import { GetOrderAndReturnByIdUseCase } from "../../domain/useCases/order/getOrderAndReturnByIdUseCase";
import { GetOrderByReferenceUseCase } from "../../domain/useCases/order/getOrderByReferenceUseCase";
import { GetOrderStatsUseCase } from "../../domain/useCases/order/GetOrderStatsUseCase";
import { GetOrdersProductionUseCase } from "../../domain/useCases/order/GetOrderProductionUseCase";

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
  | DeleteOrderFailureAction
  | CreateOrderReturnAction
  | CreateOrderReturnSuccessAction
  | CreateOrderReturnFailureAction
  | GetOrderAndReturnByIdAction
  | GetOrderAndReturnByIdSuccessAction
  | GetOrderAndReturnByIdFailureAction
  | GetOrderByReferenceAction
  | GetOrderByReferenceSuccessAction
  | GetOrderByReferenceFailureAction
  | GetOrderByReferenceFilterAction
  | GetOrderByReferenceFilterSuccessAction
  | GetOrderByReferenceFilterFailureAction
  | GetOrderStatsAction
  | GetOrderStatsSuccessAction
  | GetOrderStatsFailureAction
  | GetOrdersProductionAction
  | GetOrdersProductionSuccessAction
  | GetOrdersProductionFailureAction;

export const createOrder = (order: OrderRequest) => {
  return async (dispatch: Dispatch<OrderAction>) => {
    const useCase = container.get<CreateOrderUseCase>(TYPES.CreateOrderUseCase);

    dispatch({ type: OrderActionsTypes.CREATE_ORDER });

    try {
      const result = await useCase.execute(order);
      console.log(result.data);
      console.log(adaptOrder(result.data!));

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

export const createOrderReturn = (order: OrderReturnRequest) => {
  return async (dispatch: Dispatch<OrderAction>) => {
    const useCase = container.get<CreateOrderReturnUseCase>(
      TYPES.CreateOrderReturnUseCase
    );

    dispatch({ type: OrderActionsTypes.CREATE_ORDER_RETURN });

    try {
      const result = await useCase.execute(order);

      dispatch({
        type: OrderActionsTypes.CREATE_ORDER_RETURN_SUCCESS,
        payload: adaptOrder(result.data!),
      });
    } catch (error) {
      const handleError = new AppError(
        `Ocurrió un error al crear la orden de devolución ${error}`
      );
      dispatch({
        type: OrderActionsTypes.CREATE_ORDER_RETURN_FAILURE,
        payload: handleError,
      });
    }
  };
};

export const getOrderAndReturnById = (orderId: number) => {
  return async (dispatch: Dispatch<OrderAction>) => {
    const useCase = container.get<GetOrderAndReturnByIdUseCase>(
      TYPES.GetOrderAndReturnByIdUseCase
    );

    dispatch({ type: OrderActionsTypes.GET_ORDER_AND_RETURN_BY_ID });

    try {
      const result = await useCase.execute(orderId);

      dispatch({
        type: OrderActionsTypes.GET_ORDER_AND_RETURN_BY_ID_SUCCESS,
        payload: adaptOrder(result.data!),
      });
    } catch (error) {
      const handleError = new AppError(
        `Ocurrió un error al obtener la orden ${error}`
      );
      dispatch({
        type: OrderActionsTypes.GET_ORDER_AND_RETURN_BY_ID_FAILURE,
        payload: handleError,
      });
    }
  };
};

export const getOrderByReference = (reference: string) => {
  return async (dispatch: Dispatch<OrderAction>) => {
    const useCase = container.get<GetOrderByReferenceUseCase>(
      TYPES.GetOrderByReferenceUseCase
    );

    dispatch({ type: OrderActionsTypes.GET_ORDER_BY_REFERENCE });

    try {
      const result = await useCase.execute(reference);

      dispatch({
        type: OrderActionsTypes.GET_ORDER_BY_REFERENCE_SUCCESS,
        payload: adaptOrders(result.data!),
      });
    } catch (error) {
      const handleError = new AppError(
        `Ocurrió un error al obtener la orden ${error}`
      );
      dispatch({
        type: OrderActionsTypes.GET_ORDER_BY_REFERENCE_FAILURE,
        payload: handleError,
      });
    }
  };
};

export const getOrderByReferenceFilter = (reference: string) => {
  return async (dispatch: Dispatch<OrderAction>) => {
    const useCase = container.get<GetOrderByReferenceUseCase>(
      TYPES.GetOrderByReferenceUseCase
    );

    dispatch({ type: OrderActionsTypes.GET_ORDER_BY_REFERENCE_FILTER });

    try {
      const result = await useCase.execute(reference);

      dispatch({
        type: OrderActionsTypes.GET_ORDER_BY_REFERENCE_FILTER_SUCCESS,
        payload: adaptOrders(result.data!),
      });
    } catch (error) {
      const handleError = new AppError(
        `Ocurrió un error al obtener la orden ${error}`
      );
      dispatch({
        type: OrderActionsTypes.GET_ORDER_BY_REFERENCE_FILTER_FAILURE,
        payload: handleError,
      });
    }
  };
};

export const getOrderByReferenceProductionFilter = (reference: string) => {
  return async (dispatch: Dispatch<OrderAction>) => {
    const useCase = container.get<GetOrderByReferenceUseCase>(
      TYPES.GetOrderByReferenceUseCase
    );

    dispatch({ type: OrderActionsTypes.GET_ORDERS_PRODUCTION });

    try {
      const result = await useCase.execute(reference);

      dispatch({
        type: OrderActionsTypes.GET_ORDERS_PRODUCTION_SUCCESS,
        payload: adaptOrdersProduction(result.data!),
      });
    } catch (error) {
      const handleError = new AppError(
        `Ocurrió un error al obtener la orden ${error}`
      );
      dispatch({
        type: OrderActionsTypes.GET_ORDERS_PRODUCTION_FAILURE,
        payload: handleError,
      });
    }
  };
};

export const getOrderStats = () => {
  return async (dispatch: Dispatch<OrderAction>) => {
    const useCase = container.get<GetOrderStatsUseCase>(
      TYPES.GetOrderStatsUseCase
    );

    dispatch({ type: OrderActionsTypes.GET_ORDER_STATS });

    try {
      const result = await useCase.execute();

      dispatch({
        type: OrderActionsTypes.GET_ORDER_STATS_SUCCESS,
        payload: result.data!,
      });
    } catch (error) {
      const handleError = new AppError(
        `Ocurrió un error al obtener las estadísticas de las ordenes ${error}`
      );
      dispatch({
        type: OrderActionsTypes.GET_ORDER_STATS_FAILURE,
        payload: handleError,
      });
    }
  };
};

export const getOrdersProduction = () => {
  return async (dispatch: Dispatch<OrderAction>) => {
    const useCase = container.get<GetOrdersProductionUseCase>(
      TYPES.GetOrdersProductionUseCase
    );

    dispatch({ type: OrderActionsTypes.GET_ORDERS_PRODUCTION });

    try {
      const result = await useCase.execute();

      dispatch({
        type: OrderActionsTypes.GET_ORDERS_PRODUCTION_SUCCESS,
        payload: adaptOrdersProduction(result.data!),
      });
    } catch (error) {
      const handleError = new AppError(
        `Ocurrió un error al obtener las ordenes en producción ${error}`
      );
      dispatch({
        type: OrderActionsTypes.GET_ORDERS_PRODUCTION_FAILURE,
        payload: handleError,
      });
    }
  };
};
