import { ResponseAPI } from "../../infrastructure/api/models/ResponseApi";
import { Customer } from "../models/Customer";
import { CustomerModel } from "../models/CustomerModel";

export interface ICustomerRepository {
  getAllCustomers(): Promise<ResponseAPI<Customer[]>>;
  getCustomerById(idCustomer: number): Promise<ResponseAPI<Customer>>;
  createCustomer(customer: CustomerModel): Promise<ResponseAPI<Customer>>;
  updateCustomer(
    idCustomer: number,
    customer: CustomerModel
  ): Promise<ResponseAPI<boolean>>;
  deleteCustomer(idCustomer: number): Promise<ResponseAPI<boolean>>;
  getCustomerByUserId(idUser: number): Promise<ResponseAPI<Customer[]>>;
}
