import "../../styles/homePage.css"
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>ALL THE PARTS YOUR CAR WILL EVER NEED</h1>

      <div className="home-buttons">
        <button
          className="home-btn primary"
          onClick={() => navigate("/search-by-vehicle")}
        >
          Start Your Search
        </button>

        <button
          className="home-btn secondary"
          onClick={() => navigate("/search-by-part")}
        >
          Search by Part Number
        </button>
      </div>
    </div>
  );
}
