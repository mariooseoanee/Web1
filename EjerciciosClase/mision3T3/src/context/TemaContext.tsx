import { createContext, useState, useEffect, useContext, type ReactNode } from 'react';
type Tema = 'claro' | 'oscuro';

interface TemaContextProps {
    tema: Tema;
    alternarTema: () => void;
}

export const TemaContext = createContext<TemaContextProps | undefined>(undefined);

export function TemaProvider({ children }: { children: ReactNode }) {
    const [tema, setTema] = useState<Tema>(() => {
        return (localStorage.getItem("tema") as Tema) ?? "claro";
    });

    useEffect(() => {
        localStorage.setItem("tema", tema);
        document.title = `Videoclub Nébula - Modo ${tema}`;
        document.body.className = tema;
    }, [tema]);

    const alternarTema = () => {
        setTema(prev => prev === 'claro' ? 'oscuro' : 'claro');
    };

    return (
        <TemaContext value={{ tema, alternarTema }}>
            {children}
        </TemaContext>
    );
}

export function useTema() {
    const context = useContext(TemaContext);
    if (!context) throw new Error("useTema debe usarse dentro de un TemaProvider");
    return context;
}