// ==========================================
// MÓDULO DEL TEMPORIZADOR: El motor principal
// ==========================================

// 1. Traemos las piezas que necesitamos de otros módulos
import { tiempoDisplay, contadorDisplay, sonidoAlarma } from './elementos.js';
import { inicializarMemoria, guardarProgreso } from './storage.js';

//
//let tomate = 1500; // 25 minutos en segundos
//let descanso = 300; // 5 minutos en segundos
//let descansoLargo = 900; // 15 minutos en segundos



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
                
                // Le quitamos la clase medio segundo después para poder volver a usarla
                setTimeout(() => {
                    contadorDisplay.classList.remove('animar-pulso');
                }, 500);
            }
            
            esModoTrabajo = !esModoTrabajo; 
            document.body.classList.toggle('modo-descanso');
            
            // =========================================================
            // LA MAGIA DEL DÍA 13 (V5): Lógica estricta de descanso largo
            // =========================================================
            if (esModoTrabajo) {
                tiempoRestante = 1500; // Volvemos a los 25 minutos (1500 seg)
            } else {
                // Evaluamos si merece el descanso largo (Múltiplos de 4)
                if (ciclosCompletados > 0 && ciclosCompletados % 4 === 0) {
                    tiempoRestante = 900; // ¡Premio! 15 minutos (900 seg)
                    console.log("¡Premio! Descanso largo de 15 minutos activado.");
                } else {
                    tiempoRestante = 300; // Descanso normal de 5 minutos (300 seg)
                    console.log("Descanso corto de 5 minutos.");
                }
            }
            // =========================================================

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