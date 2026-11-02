import { useState, useEffect, useCallback } from 'react';
import type { ImageAPI } from './types/apod';
import { fetchNasaImages } from './services/nasaApi';
import { processImgNasa } from './services/formatters';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { Gallery } from './components/Gallery';
import { LoadingState } from './components/LoadingState';
import { ErrorState } from './components/ErrorState';
import { CardDetail } from './components/CardDetail';
import './App.css';

export default function App() {
    const [images, setImages] = useState<ImageAPI[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('all'); // por defecto all
    const [selectedImage, setSelectedImage] = useState<ImageAPI | null>(null);

    // se memoriza el callback de cargar datos, y se le pasa el signal como parametro para 
    const loadImages = useCallback(async (signal?: AbortSignal) => {
        setLoading(true);
        setError(null);

        try {
            const rawItems = await fetchNasaImages(signal);
            const formatted = processImgNasa(rawItems);
            setImages(formatted);
            setLoading(false);
        } catch (err: any) {
            const message = err instanceof Error ? err.message : 'Unknown error while connecting to the API.'; // personalizacion del mensaje de error
            setError(message);
            setLoading(false);
        }
    }, []);

    // se usa el useEffect para cargar datos cuando el componente se monta
    useEffect(() => {
        const controller = new AbortController();
        loadImages(controller.signal);

        return () => {
            controller.abort();
        };
    }, [loadImages]);

    // se crean los arrays categories y filteredImages a partir de images
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
                <ErrorState message={error} onRetry={() => loadImages()} />
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
