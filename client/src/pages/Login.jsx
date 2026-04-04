import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // IMPORTANT: prevents page refresh

    if (loading) return;

    try {
      setLoading(true);

      const res = await API.post("/auth/login", { email, password });

      console.log("Login response:", res.data);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      const role =
        res.data.user?.role ||
        res.data.role ||
        "customer";

      localStorage.setItem("role", role);

      const userId =
        res.data.user?._id ||
        res.data.user?.id;

      if (userId) {
        localStorage.setItem("userId", userId);
      }

      await Swal.fire({
        icon: "success",
        title: "Login Successful 🎉",
        background: "#0f172a",
        color: "#fff",
        confirmButtonColor: "#6366f1"
      });

      window.location.href = "/";

    } catch (err) {

      console.log("Login error:", err?.response?.data || err.message);

      Swal.fire({
        icon: "error",
        title: "Login failed ❌",
        text: err?.response?.data?.msg || "Invalid credentials",
        background: "#0f172a",
        color: "#fff",
        confirmButtonColor: "#ef4444"
      });

    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ width: 360 }}
      >
        <h2 style={{ marginBottom: 10 }}>Welcome back 👋</h2>
        <p style={{ opacity: 0.6, marginBottom: 20 }}>
          Login to your marketplace
        </p>

        {/* FORM WRAPPER FIX */}
        <form onSubmit={handleLogin}>

          <input
    type="email"
     placeholder="Email"
      autoComplete="email"
      value={email}
     onChange={e => setEmail(e.target.value)}
     required
     />

      <input
      type="password"
     placeholder="Password"
      autoComplete="current-password"
      value={password}
      onChange={e => setPassword(e.target.value)}
      required
        />

          <button
            type="submit"
            style={{ marginTop: 20 }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p style={{ marginTop: 20 }}>
          New here?
        </p>

        <Link
          to="/register"
          style={{
            display: "inline-block",
            marginTop: 10,
            padding: "8px 16px",
            borderRadius: 8,
            background: "rgba(255,255,255,0.08)",
            color: "white",
            textDecoration: "none",
            fontWeight: 500
          }}
        >
          Create Account
        </Link>

      </motion.div>
    </div>
  );
}