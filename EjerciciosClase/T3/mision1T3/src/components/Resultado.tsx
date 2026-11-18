interface ResultadoProps {
    puntos: number;
    total: number;
    mejorRacha?: number;
    onReiniciar: () => void;
}


export default function Resultado({ puntos, total, mejorRacha, onReiniciar } : ResultadoProps) {
    const porcentaje = Math.round((puntos/total) * 100);

    let mensaje = "";
    
    if (porcentaje === 100) mensaje = "¡Perfección absoluta!";
    else if (porcentaje >= 50) mensaje = "¡Buen trabajo, has aprobado!";
    else mensaje = "Toca repasar los conceptos.";

    return (
        <div className="pantalla-resultado">
            <h2>Resultados Finales</h2>
            <p>Has logrado {puntos} de {total} aciertos.</p>
            <p>{mensaje}</p>
            {mejorRacha !== undefined && <p>Mejor racha: {mejorRacha}</p>}
            <button onClick={onReiniciar}>Jugar otra vez</button>
        </div>
    );

}