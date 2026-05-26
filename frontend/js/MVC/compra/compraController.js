
// Escuchamos cuando el usuario dé clic en "Confirmar Compra"
document.getElementById("form-finalizar-compra").addEventListener("submit", async (e) => {
    e.preventDefault(); 

    // Obtener los productos que están guardados en el carrito
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    
    if (carrito.length === 0) {
        alert("Tu carrito está vacío. No hay productos para procesar.");
        return;
    }

    // Se captura el id del cliente autenticado
    const clienteID = localStorage.getItem("clienteID"); 
    
    // Capturar el método de pago seleccionado del select
    const metodoPago = document.getElementById("metodoPago").value;

    try {
        // Recorre el carrito para enviar cada producto de manera individual a la tabla de la BD
        for (const producto of carrito) {
            
            const datosCompra = {
                clienteID: clienteID,
                productoID: (producto.id),
                cantidad: 1, // Flujo básico: 1 unidad por ítem
                metodoPago: metodoPago,
                totalCompra: producto.precio 
            };

            // Envia los datos a la API (server.js)
            const respuesta = await fetch("http://localhost:3000/api/compras", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datosCompra)
            });

            if (!respuesta.ok) {
                const msgError = await respuesta.text();
                throw new Error(msgError);
            }
        }

        // Si el ciclo termina con éxito, significa que TODO se guardó en SQL Server
        alert("¡Compra procesada con éxito y registrada en la base de datos!");

        // Limpia el carrito del localStorage porque esos productos ya se compraron
        localStorage.removeItem("carrito");

        // Redirecciona al catálogo para que el usuario pueda seguir navegando
        window.location.href = "catalogo.html";

    } catch (error) {
        console.error(error);
        alert("Lo sentimos, hubo un inconveniente al guardar los datos en el servidor");
    }
});