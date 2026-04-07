// ==========================================
// MÓDULO DE ESTADÍSTICAS: Motor Gráfico Puro
// ==========================================
import { btnAbrirEstadisticas, btnCerrarEstadisticas, modalEstadisticas, graficoContenedor } from './elementos.js';

export function inicializarEstadisticas() {
    procesarCambioDeDia(); // 1. Lo primero que hace al cargar la web es revisar la fecha

    btnAbrirEstadisticas.addEventListener('click', () => {
        modalEstadisticas.classList.remove('oculto');
        renderizarGraficoPuro(); 
    });

    btnCerrarEstadisticas.addEventListener('click', cerrarModal);
    modalEstadisticas.addEventListener('click', (evento) => {
        if (evento.target === modalEstadisticas) cerrarModal();
    });
}

function cerrarModal() {
    modalEstadisticas.classList.add('oculto');
}

// ----------------------------------------------------
// EL CEREBRO HISTÓRICO (La Máquina del Tiempo)
// ----------------------------------------------------
function procesarCambioDeDia() {
    const hoy = new Date().toDateString(); // Ej: "Tue Apr 07 2026"
    const fechaGuardada = localStorage.getItem('fechaUltimoAcceso');
    
    // Si no hay historial, creamos un arreglo con 6 ceros (los 6 días anteriores)
    let historial = JSON.parse(localStorage.getItem('historialSemana')) || [0, 0, 0, 0, 0, 0];
    let pomodorosHoy = parseInt(localStorage.getItem('pomodorosHoy')) || 0;

    // Si la fecha guardada es distinta a la de hoy... ¡Es un día nuevo!
    if (fechaGuardada && fechaGuardada !== hoy) {
        // 1. Guardamos el esfuerzo de "ayer" empujándolo al final del historial
        historial.push(pomodorosHoy);
        
        // 2. Como la semana solo tiene 7 días, borramos el día más viejo (el primero de la izquierda)
        if (historial.length > 6) {
            historial.shift();
        }

        // 3. Guardamos el nuevo historial en el disco duro
        localStorage.setItem('historialSemana', JSON.stringify(historial));
        
        // 4. Reseteamos los pomodoros de "Hoy" a 0 para empezar fresco
        localStorage.setItem('pomodorosHoy', '0'); 
    }
    
    // Actualizamos la fecha a hoy para que no vuelva a entrar aquí hasta mañana
    localStorage.setItem('fechaUltimoAcceso', hoy);
}

// ----------------------------------------------------
// CALENDARIO DINÁMICO (Nombres de los días)
// ----------------------------------------------------
function obtenerNombresDias() {
    const nombres = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const etiquetas = [];
    const hoyIndex = new Date().getDay(); // Da un número del 0 al 6

    // Calculamos los nombres de los 6 días anteriores usando matemáticas
    for (let i = 6; i >= 1; i--) {
        let indexAnterior = hoyIndex - i;
        if (indexAnterior < 0) {
            indexAnterior += 7; // Damos la vuelta a la semana (Ej: Si hoy es lunes(1), ayer fue domingo(0))
        }
        etiquetas.push(nombres[indexAnterior]);
    }
    etiquetas.push('Hoy'); // El último siempre es "Hoy"
    return etiquetas;
}

// ----------------------------------------------------
// EL MOTOR GRÁFICO
// ----------------------------------------------------
function renderizarGraficoPuro() {
    graficoContenedor.innerHTML = ''; 

    // Traemos los datos frescos
    const pomodorosDeHoy = parseInt(localStorage.getItem('pomodorosHoy')) || 0;
    let historial = JSON.parse(localStorage.getItem('historialSemana')) || [0, 0, 0, 0, 0, 0];
    
    // Unimos los 6 días viejos con el día de hoy
    const datosSemana = [...historial, pomodorosDeHoy]; 
    const etiquetasDias = obtenerNombresDias(); // Llamamos a tu calendario automático

    const maximoPomodoros = Math.max(...datosSemana);
    const topeCalculo = maximoPomodoros > 0 ? maximoPomodoros : 1;

    datosSemana.forEach((cantidad, index) => {
        const alturaPorcentaje = (cantidad / topeCalculo) * 100;
        const columna = document.createElement('div');
        columna.className = 'columna-grafico';

        columna.innerHTML = `
            <span class="valor-barra">${cantidad}</span>
            <div class="barra" style="height: 0%;"></div>
            <span class="etiqueta-barra">${etiquetasDias[index]}</span>
        `;

        graficoContenedor.appendChild(columna);

        setTimeout(() => {
            const barra = columna.querySelector('.barra');
            const valor = columna.querySelector('.valor-barra');
            barra.style.height = `${alturaPorcentaje}%`;
            valor.style.opacity = '1';
        }, 50); 
    });
}