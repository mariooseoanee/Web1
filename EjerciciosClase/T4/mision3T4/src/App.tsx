import "./App.css";
import FormularioMensaje from "./components/FormularioMensaje";
import MuroMensajes from "./components/MuroMensajes";

export default function App() {
  return (
    <main className="app-container">
      <header className="app-header">
        <h1>Ágora · Muro de Mensajes</h1>
      </header>

      <div className="layout-agora">
        <FormularioMensaje />
        <MuroMensajes />
      </div>
    </main>
  );
}