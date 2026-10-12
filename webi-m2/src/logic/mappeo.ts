import type { ImageAPI } from "../dataType/image.ts";
import type { NasaApiItem } from '../dataType/image.ts';

/*
la API a veces devuelve elementos que no son fotos (como videos)
el filtro los comprueba (si no son fotos lo saca del array)
*/
export function processImgNasa(apiItems: NasaApiItem[]): ImageAPI[] {
    return apiItems
        
        .filter(item => item.url && (!item.media_type || item.media_type === 'image'))

        .map(item => {

            const dateParts = item.date ? item.date.split('-') : ['????', '??', '??'];
            const [year, month, day] = dateParts;

            const cleanDesc = item.explanation ? item.explanation.replace(/<[^>]*>?/gm, '') : 'Without description';
            const safeDesc = cleanDesc.length > 120 ? cleanDesc.substring(0, 120) + '...' : cleanDesc;

            return {
                id: item.post_id,
                title: item.title || 'No title',
                date: `${day}/${month}/${year}`,
                category: getCategory(item.title || ''),
                imageUrl: item.hdurl || item.url,
                description: safeDesc
            }
        })
}


// mapa claro de Categoría -> Array de palabras clave
const CATEGORY_MAP: Record<string, string[]> = {
    'Deep Space': ['galaxy', 'nebula', 'cluster', 'star', 'supernova', 'andromeda', 'universe'],
    'Solar System': ['moon', 'mars', 'sun', 'earth', 'comet', 'lunar', 'saturn', 'crater', 'ridge', 'auroral']
};

export function getCategory(title: string): string {
    const match = Object.entries(CATEGORY_MAP).find(([, keywords]) => {
        
        // some() evalúa comprueba si al menos una palabra clave del array se cumple
        return keywords.some(keyword => {
            // \b (Word Boundary) para exigir que sea una palabra aislada, 'i' ignora mayus y minus
            const regex = new RegExp(`\\b${keyword}\\b`, 'i');
            return regex.test(title);
        });
        
    });

    // si no coincide, undefined
    return match ? match[0] : 'Miscellaneous';
}


/* ejemplo del objeto a devolver
{
  "Solar System": [ {foto_luna}, {foto_marte} ],
  "Miscellaneous": [ {foto_astronauta} ]
}
*/
export function groupImagesByCategory(images: ImageAPI[]) {
    return images.reduce((imagenesAgrupadas: Record<string, ImageAPI[]>, img) => {
        
        if (!imagenesAgrupadas[img.category]) {
            imagenesAgrupadas[img.category] = [];
        }
        
        imagenesAgrupadas[img.category].push(img);
        return imagenesAgrupadas; 
    }, {});
}
