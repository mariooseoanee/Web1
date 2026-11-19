import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    esquemaNuevoMensaje,
    type NuevoMensaje,
} from "../esquemas/mensajeEsquema";
import { publicarMensaje } from "../services/mensajesApi";

export default function FormularioMensaje() {
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<NuevoMensaje>({
        resolver: zodResolver(esquemaNuevoMensaje),
        defaultValues: { title: "", body: "" },
    });

    const mutacionPublicar = useMutation({
        mutationFn: publicarMensaje,
        onSuccess: () => {
            reset(); // Solo limpiamos cuando el servidor confirma éxito
            queryClient.invalidateQueries({ queryKey: ["mensajes"] }); // Dispara el refetch del muro
        },
    });

    function onSubmit(datos: NuevoMensaje) {
        mutacionPublicar.mutate(datos);
    }

    return (
        <section className="panel">
            <div className="panel-header">
                <h2>Nuevo mensaje en el Ágora</h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="formulario-agora">
                <div className="campo-grupo">
                    <label htmlFor="titulo-mensaje">Título *</label>
                    <input
                        id="titulo-mensaje"
                        type="text"
                        placeholder="Ej. Dudas sobre TanStack Query v5"
                        aria-invalid={!!errors.title}
                        aria-describedby={errors.title ? "error-titulo" : undefined}
                        {...register("title")}
                    />
                    {errors.title && (
                        <p id="error-titulo" role="alert" className="error-campo">
                            {errors.title.message}
                        </p>
                    )}
                </div>

                <div className="campo-grupo">
                    <label htmlFor="cuerpo-mensaje">Mensaje *</label>
                    <textarea
                        id="cuerpo-mensaje"
                        rows={3}
                        placeholder="Escribe tu mensaje (mínimo 10 caracteres)..."
                        aria-invalid={!!errors.body}
                        aria-describedby={errors.body ? "error-cuerpo" : undefined}
                        {...register("body")}
                    />
                    {errors.body && (
                        <p id="error-cuerpo" role="alert" className="error-campo">
                            {errors.body.message}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    className="btn-primario"
                    disabled={mutacionPublicar.isPending}
                >
                    {mutacionPublicar.isPending ? "Publicando..." : "Publicar mensaje"}
                </button>

                {mutacionPublicar.isError && (
                    <p role="alert" className="alerta-error">
                        ⚠️ {mutacionPublicar.error.message}
                    </p>
                )}

                {mutacionPublicar.isSuccess && (
                    <p role="status" className="alerta-exito">
                        ✅ Mensaje publicado (JSONPlaceholder simuló el alta e invalidamos el muro, para la recarga).
                    </p>
                )}
            </form>
        </section>
    );
}