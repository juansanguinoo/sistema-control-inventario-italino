import { CustomerInfoResponse } from "../../domain/models/CustomerInfoResponse";
import { CustomerModel } from "../../domain/models/CustomerModel";
import { CustomerAction } from "../actions/customerActions";
import { CustomerActionsTypes } from "../enums/CustomerActionsEnum";

export interface CustomerState {
  loading: boolean;
  customers: CustomerModel[] | [];
  error: Error | null;
  customerInfo: CustomerInfoResponse | null;
}

const initialState: CustomerState = {
  loading: false,
  customers: [],
  error: null,
  customerInfo: null,
};

export const customerReducer = (
  state: CustomerState = initialState,
  action: CustomerAction
): CustomerState => {
  switch (action.type) {
    case CustomerActionsTypes.GET_ALL_CUSTOMERS:
    case CustomerActionsTypes.GET_CUSTOMER_BY_ID:
    case CustomerActionsTypes.GET_CUSTOMER_BY_USER_ID:
    case CustomerActionsTypes.CREATE_CUSTOMER:
    case CustomerActionsTypes.UPDATE_CUSTOMER:
    case CustomerActionsTypes.DELETE_CUSTOMER:
    case CustomerActionsTypes.GET_CUSTOMERS_BY_NAME_OR_NIT:
    case CustomerActionsTypes.GET_CUSTOMER_INFO:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case CustomerActionsTypes.GET_CUSTOMERS_BY_NAME_OR_NIT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        customers: action.payload,
      };

    case CustomerActionsTypes.GET_ALL_CUSTOMERS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        customers: action.payload,
      };

    case CustomerActionsTypes.UPDATE_CUSTOMER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CustomerActionsTypes.GET_CUSTOMER_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        customerInfo: action.payload,
      };

    case CustomerActionsTypes.GET_CUSTOMER_INFO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        customerInfo: null,
      };

    case CustomerActionsTypes.CREATE_CUSTOMER_FAILURE:
    case CustomerActionsTypes.DELETE_CUSTOMER_FAILURE:
    case CustomerActionsTypes.GET_ALL_CUSTOMERS_FAILURE:
    case CustomerActionsTypes.GET_CUSTOMER_BY_ID_FAILURE:
    case CustomerActionsTypes.GET_CUSTOMER_BY_USER_ID_FAILURE:
    case CustomerActionsTypes.GET_CUSTOMERS_BY_NAME_OR_NIT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        customers: [],
      };

    case CustomerActionsTypes.CREATE_CUSTOMER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        customers: [...state.customers, action.payload],
      };

    case CustomerActionsTypes.DELETE_CUSTOMER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        customers: state.customers.filter(
          (customer) => customer.id !== action.payload
        ),
      };

    case CustomerActionsTypes.GET_CUSTOMER_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        customers: [action.payload],
      };

    case CustomerActionsTypes.GET_CUSTOMER_BY_USER_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        customers: action.payload,
      };

    case CustomerActionsTypes.UPDATE_CUSTOMER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        customers: state.customers.map((customer) =>
          customer.id === action.payload.id ? action.payload : customer
        ),
      };

    default:
      return state;
  }
};
