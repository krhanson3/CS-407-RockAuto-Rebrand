import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../pages/Home';
import Search from "../pages/Search";
import Results from "../pages/Results";
import Account from "../pages/Account";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/results" element={<Results />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </BrowserRouter>
  );
}
