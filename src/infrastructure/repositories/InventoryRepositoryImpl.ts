import { injectable, inject } from "inversify";
import { IInventoryRepository } from "../../domain/repositories/IInventoryRepository";
import type { IHttpClient } from "../api/interfaces/IHttpClient";
import { TYPES } from "../../config/types";
import { Inventory } from "../../domain/models/Inventory";
import { InventoryModel } from "../../domain/models/InventoryModel";
import { ResponseAPI } from "../api/models/ResponseApi";

@injectable()
export class InventoryRepositoryImpl implements IInventoryRepository {
  private readonly httpClient: IHttpClient;
  private readonly baseUrl: string;

  constructor(
    @inject(TYPES.HttpClient) httpClient: IHttpClient,
    apiUrl = "http://localhost:3000"
  ) {
    this.httpClient = httpClient;
    this.baseUrl = `${apiUrl}/inventories`;
  }

  async getInventories(): Promise<ResponseAPI<Inventory[]>> {
    const response = await this.httpClient.get<ResponseAPI<Inventory[]>>(
      this.baseUrl
    );
    return response;
  }

  async createInventory(
    inventory: InventoryModel
  ): Promise<ResponseAPI<Inventory>> {
    const response = await this.httpClient.post<
      ResponseAPI<Inventory>,
      InventoryModel
    >(this.baseUrl, inventory);
    return response;
  }

  async updateInventory(
    inventoryId: number,
    inventory: Inventory
  ): Promise<ResponseAPI<boolean>> {
    const response = await this.httpClient.put<ResponseAPI<boolean>, Inventory>(
      `${this.baseUrl}/${inventoryId}`,
      inventory
    );
    return response;
  }

  async deleteInventory(inventoryId: number): Promise<ResponseAPI<boolean>> {
    const response = await this.httpClient.delete<ResponseAPI<boolean>>(
      `${this.baseUrl}/${inventoryId}`
    );
    return response;
  }
}