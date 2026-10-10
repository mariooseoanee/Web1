import type { ImageAPI } from "../dataType/image.ts";

/*
la API a veces devuelve elementos vacios o que no son fotos (como videos)
el filtro los comprueba (si no son fotos lo saca del array)
*/
export function processImgNasa(apiItems: any[]): ImageAPI[] {
    return apiItems
        
        .filter(item => item.data?.[0] && item.links?.[0]?.href)

        .map(item => {

            const datosOriginales = item.data[0];

            return {
                id: datosOriginales.nasa_id,
                title: datosOriginales.title,
                date: datosOriginales.date_created,
                imageUrl: item.links[0].href,
                description: datosOriginales.description ? datosOriginales.description.substring(0, 100) + '...' : 'Sin descripción',
                keywords: datosOriginales.keywords || []
            }
        })
}
