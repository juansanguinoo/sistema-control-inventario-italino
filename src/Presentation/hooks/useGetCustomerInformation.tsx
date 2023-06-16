import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { getAllCustomers } from "../../store/actions/customerActions";
import { useEffect } from "react";
import { CustomerModel } from "../../domain/models/CustomerModel";

export const useGetCustomerInformation = () => {
  const dispatch = useDispatch<Dispatch<any>>(); // eslint-disable-line

  useEffect(() => {
    dispatch(getAllCustomers());
  }, [dispatch]);

  const customers: CustomerModel[] = useSelector(
    (state: any) => state.customerReducer.customers
  );

  // get the active customers
  const activeCustomers = customers.filter(
    (customer) => customer.statusCustomer === "Active"
  );

  // get the inactive customers
  const inactiveCustomers = customers.filter(
    (customer) => customer.statusCustomer === "Inactive"
  );

  return {
    customers,
    activeCustomers,
    inactiveCustomers,
  };
};
