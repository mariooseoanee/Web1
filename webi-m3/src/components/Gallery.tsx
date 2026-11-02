import type { ImageAPI } from '../types/apod';
import { Card } from './Card';

interface GalleryProps {
    images: ImageAPI[];
    onSelectImage: (image: ImageAPI) => void;
}

export function Gallery({ images, onSelectImage }: GalleryProps) {
    if (images.length === 0) {
        return (
            <div className="gallery-empty">
                <p>No stellar records found for this category.</p>
            </div>
        );
    }

    return (
        <section className="gallery-container">
            <div className="gallery-track">
                {images.map((image) => (
                    <Card
                        key={image.id}
                        image={image}
                        onSelect={onSelectImage}
                    />
                ))}
            </div>
        </section>
    );
}
