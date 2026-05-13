export const catalogoView = {
    contenedor: document.getElementById('contenedor-productos'),
    inputFiltro: document.getElementById('filtroPrecio'),
    labelPrecio: document.getElementById('valorPrecio'),

    renderizarProductos(productos) {
        this.contenedor.innerHTML = ''; // Limpiar catálogo
        productos.forEach(prod => {
            const card = `
                <div class="col-12 col-md-4 col-lg-3 item-producto">
                    <div class="card card-producto h-100">
                        <div class="img-container">
                            <img src="${prod.img}" alt="${prod.nombre}" class="img-ramo">
                        </div>
                        <div class="card-body d-flex flex-column p-3">
                            <h5 class="producto-titulo">${prod.nombre}</h5>
                            <p class="producto-desc">${prod.desc}</p>
                            <div class="mt-auto">
                                <p class="producto-precio">$${prod.precio.toLocaleString()}</p>
                                <button class="btn-agregar" data-id="${prod.id}">
                                    Añadir al carrito <span class="cart-icon">🛒</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>`;
            this.contenedor.innerHTML += card;
        });
    },

    actualizarLabelPrecio(valor) {
        this.labelPrecio.innerText = `$${parseInt(valor).toLocaleString()}`;
    }
};