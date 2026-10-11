import type { ImageAPI } from "../dataType/image.ts";

const app = document.querySelector<HTMLDivElement>('#app')!;

export function renderGallery(images: ImageAPI[]) {
    if (images.length === 0) {
        app.innerHTML = `<p class="error-state">No se han encontrado registros estelares.</p>`;
        return;
    }

    const cardsHtml = images.map(img => `
        <article class="card">
        <img src="${img.imageUrl}" alt="${img.title}" loading="lazy"/>
        <div class="card-info">
            <h3>${img.title}</h3>
            <span class="date">${img.date} (Año: ${img.year})</span>
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
      <p>🚀 Conectando con la base de datos de la NASA...</p>
    </div>
  `;
}


export function renderError(message: string) {
  app.innerHTML = `
    <div class="error-state">
      <h2>❌ Fallo de Transmisión</h2>
      <p>${message}</p>
      <button onclick="location.reload();">Reintentar conexión</button>
    </div>
  `;
}

