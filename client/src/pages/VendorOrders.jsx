import { useEffect, useState } from "react";
import API from "../api/axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function VendorOrders() {
    const navigate = useNavigate();
    const role = localStorage.getItem("role");

    useEffect(() => {
    if (role !== "vendor") {
    navigate("/");
    return;
     }

    fetchOrders();
     }, []);

  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("userId");

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders/vendor");
      setOrders(res.data);
    } catch {
      Swal.fire({
        icon: "error",
        title: "Failed to load sales",
        background: "#0f172a",
        color: "#fff"
      });
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, newStatus) => {
    try {
      await API.put(`/orders/${orderId}/status`, {
        status: newStatus
      });

      Swal.fire({
        toast: true,
        icon: "success",
        title: "Status Updated",
        timer: 1200,
        showConfirmButton: false,
        position: "top-end",
        background: "#0f172a",
        color: "#fff"
      });

      fetchOrders();
    } catch {
      Swal.fire({
        icon: "error",
        title: "Failed to update status"
      });
    }
  };

  return (
    <div style={{ padding: "60px 40px" }}>

      <h1 style={{ marginBottom: 30 }}>Sales Dashboard 💰</h1>

      {orders.length === 0 ? (
        <p style={{ opacity: .6 }}>
          No sales yet.
        </p>
      ) : (
        <div style={{ display: "grid", gap: 30 }}>
          {orders.map(order => {

            //  FIXED FILTER 
            const vendorItems = order.items.filter(
              item => item.vendor?.toString() === userId
            );

            const vendorSubtotal = vendorItems.reduce(
              (sum, item) =>
                sum + (item.price * (item.quantity || 1)),
              0
            );

            return (
              <div key={order._id} className="card" style={{ padding: 20 }}>

                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <h3>Order #{order._id.slice(-6)}</h3>

                  <span style={{
                    padding: "4px 10px",
                    borderRadius: 20,
                    fontSize: 12,
                    background:
                      order.status === "Delivered" ? "#16a34a" :
                      order.status === "Shipped" ? "#2563eb" :
                      order.status === "Cancelled" ? "#dc2626" :
                      "#f59e0b",
                    color: "white"
                  }}>
                    {order.status}
                  </span>
                </div>

                <p style={{ opacity: .6, marginTop: 5 }}>
                  {new Date(order.createdAt).toLocaleString()}
                </p>

                <p style={{ marginTop: 10 }}>
                  Customer: {order.customer?.name} ({order.customer?.email})
                </p>

                {vendorItems.length === 0 ? (
                  <p style={{ opacity: .6, marginTop: 15 }}>
                    No items from you in this order.
                  </p>
                ) : (
                  <>
                    <div style={{ marginTop: 15 }}>
                      {vendorItems.map((item, i) => (
                        <div key={i} style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: 8
                        }}>
                          <div>
                            <strong>{item.title}</strong>
                            <div style={{ opacity: .6, fontSize: 14 }}>
                              ₹ {item.price} × {item.quantity || 1}
                            </div>
                          </div>

                          <div>
                            ₹ {item.price * (item.quantity || 1)}
                          </div>
                        </div>
                      ))}
                    </div>

                    <h4 style={{ marginTop: 15 }}>
                      Your Revenue: ₹ {vendorSubtotal}
                    </h4>
                  </>
                )}

                <div style={{ marginTop: 15 }}>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(order._id, e.target.value)
                    }
                    style={{
                      padding: 6,
                      borderRadius: 6
                    }}
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}