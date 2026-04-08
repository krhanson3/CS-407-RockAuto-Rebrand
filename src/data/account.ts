import type { Address, Vehicle } from "../types/types";

export const initialAddresses: Address[] = [
  {
    id: 1,
    name: "Home",
    line1: "123 Main Street",
    line2: "Apt 4B",
    city: "Springfield",
    state: "IL",
    zip: "62704"
  },
];


export const initialVehicles: Vehicle[] = [
  { id: 1, 
    make: "Honda",
    model: "Accord",
    year: "2021",
    engine: "2.0L L4 Turbo",
},
];
