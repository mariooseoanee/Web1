import type { EquipoServidor } from "../esquemas/esquema";
import { ETIQUETAS_DEPORTES, ETIQUETAS_CATEGORIAS, } from "../esquemas/esquema";

interface TarjetaEquipoProps {
    equipo: EquipoServidor;
    estaCancelando: boolean;
    onCancelar: (id: string) => void;
}

export default function TarjetaEquipo({
    equipo,
    estaCancelando,
    onCancelar,
}: TarjetaEquipoProps) {
    return (
        <article
            className="tarjeta-contacto"
            role="listitem"
            aria-labelledby={`eq-nombre-${equipo.id}`}
        >
            <div className="tarjeta-cabecera">
                <div>
                    <span className="badge-id">{equipo.id}</span>
                    <h3 id={`eq-nombre-${equipo.id}`} className="tarjeta-nombre">
                        {equipo.nombreEquipo}
                    </h3>
                </div>
                <span className="badge-jugadores">
                    👥 {equipo.numeroJugadores} jugadores
                </span>
            </div>

            <div className="tarjeta-tags">
                <span className="tag-deporte">
                    {ETIQUETAS_DEPORTES[equipo.deporte]}
                </span>
                <span className="tag-categoria">
                    Categoría {ETIQUETAS_CATEGORIAS[equipo.categoria]}
                </span>
            </div>

            <div className="tarjeta-detalles">
                <div className="detalle-linea">
                    <span className="detalle-icono" aria-hidden="true">✉</span>
                    <a href={`mailto:${equipo.emailCapitan}`} className="detalle-enlace">
                        {equipo.emailCapitan}
                    </a>
                </div>
                <div className="detalle-linea">
                    <span className="detalle-icono" aria-hidden="true">☎</span>
                    <span>{equipo.telefonoCapitan}</span>
                </div>
            </div>

            <div className="tarjeta-acciones">
                <button
                    type="button"
                    className="boton-eliminar"
                    onClick={() => onCancelar(equipo.id)}
                    disabled={estaCancelando}
                >
                    {estaCancelando ? "Cancelando..." : "Cancelar inscripción"}
                </button>
            </div>
        </article>
    );
}
