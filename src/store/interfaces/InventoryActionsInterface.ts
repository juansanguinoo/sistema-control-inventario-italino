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
  payload: InventoryModel;
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

export interface AddInventoryAction {
  type: InventoryActionTypes.ADD_INVENTORY;
}

export interface AddInventorySuccessAction {
  type: InventoryActionTypes.ADD_INVENTORY_SUCCESS;
  payload: InventoryModel;
}

export interface AddInventoryFailureAction {
  type: InventoryActionTypes.ADD_INVENTORY_FAILURE;
  payload: AppError;
}

export interface GetInventoryByNameOrReferenceAction {
  type: InventoryActionTypes.GET_INVENTORY_BY_NAME_OR_REFERENCE;
}

export interface GetInventoryByNameOrReferenceSuccessAction {
  type: InventoryActionTypes.GET_INVENTORY_BY_NAME_OR_REFERENCE_SUCCESS;
  payload: InventoryModel[];
}

export interface GetInventoryByNameOrReferenceFailureAction {
  type: InventoryActionTypes.GET_INVENTORY_BY_NAME_OR_REFERENCE_FAILURE;
  payload: AppError;
}

export interface GetInventoryToReportAction {
  type: InventoryActionTypes.GET_INVENTORY_TO_REPORT;
}

export interface GetInventoryToReportSuccessAction {
  type: InventoryActionTypes.GET_INVENTORY_TO_REPORT_SUCCESS;
  payload: InventoryModel;
}

export interface GetInventoryToReportFailureAction {
  type: InventoryActionTypes.GET_INVENTORY_TO_REPORT_FAILURE;
  payload: AppError;
}
