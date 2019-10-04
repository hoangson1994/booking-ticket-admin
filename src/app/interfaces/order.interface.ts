import {IUser} from './user.interface';
import {ICustomer} from './customer.interface';
import {IOrderDetail} from './order-detail.interface';

export interface IOrder {
  id: number;
  customer: ICustomer;
  createdBy: IUser;
  finalPrice: string;
  paidStatus: number;
  orderDetails: IOrderDetail[];
  createdAt: string;
  updatedAt: string;
  createdAtStr: string;
  updatedAtStr: string;
  status: number;

}
