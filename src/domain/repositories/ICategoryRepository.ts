import { ResponseAPI } from "../../infrastructure/api/models/ResponseApi";
import { Category } from "../models/Category";

export interface ICategoryRepository {
  getCategories(): Promise<ResponseAPI<Category[]>>;
  createCategory(category: Category): Promise<ResponseAPI<Category>>;
  updateCategory(
    categoryId: number,
    category: Category
  ): Promise<ResponseAPI<boolean>>;
  deleteCategory(categoryId: number): Promise<ResponseAPI<boolean>>;
}
