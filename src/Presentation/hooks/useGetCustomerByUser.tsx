import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "../../store/store";
import { useEffect } from "react";
import {
  getAllCustomers,
  getCustomerByUserId,
} from "../../store/actions/customerActions";

export const useGetCustomerByUser = () => {
  const dispatch = useDispatch<Dispatch<any>>(); // eslint-disable-line
  const getUser = useSelector((state: RootState) => state.userReducer.user);
  const customers = useSelector(
    (state: RootState) => state.customerReducer.customers
  );

  const loading: boolean = useSelector(
    (state: RootState) => state.customerReducer.loading
  );

  const error: Error | null = useSelector(
    (state: RootState) => state.customerReducer.error
  );

  useEffect(() => {
    if (getUser?.roleId.id_role === 1) {
      dispatch(getAllCustomers());
    } else {
      dispatch(getCustomerByUserId(getUser?.id!));
    }
  }, []);

  return { customers, loading, error, getUser };
};
