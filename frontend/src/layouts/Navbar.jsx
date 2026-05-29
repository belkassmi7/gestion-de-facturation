import styles from "./Navbar.module.css";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user } = useAuth();
    
  return (
    
    <div className={styles.navbar}>
      <h3>Dashboard</h3>

      <div>
        <span>{user?.name || "Admin"}</span>
      </div>
    </div>
  );
}

export default Navbar;
