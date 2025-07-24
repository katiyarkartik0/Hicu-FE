import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";

import queryClient from "@/api/queryClient.ts";

import "./index.css";
import App from "./App";
import AuthProvider from "./context/AuthContext";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </AuthProvider>
  // </StrictMode>
);
