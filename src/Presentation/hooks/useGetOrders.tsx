import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "../../store/store";
import { OrderResponseModel } from "../../domain/models/OrderResponseModel";
import { useEffect, useState } from "react";
import {
  getAllOrders,
  getOrderStats,
  getOrdersByUserId,
  getOrdersProduction,
} from "../../store/actions/orderActions";
import { OrderInfoResponse } from "../../domain/models/OrderInfoResponse";
import { OrderProductionResponseModel } from "../../domain/models/OrderProductionResponseModel";

export const useGetOrders = () => {
  const dispatch = useDispatch<Dispatch<any>>(); // eslint-disable-line
  const getUser = useSelector((state: RootState) => state.userReducer.user);
  const [ordersToProduction, setOrdersToProduction] = useState<
    OrderProductionResponseModel[]
  >([]);

  const orders: OrderResponseModel[] = useSelector(
    (state: RootState) => state.orderReducer.orders
  );
  const ordersProduction = useSelector(
    (state: RootState) => state.orderReducer.ordersProduction
  );
  const ordersInfo: OrderInfoResponse | null = useSelector(
    (state: RootState) => state.orderReducer.orderInfo
  );

  const loading: boolean = useSelector(
    (state: RootState) => state.orderReducer.loading
  );

  const error: Error | null = useSelector(
    (state: RootState) => state.orderReducer.error
  );

  useEffect(() => {
    if (ordersProduction.length > 0) {
      const ordersToProduction = ordersProduction.filter(
        (order) =>
          order.statusOrder === "Entregado" || order.statusOrder === "Salida"
      );
      setOrdersToProduction(ordersToProduction);
    }
  }, [ordersProduction]);

  useEffect(() => {
    dispatch(getOrderStats());
    dispatch(getOrdersProduction());
    if (getUser?.roleId.id_role === 1) {
      dispatch(getAllOrders());
    } else {
      dispatch(getOrdersByUserId(getUser?.id!));
    }
  }, [dispatch]);

  return { orders, loading, error, ordersInfo, ordersToProduction };
};
