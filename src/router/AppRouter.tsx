import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import SearchByVehicle from "../pages/SearchByVehicle";
import SearchByPart from "../pages/SearchByPart";
import Account from "../pages/Account";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search-by-vehicle" element={<SearchByVehicle />} />
      <Route path="/search-by-part" element={<SearchByPart />} />
      <Route path="/account" element={<Account />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
}
