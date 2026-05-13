import { carritoModel } from './carritoModel.js';
import { carritoView } from './carritoView.js';

const carritoController = {
    init() {
        this.refrescarCarrito();
        this.configurarEventos();
    },

    refrescarCarrito() {
        const productos = carritoModel.obtenerProductos();
        const total = carritoModel.calcularTotal();
        carritoView.renderizarCarrito(productos);
        carritoView.actualizarTotal(total);
    },

    configurarEventos() {
        carritoView.contenedor.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-eliminar')) {
                const index = e.target.getAttribute('data-index');
                this.eliminarItem(index);
            }
        });
    },

    eliminarItem(index) {
        let productos = carritoModel.obtenerProductos();
        productos.splice(index, 1); // Quita el elemento del array
        localStorage.setItem('carrito', JSON.stringify(productos));
        this.refrescarCarrito();
    }
};

carritoController.init();