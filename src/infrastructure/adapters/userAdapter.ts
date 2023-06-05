import { User } from "../../domain/models/User";
import { UserModel } from "../../domain/models/UserModel";

export const adaptUser = (user: User): UserModel => {
  return {
    id: user.id_user,
    nameUser: user.name_user,
    emailUser: user.email_user,
    passwordUser: user.password_user,
    phoneUser: user.phone_user,
    statusUser: user.status_user,
    createdAt: user.created_at,
    updatedAt: user.updated_at,
    rol: user.rol,
  };
};

export const adaptUsers = (users: User[]): UserModel[] => {
  return users.map((user) => adaptUser(user));
};
