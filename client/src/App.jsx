import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import VendorDashboard from "./pages/VendorDashboard";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import VendorOrders from "./pages/VendorOrders";
import AdminDashboard from "./pages/AdminDashboard";

function App() {

  const role = localStorage.getItem("role")?.toLowerCase().trim();

  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/vendor"
          element={
            role === "vendor"
              ? <VendorDashboard />
              : <Navigate to="/" />
          }
        />

        <Route
          path="/vendor-orders"
          element={
            role === "vendor"
              ? <VendorOrders />
              : <Navigate to="/" />
          }
        />

        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />

        <Route
          path="/admin"
          element={
            role === "admin"
              ? <AdminDashboard />
              : <Navigate to="/" />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;