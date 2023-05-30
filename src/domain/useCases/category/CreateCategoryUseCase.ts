import { injectable, inject } from "inversify";
import type { ICategoryRepository } from "../../repositories/ICategoryRepository";
import { TYPES } from "../../../config/types";
import { Category } from "../../models/Category";
import { ResponseAPI } from "../../../infrastructure/api/models/ResponseApi";

@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject(TYPES.ICategoryRepository)
    private categoryRepository: ICategoryRepository
  ) {}

  async execute(category: Category): Promise<ResponseAPI<Category>> {
    return await this.categoryRepository.createCategory(category);
  }
}
