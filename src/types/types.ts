export type Vehicle = {
    id: number; 
    make: string;
    model: string;
    year: string;
    engine: string;
};

export type Address = {
  id: number;
  name: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  zip: string;
};

export type Part = {
    name: string;
    brand: string;
    partNumber: number;
    price: string;
    image: string; 
}

export type Promotion = {
    name: string; 
    expiration: string; 
    discount: number; 
    image: string; 
}
export type OrderStatus = "Processing" | "Shipped" | "Delivered";

export type Order = {
  id: string;
  date: string;
  total: number;
  status: OrderStatus;
  items: {
    name: string;
    quantity: number;
  }[];
};
