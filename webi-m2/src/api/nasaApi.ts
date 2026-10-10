const API_URL = 'https://science.nasa.gov/wp-json/wp/v2/apod-basic?per_page=15';

export async function fetchNasaImages() {
    try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.status}`);
        }
        
        // API devuelve siempre JSON
        const data = await response.json();
        return data;
        
  } catch (error) {
        console.error('Error accediendo a NASA data:', error);
        throw error;
  }
}