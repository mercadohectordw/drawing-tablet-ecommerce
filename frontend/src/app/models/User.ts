export class User{
  id?: number;
  first_name?: string;
  last_name?: string;
  email!: string;
  password?: string;
  created_at?: string;
  admin?: number;
  items_in_cart?: number;
};