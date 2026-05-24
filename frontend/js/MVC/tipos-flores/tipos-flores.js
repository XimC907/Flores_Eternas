const floresSeleccionadas = {};

const coloresActuales = {};

function cambiarVista(
    idImagen,
    nuevaImagen,
    color,
    nombreFlor
){

    // Cambiar imagen
    document.getElementById(idImagen).src =
    nuevaImagen;

    // Guardar SOLO el color actual visualizado
    coloresActuales[nombreFlor] = color;

}

function agregarFlor(nombreFlor){

    const color = coloresActuales[nombreFlor];

    // Validar si eligió color
    if(!color){

        alert("Primero selecciona un color");

        return;

    }

    // Crear array si no existe
    if(!floresSeleccionadas[nombreFlor]){

        floresSeleccionadas[nombreFlor] = [];

    }

    // Evita repetir color

    if(
        !floresSeleccionadas[nombreFlor].includes(color)
    ){
        // Agregar color
        floresSeleccionadas[nombreFlor]
        .push(color);

        console.log(floresSeleccionadas);

    }

}

function irAlFormulario(){

    localStorage.setItem(
        "flores",
        JSON.stringify(floresSeleccionadas)
    );

    window.location.href = "contacto.html";

}