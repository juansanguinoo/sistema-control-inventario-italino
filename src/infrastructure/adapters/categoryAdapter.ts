import { Category } from "../../domain/models/Category";
import { CategoryModel } from "../../domain/models/CategoryModel";

export const adaptCategory = (category: Category): CategoryModel => {
  return {
    createdAt: category.created_at,
    id: category.id_category,
    nameCategory: category.name_category,
    referenceCategory: category.reference_category,
    descriptionCategory: category.description_category,
    statusCategory: category.status_category,
    updatedAt: category.updated_at,
  };
};

export const adaptCategories = (categories: Category[]): CategoryModel[] => {
  return categories.map((category) => adaptCategory(category));
};
