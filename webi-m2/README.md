# NASA APOD Odyssey
Misión M2 · Async Odyssey — Web Development I.
<br>
Consiste en consumir una API de la NASA, que publica una foto diaria (Astronomy Picture of the Day)

## Cómo probarlo
Instala las dependencias con npm install y arranca el servidor local con npm run dev. La se conectará con la API de la NASA y cargará las imágenes de los últimos días (nueva API con imagenes desde 28/09). <br>
Se pueden usar los botones para filtrar las fotos por categoria dentro de la astronomía. Al recargar la página, la carga es instantánea gracias a que los datos se guardan en la caché del navegador. Se ha implementado que se tengan que volver a cargar desde la API una vez al día ya que todos los dias hay nueva imagen.

## Uso de IA
Utilice Gemini Plus para ayudarme a adaptar la conexión fetch y el tipado a la nueva API de WordPress de la NASA (ya que la nueva API de APOD trae en la response etiquetas de html), también para la mejora del CSS y evitar el problema del pantallazo blanco al cargar Vite.

## Autopsia
1. En la nueva API no aparecen las categorías directas, por tanto, aplico una función que busca palabras claves en los titulos y asi poder clasificarlas en grupos. Las agrupo con reduce y genero los filtros útiles en el DOM.
2. Almaceno la respuesta de la API en el localStorage guardando también la fecha exacta de la petición `new Date().toDateString()`. Asi evito saturar la API en cada recarga y, a la vez, si la fecha en caché no coincide con el día de hoy recargo la petición para asegurar que se ve la nueva foto diaria.
3. En vez de crear el DOM nodo a nodo con `createElement`, inyecto todos los bloques mediante `innerHTML`. Así se simplifica el código y se consigue que la actualización del DOM sea mucho más legible y directa cuando es Vanilla sin uso de frameworks