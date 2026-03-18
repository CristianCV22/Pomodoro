// ==========================================
// MÓDULO RITUAL: Control de la barrera de inicio
// ==========================================
import { checkboxesRitual, btnEntrarZona, modalRitual, contenedorPrincipal } from './elementos.js';

export function inicializarRitual() {
    
    // 1. LA MAGIA DEL DÍA 1 (V4): Memoria a largo plazo (Diaria)
    const fechaHoy = new Date().toDateString();
    const fechaRitual = localStorage.getItem('fechaRitual');

    // Si la fecha guardada NO es igual a la de hoy (o no hay fecha), es un día nuevo.
    // Le quitamos el 'oculto' para obligarte a hacer el ritual.
    if (fechaRitual !== fechaHoy) {
        modalRitual.classList.remove('oculto');
    }

    // 2. La compuerta lógica de los checkboxes
    function verificarRitual() {
        const todasCompletadas = Array.from(checkboxesRitual).every(checkbox => checkbox.checked);

        if (todasCompletadas) {
            btnEntrarZona.removeAttribute('disabled');
        } else {
            btnEntrarZona.setAttribute('disabled', 'true');
        }
    }

    // 3. Conectamos los checkboxes
    checkboxesRitual.forEach(checkbox => {
        checkbox.addEventListener('change', verificarRitual);
    });

    // 4. El evento del botón
    btnEntrarZona.addEventListener('click', () => {
        // Desaparece el modal
        modalRitual.classList.add('oculto');
        
        // Guardamos la fecha de HOY en el disco duro
        localStorage.setItem('fechaRitual', fechaHoy);

        // LA SOLUCIÓN: Disparamos la coreografía exactamente en este instante
        contenedorPrincipal.classList.add('animar-entrada');
        
        console.log("¡Ritual completado! Entrando en zona de enfoque.");
    });
}