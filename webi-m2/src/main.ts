import { fetchNasaImages } from './api/nasaApi.ts';
import { processImgNasa } from './logic/mappeo.ts';
import { renderGallery, renderLoading, renderError } from './render/dom.ts';

async function initApp() {

    renderLoading();
    try {
        const response = await fetchNasaImages();
        const dataFormatted = processImgNasa(response);        

        renderGallery(dataFormatted);
        
    } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Error desconocido al contactar con la API.';
        renderError(errorMsg);
    }
}

document.addEventListener('DOMContentLoaded', initApp);
