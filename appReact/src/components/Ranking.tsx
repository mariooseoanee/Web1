export default function Ranking({ puntuaciones }) {
  return (
    <ol className="ranking">
      {puntuaciones.map((p) => (
        <li key={p.id}>
          {p.jugador} — {p.puntos} puntos {p.puntos > 8000 && "🏅"}
        </li>
      ))}
    </ol>
  );
}