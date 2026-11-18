import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
import './index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Mantiene los datos frescos 60s: evita peticiones duplicadas al montar
      // el listado dos veces o al volver atrás en la navegación.
      staleTime: 60_000,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);