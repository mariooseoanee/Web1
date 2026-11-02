# NASA APOD Odyssey
Misión M3 · React Odyssey — Web Development I.
<br>
Consiste en reeconstruir (y también añadir alguna mejora) de la aplicación de la misión anterior, ahora usando React. 

## Cómo probarlo
Instala las dependencias con `npm install` y arranca el servidor local con `npm run dev`. La aplicación se conectará con la API de la NASA y cargará las imágenes astronómicas recientes (manteniendo el sistema de caché en `localStorage` que evita peticiones repetidas el mismo día). <br>
Se pueden filtrar las imágenes por categoría con la barra de botones. Al pulsar en cualquier tarjeta (o mediante teclado con `Enter` o `Espacio`), se abre el modal con la explicación completa y el enlace a la imagen en hd. El detalle de la imagen se puede cerrar haciendo clic fuera de él, con el botón de cerrar o pulsando la tecla `Escape`.

## Uso de IA
Utilice Gemini para ayudarme a solucionar el problema de que las peticiones no se cancelaran a pesar del doble montaje por el `StrictMode` de React, y para ver como aplicar un hook personalizado y reutilizable por todos los componentes (`useNasaImages`).
<br>
Ademas, los estilos y animaciones del detalle de las tarjetas han sido generados con la ayuda de la IA.

## Autopsia
1. Descompongo la interfaz en componentes modulares y reutilizables (`Header`, `FilterBar`, `Gallery`, `Card`, `CardDetail`, `LoadingState`, `ErrorState`) que luego solo llamo como etiquetas en `App.tsx`. Cada componente tiene su interfaz que define sus props tipado (ya que el proyecto es con ts, si fuera con js no seria necesaria la interfaz).
2. Para la lista filtrada o las categorías las derivo durante la carga (`categories` y `filteredImages`) a partir de la lista principal y la categoría seleccionada para no usar mas estados de los necesarios.
3. Uso `useEffect` para sincornizar los componentes con sistemas externos como las llamadas a la API (usando `AbortController` para cancelar la petición si el componente se desmonta), y en `CardDetail` para escuchar las teclas (esc y esp) y bloquear el scroll, restaurando el overflow y quitando el listener (en la limpieza al desmontar el componente `CardDetail`).
4. La galería utiliza el id que viene de la API como key en lugar de índices, y se usa e.stopPropagation() para que los clics dentro del detalle no lo cierren.
5. Saco toda la lógica de pedir los datos a la API, manejar estados de carga/error y cancelación con `AbortController` al hook personalizado `useNasaImages`, dejando `App.tsx` con solo la llamada a los componentes.
