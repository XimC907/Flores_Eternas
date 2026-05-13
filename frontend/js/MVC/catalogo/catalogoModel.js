import { listaProductos } from "./productos.js";

export const catalogoModel = {
    productos: listaProductos,

    getPrecioMaximo() {
        return Math.max(...this.productos.map(p => p.precio));
    }
};