import { inject, injectable } from "inversify";
import { ICustomerRepository } from "../../domain/repositories/ICustomerRepository";
import { TYPES } from "../../config/types";
import type { IHttpClient } from "../api/interfaces/IHttpClient";
import { Customer } from "../../domain/models/Customer";
import { CustomerModel } from "../../domain/models/CustomerModel";
import { ResponseAPI } from "../api/models/ResponseApi";

@injectable()
export class CustomerRepositoryImpl implements ICustomerRepository {
  private readonly httpClient: IHttpClient;
  private readonly baseUrl: string;

  constructor(
    @inject(TYPES.HttpClient) httpClient: IHttpClient,
    apiUrl = "http://localhost:3000"
  ) {
    this.httpClient = httpClient;
    this.baseUrl = `${apiUrl}/customers`;
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
  ): Promise<ResponseAPI<boolean>> {
    const response = await this.httpClient.put<
      ResponseAPI<boolean>,
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
      `${this.baseUrl}/user/${idUser}`
    );
    return response;
  }
}