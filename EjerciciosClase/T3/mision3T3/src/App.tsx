import { TemaProvider } from './context/TemaContext';
import Cabecera from './components/Cabecera';
import Catalogo from './components/Catalogo';
import './App.css';

export default function App() {
  return (
    <TemaProvider>
      <div className="app-nebula">
        <Cabecera />
        <main className="main-content">
          <Catalogo />
        </main>
      </div>
    </TemaProvider>
  );
}