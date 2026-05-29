import { NavLink, useNavigate } from "react-router-dom";
import styles from "../layouts/DashboardLayout.module.css";
import { useAuth } from "../context/AuthContext";


function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const linkClass = ({ isActive }) => (isActive ? styles.active : styles.link);

  const handleLogOut = async () => {
    await logout();
    navigate("/login", { replace: true });
  };
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>R.H.C</div>
      <div className={styles.border}></div>

      <nav className={styles.nav}>
        <NavLink to="/dashboard" className={linkClass}>
          Dashboard
        </NavLink>

        <NavLink to="/clients" className={linkClass}>
          Clients
        </NavLink>

        <NavLink to="/factures" className={linkClass}>
          Factures
        </NavLink>

        <NavLink to="/paiements" className={linkClass}>
          Paiements
        </NavLink>
      </nav>
      <button onClick={handleLogOut} className={styles.logout}>logout</button>
    </div>
  );
}

export default Sidebar;
