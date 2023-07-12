import { User } from "./User";

export interface Customer {
  id_customer?: number;
  name_customer: string;
  nit_customer: string;
  email_customer: string;
  address_customer: string;
  phone_customer: string;
  status_customer: string;
  created_at?: string;
  updated_at?: string;
  user: User;
}
