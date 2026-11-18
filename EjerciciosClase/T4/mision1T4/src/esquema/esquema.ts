import { z } from 'zod';

export const esquemaInscripcion = z.object({
    nombre: z.string().min(1, "El nombre es obligatorio"),
    email: z.email("Debes introducir un email válido"),

    // Usamos únicamente 'message' como nos pide TypeScript
    nivel: z.enum(["principiante", "intermedia", "avanzada"], {
        message: "Debes seleccionar un nivel"
    }),

    lenguajes: z.array(z.string()).min(1, "Debes elegir al menos un lenguaje"),

    github: z.string().url("Debe ser una URL válida").optional().or(z.literal("")),

    // Limpiamos también el errorMap aquí
    aceptaNormas: z.literal(true, {
        message: "Debes aceptar las normas"
    }),

    tallaCamiseta: z.enum(["S", "M", "L", "XL"], {
        message: "Selecciona una talla"
    })
}).refine((datos) => {
    // Validación cruzada
    if (datos.nivel === "avanzada" && (!datos.github || datos.github === "")) {
        return false;
    }
    return true;
}, {
    message: "El perfil de GitHub es obligatorio para el nivel avanzado",
    path: ["github"]
});

export type DatosInscripcion = z.infer<typeof esquemaInscripcion>;