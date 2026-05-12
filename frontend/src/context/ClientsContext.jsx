import { createContext, useContext, useEffect, useState } from "react";

const ClientsContext = createContext();

export function ClientsProvider({ children }) {
  const [clients, setClients] = useState([]);

  const API = "http://127.0.0.1:8000/api/clients";

  // 📥 GET (بدل useState static)
  const fetchClients = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setClients(data);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  // ➕ ADD
  const addClient = async (client) => {
    await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(client),
    });

    fetchClients(); // refresh
  };

  // ✏️ UPDATE
  const updateClient = async (updatedClient) => {
  if (!updatedClient.id) {
    console.error("❌ ID missing in updateClient", updatedClient);
    return;
  }

  const res = await fetch(`${API}/${updatedClient.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(updatedClient),
  });

  if (!res.ok) {
    console.error("❌ Update failed:", await res.text());
  }

  fetchClients();
};

  // 🗑 DELETE
  const deleteClient = async (id) => {
    await fetch(`${API}/${id}`, {
      method: "DELETE",
    });

    fetchClients();
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