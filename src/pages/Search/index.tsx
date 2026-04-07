import { useState } from "react";

import "../../styles/global.css";
import "../../styles/searchPage.css";
import tricoWiper from "../../images/TRICO_wiper.jpg";
import ancoWiper from "../../images/ANCO_wiper.jpg";

const categories = [
  "Belt Drive",
  "Body & Lamp Assembly",
  "Brake & Wheel Hub",
  "Cooling System",
  "Drivetrain",
  "Electrical",
  "Electrical-Bulb & Socket",
  "Electrical-Connector",
  "Electrical-Switch & Relay",
  "Engine",
  "Exhaust & Emission",
  "Fuel & Air",
  "Heat & Air Conditioning",
  "Ignition",
  "Interior",
  "Literature",
  "Steering",
  "Suspension",
  "Transmission-Automatic",
  "Wheel",
  "Wiper & Washer",
];

export default function Search() {
  const [make, setMake] = useState("none");
  const [model, setModel] = useState("none");
  const [year, setYear] = useState("none");
  const [engine, setEngine] = useState("none");
  const [showResults, setShowResults] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleSearch = () => {
    const matches =
      make === "Hyundai" &&
      model === "Sonata" &&
      year === "2020" &&
      engine === "2.0L L4 Electric/Gas";
    setShowResults(matches);
    setSelectedCategory(null);
  };

  return (
    <div className="search-page">
      <h1 className="search-title">
        <span className="search-title-line">ALL THE PARTS YOUR</span>
        <span className="search-title-line">CAR WILL EVER NEED</span>
      </h1>

      <main className={`search-main${showResults ? " search-main--results" : ""}`}>
        {showResults ? (
          <section className="search-results">
            <button
              className="search-back-btn"
              type="button"
              onClick={() => {
                setShowResults(false);
                setSelectedCategory(null);
              }}
            >
              ← Back to Search
            </button>

            <aside className="search-filter-card">
              <h2 className="search-filter-title">Filter by Category</h2>
              <ul className="search-filter-list">
                {categories.map((category) => (
                  <li key={category}>
                    <button
                      className={`search-filter-btn${
                        selectedCategory === category ? " is-active" : ""
                      }`}
                      type="button"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </aside>

            <div
              className={`search-results-placeholder${
                selectedCategory === "Wiper & Washer" ? " has-products" : ""
              }`}
            >
              {selectedCategory === "Wiper & Washer" ? (
                <div className="search-products">
                  <article className="search-product-card">
                    <img src={tricoWiper} alt="TRICO 31180 wiper blade" />
                    <div className="search-product-info">
                      <h3>TRICO 31180 View; Conventional Front Right</h3>
                      <p className="search-product-price">$1.79</p>
                      <button type="button" className="search-add-btn">
                        Add to Cart
                      </button>
                    </div>
                  </article>

                  <article className="search-product-card">
                    <img src={ancoWiper} alt="ANCO 3118 31-Series wiper blade" />
                    <div className="search-product-info">
                      <h3>ANCO 3118 31-Series; Conventional Front Right</h3>
                      <p className="search-product-price">$2.46</p>
                      <button type="button" className="search-add-btn">
                        Add to Cart
                      </button>
                    </div>
                  </article>
                </div>
              ) : (
                <p>Parts will appear here when a category is selected</p>
              )}
            </div>
          </section>
        ) : (
          <div className="search-card">
            <div className="search-grid">
              <div className="search-input-group">
                <label htmlFor="search-make">Make</label>
                <select
                  id="search-make"
                  className="search-select"
                  value={make}
                  onChange={(e) => setMake(e.target.value)}
                >
                  <option value="none">None</option>
                  <option>Hyundai</option>
                </select>
              </div>

              <div className="search-input-group">
                <label htmlFor="search-model">Model</label>
                <select
                  id="search-model"
                  className="search-select"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                >
                  <option value="none">None</option>
                  <option>Sonata</option>
                </select>
              </div>

              <div className="search-input-group">
                <label htmlFor="search-year">Year</label>
                <select
                  id="search-year"
                  className="search-select"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                >
                  <option value="none">None</option>
                  <option>2020</option>
                </select>
              </div>

              <div className="search-input-group">
                <label htmlFor="search-engine">Engine</label>
                <select
                  id="search-engine"
                  className="search-select"
                  value={engine}
                  onChange={(e) => setEngine(e.target.value)}
                >
                  <option value="none">None</option>
                  <option>2.0L L4 Electric/Gas</option>
                </select>
              </div>
            </div>

            <button className="search-parts-btn" type="button" onClick={handleSearch}>
              Search Parts
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
