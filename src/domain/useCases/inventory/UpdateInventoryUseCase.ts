import { injectable, inject } from "inversify";
import { TYPES } from "../../../config/types";
import type { IInventoryRepository } from "../../repositories/IInventoryRepository";
import { ResponseAPI } from "../../../infrastructure/api/models/ResponseApi";
import { Inventory } from "../../models/Inventory";
import { InventoryModel } from "../../models/InventoryModel";

@injectable()
export class UpdateInventoryUseCase {
  constructor(
    @inject(TYPES.IInventoryRepository)
    private inventoryRepository: IInventoryRepository
  ) {}

  async execute(inventory: InventoryModel): Promise<ResponseAPI<Inventory>> {
    return await this.inventoryRepository.updateInventory(inventory);
  }
}
