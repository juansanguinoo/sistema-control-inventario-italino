import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/types";
import type { IUserRepository } from "../../repositories/IUserRepository";
import { UserModel } from "../../models/UserModel";
import { ResponseAPI } from "../../../infrastructure/api/models/ResponseApi";

@injectable()
export class UpdateUserUseCase {
  constructor(
    @inject(TYPES.IUserRepository)
    private userRepository: IUserRepository
  ) {}

  async execute(
    idUser: number,
    user: UserModel
  ): Promise<ResponseAPI<boolean>> {
    const response = await this.userRepository.updateUser(idUser, user);
    return response;
  }
}
