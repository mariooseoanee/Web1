import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import {
    esquemaInscripcionEquipo, DEPORTES, ETIQUETAS_DEPORTES, CATEGORIAS, ETIQUETAS_CATEGORIAS, MINIMO_JUGADORES, type DatosInscripcion, type Deporte
} from "../esquemas/esquema";

import { inscribirEquipo } from "../services/equipoService";

import CampoTexto from "./CampoTexto";
import CampoSelect from "./CampoSelect";
import GrupoRadio from "./GrupoBotones";
import CheckboxLegal from "./CheckboxLegal";

export default function FormularioInscripcion() {
    const queryClient = useQueryClient();
    const [mensajeExito, setMensajeExito] = useState<string | null>(null);

    // React Hook Form con ZodResolver, gestiona el estado del formulario y la validación
    const { register, reset, handleSubmit, control, formState: { errors } } = useForm({
        resolver: zodResolver(esquemaInscripcionEquipo),
        defaultValues: {
            nombreEquipo: "",
            emailCapitan: "",
            telefonoCapitan: "",
            deporte: undefined,
            categoria: "mixta",
            numeroJugadores: "",
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

    // al enviar el formulario, se muta (mod de datos)
    const onSubmit = (datos: DatosInscripcion) => {
        setMensajeExito(null);
        mutacion.mutate(datos);
    };


    // mutation para crear el registro e invalidar la query
    const mutacion = useMutation({
        mutationFn: inscribirEquipo,
        onSuccess: (equipoCreado) => {
            reset();
            setMensajeExito(
                `¡Equipo "${equipoCreado.nombreEquipo}" inscrito con éxito en la modalidad de ${ETIQUETAS_DEPORTES[equipoCreado.deporte]}!`
            );
            queryClient.invalidateQueries({ queryKey: ["equipos"] });
        },
    });


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
                onSubmit={handleSubmit(onSubmit)}
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
                                ? `* Requisito para este deporte: mínimo ${minimoActual} personas.`
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

                <CheckboxLegal
                    id="aceptaReglamento"
                    registro={register("aceptaReglamento")}
                    texto="He leído y acepto el reglamento de competición deportiva universitaria y confirmo que todos los integrantes son alumnos matriculados."
                    enlaceTexto="[Normativa Liga 2026]"
                    error={errors.aceptaReglamento}
                />

                <div className="acciones-formulario">
                    <button
                        disabled={mutacion.isPending}

                        type="submit"
                        className="boton-primario"
                    >
                        Inscribir Equipo en la Liga
                    </button>
                </div>

                {mensajeExito && (
                    <div role="status" className="alerta-banner alerta-exito">
                        <span className="icono-alerta" aria-hidden="true">✓</span>
                        <div className="alerta-cuerpo">
                            <strong>Inscripción confirmada:</strong>
                            <p>{mensajeExito}</p>
                        </div>
                        <button
                            type="button"
                            className="boton-cerrar-alerta"
                            onClick={() => setMensajeExito(null)}
                            aria-label="Cerrar confirmación"
                        >
                            ×
                        </button>
                    </div>
                )}

                {/* Feedback accesible de error: role="alert" */}
                {mutacion.isError && (
                    <div role="alert" className="alerta-banner alerta-error">
                        <span className="icono-alerta" aria-hidden="true">⚠</span>
                        <div className="alerta-cuerpo">
                            <strong>No se pudo completar la inscripción:</strong>
                            <p>{mutacion.error.message}</p>
                        </div>
                    </div>
                )}

            </form>
        </section>
    );
}