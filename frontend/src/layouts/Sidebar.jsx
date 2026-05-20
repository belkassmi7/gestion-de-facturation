import { NavLink, useNavigate } from "react-router-dom";
import styles from "../layouts/DashboardLayout.module.css";


function Sidebar() {
  const navigate = useNavigate();
  const linkClass = ({ isActive }) => (isActive ? styles.active : styles.link);

  const handleLogOut = () => {
    navigate("/login");
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
