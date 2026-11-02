import { getValidCache, saveToCache } from './cache';
import type { NasaApiItem } from '../types/apod';

const API_URL = 'https://science.nasa.gov/wp-json/wp/v2/apod-basic?per_page=15';

export async function fetchNasaImages(signal?: AbortSignal): Promise<NasaApiItem[]> {
    const cached = getValidCache();
    if (cached) {
        return cached;
    }

    try {
        const response = await fetch(API_URL, { signal });

        if (!response.ok) {
            throw new Error('Failed to connect to NASA servers. Please try again later.');
        }

        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
            saveToCache(data);
        }

        return data;
    } catch (error: any) {
        if (error.name === 'AbortError') {
            throw error;
        }
        console.error('Error fetching NASA images:', error);
        throw error;
    }
}
