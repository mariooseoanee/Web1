import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { buscarProductos } from "../services/productosApi";
import { useDebounce } from "../hooks/useDebounce";

interface BuscadorProductosProps {
    onSeleccionar: (id: number) => void;
}

export default function BuscadorProductos({ onSeleccionar }: BuscadorProductosProps) {
    const [texto, setTexto] = useState("");
    const textoDebounced = useDebounce(texto, 300);
    const busquedaActiva = textoDebounced.trim().length > 0;

    const { data: resultados, isPending, isError, error, isFetching } = useQuery({
        queryKey: ["productos", "busqueda", textoDebounced.trim()],
        queryFn: () => buscarProductos(textoDebounced.trim()),
        enabled: busquedaActiva,
    });

    return (
        <section className="panel">
            <div className="panel-header">
                <h2>Buscador de productos</h2>
                {busquedaActiva && isFetching && !isPending && (
                    <span className="badge-fetching">Actualizando...</span>
                )}
            </div>

            <input
                type="search"
                className="buscador-input"
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                placeholder="Buscar por nombre (ej. phone, laptop)..."
            />

            {busquedaActiva && (
                <>
                    {isPending && <p className="estado-texto">Buscando "{textoDebounced}"...</p>}
                    {isError && <div role="alert" className="alerta-error">⚠️ {error.message}</div>}

                    {resultados && (
                        <ul className="lista-productos">
                            {resultados.length === 0 ? (
                                <li className="estado-texto">Sin resultados para "{textoDebounced}".</li>
                            ) : (
                                resultados.map((prod) => (
                                    <li key={prod.id}>
                                        <button
                                            type="button"
                                            className="item-boton"
                                            onClick={() => onSeleccionar(prod.id)}
                                        >
                                            <span>{prod.title}</span>
                                            <strong>${prod.price}</strong>
                                        </button>
                                    </li>
                                ))
                            )}
                        </ul>
                    )}
                </>
            )}
        </section>
    );
}