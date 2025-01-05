export type Product = {
  id: string;
  name: string;
  price: string;
}

export type Sale = {
  id: string;
  productId: string;
  price: string;
  quantity: string
  createdAt: string
}

export type User = {
  id: string;
  userId: string;
  name: string;
  email: string;
  role: string;
}

export type AppStackParamList = {
  Root: undefined;
  Login: undefined;
  Register: undefined;
  AddProduct: undefined;
  EditProduct: { product: Product | null };
  AddSale: undefined;
}
