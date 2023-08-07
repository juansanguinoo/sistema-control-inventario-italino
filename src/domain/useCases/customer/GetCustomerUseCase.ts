import { inject, injectable } from "inversify";
import type { ICustomerRepository } from "../../repositories/ICustomerRepository";
import { TYPES } from "../../../config/types";
import { Customer } from "../../models/Customer";
import { ResponseAPI } from "../../../infrastructure/api/models/ResponseApi";

@injectable()
export class GetCustomerUseCase {
  constructor(
    @inject(TYPES.ICustomerRepository)
    private customerRepository: ICustomerRepository
  ) {}

  async execute(idCustomer: number): Promise<ResponseAPI<Customer>> {
    const response = await this.customerRepository.getCustomerById(idCustomer);
    return response;
  }
}
