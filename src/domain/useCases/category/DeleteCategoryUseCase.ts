import { injectable, inject } from "inversify";
import { TYPES } from "../../../config/types";
import type { ICategoryRepository } from "../../repositories/ICategoryRepository";
import { ResponseAPI } from "../../../infrastructure/api/models/ResponseApi";

@injectable()
export class DeleteCategoryUseCase {
  constructor(
    @inject(TYPES.ICategoryRepository)
    private categoryRepository: ICategoryRepository
  ) {}

  async execute(categoryId: number): Promise<ResponseAPI<boolean>> {
    const deleted = await this.categoryRepository.deleteCategory(categoryId);
    return deleted;
  }
}
