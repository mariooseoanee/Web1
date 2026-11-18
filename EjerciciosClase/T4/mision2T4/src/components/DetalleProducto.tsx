import { useQuery } from "@tanstack/react-query";
import { obtenerProductoPorId } from "../services/productosApi";

interface DetalleProductoProps {
    id: number | null;
}

export default function DetalleProducto({ id }: DetalleProductoProps) {
    const { data: producto, isPending, isError, error, isFetching } = useQuery({
        queryKey: ["producto", id],
        queryFn: () => obtenerProductoPorId(id!),
        enabled: id !== null,
    });

    if (id === null) {
        return <p>Selecciona un producto del listado para ver su ficha.</p>;
    }
    if (isPending) return <p>Cargando detalle del producto #{id}...</p>;
    if (isError) return <div role="alert">⚠️ {error.message}</div>;

    return (
        <article>
            {isFetching && <small>Actualizando ficha...</small>}
            <h3>{producto.title}</h3>
            <img src={producto.thumbnail} alt={producto.title} width={160} />
            <p>{producto.description}</p>
            <p>
                <strong>Precio:</strong> ${producto.price} | <strong>Stock:</strong> {producto.stock}
            </p>
        </article>
    );
}