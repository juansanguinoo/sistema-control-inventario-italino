import { ResponseAPI } from "../../infrastructure/api/models/ResponseApi";
import { AddInventoryRequest } from "../models/AddInventoryRequest";
import { Inventory } from "../models/Inventory";
import { InventoryModel } from "../models/InventoryModel";

export interface IInventoryRepository {
  getInventories(): Promise<ResponseAPI<Inventory[]>>;
  createInventory(inventory: InventoryModel): Promise<ResponseAPI<Inventory>>;
  updateInventory(inventory: InventoryModel): Promise<ResponseAPI<Inventory>>;
  deleteInventory(inventoryId: number): Promise<ResponseAPI<boolean>>;
  addInventory(
    addInventory: AddInventoryRequest
  ): Promise<ResponseAPI<Inventory>>;
  getInventoryByNameOrReference(
    nameOrReference: string
  ): Promise<ResponseAPI<Inventory[]>>;
  getInventoryToReport(inventoryId: number): Promise<ResponseAPI<Inventory>>;
}
