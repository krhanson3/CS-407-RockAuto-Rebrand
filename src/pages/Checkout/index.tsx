import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/global.css";
import "../../styles/checkoutPage.css";
import { useCart } from "../../data/contexts/CartContext";
import { useOrders } from "../../data/contexts/OrderContext";
import { useSavedAddresses } from "../../data/contexts/SavedAddressContext";
import Breadcrumb from "../../components/breadcrumb";
import type { Order } from "../../types/types";


import tricoWiper from "../../images/parts/TRICO_wiper.jpg";
import ancoWiper from "../../images/parts/ANCO_wiper.jpg";
import boschWiper from "../../images/parts/bosch_wiper.png";
import rainxWiper from "../../images/parts/rainx_wiper.png";

const productImages: Record<string, string> = {
  tricoWiper,
  ancoWiper,
  boschWiper,
  rainxWiper,
};

const toPriceNumber = (price: string): number => {
  const cleaned = price.replace(/[^0-9.]/g, "");
  const value = parseFloat(cleaned);
  return isNaN(value) ? 0 : value;
};


export default function Checkout() {
  const { addOrder } = useOrders();
  const { cart, removeFromCart } = useCart();
  const { savedAddresses } = useSavedAddresses();
  
  const subtotal = cart.reduce((sum, i) => sum + toPriceNumber(i.price) * i.quantity, 0);
  const shipping = cart.length > 0 ? 8.99 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const [placedOrderId, setPlacedOrderId] = useState<string | null>(null);
  const [step, setStep] = useState<"shipping" | "payment" | "confirm" | "success">("shipping");

  const [shippingForm, setShippingForm] = useState({
    first: "",
    last: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const [paymentForm, setPaymentForm] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    email: "",
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
      zip: addr.zip,
    });
  };

  const handlePlaceOrder = () => {
    const orderId = `RA-${Date.now().toString().slice(-8)}`;

    const newOrder: Order = {
      id: orderId,
      date: new Date().toLocaleDateString(),
      total,
      status: "Processing",
      items: cart.map(item => ({
        name: item.name,
        quantity: item.quantity
        })
      )
    };


    addOrder(newOrder); 
    setPlacedOrderId(orderId);  

    setStep("success");

    // Clear cart after saving order
    setTimeout(() => {
      cart.forEach((item) => removeFromCart(item.partNumber));
    }, 100);
  };

  const maskedCard = paymentForm.cardNumber.replace(/\s/g, "").replace(/.(?=.{4})/g, "•");

  if (cart.length === 0 && step !== "success") {
    return (
      <div className="checkout-page">
        <Breadcrumb />
        <div className="checkout-empty">
          <h2>Nothing to check out</h2>
          <p>Your cart is empty. Add some parts first.</p>
          <Link to="/" className="checkout-back-btn">← Start Shopping</Link>
        </div>
      </div>
    );
  }

  if (step === "success") {
    return (
      <div className="checkout-page">
        <Breadcrumb />
        <div className="checkout-success">
          <div className="checkout-success-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <h1>Order Placed!</h1>
          <p className="checkout-success-sub">Your order has been confirmed and is being processed.</p>
          <p className="checkout-success-detail">A confirmation email will be sent to <strong>{paymentForm.email}</strong></p>
          <div className="checkout-success-order">
            <span>Order #</span>
            <span className="checkout-order-id">{placedOrderId}</span>
          </div>
          <Link to="/" className="checkout-back-btn">← Continue Shopping</Link>
        </div>
      </div>
    );
  }

  const stepIndex = step === "shipping" ? 0 : step === "payment" ? 1 : 2;

  return (
    <div className="checkout-page">
      <Breadcrumb />

      <h1 className="checkout-title">Checkout</h1>

      <div className="checkout-steps">
        <div className={`checkout-step ${stepIndex === 0 ? "active" : stepIndex > 0 ? "done" : ""}`}>
          <span className="checkout-step-num">1</span>
          <span>Shipping</span>
        </div>
        <div className="checkout-step-line" />
        <div className={`checkout-step ${stepIndex === 1 ? "active" : stepIndex > 1 ? "done" : ""}`}>
          <span className="checkout-step-num">2</span>
          <span>Payment</span>
        </div>
        <div className="checkout-step-line" />
        <div className={`checkout-step ${stepIndex === 2 ? "active" : ""}`}>
          <span className="checkout-step-num">3</span>
          <span>Review</span>
        </div>
      </div>

      <div className="checkout-layout">
        <div className="checkout-main">

          {step === "shipping" && (
            <div className="checkout-card">
              <h2 className="checkout-card-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="checkout-card-icon">
                  <rect x="1" y="3" width="15" height="13" />
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
                Shipping Information
              </h2>

              {savedAddresses.length > 0 && (
                <div className="checkout-input-group full-width" style={{ marginBottom: 16 }}>
                  <label>Saved Address</label>
                  <select
                    className="checkout-select"
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

              <div className="checkout-form-grid">
                <div className="checkout-input-group">
                  <label htmlFor="ship-first">First Name</label>
                  <input
                    id="ship-first"
                    className="checkout-input"
                    type="text"
                    value={shippingForm.first}
                    onChange={(e) => setShippingForm({ ...shippingForm, first: e.target.value })}
                  />
                </div>

                <div className="checkout-input-group">
                  <label htmlFor="ship-last">Last Name</label>
                  <input
                    id="ship-last"
                    className="checkout-input"
                    type="text"
                    value={shippingForm.last}
                    onChange={(e) => setShippingForm({ ...shippingForm, last: e.target.value })}
                  />
                </div>

                <div className="checkout-input-group full-width">
                  <label htmlFor="ship-address">Address</label>
                  <input
                    id="ship-address"
                    className="checkout-input"
                    type="text"
                    value={shippingForm.address}
                    onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
                  />
                </div>

                <div className="checkout-input-group">
                  <label htmlFor="ship-city">City</label>
                  <input
                    id="ship-city"
                    className="checkout-input"
                    type="text"
                    value={shippingForm.city}
                    onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                  />
                </div>

                <div className="checkout-input-group">
                  <label htmlFor="ship-state">State</label>
                  <select
                    id="ship-state"
                    className="checkout-select"
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

                <div className="checkout-input-group">
                  <label htmlFor="ship-zip">ZIP Code</label>
                  <input
                    id="ship-zip"
                    className="checkout-input"
                    type="text"
                    value={shippingForm.zip}
                    onChange={(e) => setShippingForm({ ...shippingForm, zip: e.target.value })}
                  />
                </div>
              </div>

              <button className="checkout-primary-btn" onClick={() => setStep("payment")}>
                Continue to Payment
              </button>
            </div>
          )}

          {step === "payment" && (
            <div className="checkout-card">
              <h2 className="checkout-card-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="checkout-card-icon">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                  <line x1="1" y1="10" x2="23" y2="10" />
                </svg>
                Payment Details
              </h2>

              <div className="checkout-form-grid">
                <div className="checkout-input-group full-width">
                  <label htmlFor="card-email">Email Address</label>
                  <input
                    id="card-email"
                    className="checkout-input"
                    type="text"
                    value={paymentForm.email}
                    onChange={(e) => setPaymentForm({ ...paymentForm, email: e.target.value })}
                  />
                </div>

                <div className="checkout-input-group full-width">
                  <label htmlFor="card-name">Name on Card</label>
                  <input
                    id="card-name"
                    className="checkout-input"
                    type="text"
                    value={paymentForm.cardName}
                    onChange={(e) => setPaymentForm({ ...paymentForm, cardName: e.target.value })}
                  />
                </div>

                <div className="checkout-input-group full-width">
                  <label htmlFor="card-number">Card Number</label>
                  <input
                    id="card-number"
                    className="checkout-input"
                    type="text"
                    value={paymentForm.cardNumber}
                    onChange={(e) => setPaymentForm({ ...paymentForm, cardNumber: e.target.value })}
                  />
                </div>

                <div className="checkout-input-group">
                  <label htmlFor="card-expiry">Expiration</label>
                  <input
                    id="card-expiry"
                    className="checkout-input"
                    type="text"
                    value={paymentForm.expiry}
                    onChange={(e) => setPaymentForm({ ...paymentForm, expiry: e.target.value })}
                  />
                </div>

                <div className="checkout-input-group">
                  <label htmlFor="card-cvv">CVV</label>
                  <input
                    id="card-cvv"
                    className="checkout-input"
                    type="text"
                    value={paymentForm.cvv}
                    onChange={(e) => setPaymentForm({ ...paymentForm, cvv: e.target.value })}
                  />
                </div>
              </div>

              <div className="checkout-btn-row">
                <button className="checkout-secondary-btn" onClick={() => setStep("shipping")}>← Back</button>
                <button className="checkout-primary-btn" onClick={() => setStep("confirm")}>Review Order</button>
              </div>
            </div>
          )}

          {step === "confirm" && (
            <div className="checkout-card">
              <h2 className="checkout-card-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="checkout-card-icon">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
                Order Review
              </h2>

              <div className="checkout-review-section">
                <h3>Shipping Address</h3>
                <p>{shippingForm.first} {shippingForm.last}</p>
                <p>{shippingForm.address}</p>
                <p>{shippingForm.city}{shippingForm.state ? `, ${shippingForm.state}` : ""} {shippingForm.zip}</p>
              </div>

              <div className="checkout-review-section">
                <h3>Payment Method</h3>
                <p>Card ending in {maskedCard.slice(-4)}</p>
                <p>{paymentForm.cardName}</p>
              </div>

              <div className="checkout-review-section">
                <h3>Items ({cart.length})</h3>
                {cart.map((item) => (
                  <div key={item.partNumber} className="checkout-review-item">
                    {item.image && productImages[item.image] ? (
                      <img src={productImages[item.image]} alt={item.name} className="checkout-review-img" />
                    ) : (
                      <div className="checkout-review-placeholder" />
                    )}
                    <div className="checkout-review-item-info">
                      <span className="checkout-review-item-name">{item.brand} — {item.name}</span>
                      <span className="checkout-review-item-qty">Qty: {item.quantity}</span>
                    </div>
                    <span className="checkout-review-item-price">${(toPriceNumber(item.price) * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="checkout-btn-row">
                <button className="checkout-secondary-btn" onClick={() => setStep("payment")}>← Back</button>
                <button className="checkout-primary-btn" onClick={handlePlaceOrder}>Place Order</button>
              </div>
            </div>
          )}
        </div>

        <div className="checkout-sidebar">
          <div className="checkout-summary-card">
            <h2 className="checkout-summary-title">Order Summary</h2>

            <div className="checkout-items-list">
              {cart.map((item) => (
                <div key={item.partNumber} className="checkout-item-row">
                  {item.image && productImages[item.image] ? (
                    <img src={productImages[item.image]} alt={item.name} className="checkout-item-thumb" />
                  ) : (
                    <div className="checkout-item-placeholder" />
                  )}
                  <div className="checkout-item-details">
                    <span className="checkout-item-name">{item.name}</span>
                    <span className="checkout-item-qty">× {item.quantity}</span>
                  </div>
                  <span className="checkout-item-price">${(toPriceNumber(item.price) * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="checkout-summary-divider" />

            <div className="checkout-summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="checkout-summary-row">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="checkout-summary-row">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>

            <div className="checkout-summary-divider" />

            <div className="checkout-summary-total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
