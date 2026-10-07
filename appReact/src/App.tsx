import './App.css'
import FichaTripulante from "./components/FichaTripulante"


function App() { 
  return(
  <main>
    <h1>Tripulacion nave</h1>
    <section className="cards">
      <FichaTripulante nombre = "mario" rol = "dsfsdfs" especie = "humano"></FichaTripulante>
      <FichaTripulante nombre = "nacho" rol = "sdfsdfsdf" especie = "humano"></FichaTripulante>
      <FichaTripulante nombre = "aranda" rol = "sdfdsfsd" especie="infrahumano"></FichaTripulante>
      <FichaTripulante nombre = "panchito" rol = "panchito" especie="repartidor"></FichaTripulante>
    </section>

  </main>
  )
}

export default App