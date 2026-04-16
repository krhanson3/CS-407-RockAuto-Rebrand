import type { Part } from "../types/types";
import { useCart } from "../data/contexts/CartContext";

import tricoWiper from "../images/parts/TRICO_wiper.jpg";
import ancoWiper from "../images/parts/ANCO_wiper.jpg";
import boschWiper from "../images/parts/bosch_wiper.png";
import rainxWiper from "../images/parts/rainx_wiper.png";

const productImages: Record<string, string> = {
  tricoWiper,
  ancoWiper,
  boschWiper,
  rainxWiper,
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
