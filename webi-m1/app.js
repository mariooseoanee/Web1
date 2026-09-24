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

const btnsPPT = document.getElementById('ppt-botones');
const btnIniciar = document.getElementById('btn-iniciar');
const jugadorOp = document.getElementById('jugador-opcion');
const botOp = document.getElementById('bot-opcion');
const tambor = document.getElementById('tambor');
const huecos = document.querySelectorAll('.hueco');
const log = document.getElementById('log');
const modal = document.getElementById('modal')


function iniciarJuego() {
  estadoPartida.posActual = 0;
  estadoPartida.posBala = Math.floor(Math.random() * 6) + 1;
  estadoPartida.perdedor = null;
  estadoPartida.enProceso = false;
  estadoPartida.rotacion = 0;

  jugadorOp.textContent = '❓';
  botOp.textContent = '❓';
  tambor.style.transform = 'rotate(0deg)';

  huecos.forEach(h => h.classList.remove('activo', 'bala'));

  agregarMsj('Partida iniciada. Tambor cargado con 1 bala.', 'info');
  agregarMsj('Elige Piedra, Papel o Tijera para empezar el duelo.', 'info');

  modal.classList.add('oculto');
  btnsPPT.classList.remove('oculto');
}


// PIEDRA, PAPEL O TIJERA 
btnsPPT.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn-opcion');

  if (estadoPartida.enProceso == true) return;

  const opcionJugador = btn.dataset.opcion;
  jugarRonda(opcionJugador);
});


function jugarRonda(opcionJugador) {
  estadoPartida.enProceso = true;

  const opciones = ['rock', 'paper', 'scissors'];
  let contador = 0;

  jugadorOp.textContent = ICONOS[opcionJugador];

  // (tiempo entre repeticiones 70ms)
  const intervalo = setInterval(() => {
    botOp.textContent = ICONOS[opciones[(contador + 1) % 3]]; // se hace como la animacion de aleatoriedad rotando los iconos
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
    agregarMsj(`Ambos eligieron ${ICONOS[jugador]}. ¡Empate! Elige otra vez.`, 'alerta');
    estadoPartida.enProceso = false;
    return
  }
  
  const victJugador = { rock: 'scissors', paper: 'rock', scissors: 'paper' };
  const ganoJug = victJugador[jugador] === bot;

  estadoPartida.perdedor = ganoJug ? 'bot' : 'jugador';

  const perdedorTexto = estadoPartida.perdedor === 'jugador' ? 'JUGADOR' : 'IA';
  
  agregarMsj(`${estadoPartida.perdedor === 'jugador' ? 'IA' : 'Jugador'} gana. Perdió ${perdedorTexto}.`, 'alerta');

  btnsPPT.classList.add('oculto'); // desaparecen los botones para momento ruleta
} 

function agregarMsj(texto, tipo) {
  const p = document.createElement('p');
  p.className = `linea ${tipo}`;
  p.textContent = `> ${texto}`;
  log.appendChild(p);
  log.scrollTop = log.scrollHeight;
 
}

btnIniciar.addEventListener('click', iniciarJuego);
