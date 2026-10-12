import type { ImageAPI } from "../dataType/image.ts";

const app = document.querySelector<HTMLDivElement>('#app')!;

export function renderGallery(images: ImageAPI[]) {
    if (images.length === 0) {
        app.innerHTML = `<p class="error-state">No stellar records found.</p>`;
        return;
    }

    const cardsHtml = images.map(img => `
        <article class="card">
        <img src="${img.imageUrl}" alt="${img.title}" loading="lazy"/>
        <div class="card-info">
            <h3>${img.title}</h3>
            <span class="date">${img.date} (${img.category})</span>
            <p>${img.description}</p>
        </div>
        </article>
    `).join('');


    app.innerHTML = `
        <section class="gallery-container">
        <div class="gallery-track">
            ${cardsHtml}
        </div>
        </section>
    `;
}


export function renderLoading() {
  app.innerHTML = `
    <div class="loading-state">
      <p>🚀 Connecting to NASA APOD API...</p>
    </div>
  `;
}


export function renderError(message: string) {
  app.innerHTML = `
    <div class="error-state">
      <h2>❌ Transmission Failure</h2>
      <p>${message}</p>
      <button onclick="localStorage.clear(); location.reload();">Retry connection</button>
    </div>
  `;
}


export function renderFilters(groupedImages: Record<string, ImageAPI[]>, allImages: ImageAPI[]) {

    let filterContainer = document.querySelector<HTMLDivElement>('#filters');

    if (!filterContainer) {
        filterContainer = document.createElement('div');
        filterContainer.id = 'filters';
        app.parentNode?.insertBefore(filterContainer, app);
    }

    const categories = Object.keys(groupedImages);
    
    // generar botones con el atributo data-category
    const buttonsHtml = `
        <button class="filter-btn active" data-category="all">All</button>
        ${categories.map(cat => `<button class="filter-btn" data-category="${cat}">${cat}</button>`).join('')}
    `;
    
    filterContainer.innerHTML = buttonsHtml;

    const buttons = filterContainer.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            buttons.forEach(b => b.classList.remove('active'));
            const target = e.target as HTMLButtonElement;
            target.classList.add('active');

            const selectedCategory = target.dataset.category;
            if (selectedCategory === 'all') {
                renderGallery(allImages);
            } else if (selectedCategory) {
                renderGallery(groupedImages[selectedCategory]);
            }
        });
    });
}

