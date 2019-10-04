export interface IOrderDetail {
  id: number;
  orderId: number;
  vehicleCategoryId: number;
  customerTypeId: number;
  travelFromId: number;
  travelToId: number;
  unitPrice: string;
  originTotalPrice: string;
  totalPrice: string;
  quantity: number;
  discount: number;
  createdAt: string;
  updatedAt: string;
  createdAtStr: string;
  updatedAtStr: string;
  status: number;
}
