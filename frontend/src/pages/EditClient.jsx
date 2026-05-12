import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useClients } from "../context/ClientsContext";
import styles from "./EditClient.module.css"

export default function EditClient() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { clients, updateClient } = useClients();

  const [form, setForm] = useState({
    id: "",
    nom: "",
    prenom: "",
    email: "",
    phone: "",
  });

 useEffect(() => {
  const client = clients.find((c) => c.id == id); // 👈 == بدل ===

 if (client) {
  setForm({
    id: client.id,
    nom: client.nom || "",
    prenom: client.prenom || "",
    email: client.email || "",
    phone: client.phone || "",
  });
}
}, [id, clients]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  updateClient({
    ...form,
    id: Number(id), // 👈 مهم بزاف
  });

  navigate("/clients");
};

  return (
    <div>
      <h2>Edit Client</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input name="nom" value={form.nom} onChange={handleChange} />
        <input name="prenom" value={form.prenom} onChange={handleChange} />
        <input name="email" value={form.email} onChange={handleChange} />
        <input name="phone" value={form.phone} onChange={handleChange} />

        <button type="submit" className={styles.btn}>Update</button>
        <button type="button" onClick={() => navigate("/clients")}>
          Cancel
        </button>
      </form>
    </div>
  );
}