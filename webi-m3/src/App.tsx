import { useState } from 'react';
import type { ImageAPI } from './types/apod';
import { useNasaImages } from './hooks/useNasaImages';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { Gallery } from './components/Gallery';
import { LoadingState } from './components/LoadingState';
import { ErrorState } from './components/ErrorState';
import { CardDetail } from './components/CardDetail';
import './App.css';

export default function App() {
    // hook personalizado para separar la lógica de conexión con la API, estados y efectos
    const { images, loading, error, reload } = useNasaImages();
    const [selectedCategory, setSelectedCategory] = useState<string>('all'); // por defecto all
    const [selectedImage, setSelectedImage] = useState<ImageAPI | null>(null);

    // se crean los arrays categories y filteredImages a partir de images (valores derivados en render)
    const categories = Array.from(new Set(images.map((img) => img.category)));
    const filteredImages = selectedCategory === 'all'
        ? images
        : images.filter((img) => img.category === selectedCategory);

    // si esta en estado de carga, se muestra el loading o si hay error, el error
    if (loading) {
        return (
            <div className="app-layout">
                <Header />
                <LoadingState />
            </div>
        );
    }
    if (error) {
        return (
            <div className="app-layout">
                <Header />
                <ErrorState message={error} onRetry={reload} />
            </div>
        );
    }

    return (
        <div className="app-layout">
            <Header />

            <FilterBar
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
            />

            <Gallery
                images={filteredImages}
                onSelectImage={setSelectedImage}
            />

            {/* el renderizado condicional que muestra solo el detalle si hay una imagen seleccionada*/}
            {selectedImage && (
                <CardDetail
                    image={selectedImage}
                    onClose={() => setSelectedImage(null)}
                />
            )}
        </div>
    );
}
