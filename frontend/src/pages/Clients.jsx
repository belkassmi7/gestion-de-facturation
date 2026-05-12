import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useClients } from "../context/ClientsContext";
import styles from "./Clients.module.css";

export default function Clients() {
  const navigate = useNavigate();
  const { clients, deleteClient } = useClients();
  const [search, setSearch] = useState("");

  const filteredClients = clients.filter((c) =>
    `${c.nom} ${c.prenom}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.page}>

      <div className={styles.header}>
        <h1>Clients</h1>

        <button
          className={styles.addBtn}
          onClick={() => navigate("/add-client")}
        >
          + Add Client
        </button>
      </div>

      <input
        type="text"
        placeholder="Search client..."
        className={styles.search}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredClients.map((client) => (
            <tr key={client.id}>
              <td>{client.id}</td>
              <td>{client.nom}</td>
              <td>{client.prenom}</td>
              <td>{client.email}</td>
              <td>{client.phone}</td>

              <td className={styles.actions}>

                <button
                  className={styles.edit}
                  onClick={() => navigate(`/edit-client/${client.id}`)}
                >
                  Edit
                </button>

                <button
                  className={styles.delete}
                  onClick={() => deleteClient(client.id)}
                >
                  Delete
                </button>

              </td>
            </tr>
          ))}

          {filteredClients.length === 0 && (
            <tr>
              <td colSpan="6" className={styles.noData}>
                Aucun client trouvé
              </td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  );
}