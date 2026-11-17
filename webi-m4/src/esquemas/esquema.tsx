import { z } from "zod";

export const DEPORTES = ["futbol_sala", "baloncesto", "voleibol", "padel"] as const;
export type Deporte = (typeof DEPORTES)[number];


export const MINIMO_JUGADORES: Record<Deporte, number> = {
    futbol_sala: 5,
    baloncesto: 5,
    voleibol: 6,
    padel: 2,
};

export const ETIQUETAS_DEPORTES: Record<Deporte, string> = {
    futbol_sala: "Fútbol Sala",
    baloncesto: "Baloncesto",
    voleibol: "Voleibol",
    padel: "Pádel",
};

export const CATEGORIAS = ["mixta", "femenina", "masculina"] as const;
export type Categoria = (typeof CATEGORIAS)[number];

export const ETIQUETAS_CATEGORIAS: Record<Categoria, string> = {
    mixta: "Mixta",
    femenina: "Femenina",
    masculina: "Masculina",
};

// zod como esquema que valida los datos en cada campo del form
export const esquemaInscripcionEquipo = z
    .object({
        nombreEquipo: z
            .string()
            .min(3, "El nombre del equipo debe tener al menos 3 caracteres")
            .max(40, "El nombre no puede superar los 40 caracteres"),
        emailCapitan: z
            .email("Introduce un correo electrónico universitario válido")
            .endsWith("@live.u-tad.com", "Debes usar tu correo electrónico de la U-TAD"),
        telefonoCapitan: z
            .string()
            .min(9, "El teléfono de contacto debe tener al menos 9 dígitos")
            .regex(/^\+?[0-9\s-]{9,15}$/, "Formato no válido (ej. 612 345 678 o +34 600000000)"),
        deporte: z.enum(DEPORTES, {
            message: "Selecciona el deporte en el que inscribir a tu equipo",
        }),
        categoria: z.enum(CATEGORIAS, {
            message: "Selecciona una categoría de competición",
        }),
        numeroJugadores: z.coerce
            .number({
                message: "Introduce el número de jugadores integrantes",
            })
            .int("El número de jugadores debe ser un número entero")
            .min(2, "Se necesitan al menos 2 personas para cualquier disciplina"),
        aceptaReglamento: z.literal(true, {
            message: "Debes aceptar el reglamento deportivo y las normas de la liga",
        }),
    })
    .refine(
        (datos) => datos.numeroJugadores >= MINIMO_JUGADORES[datos.deporte],
        {
            path: ["numeroJugadores"],
            error: "Numero de jugadores insuficiente para el deporte seleccionado."
        }
    );

export type EntradaInscripcion = z.input<typeof esquemaInscripcionEquipo>;
export type DatosInscripcion = z.output<typeof esquemaInscripcionEquipo>;



// se define una nuevo esquema para validar los equipos que vienen del servidor (sin datos corruptos)
export const esquemaEquipoServidor = z.object({
    id: z.string().min(1, "El identificador del equipo es obligatorio"),
    nombreEquipo: z.string().min(1, "Nombre de equipo inválido"),
    emailCapitan: z.email("El email del capitán en el servidor no es válido"),
    telefonoCapitan: z.string().min(1, "Teléfono obligatorio"),
    deporte: z.enum(DEPORTES, {
        message: "Deporte no reconocido en la competición",
    }),
    categoria: z.enum(CATEGORIAS),
    numeroJugadores: z.number().int().min(2),
    fechaInscripcion: z.string().min(1),
});

export type EquipoServidor = z.infer<typeof esquemaEquipoServidor>;
export const esquemaListaEquiposServidor = z.array(esquemaEquipoServidor);
