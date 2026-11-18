import { useQuery } from "@tanstack/react-query";
import { obtenerProductos } from "../services/productosApi";

interface ListadoProductosProps {
    titulo: string;
    productoSeleccionadoId: number | null;
    onSeleccionar: (id: number) => void;
}

export default function ListadoProductos({
    titulo,
    productoSeleccionadoId,
    onSeleccionar,
}: ListadoProductosProps) {
    const { data: productos, isPending, isError, error, isFetching } = useQuery({
        queryKey: ["productos"],
        queryFn: obtenerProductos,
    });

    if (isPending) return <section className="panel"><p className="estado-texto">Cargando catálogo...</p></section>;
    if (isError) return <section className="panel"><div role="alert" className="alerta-error">⚠️ {error.message}</div></section>;

    return (
        <section className="panel">
            <div className="panel-header">
                <h2>{titulo}</h2>
                {isFetching && !isPending && <span className="badge-fetching">Actualizando...</span>}
            </div>

            <ul className="lista-productos">
                {productos.map((prod) => (
                    <li key={prod.id}>
                        <button
                            type="button"
                            onClick={() => onSeleccionar(prod.id)}
                            className={`item-boton ${prod.id === productoSeleccionadoId ? "activo" : ""}`}
                        >
                            <span>{prod.title}</span>
                            <strong>${prod.price}</strong>
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    );
}