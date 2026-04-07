// 1. IMPORTAMOS LAS PIEZAS DESDE NUESTROS MÓDULOS
import { btnIniciar, btnPausar, btnReiniciar } from './elementos.js';
import { iniciarTemporizador, pausarTemporizador, reiniciarTemporizador } from './timer.js';
import { inicializarSplash } from './splash.js';
import { inicializarRitual } from './ritual.js';
import { inicializarTareas } from './tareas.js';
// Arriba en los imports:
import { inicializarEstadisticas } from './estadisticas.js';

// En la sección de inicialización:
inicializarEstadisticas();

// 2. INICIALIZAMOS LA INTERFAZ (Bienvenida y Ritual)
inicializarSplash();
inicializarRitual();
inicializarTareas();

// 3. CONECTAMOS LOS BOTONES DEL RELOJ
btnIniciar.addEventListener('click', iniciarTemporizador);
btnPausar.addEventListener('click', pausarTemporizador);
btnReiniciar.addEventListener('click', reiniciarTemporizador);

// ==========================================
// EFECTO RIPPLE PARA LOS BOTONES (Día 6)
// ==========================================
function crearRipple(event) {
    const boton = event.currentTarget;

    // 1. Creamos un elemento <span> desde cero (esta será nuestra onda)
    const circulo = document.createElement('span');
    
    // 2. Calculamos qué tan grande debe ser la onda según el tamaño del botón
    const diametro = Math.max(boton.clientWidth, boton.clientHeight);
    const radio = diametro / 2;

    // 3. Matemáticas: Calculamos la coordenada exacta del clic dentro del botón
    circulo.style.width = circulo.style.height = `${diametro}px`;
    circulo.style.left = `${event.clientX - boton.getBoundingClientRect().left - radio}px`;
    circulo.style.top = `${event.clientY - boton.getBoundingClientRect().top - radio}px`;
    
    // 4. Le ponemos la clase de CSS que creamos hoy
    circulo.classList.add('ripple');

    // 5. Limpieza: Si ya había una onda vieja, la borramos para que no se acumulen
    const rippleExistente = boton.querySelector('.ripple');
    if (rippleExistente) {
        rippleExistente.remove();
    }

    // 6. Inyectamos la onda dentro del botón HTML
    boton.appendChild(circulo);
}

// 7. Le pegamos este superpoder a los tres botones de tu reloj
const botonesReloj = [btnIniciar, btnPausar, btnReiniciar];
botonesReloj.forEach(boton => {
    boton.addEventListener('click', crearRipple);
});