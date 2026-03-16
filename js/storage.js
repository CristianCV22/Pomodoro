// ==========================================
// MÓDULO DE MEMORIA: Gestión del Disco Duro (localStorage)
// ==========================================

// Función 1: Leer el progreso de hoy (El Despertar)
export function inicializarMemoria() {
    const fechaHoy = new Date().toDateString();
    const fechaGuardada = localStorage.getItem('fechaPomodoro');
    let ciclos = 0;

    if (fechaGuardada !== fechaHoy) {
        // Es un nuevo día: reseteamos
        localStorage.setItem('pomodorosHoy', '0');
        localStorage.setItem('fechaPomodoro', fechaHoy);
        ciclos = 0;
    } else {
        // Es el mismo día: recuperamos los datos
        ciclos = parseInt(localStorage.getItem('pomodorosHoy')) || 0;
    }
    
    return ciclos; // Le devolvemos el número al gerente (app.js)
}

// Función 2: Guardar el progreso (El Guardado Automático)
export function guardarProgreso(ciclosCompletados) {
    localStorage.setItem('pomodorosHoy', ciclosCompletados);
    localStorage.setItem('fechaPomodoro', new Date().toDateString());
}