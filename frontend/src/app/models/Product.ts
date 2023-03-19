export class Product{
  id?: number;
  name!: string;
  description!: string;
  price!: number;
  main_image!: string;
  inventory!: number;
  sales!: number;
  category!: string;
  images?: any[];
  active?: number;
}