import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFactures } from "../context/FacturesContext";
import styles from "./Factures.module.css";

function Factures() {
  const navigate = useNavigate();
  const { factures, getStatus, getTTC } = useFactures();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredFactures = factures.filter((f) => {
    const status = getStatus(f);

    const matchSearch = f.client?.nom
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchFilter = filter === "all" || status === filter;

    return matchSearch && matchFilter;
  });

  return (
    <div className={styles.container}>
      <h2>Liste des Factures</h2>

      <div className={styles.topBar}>
        <input
          type="text"
          placeholder="Rechercher client..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">Status</option>
          <option value="Payée">Payée</option>
          <option value="En retard">En retard</option>
          <option value="En attente">En attente</option>
        </select>

        <button
          className={styles.addBtn}
          onClick={() => navigate("/add-facture")}
        >
          + Ajouter Facture
        </button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Client</th>
            <th>HT</th>
            <th>TVA</th>
            <th>TTC</th>
            <th>Date</th>
            <th>Échéance</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {filteredFactures.map((f) => {
            const montantTTC = getTTC(f);
            const montantTVA = montantTTC - f.montantHT;
            const status = getStatus(f);

            return (
              <tr key={f.id}>
                <td>{f.client?.nom}</td>
                <td>{f.montantHT} DH</td>
                <td>{montantTVA} DH</td>
                <td>{montantTTC} DH</td>
                <td>{f.date}</td>
                <td>{f.echeance}</td>

                <td
                  className={
                    status === "En retard"
                      ? styles.retard
                      : status === "Payée"
                      ? styles.payee
                      : styles.attente
                  }
                >
                  {status}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Factures;