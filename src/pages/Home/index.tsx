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
          <div className="welcome-message">
              <span className="welcome-message-title">Finding Parts:</span>
                <span className="welcome-message-message">
                  Start your search by entering your vehicle information or by entering a specific part number
                </span>
              <span className="welcome-message-title">Placing an Order:</span>
              <span className="welcome-message-message">
                  Add items to your cart, enter shipping and payment information, then review your Order
              </span>
              <span className="welcome-message-title">Existing Orders:</span>
              <span className="welcome-message-message">
                  To view orders, check Order Status and Returns
              </span>
              
          </div>
        </div>

        <div className="home-card">
          
          <div className="home-buttons">
            <button
              className="home-btn primary"
              onClick={() => navigate("/search-by-vehicle")}
            >
              Search by Vehicle Type
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
