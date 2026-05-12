import { NavLink } from "react-router-dom";
import styles from "../layouts/DashboardLayout.module.css";

function Sidebar() {
  const linkClass = ({ isActive }) =>
  isActive ? styles.active : styles.link;

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
    </div>
  );
}

export default Sidebar;