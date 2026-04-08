import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import RockAutoLogo from "../images/RockAutoLogo.png";
import { useCart } from "../data/CartContext";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">
          <img src={RockAutoLogo} alt="RockAuto Logo" className="logo-img" />
        </Link>
      </div>

      <div className="navbar-right desktop-links">
        <ul className="nav-links">
          <li>
            <Link to="/cart" className="nav-cart-link">Cart 
              <svg
                className="nav-cart-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              
              {totalItems > 0 && (
                <span className="nav-cart-badge">{totalItems}</span>
              )}
              
            </Link>
          </li>
          <li><Link to="/account">Account</Link></li>
        </ul>
      </div>

      <button
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/account" onClick={() => setMenuOpen(false)}>Account</Link>
          <Link to="/cart" onClick={() => setMenuOpen(false)} className="nav-cart-link">
            <svg
              className="nav-cart-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            Cart
            {totalItems > 0 && (
              <span className="nav-cart-badge">{totalItems}</span>
            )}
          </Link>
        </div>
      )}
    </nav>
  );
}
