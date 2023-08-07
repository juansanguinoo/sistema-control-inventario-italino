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
    apiUrl = import.meta.env.VITE_BACKEND_URL
  ) {
    this.httpClient = httpClient;
    this.baseUrl = `${apiUrl}/users`;
  }

  async checkLogin(): Promise<ResponseAPI<User>> {
    const response = await this.httpClient.get<ResponseAPI<User>>(
      `${this.baseUrl}/validate-token`
    );
    return response;
  }

  async loginUser(email: string, password: string): Promise<ResponseAPI<User>> {
    const response = await this.httpClient.post<
      ResponseAPI<User>,
      { email: string; password: string }
    >(`${this.baseUrl}/login`, { email, password });
    return response;
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
  ): Promise<ResponseAPI<User>> {
    const response = await this.httpClient.put<ResponseAPI<User>, UserModel>(
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

  async updatePassword(
    idUser: number,
    password: string,
    newPassword: string
  ): Promise<ResponseAPI<User>> {
    const response = await this.httpClient.put<
      ResponseAPI<User>,
      { password: string; newPassword: string }
    >(`${this.baseUrl}/${idUser}/password`, { password, newPassword });
    return response;
  }

  async forgotPassword(email: string): Promise<ResponseAPI<User>> {
    const response = await this.httpClient.post<
      ResponseAPI<User>,
      { email: string }
    >(`${this.baseUrl}-recover/forgot-password`, { email });
    return response;
  }

  async resetPassword(
    token: string,
    newPassword: string
  ): Promise<ResponseAPI<User>> {
    const response = await this.httpClient.put<
      ResponseAPI<User>,
      { token: string; newPassword: string }
    >(`${this.baseUrl}-reset/reset-password`, { token, newPassword });
    return response;
  }
}
