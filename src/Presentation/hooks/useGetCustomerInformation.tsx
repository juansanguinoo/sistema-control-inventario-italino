import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCustomers,
  getCustomerByUserId,
  getCustomerInfo,
} from "../../store/actions/customerActions";
import { useEffect } from "react";
import { CustomerModel } from "../../domain/models/CustomerModel";
import { CustomerInfoResponse } from "../../domain/models/CustomerInfoResponse";
import { RootState } from "../../store/store";

export const useGetCustomerInformation = () => {
  const dispatch = useDispatch<Dispatch<any>>(); // eslint-disable-line
  const getUser = useSelector((state: RootState) => state.userReducer.user);

  useEffect(() => {
    if (getUser?.roleId.id_role === 1) {
      dispatch(getAllCustomers());
    } else {
      dispatch(getCustomerByUserId(getUser?.id!));
    }
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
