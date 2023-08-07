import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/types";
import type { IInventoryRepository } from "../../repositories/IInventoryRepository";

@injectable()
export class GetInventoryInfoUseCase {
  constructor(
    @inject(TYPES.IInventoryRepository)
    private inventoryRepository: IInventoryRepository
  ) {}

  async execute() {
    const inventories = await this.inventoryRepository.getInventoryInfo();
    return inventories;
  }
}
