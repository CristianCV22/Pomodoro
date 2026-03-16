// ==========================================
// MÓDULO SPLASH: Control de la pantalla de bienvenida
// ==========================================
import { splashScreen } from './elementos.js';

export function inicializarSplash() {
    if (sessionStorage.getItem('introVista')) {
        splashScreen.style.display = 'none';
    } else {
        sessionStorage.setItem('introVista', 'true');
        setTimeout(() => {
            splashScreen.style.display = 'none';
        }, 2500);
    }
}