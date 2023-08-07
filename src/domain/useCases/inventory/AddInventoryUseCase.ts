import { injectable, inject } from "inversify";
import { TYPES } from "../../../config/types";
import type { IInventoryRepository } from "../../repositories/IInventoryRepository";
import { AddInventoryRequest } from "../../models/AddInventoryRequest";
import { Inventory } from "../../models/Inventory";
import { ResponseAPI } from "../../../infrastructure/api/models/ResponseApi";

@injectable()
export class AddInventoryUseCase {
  constructor(
    @inject(TYPES.IInventoryRepository)
    private inventoryRepository: IInventoryRepository
  ) {}

  async execute(
    addInventory: AddInventoryRequest
  ): Promise<ResponseAPI<Inventory>> {
    return await this.inventoryRepository.addInventory(addInventory);
  }
}
