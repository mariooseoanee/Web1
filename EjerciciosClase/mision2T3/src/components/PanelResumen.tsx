import type { Habito } from '../App';

interface PanelResumenProps {
    habitos: Habito[];
}

export default function PanelResumen({ habitos }: PanelResumenProps) {
    const total = habitos.length;
    const completadosHoy = habitos.filter((h) => h.hechoHoy).length;
    const pendientesHoy = total - completadosHoy;
    const porcentaje = total > 0 ? Math.round((completadosHoy / total) * 100) : 0;
    const mejorRacha = habitos.length > 0 ? Math.max(...habitos.map((h) => h.racha), 0) : 0;

    return (
        <div className="panel-resumen">
            <div className="resumen-tarjetas">

                <div className="stat-card">
                    <div className="stat-header">
                        <span className="stat-label">Progreso Diario</span>
                    </div>
                    <div className="stat-valor">
                        {completadosHoy} <span className="stat-de">de</span> {total}
                    </div>
                    <p className="stat-subtexto">
                        {total === 0 ? 'Sin hábitos registrados' : `${completadosHoy} de ${total} hoy`}
                    </p>
                    <div className="progreso-bar-bg">
                        <div
                            className="progreso-bar-fill"
                            style={{ width: `${porcentaje}%` }}
                            role="progressbar"
                            aria-valuenow={porcentaje}
                            aria-valuemin={0}
                            aria-valuemax={100}
                        />
                    </div>
                    <span className="stat-porcentaje">{porcentaje}% completado</span>
                </div>

                <div className="stat-card">
                    <div className="stat-header">
                        <span className="stat-label">Mejor Racha</span>
                    </div>
                    <div className="stat-valor">
                        {mejorRacha} <span className="stat-unidad">{mejorRacha === 1 ? 'día' : 'días'}</span>
                    </div>
                    <p className="stat-subtexto">
                        {mejorRacha > 0 ? '¡Constancia impecable!' : 'Comienza tu fuego hoy'}
                    </p>
                    <div className="stat-chip-row">
                        <span className="stat-chip">
                            Récord actual: {mejorRacha} 🔥
                        </span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-header">
                        <span className="stat-label">Estado de la Forja</span>
                    </div>
                    <div className="stat-metricas-grid">
                        <div className="sub-metrica">
                            <span className="sub-metrica-num">{total}</span>
                            <span className="sub-metrica-desc">Total</span>
                        </div>
                        <div className="sub-metrica">
                            <span className="sub-metrica-num exito">{completadosHoy}</span>
                            <span className="sub-metrica-desc">Listos</span>
                        </div>
                        <div className="sub-metrica">
                            <span className="sub-metrica-num advertencia">{pendientesHoy}</span>
                            <span className="sub-metrica-desc">Restantes</span>
                        </div>
                    </div>
                    <p className="stat-subtexto estado-frase">
                        {total === 0
                            ? 'Añade hábitos para empezar'
                            : pendientesHoy === 0
                                ? '¡Todo hecho por hoy!'
                                : `Te faltan ${pendientesHoy} por hacer`}
                    </p>
                </div>
            </div>
        </div>
    );
}