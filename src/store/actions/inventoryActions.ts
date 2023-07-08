import { Dispatch } from "redux";
import {
  AddInventoryAction,
  AddInventoryFailureAction,
  AddInventorySuccessAction,
  CreateInventoryAction,
  CreateInventoryFailureAction,
  CreateInventorySuccessAction,
  DeleteInventoryAction,
  DeleteInventoryFailureAction,
  DeleteInventorySuccessAction,
  GetInventoryAction,
  GetInventoryByNameOrReferenceAction,
  GetInventoryByNameOrReferenceFailureAction,
  GetInventoryByNameOrReferenceFilterAction,
  GetInventoryByNameOrReferenceFilterFailureAction,
  GetInventoryByNameOrReferenceFilterSuccessAction,
  GetInventoryByNameOrReferenceSuccessAction,
  GetInventoryFailureAction,
  GetInventorySuccessAction,
  GetInventoryToReportAction,
  GetInventoryToReportFailureAction,
  GetInventoryToReportSuccessAction,
  UpdateInventoryAction,
  UpdateInventoryFailureAction,
  UpdateInventorySuccessAction,
  GetInventoriesByCategoryIdAction,
  GetInventoriesByCategoryIdSuccessAction,
  GetInventoriesByCategoryIdFailureAction,
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
import { UpdateInventoryUseCase } from "../../domain/useCases/inventory/UpdateInventoryUseCase";
import { DeleteInventoryUseCase } from "../../domain/useCases/inventory/DeleteInventoryUseCase";
import { AddInventoryUseCase } from "../../domain/useCases/inventory/AddInventoryUseCase";
import { AddInventoryRequest } from "../../domain/models/AddInventoryRequest";
import { GetInventoryByNameOrReferenceUseCase } from "../../domain/useCases/inventory/GetInventoryByNameOrReference";
import { GetInventoryToReportUseCase } from "../../domain/useCases/inventory/GetInventoryToReport";
import { GetInventoriesByCategoryIdUseCase } from "../../domain/useCases/inventory/getInventoriesByCategoryIdUseCase";

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
  | DeleteInventoryFailureAction
  | AddInventoryAction
  | AddInventorySuccessAction
  | AddInventoryFailureAction
  | GetInventoryByNameOrReferenceAction
  | GetInventoryByNameOrReferenceSuccessAction
  | GetInventoryByNameOrReferenceFailureAction
  | GetInventoryByNameOrReferenceFilterAction
  | GetInventoryByNameOrReferenceFilterSuccessAction
  | GetInventoryByNameOrReferenceFilterFailureAction
  | GetInventoryToReportAction
  | GetInventoryToReportSuccessAction
  | GetInventoryToReportFailureAction
  | GetInventoriesByCategoryIdAction
  | GetInventoriesByCategoryIdSuccessAction
  | GetInventoriesByCategoryIdFailureAction;

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

export const updateInventory = (inventory: InventoryModel) => {
  return async (dispatch: Dispatch) => {
    const useCase = container.get<UpdateInventoryUseCase>(
      TYPES.UpdateInventoryUseCase
    );

    dispatch({ type: InventoryActionTypes.UPDATE_INVENTORY });

    try {
      const response = await useCase.execute(inventory);
      dispatch({
        type: InventoryActionTypes.UPDATE_INVENTORY_SUCCESS,
        payload: adaptInventory(response.data!),
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

export const addInventory = (addInventory: AddInventoryRequest) => {
  return async (dispatch: Dispatch) => {
    const useCase = container.get<AddInventoryUseCase>(
      TYPES.AddInventoryUseCase
    );

    dispatch({ type: InventoryActionTypes.ADD_INVENTORY });

    try {
      const createdInventory = await useCase.execute(addInventory);
      dispatch({
        type: InventoryActionTypes.ADD_INVENTORY_SUCCESS,
        payload: adaptInventory(createdInventory.data!),
      });
    } catch (error) {
      dispatch({
        type: InventoryActionTypes.ADD_INVENTORY_FAILURE,
        payload: error,
      });
    }
  };
};

export const getInventoryByNameOrRefrence = (nameOrRefrence: string) => {
  return async (dispatch: Dispatch) => {
    const useCase = container.get<GetInventoryByNameOrReferenceUseCase>(
      TYPES.GetInventoryByNameOrReferenceUseCase
    );

    dispatch({ type: InventoryActionTypes.GET_INVENTORY_BY_NAME_OR_REFERENCE });

    try {
      const inventory = await useCase.execute(nameOrRefrence);
      dispatch({
        type: InventoryActionTypes.GET_INVENTORY_BY_NAME_OR_REFERENCE_SUCCESS,
        payload: adaptInventories(inventory.data!),
      });
    } catch (error: any) {
      const handleError = new AppError(
        `Ocurrió un error al obtener el inventario: ${error}`
      );
      dispatch({
        type: InventoryActionTypes.GET_INVENTORY_BY_NAME_OR_REFERENCE_FAILURE,
        payload: handleError,
      });
    }
  };
};

export const getInventoryByNameOrRefrenceFilter = (nameOrRefrence: string) => {
  return async (dispatch: Dispatch) => {
    const useCase = container.get<GetInventoryByNameOrReferenceUseCase>(
      TYPES.GetInventoryByNameOrReferenceUseCase
    );

    dispatch({
      type: InventoryActionTypes.GET_INVENTORY_BY_NAME_OR_REFERENCE_FILTER,
    });

    try {
      const inventory = await useCase.execute(nameOrRefrence);
      dispatch({
        type: InventoryActionTypes.GET_INVENTORY_BY_NAME_OR_REFERENCE_SUCCESS_FILTER,
        payload: adaptInventories(inventory.data!),
      });
    } catch (error: any) {
      const handleError = new AppError(
        `Ocurrió un error al obtener el inventario: ${error}`
      );
      dispatch({
        type: InventoryActionTypes.GET_INVENTORY_BY_NAME_OR_REFERENCE_FAILURE_FILTER,
        payload: handleError,
      });
    }
  };
};

export const getInventoryToReport = (inventoryId: number) => {
  return async (dispatch: Dispatch) => {
    const useCase = container.get<GetInventoryToReportUseCase>(
      TYPES.GetInventoryToReportUseCase
    );

    dispatch({ type: InventoryActionTypes.GET_INVENTORY_TO_REPORT });

    try {
      const inventory = await useCase.execute(inventoryId);
      dispatch({
        type: InventoryActionTypes.GET_INVENTORY_TO_REPORT_SUCCESS,
        payload: adaptInventory(inventory.data!),
      });
    } catch (error: any) {
      const handleError = new AppError(
        `Ocurrió un error al obtener el inventario: ${error}`
      );
      dispatch({
        type: InventoryActionTypes.GET_INVENTORY_TO_REPORT_FAILURE,
        payload: handleError,
      });
    }
  };
};

export const getInventoriesByCategoryId = (categoryId: number) => {
  return async (dispatch: Dispatch) => {
    const useCase = container.get<GetInventoriesByCategoryIdUseCase>(
      TYPES.GetInventoriesByCategoryIdUseCase
    );

    dispatch({ type: InventoryActionTypes.GET_INVENTORIES_BY_CATEGORY_ID });

    try {
      const inventories = await useCase.execute(categoryId);
      dispatch({
        type: InventoryActionTypes.GET_INVENTORIES_BY_CATEGORY_ID_SUCCESS,
        payload: adaptInventories(inventories.data!),
      });
    } catch (error: any) {
      const handleError = new AppError(
        `Ocurrió un error al obtener el inventario: ${error}`
      );
      dispatch({
        type: InventoryActionTypes.GET_INVENTORIES_BY_CATEGORY_ID_FAILURE,
        payload: handleError,
      });
    }
  };
};
