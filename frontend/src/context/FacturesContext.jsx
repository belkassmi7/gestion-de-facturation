import { createContext, useContext, useEffect, useState } from "react";

const FacturesContext = createContext();

export function FacturesProvider({ children }) {
  const [factures, setFactures] = useState([]);
  const [clients, setClients] = useState([]);

  const API_FACTURES = "http://127.0.0.1:8000/api/factures";
  const API_CLIENTS = "http://127.0.0.1:8000/api/clients";

  // 📥 fetch factures
  const fetchFactures = async () => {
  const res = await fetch(API_FACTURES);
  const data = await res.json();
  setFactures(data);
};

  // 📥 fetch clients (باش نستعملوهم ف select)
  const fetchClients = async () => {
    const res = await fetch(API_CLIENTS);
    const data = await res.json();
    setClients(data);
  };

  useEffect(() => {
    fetchFactures();
    fetchClients();
  }, []);

  // ➕ ADD facture
  const addFacture = async (data) => {
    await fetch(API_FACTURES, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: Number(data.client_id),
        montantHT: Number(data.montantHT),
        tva: Number(data.tva),
        date: data.date,
        echeance: data.echeance,
        totalPaye: 0,
      }),
    });

    fetchFactures();
  };

  // 🧠 TTC
  const getTTC = (f) =>
    f.montantHT + (f.montantHT * f.tva) / 100;

  // 🧠 STATUS
  const getStatus = (f) => {
  const ttc = getTTC(f);

  if ((f.totalPaye || 0) >= ttc) return "Payée";

  const today = new Date();
  const ech = new Date(f.echeance);

  if (today > ech) return "En retard";

  return "En attente";
};

 const getStats = () => {
  const totalTTC = factures.reduce((acc, f) => {
    return acc + (f.montantHT + (f.montantHT * f.tva) / 100);
  }, 0);

  const totalPaye = factures.reduce((acc, f) => {
    return acc + (f.totalPaye || 0);
  }, 0);

  return {
    totalFactures: factures.length,        // ✅ عدد الفواتير
    totalTTC,                              // ✅ مجموع TTC
    totalPaye,                             // ✅ مجموع المؤدى
    resteAPayer: totalTTC - totalPaye,     // ✅ الباقي
    totalPaiements: 0                      // ⚠️ مؤقت
  };
};
  return (
    <FacturesContext.Provider
  value={{
    factures,
    clients,
    addFacture,
    getStatus,
    getTTC,
    getStats, // 👈 مهم
  }}
>
      {children}
    </FacturesContext.Provider>
  );
}

export function useFactures() {
  return useContext(FacturesContext);
}