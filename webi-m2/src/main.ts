import { fetchNasaImages } from './api/nasaApi.ts';
import { processImgNasa } from './logic/mappeo.ts';
import { renderGallery } from './render/dom';
import './style.css';

async function initApp() {

    try {
        const response = await fetchNasaImages();
        const dataFormatted = processImgNasa(response);


        renderGallery(dataFormatted);
    } catch (error) {
        console.error('Error accediendo a NASA data:', error);
    }
}

document.addEventListener('DOMContentLoaded', initApp);
