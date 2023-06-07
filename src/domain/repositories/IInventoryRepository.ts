import { ResponseAPI } from "../../infrastructure/api/models/ResponseApi";
import { Inventory } from "../models/Inventory";
import { InventoryModel } from "../models/InventoryModel";

export interface IInventoryRepository {
  getInventories(): Promise<ResponseAPI<Inventory[]>>;
  createInventory(inventory: InventoryModel): Promise<ResponseAPI<Inventory>>;
  updateInventory(
    inventoryId: number,
    inventory: Inventory
  ): Promise<ResponseAPI<boolean>>;
  deleteInventory(inventoryId: number): Promise<ResponseAPI<boolean>>;
}
