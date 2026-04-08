import { useState } from "react";
import { vehicleOptions } from "../../data/vehicleOptions";
import { searchCategories } from "../../data/searchCategories";
import { products } from "../../data/parts";
import { PartsResults } from "../../components/results";

import "../../styles/global.css";
import "../../styles/searchPage.css";
import Breadcrumb from "../../components/breadcrumb";
import { useSavedVehicles } from "../../data/SavedVehiclesContext";

export default function Search() {
  const { savedVehicles } = useSavedVehicles(); 

  const [make, setMake] = useState("none");
  const [model, setModel] = useState("none");
  const [year, setYear] = useState("none");
  const [engine, setEngine] = useState("none");
  const [showResults, setShowResults] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const makes = [...new Set(vehicleOptions.map(v => v.make))];

  const models = make !== "none"
    ? [...new Set(vehicleOptions.filter(v => v.make === make).map(v => v.model))]
    : [];

  const years = model !== "none"
    ? [...new Set(vehicleOptions.filter(v => v.make === make && v.model === model).map(v => v.year))]
    : [];

  const engines = year !== "none"
    ? [...new Set(vehicleOptions.filter(v => v.make === make && v.model === model && v.year === year).map(v => v.engine))]
    : [];

  const handleSearch = () => {
    const match = vehicleOptions.some(v =>
      v.make === make &&
      v.model === model &&
      v.year === year &&
      v.engine === engine
    );
    setShowResults(match);
    setSelectedCategory(null);
  };

  const handleSelectSavedVehicle = (v: any) => {
    setMake(v.make);
    setModel(v.model);
    setYear(v.year);
    setEngine(v.engine);
    setShowResults(true);
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
            <aside className="search-filter-card">
              <Breadcrumb />
              <h2 className="search-filter-title">Filter by Category</h2>
              <ul className="search-filter-list">
                {searchCategories.map((category) => (
                  <li key={category}>
                    <button
                      className={`search-filter-btn${selectedCategory === category ? " is-active" : ""}`}
                      type="button"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </aside>

            <PartsResults
              results={
                selectedCategory !== null && products[selectedCategory]
                  ? products[selectedCategory]
                  : []
              }
            />
          </section>
        ) : (
          <div className="search-card">
            <Breadcrumb />
            {savedVehicles.length > 0 && (
          <section className="saved-vehicles-box">
            <h2 className="saved-vehicles-title">Saved Vehicles</h2>

            <ul className="saved-vehicles-list">
              {savedVehicles.map((v) => (
                <li key={v.id} className="saved-vehicle-item">
                  <button
                    type="button"
                    className="saved-vehicle-select"
                    onClick={() => handleSelectSavedVehicle(v)}
                  >
                    {v.year} {v.make} {v.model} — {v.engine}
                  </button>
                </li>
              ))}
            </ul>

          </section>
        )}
            <div className="search-grid">
              <div className="search-input-group">
                <label htmlFor="search-make">Make</label>
                <select
                  id="search-make"
                  className="search-select"
                  value={make}
                  onChange={(e) => {
                    setMake(e.target.value);
                    setModel("none");
                    setYear("none");
                    setEngine("none");
                  }}
                >
                  <option value="none">None</option>
                  {makes.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <div className="search-input-group">
                <label htmlFor="search-model">Model</label>
                <select
                  id="search-model"
                  className="search-select"
                  value={model}
                  onChange={(e) => {
                    setModel(e.target.value);
                    setYear("none");
                    setEngine("none");
                  }}
                  disabled={make === "none"}
                >
                  <option value="none">None</option>
                  {models.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <div className="search-input-group">
                <label htmlFor="search-year">Year</label>
                <select
                  id="search-year"
                  className="search-select"
                  value={year}
                  onChange={(e) => {
                    setYear(e.target.value);
                    setEngine("none");
                  }}
                  disabled={model === "none"}
                >
                  <option value="none">None</option>
                  {years.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>

              <div className="search-input-group">
                <label htmlFor="search-engine">Engine</label>
                <select
                  id="search-engine"
                  className="search-select"
                  value={engine}
                  onChange={(e) => setEngine(e.target.value)}
                  disabled={year === "none"}
                >
                  <option value="none">None</option>
                  {engines.map((e) => (
                    <option key={e} value={e}>{e}</option>
                  ))}
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
