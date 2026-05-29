import { useEffect, useState } from "react";
import { useFactures } from "../context/FacturesContext";
import styles from "./Paiements.module.css";
import { useAuth } from "../context/AuthContext";

function Paiements() {
  const { factures, getStats, fetchFactures } = useFactures();
  const { apiRequest } = useAuth();

  const [paiements, setPaiements] = useState([]);

  async function fetchPaiements() {
    try {
      const data = await apiRequest("/paiements");
      setPaiements(data);
    } catch (error) {
      console.error("Fetch paiements failed:", error);
    }
  }

  useEffect(() => {
    async function loadPaiements() {
      try {
        const data = await apiRequest("/paiements");
        setPaiements(data);
      } catch (error) {
        console.error("Fetch paiements failed:", error);
      }
    }

    loadPaiements();
  }, [apiRequest]);

  const stats = getStats();

  const [form, setForm] = useState({
    factureId: "",
    montant: "",
    date: "",
    mode: "Cash",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await apiRequest("/paiements", {
      method: "POST",
      body: JSON.stringify({
        facture_id: Number(form.factureId),
        montant: Number(form.montant),
        date: form.date,
        mode: form.mode,
      }),
    });

    // 🔄 refresh paiements
    await fetchPaiements();

    setForm({
      factureId: "",
      montant: "",
      date: "",
      mode: "Cash",
    });

    // 🔥 هادي لي غادي تصلح status
    await fetchFactures();
  };

  return (
    <div className={styles.container}>
      <h2>Paiements</h2>

      {/* STATS */}
      <div className={styles.statsContainer}>
        <div className={styles.statCard}>
          <h4>Factures</h4>
          <p>{stats.totalFactures}</p>
        </div>

        <div className={styles.statCard}>
          <h4>Total payé</h4>
          <p>{stats.totalPaye} DH</p>
        </div>

        <div className={styles.statCard}>
          <h4>Reste</h4>
          <p>{stats.resteAPayer} DH</p>
        </div>

        <div className={styles.statCard}>
          <h4>Paiements</h4>
          <p>{paiements.length}</p>
        </div>
      </div>

      {/* FACTURES LIST */}
      <div className={styles.facturesList}>
        <h3>Factures disponibles</h3>

        <ul>
          {factures.map((f) => (
            <li key={f.id}>
              #{f.id} - {f.client?.nom} - {f.montantHT} DH - {f.echeance}
            </li>
          ))}
        </ul>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className={styles.form}>
        <select
          name="factureId"
          value={form.factureId}
          onChange={handleChange}
          required
        >
          <option value="">Choisir facture</option>
          {factures.map((f) => (
            <option key={f.id} value={f.id}>
              {f.client?.nom}- {f.montantHT} DH
            </option>
          ))}
        </select>

        <input
          type="number"
          name="montant"
          placeholder="Montant"
          value={form.montant}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />

        <select
          name="mode"
          value={form.mode}
          onChange={handleChange}
        >
          <option>Cash</option>
          <option>Virement</option>
        </select>

        <button type="submit">Ajouter</button>
      </form>

      {/* TABLE PAIEMENTS */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Client</th>
            <th>Facture</th>
            <th>Montant</th>
            <th>Date</th>
            <th>Mode</th>
          </tr>
        </thead>

        <tbody>
          {paiements.map((p) => (
            <tr key={p.id}>
              <td>{p.facture?.client?.nom}</td>
              <td>#{p.facture_id}</td>
              <td>{p.montant} DH</td>
              <td>{p.date}</td>
              <td>{p.mode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Paiements;
