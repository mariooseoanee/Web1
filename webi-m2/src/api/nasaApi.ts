import { getValidCache, saveToCache } from './cache.ts';
import type { NasaApiItem } from '../dataType/image.ts';

const API_URL = 'https://science.nasa.gov/wp-json/wp/v2/apod-basic?per_page=15';

export async function fetchNasaImages(): Promise<NasaApiItem[]> {

    const cached = getValidCache();
    if (cached) {
        return cached;
    }

    // AbortController para cancelar si tarda mas de 8 segundos
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    try {
        const response = await fetch(API_URL, { signal: controller.signal });
        
        if (!response.ok) {
            throw new Error('We couldn`t connect to the NASA servers. Please try again later.');
        }
        

        // guardado de los datos en localStorage (para no saturar peticiones, obj con data y fecha)
        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
            saveToCache(data);
        }
    
    return data;
        
    } catch (error: any) {
        if (error.name === 'AbortError') {
            throw new Error('The connection took too long. Please check your internet and try again.');
        }
        console.error('Error connecting to NASA data:', error);
        throw error;

    } finally {
        clearTimeout(timeoutId);
    }
}