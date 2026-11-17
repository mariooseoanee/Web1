interface EstadoCargaProps {
    mensaje?: string;
}

export default function EstadoCarga({
    mensaje = "Cargando equipos inscritos desde la API...",
}: EstadoCargaProps) {
    return (
        <div
            className="estado-contenedor estado-cargando"
            aria-busy="true"
            aria-live="polite"
        >
            <div className="spinner-grande" aria-hidden="true" />
            <p className="texto-cargando">{mensaje}</p>
            <div className="esqueleto-grid" aria-hidden="true">
                <div className="esqueleto-tarjeta" />
                <div className="esqueleto-tarjeta" />
            </div>
        </div>
    );
}
