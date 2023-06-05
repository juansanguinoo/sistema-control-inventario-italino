import { Dispatch } from "redux";
import {
  CreateInventoryAction,
  CreateInventoryFailureAction,
  CreateInventorySuccessAction,
  DeleteInventoryAction,
  DeleteInventoryFailureAction,
  DeleteInventorySuccessAction,
  GetInventoryAction,
  GetInventoryFailureAction,
  GetInventorySuccessAction,
  UpdateInventoryAction,
  UpdateInventoryFailureAction,
  UpdateInventorySuccessAction,
} from "../interfaces/InventoryActionsInterface";
import { container } from "../../config/inversifyContainer";
import { GetInventoriesUseCase } from "../../domain/useCases/inventory/GetInventoriesUseCase";
import { TYPES } from "../../config/types";
import { InventoryActionTypes } from "../enums/InventoryActionsEnum";
import { AppError } from "../../domain/errors/AppError";
import {
  adaptInventories,
  adaptInventory,
} from "../../infrastructure/adapters/inventoryAdapter";
import { InventoryModel } from "../../domain/models/InventoryModel";
import { CreateInventoryUseCase } from "../../domain/useCases/inventory/CreateInventoryUseCase";
import { Inventory } from "../../domain/models/Inventory";
import { UpdateInventoryUseCase } from "../../domain/useCases/inventory/UpdateInventoryUseCase";
import { DeleteInventoryUseCase } from "../../domain/useCases/inventory/DeleteInventoryUseCase";

export type InventoryAction =
  | GetInventoryAction
  | GetInventorySuccessAction
  | GetInventoryFailureAction
  | CreateInventoryAction
  | CreateInventorySuccessAction
  | CreateInventoryFailureAction
  | UpdateInventoryAction
  | UpdateInventorySuccessAction
  | UpdateInventoryFailureAction
  | DeleteInventoryAction
  | DeleteInventorySuccessAction
  | DeleteInventoryFailureAction;

export const getInventory = () => {
  return async (dispatch: Dispatch<InventoryAction>) => {
    const useCase = container.get<GetInventoriesUseCase>(
      TYPES.GetInventoriesUseCase
    );

    dispatch({ type: InventoryActionTypes.GET_INVENTORIES });

    try {
      const inventory = await useCase.execute();
      dispatch({
        type: InventoryActionTypes.GET_INVENTORIES_SUCCESS,
        payload: adaptInventories(inventory.data!),
      });
    } catch (error: any) {
      const handleError = new AppError(
        `Ocurrió un error al obtener el inventario: ${error}`
      );
      dispatch({
        type: InventoryActionTypes.GET_INVENTORIES_FAILURE,
        payload: handleError,
      });
    }
  };
};

export const createInventory = (inventory: InventoryModel) => {
  return async (dispatch: Dispatch) => {
    const useCase = container.get<CreateInventoryUseCase>(
      TYPES.CreateInventoryUseCase
    );

    dispatch({ type: InventoryActionTypes.CREATE_INVENTORY });

    try {
      const createdInventory = await useCase.execute(inventory);
      dispatch({
        type: InventoryActionTypes.CREATE_INVENTORY_SUCCESS,
        payload: adaptInventory(createdInventory.data!),
      });
    } catch (error) {
      dispatch({
        type: InventoryActionTypes.CREATE_INVENTORY_FAILURE,
        payload: error,
      });
    }
  };
};

export const updateInventory = (idInventory: number, inventory: Inventory) => {
  return async (dispatch: Dispatch) => {
    const useCase = container.get<UpdateInventoryUseCase>(
      TYPES.UpdateInventoryUseCase
    );

    dispatch({ type: InventoryActionTypes.UPDATE_INVENTORY });

    try {
      await useCase.execute(idInventory, inventory);
      dispatch({
        type: InventoryActionTypes.UPDATE_INVENTORY_SUCCESS,
        payload: idInventory,
      });
    } catch (error) {
      dispatch({
        type: InventoryActionTypes.UPDATE_INVENTORY_FAILURE,
        payload: error,
      });
    }
  };
};

export const deleteInventory = (idInventory: number) => {
  return async (dispatch: Dispatch) => {
    const useCase = container.get<DeleteInventoryUseCase>(
      TYPES.DeleteInventoryUseCase
    );

    dispatch({ type: InventoryActionTypes.DELETE_INVENTORY });

    try {
      await useCase.execute(idInventory);
      dispatch({
        type: InventoryActionTypes.DELETE_INVENTORY_SUCCESS,
        payload: idInventory,
      });
    } catch (error) {
      dispatch({
        type: InventoryActionTypes.DELETE_INVENTORY_FAILURE,
        payload: error,
      });
    }
  };
};
