import { AppError } from "../../domain/errors/AppError";
import { InventoryModel } from "../../domain/models/InventoryModel";
import { InventoryActionTypes } from "../enums/InventoryActionsEnum";

export interface GetInventoryAction {
  type: InventoryActionTypes.GET_INVENTORIES;
}

export interface GetInventorySuccessAction {
  type: InventoryActionTypes.GET_INVENTORIES_SUCCESS;
  payload: InventoryModel[];
}

export interface GetInventoryFailureAction {
  type: InventoryActionTypes.GET_INVENTORIES_FAILURE;
  payload: AppError;
}

export interface CreateInventoryAction {
  type: InventoryActionTypes.CREATE_INVENTORY;
}

export interface CreateInventorySuccessAction {
  type: InventoryActionTypes.CREATE_INVENTORY_SUCCESS;
  payload: InventoryModel;
}

export interface CreateInventoryFailureAction {
  type: InventoryActionTypes.CREATE_INVENTORY_FAILURE;
  payload: AppError;
}

export interface UpdateInventoryAction {
  type: InventoryActionTypes.UPDATE_INVENTORY;
}

export interface UpdateInventorySuccessAction {
  type: InventoryActionTypes.UPDATE_INVENTORY_SUCCESS;
  payload: number;
}

export interface UpdateInventoryFailureAction {
  type: InventoryActionTypes.UPDATE_INVENTORY_FAILURE;
  payload: AppError;
}

export interface DeleteInventoryAction {
  type: InventoryActionTypes.DELETE_INVENTORY;
}

export interface DeleteInventorySuccessAction {
  type: InventoryActionTypes.DELETE_INVENTORY_SUCCESS;
  payload: number;
}

export interface DeleteInventoryFailureAction {
  type: InventoryActionTypes.DELETE_INVENTORY_FAILURE;
  payload: AppError;
}