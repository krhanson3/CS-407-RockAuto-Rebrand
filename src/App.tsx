import NavBar from "./components/navbar";
import Footer from "./components/footer";
import AppRouter from "./router/AppRouter";
import { HashRouter } from "react-router-dom";
import { CartProvider } from "./data/contexts/CartContext";
import { SavedVehiclesProvider } from "./data/contexts/SavedVehiclesContext";
import { SavedAddressProvider } from "./data/contexts/SavedAddressContext";
import { OrderProvider } from "./data/contexts/OrderContext";

export default function App() {
  return (
  <OrderProvider>
    <CartProvider>
      <SavedVehiclesProvider >
        <SavedAddressProvider >
          <HashRouter>
            <NavBar />

            <div className="page">
              <AppRouter />
              <Footer />
            </div>
          </HashRouter>
        </SavedAddressProvider>
      </SavedVehiclesProvider>
    </CartProvider>
  </OrderProvider>
  );
}
