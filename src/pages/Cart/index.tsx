import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/global.css";
import "../../styles/cartPage.css";
import { useCart } from "../../data/CartContext";
import { useSavedAddresses } from "../../data/SavedAddressContext";
import Breadcrumb from "../../components/breadcrumb";

/* ── Inline SVG icons ── */
const CartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const TruckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13" />
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const toPriceNumber = (price: string): number => {
  // Remove anything that isn't a digit or a dot
  const cleaned = price.replace(/[^0-9.]/g, "");
  const value = parseFloat(cleaned);
  return isNaN(value) ? 0 : value;
};

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const { savedAddresses } = useSavedAddresses();
  // Convert price strings → numbers
  const subtotal = cart.reduce((sum, i) => sum + toPriceNumber(i.price) * i.quantity,0);
  const shipping = cart.length > 0 ? 8.99 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const [shippingForm, setShippingForm] = useState({
  first: "",
  last: "",
  address: "",
  city: "",
  state: "",
  zip: ""
});

  
  const handleSelectSavedAddress = (id: string) => {
    const addr = savedAddresses.find(a => a.id === Number(id));
    if (!addr) return;

    setShippingForm({
      first: addr.name.split(" ")[0] || "",
      last: addr.name.split(" ")[1] || "",
      address: addr.line1,
      city: addr.city,
      state: addr.state,
      zip: addr.zip
    });
  };


  return (
    <div className="cart-page">
      <Breadcrumb />

      <h1 className="cart-title">
        Your Shopping Cart{" "}
        <span className="cart-count">
          ({cart.length} {cart.length === 1 ? "item" : "items"})
        </span>
      </h1>

      {cart.length === 0 ? (
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
                  {cart.map((item) => (
                    <tr key={item.partNumber}>
                      <td>
                        <div className="cart-product-cell">
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
                        <span className="cart-price">
                          ${toPriceNumber(item.price).toFixed(2)}
                        </span>
                      </td>

                      <td>
                        <div className="cart-qty-controls">
                          <button
                            className="cart-qty-btn"
                            onClick={() => updateQuantity(item.partNumber, -1)}
                          >
                            −
                          </button>

                          <input
                            className="cart-qty-value"
                            type="text"
                            value={item.quantity}
                            readOnly
                          />

                          <button
                            className="cart-qty-btn"
                            onClick={() => updateQuantity(item.partNumber, 1)}
                          >
                            +
                          </button>
                        </div>
                      </td>

                      <td className="cart-item-total-cell">
                        <div className="cart-item-total">
                          ${(toPriceNumber(item.price) * item.quantity).toFixed(2)}
                        </div>

                        <button
                          className="cart-remove-btn"
                          onClick={() => removeFromCart(item.partNumber)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
            </div>
          </div>
        </div>
      )}

      {cart.length > 0 && (
        <div className="cart-shipping-card">
          <h2 className="cart-shipping-title">
            <TruckIcon />
            Shipping Information
          </h2>

        {savedAddresses.length > 0 && (
          <div className="cart-input-group full-width">
            <label>Saved Address</label>
            <select
              className="cart-select"
              defaultValue=""
              onChange={(e) => handleSelectSavedAddress(e.target.value)}
            >
              <option value="" disabled>Select a saved address…</option>
              {savedAddresses.map(addr => (
                <option key={addr.id} value={addr.id}>
                  {addr.name} — {addr.line1}
                </option>
              ))}
            </select>
          </div>
        )}


          <div className="cart-shipping-grid">
  <div className="cart-input-group">
    <label htmlFor="ship-first">First Name</label>
    <input
      id="ship-first"
      className="cart-input"
      type="text"
      value={shippingForm.first}
      onChange={(e) => setShippingForm({ ...shippingForm, first: e.target.value })}
      placeholder="John"
    />
  </div>

  <div className="cart-input-group">
    <label htmlFor="ship-last">Last Name</label>
    <input
      id="ship-last"
      className="cart-input"
      type="text"
      value={shippingForm.last}
      onChange={(e) => setShippingForm({ ...shippingForm, last: e.target.value })}
      placeholder="Doe"
    />
  </div>

  <div className="cart-input-group full-width">
    <label htmlFor="ship-address">Address</label>
    <input
      id="ship-address"
      className="cart-input"
      type="text"
      value={shippingForm.address}
      onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
      placeholder="123 Main Street"
    />
  </div>

  <div className="cart-input-group">
    <label htmlFor="ship-city">City</label>
    <input
      id="ship-city"
      className="cart-input"
      type="text"
      value={shippingForm.city}
      onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
      placeholder="Springfield"
    />
  </div>

  <div className="cart-input-group">
    <label htmlFor="ship-state">State</label>
    <select
      id="ship-state"
      className="cart-select"
      value={shippingForm.state}
      onChange={(e) => setShippingForm({ ...shippingForm, state: e.target.value })}
    >
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
    <input
      id="ship-zip"
      className="cart-input"
      type="text"
      value={shippingForm.zip}
      onChange={(e) => setShippingForm({ ...shippingForm, zip: e.target.value })}
      placeholder="62704"
    />
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
