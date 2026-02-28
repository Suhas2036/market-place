import { useEffect, useState } from "react";
import API from "../api/axios";
import Swal from "sweetalert2";

export default function AdminDashboard() {

  const [stats, setStats] = useState(null);

  const fetchStats = async () => {
    try {
      const res = await API.get("/admin/stats");
      setStats(res.data);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Access denied",
        background: "#0f172a",
        color: "#fff"
      });
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (!stats) {
    return <h2 style={{ padding: 40 }}>Loading...</h2>;
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Admin Dashboard 🛠</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
          gap: 20,
          marginTop: 30
        }}
      >
        <div className="card" style={{ padding: 20 }}>
          <h2>Total Users</h2>
          <h1>{stats.totalUsers}</h1>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <h2>Total Products</h2>
          <h1>{stats.totalProducts}</h1>
        </div>

        <div className="card" style={{ padding: 20 }}>
          <h2>Total Orders</h2>
          <h1>{stats.totalOrders}</h1>
        </div>
      </div>
    </div>
  );
}