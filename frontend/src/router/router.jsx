import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";

import Dashboard from "../pages/Dashboard";
import Clients from "../pages/Clients";
import Factures from "../pages/Factures";
import Paiements from "../pages/Paiements";

// 👇 زيد هادو

import EditClient from "../pages/EditClient";
import ClientForm from "../pages/ClientForm";
import AddFacture from "../pages/AddFacture";
import Login from "../pages/Login";

export const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "clients", element: <Clients /> },
      { path: "factures", element: <Factures /> },
      { path: "/add-facture", element: <AddFacture /> },
      { path: "paiements", element: <Paiements /> },

      // ✅ NEW ROUTES
      { path: "add-client", element: <ClientForm /> },
      { path: "edit-client/:id", element: <EditClient /> },
    ],
  },
]);
