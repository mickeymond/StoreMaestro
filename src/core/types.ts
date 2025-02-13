export type Product = {
  id: string;
  name: string;
  expiry: number;
  price: string;
  altPrice: string;
}

export type Sale = {
  id: string;
  productId: string;
  price: string;
  quantity: string;
  createdAt: number;
}

export type SaleSummery = {
  productId: string;
  totalQuantity: number;
  totalAmount: number;
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
  SalesSummary: { salesSummary: SaleSummery[] };
  AddSale: undefined;
}
