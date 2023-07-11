import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCustomers,
  getCustomerInfo,
} from "../../store/actions/customerActions";
import { useEffect } from "react";
import { CustomerModel } from "../../domain/models/CustomerModel";
import { CustomerInfoResponse } from "../../domain/models/CustomerInfoResponse";

export const useGetCustomerInformation = () => {
  const dispatch = useDispatch<Dispatch<any>>(); // eslint-disable-line

  useEffect(() => {
    dispatch(getAllCustomers());
    dispatch(getCustomerInfo());
  }, [dispatch]);

  const customers: CustomerModel[] = useSelector(
    (state: any) => state.customerReducer.customers
  );

  const customerInfo: CustomerInfoResponse = useSelector(
    (state: any) => state.customerReducer.customerInfo
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
    customerInfo,
  };
};
