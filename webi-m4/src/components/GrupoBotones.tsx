import type { UseFormRegisterReturn, FieldError } from "react-hook-form";

export type ErrorCampo = FieldError | { message?: string };

interface OpcionBotones {
    valor: string;
    etiqueta: string;
    descripcion?: string;
}

interface GrupoBotonesProps {
    leyenda: string;
    nombre: string;
    registro: UseFormRegisterReturn;
    opciones: OpcionBotones[];
    error?: ErrorCampo;
    ayuda?: string;
}


export default function GrupoBotones({ leyenda, nombre, registro, opciones, error, ayuda, }: GrupoBotonesProps) {
    const errorId = `${nombre}-grupo-error`;
    const ayudaId = `${nombre}-grupo-ayuda`;

    return (
        <fieldset
            className={`grupo-fieldset ${error ? "grupo-con-error" : ""}`}
            aria-describedby={[error ? errorId : null, ayuda ? ayudaId : null].filter(Boolean).join(" ") || undefined}
        >
            <legend className="grupo-legend">{leyenda}</legend>

            {ayuda && !error && (
                <p id={ayudaId} className="grupo-ayuda">
                    {ayuda}
                </p>
            )}

            <div className="grupo-radio-opciones">
                {opciones.map((opcion) => {
                    const radioId = `${nombre}-${opcion.valor}`; // id unico para cada radio button
                    return (
                        <label key={opcion.valor} htmlFor={radioId} className="opcion-radio-label">
                            <input
                                id={radioId}
                                type="radio"
                                value={opcion.valor}
                                className="opcion-radio-input"
                                aria-invalid={Boolean(error)}
                                {...registro}
                            />
                            <div className="opcion-radio-contenido">
                                <span className="opcion-radio-titulo">{opcion.etiqueta}</span>
                                {opcion.descripcion && (
                                    <span className="opcion-radio-descripcion">
                                        {opcion.descripcion}
                                    </span>
                                )}
                            </div>
                        </label>
                    );
                })}
            </div>

            {error && (
                <span id={errorId} role="alert" className="error-mensaje">
                    {error.message}
                </span>
            )}
        </fieldset>
    );
}