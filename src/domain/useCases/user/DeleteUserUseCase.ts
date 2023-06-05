import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/types";
import type { IUserRepository } from "../../repositories/IUserRepository";
import { ResponseAPI } from "../../../infrastructure/api/models/ResponseApi";

@injectable()
export class DeleteUserUseCase {
  constructor(
    @inject(TYPES.IUserRepository)
    private userRepository: IUserRepository
  ) {}

  async execute(idUser: number): Promise<ResponseAPI<boolean>> {
    const response = await this.userRepository.deleteUser(idUser);
    return response;
  }
}
