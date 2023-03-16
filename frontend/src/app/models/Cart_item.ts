import { Product } from "./Product";

export class CartItem{
  cart_item_id!: number;
  product_id!: number;
  product_name!: string;
  product_price!: number;
  main_image!: string;
  quantity!: number;
}