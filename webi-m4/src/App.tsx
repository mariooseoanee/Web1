import Cabecera from "./components/Cabecera";
import "./App.css";
import FormularioInscripcion from "./components/FormularioInscripcion";
import ListaEquipos from "./components/ListaEquipos";
import Corrupcion from "./components/Corrupcion";

export default function App() {
  return (
    <div className="app-layout">
      <Cabecera />
      <Corrupcion />
      <div className="tablero-operaciones">
        <FormularioInscripcion />
        <ListaEquipos />
      </div>
    </div>
  );
}
