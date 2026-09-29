const estadoPartida = {
  posBala: 0,
  posActual: 0,
  perdedor: null,
  enProceso: false,
  rotacion: 0,
  primerDisparo: true
};

const ICONOS = {
  rock: '🪨',
  paper: '📄',
  scissors: '✂️'
};

const btnsPPT = document.getElementById('ppt-botones');
const btnIniciar = document.getElementById('btn-iniciar');
const btnDisparar = document.getElementById('btn-disparar');
const jugadorOp = document.getElementById('jugador-opcion');
const botOp = document.getElementById('bot-opcion');
const tambor = document.getElementById('tambor');
const huecos = document.querySelectorAll('.hueco');
const log = document.getElementById('log');
const modal = document.getElementById('modal')
const tituloModal = document.getElementById('modal-titulo');
const mensajeModal = document.getElementById('modal-mensaje');


function iniciarJuego() {
  estadoPartida.posActual = 0;
  estadoPartida.posBala = Math.floor(Math.random() * 6);
  estadoPartida.perdedor = null;
  estadoPartida.enProceso = false;
  estadoPartida.rotacion = 0;
  estadoPartida.primerDisparo = true;

  jugadorOp.textContent = '❓';
  botOp.textContent = '❓';
  tambor.style.transform = 'rotate(0deg)';

  huecos.forEach(h => h.classList.remove('activo', 'vacio', 'bala'));

  log.innerHTML = '';

  agregarMsj('Partida iniciada. Tambor cargado con 1 bala.', 'info');
  agregarMsj('Elige Piedra, Papel o Tijera para empezar el duelo.', 'info');

  tituloModal.textContent = 'BIENVENIDO';
  mensajeModal.textContent = 'Compite contra la I.A. en Piedra, Papel o Tijera. Quien pierda la ronda, probará suerte con el tambor.';
  btnIniciar.textContent = 'Iniciar Duelo';

  modal.classList.add('oculto');
  btnsPPT.classList.remove('oculto');
  btnDisparar.classList.add('oculto');
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

  // (tiempo entre cambios de icono 70ms)
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

  const ganador = ganoJug ? 'Jugador' : 'IA';
  const perdedor = ganoJug ? 'bot' : 'jugador';

  estadoPartida.perdedor = perdedor;
  
  agregarMsj(`${ganador} gana la ronda. Perdió ${perdedor === 'jugador' ? 'JUGADOR' : 'IA'}.`, 'alerta');

  btnsPPT.classList.add('oculto'); // desaparecen los botones para momento ruleta


  // segun quien perdio
  if (estadoPartida.perdedor === 'jugador') {
    btnDisparar.classList.remove('oculto');
    estadoPartida.enProceso = false;
  } else {
    setTimeout(() => disparar(), 1200);
  }
} 

btnDisparar.addEventListener('click', () => {
  if (estadoPartida.perdedor === 'jugador' 
    && !estadoPartida.enProceso) {
    disparar();
  }
});

function disparar() {
  estadoPartida.enProceso = true;
  btnDisparar.classList.add('oculto');

  if (estadoPartida.primerDisparo) {
    estadoPartida.rotacion += 720; 
    tambor.style.transform = `rotate(${estadoPartida.rotacion}deg)`;
    estadoPartida.primerDisparo = false;
  } else {
    estadoPartida.rotacion -= 60; 
    tambor.style.transform = `rotate(${estadoPartida.rotacion}deg)`;
  }

  const tirador = estadoPartida.perdedor === 'jugador' ? 'El Jugador' : 'La IA';
  agregarMsj(`${tirador} aprieta el gatillo...`, 'alerta');

  setTimeout(() => {
    const esBala = estadoPartida.posActual === estadoPartida.posBala;

    if (esBala) {
      huecos[estadoPartida.posActual].classList.add('bala');
      agregarMsj(`¡DISPARO! La bala estaba en la recámara ${estadoPartida.posActual + 1}.`, 'alerta');
      
      setTimeout(() => {
        terminarPartida(estadoPartida.perdedor);
      }, 1500);
    
    } else {
      huecos[estadoPartida.posActual].classList.add('vacio');
      agregarMsj(`*CLICK*. Recámara ${estadoPartida.posActual + 1} vacía. Sobrevive.`, 'acierto');

      estadoPartida.posActual++;
      estadoPartida.enProceso = false;

      jugadorOp.textContent = '❓';
      botOp.textContent = '❓';
      btnsPPT.classList.remove('oculto');
    }

  }, 1100);
}

function agregarMsj(texto, tipo) {
  const p = document.createElement('p');
  p.className = `linea ${tipo}`;
  p.textContent = `> ${texto}`;
  log.appendChild(p);
  log.scrollTop = log.scrollHeight;
 
}

function terminarPartida(perdedor) {
  tituloModal.textContent = perdedor === 'jugador' ? '¡ELIMINADO!' : '¡HAS SOBREVIVIDO!';
  mensajeModal.textContent = perdedor === 'jugador' ? 'Te han disparado en tu turno. La IA se lleva la victoria.' : 'La bala ha salido contra la IA. Has ganado el duelo.';
  
  btnIniciar.textContent = 'Jugar de Nuevo';
  
  modal.classList.remove('oculto');
}

window.addEventListener('keyup', (e) => {
  if (e.key.toLowerCase() === 'n') {
    document.body.classList.toggle('modo-oscuro');
    const estaActivo = document.body.classList.contains('modo-oscuro');
    agregarMsj(`Modo Oscuro ${estaActivo ? 'ACTIVADO' : 'DESACTIVADO'}.`, 'info');
  }
});

btnIniciar.addEventListener('click', iniciarJuego);
