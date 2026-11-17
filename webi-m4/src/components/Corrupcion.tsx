import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { estaCorrupcionActivada, setCorrupcionActivada } from "../services/equipoService";

export default function Corrupcion() {
    const queryClient = useQueryClient();
    const [corruptoActivo, setCorruptoActivo] = useState(estaCorrupcionActivada());

    const toggleSimulacion = () => {
        const nuevoEstado = !corruptoActivo;
        setCorruptoActivo(nuevoEstado);
        setCorrupcionActivada(nuevoEstado);

        // invalidar para que useQuery vuelva a pedir los datos y pase por safeParse
        queryClient.invalidateQueries({ queryKey: ["equipos"] });
    };


    return (
        <aside className="panel-bonus-zod" aria-label="Demostración del Bonus de Validación Zod">
            <div className="panel-bonus-contenido">
                <div className="panel-bonus-texto">
                    <h3 className="titulo-bonus">
                        Insertar datos corruptos en la lista de equipos
                    </h3>
                    <p className="descripcion-bonus">
                        En la queryFn validamos que el servidor devuelva datos correctos con
                        safeParse. Pulsa el botón para inyectar un dato corrupto y ver cómo Zod
                        lo atrapa antes de renderizar.
                    </p>
                </div>

                <div className="panel-bonus-acciones">
                    <button
                        type="button"
                        className={`boton-toggle-bonus ${corruptoActivo ? "bonus-activo" : "bonus-inactivo"
                            }`}
                        onClick={toggleSimulacion}
                        aria-pressed={corruptoActivo}
                    >
                        {corruptoActivo ? (
                            <>
                                <span>Desactivar dato corrupto</span>
                            </>
                        ) : (
                            <>
                                <span>Activar dato corrupto</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </aside>
    );
}