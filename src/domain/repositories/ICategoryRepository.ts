import { ResponseAPI } from "../../infrastructure/api/models/ResponseApi";
import { Category } from "../models/Category";
import { CategoryModel } from "../models/CategoryModel";

export interface ICategoryRepository {
  getCategories(): Promise<ResponseAPI<Category[]>>;
  createCategory(category: CategoryModel): Promise<ResponseAPI<Category>>;
  updateCategory(
    categoryId: number,
    category: CategoryModel
  ): Promise<ResponseAPI<Category>>;
  deleteCategory(categoryId: number): Promise<ResponseAPI<boolean>>;
}
