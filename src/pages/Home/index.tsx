import "../../styles/homePage.css";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <main className="home-main">
        <h1 className="home-title">
          <span className="home-title-line">ALL THE PARTS YOUR</span>
          <span className="home-title-line">CAR WILL EVER NEED</span>
        </h1>

        <div className="home-card">
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
      </main>
    </div>
  );
}
