import { catalogoModel } from './catalogoModel.js';
import { catalogoView } from './catalogoView.js';

const catalogoController = {
    init() {
        // 1. Mostrar todos los productos al iniciar
        catalogoView.renderizarProductos(catalogoModel.productos);

        // 2. Escuchar el filtro de precio
        catalogoView.inputFiltro.addEventListener('input', (e) => {
            const precioMax = e.target.value;
            catalogoView.actualizarLabelPrecio(precioMax);
            
            const productosFiltrados = catalogoModel.productos.filter(p => p.precio <= precioMax);
            catalogoView.renderizarProductos(productosFiltrados);
        });

        // Escuchar el botón de "Añadir al carrito"
        // Usamos delegación de eventos porque los botones se crean dinámicamente
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
        
        // Lógica simple de carrito usando LocalStorage para que persista
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carrito.push(producto);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        
        alert(`¡${producto.nombre} añadido al carrito!`);
    }
};

catalogoController.init();