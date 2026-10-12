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


function getCategory(title: string): string {
    const t = title.toLowerCase();

    if (t.includes('galaxy') || t.includes('nebula') || t.includes('cluster') || 
        t.includes('star') || t.includes('supernova') || t.includes('andromeda') || 
        t.includes('universe')) {
        return 'Deep Space';
    }

    if (t.includes('moon') || t.includes('mars') || t.includes('sun') || 
        t.includes('earth') || t.includes('comet') || t.includes('lunar') || 
        t.includes('saturn') || t.includes('crater') || t.includes('ridge') ||
        t.includes('auroral')) {
        return 'Solar System';
    }

    return 'Miscellaneous';
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
