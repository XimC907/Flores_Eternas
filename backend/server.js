const express = require("express");
const sql = require("msnodesqlv8");
const cors = require("cors");
const crypto = require("crypto");

const app = express();
app.use(cors());
app.use(express.json());

const connectionString = 
    "Driver={ODBC Driver 17 for SQL Server};Server=LAURA-SANPC\\SQLEXPRESS;Database=floresEternas;Trusted_Connection=yes;";

// ==========================================
// 1. RUTAS ORIGINALES (CATÁLOGO Y COMPRAS)
// ==========================================

// Función para censurar/encriptar contraseñas usando el algoritmo SHA-256
function encriptarPassword(password) {
    return crypto.createHash("sha256").update(password).digest("hex");
}
// Obtiene los productos del catálogo
app.get("/api/productos", (req, res) => {
    sql.query(connectionString, "SELECT * FROM productos", (err, rows) => {
        if (err) {
            console.error("Error al traer productos:", err);
            return res.status(500).send(err.message);
        }
        
        const productosFormateados = rows.map(p => ({
            id: p.productoID,
            nombre: p.nombreProd,
            precio: parseFloat(p.precioProd),
            desc: p.descripcionProd,
            img: p.fotoProd
        }));

        res.json(productosFormateados);
    });
});

// Guarda los datos de la compra en la base de datos
app.post("/api/compras", (req, res) => {
    const { clienteID, productoID, cantidad, metodoPago, totalCompra } = req.body;

    // CORRECCIÓN: Envolvimos clienteID y productoID en comillas simples porque ahora son cadenas de texto
    const query = `
        INSERT INTO compras (clienteID, productoID, cantidad, metodoPago, totalCompra)
        VALUES ('${clienteID}', '${productoID}', ${cantidad}, '${metodoPago}', ${totalCompra})
    `;

    sql.query(connectionString, query, (err) => {
        if (err) {
            console.error("Error al insertar compra:", err);
            return res.status(500).send(err.message);
        }
        res.send("¡Compra Exitosa!");
    });
});

// ==========================================
// 2. NUEVAS RUTAS PARA EL LOGIN Y USUARIOS
// ==========================================

// Ruta para Login Tradicional (Verificar correo y contraseña en la tabla clientes)
app.post("/api/login/tradicional", (req, res) => {
    const { email, password } = req.body;

    const query = `SELECT clienteID, nombre, email FROM clientes WHERE email = '${email}' AND password = '${password}'`;

    sql.query(connectionString, query, (err, rows) => {
        if (err) {
            console.error("Error en login tradicional:", err);
            return res.status(500).send("Error interno del servidor");
        }

        if (rows.length === 0) {
            return res.status(401).send("Correo o contraseña incorrectos");
        }

        // Si existe, devolvemos los datos del usuario logueado
        res.json({
            mensaje: "Inicio de sesión exitoso",
            usuario: rows[0]
        });
    });
});

// Ruta para Registrar un Nuevo Cliente Tradicional (Formulario)
app.post("/api/registro/tradicional", (req, res) => {
    const { nombre, email, password } = req.body;

    // 1. Primero verificamos que el correo no esté registrado ya
    const verificarCorreo = `SELECT email FROM clientes WHERE email = '${email}'`;

    sql.query(connectionString, verificarCorreo, (err, rows) => {
        if (err) {
            console.error("Error al verificar correo:", err);
            return res.status(500).send("Error en la base de datos");
        }

        if (rows.length > 0) {
            return res.status(400).send("El correo ya está registrado con otra cuenta.");
        }

        // 2. Si el correo está libre, creamos un ID único para el cliente
        const nuevoClienteID = "cli_" + Math.floor(Math.random() * 100000);
        
        // CORRECCIÓN: Generamos la contraseña oculta/encriptada
        const passwordEncriptada = encriptarPassword(password);
        
        // CORRECCIÓN: Ahora pasamos '${passwordEncriptada}' en lugar de la contraseña limpia
        const queryInsert = `
            INSERT INTO clientes (clienteID, nombre, email, password, proveedor)
            VALUES ('${nuevoClienteID}', '${nombre || 'Nuevo Cliente'}', '${email}', '${passwordEncriptada}', 'tradicional')
        `;

        sql.query(connectionString, queryInsert, (err) => {
            if (err) {
                console.error("Error al registrar cliente:", err);
                return res.status(500).send("No se pudo crear la cuenta");
            }

            res.json({
                mensaje: "Cuenta creada con éxito",
                usuario: { clienteID: nuevoClienteID, nombre: nombre || 'Nuevo Cliente', email }
            });
        });
    });
});

// Ruta para Login con Google (Optimizado para reingresos y estabilidad)
app.post("/api/login/google", (req, res) => {
    const { idGoogle, nombre, email, fotoUrl } = req.body;

    const buscarUsuario = `SELECT clienteID, nombre, email FROM clientes WHERE clienteID = '${idGoogle}'`;

    sql.query(connectionString, buscarUsuario, (err, rows) => {
        if (err) {
            console.error("Error al buscar usuario Google:", err);
            return res.status(500).send("Error en la base de datos");
        }

        // CASO A: El usuario ya existe, iniciamos sesión directamente (Añadida validación de existencia de rows)
        if (rows && rows.length > 0) {
            return res.json({
                mensaje: "Bienvenido de nuevo (Google)",
                usuario: rows[0]
            });
        }

        // CASO B: Es la primera vez que ingresa con Google, lo registramos automáticamente
        // CORRECCIÓN: Agregamos un string por defecto en el campo 'password' para que SQL no de problemas por nulos
        const registrarUsuario = `
            INSERT INTO clientes (clienteID, nombre, email, password, foto_url, proveedor)
            VALUES ('${idGoogle}', '${nombre}', '${email}', 'OAuth_Google_User', '${fotoUrl}', 'google.com')
        `;

        sql.query(connectionString, registrarUsuario, (err) => {
            if (err) {
                console.error("Error al registrar nuevo usuario Google:", err);
                return res.status(500).send("No se pudo registrar el usuario");
            }

            res.json({
                mensaje: "Usuario registrado e iniciado con éxito vía Google",
                usuario: { clienteID: idGoogle, nombre, email }
            });
        });
    });
});

// Servidor escuchando en el puerto 3000
app.listen(3000, () => {
    console.log("Servidor corriendo perfectamente en el puerto 3000");
});