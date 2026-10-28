import { useState } from 'react';
import FormularioHabito from './components/FormularioHabito';
import ListaHabitos from './components/ListaHabitos';
import PanelResumen from './components/PanelResumen';
import './App.css';

export interface Habito {
  id: string;
  nombre: string;
  racha: number;
  hechoHoy: boolean;
}

const HABITOS_INICIALES: Habito[] = [
  { id: '1', nombre: 'beber 2L de agua', racha: 5, hechoHoy: false },
  { id: '2', nombre: 'levantarme antes de las 7am', racha: 3, hechoHoy: true },
  { id: '3', nombre: 'ir al gimnasio', racha: 8, hechoHoy: false },
];

export function AppHabitos() {
  const [habitos, setHabitos] = useState<Habito[]>(HABITOS_INICIALES);
  const [notificacion, setNotificacion] = useState<string>('');

  const mostrarAviso = (msg: string): void => {
    setNotificacion(msg);
    setTimeout(() => setNotificacion(''), 3000);
  };

  const handleToggleHecho = (id: string): void => {
    setHabitos((prevHabitos) =>
      prevHabitos.map((habito) => {
        if (habito.id === id) {
          const nuevoHecho = !habito.hechoHoy;
          return {
            ...habito,
            hechoHoy: nuevoHecho,
            racha: nuevoHecho ? habito.racha + 1 : Math.max(0, habito.racha - 1),
          };
        }
        return habito;
      })
    );
  };

  const handleAddHabito = (nombre: string): void => {
    const nuevo: Habito = {
      id: crypto.randomUUID(),
      nombre,
      racha: 0,
      hechoHoy: false,
    };
    setHabitos((prevHabitos) => [...prevHabitos, nuevo]);
    mostrarAviso(`Hábito "${nombre}" creado.`);
  };

  const handleEliminarHabito = (id: string): void => {
    const habitoEliminado = habitos.find((h) => h.id === id);
    setHabitos((prevHabitos) => prevHabitos.filter((h) => h.id !== id));
    if (habitoEliminado) {
      mostrarAviso(`Hábito "${habitoEliminado.nombre}" eliminado.`);
    }
  };

  const handleNuevoDia = (): void => {
    setHabitos((prevHabitos) =>
      prevHabitos.map((habito) => ({
        ...habito,
        racha: habito.hechoHoy ? habito.racha : 0,
        hechoHoy: false,
      }))
    );
    mostrarAviso('Nuevo día! Rachas actualizadas y tareas reiniciadas.');
  };

  return (
    <div className="forja-app">
      {notificacion && (
        <div className="toast-aviso" role="status">
          {notificacion}
        </div>
      )}

      <header className="forja-header">
        <div className="header-brand">
          <div>
            <h1 className="header-titulo">Forja de Hábitos</h1>
            <p className="header-subtitulo">
              Forja tu disciplina diaria
            </p>
          </div>
        </div>

        <div className="header-controles">
          <button
            type="button"
            className="btn-nuevo-dia"
            onClick={handleNuevoDia}
            title="Avanza de jornada: resetea el día y rompe la racha de los hábitos no completados"
          >
            <span>Nuevo día</span>
          </button>
        </div>
      </header>

      <section className="seccion-formulario">
        <FormularioHabito onAddHabito={handleAddHabito} />
      </section>

      <section className="seccion-resumen">
        <PanelResumen habitos={habitos} />
      </section>

      <section className="seccion-habitos">
        <div className="habitos-toolbar">
          <h2 className="toolbar-titulo">
            Tus Hábitos <span className="badge-total">{habitos.length}</span>
          </h2>
        </div>

        <ListaHabitos
          habitos={habitos}
          onToggleHecho={handleToggleHecho}
          onEliminar={handleEliminarHabito}
        />
      </section>
    </div>
  );
}

export default AppHabitos;