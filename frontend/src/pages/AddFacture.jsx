import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFactures } from "../context/FacturesContext";

function AddFacture() {
  const navigate = useNavigate();
  const { addFacture, clients } = useFactures();

  const [form, setForm] = useState({
    client_id: "",
    montantHT: "",
    tva: 20,
    date: "",
    echeance: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addFacture(form);
    navigate("/factures");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Ajouter Facture</h2>

      <form onSubmit={handleSubmit}>
        <select name="client_id" onChange={handleChange} required>
          <option value="">Choisir client</option>
          {clients.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nom} {c.prenom}
            </option>
          ))}
        </select>

        <input
          name="montantHT"
          type="number"
          placeholder="Montant HT"
          onChange={handleChange}
          required
        />

        <input
          name="tva"
          type="number"
          value={form.tva}
          onChange={handleChange}
        />

        <input name="date" type="date" onChange={handleChange} required />
        <input name="echeance" type="date" onChange={handleChange} required />

        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}

export default AddFacture;