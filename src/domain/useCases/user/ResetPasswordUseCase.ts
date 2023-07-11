import { injectable, inject } from "inversify";
import { TYPES } from "../../../config/types";
import type { IUserRepository } from "../../repositories/IUserRepository";
import { ResponseAPI } from "../../../infrastructure/api/models/ResponseApi";
import { User } from "../../models/User";

@injectable()
export class ResetPasswordUseCase {
  constructor(
    @inject(TYPES.IUserRepository)
    private userRepository: IUserRepository
  ) {}

  async execute(
    token: string,
    newPassword: string
  ): Promise<ResponseAPI<User>> {
    const response = await this.userRepository.resetPassword(
      token,
      newPassword
    );
    return response;
  }
}
