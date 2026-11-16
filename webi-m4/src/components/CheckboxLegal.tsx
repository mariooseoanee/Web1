import type { UseFormRegisterReturn, FieldError } from "react-hook-form";

export type ErrorCampo = FieldError | { message?: string };

interface CheckboxLegalProps {
    id: string;
    registro: UseFormRegisterReturn;
    texto: string;
    enlaceTexto?: string;
    error?: ErrorCampo;
}

export default function CheckboxLegal({ id, registro, texto, enlaceTexto, error }: CheckboxLegalProps) {
    const errorId = `${id}-error`;

    return (
        <div className={`campo-checkbox-legal ${error ? "campo-con-error" : ""}`}>
            <label htmlFor={id} className="checkbox-legal-label">
                <input
                    id={id}
                    type="checkbox"
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? errorId : undefined}
                    className="checkbox-input"
                    {...registro}
                />
                <span className="checkbox-texto">
                    {texto}{" "}
                    {enlaceTexto && (
                        <span className="enlace-protocolo">{enlaceTexto}</span>
                    )}
                </span>
            </label>

            {error && (
                <span id={errorId} role="alert" className="error-mensaje">
                    {error.message}
                </span>
            )}
        </div>
    );
}