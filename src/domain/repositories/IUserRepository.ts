import { ResponseAPI } from "../../infrastructure/api/models/ResponseApi";
import { User } from "../models/User";
import { UserModel } from "../models/UserModel";

export interface IUserRepository {
  getAllUsers(): Promise<ResponseAPI<User[]>>;
  getUserById(idUser: number): Promise<ResponseAPI<User>>;
  createUser(user: UserModel): Promise<ResponseAPI<User>>;
  updateUser(idUser: number, user: UserModel): Promise<ResponseAPI<User>>;
  deleteUser(idUser: number): Promise<ResponseAPI<boolean>>;
  loginUser(email: string, password: string): Promise<ResponseAPI<User>>;
  checkLogin(): Promise<ResponseAPI<User>>;
  updatePassword(
    idUser: number,
    password: string,
    newPassword: string
  ): Promise<ResponseAPI<User>>;
  forgotPassword(email: string): Promise<ResponseAPI<User>>;
  resetPassword(token: string, newPassword: string): Promise<ResponseAPI<User>>;
}
