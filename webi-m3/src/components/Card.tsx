import type { ImageAPI } from '../types/apod';

interface CardProps {
    image: ImageAPI;
    onSelect: (image: ImageAPI) => void;
}

export function Card({ image, onSelect }: CardProps) {
    function handleKeyDown(event: React.KeyboardEvent<HTMLElement>) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onSelect(image);
        }
    }

    return (
        <article
            className="card"
            onClick={() => onSelect(image)}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="button"
            aria-label={`View details for ${image.title}`}
        >
            <div className="card-img-wrapper">
                <img src={image.imageUrl} alt={image.title} loading="lazy" />
                <span className="hd-badge">HD</span>
            </div>
            <div className="card-info">
                <h3>{image.title}</h3>
                <span className="date">{image.date} • {image.category}</span>
                <p>{image.description}</p>
                <span className="card-action">View Full HD & Details →</span>
            </div>
        </article>
    );
}
