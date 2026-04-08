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
