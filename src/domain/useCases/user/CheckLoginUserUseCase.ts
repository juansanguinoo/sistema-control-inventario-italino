import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/types";
import type { IUserRepository } from "../../repositories/IUserRepository";

@injectable()
export class CheckLoginUserUseCase {
  constructor(
    @inject(TYPES.IUserRepository)
    private userRepository: IUserRepository
  ) {}

  async execute() {
    const response = await this.userRepository.checkLogin();
    return response;
  }
}
