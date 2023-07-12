import { inject, injectable } from "inversify";
import { ICustomerRepository } from "../../domain/repositories/ICustomerRepository";
import { TYPES } from "../../config/types";
import type { IHttpClient } from "../api/interfaces/IHttpClient";
import { Customer } from "../../domain/models/Customer";
import { CustomerModel } from "../../domain/models/CustomerModel";
import { ResponseAPI } from "../api/models/ResponseApi";
import { CustomerInfoResponse } from "../../domain/models/CustomerInfoResponse";

@injectable()
export class CustomerRepositoryImpl implements ICustomerRepository {
  private readonly httpClient: IHttpClient;
  private readonly baseUrl: string;
  private readonly customUrl: string;

  constructor(
    @inject(TYPES.HttpClient) httpClient: IHttpClient,
    apiUrl = import.meta.env.VITE_BACKEND_URL
  ) {
    this.httpClient = httpClient;
    this.baseUrl = `${apiUrl}/customers`;
    this.customUrl = `${apiUrl}/customersBySaller`;
  }

  async getCustomerInfo(): Promise<ResponseAPI<CustomerInfoResponse>> {
    const response = await this.httpClient.get<
      ResponseAPI<CustomerInfoResponse>
    >(`${this.baseUrl}-stats/stats`);
    return response;
  }

  async getCustomerByNameOrNIT(
    nameOrNit: string
  ): Promise<ResponseAPI<Customer[]>> {
    const response = await this.httpClient.get<ResponseAPI<Customer[]>>(
      `${this.baseUrl}/search/${nameOrNit}`
    );
    return response;
  }

  async getAllCustomers(): Promise<ResponseAPI<Customer[]>> {
    const response = await this.httpClient.get<ResponseAPI<Customer[]>>(
      this.baseUrl
    );
    return response;
  }

  async getCustomerById(idCustomer: number): Promise<ResponseAPI<Customer>> {
    const response = await this.httpClient.get<ResponseAPI<Customer>>(
      `${this.baseUrl}/${idCustomer}`
    );
    return response;
  }

  async createCustomer(
    customer: CustomerModel
  ): Promise<ResponseAPI<Customer>> {
    const response = await this.httpClient.post<
      ResponseAPI<Customer>,
      CustomerModel
    >(this.baseUrl, customer);
    return response;
  }

  async updateCustomer(
    idCustomer: number,
    customer: CustomerModel
  ): Promise<ResponseAPI<Customer>> {
    const response = await this.httpClient.put<
      ResponseAPI<Customer>,
      CustomerModel
    >(`${this.baseUrl}/${idCustomer}`, customer);
    return response;
  }

  async deleteCustomer(idCustomer: number): Promise<ResponseAPI<boolean>> {
    const response = await this.httpClient.delete<ResponseAPI<boolean>>(
      `${this.baseUrl}/${idCustomer}`
    );
    return response;
  }
  async getCustomerByUserId(idUser: number): Promise<ResponseAPI<Customer[]>> {
    const response = await this.httpClient.get<ResponseAPI<Customer[]>>(
      `${this.customUrl}/${idUser}`
    );
    return response;
  }
}
