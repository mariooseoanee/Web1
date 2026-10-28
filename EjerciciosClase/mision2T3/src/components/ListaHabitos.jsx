import TarjetaHabito from './TarjetaHabito';

export default function ListaHabitos({ habitos, onToggleHecho, onEliminar }) {
  const habitosPendientes = habitos.filter((h) => !h.hechoHoy);
  const habitosCompletados = habitos.filter((h) => h.hechoHoy);

  if (habitos.length === 0) {
    return (
      <div className="lista-vacia">
        <span className="icono-vacio">🌱</span>
        <h3>Aún no has forjado ningún hábito</h3>
        <p>Añade tu primer hábito en el formulario superior para comenzar tu racha.</p>
      </div>
    );
  }

  return (
    <div className="kanban-tablero">
      <section className="kanban-columna columna-pendientes">
        <header className="kanban-header">
          <div className="kanban-titulo">
            <span className="dot dot-pendiente"></span>
            <h3>Pendientes de hoy</h3>
          </div>
          <span className="kanban-contador">{habitosPendientes.length}</span>
        </header>

        <div className="kanban-items">
          {habitosPendientes.length === 0 ? (
            <div className="columna-vacia">
              <span>🎉</span>
              <p>¡Increíble! Has completado todas tus tareas de hoy.</p>
            </div>
          ) : (
            habitosPendientes.map((habito) => (
              <TarjetaHabito
                key={habito.id}
                habito={habito}
                onToggleHecho={onToggleHecho}
                onEliminar={onEliminar}
              />
            ))
          )}
        </div>
      </section>

      <section className="kanban-columna columna-completados">
        <header className="kanban-header">
          <div className="kanban-titulo">
            <span className="dot dot-completado"></span>
            <h3>Completados hoy</h3>
          </div>
          <span className="kanban-contador completado">{habitosCompletados.length}</span>
        </header>

        <div className="kanban-items">
          {habitosCompletados.length === 0 ? (
            <div className="columna-vacia">
              <span>⚡</span>
              <p>Todavía no has marcado ningún hábito hoy. ¡A por ello!</p>
            </div>
          ) : (
            habitosCompletados.map((habito) => (
              <TarjetaHabito
                key={habito.id}
                habito={habito}
                onToggleHecho={onToggleHecho}
                onEliminar={onEliminar}
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
}
