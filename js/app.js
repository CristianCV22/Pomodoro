// 1. Seleccionamos los elementos del HTML usando sus IDs
const tiempoDisplay = document.getElementById('tiempo-display');
const btnIniciar = document.getElementById('btn-iniciar');
const btnPausar = document.getElementById('btn-pausar');
const btnReiniciar = document.getElementById('btn-reiniciar');
// --- AUDIO ---
// Creamos un "reproductor" invisible y le decimos dónde está el archivo
const sonidoAlarma = new Audio('assets/notificacion.mp3');
const contadorDisplay = document.getElementById('contador-ciclos');
// --- ELEMENTOS DEL RITUAL DE INICIO (Día 4) ---
const modalRitual = document.getElementById('modal-ritual');
const btnEntrarZona = document.getElementById('btn-entrar-zona');
// querySelectorAll atrapa TODOS los elementos que tengan esa clase y los guarda en una lista
const checkboxesRitual = document.querySelectorAll('.checkbox-ritual');

// 2. Hacemos una prueba de vida para asegurarnos de que todo está conectado
console.log("¡El cerebro de la aplicación está conectado!");
console.log("El tiempo inicial es:", tiempoDisplay.textContent);

// --- VARIABLES DE ESTADO (La memoria de la app) ---
let tiempoRestante = 1500; // 25 minutos expresados en segundos (25 * 60)
let temporizadorId = null; // Aquí guardaremos el ID del intervalo para poder detenerlo luego
let esModoTrabajo = true; // NUEVO: Iniciamos asumiendo que el primer ciclo es de trabajo
// --- LA MAGIA DEL DÍA 7: Leer la memoria ---
// Buscamos la llave 'pomodorosHoy'. Si existe, la convertimos a número (parseInt). Si no existe (||), ponemos un 0.
const fechaHoy = new Date().toDateString();
const fechaGuardada = localStorage.getItem('fechaPomodoro');
let ciclosCompletados = 0; 

if (fechaGuardada !== fechaHoy) {
    localStorage.setItem('pomodorosHoy', '0');
    localStorage.setItem('fechaPomodoro', fechaHoy);
    ciclosCompletados = 0;
} else {
    ciclosCompletados = parseInt(localStorage.getItem('pomodorosHoy')) || 0;
}
contadorDisplay.textContent = `Pomodoros completados: ${ciclosCompletados}`;
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
// Creamos la función que arranca el reloj (Versión a prueba de pestañas inactivas)
function iniciarTemporizador() {
    if (temporizadorId !== null) return;

    // 1. Guardamos la hora EXACTA en la que le dimos clic a "Iniciar"
    const tiempoInicio = Date.now();
    // 2. Guardamos cuántos segundos teníamos en pantalla al arrancar
    const tiempoRestanteAlInicio = tiempoRestante; 

    temporizadorId = setInterval(() => {
        // 3. Calculamos la diferencia de tiempo real que ha pasado
        const tiempoPasadoMilisegundos = Date.now() - tiempoInicio;
        const segundosPasados = Math.floor(tiempoPasadoMilisegundos / 1000);

        // 4. Actualizamos nuestra memoria restando los segundos reales pasados
        tiempoRestante = tiempoRestanteAlInicio - segundosPasados;

        // 5. El límite: ¿Qué pasa cuando llegamos a cero (o nos pasamos por estar dormidos)?
        if (tiempoRestante <= 0) {
            tiempoRestante = 0; // Forzamos a cero por si se pasó a números negativos
            actualizarPantalla(); // Mostramos el 00:00 por un milisegundo
            
            clearInterval(temporizadorId); 
            temporizadorId = null; 
            
            sonidoAlarma.play();

            // --- LA MAGIA DEL DÍA 7, 8 y 9: Guardar la partida y la fecha ---
            if (esModoTrabajo) {
                ciclosCompletados++; 
                contadorDisplay.textContent = `Pomodoros completados: ${ciclosCompletados}`;
                
                // Guardamos el número y la etiqueta de tiempo exacta
                localStorage.setItem('pomodorosHoy', ciclosCompletados);
                localStorage.setItem('fechaPomodoro', new Date().toDateString());
            }
            
            // --- LA MAGIA DEL DÍA 8 Y 9 ---
            esModoTrabajo = !esModoTrabajo; 
            document.body.classList.toggle('modo-descanso');
            tiempoRestante = esModoTrabajo ? 1500 : 300; 
            
            actualizarPantalla(); 
            console.log(esModoTrabajo ? "Modo: Trabajo (25 min)" : "Modo: Descanso (5 min)");
        } else {
            // Si aún no llegamos a cero, actualizamos la pantalla normalmente
            actualizarPantalla();
        }
    }, 1000); 
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

// --- LÓGICA DEL RITUAL DE INICIO ---

// 1. Creamos la función que se ejecutará cada vez que un chulo cambie
function verificarRitual() {
    // Usamos Array.from para convertir la lista en un arreglo que podamos manipular
    // .every() pregunta: "¿Todos los elementos tienen la propiedad 'checked' en true?"
    const todasCompletadas = Array.from(checkboxesRitual).every(checkbox => checkbox.checked);

    // Evaluamos el resultado
    if (todasCompletadas) {
        // Si las 4 están marcadas, le arrancamos el atributo 'disabled' al botón HTML
        btnEntrarZona.removeAttribute('disabled');
    } else {
        // Si falta alguna (o si el usuario desmarca una), le volvemos a poner el candado
        btnEntrarZona.setAttribute('disabled', 'true');
    }
}

// 2. Recorremos la lista de checkboxes y a CADA UNO le ponemos el oído ('change')
checkboxesRitual.forEach(checkbox => {
    checkbox.addEventListener('change', verificarRitual);
});

// 3. El evento del botón "Entrar en Zona"
btnEntrarZona.addEventListener('click', () => {
    // Le añadimos la clase 'oculto' al modal completo para que desaparezca
    modalRitual.classList.add('oculto');
    
    // Un mensaje de confirmación para ti
    console.log("¡Ritual completado! Entrando en zona de enfoque.");
});