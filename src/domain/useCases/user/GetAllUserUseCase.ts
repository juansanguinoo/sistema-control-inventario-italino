import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/types";
import type { IUserRepository } from "../../repositories/IUserRepository";
import { ResponseAPI } from "../../../infrastructure/api/models/ResponseApi";
import { User } from "../../models/User";

@injectable()
export class GetAllUserUseCase {
  constructor(
    @inject(TYPES.IUserRepository)
    private userRepository: IUserRepository
  ) {}

  async execute(): Promise<ResponseAPI<User[]>> {
    const response = await this.userRepository.getAllUsers();
    return response;
  }
}
