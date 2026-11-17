import { type DatosInscripcion, type EquipoServidor } from "../esquemas/esquema";
import type { FiltrosEquipos } from "../types/equipo";


// URL en .env
const API_URL = import.meta.env.VITE_API_URL;

// no solo hago la peticion a la API que es simulada y siempre responde bien, sino que tambien guardo los datos en cache
const STORAGE_KEY = "db_equipos";


function leerEquiposCache(): EquipoServidor[] {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? (JSON.parse(raw) as EquipoServidor[]) : [];
    } catch {
        return [];
    }
}

function guardarEquiposCache(lista: EquipoServidor[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
}

// inscribir a un equipo (POST)
export async function inscribirEquipo(datos: DatosInscripcion): Promise<EquipoServidor> {
    const listaActual: EquipoServidor[] = leerEquiposCache();

    const existeNombre = listaActual.some(
        (e) => e.nombreEquipo.toLowerCase() === datos.nombreEquipo.toLowerCase()
    );
    if (existeNombre) {
        throw new Error(
            `Ya existe un equipo inscrito con el nombre "${datos.nombreEquipo}".`
        );
    }

    const payloadEnvio = {
        nombreEquipo: datos.nombreEquipo.trim(),
        emailCapitan: datos.emailCapitan.trim().toLowerCase(),
        telefonoCapitan: datos.telefonoCapitan.trim(),
        deporte: datos.deporte,
        categoria: datos.categoria,
        numeroJugadores: Number(datos.numeroJugadores),
        fechaInscripcion: new Date().toISOString()
    };


    const respuesta = await fetch(`${API_URL}/posts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Accept: "application/json",
        },
        body: JSON.stringify(payloadEnvio),
    });

    if (!respuesta.ok) {
        throw new Error(
            `Error HTTP ${respuesta.status}: No se pudo procesar la inscripción en el servidor`
        );
    }

    await respuesta.json();

    const nuevoEquipo: EquipoServidor = {
        ...payloadEnvio,
        id: `eq-${crypto.randomUUID().slice(0, 8)}`,
    };

    const nuevaLista = [nuevoEquipo, ...listaActual];
    guardarEquiposCache(nuevaLista);

    return nuevoEquipo;
}


// pedir el listado de equipos (GET)
export async function obtenerEquipos(filtros?: FiltrosEquipos): Promise<EquipoServidor[]> {
    const respuesta = await fetch(`${API_URL}/posts?_limit=4`, {
        headers: {
            Accept: "application/json",
        },
    });

    if (!respuesta.ok) {
        throw new Error(
            `Error HTTP ${respuesta.status} (${respuesta.statusText}): Fallo al consultar el servidor de la liga`
        );
    }

    // Consumimos la respuesta JSON del servidor
    await respuesta.json();

    let listaValida = leerEquiposCache();

    // Filtrado reactivo en cliente
    if (filtros) {
        const { busqueda, deporte } = filtros;
        if (busqueda && busqueda.trim() !== "") {
            const termino = busqueda.toLowerCase().trim();
            listaValida = listaValida.filter(
                (eq) =>
                    eq.nombreEquipo.toLowerCase().includes(termino) ||
                    eq.emailCapitan.toLowerCase().includes(termino)
            );
        }
        if (deporte && deporte !== "todos") {
            listaValida = listaValida.filter((eq) => eq.deporte === deporte);
        }
    }

    return listaValida;
}


// cancelar inscripción (DELETE)
export async function cancelarInscripcion(id: string): Promise<{ id: string }> {

    const respuesta = await fetch(`${API_URL}/posts/${id.replace("eq-", "")}`, {
        method: "DELETE",
    });

    if (!respuesta.ok) {
        throw new Error(
            `Error HTTP ${respuesta.status}: Fallo al cancelar la inscripción en el servidor`
        );
    }

    const listaActual = leerEquiposCache();
    const nuevaLista = listaActual.filter((e) => e.id !== id);
    guardarEquiposCache(nuevaLista);

    return { id };
}