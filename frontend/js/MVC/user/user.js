const API_URL = "http://localhost:3000/api";

// =========================================================
// 1. LOGIN TRADICIONAL O REGISTRO AUTOMÁTICO SI ES NUEVO
// =========================================================
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita que la página se recargue sola

    const email = document.getElementById('userEmail').value;
    const password = document.getElementById('userPass').value;

    try {
        // 1. Intentamos iniciar sesión (Login tradicional)
        const response = await fetch(`${API_URL}/login/tradicional`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const data = await response.json();
            alert(`¡Bienvenido de nuevo, ${data.usuario.nombre}!`);

            // Guardamos el id del cliente en la memoria del navegador
            localStorage.setItem('clienteID', data.usuario.clienteID);
            // Redirige correctamente a tu tienda principal
            window.location.href = "../../../index.html";
        } else {
            // 2. Si el servidor dice que no existe (Status 401), lo registramos como cliente nuevo
            alert("Usuario no encontrado en Nicore Flowers. Creando una cuenta nueva para ti...");
            
            // Generamos un nombre temporal a partir del correo electrónico
            const nombreTemporal = email.split('@')[0];

            const registroResponse = await fetch(`${API_URL}/registro/tradicional`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, nombre: nombreTemporal })
            });

            if (registroResponse.ok) {
                const registroData = await registroResponse.json();
                alert(`¡Cuenta creada con éxito!\nBienvenida a Flores Eternas.`);
                
                // Guardamos el nuevo ID y volvemos al inicio de la tienda
                localStorage.setItem('clienteID', registroData.usuario.clienteID);
                window.location.href = "../../../index.html";
            } else {
                const errorText = await registroResponse.text();
                alert("Error al intentar registrarse: " + errorText);
            }
        }
    } catch (error) {
        console.error("Error de conexión:", error);
        alert("No se pudo conectar con el servidor local. Deja tu terminal abierta y verifica tu Git Bash.");
    }
});

// =========================================================
// 2. LOGUEARSE O REGISTRARSE CON GOOGLE (Simulación Conectada)
// =========================================================
document.getElementById('googleBtn').addEventListener('click', async () => {
    alert("Conectando con Google... Generando registro automático en base de datos.");

    // Generamos un usuario de prueba dinámico para simular que Google nos dio sus datos
    const usuarioGoogleSimulado = {
        idGoogle: "google_user_lore_" + Math.floor(Math.random() * 10000), // Crea un ID único aleatorio
        nombre: "Lorena Flores",
        email: "lorena.prueba@gmail.com",
        fotoUrl: "https://via.placeholder.com/150"
    };

    try {
        // Mandamos este objeto directo a tu endpoint en server.js para que haga el INSERT
        const response = await fetch(`${API_URL}/login/google`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(usuarioGoogleSimulado)
        });

        if (response.ok) {
            const data = await response.json();
            alert(`¡Registro Exitoso vía Google! Guardado en SQL Server.\nBienvenido: ${data.usuario.nombre}`);
            localStorage.setItem('clienteID', data.usuario.clienteID);
            // Redirige correctamente a tu tienda principal
            window.location.href = "../../../index.html";
        } else {
            alert("El servidor rechazó el registro de Google.");
        }
    } catch (error) {
        console.error("Error de conexión:", error);
        alert("Error al intentar comunicarse con el servidor Node.js.");
    }
});

