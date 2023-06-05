import { InventoryModel } from "../../domain/models/InventoryModel";
import { InventoryAction } from "../actions/inventoryActions";
import { InventoryActionTypes } from "../enums/InventoryActionsEnum";

export interface InventoryState {
  loading: boolean;
  inventories: InventoryModel[] | [];
  error: Error | null;
}

const initialState: InventoryState = {
  loading: false,
  inventories: [],
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

    case InventoryActionTypes.GET_INVENTORIES_FAILURE:
    case InventoryActionTypes.CREATE_INVENTORY_FAILURE:
    case InventoryActionTypes.UPDATE_INVENTORY_FAILURE:
    case InventoryActionTypes.DELETE_INVENTORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        inventories: [],
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
        inventories: state.inventories,
        error: null,
      };

    case InventoryActionTypes.DELETE_INVENTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        inventories: state.inventories.filter(
          (inventory) => inventory.idInventory !== action.payload
        ),
        error: null,
      };

    default:
      return state;
  }
};
