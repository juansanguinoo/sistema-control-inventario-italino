import { injectable, inject } from "inversify";
import { TYPES } from "../../../config/types";
import type { ICategoryRepository } from "../../repositories/ICategoryRepository";
import { Category } from "../../models/Category";
import { ResponseAPI } from "../../../infrastructure/api/models/ResponseApi";

@injectable()
export class GetCategoriesUseCase {
  constructor(
    @inject(TYPES.ICategoryRepository)
    private categoryRepository: ICategoryRepository
  ) {}

  async execute(): Promise<ResponseAPI<Category[]>> {
    const categories = await this.categoryRepository.getCategories();
    return categories;
  }
}
