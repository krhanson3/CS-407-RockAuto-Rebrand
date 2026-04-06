import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Search from "../pages/Search";
import Results from "../pages/Results";
import Account from "../pages/Account";
import Cart from "../pages/Cart";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/results" element={<Results />} />
      <Route path="/account" element={<Account />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}
