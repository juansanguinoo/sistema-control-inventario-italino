import { inject, injectable } from "inversify";
import { TYPES } from "../../../config/types";
import type { IUserRepository } from "../../repositories/IUserRepository";

@injectable()
export class LoginUserUseCase {
  constructor(
    @inject(TYPES.IUserRepository)
    private userRepository: IUserRepository
  ) {}

  async execute(email: string, password: string) {
    const response = await this.userRepository.loginUser(email, password);
    return response;
  }
}
