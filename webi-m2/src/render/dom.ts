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
                <span class="date">${img.date} • ${img.category}</span>
                <p>${img.description}</p>
            </div>
        </article>
    `).join('');

    app.innerHTML = `
        <section class="gallery-container">
            <div class="gallery-track">${cardsHtml}</div>
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
            <button id="retry-btn">Retry connection</button>
        </div>
    `;

    // Eliminamos el onclick inline[cite: 3]
    document.getElementById('retry-btn')?.addEventListener('click', () => {
        location.reload();
    });
}


export function renderFilters(categories: string[]) {
    let filterContainer = document.querySelector<HTMLDivElement>('#filters');
    if (!filterContainer) {
        filterContainer = document.createElement('div');
        filterContainer.id = 'filters';
        app.parentNode?.insertBefore(filterContainer, app);
    }

    const buttonsHtml = `
        <button class="filter-btn active" data-category="todos">All</button>
        ${categories.map(cat => `<button class="filter-btn" data-category="${cat}">${cat}</button>`).join('')}
    `;
    
    filterContainer.innerHTML = buttonsHtml;
}
