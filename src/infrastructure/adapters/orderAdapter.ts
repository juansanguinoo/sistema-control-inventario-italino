import { OrderProductionResponse } from "../../domain/models/OrderProductionResponse";
import { OrderProductionResponseModel } from "../../domain/models/OrderProductionResponseModel";
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
    descriptionOrder: order.description_order,
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

export const adaptOrderProduction = (
  order: OrderProductionResponse
): OrderProductionResponseModel => {
  return {
    id: order.id_order,
    referenceOrder: order.reference_order,
    statusOrder: order.status_order,
    descriptionOrder: order.description_order,
    paymentOrder: order.payment_order,
    typeOrder: order.type_order,
    totalOrder: order.total_order,
    createdAt: order.created_at,
    orderDetails: order.order_details,
  };
};

export const adaptOrdersProduction = (
  orders: OrderProductionResponse[]
): OrderProductionResponseModel[] => {
  return orders.map((order) => adaptOrderProduction(order));
};
