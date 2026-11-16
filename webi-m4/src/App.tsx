import Cabecera from "./components/Cabecera";
import "./App.css";
import FormularioInscripcion from "./components/FormularioInscripcion";

export default function App() {
  return (
    <div className="app-layout">
      <Cabecera />
      <FormularioInscripcion />
    </div>
  );
}
