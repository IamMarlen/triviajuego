let preguntas = [];
let misRespuestas = [];
let puntaje = 0;
let preguntaActual = 0;

document.addEventListener("DOMContentLoaded", function(){
    let token = sessionStorage.getItem("token");
    if (!token) {
        generarToken();
    }
});

function generarPreguntas(categoria, dificultad, tipo, cantidad) {
    // Limpiar preguntas anteriores
    preguntas = [];

    // Generar nuevas preguntas
    for (let i = 1; i <= cantidad; i++) {
        preguntas.push({
            pregunta: `Pregunta ${i} de ${categoria} - ${dificultad} - ${tipo}`,
            opciones: ["Opción A", "Opción B", "Opción C", "Opción D"],
            respuestaCorrecta: "Opción A"
        });
    }

    // Mostrar la primera pregunta
    mostrarPregunta();
}

function mostrarPregunta() {
    // Verificar si hay preguntas disponibles
    if (preguntaActual < preguntas.length) {
        console.log(preguntas[preguntaActual].pregunta);
        console.log("Opciones:", preguntas[preguntaActual].opciones);
    } else {
        console.log("Preguntas agotadas. Puntaje final:", puntaje);
    }
}

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

    // Mostrar la siguiente pregunta o puntaje final
    mostrarPregunta();
}

document.addEventListener("DOMContentLoaded", function(){
    let token = sessionStorage.getItem("token");
    if (!token) {
        generarToken();
    }

    const formulario = document.querySelector("form");

    formulario.addEventListener("submit", function(event) {
        event.preventDefault();

        const categoriaSeleccionada = document.getElementById("select1").value;
        const dificultadSeleccionada = document.getElementById("select2").value;
        const tipoSeleccionado = document.getElementById("select3").value;

        if (categoriaSeleccionada && dificultadSeleccionada && tipoSeleccionado) {
            const cantidadPreguntas = 10;
            generarPreguntas(categoriaSeleccionada, dificultadSeleccionada, tipoSeleccionado, cantidadPreguntas);
            document.getElementById("questionario").removeAttribute("hidden");
        } else {
            alert("Por favor, selecciona una categoría, dificultad y tipo de trivia.");
        }
    });
});
