import { catalogoModel } from './catalogoModel.js';
import { catalogoView } from './catalogoView.js';

const catalogoController = {
    init() {
        // Muestra todos los productos al iniciar
        catalogoView.renderizarProductos(catalogoModel.productos);

        // Escuchar el filtro de precio
        catalogoView.inputFiltro.addEventListener('input', (e) => {
            const precioMax = e.target.value;
            catalogoView.actualizarLabelPrecio(precioMax);

            const productosFiltrados = catalogoModel.productos.filter(p => p.precio <= precioMax);
            catalogoView.renderizarProductos(productosFiltrados);
        });

        // Escuchar el botón de "Añadir al carrito"
        catalogoView.contenedor.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-agregar') || e.target.closest('.btn-agregar')) {
                const btn = e.target.classList.contains('btn-agregar') ? e.target : e.target.closest('.btn-agregar');
                const id = btn.getAttribute('data-id');
                this.agregarAlCarrito(id);
            }
        });
    },

    agregarAlCarrito(id) {
        const producto = catalogoModel.productos.find(p => p.id == id);

        if (producto) {
            // Se guarda en LocalStorage
            let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            carrito.push(producto);
            localStorage.setItem('carrito', JSON.stringify(carrito));

            const respuesta = confirm(`¡${producto.nombre} añadido! 💐\n\n¿Quieres ir al carrito para finalizar tu compra?`);

            if (respuesta) {
                window.location.href = "carrito.html";
            }
            // Si el usuario da "Cancelar", el código simplemente termina y se queda en el catálogo
        }
    }
};

catalogoController.init();