import { injectable, inject } from "inversify";
import { TYPES } from "../../../config/types";
import type { ICategoryRepository } from "../../repositories/ICategoryRepository";
import { Category } from "../../models/Category";

@injectable()
export class GetCategoriesUseCase {
  constructor(
    @inject(TYPES.ICategoryRepository)
    private categoryRepository: ICategoryRepository
  ) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoryRepository.getCategories();
    return categories;
  }
}
