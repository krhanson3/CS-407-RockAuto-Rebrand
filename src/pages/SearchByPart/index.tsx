import { useState } from "react";
import { products } from "../../data/parts";   // ← correct path
import type { Part } from "../../types/types";
import Breadcrumb from "../../components/breadcrumb";

export default function SearchByPartPage() {
  const [partSearch, setPartSearch] = useState("");
  const [results, setResults] = useState<Part[]>([]);

  const handleSearch = () => {
    const allParts: Part[] = Object.values(products).flat();

    const matches = allParts.filter((p) =>
      p.partNumber.toString().includes(partSearch.trim())
    );

    setResults(matches);
  };

  return (
    <div className="part-search-page">
      <Breadcrumb />
      <h2>Part Number</h2>

      <div className="part-search-box">
        <input
          type="text"
          placeholder="Enter part number..."
          value={partSearch}
          onChange={(e) => setPartSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="part-results">
        {results.length > 0 ? (
          results.map((item) => (
            <div key={item.partNumber} className="part-card">
              <h3>{item.brand} — {item.name}</h3>
              <p>Part #{item.partNumber}</p>
              <p>{item.price}</p>
            </div>
          ))
        ) : (
          <p>Enter a part number to begin</p>
        )}
      </div>
    </div>
  );
}
