/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const FacturesContext = createContext();

export function FacturesProvider({ children }) {
  const { apiRequest, isAuthenticated } = useAuth();
  const [factures, setFactures] = useState([]);
  const [clients, setClients] = useState([]);

  async function fetchFactures() {
    if (!isAuthenticated) {
      setFactures([]);
      return;
    }

    try {
      const data = await apiRequest("/factures");
      setFactures(data);
    } catch (error) {
      console.error("Fetch factures failed:", error);
    }
  }

  useEffect(() => {
    async function loadData() {
      if (!isAuthenticated) {
        setFactures([]);
        setClients([]);
        return;
      }

      try {
        const facturesData = await apiRequest("/factures");
        const clientsData = await apiRequest("/clients");

        setFactures(facturesData);
        setClients(clientsData);
      } catch (error) {
        console.error("Fetch factures data failed:", error);
      }
    }

    loadData();
  }, [apiRequest, isAuthenticated]);

  // ➕ ADD facture
  const addFacture = async (data) => {
    await apiRequest("/factures", {
      method: "POST",
      body: JSON.stringify({
        client_id: Number(data.client_id),
        montantHT: Number(data.montantHT),
        tva: Number(data.tva),
        date: data.date,
        echeance: data.echeance,
        totalPaye: 0,
      }),
    });

    await fetchFactures();
  };

  // 🧠 TTC
  const getTTC = (f) => f.montantHT + (f.montantHT * f.tva) / 100;

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
        fetchFactures,
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
