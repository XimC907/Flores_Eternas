const express = require("express");

const sql = require("msnodesqlv8");

const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const connectionString = 
    "Driver={ODBC Driver 17 for SQL Server};Server=LAURA-SANPC\\SQLEXPRESS;Database=floresEternas;Trusted_Connection=yes;";

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

    // Nota: El campo fechaCompra y estadoCompra ('Cancelado') se insertan solos gracias al DEFAULT que pusimos en el script SQL
    const query = `
        INSERT INTO compras (clienteID, productoID, cantidad, metodoPago, totalCompra)
        VALUES (${clienteID}, ${productoID}, ${cantidad}, '${metodoPago}', ${totalCompra})
    `;

    sql.query(connectionString, query, (err) => {
        if (err) {
            console.error("Error al insertar compra:", err);
            return res.status(500).send(err.message);
        }
        res.send("¡Compra Exitosa!");
    });
});

app.listen(3000, () => {
    console.log("Servidor corriendo");
});