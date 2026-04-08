import { useState } from "react";
import { products } from "../../data/parts";
import type { Part } from "../../types/types";
import Breadcrumb from "../../components/breadcrumb";
import { PartsResults } from "../../components/results";

import "../../styles/searchPage.css"

export default function SearchByPartPage() {
  const [partSearch, setPartSearch] = useState("");
  const [results, setResults] = useState<Part[] | null>(null);

  const handleSearch = () => {
    const allParts: Part[] = Object.values(products).flat();

    const matches = allParts.filter((p) =>
      p.partNumber.toString().includes(partSearch.trim())
    );

    setResults(matches);
  };

  return (
    <div className="search-page">
      <h1 className="search-title">
        <span className="search-title-line">ALL THE PARTS YOUR</span>
        <span className="search-title-line">CAR WILL EVER NEED</span>
      </h1>
      <main className="search-main">
        <div className="search-card">
          <div className="search-grid">
            <Breadcrumb />
            <div className="search-input-group">
              <label htmlFor="part-search">Part Number</label>
              <input
                id="part-search"
                type="text"
                className="search-select"
                placeholder="Enter part number..."
                value={partSearch}
                onChange={(e) => setPartSearch(e.target.value)}
              />
            </div>
          </div>

          <button className="search-parts-btn" type="button" onClick={handleSearch}>
            Search Parts
          </button>
        </div>

        {results !== null && (
          <section className="search-results part-mode">
            {/* Empty sidebar to preserve layout */}
            <aside></aside>

            <PartsResults results={results} />
          </section>
        )}
      </main>
    </div>
  );
}
