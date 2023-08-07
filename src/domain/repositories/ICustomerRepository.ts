import { ResponseAPI } from "../../infrastructure/api/models/ResponseApi";
import { Customer } from "../models/Customer";
import { CustomerInfoResponse } from "../models/CustomerInfoResponse";
import { CustomerModel } from "../models/CustomerModel";

export interface ICustomerRepository {
  getAllCustomers(): Promise<ResponseAPI<Customer[]>>;
  getCustomerById(idCustomer: number): Promise<ResponseAPI<Customer>>;
  createCustomer(customer: CustomerModel): Promise<ResponseAPI<Customer>>;
  updateCustomer(
    idCustomer: number,
    customer: CustomerModel
  ): Promise<ResponseAPI<Customer>>;
  deleteCustomer(idCustomer: number): Promise<ResponseAPI<boolean>>;
  getCustomerByUserId(idUser: number): Promise<ResponseAPI<Customer[]>>;
  getCustomerByNameOrNIT(nameOrNit: string): Promise<ResponseAPI<Customer[]>>;
  getCustomerInfo(): Promise<ResponseAPI<CustomerInfoResponse>>;
}
