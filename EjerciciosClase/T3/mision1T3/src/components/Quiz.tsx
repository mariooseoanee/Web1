 import Resultado from "./Resultado";
 import { PREGUNTAS } from "./preguntas";
 import { useState } from "react";

export default function Quiz() {
    const [indice, setIndice] = useState<number>(0);
    const [puntos, setPuntos] = useState<number>(0);
    const [seleccion, setSeleccion] = useState<number | null>(null);
    const [rachaActual, setRachaActual] = useState<number>(0);
    const [mejorRacha, setMejorRacha] = useState<number>(0);

    const haTerminado = indice >= PREGUNTAS.length;

    if (haTerminado) {
        return (
            <Resultado 
                puntos={puntos} 
                total={PREGUNTAS.length} 
                mejorRacha={mejorRacha}
                onReiniciar={() => {
                    setIndice(0);
                    setPuntos(0);
                    setMejorRacha(0);
                    setRachaActual(0);
                    setSeleccion(null);
                }} 
            />
        );
    }

    const preguntaActual = PREGUNTAS[indice];

    const manejarRespuesta = (opcionIndex: number) => {
        if (seleccion !== null) return; 

        setSeleccion(opcionIndex);
        
        if (opcionIndex === preguntaActual.correcta) {
            setPuntos(prev => prev + 1);

            const nuevaRacha = rachaActual + 1;
            setRachaActual(nuevaRacha);
            if (nuevaRacha > mejorRacha) {
                setMejorRacha(nuevaRacha);
            }
        } else {
            setRachaActual(0);
        }

        setTimeout(() => {
            setIndice(prev => prev + 1);
            setSeleccion(null);
        }, 1200); 
    };

    return (
        <div className="quiz-contenedor">
            <progress 
                className="barra-progreso" 
                value={indice} 
                max={PREGUNTAS.length}
            />

            <h2 className="titulo">{preguntaActual.texto}</h2>            
            <div className="opciones">
                {preguntaActual.opciones.map((opcion, index) => {

                    let claseEstado = "";
                    
                    if (seleccion !== null) {
                        if (index === preguntaActual.correcta) {
                            claseEstado = "correcta";
                        } else if (index === seleccion) {
                            claseEstado = "incorrecta";
                        }
                    }

                    return (
                        <button 
                            key={`${preguntaActual.id}-opt-${index}`} 
                            onClick={() => manejarRespuesta(index)}
                            className={`btn-opcion ${claseEstado}`} 
                            disabled={seleccion !== null}
                        >
                            {opcion}
                        </button>
                    );
                })}
            </div>
                        
            <div className="info-inferior">
                <p>Pregunta {indice + 1} de {PREGUNTAS.length}</p>
                <div className="puntuacion-racha">
                    <p>Puntos actuales: {puntos}</p>
                    <p className="racha-actual">🔥 Racha actual: {rachaActual}</p>
                </div>
            </div>
        </div>
    );
}