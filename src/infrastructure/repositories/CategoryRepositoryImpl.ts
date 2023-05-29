import { Category } from "../../domain/models/Category";
import { ICategoryRepository } from "../../domain/repositories/ICategoryRepository";
import { injectable, inject } from "inversify";
import { TYPES } from "../../config/types";
import type { IHttpClient } from "../api/interfaces/IHttpClient";
import { ResponseAPI } from "../api/models/ResponseApi";

@injectable()
export class CategoryRepositoryImpl implements ICategoryRepository {
  private readonly httpClient: IHttpClient;
  private readonly baseUrl: string;

  constructor(
    @inject(TYPES.HttpClient) httpClient: IHttpClient,
    apiUrl: string = "http://localhost:3000"
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
  async createCategory(category: Category): Promise<ResponseAPI<Category>> {
    const response = await this.httpClient.post<
      ResponseAPI<Category>,
      Category
    >(this.baseUrl, category);
    return response;
  }
  async updateCategory(
    categoryId: number,
    category: Category
  ): Promise<ResponseAPI<boolean>> {
    const response = await this.httpClient.put<ResponseAPI<boolean>, Category>(
      `${this.baseUrl}/${categoryId}`,
      category
    );
    return response;
  }
  async deleteCategory(categoryId: number): Promise<ResponseAPI<boolean>> {
    const response = await this.httpClient.delete<ResponseAPI<boolean>>(
      `${this.baseUrl}/${categoryId}`
    );
    return response;
  }
}
