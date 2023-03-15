import { OrderItem } from "./Order_item";
import { ShippingAddress } from "./Shipping_address";
import { User } from "./User";

export class Order{
  id?: number;
  user_id?: number;
  total!: number;
  created_at!: string;
  shipped!: number;
  user!: User;
  shipping_address!: ShippingAddress;
  items!: OrderItem[];
}