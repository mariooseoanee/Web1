import Cabecera from "./components/Cabecera";
import "./App.css";
import FormularioInscripcion from "./components/FormularioInscripcion";
import ListaEquipos from "./components/ListaEquipos";

export default function App() {
  return (
    <div className="app-layout">
      <Cabecera />
      <div className="tablero-operaciones">
        <FormularioInscripcion />
        <ListaEquipos />
      </div>
    </div>
  );
}
