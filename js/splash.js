// ==========================================
// MÓDULO SPLASH: Control de la pantalla de bienvenida
// ==========================================
import { splashScreen, modalRitual, contenedorPrincipal } from './elementos.js';

export function inicializarSplash() {
    if (sessionStorage.getItem('introVista')) {
        splashScreen.style.display = 'none';
        revelarTemporizador(); // Verificamos si lanzamos el reloj
    } else {
        sessionStorage.setItem('introVista', 'true');
        setTimeout(() => {
            splashScreen.style.display = 'none';
            revelarTemporizador(); // Verificamos si lanzamos el reloj
        }, 2500);
    }
}

// NUEVA FUNCIÓN: El semáforo inteligente
function revelarTemporizador() {
    // Si el ritual tiene la clase 'oculto' (porque ya lo hiciste hoy), el camino está libre
    if (modalRitual.classList.contains('oculto')) {
        contenedorPrincipal.classList.add('animar-entrada');
    }
}