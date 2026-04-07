// ==========================================
// MÓDULO DE ELEMENTOS: Todas las conexiones al HTML
// ==========================================

export const tiempoDisplay = document.getElementById('tiempo-display');
export const btnIniciar = document.getElementById('btn-iniciar');
export const btnPausar = document.getElementById('btn-pausar');
export const btnReiniciar = document.getElementById('btn-reiniciar');
export const contadorDisplay = document.getElementById('contador-ciclos');

export const modalRitual = document.getElementById('modal-ritual');
export const btnEntrarZona = document.getElementById('btn-entrar-zona');
export const checkboxesRitual = document.querySelectorAll('.checkbox-ritual');

export const splashScreen = document.getElementById('splash-screen');

// También exportamos el reproductor de audio
export const sonidoAlarma = new Audio('assets/notificacion.mp3');

export const contenedorPrincipal = document.querySelector('.contenedor-principal');

// --- ELEMENTOS DEL GESTOR DE TAREAS (V5) ---
export const inputNuevaTarea = document.getElementById('input-nueva-tarea');
export const btnAgregarTarea = document.getElementById('btn-agregar-tarea');
export const listaTareas = document.getElementById('lista-tareas');

export const tareaActivaDisplay = document.getElementById('tarea-activa-display');

// --- ELEMENTOS DE ESTADÍSTICAS (V5) ---
export const btnAbrirEstadisticas = document.getElementById('btn-abrir-estadisticas');
export const btnCerrarEstadisticas = document.getElementById('btn-cerrar-estadisticas');
export const modalEstadisticas = document.getElementById('modal-estadisticas');

// Reemplaza el canvasGrafico por este:
export const graficoContenedor = document.getElementById('grafico-contenedor');