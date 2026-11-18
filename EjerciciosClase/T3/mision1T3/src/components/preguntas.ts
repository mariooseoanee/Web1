export const PREGUNTAS = [    
    { 
        id: "q1",
        texto: "¿Qué hook añade memoria a un componente?",
        opciones: ["useEffect", "useState", "useRef", "useContext"],
        correcta: 1 
    },  
    { 
        id: "q2",
        texto: "¿Para qué se utiliza useEffect?",
        opciones: ["Para mutar el DOM de forma síncrona", "Para sincronizar un componente con un sistema externo", "Para crear referencias mutables", "Para proveer contexto"],
        correcta: 1 
    },
    { 
        id: "q3",
        texto: "¿Qué hook evita recrear una función en cada renderizado?",
        opciones: ["useCallback", "useMemo", "useState", "useTransition"],
        correcta: 0 
    },
    { 
        id: "q4",
        texto: "¿Qué valor devuelve useRef?",
        opciones: ["Un array con el estado y la función para actualizarlo", "Un objeto con una propiedad 'current'", "Un valor booleano", "Una función de limpieza"],
        correcta: 1 
    }
];