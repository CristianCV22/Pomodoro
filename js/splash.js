// Atrapamos el elemento en el HTML
const bienvenida = document.getElementById('bienvenida');

export function desplegarTelonInicial() {
    if (!bienvenida) return; // Cláusula de Guardia 1: Si no hay HTML, no hacemos nada

    // 1. EL CALENDARIO: Obtenemos la fecha exacta de hoy (Ej: "Wed Apr 08 2026")
    const hoy = new Date().toDateString(); 
    
    // 2. LA LIBRETA: Buscamos en el disco duro cuándo fue la última vez que vio la bienvenida
    const ultimoSplashVisto = localStorage.getItem('ultimoSplashVisto');

    // 3. LA DECISIÓN LÓGICA: ¿El día guardado es exactamente igual al día de hoy?
    if (ultimoSplashVisto === hoy) {
        // Si sí es igual, significa que ya lo vio hoy. 
        // Destruimos el HTML INMEDIATAMENTE sin esperar los 3 segundos.
        bienvenida.remove();
        return; // Cláusula de Guardia 2: Detenemos la función aquí. ¡No leas más abajo!
    }

    // 4. EL REGISTRO: Si llegó hasta aquí, significa que NO lo ha visto hoy.
    // Anotamos en la libreta que hoy es el día en que vio la animación.
    localStorage.setItem('ultimoSplashVisto', hoy);

    // 5. LA COREOGRAFÍA: Ejecutamos el show exactamente como lo teníamos
    setTimeout(() => {
        bienvenida.classList.add('desvanecer');

        setTimeout(() => {
            bienvenida.remove();
        }, 2000); // Los 2 segundos para que la salida lenta brille

    }, 3000); // Los 3 segundos de lectura
}