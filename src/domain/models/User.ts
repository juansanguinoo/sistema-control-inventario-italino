import { Role } from "./Role";

export interface User {
  id_user?: number;
  name_user: string;
  phone_user: string;
  email_user: string;
  password_user: string;
  status_user: string;
  created_at?: string;
  updated_at?: string;
  rol?: Role;
}
