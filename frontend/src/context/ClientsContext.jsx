/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const ClientsContext = createContext();

export function ClientsProvider({ children }) {
  const { apiRequest, isAuthenticated } = useAuth();
  const [clients, setClients] = useState([]);

  async function fetchClients() {
    if (!isAuthenticated) {
      setClients([]);
      return;
    }

    try {
      const data = await apiRequest("/clients");
      setClients(data);
    } catch (error) {
      console.error("Fetch clients failed:", error);
    }
  }

  useEffect(() => {
    async function loadClients() {
      if (!isAuthenticated) {
        setClients([]);
        return;
      }

      try {
        const data = await apiRequest("/clients");
        setClients(data);
      } catch (error) {
        console.error("Fetch clients failed:", error);
      }
    }

    loadClients();
  }, [apiRequest, isAuthenticated]);

  // ➕ ADD
  const addClient = async (client) => {
    await apiRequest("/clients", {
      method: "POST",
      body: JSON.stringify(client),
    });

    await fetchClients(); // refresh
  };

  // ✏️ UPDATE
  const updateClient = async (updatedClient) => {
    if (!updatedClient.id) {
      console.error("❌ ID missing in updateClient", updatedClient);
      return;
    }

    await apiRequest(`/clients/${updatedClient.id}`, {
      method: "PUT",
      body: JSON.stringify(updatedClient),
    });

    await fetchClients();
  };

  // 🗑 DELETE
  const deleteClient = async (id) => {
    await apiRequest(`/clients/${id}`, {
      method: "DELETE",
    });

    await fetchClients();
  };

  return (
    <ClientsContext.Provider
      value={{ clients, addClient, updateClient, deleteClient }}
    >
      {children}
    </ClientsContext.Provider>
  );
}

export function useClients() {
  return useContext(ClientsContext);
}
