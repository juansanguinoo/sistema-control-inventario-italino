import { injectable, inject } from "inversify";
import { TYPES } from "../../../config/types";
import type { IInventoryRepository } from "../../repositories/IInventoryRepository";
import { ResponseAPI } from "../../../infrastructure/api/models/ResponseApi";
import { Inventory } from "../../models/Inventory";

@injectable()
export class UpdateInventoryUseCase {
  constructor(
    @inject(TYPES.IInventoryRepository)
    private inventoryRepository: IInventoryRepository
  ) {}

  async execute(
    idInventory: number,
    inventory: Inventory
  ): Promise<ResponseAPI<boolean>> {
    return await this.inventoryRepository.updateInventory(
      idInventory,
      inventory
    );
  }
}
