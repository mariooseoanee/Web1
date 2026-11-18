import type { UseFormRegisterReturn, FieldError } from 'react-hook-form';

interface Opcion {
    label: string;
    value: string;
}

interface Props {
    label: string;
    opciones: Opcion[];
    registro: UseFormRegisterReturn;
    error?: FieldError | any;
}

export default function GrupoCheckboxes({ label, opciones, registro, error }: Props) {
    return (
        <div className="campo">
            <label>{label}</label>
            <div className="opciones-checkbox">
                {opciones.map((opcion) => (
                    <label key={opcion.value}>
                        <input type="checkbox" value={opcion.value} {...registro} /> {opcion.label}
                    </label>
                ))}
            </div>
            {error && <span className="error">{error.message}</span>}
        </div>
    );
}