interface EstadoErrorProps {
    mensaje: string;
    esErrorBonusZod?: boolean;
}

export default function EstadoError({ mensaje, esErrorBonusZod }: EstadoErrorProps) {
    // Detectamos el bonus tanto si viene por prop como si el mensaje trae el prefijo [BONUS_ZOD]
    const esBonus = esErrorBonusZod || mensaje.startsWith("[BONUS_ZOD]");
    const textoLimpio = mensaje.replace("[BONUS_ZOD]", "").trim();
    const listaErrores = esBonus ? textoLimpio.split(" | ") : [];

    return (
        <div
            role="alert"
            className={`alerta-banner ${esBonus ? "alerta-bonus-interceptada" : "alerta-error"}`}
        >
            <span className="icono-alerta" aria-hidden="true">
                {esBonus ? "🛡" : "⚠"}
            </span>
            <div className="alerta-cuerpo">
                <strong>
                    {esBonus
                        ? "BONUS REALIZADO: Zod safeParse atrapó un dato corrupto del servidor"
                        : "Error al cargar los equipos:"}
                </strong>

                {esBonus ? (
                    <>
                        <p className="error-descripcion">
                            Se interceptaron los siguientes campos inválidos en la respuesta de la API antes de renderizar:
                        </p>
                        <ul className="lista-errores-zod">
                            {listaErrores.map((err, index) => {
                                const [campo, ...resto] = err.split(": ");
                                return (
                                    <li key={index}>
                                        <code className="badge-campo-error">{campo}</code>{" "}
                                        <span>{resto.join(": ")}</span>
                                    </li>
                                );
                            })}
                        </ul>
                        <p className="nota-didactica-bonus">
                            La función <code>queryFn</code> validó el JSON remoto con{" "}
                            <code>safeParse</code> antes de entregarlo a React. Como la API devolvió tipos
                            erróneos, Zod lanzó una advertencia controlada evitando que la app fallara.
                        </p>
                    </>
                ) : (
                    <p className="error-descripcion">{textoLimpio}</p>
                )}
            </div>
        </div>
    );
}
