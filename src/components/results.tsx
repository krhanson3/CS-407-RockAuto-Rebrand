import type { Part } from "../../types/types";

type Props = {
  results: Part[];
};

export function PartsResults({ results }: Props) {
  if (results.length === 0) {
    return <p className="no-results">No parts found.</p>;
  }

  return (
    <div className="results-grid">
      {results.map((item) => (
        <div key={item.partNumber} className="part-card">
          <img
            src={`/images/${item.image}.png`}
            alt={item.name}
            className="part-image"
          />

          <div className="part-info">
            <h3 className="part-name">{item.brand} — {item.name}</h3>
            <p className="part-number">Part #{item.partNumber}</p>
            <p className="part-price">{item.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
