import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import { motion } from "framer-motion";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await API.post("/auth/register", {
        name,
        email,
        password,
        role
      });

      /* ⭐ Save role */
      localStorage.setItem("role", role);

      /* ⭐ If backend returns token → auto login */
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/");
      } else {
        alert("Account created 🚀");
        navigate("/login");
      }

    } catch (err) {
      console.log(err);
      alert("Registration failed ❌");
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
        style={{ width: 380 }}
      >
        <h2>Create account </h2>

        <input
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        {/* ROLE SELECT */}
        <select value={role} onChange={e => setRole(e.target.value)}>
          <option value="customer">Customer</option>
          <option value="vendor">Vendor</option>
          <option value="admin">Admin</option>
        </select>

        <button style={{ marginTop: 20 }} onClick={handleRegister}>
          Create Account
        </button>

        <p style={{ marginTop: 20 }}>
  Already have an account?
</p>

<Link
  to="/login"
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
  Login
</Link>
      </motion.div>
    </div>
  );
}