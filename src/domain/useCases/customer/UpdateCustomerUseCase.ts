import { inject, injectable } from "inversify";
import type { ICustomerRepository } from "../../repositories/ICustomerRepository";
import { TYPES } from "../../../config/types";
import { CustomerModel } from "../../models/CustomerModel";
import { ResponseAPI } from "../../../infrastructure/api/models/ResponseApi";

@injectable()
export class UpdateCustomerUseCase {
  constructor(
    @inject(TYPES.ICustomerRepository)
    private customerRepository: ICustomerRepository
  ) {}

  async execute(
    idCustomer: number,
    customer: CustomerModel
  ): Promise<ResponseAPI<boolean>> {
    const response = await this.customerRepository.updateCustomer(
      idCustomer,
      customer
    );
    return response;
  }
}
