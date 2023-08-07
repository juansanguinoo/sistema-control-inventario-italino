import { injectable, inject } from "inversify";
import { Category } from "../../models/Category";
import { TYPES } from "../../../config/types";
import type { ICategoryRepository } from "../../repositories/ICategoryRepository";
import { ResponseAPI } from "../../../infrastructure/api/models/ResponseApi";
import { CategoryModel } from "../../models/CategoryModel";

@injectable()
export class UpdateCategoryUseCase {
  constructor(
    @inject(TYPES.ICategoryRepository)
    private categoryRepository: ICategoryRepository
  ) {}

  async execute(
    idCategory: number,
    category: CategoryModel
  ): Promise<ResponseAPI<Category>> {
    return await this.categoryRepository.updateCategory(idCategory, category);
  }
}
