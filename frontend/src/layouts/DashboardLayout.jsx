import { Outlet } from "react-router-dom";

import styles from "./DashboardLayout.module.css";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function DashboardLayout() {
  return (
    <div className={styles.layout}>
      <Sidebar />

      <div className={styles.main}>
        <Navbar />

        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;