import { injectable, inject } from "inversify";
import { ResponseAPI } from "../../../infrastructure/api/models/ResponseApi";
import { TYPES } from "../../../config/types";
import type { IInventoryRepository } from "../../repositories/IInventoryRepository";

@injectable()
export class DeleteInventoryUseCase {
  constructor(
    @inject(TYPES.IInventoryRepository)
    private inventoryRepository: IInventoryRepository
  ) {}

  async execute(inventoryId: number): Promise<ResponseAPI<boolean>> {
    const deleted = await this.inventoryRepository.deleteInventory(inventoryId);
    return deleted;
  }
}
