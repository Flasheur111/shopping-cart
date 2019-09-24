export interface IProduct {
  id: number;
  name: string;
  price: number;
  image: string;
}

export interface ICartProduct {
  product: IProduct;
  quantity: number;
}
