import { injectable, inject } from "inversify";
import { TYPES } from "../../../config/types";
import type { IInventoryRepository } from "../../repositories/IInventoryRepository";
import { ResponseAPI } from "../../../infrastructure/api/models/ResponseApi";
import { Inventory } from "../../models/Inventory";
@injectable()
export class GetInventoriesByCategoryIdUseCase {
  constructor(
    @inject(TYPES.IInventoryRepository)
    private inventoryRepository: IInventoryRepository
  ) {}

  async execute(categoryId: number): Promise<ResponseAPI<Inventory[]>> {
    const inventories =
      await this.inventoryRepository.getInventoriesByCategoryId(categoryId);
    return inventories;
  }
}
