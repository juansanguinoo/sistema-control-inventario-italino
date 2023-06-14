import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "../../store/store";
import { OrderResponseModel } from "../../domain/models/OrderResponseModel";

export const useGetOrders = () => {
  const dispatch = useDispatch<Dispatch<any>>(); // eslint-disable-line

  const orders: OrderResponseModel[] = useSelector(
    (state: RootState) => state.orderReducer.orders
  );

  const loading: boolean = useSelector(
    (state: RootState) => state.orderReducer.loading
  );

  const error: Error | null = useSelector(
    (state: RootState) => state.orderReducer.error
  );

  return { orders, loading, error };
};
