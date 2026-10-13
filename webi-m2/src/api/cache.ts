import type { NasaApiItem } from "../dataType/image";

const CACHE_KEY = 'nasa_apod_cache';

export function getValidCache(): NasaApiItem[] | null{
    try {
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (!cachedData) return null;

        const parsedCache = JSON.parse(cachedData);
        const hoy = new Date().toDateString();

        if (parsedCache.date === hoy) {
            return parsedCache.data as NasaApiItem[];
        }
        return null;
    } catch (error) {
        // si json no valido, limpiamos solo la key
        localStorage.removeItem(CACHE_KEY);
        return null;
    }
}

export function saveToCache(data: NasaApiItem[]) {
    const cacheObject = {
        date: new Date().toDateString(),
        data: data
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheObject));
}