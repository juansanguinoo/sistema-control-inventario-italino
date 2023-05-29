import { injectable, inject } from "inversify";
import { Category } from "../../models/Category";
import { TYPES } from "../../../config/types";
import type { ICategoryRepository } from "../../repositories/ICategoryRepository";

@injectable()
export class UpdateCategoryUseCase {
  constructor(
    @inject(TYPES.ICategoryRepository)
    private categoryRepository: ICategoryRepository
  ) {}

  async execute(idCategory: number, category: Category): Promise<boolean> {
    return await this.categoryRepository.updateCategory(idCategory, category);
  }
}
