import { useState } from "react";
import "./App.css";
import ListadoProductos from "./components/ListadoProductos";
import DetalleProducto from "./components/DetalleProducto";
import BuscadorProductos from "./components/BuscadorProductos";

export default function App() {
  const [productoId, setProductoId] = useState<number | null>(null);

  return (
    <main className="app-container">
      <header className="app-header">
        <h1>TiendaLab · Explorador de Productos</h1>
      </header>

      <BuscadorProductos onSeleccionar={setProductoId} />

      <div className="grid-explorador">
        <ListadoProductos
          titulo="Catálogo Principal"
          productoSeleccionadoId={productoId}
          onSeleccionar={setProductoId}
        />
        <ListadoProductos
          titulo="Catálogo Duplicado (Dedupe)"
          productoSeleccionadoId={productoId}
          onSeleccionar={setProductoId}
        />
        <DetalleProducto id={productoId} />
      </div>
    </main>
  );
}