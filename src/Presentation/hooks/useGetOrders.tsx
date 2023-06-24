import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "../../store/store";
import { OrderResponseModel } from "../../domain/models/OrderResponseModel";
import { useEffect } from "react";
import {
  getAllOrders,
  getOrdersByUserId,
} from "../../store/actions/orderActions";

export const useGetOrders = () => {
  const dispatch = useDispatch<Dispatch<any>>(); // eslint-disable-line
  const getUser = useSelector((state: RootState) => state.userReducer.user);

  const orders: OrderResponseModel[] = useSelector(
    (state: RootState) => state.orderReducer.orders
  );

  const loading: boolean = useSelector(
    (state: RootState) => state.orderReducer.loading
  );

  const error: Error | null = useSelector(
    (state: RootState) => state.orderReducer.error
  );

  useEffect(() => {
    if (getUser?.roleId.id_role === 1) {
      dispatch(getAllOrders());
    } else {
      dispatch(getOrdersByUserId(getUser?.id!));
    }
  }, [dispatch]);

  return { orders, loading, error };
};
