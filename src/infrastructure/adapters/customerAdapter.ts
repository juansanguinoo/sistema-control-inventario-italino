import { Customer } from "../../domain/models/Customer";
import { CustomerModel } from "../../domain/models/CustomerModel";

export const adaptCustomer = (customer: Customer): CustomerModel => {
  return {
    id: customer.id_customer,
    nameCustomer: customer.name_customer,
    nitCustomer: customer.nit_customer,
    emailCustomer: customer.email_customer,
    addressCustomer: customer.address_customer,
    phoneCustomer: customer.phone_customer,
    statusCustomer: customer.status_customer,
    createdAt: customer.created_at,
    updatedAt: customer.updated_at,
    userId: customer.user,
  };
};

export const adaptCustomers = (customers: Customer[]): CustomerModel[] => {
  return customers.map((customer) => adaptCustomer(customer));
};
