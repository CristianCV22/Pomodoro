// 1. Seleccionamos los elementos del HTML usando sus IDs
const tiempoDisplay = document.getElementById('tiempo-display');
const btnIniciar = document.getElementById('btn-iniciar');
const btnPausar = document.getElementById('btn-pausar');
const btnReiniciar = document.getElementById('btn-reiniciar');
// --- AUDIO ---
// Creamos un "reproductor" invisible y le decimos dónde está el archivo
const sonidoAlarma = new Audio('assets/notificacion.mp3');
const contadorDisplay = document.getElementById('contador-ciclos');

// 2. Hacemos una prueba de vida para asegurarnos de que todo está conectado
console.log("¡El cerebro de la aplicación está conectado!");
console.log("El tiempo inicial es:", tiempoDisplay.textContent);

// --- VARIABLES DE ESTADO (La memoria de la app) ---
let tiempoRestante = 1500; // 25 minutos expresados en segundos (25 * 60)
let temporizadorId = null; // Aquí guardaremos el ID del intervalo para poder detenerlo luego
let esModoTrabajo = true; // NUEVO: Iniciamos asumiendo que el primer ciclo es de trabajo
let ciclosCompletados = 0;
// --- FUNCIONES ---

// Función para formatear y mostrar el tiempo en la pantalla
function actualizarPantalla() {
    // 1. Calculamos los minutos (dividimos entre 60 y redondeamos hacia abajo)
    const minutos = Math.floor(tiempoRestante / 60);
    
    // 2. Calculamos los segundos restantes (usamos el operador módulo %)
    const segundos = tiempoRestante % 60;

    // 3. Formateamos para que siempre tengan dos dígitos (ej. "09" en vez de "9")
    const minutosFormateados = minutos.toString().padStart(2, '0');
    const segundosFormateados = segundos.toString().padStart(2, '0');

    // 4. Inyectamos el texto en el HTML
    tiempoDisplay.textContent = `${minutosFormateados}:${segundosFormateados}`;
}

// Llamamos a la función una vez al inicio para que la pantalla no esté vacía
actualizarPantalla();

// --- EVENTOS Y LÓGICA DEL MOTOR ---

// Creamos la función que arranca el reloj
function iniciarTemporizador() {
    // 1. Prevenir el bug de clics múltiples: 
    // Si temporizadorId no es null, el reloj ya está corriendo. Salimos de la función.
    if (temporizadorId !== null) return;

    // 2. Arrancamos el motor (setInterval)
    temporizadorId = setInterval(() => {
        // Restamos un segundo a nuestra memoria
        tiempoRestante--;
        
        // Actualizamos lo que el usuario ve en pantalla
        actualizarPantalla();

        // 3. El límite: ¿Qué pasa cuando llegamos a cero?
        if (tiempoRestante === 0) {
            clearInterval(temporizadorId); // Frenamos el motor
            temporizadorId = null; // Limpiamos la variable

            // --- LA MAGIA DEL DÍA 10 ---
            // Reproducimos el sonido
            sonidoAlarma.play();
            // --- LA MAGIA DEL DÍA 11: Contar el ciclo ---
            // Solo sumamos si el modo que acaba de terminar era "Trabajo"
            if (esModoTrabajo) {
                ciclosCompletados++; // Esto suma 1 a la variable
                contadorDisplay.textContent = `Pomodoros completados: ${ciclosCompletados}`;
            }
            // --- LA MAGIA DEL DÍA 8 ---
            
            // Invertimos el estado: Si era true pasa a false, y viceversa
            esModoTrabajo = !esModoTrabajo; 
            
            // --- LA MAGIA DEL DÍA 9 ---
            // Alternamos la clase visual en el body
            document.body.classList.toggle('modo-descanso');

            // Operador ternario: ¿esModoTrabajo es true? entonces 1500 seg (25 min) : sino 300 seg (5 min)
            tiempoRestante = esModoTrabajo ? 1500 : 300; 
            
            // Actualizamos la pantalla con el nuevo tiempo cargado
            actualizarPantalla(); 
            
            // Un mensaje en la consola para confirmar en qué fase estamos
            console.log(esModoTrabajo ? "Modo: Trabajo (25 min)" : "Modo: Descanso (5 min)");
        }
    }, 1000); // 1000 milisegundos = 1 segundo
}

// 4. Conectamos el botón físico de HTML con nuestra función
btnIniciar.addEventListener('click', iniciarTemporizador);

// Función para pausar el reloj (El Freno)
function pausarTemporizador() {
    // Detenemos el motor usando el ID que guardamos
    clearInterval(temporizadorId);
    // Vaciamos la variable para indicar que el motor está apagado
    temporizadorId = null;
}

// Función para reiniciar todo a su estado de fábrica (El Reseteo)
function reiniciarTemporizador() {
    // 1. Primero frenamos por si el reloj estaba corriendo
    pausarTemporizador();
    
    // 2. Restauramos la memoria a 25 minutos
    tiempoRestante = 1500;

    // --- LA MAGIA DEL DÍA 12: Matar el bug del audio ---
    sonidoAlarma.pause(); // Pausamos el sonido
    sonidoAlarma.currentTime = 0; // Rebobinamos el audio al segundo cero
    
    // 3. Forzamos a la pantalla a mostrar los 25:00 de nuevo
    actualizarPantalla();

    esModoTrabajo = true; // Forzamos el estado interno a trabajo
    document.body.classList.remove('modo-descanso'); // Forzamos a quitar el color verde
}

// Conectamos los últimos dos botones físicos con sus respectivas funciones
btnPausar.addEventListener('click', pausarTemporizador);
btnReiniciar.addEventListener('click', reiniciarTemporizador);