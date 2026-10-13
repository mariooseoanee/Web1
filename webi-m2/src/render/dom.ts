import type { ImageAPI } from "../dataType/image.ts";

function getApp() {
    return document.querySelector<HTMLDivElement>('#app')!;
}

export function setupAppStructure() {
    const app = getApp();
    app.innerHTML = `
        <div id="filters-container"></div>
        <div id="gallery-container"></div>
    `;
}

export function renderGallery(images: ImageAPI[]) {
    const container = document.getElementById('gallery-container');
    if (!container) return;

    if (images.length === 0) {
        container.innerHTML = `<p class="error-state">No stellar records found.</p>`;
        return;
    }

    const cardsHtml = images.map(img => `
        <article class="card">
            <img src="${escapeHTML(img.imageUrl)}" alt="${escapeHTML(img.title)}" loading="lazy"/>
            <div class="card-info">
                <h3>${escapeHTML(img.title)}</h3>
                <span class="date">${escapeHTML(img.date)} • ${escapeHTML(img.category)}</span>
                <p>${escapeHTML(img.description)}</p>
            </div>
        </article>
    `).join('');

    container.innerHTML = `
        <section class="gallery-container">
            <div class="gallery-track">${cardsHtml}</div>
        </section>
    `;
}


export function renderLoading() {
    const app = getApp();
    app.innerHTML = `
        <div class="loading-state">
        <p>🚀 Connecting to NASA APOD API...</p>
        </div>
    `;
}


export function renderError(message: string, onRetry: () => void) {
    const app = getApp();
    app.innerHTML = `
        <div class="error-state">
            <h2>❌ Transmission Failure</h2>
            <p>${escapeHTML(message)}</p>
            <button id="retry-btn">Retry connection</button>
        </div>
    `;

    // para no hacer un reload directamente le pasamos el initApp
    document.getElementById('retry-btn')?.addEventListener('click', onRetry);
}


export function renderFilters(categories: string[]) {
    const container = document.getElementById('filters-container');
    if (!container) return;

    const buttonsHtml = `
        <div id="filters">
            <button class="filter-btn active" data-category="todos">All</button>
            ${categories.map(cat => `<button class="filter-btn" data-category="${escapeHTML(cat)}">${escapeHTML(cat)}</button>`).join('')}
        </div>
    `;
    
    container.innerHTML = buttonsHtml;
}


// para evitar ataques XSS
export function escapeHTML(str: string): string {
    return str.replace(/[&<>'"]/g, tag => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    }[tag as string] || tag));
}