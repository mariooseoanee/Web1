export interface Pelicula {
    id: number;
    titulo: string;
    genero: string;
    año: number;
    nota: number;
    portada: string; // Usaremos emojis como portadas simples
}

export const PELICULAS: Pelicula[] = [
    { id: 1, titulo: "Inception", genero: "Sci-Fi", año: 2010, nota: 8.8, portada: "🌌" },
    { id: 2, titulo: "The Dark Knight", genero: "Acción", año: 2008, nota: 9.0, portada: "🦇" },
    { id: 3, titulo: "Interstellar", genero: "Sci-Fi", año: 2014, nota: 8.6, portada: "🚀" },
    { id: 4, titulo: "Parasite", genero: "Drama", año: 2019, nota: 8.5, portada: "🏠" },
    { id: 5, titulo: "Avengers: Endgame", genero: "Acción", año: 2019, nota: 8.4, portada: "🦸‍♂️" },
    { id: 6, titulo: "Spirited Away", genero: "Animación", año: 2001, nota: 8.6, portada: "🐉" },
    { id: 7, titulo: "The Matrix", genero: "Sci-Fi", año: 1999, nota: 8.7, portada: "💊" },
    { id: 8, titulo: "Gladiator", genero: "Acción", año: 2000, nota: 8.5, portada: "⚔️" },
];