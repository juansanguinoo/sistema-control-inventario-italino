import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/types";
import type { IInventoryRepository } from "../../repositories/IInventoryRepository";

@injectable()
export class GetInventoryByNameOrReferenceUseCase {
  constructor(
    @inject(TYPES.IInventoryRepository)
    private inventoryRepository: IInventoryRepository
  ) {}

  async execute(nameOrReference: string) {
    const inventories =
      await this.inventoryRepository.getInventoryByNameOrReference(
        nameOrReference
      );
    return inventories;
  }
}
