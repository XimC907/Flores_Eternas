export const carritoView = {
    contenedor: document.getElementById('contenedor-carrito'),
    total: document.getElementById('total-carrito'),

    renderizarCarrito(productos) {
        if (productos.length === 0) {
            this.contenedor.innerHTML = `<div class="alert alert-info">Tu carrito está vacío.</div>`;
            this.total.innerText = "$0";
            return;
        }

        this.contenedor.innerHTML = ''; 
        productos.forEach((p, index) => {
            const item = `
                <div class="card mb-3 p-3">
                    <div class="row align-items-center">
                        <div class="col-2">
                            <img src="${p.img}" class="img-fluid rounded" style="max-height: 80px">
                        </div>
                        <div class="col-6">
                            <h5>${p.nombre}</h5>
                            <p class="mb-0 text-muted">${p.desc}</p>
                        </div>
                        <div class="col-2 text-center">
                            <span class="fw-bold">$${p.precio.toLocaleString()}</span>
                        </div>
                        <div class="col-2 text-end">
                            <button class="btn btn-danger btn-sm btn-eliminar" data-index="${index}">Eliminar</button>
                        </div>
                    </div>
                </div>`;
            this.contenedor.innerHTML += item;
        });
    },

    actualizarTotal(monto) {
        this.total.innerText = `$${monto.toLocaleString()}`;
    }
};