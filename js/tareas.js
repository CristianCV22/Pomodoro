// ==========================================
// MÓDULO DE TAREAS: Lógica del Gestor GTD
// ==========================================
import { inputNuevaTarea, btnAgregarTarea, listaTareas, tareaActivaDisplay } from './elementos.js';

let tareasGuardadas = JSON.parse(localStorage.getItem('misTareas')) || [];
// NUEVA MEMORIA: ¿Qué tarea estaba seleccionada?
let idTareaActiva = localStorage.getItem('idTareaActiva') || null;

export function inicializarTareas() {
    tareasGuardadas.forEach(tarea => renderizarTarea(tarea.id, tarea.texto));
    btnAgregarTarea.addEventListener('click', agregarNuevaTarea);
    inputNuevaTarea.addEventListener('keypress', (evento) => {
        if (evento.key === 'Enter') agregarNuevaTarea();
    });
}

function agregarNuevaTarea() {
    const texto = inputNuevaTarea.value.trim();
    if (texto === '') return;

    const nuevaTarea = { id: Date.now(), texto: texto };
    tareasGuardadas.push(nuevaTarea);
    localStorage.setItem('misTareas', JSON.stringify(tareasGuardadas));

    renderizarTarea(nuevaTarea.id, nuevaTarea.texto);
    inputNuevaTarea.value = '';
}

function renderizarTarea(id, texto) {
    const li = document.createElement('li');
    li.className = 'item-tarea';
    
    // Si esta era la tarea activa antes de recargar la página, la volvemos a marcar
    if (id == idTareaActiva) {
        li.classList.add('activa');
        tareaActivaDisplay.textContent = `Enfoque: ${texto}`;
    }

    // Le pusimos la clase "texto-tarea" al span para poder darle clic a él sin darle a la papelera
    li.innerHTML = `
        <span class="texto-tarea">${texto}</span>
        <button class="btn-eliminar-tarea">🗑️</button>
    `;

    // 1. Evento para SELECCIONAR la tarea (clic en el texto)
    const spanTexto = li.querySelector('.texto-tarea');
    spanTexto.addEventListener('click', () => seleccionarTarea(id, texto, li));

    // 2. Evento para BORRAR la tarea (clic en la papelera)
    const btnEliminar = li.querySelector('.btn-eliminar-tarea');
    btnEliminar.addEventListener('click', () => eliminarTarea(id, li));

    listaTareas.appendChild(li);
}

// NUEVA FUNCIÓN: La Magia de Elegir el Enfoque
function seleccionarTarea(id, texto, elementoLi) {
    // 1. Le quitamos la clase "activa" a todas las tareas de la lista
    document.querySelectorAll('.item-tarea').forEach(el => el.classList.remove('activa'));
    
    // 2. Se la ponemos solo a la que acabas de tocar
    elementoLi.classList.add('activa');
    
    // 3. Mandamos el texto al reloj
    tareaActivaDisplay.textContent = `Enfoque: ${texto}`;
    
    // 4. Guardamos en el disco duro tu decisión
    localStorage.setItem('idTareaActiva', id);
    idTareaActiva = id;
}

function eliminarTarea(id, elementoLi) {
    tareasGuardadas = tareasGuardadas.filter(tarea => tarea.id !== id);
    localStorage.setItem('misTareas', JSON.stringify(tareasGuardadas));
    elementoLi.remove();

    // Si borraste justo la tarea que estabas haciendo, el reloj vuelve a "Modo Libre"
    if (id == idTareaActiva) {
        idTareaActiva = null;
        localStorage.removeItem('idTareaActiva');
        tareaActivaDisplay.textContent = 'Enfoque: Modo Libre';
    }
}