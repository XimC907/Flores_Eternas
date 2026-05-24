const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", function(event){

    event.preventDefault();

    let nombre = document.getElementById("nombre").value.trim();
    let correo = document.getElementById("correo").value.trim();
    let mensaje = document.getElementById("mensaje").value.trim();

    if(nombre === "" || correo === "" || mensaje === ""){
        alert("Faltan campos por rellenar");
    }else{
        alert("Enviado correctamente");
        formulario.reset();
    }

});