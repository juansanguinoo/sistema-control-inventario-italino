import { Category } from "../../domain/models/Category";
import { ICategoryRepository } from "../../domain/repositories/ICategoryRepository";
import { injectable, inject } from "inversify";
import { TYPES } from "../../config/types";
import type { IHttpClient } from "../api/interfaces/IHttpClient";
import { ResponseAPI } from "../api/models/ResponseApi";
import { CategoryModel } from "../../domain/models/CategoryModel";

@injectable()
export class CategoryRepositoryImpl implements ICategoryRepository {
  private readonly httpClient: IHttpClient;
  private readonly baseUrl: string;

  constructor(
    @inject(TYPES.HttpClient) httpClient: IHttpClient,
    apiUrl = import.meta.env.VITE_BACKEND_URL
  ) {
    this.httpClient = httpClient;
    this.baseUrl = `${apiUrl}/categories`;
  }

  async getCategories(): Promise<ResponseAPI<Category[]>> {
    const response = await this.httpClient.get<ResponseAPI<Category[]>>(
      this.baseUrl
    );
    return response;
  }
  async createCategory(
    category: CategoryModel
  ): Promise<ResponseAPI<Category>> {
    const response = await this.httpClient.post<
      ResponseAPI<Category>,
      CategoryModel
    >(this.baseUrl, category);
    return response;
  }
  async updateCategory(
    categoryId: number,
    category: CategoryModel
  ): Promise<ResponseAPI<Category>> {
    const response = await this.httpClient.put<
      ResponseAPI<Category>,
      CategoryModel
    >(`${this.baseUrl}/${categoryId}`, category);
    return response;
  }
  async deleteCategory(categoryId: number): Promise<ResponseAPI<boolean>> {
    const response = await this.httpClient.delete<ResponseAPI<boolean>>(
      `${this.baseUrl}/${categoryId}`
    );
    return response;
  }
}
