import styles from "./Navbar.module.css";

function Navbar() {
    
  return (
    
    <div className={styles.navbar}>
      <h3>Dashboard</h3>

      <div>
        <span>👤 Admin</span>
      </div>
    </div>
  );
}

export default Navbar;