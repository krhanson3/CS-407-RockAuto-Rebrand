import type { Part } from "../types/types";

export const products: Record<string, Part[]> = {
  "Belt Drive": [
    {
      name: "Serpentine Belt",
      brand: "ACDelco",
      partNumber: 10001,
      price: "$12.99",
      image: "acdelcoSerpentineBelt",
    },
  ],

  "Body & Lamp Assembly": [
    {
      name: "Headlight Assembly",
      brand: "TYC",
      partNumber: 20001,
      price: "$49.99",
      image: "tycHeadlightAssembly",
    },
  ],

  "Brake & Wheel Hub": [
    {
      name: "Front Brake Rotor",
      brand: "Bosch",
      partNumber: 30001,
      price: "$29.99",
      image: "boschBrakeRotor",
    },
  ],

  "Cooling System": [
    {
      name: "Radiator Cap",
      brand: "Motorad",
      partNumber: 40001,
      price: "$7.49",
      image: "motoradRadiatorCap",
    },
  ],

  "Drivetrain": [
    {
      name: "CV Axle",
      brand: "GSP",
      partNumber: 50001,
      price: "$59.99",
      image: "gspCvAxle",
    },
  ],

  "Electrical": [
    {
      name: "Alternator",
      brand: "Denso",
      partNumber: 60001,
      price: "$89.99",
      image: "densoAlternator",
    },
  ],

  "Electrical-Bulb & Socket": [
    {
      name: "Halogen Bulb",
      brand: "Sylvania",
      partNumber: 60002,
      price: "$4.99",
      image: "sylvaniaHalogenBulb",
    },
  ],

  "Electrical-Connector": [
    {
      name: "Wire Connector",
      brand: "SMP",
      partNumber: 60003,
      price: "$3.49",
      image: "smpWireConnector",
    },
  ],

  "Electrical-Switch & Relay": [
    {
      name: "Starter Relay",
      brand: "Bosch",
      partNumber: 60004,
      price: "$8.99",
      image: "boschStarterRelay",
    },
  ],

  "Engine": [
    {
      name: "Oil Filter",
      brand: "Mobil1",
      partNumber: 70001,
      price: "$9.99",
      image: "mobil1OilFilter",
    },
  ],

  "Exhaust & Emission": [
    {
      name: "Oxygen Sensor",
      brand: "Bosch",
      partNumber: 80001,
      price: "$39.99",
      image: "boschOxygenSensor",
    },
  ],

  "Fuel & Air": [
    {
      name: "Air Filter",
      brand: "Fram",
      partNumber: 90001,
      price: "$11.99",
      image: "framAirFilter",
    },
  ],

  "Heat & Air Conditioning": [
    {
      name: "Cabin Air Filter",
      brand: "Purolator",
      partNumber: 100001,
      price: "$14.99",
      image: "purolatorCabinFilter",
    },
  ],

  "Ignition": [
    {
      name: "Spark Plug",
      brand: "NGK",
      partNumber: 110001,
      price: "$5.99",
      image: "ngkSparkPlug",
    },
  ],

  "Interior": [
    {
      name: "Cabin Dome Light",
      brand: "Philips",
      partNumber: 120001,
      price: "$3.99",
      image: "philipsDomeLight",
    },
  ],

  "Literature": [
    {
      name: "Owner’s Manual",
      brand: "OEM",
      partNumber: 130001,
      price: "$19.99",
      image: "oemOwnersManual",
    },
  ],

  "Steering": [
    {
      name: "Tie Rod End",
      brand: "Moog",
      partNumber: 140001,
      price: "$24.99",
      image: "moogTieRodEnd",
    },
  ],

  "Suspension": [
    {
      name: "Shock Absorber",
      brand: "KYB",
      partNumber: 150001,
      price: "$49.99",
      image: "kybShockAbsorber",
    },
  ],

  "Transmission-Automatic": [
    {
      name: "Transmission Filter",
      brand: "ATP",
      partNumber: 160001,
      price: "$18.99",
      image: "atpTransmissionFilter",
    },
  ],

  "Wheel": [
    {
      name: "Wheel Lug Nut",
      brand: "Dorman",
      partNumber: 170001,
      price: "$1.49",
      image: "dormanLugNut",
    },
  ],

  "Wiper & Washer": [
    {
      name: "Conventional Front Right",
      brand: "TRICO",
      partNumber: 31180,
      price: "$1.79",
      image: "tricoWiper",
    },
    {
      name: "Conventional Front Right 31-Series",
      brand: "ANCO",
      partNumber: 3118,
      price: "$2.46",
      image: "ancoWiper",
    },
    {
      name: "ICON 26A Wiper Blade",
      brand: "Bosch",
      partNumber: 2601,
      price: "$12.99",
      image: "boschWiper",
    },
    {
      name: "Latitude Water Repellency 26",
      brand: "Rain-X",
      partNumber: 2600,
      price: "$14.49",
      image: "rainxWiper",
    },
  ],
};
