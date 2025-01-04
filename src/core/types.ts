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
}

export type User = {
  id: string;
  userId: string;
  name: string;
  email: string;
  role: string;
}
