import { OrderResponseModel } from "../../domain/models/OrderResponseModel";
import { OrderAction } from "../actions/orderActions";
import { OrderActionsTypes } from "../enums/OrderActionsEnum";

export interface OrderState {
  loading: boolean;
  orders: OrderResponseModel[] | [];
  error: Error | null;
}

const initialState: OrderState = {
  loading: false,
  orders: [],
  error: null,
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
      return {
        ...state,
        loading: true,
        error: null,
      };

    case OrderActionsTypes.GET_ALL_ORDERS_SUCCESS:
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

    case OrderActionsTypes.GET_ALL_ORDERS_FAILURE:
    case OrderActionsTypes.GET_ORDER_FAILURE:
    case OrderActionsTypes.CREATE_ORDER_FAILURE:
    case OrderActionsTypes.UPDATE_ORDER_FAILURE:
    case OrderActionsTypes.DELETE_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
