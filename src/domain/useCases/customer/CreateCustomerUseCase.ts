import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/types";
import type { ICustomerRepository } from "../../repositories/ICustomerRepository";
import { CustomerModel } from "../../models/CustomerModel";
import { ResponseAPI } from "../../../infrastructure/api/models/ResponseApi";
import { Customer } from "../../models/Customer";

@injectable()
export class CreateCustomerUseCase {
  constructor(
    @inject(TYPES.ICustomerRepository)
    private customerRepository: ICustomerRepository
  ) {}

  async execute(customer: CustomerModel): Promise<ResponseAPI<Customer>> {
    const response = await this.customerRepository.createCustomer(customer);
    return response;
  }
}
