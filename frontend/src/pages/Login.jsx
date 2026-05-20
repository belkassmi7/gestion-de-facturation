import { useState } from "react";
import styles from "./login.module.css";
// import { useAuth } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

const fakeUser = {
  email: "mohammed@gmail.com",
  password: "12345678",
};

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email.trim() || !form.password.trim()) {
      setError("remplier tout les champes");
      return;
    }

    if (form.email !== fakeUser.email || form.password !== fakeUser.password) {
      setError("email or password incorrect");
      return;
    }

    navigate('/dashboard')

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
        <button className={styles.btn} type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
