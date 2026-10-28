import type { Habito } from '../App';

interface TarjetaHabitoProps {
    habito: Habito;
    onToggleHecho: (id: string) => void;
    onEliminar: (id: string) => void;
}

export default function TarjetaHabito({ habito, onToggleHecho, onEliminar }: TarjetaHabitoProps) {
    const { id, nombre, racha, hechoHoy } = habito;

    return (
        <div className={`tarjeta-habito ${hechoHoy ? 'completada' : 'pendiente'}`}>
            <div className="tarjeta-info">
                <div className="tarjeta-textos">
                    <span className={`habito-nombre ${hechoHoy ? 'tachado' : ''}`}>
                        {nombre}
                    </span>
                    <div className="habito-metas">
                        <span className={`badge-racha ${racha > 0 ? 'activa' : ''}`}>
                            🔥 {racha} {racha === 1 ? 'día' : 'días'}
                        </span>
                        <span className={`badge-estado ${hechoHoy ? 'badge-exito' : 'badge-espera'}`}>
                            {hechoHoy ? 'Completado hoy' : 'Pendiente hoy'}
                        </span>
                    </div>
                </div>
            </div>

            <div className="tarjeta-acciones">
                <button
                    type="button"
                    onClick={() => onToggleHecho(id)}
                    className={`btn-accion-hecho ${hechoHoy ? 'activo' : ''}`}
                >
                    {hechoHoy ? '✅ Hecho hoy' : '⚪ Hecho hoy'}
                </button>

                <button
                    type="button"
                    onClick={() => onEliminar(id)}
                    className="btn-eliminar"
                    title="Eliminar hábito"
                    aria-label={`Eliminar ${nombre}`}
                >
                    Eliminar
                </button>
            </div>
        </div>
    );
}