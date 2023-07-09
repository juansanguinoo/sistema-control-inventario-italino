import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/types";
import type { IUserRepository } from "../../repositories/IUserRepository";
import { ResponseAPI } from "../../../infrastructure/api/models/ResponseApi";
import { User } from "../../models/User";

@injectable()
export class UpdatePasswordUseCase {
  constructor(
    @inject(TYPES.IUserRepository)
    private userRepository: IUserRepository
  ) {}

  async execute(
    idUser: number,
    password: string,
    newPassword: string
  ): Promise<ResponseAPI<User>> {
    const response = await this.userRepository.updatePassword(
      idUser,
      password,
      newPassword
    );
    return response;
  }
}
