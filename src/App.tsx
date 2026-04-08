import NavBar from "./components/navbar";
import Footer from "./components/footer";
import AppRouter from "./router/AppRouter";
import { HashRouter } from "react-router-dom";
import { CartProvider } from "./data/CartContext";
import { SavedVehiclesProvider } from "./data/SavedVehiclesContext";
import { SavedAddressProvider } from "./data/SavedAddressContext";

export default function App() {
  return (
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
  );
}
