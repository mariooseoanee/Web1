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


// mapa de Categoría -> Array de palabras clave
const CATEGORY_MAP_COMPILED = Object.entries({
    'Deep Space': ['galaxy', 'nebula', 'cluster', 'star', 'supernova', 'andromeda', 'universe'],
    'Solar System': ['moon', 'mars', 'sun', 'earth', 'comet', 'lunar', 'saturn', 'crater', 'ridge', 'auroral']
}).map(([category, keywords]) => ({
    category,
    regexes: keywords.map(kw => new RegExp(`\\b${kw}\\b`, 'i'))
}));

function getCategory(title: string): string {
    const match = CATEGORY_MAP_COMPILED.find(({ regexes }) => regexes.some(r => r.test(title)));
    return match ? match.category : 'Miscellaneous';
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
