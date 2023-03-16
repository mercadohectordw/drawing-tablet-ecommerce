import { CartItem } from "./Cart_item";

export class Cart{
  id!: number;
  created_at?: string;
  cart_items!: CartItem[];
}