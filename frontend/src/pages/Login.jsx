import { useState } from "react";
import styles from "./login.module.css";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { isAuthenticated, loading, login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!loading && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email.trim() || !form.password.trim()) {
      setError("remplier tout les champes");
      return;
    }

    try {
      setSubmitting(true);
      await login(form);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message || "email or password incorrect");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <p className={styles.logo}>R.H.C</p>
      <form action="" className={styles.form} onSubmit={handleSubmit}>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.input_box}>
          <label htmlFor="">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Enter email"
            name="email"
            required
          />
        </div>
        <div className={styles.input_box}>
          <label htmlFor="">Password</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="Enter password"
            name="password"
            required
          />
        </div>
        <button className={styles.btn} type="submit" disabled={submitting}>
          {submitting ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
