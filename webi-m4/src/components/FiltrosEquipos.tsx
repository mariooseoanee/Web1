import { DEPORTES, ETIQUETAS_DEPORTES } from "../esquemas/esquema";
import type { Deporte } from "../types/equipo";

interface FiltrosEquiposProps {
    busqueda: string;
    onBusquedaChange: (valor: string) => void;
    filtroDeporte: Deporte | "todos";
    onFiltroDeporteChange: (valor: Deporte | "todos") => void;
    onLimpiarFiltros: () => void;
}

export default function FiltrosEquipos({
    busqueda,
    onBusquedaChange,
    filtroDeporte,
    onFiltroDeporteChange,
    onLimpiarFiltros,
}: FiltrosEquiposProps) {
    const hayFiltrosActivos = busqueda.trim() !== "" || filtroDeporte !== "todos";

    return (
        <div className="filtros-barra" role="search" aria-label="Filtrar equipos">
            <div className="filtro-campo">
                <label htmlFor="filtro-busqueda" className="filtro-label">
                    Buscar equipo o capitán
                </label>
                <input
                    id="filtro-busqueda"
                    type="search"
                    value={busqueda}
                    onChange={(e) => onBusquedaChange(e.target.value)}
                    placeholder="Filtrar en tiempo real..."
                    className="filtro-input"
                />
            </div>

            <div className="filtro-campo">
                <label htmlFor="filtro-deporte" className="filtro-label">
                    Deporte
                </label>
                <select
                    id="filtro-deporte"
                    value={filtroDeporte}
                    onChange={(e) =>
                        onFiltroDeporteChange(e.target.value as Deporte | "todos")
                    }
                    className="filtro-select"
                >
                    <option value="todos">Todos los deportes</option>
                    {DEPORTES.map((d) => (
                        <option key={d} value={d}>
                            {ETIQUETAS_DEPORTES[d]}
                        </option>
                    ))}
                </select>
            </div>

            {hayFiltrosActivos && (
                <button
                    type="button"
                    className="boton-limpiar-filtros"
                    onClick={onLimpiarFiltros}
                >
                    Limpiar filtros
                </button>
            )}
        </div>
    );
}
