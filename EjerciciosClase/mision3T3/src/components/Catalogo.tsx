import { useState } from 'react';
import TarjetaPelicula from './TarjetaPelicula';
import { PELICULAS } from '../data/peliculas';
import { useTema } from '../context/TemaContext';

export default function Catalogo() {
    const { tema } = useTema();

    // estados base (cambian por interaccion del usuario)
    const [busqueda, setBusqueda] = useState("");
    const [genero, setGenero] = useState("todos");

    // para ordenar y favoritas
    const [orden, setOrden] = useState("defecto");
    const [favoritasIds, setFavoritasIds] = useState<number[]>([]);
    const [soloFavoritas, setSoloFavoritas] = useState(false);


    let peliculasVisibles = PELICULAS.filter((p) => {
        const coincideTitulo = p.titulo.toLowerCase().includes(busqueda.toLowerCase());
        const coincideGenero = genero === "todos" || p.genero === genero;
        const coincideFavorita = soloFavoritas ? favoritasIds.includes(p.id) : true;

        return coincideTitulo && coincideGenero && coincideFavorita;
    });

    if (orden === "nota") {
        peliculasVisibles = [...peliculasVisibles].sort((a, b) => b.nota - a.nota);
    } else if (orden === "año") {
        peliculasVisibles = [...peliculasVisibles].sort((a, b) => b.año - a.año);
    }

    const toggleFavorita = (id: number) => {
        setFavoritasIds(prev =>
            prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
        );
    };

    return (
        <div className={`catalogo-contenedor ${tema}`}>

            {/* filtros */}
            <div className="filtros">
                <input
                    type="text"
                    placeholder="Buscar película..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                />

                <select value={genero} onChange={(e) => setGenero(e.target.value)}>
                    <option value="todos">Todos los géneros</option>
                    <option value="Sci-Fi">Sci-Fi</option>
                    <option value="Acción">Acción</option>
                    <option value="Drama">Drama</option>
                    <option value="Animación">Animación</option>
                </select>

                <select value={orden} onChange={(e) => setOrden(e.target.value)}>
                    <option value="defecto">Orden por defecto</option>
                    <option value="nota">Mejor nota</option>
                    <option value="año">Más recientes</option>
                </select>

                <label className="checkbox-favs">
                    <input
                        type="checkbox"
                        checked={soloFavoritas}
                        onChange={(e) => setSoloFavoritas(e.target.checked)}
                    />
                    ⭐ Solo mis favoritas
                </label>
            </div>

            {/* solo renderiza si hay alguna peli con esos filtros*/}
            {peliculasVisibles.length === 0 ? (
                <div className="sin-resultados">
                    <p>Lo sentimos, no hay películas que coincidan con esos filtros 😢</p>
                </div>
            ) : (
                <div className="rejilla-peliculas">
                    {peliculasVisibles.map(p => (
                        <TarjetaPelicula
                            key={p.id}
                            pelicula={p}
                            esFavorita={favoritasIds.includes(p.id)}
                            onToggleFavorita={() => toggleFavorita(p.id)}
                        />
                    ))}
                </div>
            )}

        </div>
    );
}