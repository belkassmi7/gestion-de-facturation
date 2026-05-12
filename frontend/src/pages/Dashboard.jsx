import styles from "./Dashboard.module.css";
import { useEffect, useState } from "react";



export default function Dashboard() {
  const [loading, setLoading] = useState(true);
    const [clients, setClients] = useState([]);
    const [factures, setFactures] = useState([]);

  const API = "http://127.0.0.1:8000/api/clients";
  const API_FACTURES = "http://127.0.0.1:8000/api/factures";

 useEffect(() => {
  const loadData = async () => {
    try {
      const resClients = await fetch(API);
      const dataClients = await resClients.json();

      const resFactures = await fetch(API_FACTURES);
      const dataFactures = await resFactures.json();

      setClients(dataClients);
      setFactures(dataFactures);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  loadData();
}, []);

const lastFactures = [...factures]
  .sort((a, b) => new Date(b.date) - new Date(a.date)) // 🔥 newest first
  .slice(0, 5); // غير 5

  return (
    <div className={styles.dashboard}>
      
      <h1 className={styles.title}>Dashboard</h1>

      {/* Cards */}
      <div className={styles.cards}>

        <div className={styles.card}>
          <h3>Total Clients</h3>
          <p>{loading ? "Loading..." : clients.length}</p>
        </div>

        <div className={styles.card}>
          <h3>Total Factures</h3>
          <p>{loading ? "Loading..." : factures.length}</p>
        </div>

        <div className={styles.card}>
          <h3>Paiements</h3>
          <p>25,000 DH</p>
        </div>

        <div className={styles.card}>
          <h3>Factures impayées</h3>
          <p>15</p>
        </div>

      </div>

      {/* Section tableau (future) */}
      <div className={styles.tableSection}>
        <h2>Dernières factures</h2>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Client</th>
              <th>Montant</th>
              <th>Status</th>
            </tr>
          </thead>

         <tbody>
  {lastFactures.map((f) => {
    const ttc =
      f.montantHT + (f.montantHT * f.tva) / 100;

    const isPaid = (f.totalPaye || 0) >= ttc;

    return (
      <tr key={f.id}>
        <td>{f.client?.nom}</td>
        <td>{ttc} DH</td>
        <td className={isPaid ? styles.paid : styles.unpaid}>
          {isPaid ? "Payée" : "Non payée"}
        </td>
      </tr>
    );
  })}
</tbody>
        </table>
      </div>

    </div>
  );
}