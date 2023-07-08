import { injectable, inject } from "inversify";
import { IInventoryRepository } from "../../domain/repositories/IInventoryRepository";
import type { IHttpClient } from "../api/interfaces/IHttpClient";
import { TYPES } from "../../config/types";
import { Inventory } from "../../domain/models/Inventory";
import { InventoryModel } from "../../domain/models/InventoryModel";
import { ResponseAPI } from "../api/models/ResponseApi";
import { AddInventoryRequest } from "../../domain/models/AddInventoryRequest";

@injectable()
export class InventoryRepositoryImpl implements IInventoryRepository {
  private readonly httpClient: IHttpClient;
  private readonly baseUrl: string;

  constructor(
    @inject(TYPES.HttpClient) httpClient: IHttpClient,
    apiUrl = import.meta.env.VITE_BACKEND_URL
  ) {
    this.httpClient = httpClient;
    this.baseUrl = `${apiUrl}/inventories`;
  }

  async getInventoryToReport(
    inventoryId: number
  ): Promise<ResponseAPI<Inventory>> {
    const response = await this.httpClient.get<ResponseAPI<Inventory>>(
      `${this.baseUrl}/add/${inventoryId}`
    );
    return response;
  }

  async getInventoryByNameOrReference(
    nameOrReference: string
  ): Promise<ResponseAPI<Inventory[]>> {
    const response = await this.httpClient.get<ResponseAPI<Inventory[]>>(
      `${this.baseUrl}/search/${nameOrReference}`
    );
    return response;
  }

  async getInventoriesByCategoryId(
    categoryId: number
  ): Promise<ResponseAPI<Inventory[]>> {
    const response = await this.httpClient.get<ResponseAPI<Inventory[]>>(
      `${this.baseUrl}/category/${categoryId}`
    );
    return response;
  }

  async addInventory(
    addInventory: AddInventoryRequest
  ): Promise<ResponseAPI<Inventory>> {
    const response = await this.httpClient.post<
      ResponseAPI<Inventory>,
      AddInventoryRequest
    >(`${this.baseUrl}/add`, addInventory);
    return response;
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
    inventory: InventoryModel
  ): Promise<ResponseAPI<Inventory>> {
    const response = await this.httpClient.put<
      ResponseAPI<Inventory>,
      InventoryModel
    >(`${this.baseUrl}/app`, inventory);
    return response;
  }

  async deleteInventory(inventoryId: number): Promise<ResponseAPI<boolean>> {
    const response = await this.httpClient.delete<ResponseAPI<boolean>>(
      `${this.baseUrl}/${inventoryId}`
    );
    return response;
  }
}
