import { Category } from "../models/Category";

export interface ICategoryRepository {
  getCategories(): Promise<Category[]>;
  createCategory(category: Category): Promise<Category>;
  updateCategory(categoryId: number, category: Category): Promise<boolean>;
  deleteCategory(categoryId: number): Promise<boolean>;
}
