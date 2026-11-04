import { type Pelicula } from '../data/peliculas.ts';
import { useTema } from '../context/TemaContext';

interface Props {
    pelicula: Pelicula;
    esFavorita: boolean;
    onToggleFavorita: () => void;
}

export default function TarjetaPelicula({ pelicula, esFavorita, onToggleFavorita }: Props) {
    const { tema } = useTema();

    return (
        <div className={`tarjeta ${tema}`}>
            <div className="portada">{pelicula.portada}</div>
            <h3>{pelicula.titulo}</h3>
            <p className="genero">{pelicula.genero}</p>

            <div className="detalles">
                <span>📅 {pelicula.año}</span>
                <span>⭐ {pelicula.nota}</span>
            </div>

            <button
                className={`btn-fav ${esFavorita ? 'activa' : ''}`}
                onClick={onToggleFavorita}
            >
                {esFavorita ? '❤️ Favorita' : '🤍 Añadir'}
            </button>
        </div>
    );
}