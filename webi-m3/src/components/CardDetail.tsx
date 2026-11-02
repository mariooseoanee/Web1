import { useEffect } from 'react';
import type { ImageAPI } from '../types/apod';

interface CardDetailProps {
    image: ImageAPI;
    onClose: () => void;
}

export function CardDetail({ image, onClose }: CardDetailProps) {
    // useEffect para sincronizar con sistema externo (teclado y bloqueo de scroll)
    // se incluye la función de limpieza
    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                onClose();
            }
        }

        window.addEventListener('keydown', handleKeyDown);
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = originalOverflow;
        };
    }, [onClose]);

    return (
        <div
            className="modal-backdrop"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()} // para que no se cierre al hacer clic en el contenido
            >
                <button
                    type="button"
                    className="modal-close-btn"
                    onClick={onClose}
                    aria-label="Close modal"
                >
                    ✕
                </button>

                <div className="modal-media-container">
                    <img
                        src={image.hdUrl || image.imageUrl}
                        alt={image.title}
                        className="modal-hd-image"
                    />
                    <div className="modal-image-actions">
                        <a
                            href={image.hdUrl || image.imageUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hd-link-btn"
                        >
                            🔎 Open Full Resolution (HD)
                        </a>
                    </div>
                </div>

                <div className="modal-info">
                    <header className="modal-header">
                        <span className="modal-meta">{image.date} • {image.category}</span>
                        <h2 id="modal-title">{image.title}</h2>
                    </header>

                    <div className="modal-body">
                        <h3>Full Scientific Explanation</h3>
                        <p>{image.fullDescription}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
