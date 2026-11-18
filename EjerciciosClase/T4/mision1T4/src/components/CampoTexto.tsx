import type { UseFormRegisterReturn, FieldError } from 'react-hook-form';

interface Props {
    label: string;
    id: string;
    type?: string;
    placeholder?: string;
    registro: UseFormRegisterReturn;
    error?: FieldError;
    contador?: number; // Recibe un número normal, ¡adiós ReactNode!
}

export default function CampoTexto({ label, id, type = "text", placeholder, registro, error, contador }: Props) {
    return (
        <div className="campo">
            <label htmlFor={id}>{label}</label>
            <input id={id} type={type} placeholder={placeholder} {...registro} />

            {/* Si nos pasan un número por la prop contador, pintamos el div */}
            {contador !== undefined && <div className="contador">Caracteres: {contador}</div>}

            {error && <span className="error">{error.message}</span>}
        </div>
    );
}