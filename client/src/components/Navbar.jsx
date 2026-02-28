import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
  const totalItems = cartItems.reduce((sum, i) => sum + (i.quantity || 1), 0);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const primaryBtn = {
    padding: "8px 16px",
    borderRadius: 8,
    textDecoration: "none",
    fontWeight: 500,
    background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
    color: "white",
    border: "none",
    cursor: "pointer",
    transition: "0.2s"
  };

  const ghostBtn = {
    padding: "8px 16px",
    borderRadius: 8,
    textDecoration: "none",
    fontWeight: 500,
    background: "rgba(255,255,255,0.05)",
    color: "white",
    border: "1px solid rgba(255,255,255,0.1)",
    cursor: "pointer",
    transition: "0.2s"
  };

  const getActiveStyle = (path, baseStyle) => ({
    ...baseStyle,
    background:
      location.pathname === path
        ? "linear-gradient(135deg,#6366f1,#8b5cf6)"
        : baseStyle.background
  });

  const closeMobile = () => setOpen(false);

  return (
    <div
      style={{
        padding: "16px 40px",
        borderBottom: "1px solid rgba(255,255,255,.1)"
      }}
    >
      {/* Top Row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <Link
          to="/"
          onClick={closeMobile}
          style={{
            fontWeight: 700,
            fontSize: 22,
            textDecoration: "none",
            color: "white"
          }}
        >
          Marketplace 
        </Link>

        {/* Desktop Menu */}
        <div
          className="desktopMenu"
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center"
          }}
        >
          {role === "vendor" && token && (
            <Link
              to="/vendor"
              style={getActiveStyle("/vendor", ghostBtn)}
            >
              Dashboard
            </Link>
          )}

          {role === "vendor" && token && (
            <Link
              to="/vendor-orders"
              style={getActiveStyle("/vendor-orders", ghostBtn)}
            >
              Sales 
            </Link>
          )}

          {role === "customer" && token && (
            <Link
              to="/orders"
              style={getActiveStyle("/orders", ghostBtn)}
            >
              My Orders 📦
            </Link>
          )}

          {role==="admin" && token && (
          <Link to="/admin" style={ghostBtn}>Admin</Link>
          )}

          {token && (
            <Link
              to="/cart"
              style={getActiveStyle("/cart", ghostBtn)}
            >
              Cart 🛒
              {totalItems > 0 && (
                <span
                  style={{
                    marginLeft: 8,
                    background: "#ef4444",
                    borderRadius: "50%",
                    padding: "4px 8px",
                    fontSize: 12
                  }}
                >
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {!token && (
            <Link
              to="/login"
              style={getActiveStyle("/login", ghostBtn)}
            >
              Login
            </Link>
          )}

          {!token && (
            <Link to="/register" style={primaryBtn}>
              Register
            </Link>
          )}

          {token && (
            <button style={primaryBtn} onClick={logout}>
              Logout
            </button>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div
          className="mobileMenuIcon"
          onClick={() => setOpen(!open)}
          style={{
            fontSize: 26,
            cursor: "pointer",
            display: "none",
            color: "white"
          }}
        >
          ☰
        </div>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div
          style={{
            marginTop: 20,
            display: "flex",
            flexDirection: "column",
            gap: 12
          }}
        >
          {role === "vendor" && token && (
            <Link to="/vendor" onClick={closeMobile} style={ghostBtn}>
              Dashboard
            </Link>
          )}

          {role === "vendor" && token && (
            <Link
              to="/vendor-orders"
              onClick={closeMobile}
              style={ghostBtn}
            >
              Sales 💰
            </Link>
          )}

          {role === "customer" && token && (
            <Link
              to="/orders"
              onClick={closeMobile}
              style={ghostBtn}
            >
              My Orders 📦
            </Link>
          )}

          {token && (
            <Link to="/cart" onClick={closeMobile} style={ghostBtn}>
              Cart 🛒
            </Link>
          )}

          {!token && (
            <Link to="/login" onClick={closeMobile} style={ghostBtn}>
              Login
            </Link>
          )}

          {!token && (
            <Link to="/register" onClick={closeMobile} style={primaryBtn}>
              Register
            </Link>
          )}

          {token && (
            <button style={primaryBtn} onClick={logout}>
              Logout
            </button>
          )}
        </div>
      )}

      {/* Responsive CSS */}
      <style>
        {`
          @media (max-width: 768px) {
            .desktopMenu {
              display: none !important;
            }
            .mobileMenuIcon {
              display: block !important;
            }
          }

          button:hover, a:hover {
            transform: scale(1.05);
          }
        `}
      </style>
    </div>
  );
}