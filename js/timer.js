// ==========================================
// MÓDULO DEL TEMPORIZADOR: El motor principal
// ==========================================

// 1. Traemos las piezas que necesitamos de otros módulos
import { tiempoDisplay, contadorDisplay, sonidoAlarma } from './elementos.js';
import { inicializarMemoria, guardarProgreso } from './storage.js';

// 2. Variables de Estado exclusivas del reloj
let tiempoRestante = 1500; // 25 minutos en segundos
let temporizadorId = null; 
let esModoTrabajo = true; 
let ciclosCompletados = inicializarMemoria();

// Actualizamos el HTML inicial con la memoria recuperada
contadorDisplay.textContent = `Pomodoros completados: ${ciclosCompletados}`;

// 3. Función interna para pintar los números en pantalla
export function actualizarPantalla() {
    const minutos = Math.floor(tiempoRestante / 60);
    const segundos = tiempoRestante % 60;
    const minutosFormateados = minutos.toString().padStart(2, '0');
    const segundosFormateados = segundos.toString().padStart(2, '0');
    tiempoDisplay.textContent = `${minutosFormateados}:${segundosFormateados}`;
}

// 4. Las 3 funciones principales que exportamos para que los botones las usen
export function iniciarTemporizador() {
    if (temporizadorId !== null) return;

    const tiempoInicio = Date.now();
    const tiempoRestanteAlInicio = tiempoRestante; 

    temporizadorId = setInterval(() => {
        const tiempoPasadoMilisegundos = Date.now() - tiempoInicio;
        const segundosPasados = Math.floor(tiempoPasadoMilisegundos / 1000);
        tiempoRestante = tiempoRestanteAlInicio - segundosPasados;

        if (tiempoRestante <= 0) {
            tiempoRestante = 0; 
            actualizarPantalla(); 
            clearInterval(temporizadorId); 
            temporizadorId = null; 
            sonidoAlarma.play();

            if (esModoTrabajo) {
                ciclosCompletados++; 
                contadorDisplay.textContent = `Pomodoros completados: ${ciclosCompletados}`;
                guardarProgreso(ciclosCompletados);

                // LA MAGIA DEL DÍA 5 (V4): Disparamos el latido de recompensa
                contadorDisplay.classList.add('animar-pulso');
                
                // Le quitamos la clase medio segundo después para poder volver a usarla en el siguiente Pomodoro
                setTimeout(() => {
                    contadorDisplay.classList.remove('animar-pulso');
                }, 500);
            }
            
            esModoTrabajo = !esModoTrabajo; 
            document.body.classList.toggle('modo-descanso');
            tiempoRestante = esModoTrabajo ? 1500 : 300; 
            actualizarPantalla(); 
        } else {
            actualizarPantalla();
        }
    }, 1000); 
}

export function pausarTemporizador() {
    clearInterval(temporizadorId);
    temporizadorId = null;
}

export function reiniciarTemporizador() {
    pausarTemporizador();
    tiempoRestante = 1500;
    sonidoAlarma.pause(); 
    sonidoAlarma.currentTime = 0; 
    actualizarPantalla();
    esModoTrabajo = true; 
    document.body.classList.remove('modo-descanso'); 
}

// Pintamos la pantalla por primera vez al cargar
actualizarPantalla();