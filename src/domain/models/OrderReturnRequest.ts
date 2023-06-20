interface OrderDetail {
  inventoryId: number;
}

export interface OrderReturn {
  inventoryId: number;
  quantity: number;
}

export interface OrderReturnRequest {
  id: number;
  orderDetails: OrderDetail[];
  OrderReturns: OrderReturn[];
}
