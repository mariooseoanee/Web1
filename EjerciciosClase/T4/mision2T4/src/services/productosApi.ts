import type { Producto, RespuestaProductos } from "../types/producto";

const BASE_URL = "https://dummyjson.com/products";

export async function obtenerProductos(): Promise<Producto[]> {
    const res = await fetch(`${BASE_URL}?limit=12`);
    if (!res.ok) {
        throw new Error(`Error HTTP ${res.status}: No se pudo cargar el catálogo`);
    }
    const data: RespuestaProductos = await res.json();
    return data.products;
}

export async function obtenerProductoPorId(id: number): Promise<Producto> {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) {
        throw new Error(`Error HTTP ${res.status}: Producto #${id} no encontrado`);
    }
    return res.json() as Promise<Producto>;
}

export async function buscarProductos(texto: string): Promise<Producto[]> {
    const res = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(texto)}`);
    if (!res.ok) {
        throw new Error(`Error HTTP ${res.status} al buscar "${texto}"`);
    }
    const data: RespuestaProductos = await res.json();
    return data.products;
}