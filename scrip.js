let preguntas = [];
let misRespuestas = [];
let puntaje = 0;
let preguntaActual = 0; // Para llevar un registro de la pregunta actual

// Agregar una función para generar preguntas y respuestas
function generarPreguntas(categoria, dificultad, tipo, cantidad) {
    // Aquí deberías agregar la lógica para obtener preguntas de tu fuente de datos
    // y llenar el array 'preguntas' con objetos que tengan la pregunta y las opciones de respuesta.
    // Por ahora, solo añadiré preguntas de ejemplo para mostrar el flujo.
    for (let i = 1; i <= cantidad; i++) {
        preguntas.push({
            pregunta: `Pregunta ${i} de ${categoria} - ${dificultad} - ${tipo}`,
            opciones: ["Opción A", "Opción B", "Opción C", "Opción D"],
            respuestaCorrecta: "Opción A" // Aquí deberías establecer la respuesta correcta
        });
    }
}

// Agregar una función para mostrar la pregunta actual
function mostrarPregunta() {
    // Aquí deberías manipular el DOM para mostrar la pregunta y las opciones en tu interfaz.
    // Por ahora, solo imprimiré la pregunta actual en la consola.
    console.log(preguntas[preguntaActual].pregunta);
    console.log("Opciones:", preguntas[preguntaActual].opciones);
}

// Agregar una función para evaluar la respuesta del usuario
function evaluarRespuesta(respuestaUsuario) {
    const respuestaCorrecta = preguntas[preguntaActual].respuestaCorrecta;

    if (respuestaUsuario === respuestaCorrecta) {
        puntaje += 100;
        console.log("¡Respuesta correcta! Puntaje actual:", puntaje);
    } else {
        console.log("Respuesta incorrecta. Puntaje actual:", puntaje);
    }

    // Pasar a la siguiente pregunta
    preguntaActual++;

    if (preguntaActual < preguntas.length) {
        // Si hay más preguntas, mostrar la siguiente
        mostrarPregunta();
    } else {
        // Si no hay más preguntas, mostrar puntaje final
        console.log("Puntaje final:", puntaje);
    }
}

document.addEventListener("DOMContentLoaded", function(){
    let token = sessionStorage.getItem("token");
    if (token) {
        console.log("Token encontrado:", token);
    } else {
        // generarToken(); // Necesitas implementar la función generarToken
    }

    const formulario = document.querySelector("form");

    formulario.addEventListener("submit", function(event) {
        event.preventDefault();

        const categoriaSeleccionada = document.getElementById("select1").value;
        const dificultadSeleccionada = document.getElementById("select2").value;
        const tipoSeleccionado = document.getElementById("select3").value;

        if (categoriaSeleccionada && dificultadSeleccionada && tipoSeleccionado) {
            preguntas = []; // Reiniciar el array de preguntas
            const cantidadPreguntas = 10;

            generarPreguntas(categoriaSeleccionada, dificultadSeleccionada, tipoSeleccionado, cantidadPreguntas);
            mostrarPregunta();

            // Mostrar la sección del cuestionario
            document.getElementById("questionario").removeAttribute("hidden");
        } else {
            alert("Por favor, selecciona una categoría, dificultad y tipo de trivia.");
        }
    });
});

// Puedes llamar a evaluarRespuesta() cuando el usuario responda a una pregunta, 
// pasándole la opción seleccionada por el usuario como argumento. Por ejemplo:
// evaluarRespuesta("Opción A");
