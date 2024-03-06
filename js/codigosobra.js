
/* //funcion que valida si hay stock suficiente
function validarStock(producto, cantidad) {
    return producto.stock >= cantidad;
}
 */
//funcion que suma el valor de la cantidad de unidades por el precio de  cada item del carrito
function totalAPagar(carrito) {
    aPagar = 0;
    carrito.forEach(item => {
        aPagar += (item.Unidades * item.Producto.precio);
    });
    return 'El total a pagar es: ' + '$' + aPagar
}


//funcion que agrega productos al carrito y resta el stock de todosLosProductos
function agregarAlCarrito(producto, cantidad) {
    let productoDeCarrito = carrito.find(produ => produ.nombre == producto);
    if (productoDeCarrito) {
        productoDeCarrito.Unidades+=cantidad
    } else {
        carrito.push({ Producto: producto, Unidades: cantidad });
    }
};