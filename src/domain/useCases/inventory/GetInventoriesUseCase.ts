import { injectable, inject } from "inversify";
import { TYPES } from "../../../config/types";
import type { IInventoryRepository } from "../../repositories/IInventoryRepository";
import { ResponseAPI } from "../../../infrastructure/api/models/ResponseApi";
import { Inventory } from "../../models/Inventory";

@injectable()
export class GetInventoriesUseCase {
  constructor(
    @inject(TYPES.IInventoryRepository)
    private inventoryRepository: IInventoryRepository
  ) {}

  async execute(): Promise<ResponseAPI<Inventory[]>> {
    const inventories = await this.inventoryRepository.getInventories();
    return inventories;
  }
}
