import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import RockAutoLogo from "../images/RockAutoLogo.png";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">
          <img src={RockAutoLogo} alt="RockAuto Logo" className="logo-img" />
        </Link>
      </div>

      {/* Desktop Links */}
      <div className="navbar-right desktop-links">
        <ul className="nav-links">
          <li><Link to="/account">Account</Link></li>
          <li><Link to="/cart">Cart</Link></li>
        </ul>
      </div>

      {/* Mobile Hamburger */}
      <button
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/account" onClick={() => setMenuOpen(false)}>Account</Link>
          <Link to="/cart" onClick={() => setMenuOpen(false)}>Cart</Link>
        </div>
      )}
    </nav>
  );
}
