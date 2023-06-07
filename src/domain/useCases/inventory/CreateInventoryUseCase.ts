import { injectable, inject } from "inversify";
import { TYPES } from "../../../config/types";
import type { IInventoryRepository } from "../../repositories/IInventoryRepository";
import { InventoryModel } from "../../models/InventoryModel";
import { ResponseAPI } from "../../../infrastructure/api/models/ResponseApi";
import { Inventory } from "../../models/Inventory";

@injectable()
export class CreateInventoryUseCase {
  constructor(
    @inject(TYPES.IInventoryRepository)
    private inventoryRepository: IInventoryRepository
  ) {}

  async execute(inventory: InventoryModel): Promise<ResponseAPI<Inventory>> {
    return await this.inventoryRepository.createInventory(inventory);
  }
}
