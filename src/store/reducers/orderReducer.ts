import { OrderInfoResponse } from "../../domain/models/OrderInfoResponse";
import { OrderProductionResponseModel } from "../../domain/models/OrderProductionResponseModel";
import { OrderResponseModel } from "../../domain/models/OrderResponseModel";
import { OrderAction } from "../actions/orderActions";
import { OrderActionsTypes } from "../enums/OrderActionsEnum";

export interface OrderState {
  loading: boolean;
  orders: OrderResponseModel[] | [];
  ordersByReference: OrderResponseModel[] | [];
  orderToReport: OrderResponseModel | null;
  error: Error | null;
  orderInfo: OrderInfoResponse | null;
  ordersProduction: OrderProductionResponseModel[] | [];
}

const initialState: OrderState = {
  loading: false,
  orders: [],
  ordersByReference: [],
  orderToReport: null,
  error: null,
  orderInfo: null,
  ordersProduction: [],
};

export const orderReducer = (
  state: OrderState = initialState,
  action: OrderAction
): OrderState => {
  switch (action.type) {
    case OrderActionsTypes.GET_ALL_ORDERS:
    case OrderActionsTypes.GET_ORDER:
    case OrderActionsTypes.CREATE_ORDER:
    case OrderActionsTypes.UPDATE_ORDER:
    case OrderActionsTypes.DELETE_ORDER:
    case OrderActionsTypes.GET_ORDERS_BY_USER:
    case OrderActionsTypes.CREATE_ORDER_RETURN:
    case OrderActionsTypes.GET_ORDER_AND_RETURN_BY_ID:
    case OrderActionsTypes.GET_ORDER_BY_REFERENCE:
    case OrderActionsTypes.GET_ORDER_BY_REFERENCE_FILTER:
    case OrderActionsTypes.GET_ORDER_STATS:
    case OrderActionsTypes.GET_ORDERS_PRODUCTION:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case OrderActionsTypes.GET_ORDERS_PRODUCTION_SUCCESS:
      return {
        ...state,
        loading: false,
        ordersProduction: action.payload,
        error: null,
      };

    case OrderActionsTypes.GET_ORDER_STATS_SUCCESS:
      return {
        ...state,
        loading: false,
        orderInfo: action.payload,
        error: null,
      };

    case OrderActionsTypes.GET_ALL_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
        error: null,
      };

    case OrderActionsTypes.GET_ORDER_BY_REFERENCE_FILTER_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
        error: null,
      };

    case OrderActionsTypes.GET_ORDERS_BY_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
        error: null,
      };

    case OrderActionsTypes.GET_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: [action.payload],
        error: null,
      };

    case OrderActionsTypes.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: [...state.orders, action.payload],
        error: null,
      };

    case OrderActionsTypes.DELETE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: state.orders.filter((order) => order.id !== action.payload),
        error: null,
      };

    case OrderActionsTypes.UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: state.orders.map((order) =>
          order.id === action.payload.id ? action.payload : order
        ),
        error: null,
      };

    case OrderActionsTypes.CREATE_ORDER_RETURN_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: state.orders.map((order) =>
          order.id === action.payload.id ? action.payload : order
        ),
        error: null,
      };

    case OrderActionsTypes.GET_ORDER_AND_RETURN_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        orderToReport: action.payload,
        error: null,
      };

    case OrderActionsTypes.GET_ORDER_BY_REFERENCE_SUCCESS:
      return {
        ...state,
        loading: false,
        ordersByReference: action.payload,
        error: null,
      };

    case OrderActionsTypes.GET_ORDER_AND_RETURN_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        ordersByReference: [],
        error: action.payload,
      };

    case OrderActionsTypes.GET_ALL_ORDERS_FAILURE:
      return {
        ...state,
        loading: false,
        orderToReport: null,
        error: action.payload,
      };

    case OrderActionsTypes.GET_ORDER_STATS_FAILURE:
      return {
        ...state,
        loading: false,
        orderInfo: null,
        error: action.payload,
      };

    case OrderActionsTypes.GET_ORDERS_PRODUCTION_FAILURE:
      return {
        ...state,
        loading: false,
        ordersProduction: [],
        error: action.payload,
      };
    case OrderActionsTypes.GET_ORDER_FAILURE:
    case OrderActionsTypes.CREATE_ORDER_FAILURE:
    case OrderActionsTypes.UPDATE_ORDER_FAILURE:
    case OrderActionsTypes.DELETE_ORDER_FAILURE:
    case OrderActionsTypes.GET_ORDERS_BY_USER_FAILURE:
    case OrderActionsTypes.CREATE_ORDER_RETURN_FAILURE:
    case OrderActionsTypes.GET_ORDER_BY_REFERENCE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
