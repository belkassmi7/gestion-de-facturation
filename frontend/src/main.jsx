import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";

import { ClientsProvider } from "./context/ClientsContext";
import { FacturesProvider } from "./context/FacturesContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ClientsProvider>
    <FacturesProvider>
    <RouterProvider router={router} />
    </FacturesProvider>
  </ClientsProvider>
);