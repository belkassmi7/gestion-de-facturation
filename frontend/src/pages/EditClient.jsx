import { useNavigate, useParams } from "react-router-dom";
import { useClients } from "../context/ClientsContext";
import styles from "./EditClient.module.css";

export default function EditClient() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { clients, updateClient } = useClients();
  const client = clients.find((c) => c.id == id); // 👈 == بدل ===

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    await updateClient({
      id: Number(id), // 👈 مهم بزاف
      nom: formData.get("nom"),
      prenom: formData.get("prenom"),
      email: formData.get("email"),
      phone: formData.get("phone"),
    });

    navigate("/clients");
  };

  if (!client) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Edit Client</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input name="nom" defaultValue={client.nom || ""} />
        <input name="prenom" defaultValue={client.prenom || ""} />
        <input name="email" defaultValue={client.email || ""} />
        <input name="phone" defaultValue={client.phone || ""} />

        <button type="submit" className={styles.btn}>
          Update
        </button>
        <button type="button" onClick={() => navigate("/clients")}>
          Cancel
        </button>
      </form>
    </div>
  );
}
