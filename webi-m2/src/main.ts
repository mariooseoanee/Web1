import { fetchNasaImages } from './api/nasaApi.ts';
import { processImgNasa, groupImagesByCategory } from './logic/mappeo.ts';
import { renderGallery, renderLoading, renderError, renderFilters } from './render/dom.ts';

async function initApp() {

    renderLoading();
    try {
        const response = await fetchNasaImages();

        const dataFormatted = processImgNasa(response);        
        renderGallery(dataFormatted);

        const groupedData = groupImagesByCategory(dataFormatted);
        renderFilters(groupedData, dataFormatted);

    } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Unknown error contacting the API.';
        renderError(errorMsg);
    }
}

document.addEventListener('DOMContentLoaded', initApp);
