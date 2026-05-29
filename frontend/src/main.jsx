import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";

import { AuthProvider } from "./context/AuthContext";
import { ClientsProvider } from "./context/ClientsContext";
import { FacturesProvider } from "./context/FacturesContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ClientsProvider>
      <FacturesProvider>
        <RouterProvider router={router} />
      </FacturesProvider>
    </ClientsProvider>
  </AuthProvider>
);
