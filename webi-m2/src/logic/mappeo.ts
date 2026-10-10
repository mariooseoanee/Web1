import type { ImageAPI } from "../dataType/image.ts";

/*
la API a veces devuelve elementos que no son fotos (como videos)
el filtro los comprueba (si no son fotos lo saca del array)
*/
export function processImgNasa(apiItems: any[]): ImageAPI[] {
    return apiItems
        
        .filter(item => item.media_type === 'image' && item.url) 

        .map(item => {

            const [year, month, day] = item.date.split('-');

            return {
                id: item.post_id,
                title: item.title || 'Sin título',
                date: `${day}/${month}/${year}`,
                year: year,
                imageUrl: item.hdurl || item.url,
                description: item.explanation ? item.explanation.substring(0, 120) + '...' : 'Sin descripción'
            }
        })
}
