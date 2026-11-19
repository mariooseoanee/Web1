import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { obtenerMensajes, borrarMensaje } from "../services/mensajesApi";

export default function MuroMensajes() {
    const queryClient = useQueryClient();

    const {
        data: mensajes,
        isPending,
        isError,
        error,
        isFetching,
    } = useQuery({
        queryKey: ["mensajes"],
        queryFn: obtenerMensajes,
    });

    const mutacionBorrar = useMutation({
        mutationFn: borrarMensaje,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["mensajes"] });
        },
    });

    if (isPending) {
        return (
            <section className="panel">
                <p className="estado-texto">Cargando mensajes del Ágora...</p>
            </section>
        );
    }

    if (isError) {
        return (
            <section className="panel">
                <div role="alert" className="alerta-error">
                    ⚠️ Error al cargar el muro: {error.message}
                </div>
            </section>
        );
    }

    return (
        <section className="panel">
            <div className="panel-header">
                <h2>Muro de mensajes ({mensajes.length})</h2>
                {isFetching && <span className="badge-fetching">Actualizando...</span>}
            </div>

            {mutacionBorrar.isError && (
                <div role="alert" className="alerta-error" style={{ marginBottom: "1rem" }}>
                    ⚠️ {mutacionBorrar.error.message}
                </div>
            )}

            <div className="lista-tarjetas">
                {mensajes.map((msg) => {
                    const borrandoEste =
                        mutacionBorrar.isPending && mutacionBorrar.variables === msg.id;

                    return (
                        <article key={msg.id} className="tarjeta-mensaje">
                            <div className="tarjeta-contenido">
                                <h3>{msg.title}</h3>
                                <p>{msg.body}</p>
                            </div>
                            <button
                                type="button"
                                className="btn-borrar"
                                aria-label={`Borrar mensaje ${msg.title}`}
                                disabled={borrandoEste}
                                onClick={() => mutacionBorrar.mutate(msg.id)}
                            >
                                {borrandoEste ? "Borrando..." : "🗑️"}
                            </button>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}