const estadoPartida = {
  posBala: 0,
  posActual: 0,
  perdedor: null,
  enProceso: false,
  rotacion: 0
};

const ICONOS = {
  rock: '🪨',
  paper: '📄',
  scissors: '✂️'
};

const botones = document.getElementById('ppt-botones');
const jugadorOp = document.getElementById('jugador-opcion');
const botOp = document.getElementById('bot-opcion');
const tambor = document.getElementById('tambor');
const huecos = document.querySelector('.hueco');
const logs = document.getElementById('log');


function iniciarJuego() {
  estadoPartida.posActual = 0;
  estadoPartida.posBala = Math.floor(Math.random() * 6) + 1;
  estadoPartida.perdedor = null;
  estadoPartida.enProceso = false;
  estadoPartida.rotacion = 0;

  jugadorOp.textContent('❓');
  botOp.textContent('❓');
}


// PIEDRA, PAPEL O TIJERA 
botones.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn-opcion');

  if (estado.enProceso == true) return;

  const opcionJugador = btn.dataset.opcion;
  jugarRonda(opcionJugador);
});


function jugarRonda(opcionJugador) {
  estadoPartida.enProceso = true;

  const opciones = ['rock', 'paper', 'scissors'];
  let contador = 0;

  jugadorOpcionEl.textContent = ICONOS[opcionJugador];

  // (tiempo entre repeticiones 70ms)
  const intervalo = setInterval(() => {
    botOpcionEl.textContent = ICONOS[opciones[(contador + 1) % 3]]; // se hace como la animacion de aleatoriedad rotando los iconos
    contador++;

    if (contador > 9) {
      clearInterval(intervalo);

      const opcionBot = opciones[Math.floor(Math.random() * 3)];
      jugadorOp.textContent = ICONOS[opcionJugador];
      botOp.textContent = ICONOS[opcionBot];

      evaluarResultado(opcionJugador, opcionBot);
    }
  }, 70);
}


function evaluarResultado(jugador, bot) {
  if (jugador === bot) {
    agregarMsj('Ambos eligieron ${ICONOS[jugador]}. ¡Empate! Elige otra vez.', 'info');
      estadoPartida.enProceso = false;
  }
  
  const victJugador = { rock: 'scissors', paper: 'rock', scissors: 'paper' };
  const ganoJug = victJugador[jugador] === bot;

  estadoPartida.perdedor = ganoJug ? 'bot' : 'jugador';
}