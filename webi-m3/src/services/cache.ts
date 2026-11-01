import type { NasaApiItem } from '../types/apod';

const CACHE_KEY = 'nasa_apod_cache';

interface CacheData {
    date: string;
    data: NasaApiItem[];
}

export function getValidCache(): NasaApiItem[] | null {
    try {
        const cachedRaw = localStorage.getItem(CACHE_KEY);
        if (!cachedRaw) return null;

        const parsedCache: CacheData = JSON.parse(cachedRaw);
        const hoy = new Date().toDateString();

        if (parsedCache.date === hoy && Array.isArray(parsedCache.data)) {
            return parsedCache.data;
        }
        return null;
    } catch {
        localStorage.removeItem(CACHE_KEY);
        return null;
    }
}

export function saveToCache(data: NasaApiItem[]): void {
    const cacheObject: CacheData = {
        date: new Date().toDateString(),
        data
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheObject));
}
