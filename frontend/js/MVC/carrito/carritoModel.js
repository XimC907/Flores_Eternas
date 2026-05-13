export const carritoModel = {
    obtenerProductos() {
        // Obtenemos los datos que guardamos previamente con el catalogoController
        return JSON.parse(localStorage.getItem('carrito')) || [];
    },

    limpiarCarrito() {
        localStorage.removeItem('carrito');
    },

    calcularTotal() {
        const productos = this.obtenerProductos();
        return productos.reduce((total, p) => total + p.precio, 0);
    }
};