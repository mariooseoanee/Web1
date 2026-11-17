import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { obtenerEquipos, cancelarInscripcion, } from "../services/equipoService";
import type { Deporte } from "../types/equipo";

import FiltrosEquipos from "./FiltrosEquipos";
import TarjetaEquipo from "./TarjetaEquipo";
import EstadoCarga from "./EstadoCarga";
import EstadoError from "./EstadoError";

export default function ListaEquipos() {
    const queryClient = useQueryClient();
    const [busqueda, setBusqueda] = useState("");
    const [filtroDeporte, setFiltroDeporte] = useState<Deporte | "todos">("todos");
    const [eliminandoId, setEliminandoId] = useState<string | null>(null);

    // useQuery para obtener la lista de equipos inscritos
    const { data: equipos,
        isPending,
        isError,
        error,
        isFetching } = useQuery({
            queryKey: [
                "equipos",
                {
                    busqueda: busqueda.trim(),
                    deporte: filtroDeporte,
                },
            ],
            queryFn: () =>
                obtenerEquipos({ // devuelve una promesa que se resuelve o se rechaza, si se rechaza, el error se pone en true
                    busqueda,
                    deporte: filtroDeporte,
                }),
        });

    // mutation para cancelar la inscripción 
    // (todas las operaciones que modifican se hacen con mutations)
    const mutacionCancelar = useMutation({
        mutationFn: (id: string) => cancelarInscripcion(id),
        onMutate: (id) => {
            setEliminandoId(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["equipos"] });
        },
        onSettled: () => {
            setEliminandoId(null);
        },
    });

    const handleCancelar = (id: string) => {
        mutacionCancelar.mutate(id);
    };

    const esErrorBonusZod = Boolean(
        error?.message.includes("[BONUS_ZOD]")
    );

    return (
        <section className="seccion-lista" aria-labelledby="titulo-directorio">
            <div className="lista-cabecera">
                <div>
                    <div className="insignia-modulo">ESTADO DEL SERVIDOR (useQuery)</div>
                    <h2 id="titulo-directorio" className="titulo-seccion">
                        Equipos Inscritos en la Liga
                    </h2>
                    <p className="descripcion-seccion">
                        Listado sincronizado mediante TanStack Query v5 con caché automática y
                        refresco tras cada inscripción.
                    </p>
                </div>

                {isFetching && !isPending && (
                    <div className="indicador-refetch" aria-live="polite">
                        <span className="spinner-mini" aria-hidden="true" />
                        <span>Actualizando datos...</span>
                    </div>
                )}
            </div>

            <FiltrosEquipos
                busqueda={busqueda}
                onBusquedaChange={setBusqueda}
                filtroDeporte={filtroDeporte}
                onFiltroDeporteChange={setFiltroDeporte}
                onLimpiarFiltros={() => {
                    setBusqueda("");
                    setFiltroDeporte("todos");
                }}
            />

            {/* estado de carga */}
            {isPending && <EstadoCarga />}

            {/* estado de error */}
            {isError && (
                <EstadoError
                    mensaje={error.message}
                    esErrorBonusZod={esErrorBonusZod}
                />
            )}

            {/* solo si se encuentran equipos se muestra */}
            {equipos && !isPending && (
                <>
                    <div className="resumen-resultados">
                        <span>
                            Total inscritos: <strong>{equipos.length}</strong> equipo
                            {equipos.length === 1 ? "" : "s"}
                        </span>
                    </div>

                    {equipos.length === 0 ?

                        ( // si no se encuentran equipos se muestra el estado vacio 
                            <div className="estado-vacio" role="status">
                                <span className="icono-vacio" aria-hidden="true">⚽</span>
                                <h3>No hay equipos que mostrar</h3>
                                <p>
                                    {busqueda || filtroDeporte !== "todos"
                                        ? "No se han encontrado equipos con el filtro seleccionado."
                                        : "Todavía no se ha inscrito ningún equipo en el campeonato."}
                                </p>
                            </div>
                        ) : (
                            <div className="grid-tarjetas" role="list">
                                {equipos.map((equipo) => (
                                    <TarjetaEquipo
                                        key={equipo.id}
                                        equipo={equipo}
                                        estaCancelando={
                                            eliminandoId === equipo.id || mutacionCancelar.isPending
                                        }
                                        onCancelar={handleCancelar}
                                    />
                                ))}
                            </div>
                        )}
                </>
            )}
        </section>
    );
}