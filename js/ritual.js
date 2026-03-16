// ==========================================
// MÓDULO RITUAL: Control de la barrera de inicio
// ==========================================
import { checkboxesRitual, btnEntrarZona, modalRitual } from './elementos.js';

export function inicializarRitual() {
    function verificarRitual() {
        const todasCompletadas = Array.from(checkboxesRitual).every(checkbox => checkbox.checked);

        if (todasCompletadas) {
            btnEntrarZona.removeAttribute('disabled');
        } else {
            btnEntrarZona.setAttribute('disabled', 'true');
        }
    }

    checkboxesRitual.forEach(checkbox => {
        checkbox.addEventListener('change', verificarRitual);
    });

    btnEntrarZona.addEventListener('click', () => {
        modalRitual.classList.add('oculto');
        console.log("¡Ritual completado! Entrando en zona de enfoque.");
    });
}