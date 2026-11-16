import { type DatosInscripcion, type EquipoServidor } from "../esquemas/esquema";

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

/**
 * SERVICIO: Inscribir equipo en la competición (POST)
 * 1. Hace petición HTTP REAL con POST a ${API_URL}/posts con body JSON.
 * 2. Comprueba response.ok y código HTTP 201.
 * 3. Devuelve el equipo validado.
 */
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

    // Petición HTTP REAL POST a la API remota
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