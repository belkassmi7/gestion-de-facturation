import { useState } from "react";
import { useClients } from "../context/ClientsContext";
import { useNavigate } from "react-router-dom";
import styles from "./ClientForm.module.css";

export default function AddClient() {
  const { addClient } = useClients();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addClient(form);
    navigate("/clients");
  };

  return (
    <div>
      <h2>Add Client</h2>

      <form onSubmit={handleSubmit} className={styles.form}  >
        <input name="nom" placeholder="Nom" onChange={handleChange} />
        <input name="prenom" placeholder="Prénom" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="phone" placeholder="Téléphone" onChange={handleChange} />

        <button type="submit">Save</button>
      </form>
    </div>
  );
}