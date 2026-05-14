document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('userEmail').value;
    console.log("Intentando iniciar sesión con:", email);
    alert("¡Bienvenido de nuevo! (Próximamente conectaremos con la base de datos)");
});

// Simulación de Google Login
document.getElementById('googleBtn').addEventListener('click', function() {
    console.log("Iniciando flujo de Google...");
    // Aquí se integrará la API de Google más adelante
    alert("Abriendo ventana de Google para verificar tu Gmail...");
});