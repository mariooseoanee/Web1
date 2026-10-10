const API_URL = 'https://images-api.nasa.gov/search?q=space&media_type=image';

export async function fetchNasaImages() {
    try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error('Error en la petición: ${response.status}');
        }
        
        // API devuelve siempre JSON
        const data = await response.json();
        return data.collection.items; // array de items
        
  } catch (error) {
        console.error('Error accediendo a NASA data:', error);
        throw error;
  }
}