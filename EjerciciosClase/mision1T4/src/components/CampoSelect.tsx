import type { UseFormRegisterReturn, FieldError } from 'react-hook-form';

interface Props {
    label: string;
    id: string;
    opciones: string[];
    registro: UseFormRegisterReturn;
    error?: FieldError;
}

export default function CampoSelect({ label, id, opciones, registro, error }: Props) {
    return (
        <div className="campo">
            <label htmlFor={id}>{label}</label>
            <select id={id} {...registro}>
                <option value="">-- Selecciona --</option>
                {opciones.map((op) => (
                    <option key={op} value={op}>{op}</option>
                ))}
            </select>
            {error && <span className="error">{error.message}</span>}
        </div>
    );
}