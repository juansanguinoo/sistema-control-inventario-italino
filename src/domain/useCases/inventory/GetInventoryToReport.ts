import { injectable, inject } from "inversify";
import { TYPES } from "../../../config/types";
import type { IInventoryRepository } from "../../repositories/IInventoryRepository";

@injectable()
export class GetInventoryToReportUseCase {
  constructor(
    @inject(TYPES.IInventoryRepository)
    private inventoryRepository: IInventoryRepository
  ) {}

  async execute(inventoryId: number) {
    const inventories = await this.inventoryRepository.getInventoryToReport(
      inventoryId
    );
    return inventories;
  }
}
