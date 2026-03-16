// 1. IMPORTAMOS LAS PIEZAS DESDE NUESTROS MÓDULOS
import { btnIniciar, btnPausar, btnReiniciar } from './elementos.js';
import { iniciarTemporizador, pausarTemporizador, reiniciarTemporizador } from './timer.js';
import { inicializarSplash } from './splash.js';
import { inicializarRitual } from './ritual.js';

// 2. INICIALIZAMOS LA INTERFAZ (Bienvenida y Ritual)
inicializarSplash();
inicializarRitual();

// 3. CONECTAMOS LOS BOTONES DEL RELOJ
btnIniciar.addEventListener('click', iniciarTemporizador);
btnPausar.addEventListener('click', pausarTemporizador);
btnReiniciar.addEventListener('click', reiniciarTemporizador);