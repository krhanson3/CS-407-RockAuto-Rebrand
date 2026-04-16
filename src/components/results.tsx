import type { Part } from "../types/types";
import { useCart } from "../data/contexts/CartContext";


import acdelcoSerpentineBelt from "../images/parts/acdelcoSerpentineBelt.jpg";
import ancoWiper from "../images/parts/ANCO_wiper.jpg";
import atpTransmissionFilter from "../images/parts/atpTransmissionFilter.jpg";
import boschWiper from "../images/parts/bosch_wiper.png";
import boschBrakeRotor from "../images/parts/boschBrakeRotor.jpg";
import boschOxygenSensor from "../images/parts/boschOxygenSensor.jpg";
import boschStarterRelay from "../images/parts/boschStarterRelay.jpg";
import densoAlternator from "../images/parts/densoAlternator.jpg";
import dormanLugNut from "../images/parts/dormanLugNut.jpg";
import framAirFilter from "../images/parts/framAirFilter.jpg";
import gspCvAxle from "../images/parts/gspCvAxle.jpg";
import kybShockAbsorber from "../images/parts/kybShockAbsorber.jpg";
import mobil1OilFilter from "../images/parts/mobil1OilFilter.jpg";
import moogTieRodEnd from "../images/parts/moogTieRodEnd.jpg";
import motoradRadiatorCap from "../images/parts/motoradRadiatorCap.jpg";
import ngkSparkPlug from "../images/parts/ngkSparkPlug.jpg";
import oemOwnersManual from "../images/parts/oemOwnersManual.jpg";
import philipsDomeLight from "../images/parts/philipsDomeLight.jpg";
import purolatorCabinFilter from "../images/parts/purolatorCabinFilter.jpg";
import rainxWiper from "../images/parts/rainx_wiper.png";
import smpWireConnector from "../images/parts/smpWireConnector.jpg";
import sylvaniaHalogenBulb from "../images/parts/sylvaniaHalogenBulb.jpg";
import tricoWiper from "../images/parts/TRICO_wiper.jpg";
import tycHeadlightAssembly from "../images/parts/tycHeadLightAssembly.jpg";


const productImages: Record<string, string> = {
  tricoWiper,
  ancoWiper,
  boschWiper,
  rainxWiper,

  acdelcoSerpentineBelt,
  tycHeadlightAssembly,
  boschBrakeRotor,
  motoradRadiatorCap,
  gspCvAxle,
  densoAlternator,
  sylvaniaHalogenBulb,
  smpWireConnector,
  boschStarterRelay,
  mobil1OilFilter,
  boschOxygenSensor,
  framAirFilter,
  purolatorCabinFilter,
  ngkSparkPlug,
  philipsDomeLight,
  oemOwnersManual,
  moogTieRodEnd,
  kybShockAbsorber,
  atpTransmissionFilter,
  dormanLugNut,
};


type Props = {
  results: Part[];
};

export function PartsResults({ results }: Props) {
  
  const { addToCart } = useCart(); 

  return (
    <div className={`search-results-placeholder ${results.length > 0 ? "has-products" : ""}`}>
        {results.length === 0 ? (
        <div className="search-products empty-state">
          <p>No parts found.</p>
        </div>
      ) : (
        <div className="search-products">
          {results.map((item) => (
            <article key={item.partNumber} className="search-product-card">
              <img src={productImages[item.image]} alt={item.name} />

              <div className="search-product-info">
                <h3>{item.brand} — {item.name}</h3>
                <p className="search-product-price">{item.price}</p>
                <p className="search-product-number">Part #{item.partNumber}</p>

                <button
                  type="button"
                  className="search-add-btn"
                  onClick={() => addToCart(item)}
                >
                  Add to Cart
                </button>

              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
