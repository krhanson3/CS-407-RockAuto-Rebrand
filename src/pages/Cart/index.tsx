import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/cartPage.css";

/* ── Inline SVG icons ── */
const CartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const PackageIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const TruckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
    <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

/* ── Dummy data ── */
interface CartItem {
  id: number;
  name: string;
  brand: string;
  partNumber: string;
  price: number;
  qty: number;
}

const initialItems: CartItem[] = [
  { id: 1, name: "Ceramic Brake Pad Set", brand: "Cortinate", partNumber: "PART#02", price: 45.99, qty: 1 },
  { id: 2, name: "Oil Filter Premium", brand: "Cortinate", partNumber: "PART#03", price: 23.99, qty: 1 },
  { id: 3, name: "Spark Plug Iridium", brand: "Cortinate", partNumber: "PART#02", price: 10.99, qty: 1 },
];

export default function Cart() {
  const [items, setItems] = useState<CartItem[]>(initialItems);

  const updateQty = (id: number, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const shipping = items.length > 0 ? 8.99 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="cart-page">
      {/* Breadcrumb */}
      <div className="cart-breadcrumb">
        <Link to="/">Home</Link>
        <span className="breadcrumb-sep">›</span>
        <span>Shopping Cart</span>
      </div>

      {/* Page Title */}
      <h1 className="cart-title">
        Your Shopping Cart <span className="cart-count">({items.length} {items.length === 1 ? "item" : "items"})</span>
      </h1>

      {items.length === 0 ? (
        /* ── Empty State ── */
        <div className="cart-empty">
          <div className="cart-empty-icon">
            <CartIcon />
          </div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any parts yet.</p>
          <Link to="/" className="cart-empty-cta">
            ← Start Shopping
          </Link>
        </div>
      ) : (
        /* ── Cart with items ── */
        <div className="cart-layout">
          {/* Left — Table */}
          <div className="cart-main">
            <div className="cart-table-card">
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Part #</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="cart-product-cell">
                          <div className="cart-product-thumb">
                            <PackageIcon />
                          </div>
                          <div className="cart-product-info">
                            <div className="product-name">{item.name}</div>
                            <div className="product-brand">{item.brand}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="cart-part-num">{item.partNumber}</span>
                      </td>
                      <td>
                        <span className="cart-price">${item.price.toFixed(2)}</span>
                      </td>
                      <td>
                        <div className="cart-qty-controls">
                          <button
                            className="cart-qty-btn"
                            onClick={() => updateQty(item.id, -1)}
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <input
                            className="cart-qty-value"
                            type="text"
                            value={item.qty}
                            readOnly
                          />
                          <button
                            className="cart-qty-btn"
                            onClick={() => updateQty(item.id, 1)}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="cart-item-total-cell">
                        <div className="cart-item-total">
                          ${(item.price * item.qty).toFixed(2)}
                        </div>
                        <button
                          className="cart-remove-btn"
                          onClick={() => removeItem(item.id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Link to="/" className="cart-continue">
              <span className="arrow-icon">←</span> Continue Shopping
            </Link>
          </div>

          {/* Right — Sidebar */}
          <div className="cart-sidebar">
            <div className="cart-summary-card">
              <h2 className="cart-summary-title">Order Summary</h2>

              <div className="cart-summary-row">
                <span className="cart-summary-label">Subtotal</span>
                <span className="cart-summary-value">${subtotal.toFixed(2)}</span>
              </div>
              <div className="cart-summary-row">
                <span className="cart-summary-label">Shipping</span>
                <span className="cart-summary-value">${shipping.toFixed(2)}</span>
              </div>
              <div className="cart-summary-row">
                <span className="cart-summary-label">Estimated Tax</span>
                <span className="cart-summary-value">${tax.toFixed(2)}</span>
              </div>

              <div className="cart-summary-divider" />

              <div className="cart-summary-total-row">
                <span className="cart-summary-total-label">Total</span>
                <span className="cart-summary-total-value">${total.toFixed(2)}</span>
              </div>

              <button className="cart-checkout-btn" id="checkout-btn">
                <LockIcon />
                Proceed to Checkout
              </button>

              <div className="cart-paypal-divider">or</div>

              <button className="cart-paypal-btn" id="paypal-btn">
                Pay with <span className="cart-paypal-label">PayPal</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Shipping Information ── */}
      {items.length > 0 && (
        <div className="cart-shipping-card">
          <h2 className="cart-shipping-title">
            <TruckIcon />
            Shipping Information
          </h2>

          <div className="cart-shipping-grid">
            <div className="cart-input-group">
              <label htmlFor="ship-first">First Name</label>
              <input id="ship-first" className="cart-input" type="text" placeholder="John" />
            </div>
            <div className="cart-input-group">
              <label htmlFor="ship-last">Last Name</label>
              <input id="ship-last" className="cart-input" type="text" placeholder="Doe" />
            </div>
            <div className="cart-input-group full-width">
              <label htmlFor="ship-address">Address</label>
              <input id="ship-address" className="cart-input" type="text" placeholder="123 Main Street" />
            </div>
            <div className="cart-input-group">
              <label htmlFor="ship-city">City</label>
              <input id="ship-city" className="cart-input" type="text" placeholder="Springfield" />
            </div>
            <div className="cart-input-group">
              <label htmlFor="ship-state">State</label>
              <select id="ship-state" className="cart-select" defaultValue="">
                <option value="" disabled>Select…</option>
                <option>AL</option><option>AK</option><option>AZ</option><option>AR</option>
                <option>CA</option><option>CO</option><option>CT</option><option>DE</option>
                <option>FL</option><option>GA</option><option>HI</option><option>ID</option>
                <option>IL</option><option>IN</option><option>IA</option><option>KS</option>
                <option>KY</option><option>LA</option><option>ME</option><option>MD</option>
                <option>MA</option><option>MI</option><option>MN</option><option>MS</option>
                <option>MO</option><option>MT</option><option>NE</option><option>NV</option>
                <option>NH</option><option>NJ</option><option>NM</option><option>NY</option>
                <option>NC</option><option>ND</option><option>OH</option><option>OK</option>
                <option>OR</option><option>PA</option><option>RI</option><option>SC</option>
                <option>SD</option><option>TN</option><option>TX</option><option>UT</option>
                <option>VT</option><option>VA</option><option>WA</option><option>WV</option>
                <option>WI</option><option>WY</option>
              </select>
            </div>
            <div className="cart-input-group">
              <label htmlFor="ship-zip">ZIP Code</label>
              <input id="ship-zip" className="cart-input" type="text" placeholder="62704" />
            </div>
          </div>

          <label className="cart-save-address">
            <input type="checkbox" /> Save this address for future orders
          </label>
        </div>
      )}
    </div>
  );
}
