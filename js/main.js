//Delaracion de variables de usuario y contraseña para el login
let usuario = "JuanPablo";
let pass = "987";
let log = false;
const todosLosProductos = [];
const carrito = [];
let aPagar = 0;
let nombreIn;
let cantidad;
let stockrestar = 0;

//Bucle for para login
for (let i = 3; i >= 1; i--) {
    let usuarioIngresado = prompt("Ingrese su nombre de usuario");
    console.log(usuarioIngresado);//Un log para corroborar el usuario ingresado.
    let passIngresado = prompt("Ingrese la contraseña, le quedan " + i + " intentos");
    if (usuario === usuarioIngresado && pass === passIngresado) {//verificacion de usuario y pass
        log = true;
        alert("LOGIN CORRECTO. AHORA TIENES ACCESO A LOS BOTONES");
        break;
    } else {
        alert("Usuario o Contraseña incorrecta");
    }
}

//Condicional para poder ejecutar los botones
if (!log) {
    alert("Debe Logearse correctamente para poder ejecutar los botones del HTML");
}

//Constructor de producto
class Producto {
    constructor(nombre, precio, stock) {
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }
}

const producto1 = new Producto("Arroz", 2000, 10);
const producto2 = new Producto("Fideos", 1500, 15);
const producto3 = new Producto("Atun", 3000, 5);
const producto4 = new Producto("Pan", 2000, 40);
const producto5 = new Producto("Cafe", 8500, 20);
const producto6 = new Producto("Cerveza", 2200, 12);
todosLosProductos.push(producto1, producto2, producto3, producto4, producto5, producto6);

// boton para que el usuario ingrese un nuevo producto
function IngresoDeProductos() {
    if (log === true) {
        let continuarAgregando = true;
        while (continuarAgregando) {
            let nombre = prompt("Ingrese el nombre del nuevo producto:").toLowerCase();
            if (existeProducto(nombre, todosLosProductos)) {
                const producto = obtenerProducto(nombre);
                alert(nombre + ' ya existe en la lista de productos y hay ' + producto.stock + ' en Stock');
            } else {
                let precio = parseInt(prompt("Ingrese el precio de " + nombre + " :"));
                let stock = parseInt(prompt("Ingrese el stock del nuevo producto:"));
                agregarProducto(nombre, precio, stock);
                let continuar = prompt("¿Desea ingresar otro nuevo producto?  [ s | n ]").toLowerCase();
                while (continuar != "s" && continuar != "n") {
                    continuar = prompt('Ingrese solo la letra S o letra N ').toLowerCase();
                }
                if (continuar == "n") {
                    continuarAgregando = false;
                    console.table(todosLosProductos);
                }
            }
        }
    }
}

//retorna si hay algun nombre de producto igual
function existeProducto(nombre) {
    return todosLosProductos.some(producto => producto.nombre.toLowerCase() === nombre);
}
//devuelve el primer producto encontrado
function obtenerProducto(nombre) {
    return todosLosProductos.find(producto => producto.nombre.toLowerCase() === nombre);
}

// Crea una nueva instancia de Productos con los datos proporcionados por el usuario
function agregarProducto(nombre, precio, stock) {
    const nuevoProducto = new Producto(nombre, precio, stock);
    todosLosProductos.push(nuevoProducto);
    return nuevoProducto;
}
console.table(todosLosProductos);

//boton para que el usuario ingrese productos y cantidad al carrito
function carritoCompras() {
    if (log === true) {
        agregarProductosAlCarrito()
        console.log('Productos en el carrito:');
        console.table(carrito.map(item => {
            const container = {};
            container.nombre = item.Producto.nombre;
            container.unidades = item.Unidades;
            return container;
        }));
        console.table(totalAPagar(carrito));
        console.table(todosLosProductos);
    }
}

function agregarProductosAlCarrito() {
    let continuarAgregando = true;
    mostrarProductos();
    while (continuarAgregando) {
        nombreIn = prompt('Ingrese el nombre del producto:').toLowerCase();
        let producto = obtenerProducto(nombreIn);
        if (producto) {
            cantidad = parseInt(prompt('Ingrese la cantidad de ' + nombreIn + ' :'));
            //funcion que valida si hay stock suficiente
            if (validarStock(producto, cantidad)) {
                agregarProductoAlCarrito(producto, cantidad);
            } else {
                alert('Stock insuficiente');
            };
            //condicion de salida
            let continuar = prompt("¿Desea ingresar otro producto al carrito?  [ s | n ]").toLowerCase();
            while (continuar != "s" && continuar != "n") {
                continuar = prompt('Ingrese solo la letra S o letra N ').toLowerCase();
            }
            if (continuar == "n") {
                continuarAgregando = false;
            }
        } else {
            alert('Producto no encontrado.');
        }
    }
}

//funcion que retorna un nuevo array solo con dos propiedades para mostrarlo por alert los productos
function mostrarProductos() {
    alert('A continuacion la lista de los productos disponibles:');
    let losProductos = todosLosProductos.map((producto) =>
        producto.nombre + '. $' + producto.precio);
    alert(losProductos.join('\n'));
}

//funcion que valida si hay stock suficiente
function validarStock(producto, cantidad) {
    return producto.stock >= cantidad;
}

//funcion que agrega productos al carrito y resta el stock de todosLosProductos
function agregarProductoAlCarrito(producto, cantidad) {
    carrito.push({ Producto: producto, Unidades: cantidad });
    producto.stock -= cantidad;
}

//funcion que suma el valor de la cantidad de unidades por el precio de  cada item del carrito
function totalAPagar(carrito) {
    aPagar = 0;
    carrito.forEach(item => {
        aPagar += (item.Unidades * item.Producto.precio);
    });
    return 'El total a pagar es: ' + '$' + aPagar
}
