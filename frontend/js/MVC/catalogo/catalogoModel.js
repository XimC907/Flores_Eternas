

export const catalogoModel = {
    productos: [],

    async cargarProductosDesdeBD() {
        try {
            const res = await fetch("http://localhost:3000/api/productos");
            this.productos = await res.json();
        } catch (error) {
            console.error("Error cargando productos desde el backend:", error);
        }
    },

    getPrecioMaximo() {
        if (this.productos.length === 0) return 0; // Si la base de datos no ha devuelto los productos devuelve 0
        return Math.max(...this.productos.map(p => p.precio));
    }
};