import NavBar from "./components/navbar";
import Footer from "./components/footer";
import AppRouter from "./router/AppRouter";
import { HashRouter } from "react-router-dom";
import { CartProvider } from "./data/CartContext";

export default function App() {
  return (
    <CartProvider>
      <HashRouter>
        <NavBar />

        <div className="page">
          <AppRouter />
          <Footer />
        </div>
      </HashRouter>
    </CartProvider>
  );
}
