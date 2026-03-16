# 🍅 Tomate - Focus Timer

Una aplicación web de productividad minimalista y modular, diseñada para gestionar la atención sostenida mediante la Técnica Pomodoro. 

## 🧠 Fundamento Cognitivo
Este temporizador no es solo un reloj; está estructurado para mitigar la fatiga ejecutiva y la procrastinación. Implementa un **Ritual de Inicio** obligatorio como anclaje psicológico y utiliza la interrupción controlada (25 min de enfoque / 5 min de descanso) para inducir el **Efecto Zeigarnik**, manteniendo la tensión cognitiva y previniendo el decremento de vigilancia.

## 🏗️ Arquitectura del Proyecto (V3 Modular)
El proyecto está construido utilizando **Vanilla JavaScript (ES6 Modules)**, separando las responsabilidades para garantizar un código limpio y altamente escalable:

* `main.js` (Director): Orquesta la inicialización de la interfaz y la conexión de eventos.
* `timer.js` (Motor): Gestiona la lógica matemática del reloj utilizando `Date.now()` para prevenir la desincronización por inactividad de pestañas del navegador (Throttling).
* `storage.js` (Memoria): Administra la Web Storage API (`localStorage` y `sessionStorage`) para la persistencia de datos y el reinicio diario del progreso.
* `ritual.js` & `splash.js` (Interfaz): Controlan las compuertas lógicas de los checkboxes y las animaciones de estado.

## 🛠️ Tecnologías Utilizadas
* HTML5 Semántico
* CSS3 (Variables, Flexbox, Keyframes, Backdrop-filter)
* JavaScript ES6 (Módulos, Arrow Functions, Web APIs)

## 👤 Creador
Desarrollado por **CCamiloVGarcia**.