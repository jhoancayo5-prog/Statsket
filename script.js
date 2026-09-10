// ========================================
// STATSKET 🏀
// ========================================


// ========================================
// DATOS
// ========================================

let tirosTotales =
    Number(localStorage.getItem("tirosTotales")) || 0;


let tirosAnotados =
    Number(localStorage.getItem("tirosAnotados")) || 0;


let puntos =
    Number(localStorage.getItem("puntos")) || 0;


// ========================================
// ESTADÍSTICAS POR TIPO
// ========================================

let estadisticas =
    JSON.parse(
        localStorage.getItem("estadisticasTipos")
    ) || {

        dos: {
            intentos: 0,
            anotados: 0
        },

        tres: {
            intentos: 0,
            anotados: 0
        },

        libre: {
            intentos: 0,
            anotados: 0
        }

    };


// ========================================
// CAMBIAR PANTALLA
// ========================================

function mostrarPantalla(id) {

    const pantallas =
        document.querySelectorAll(".pantalla");


    pantallas.forEach(function(pantalla) {

        pantalla.style.display = "none";

    });


    const pantalla =
        document.getElementById(id);


    if (pantalla) {

        pantalla.style.display = "block";

    }


    if (id === "pantallaEstadisticas") {

        actualizarEstadisticasPagina();

    }


    if (id === "pantallaProgreso") {

        mostrarProgreso();

    }


    if (id === "pantallaHistorial") {

        mostrarHistorial();

    }

}


// ========================================
// CONTINUAR PERFIL
// ========================================

function continuarPerfil() {

    const nombre =
        document
        .getElementById("nombreJugador")
        .value
        .trim();


    const posicion =
        document
        .getElementById("posicionJugador")
        .value;


    if (nombre === "") {

        alert("Escribe tu nombre.");

        return;

    }


    if (posicion === "") {

        alert("Selecciona tu posición.");

        return;

    }


    localStorage.setItem(
        "nombreJugador",
        nombre
    );


    localStorage.setItem(
        "posicionJugador",
        posicion
    );


    actualizarPerfil();


    mostrarPantalla(
        "pantallaInicio"
    );

}


// ========================================
// ACTUALIZAR PERFIL
// ========================================

function actualizarPerfil() {

    const nombre =
        localStorage.getItem(
            "nombreJugador"
        ) || "Jugador";


    const posicion =
        localStorage.getItem(
            "posicionJugador"
        ) || "-";


    const saludo =
        document.getElementById(
            "saludoJugador"
        );


    const posicionInicio =
        document.getElementById(
            "posicionInicio"
        );


    if (saludo) {

        saludo.textContent =
            "¡Hola, " + nombre + "! 🏀";

    }


    if (posicionInicio) {

        posicionInicio.textContent =
            "Posición: " + posicion;

    }


    actualizarDashboard();

}


// ========================================
// EDITAR PERFIL
// ========================================

function editarPerfil() {

    const nombre =
        localStorage.getItem(
            "nombreJugador"
        );


    const posicion =
        localStorage.getItem(
            "posicionJugador"
        );


    document.getElementById(
        "nombreJugador"
    ).value = nombre || "";


    document.getElementById(
        "posicionJugador"
    ).value = posicion || "";


    mostrarPantalla(
        "pantallaPerfil"
    );

}


// ========================================
// REGISTRAR TIRO
// ========================================

function tiroTipo(
    tipo,
    anotado,
    valor
) {

    tirosTotales++;


    estadisticas[tipo].intentos++;


    if (anotado) {

        tirosAnotados++;


        puntos += valor;


        estadisticas[tipo].anotados++;

    }


    guardarDatos();


    actualizarEstadisticas();


    actualizarDashboard();

}


// ========================================
// GUARDAR DATOS
// ========================================

function guardarDatos() {

    localStorage.setItem(
        "tirosTotales",
        tirosTotales
    );


    localStorage.setItem(
        "tirosAnotados",
        tirosAnotados
    );


    localStorage.setItem(
        "puntos",
        puntos
    );


    localStorage.setItem(
        "estadisticasTipos",
        JSON.stringify(
            estadisticas
        )
    );

}


// ========================================
// CALCULAR PORCENTAJE
// ========================================

function calcularPorcentaje(
    anotados,
    intentos
) {

    if (intentos === 0) {

        return 0;

    }


    return (
        anotados /
        intentos
    ) * 100;

}


// ========================================
// ACTUALIZAR ESTADÍSTICAS
// ========================================

function actualizarEstadisticas() {

    const porcentaje =
        calcularPorcentaje(
            tirosAnotados,
            tirosTotales
        );


    const tiros =
        document.getElementById(
            "tiros"
        );


    const anotados =
        document.getElementById(
            "anotados"
        );


    const puntosElemento =
        document.getElementById(
            "puntos"
        );


    const porcentajeElemento =
        document.getElementById(
            "porcentaje"
        );


    const probabilidad =
        document.getElementById(
            "probabilidad"
        );


    if (tiros) {

        tiros.textContent =
            tirosTotales;

    }


    if (anotados) {

        anotados.textContent =
            tirosAnotados;

    }


    if (puntosElemento) {

        puntosElemento.textContent =
            puntos;

    }


    if (porcentajeElemento) {

        porcentajeElemento.textContent =
            porcentaje.toFixed(1) + "%";

    }


    if (probabilidad) {

        probabilidad.textContent =
            porcentaje.toFixed(1) + "%";

    }


    const mensaje =
        document.getElementById(
            "mensaje"
        );


    if (mensaje) {

        if (tirosTotales === 0) {

            mensaje.textContent =
                "Registra algunos tiros.";

        }

        else if (porcentaje >= 80) {

            mensaje.textContent =
                "🔥 ¡Excelente precisión!";

        }

        else if (porcentaje >= 60) {

            mensaje.textContent =
                "💪 ¡Buen rendimiento!";

        }

        else if (porcentaje >= 40) {

            mensaje.textContent =
                "🏀 Vas mejorando.";

        }

        else {

            mensaje.textContent =
                "🎯 Sigue practicando.";

        }

    }


    actualizarTipos();


    actualizarEstadisticasPagina();

}


// ========================================
// ESTADÍSTICAS POR TIPO
// ========================================

function actualizarTipos() {

    const dos =
        calcularPorcentaje(
            estadisticas.dos.anotados,
            estadisticas.dos.intentos
        );


    const tres =
        calcularPorcentaje(
            estadisticas.tres.anotados,
            estadisticas.tres.intentos
        );


    const libre =
        calcularPorcentaje(
            estadisticas.libre.anotados,
            estadisticas.libre.intentos
        );


    const elementoDos =
        document.getElementById(
            "porcentajeDos"
        );


    const elementoTres =
        document.getElementById(
            "porcentajeTres"
        );


    const elementoLibre =
        document.getElementById(
            "porcentajeLibre"
        );


    if (elementoDos) {

        elementoDos.textContent =
            dos.toFixed(1) + "%";

    }


    if (elementoTres) {

        elementoTres.textContent =
            tres.toFixed(1) + "%";

    }


    if (elementoLibre) {

        elementoLibre.textContent =
            libre.toFixed(1) + "%";

    }

}


// ========================================
// ESTADÍSTICAS GENERALES
// ========================================

function actualizarEstadisticasPagina() {

    const porcentaje =
        calcularPorcentaje(
            tirosAnotados,
            tirosTotales
        );


    const tiros =
        document.getElementById(
            "statsTiros"
        );


    const anotados =
        document.getElementById(
            "statsAnotados"
        );


    const puntosElemento =
        document.getElementById(
            "statsPuntos"
        );


    const porcentajeElemento =
        document.getElementById(
            "statsPorcentaje"
        );


    const nivel =
        document.getElementById(
            "nivelJugador"
        );


    if (tiros) {

        tiros.textContent =
            tirosTotales;

    }


    if (anotados) {

        anotados.textContent =
            tirosAnotados;

    }


    if (puntosElemento) {

        puntosElemento.textContent =
            puntos;

    }


    if (porcentajeElemento) {

        porcentajeElemento.textContent =
            porcentaje.toFixed(1) + "%";

    }


    let textoNivel =
        "⭐ Principiante";


    if (porcentaje >= 80) {

        textoNivel =
            "⭐⭐⭐⭐⭐ Élite";

    }

    else if (porcentaje >= 65) {

        textoNivel =
            "⭐⭐⭐⭐ Excelente";

    }

    else if (porcentaje >= 50) {

        textoNivel =
            "⭐⭐⭐ Buen nivel";

    }

    else if (porcentaje >= 35) {

        textoNivel =
            "⭐⭐ En progreso";

    }


    if (nivel) {

        nivel.textContent =
            textoNivel;

    }

}


// ========================================
// DASHBOARD
// ========================================

function actualizarDashboard() {

    const porcentaje =
        calcularPorcentaje(
            tirosAnotados,
            tirosTotales
        );


    const tiros =
        document.getElementById(
            "inicioTiros"
        );


    const anotados =
        document.getElementById(
            "inicioAnotados"
        );


    const puntosElemento =
        document.getElementById(
            "inicioPuntos"
        );


    const porcentajeElemento =
        document.getElementById(
            "inicioPorcentaje"
        );


    const nivel =
        document.getElementById(
            "nivelInicio"
        );


    const barra =
        document.getElementById(
            "barraNivel"
        );


    if (tiros) {

        tiros.textContent =
            tirosTotales;

    }


    if (anotados) {

        anotados.textContent =
            tirosAnotados;

    }


    if (puntosElemento) {

        puntosElemento.textContent =
            puntos;

    }


    if (porcentajeElemento) {

        porcentajeElemento.textContent =
            porcentaje.toFixed(1) + "%";

    }


    let textoNivel =
        "⭐ Principiante";


    let progreso =
        10;


    if (porcentaje >= 80) {

        textoNivel =
            "⭐⭐⭐⭐⭐ Élite";

        progreso =
            100;

    }

    else if (porcentaje >= 65) {

        textoNivel =
            "⭐⭐⭐⭐ Excelente";

        progreso =
            80;

    }

    else if (porcentaje >= 50) {

        textoNivel =
            "⭐⭐⭐ Buen nivel";

        progreso =
            60;

    }

    else if (porcentaje >= 35) {

        textoNivel =
            "⭐⭐ En progreso";

        progreso =
            40;

    }


    if (nivel) {

        nivel.textContent =
            textoNivel;

    }


    if (barra) {

        barra.style.width =
            progreso + "%";

    }

}


// ========================================
// REINICIAR
// ========================================

function reiniciar() {

    tirosTotales =
        0;


    tirosAnotados =
        0;


    puntos =
        0;


    estadisticas = {

        dos: {
            intentos: 0,
            anotados: 0
        },

        tres: {
            intentos: 0,
            anotados: 0
        },

        libre: {
            intentos: 0,
            anotados: 0
        }

    };


    guardarDatos();


    actualizarEstadisticas();


    actualizarDashboard();

}


// ========================================
// GUARDAR PARTIDO
// ========================================

function guardarPartido() {

    const nombreInput =
        document.getElementById(
            "nombrePartido"
        );


    const nombre =
        nombreInput.value.trim();


    if (nombre === "") {

        alert(
            "Escribe un nombre para el partido."
        );

        return;

    }


    const porcentaje =
        calcularPorcentaje(
            tirosAnotados,
            tirosTotales
        );


    const partido = {

        nombre:
            nombre,

        fecha:
            new Date()
            .toLocaleDateString(),

        tiros:
            tirosTotales,

        anotados:
            tirosAnotados,

        porcentaje:
            porcentaje.toFixed(1),

        puntos:
            puntos

    };


    const historial =
        JSON.parse(
            localStorage.getItem(
                "historial"
            )
        ) || [];


    historial.push(
        partido
    );


    localStorage.setItem(
        "historial",
        JSON.stringify(
            historial
        )
    );


    nombreInput.value =
        "";


    mostrarHistorial();


    alert(
        "🏀 Partido guardado correctamente."
    );

}


// ========================================
// MOSTRAR HISTORIAL
// ========================================

function mostrarHistorial() {

    const contenedor =
        document.getElementById(
            "historial"
        );


    if (!contenedor) {

        return;

    }


    const historial =
        JSON.parse(
            localStorage.getItem(
                "historial"
            )
        ) || [];


    if (historial.length === 0) {

        contenedor.innerHTML = `

            <div class="progreso-vacio">

                <h2>
                    📋 Historial vacío
                </h2>

                <p>
                    Todavía no tienes partidos guardados.
                </p>

            </div>

        `;

        return;

    }


    let contenido =
        "";


    historial.forEach(
        function(partido, indice) {

            contenido += `

                <div class="partido">

                    <h3>
                        🏀 ${partido.nombre}
                    </h3>

                    <p>
                        📅 ${partido.fecha}
                    </p>

                    <p>
                        🎯 Tiros:
                        ${partido.tiros}
                    </p>

                    <p>
                        ✅ Anotados:
                        ${partido.anotados}
                    </p>

                    <p>
                        📈 Acierto:
                        ${partido.porcentaje}%
                    </p>

                    <p>
                        ⭐ Puntos:
                        ${partido.puntos}
                    </p>

                    <button
                        onclick="eliminarPartido(${indice})"
                    >
                        🗑️ Eliminar
                    </button>

                </div>

            `;

        }
    );


    contenedor.innerHTML =
        contenido;

}


// ========================================
// ELIMINAR PARTIDO
// ========================================

function eliminarPartido(indice) {

    const historial =
        JSON.parse(
            localStorage.getItem(
                "historial"
            )
        ) || [];


    historial.splice(
        indice,
        1
    );


    localStorage.setItem(
        "historial",
        JSON.stringify(
            historial
        )
    );


    mostrarHistorial();


    mostrarProgreso();

}


// ========================================
// MI PROGRESO
// ========================================

function mostrarProgreso() {

    const progreso =
        document.getElementById(
            "progreso"
        );


    if (!progreso) {

        return;

    }


    const historial =
        JSON.parse(
            localStorage.getItem(
                "historial"
            )
        ) || [];


    if (historial.length === 0) {

        progreso.innerHTML = `

            <div class="progreso-vacio">

                <h2>
                    📊 Todavía no hay datos
                </h2>

                <p>
                    Guarda un partido para comenzar
                    a ver tu progreso.
                </p>

            </div>

        `;

        return;

    }


    let contenido = `

        <div class="progreso-contenedor">

            <h2>
                📈 Tu progreso
            </h2>

    `;


    historial.forEach(
        function(partido) {

            const porcentaje =
                Number(
                    partido.porcentaje
                );


            const puntosBarra =
                Math.min(
                    Number(
                        partido.puntos
                    ),
                    100
                );


            contenido += `

                <div class="progreso-partido">

                    <h3>
                        🏀 ${partido.nombre}
                    </h3>

                    <p>
                        📅 ${partido.fecha}
                    </p>


                    <div class="dato">

                        <span>
                            ⭐ Puntos
                        </span>

                        <strong>
                            ${partido.puntos}
                        </strong>

                    </div>


                    <div class="barra-fondo">

                        <div
                            class="barra-puntos"
                            style="width:${puntosBarra}%"
                        ></div>

                    </div>


                    <div class="dato">

                        <span>
                            🎯 Acierto
                        </span>

                        <strong>
                            ${porcentaje}%
                        </strong>

                    </div>


                    <div class="barra-fondo">

                        <div
                            class="barra-acierto"
                            style="width:${porcentaje}%"
                        ></div>

                    </div>


                    <p>

                        🎯 Tiros:
                        ${partido.tiros}

                        <br>

                        ✅ Anotados:
                        ${partido.anotados}

                    </p>

                </div>

            `;

        }
    );


    contenido += `

        </div>

    `;


    progreso.innerHTML =
        contenido;

}


// ========================================
// INICIAR APP
// ========================================

function iniciarApp() {

    const nombre =
        localStorage.getItem(
            "nombreJugador"
        );


    const posicion =
        localStorage.getItem(
            "posicionJugador"
        );


    if (
        nombre &&
        posicion
    ) {

        actualizarPerfil();


        mostrarPantalla(
            "pantallaInicio"
        );

    }

    else {

        mostrarPantalla(
            "pantallaPerfil"
        );

    }


    actualizarEstadisticas();


    actualizarDashboard();


    mostrarHistorial();

}


// ========================================
// INICIAR
// ========================================

iniciarApp();