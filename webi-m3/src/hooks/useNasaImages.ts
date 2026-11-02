import { useState, useEffect, useCallback } from 'react';
import type { ImageAPI } from '../types/apod';
import { fetchNasaImages } from '../services/nasaApi';
import { processImgNasa } from '../services/formatters';

interface UseNasaImagesResult {
    images: ImageAPI[];
    loading: boolean;
    error: string | null;
    reload: () => void;
}

/**
 * Custom Hook para gestionar la carga de imágenes astronómicas de la NASA.
 * Encapsula el estado de carga, errores, sincronización mediante useEffect
 * y la función de limpieza (cleanup) con AbortController.
 */
export function useNasaImages(): UseNasaImagesResult {
    const [images, setImages] = useState<ImageAPI[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // se memoriza el callback de carga para evitar recreaciones innecesarias
    const loadImages = useCallback(async (signal?: AbortSignal) => {
        setLoading(true);
        setError(null);

        try {
            const rawItems = await fetchNasaImages(signal);
            const formatted = processImgNasa(rawItems);
            setImages(formatted);
            setLoading(false);
        } catch (err: any) {
            // si la petición fue abortada por la limpieza del signal (ej. remonte en StrictMode)
            if (signal?.aborted || err?.name === 'AbortError') return;

            // personalización del mensaje de error
            const message = err instanceof Error ? err.message : 'Unknown error while connecting to the API.';
            setError(message);
            setLoading(false);
        }
    }, []);

    // sincronización al montar con limpieza para cancelar la petición en vuelo
    useEffect(() => {
        const controller = new AbortController();
        loadImages(controller.signal);

        return () => {
            controller.abort();
        };
    }, [loadImages]);

    return {
        images,
        loading,
        error,
        reload: () => loadImages()
    };
}
