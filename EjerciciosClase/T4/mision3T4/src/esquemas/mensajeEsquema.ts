import { z } from "zod";

// Esquema de cada mensaje devuelto por JSONPlaceholder (/posts)
// (Checkpoint 2: cambia id: z.number() -> z.string() para comprobar cómo isError captura el fallo)
export const esquemaMensaje = z.object({
    id: z.number(),
    userId: z.number(),
    title: z.string(),
    body: z.string(),
});

// Esquema del muro completo (Checkpoint 1 y criterio de validación)
export const esquemaMuro = z.array(esquemaMensaje);

// Esquema del formulario de alta (Checkpoint 3: título >= 5, cuerpo >= 10)
export const esquemaNuevoMensaje = z.object({
    title: z.string().min(5, "El título debe tener al menos 5 caracteres"),
    body: z.string().min(10, "El cuerpo debe tener al menos 10 caracteres"),
});

export type Mensaje = z.infer<typeof esquemaMensaje>;
export type NuevoMensaje = z.infer<typeof esquemaNuevoMensaje>;