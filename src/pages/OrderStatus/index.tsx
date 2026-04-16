import "../../styles/orderStatusPage.css";
import { useOrders } from "../../data/contexts/OrderContext";

export default function OrderStatusPage() {
  const { orders } = useOrders();

  return (
    <div className="order-status-page">
      <main className="order-status-main">
        <h1 className="order-status-title">
          <span className="title-line">Order Status & History</span>
        </h1>

        {orders.length === 0 && (
          <p className="no-orders">No orders found.</p>
        )}

        <div className="orders-grid">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <h3 className="order-id">{order.id}</h3>
                <span className={`status-badge ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </div>

              <p className="order-date">{order.date}</p>

              <div className="order-items">
                {order.items.map((item, index) => (
                  <p key={index} className="order-item">
                    {item.quantity}× {item.name}
                  </p>
                ))}
              </div>

              <p className="order-total">Total: ${order.total.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
