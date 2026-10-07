import "./App.css";
import FichaTripulante from "./components/FichaTripulante";
import Esclusa from "./components/Esclusa";
import Ranking from "./components/Ranking";
import Aplausometro from "./components/Aplausometro";

const RANKING = [
  { id: "a1", jugador: "NOVA", puntos: 9800 },
  { id: "b2", jugador: "PIXEL", puntos: 8650 },
  { id: "c3", jugador: "KIRA", puntos: 7400 },
  { id: "d4", jugador: "BYTE", puntos: 5200 },
];

export default function App() {
  return (
    <main>
      <h1>Tripulación nave</h1>

      <section className="cards">
        <FichaTripulante nombre="mario" rol="dsfsdfs" especie="humano" />
        <FichaTripulante nombre="nacho" rol="sdfsdfsdf" especie="humano" />
        <FichaTripulante nombre="aranda" rol="sdfdsfsd" especie="infrahumano" />
        <FichaTripulante nombre="panchito" rol="panchito" especie="repartidor" />
      </section>

      <h2>Estado de Esclusas</h2>
      <section className="esclusas">
        <Esclusa abierta={true} avisos={2} />
        <Esclusa abierta={false} avisos={0} />
        <Esclusa abierta={true} avisos={0} />
      </section>

      <h2>Ranking de Jugadores</h2>
      <Ranking puntuaciones={RANKING} />

      <h1>Aplausometro</h1>
      <Aplausometro/>
    </main>
  );
}