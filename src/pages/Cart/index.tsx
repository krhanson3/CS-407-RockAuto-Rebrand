import { Link } from "react-router-dom";
import "../../styles/global.css";
import "../../styles/cartPage.css";
import { useCart } from "../../data/contexts/CartContext";
import Breadcrumb from "../../components/breadcrumb";

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

const CartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const toPriceNumber = (price: string): number => {
  const cleaned = price.replace(/[^0-9.]/g, "");
  const value = parseFloat(cleaned);
  return isNaN(value) ? 0 : value;
};

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const subtotal = cart.reduce((sum, i) => sum + toPriceNumber(i.price) * i.quantity, 0);
  const shipping = cart.length > 0 ? 8.99 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

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
        <div className="cart-layout">
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
                          {item.image && productImages[item.image] ? (
                            <img
                              className="cart-product-thumb-img"
                              src={productImages[item.image]}
                              alt={item.name}
                            />
                          ) : (
                            <div className="cart-product-thumb">
                              <CartIcon />
                            </div>
                          )}
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

              <Link to="/checkout" className="cart-checkout-btn" id="checkout-btn">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
