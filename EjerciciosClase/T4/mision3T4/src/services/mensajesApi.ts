import {
    esquemaMuro,
    type Mensaje,
    type NuevoMensaje,
} from "../esquemas/mensajeEsquema";

const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

export async function obtenerMensajes(): Promise<Mensaje[]> {
    const res = await fetch(`${BASE_URL}?_limit=10`);
    if (!res.ok) {
        throw new Error(`Error HTTP ${res.status}: No se pudieron cargar los mensajes`);
    }
    const json = await res.json();
    // Si el servidor devuelve datos corruptos (o sabotaje del esquema), lanza ZodError -> isError
    return esquemaMuro.parse(json);
}

export async function publicarMensaje(datos: NuevoMensaje): Promise<Mensaje> {
    const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...datos, userId: 1 }),
    });
    if (!res.ok) {
        throw new Error(`Error HTTP ${res.status}: No se pudo publicar el mensaje`);
    }
    return res.json() as Promise<Mensaje>;
}

export async function borrarMensaje(id: number): Promise<void> {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) {
        throw new Error(`Error HTTP ${res.status}: No se pudo borrar el mensaje #${id}`);
    }
}