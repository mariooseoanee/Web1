import { fetchNasaImages } from './api/nasaApi.ts';
import { processImgNasa, groupImagesByCategory } from './logic/mappeo.ts';
import { renderGallery, renderLoading, renderError, renderFilters } from './render/dom.ts';

async function initApp() {

    renderLoading();
    
    try {
        const response = await fetchNasaImages();
        const dataFormatted = processImgNasa(response);        
        
        if (dataFormatted.length > 0) {
            const groupedData = groupImagesByCategory(dataFormatted);
            renderFilters(Object.keys(groupedData));
            
            // un listener para todos los botones
            document.getElementById('filters')?.addEventListener('click', (e) => {
                const target = e.target as HTMLElement;
                if (!target.classList.contains('filter-btn')) return;

                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                target.classList.add('active');

                const selectedCategory = target.dataset.category;
                if (selectedCategory === 'todos') {
                    renderGallery(dataFormatted);
                } else if (selectedCategory) {
                    renderGallery(groupedData[selectedCategory]);
                }
            });
        }

        renderGallery(dataFormatted);

    } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Unknown error contacting the API.';
        renderError(errorMsg);
    }
}

document.addEventListener('DOMContentLoaded', initApp);
