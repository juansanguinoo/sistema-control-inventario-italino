import { inject, injectable } from "inversify";
import { User } from "../../domain/models/User";
import { UserModel } from "../../domain/models/UserModel";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { ResponseAPI } from "../api/models/ResponseApi";
import type { IHttpClient } from "../api/interfaces/IHttpClient";
import { TYPES } from "../../config/types";

@injectable()
export class UserRepositoryImpl implements IUserRepository {
  private readonly httpClient: IHttpClient;
  private readonly baseUrl: string;

  constructor(
    @inject(TYPES.HttpClient) httpClient: IHttpClient,
    apiUrl = "http://localhost:3000"
  ) {
    this.httpClient = httpClient;
    this.baseUrl = `${apiUrl}/users`;
  }

  async getAllUsers(): Promise<ResponseAPI<User[]>> {
    const response = await this.httpClient.get<ResponseAPI<User[]>>(
      this.baseUrl
    );
    return response;
  }
  async getUserById(idUser: number): Promise<ResponseAPI<User>> {
    const response = await this.httpClient.get<ResponseAPI<User>>(
      `${this.baseUrl}/${idUser}`
    );
    return response;
  }
  async createUser(user: UserModel): Promise<ResponseAPI<User>> {
    const response = await this.httpClient.post<ResponseAPI<User>, UserModel>(
      this.baseUrl,
      user
    );
    return response;
  }
  async updateUser(
    idUser: number,
    user: UserModel
  ): Promise<ResponseAPI<boolean>> {
    const response = await this.httpClient.put<ResponseAPI<boolean>, UserModel>(
      `${this.baseUrl}/${idUser}`,
      user
    );
    return response;
  }
  async deleteUser(idUser: number): Promise<ResponseAPI<boolean>> {
    const response = await this.httpClient.delete<ResponseAPI<boolean>>(
      `${this.baseUrl}/${idUser}`
    );
    return response;
  }
}