import type { UseFormRegisterReturn, FieldError } from "react-hook-form";

export type ErrorCampo = FieldError | { message?: string };

interface OpcionSelect {
    valor: string;
    etiqueta: string;
}

interface CampoSelectProps {
    label: string;
    id: string;
    registro: UseFormRegisterReturn;
    opciones: OpcionSelect[];
    placeholderOpcion?: string;
    error?: ErrorCampo;
    ayuda?: string;
}


export default function CampoSelect({
    label,
    id,
    registro,
    opciones,
    placeholderOpcion = "-- Selecciona una opción --",
    error,
    ayuda,
}: CampoSelectProps) {
    const errorId = `${id}-error`;
    const ayudaId = `${id}-ayuda`;

    // un array con los ids para describir el campo desplegable, si no hay error ni ayuda, se retorna undefined
    const idsDescriptores = [error ? errorId : null, ayuda ? ayudaId : null].filter(Boolean).join(" ");

    return (
        <div className={`campo-formulario ${error ? "campo-con-error" : ""}`}>
            <label htmlFor={id} className="campo-label">
                {label}
            </label>

            <select
                id={id}
                aria-invalid={Boolean(error)}
                aria-describedby={idsDescriptores || undefined}
                className={`campo-select ${error ? "input-invalido" : ""}`}
                {...registro}
            >
                <option value="">{placeholderOpcion}</option>
                {opciones.map((opcion) => (
                    <option key={opcion.valor} value={opcion.valor}>
                        {opcion.etiqueta}
                    </option>
                ))}
            </select>

            {ayuda && !error && (
                <p id={ayudaId} className="campo-ayuda">
                    {ayuda}
                </p>
            )}

            {error && (
                <span id={errorId} role="alert" className="error-mensaje">
                    {error.message}
                </span>
            )}
        </div>
    );
}