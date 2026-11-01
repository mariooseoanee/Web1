export interface ImageAPI { // lo recibido en la response, lo mapeamos a esta interfaz
    id: number;
    title: string;
    date: string;
    category: string;
    imageUrl: string;
    hdUrl?: string;
    description: string;
    fullDescription: string;
}


export interface NasaApiItem { // asi viene cada obj crudo de la api
    post_id: number;
    title?: string;
    date?: string;
    hdurl?: string;
    url: string;
    explanation?: string;
    media_type?: string;
}