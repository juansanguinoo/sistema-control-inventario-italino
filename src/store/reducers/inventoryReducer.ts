import { InventoryModel } from "../../domain/models/InventoryModel";
import { InventoryAction } from "../actions/inventoryActions";
import { InventoryActionTypes } from "../enums/InventoryActionsEnum";

export interface InventoryState {
  loading: boolean;
  inventories: InventoryModel[] | [];
  inventoryByNameOrReference: InventoryModel[] | [];
  inventoryToReport: InventoryModel | null;
  error: Error | null;
}

const initialState: InventoryState = {
  loading: false,
  inventories: [],
  inventoryByNameOrReference: [],
  inventoryToReport: null,
  error: null,
};

export const inventoryReducer = (
  state = initialState,
  action: InventoryAction
): InventoryState => {
  switch (action.type) {
    case InventoryActionTypes.GET_INVENTORIES:
    case InventoryActionTypes.CREATE_INVENTORY:
    case InventoryActionTypes.UPDATE_INVENTORY:
    case InventoryActionTypes.DELETE_INVENTORY:
    case InventoryActionTypes.ADD_INVENTORY:
    case InventoryActionTypes.GET_INVENTORY_BY_NAME_OR_REFERENCE:
    case InventoryActionTypes.GET_INVENTORY_TO_REPORT:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case InventoryActionTypes.GET_INVENTORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        inventories: action.payload,
        error: null,
      };

    case InventoryActionTypes.GET_INVENTORY_BY_NAME_OR_REFERENCE_SUCCESS:
      return {
        ...state,
        loading: false,
        inventoryByNameOrReference: action.payload,
        error: null,
      };

    case InventoryActionTypes.GET_INVENTORY_TO_REPORT_SUCCESS:
      return {
        ...state,
        loading: false,
        inventoryToReport: action.payload,
        error: null,
      };

    case InventoryActionTypes.GET_INVENTORIES_FAILURE:
    case InventoryActionTypes.CREATE_INVENTORY_FAILURE:
    case InventoryActionTypes.UPDATE_INVENTORY_FAILURE:
    case InventoryActionTypes.DELETE_INVENTORY_FAILURE:
    case InventoryActionTypes.ADD_INVENTORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        inventories: [],
      };

    case InventoryActionTypes.GET_INVENTORY_BY_NAME_OR_REFERENCE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        inventoryByNameOrReference: [],
      };

    case InventoryActionTypes.GET_INVENTORY_TO_REPORT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        inventoryToReport: null,
      };

    case InventoryActionTypes.CREATE_INVENTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        inventories: [...state.inventories, action.payload],
        error: null,
      };

    case InventoryActionTypes.UPDATE_INVENTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        inventories: state.inventories.map((inventory) =>
          inventory.id === action.payload.id ? action.payload : inventory
        ),
        error: null,
      };

    case InventoryActionTypes.DELETE_INVENTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        inventories: state.inventories.filter(
          (inventory) => inventory.id !== action.payload
        ),
        error: null,
      };

    case InventoryActionTypes.ADD_INVENTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        inventories: state.inventories.map((inventory) =>
          inventory.id === action.payload.id ? action.payload : inventory
        ),
        error: null,
      };

    default:
      return state;
  }
};
