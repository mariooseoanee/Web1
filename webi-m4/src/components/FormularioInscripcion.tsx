import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    esquemaInscripcionEquipo, DEPORTES, ETIQUETAS_DEPORTES, CATEGORIAS, ETIQUETAS_CATEGORIAS, MINIMO_JUGADORES,
    type EntradaInscripcion, type DatosInscripcion, type Deporte
} from "../esquemas/esquema";

import CampoTexto from "./CampoTexto";
import CampoSelect from "./CampoSelect";
import GrupoRadio from "./GrupoBotones";

export default function FormularioInscripcion() {

    // React Hook Form con ZodResolver (Única fuente de verdad de la validación)
    const { register, control, formState: { errors } }
        = useForm<EntradaInscripcion, unknown, DatosInscripcion>({

            resolver: zodResolver(esquemaInscripcionEquipo),
            defaultValues: {
                nombreEquipo: "",
                emailCapitan: "",
                telefonoCapitan: "",
                deporte: undefined,
                categoria: "mixta",
                numeroJugadores: "" as unknown as number,
                aceptaReglamento: undefined,
            },
        });


    // useWatch para consultar el deporte elegido y mostrar la ayuda interactiva de mínimos
    const deporteElegido = useWatch({ control, name: "deporte" });
    const esDeporteValido = Boolean(deporteElegido && deporteElegido in MINIMO_JUGADORES);
    const minimoActual = esDeporteValido ? MINIMO_JUGADORES[deporteElegido as Deporte] : null;

    const opcionesDeportes = DEPORTES.map((dep) => ({
        valor: dep,
        etiqueta: `${ETIQUETAS_DEPORTES[dep]} (mín. ${MINIMO_JUGADORES[dep]} pers.)`,
    }));

    const opcionesCategorias = CATEGORIAS.map((cat) => ({
        valor: cat,
        etiqueta: ETIQUETAS_CATEGORIAS[cat],
    }));




    return (
        <section className="seccion-formulario" aria-labelledby="titulo-inscripcion">
            <div className="formulario-cabecera">
                <div className="insignia-modulo">LIGA UNIVERSITARIA 2026</div>
                <h2 id="titulo-inscripcion" className="titulo-seccion">
                    Inscripción de Equipo
                </h2>
                <p className="descripcion-seccion">
                    Inscribe a tu equipo en las competiciones universitarias. Cada deporte exige un
                    mínimo de participantes validado con Zod antes del envío.
                </p>
            </div>


            <form
                noValidate
                className="formulario-grid"
            >
                <CampoTexto
                    label="Nombre del equipo *"
                    id="nombreEquipo"
                    placeholder="Ej. Los Ositos de U-tad"
                    registro={register("nombreEquipo")}
                    error={errors.nombreEquipo}
                    ayuda="Nombre oficial con el que competirá el equipo"
                />

                <div className="grid-dos-columnas">
                    <CampoTexto
                        label="Email del capitán *"
                        id="emailCapitan"
                        type="email"
                        placeholder="capitan@live.u-tad.com"
                        autoComplete="email"
                        registro={register("emailCapitan")}
                        error={errors.emailCapitan}
                    />

                    <CampoTexto
                        label="Teléfono de contacto *"
                        id="telefonoCapitan"
                        type="tel"
                        placeholder="612 345 678"
                        autoComplete="tel"
                        registro={register("telefonoCapitan")}
                        error={errors.telefonoCapitan}
                    />
                </div>

                <div className="grid-dos-columnas">
                    <CampoSelect
                        label="Deporte a inscribir *"
                        id="deporte"
                        registro={register("deporte")}
                        opciones={opcionesDeportes}
                        placeholderOpcion="-- Selecciona un deporte --"
                        error={errors.deporte}
                    />

                    <CampoTexto
                        label={`Número de jugadores inscritos ${minimoActual ? `(Mín. ${minimoActual}) *` : "*"}`}
                        id="numeroJugadores"
                        type="number"
                        min={2}
                        max={25}
                        registro={register("numeroJugadores")}
                        error={errors.numeroJugadores}
                        ayuda={
                            minimoActual
                                ? `ℹ Requisito para este deporte: mínimo ${minimoActual} personas.`
                                : "Indica el número total de integrantes."
                        }
                    />
                </div>

                <GrupoRadio
                    leyenda="Categoría de competición *"
                    nombre="categoria"
                    registro={register("categoria")}
                    opciones={opcionesCategorias}
                    error={errors.categoria}
                />

                <div className="acciones-formulario">
                    <button
                        type="submit"
                        className="boton-primario"
                    >
                        Inscribir Equipo en la Liga
                    </button>
                </div>
            </form>
        </section>
    );
}