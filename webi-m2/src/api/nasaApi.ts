const API_URL = 'https://science.nasa.gov/wp-json/wp/v2/apod-basic?per_page=15';
const CACHE_KEY = 'nasa_apod_cache';

export async function fetchNasaImages() {

    try {
        
        const cachedData = localStorage.getItem(CACHE_KEY);
        const hoy = new Date().toDateString();

        if (cachedData) {
            const parsedCache = JSON.parse(cachedData);
            
            // se comprueba si es de hoy
            if (parsedCache.date === hoy) {
                console.log('cargando desde localStorage (caché válida de hoy)');
                return parsedCache.data;
            } else {
                console.log('caché caducada, nueva img NASA disponible.');
            }
        }

    
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error(`Error on the response: ${response.status}`);
        }
        
        // API devuelve siempre JSON
        const data = await response.json();

        // guardado de los datos en localStorage (para no saturar peticiones, obj con data y fecha)
        if (Array.isArray(data) && data.length > 0) {
            
            const cacheObject = {
                date: hoy,
                data: data
            };
            localStorage.setItem(CACHE_KEY, JSON.stringify(cacheObject));
        }

        return data;
        
  } catch (error) {
        console.error('Error connecting to NASA data:', error);
        throw error;
  }
}