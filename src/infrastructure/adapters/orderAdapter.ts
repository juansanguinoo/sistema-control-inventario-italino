import { OrderResponse } from "../../domain/models/OrderResponse";
import { OrderResponseModel } from "../../domain/models/OrderResponseModel";

export const adaptOrder = (order: OrderResponse): OrderResponseModel => {
  return {
    id: order.id_order,
    referenceOrder: order.reference_order,
    customer: order.customer,
    user: order.user,
    orderDetails: order.order_details,
    statusOrder: order.status_order,
    paymentOrder: order.payment_order,
    typeOrder: order.type_order,
    totalOrder: order.total_order,
    createdAt: order.created_at,
    orderReturns: order.order_returns,
  };
};

export const adaptOrders = (orders: OrderResponse[]): OrderResponseModel[] => {
  return orders.map((order) => adaptOrder(order));
};
