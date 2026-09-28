# Piedra, Papel o ... Ruleta

Misión M1 · El Despertar del DOM — Web Development I.

## Cómo probarlo
Abre index.html en el navegador (o con Live Server). Pulsa «Iniciar Duelo», y comenzarán las rondas del clásico juego Piedra, Papel o Tijera, pero al final de cada una de estas rondas, el perdedor tendrá que tirar de la ruleta.
Habrá tantas rondas como disparos se realicen (hasta que se dispare la bala que se encuentra en el tambor, en una posición aleatoria).

## Uso de IA
Utilice Gemini Plus para ayudarme a mejorar visualmente el proyecto, para las transiciones y animaciones de este (sobre todo la ruleta), en cuanto a la logica para el js, no utilicé ningún tipo de ayuda de ninguna inteligencia artificial.

## Autopsia
1. Almaceno el estado de la partida (la posicion de la bala, la recamara actual, el turno...) en un objeto para no tener que leer todo el rato los datos del DOM
2. Utilizo solo un listener para todos los botones (de elección entre piedra, papel o tijera), en vez de tener uno por cada boton. Identifico la opción se ha pulsado mediante la delegación de eventos (`e.target.closest()`)
3. Bloqueo el flujo de interacción con un atributo en el objeto estado de la partida y uso `setTimeout` e `setInterval` para manejar los tiempos, reactivando los controles solo cuando la animación o el turno terminan.
