import type { NasaApiItem, ImageAPI } from '../types/apod';

const CATEGORY_MAP_COMPILED = Object.entries({
    'Deep Space': ['galaxy', 'nebula', 'cluster', 'star', 'supernova', 'andromeda', 'universe', 'black hole', 'telescope'],
    'Solar System': ['moon', 'mars', 'sun', 'earth', 'comet', 'lunar', 'saturn', 'crater', 'ridge', 'auroral', 'aurora', 'jupiter', 'mercury', 'venus', 'eclipse']
}).map(([category, keywords]) => ({
    category,
    regexes: keywords.map(kw => new RegExp(`\\b${kw}\\b`, 'i'))
}));

export function getCategory(title: string): string {
    const match = CATEGORY_MAP_COMPILED.find(({ regexes }) => regexes.some(r => r.test(title)));
    return match ? match.category : 'Miscellaneous';
}

export function processImgNasa(apiItems: NasaApiItem[]): ImageAPI[] {
    return apiItems
        .filter(item => (item.hdurl || item.url) && (!item.media_type || item.media_type === 'image'))
        .map(item => {
            const dateParts = item.date ? item.date.split('-') : ['????', '??', '??'];
            const [year, month, day] = dateParts;

            // limpia de etiquetas HTML que a veces devuelve la API de WordPress de la NASA
            const fullDesc = item.explanation
                ? item.explanation.replace(/<[^>]*>?/gm, '').trim()
                : 'No description available.';

            const shortDesc = fullDesc.length > 120
                ? fullDesc.substring(0, 120) + '...'
                : fullDesc;

            //por si no llega el hdurl, se queda con la de menor calidad que es url
            const imageAsset = item.hdurl || item.url;

            return {
                id: item.post_id,
                title: item.title || 'Untitled',
                date: `${day}/${month}/${year}`,
                category: getCategory(item.title || ''),
                imageUrl: item.url,
                hdUrl: imageAsset,
                description: shortDesc,
                fullDescription: fullDesc
            };
        });
}
