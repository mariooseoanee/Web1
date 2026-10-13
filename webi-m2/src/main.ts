import { fetchNasaImages } from './api/nasaApi.ts';
import { processImgNasa, groupImagesByCategory } from './logic/mappeo.ts';
import { setupAppStructure, renderGallery, renderLoading, renderError, renderFilters } from './render/dom.ts';
import type { ImageAPI } from "./dataType/image.ts";

let isListenerAdded = false;

async function initApp() {

    renderLoading();
    
    try {
        const response = await fetchNasaImages();
        const dataFormatted = processImgNasa(response);        
        
        setupAppStructure(); 
        
        if (dataFormatted.length > 0) {
            const groupedData = groupImagesByCategory(dataFormatted);
            renderFilters(Object.keys(groupedData));
            setupFilterController(dataFormatted, groupedData);
        }

        renderGallery(dataFormatted);

    } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Unknown error contacting the API.';
        renderError(errorMsg, initApp);
    }
}


function setupFilterController(dataFormatted: ImageAPI[], groupedData: Record<string, ImageAPI[]>) {
    if (isListenerAdded) return;
    
    document.getElementById('app')?.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (!target.classList.contains('filter-btn')) {
            return;
        }

        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        target.classList.add('active');

        const selectedCategory = target.dataset.category;
        if (selectedCategory === 'todos') {
            renderGallery(dataFormatted);
        } else if (selectedCategory && groupedData[selectedCategory]) {
            renderGallery(groupedData[selectedCategory]);
        }
    });
    
    isListenerAdded = true;
}

document.addEventListener('DOMContentLoaded', initApp);
