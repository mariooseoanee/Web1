import { useTema } from '../context/TemaContext';

export default function Cabecera() {
    const { tema, alternarTema } = useTema();

    return (
        <header className={`cabecera ${tema}`}>
            <h1>🎬 Videoclub Nébula</h1>
            <button onClick={alternarTema} className="btn-tema">
                {tema === 'claro' ? '🌙 Modo Oscuro' : '☀️ Modo Claro'}
            </button>
        </header>
    );
}