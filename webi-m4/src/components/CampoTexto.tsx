import type { UseFormRegisterReturn, FieldError } from "react-hook-form";

export type ErrorCampo = FieldError | { message?: string };

interface CampoTextoProps {
    label: string;
    id: string;
    registro: UseFormRegisterReturn;
    type?: "text" | "email" | "tel" | "password" | "number" | "url";
    placeholder?: string;
    autoComplete?: string;
    error?: ErrorCampo;
    ayuda?: string;
    contador?: number;
    maxCaracteres?: number;
    min?: number;
    max?: number;
    step?: number;
}


export default function CampoTexto({ label, id, registro, type = "text", placeholder,
    autoComplete, error, ayuda, contador, maxCaracteres, min, max, step }: CampoTextoProps) {

    const errorId = `${id}-error`;
    const ayudaId = `${id}-ayuda`;

    // un array con los ids para describir el campo de texto, si no hay error ni ayuda, se retorna undefined
    const idsDescriptores = [error ? errorId : null, ayuda ? ayudaId : null].filter(Boolean).join(" ");

    return (
        <div className={`campo-formulario ${error ? "campo-con-error" : ""}`}>
            <div className="campo-cabecera">
                <label htmlFor={id} className="campo-label">
                    {label}
                </label>
                {contador !== undefined && (
                    <span className="campo-contador" aria-live="polite">
                        {contador}
                        {maxCaracteres ? ` / ${maxCaracteres}` : " caracteres"}
                    </span>
                )}
            </div>

            <input
                id={id}
                type={type}
                placeholder={placeholder}
                autoComplete={autoComplete}
                min={min}
                max={max}
                step={step}
                aria-invalid={Boolean(error)}
                aria-describedby={idsDescriptores || undefined}
                className={`campo-input ${error ? "input-invalido" : ""}`}
                {...registro}
            />

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