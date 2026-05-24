const horariosDisponibles = [
    "8:00AM",
    "9:00AM",
    "10:00AM",
    "11:00AM",
    "12:00PM",
    "1:00PM",
    "2:00PM",
    "3:00PM",
    "4:00PM",
    "5:00PM"
];

const selectHora = document.getElementById("hora");

horariosDisponibles.forEach(hora => {
    const option = document.createElement("option");

    option.value = hora;
    option.textContent = hora;

    selectHora.appendChild(option);

});

const fechaInput = document.getElementById("fecha");

const hoy = new Date().toISOString().split("T")[0];

fechaInput.min = hoy;

document.getElementById("formulario").addEventListener("submit", function(e){

    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const fecha = document.getElementById("fecha").value;
    const direccion = document.getElementById("direccion").value;
    const hora = document.getElementById("hora").value;
    const tamano = document.getElementById("tamano").value;
    const ocasion = document.getElementById("ocasion").value;
    const mensaje = document.getElementById("mensaje").value;

    // Obtener complementos seleccionados

    const complementos = [];

    document.querySelectorAll('input[name="complemento"]:checked')

    .forEach((checkbox) => {

        complementos.push(
            checkbox.value
        );

    });

    const texto = `NUEVO PEDIDO

    Nombre y apellido: ${nombre}
    Fecha de entrega: ${fecha}
    Dirección de entrega: ${direccion}
    Hora de entrega: ${hora}
    Tamaño del ramo: ${tamano}
    Ocasión: ${ocasion}
    Complementos: ${complementos.join(", ")}
    Mensaje: ${mensaje}
    `;

    const numero = "573206104806";

    const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;

    window.open(url, "_blank");

});

// Mostrar las flores

const datos = JSON.parse(localStorage.getItem("flores"));

let mensaje = "Colores de las flores seleccionadas:\n";

for(let flor in datos){

    mensaje +=
    `${flor}: ${datos[flor].join(", ")}\n`;

}

document.getElementById("mensaje").value = mensaje;