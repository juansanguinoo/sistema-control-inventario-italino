import { Category } from "../../domain/models/Category";
import { ICategoryRepository } from "../../domain/repositories/ICategoryRepository";
import { injectable, inject } from "inversify";
import { TYPES } from "../../config/types";
import type { IHttpClient } from "../api/interfaces/IHttpClient";

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

  async getCategories(): Promise<Category[]> {
    const response = await this.httpClient.get<Category[]>(this.baseUrl);
    return response;
  }
  async createCategory(category: Category): Promise<Category> {
    const response: Category = await this.httpClient.post(
      this.baseUrl,
      category
    );
    return response;
  }
  async updateCategory(
    categoryId: number,
    category: Category
  ): Promise<boolean> {
    const response: boolean = await this.httpClient.put(
      `${this.baseUrl}/${categoryId}`,
      category
    );
    return response;
  }
  async deleteCategory(categoryId: number): Promise<boolean> {
    const response: boolean = await this.httpClient.delete(
      `${this.baseUrl}/${categoryId}`
    );
    return response;
  }
}
