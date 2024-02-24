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

/* //Bucle for para login
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
} */
/* 
//Condicional para poder ejecutar 
if (!log) {
    alert("Debe Logearse correctamente para poder ejecutar los botones del HTML");
}
 */
//Constructor de producto
class Productos {
    constructor(nombre, precio, stock) {
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }
}

const producto1 = new Productos("Arroz", 2000, 10);
const producto2 = new Productos("Fideos tirabuzon", 1500, 15);
const producto3 = new Productos("Atun", 3000, 5);
const producto4 = new Productos("Pan", 2000, 40);
const producto5 = new Productos("Cafe", 8500, 20);
const producto6 = new Productos("Cerveza", 2200, 12);
todosLosProductos.push(producto1, producto2, producto3, producto4, producto5, producto6);

// boton para que el usuario ingrese un nuevo producto y lo sume a todos los productos
function IngresoDeProductos() {
    if (log === true) {
        let salida = true;
        while (salida) {
            let nombre = prompt("Ingrese el nombre del nuevo producto:");
            let precio = parseInt(prompt("Ingrese el precio de " + nombre + " :"));
            let stock = parseInt(prompt("Ingrese el stock del nuevo producto:"));
            let continuar = prompt("¿Desea ingresar otro nuevo producto?  [ s | n ]").toLowerCase();
            if (continuar != "s" && continuar != "n") {
                continuar = prompt('Ingrese solo la letra S o letra N ').toLowerCase();
            } else if (continuar == "n" || continuar != "s") {
                salida = false;
                // Crea una nueva instancia de Productos con los datos proporcionados por el usuario
                const nuevoProducto = new Productos(nombre, precio, stock);
                todosLosProductos.push(nuevoProducto);
                console.table(todosLosProductos);
                return todosLosProductos
            }
        }
    }
}
console.table(todosLosProductos);
//boton para que el usuario ingrese productos y cantidad al carrito
function carritoCompras() {
//    if (log === true) {
        carritoDeProductos(nombreIn, cantidad)
        console.table(carrito);
        console.table(totalAPagar(carrito));
        restarStock(todosLosProductos, carrito);
        return
    }
//}

function carritoDeProductos() {
    let salida = true;
    alert('A continuacion la lista de los productos disponibles:');
    let losProductos = todosLosProductos.map((producto) => producto.nombre + '. $' + producto.precio);
    alert(losProductos.join('\n'));
    while (salida) {
        nombreIn = prompt('Ingrese el nombre del producto:').toLowerCase();
        let producto = todosLosProductos.find(item => item.nombre.toLowerCase() === nombreIn);//retorna true si hay algun nombre de producto igual
        if (!producto) {
            alert('Producto no encontrado.');
            continue;
        }
        cantidad = parseInt(prompt('Ingrese la cantidad de ' + nombreIn + ' :'));
        carrito.push({ "Nombre del producto": nombreIn, Unidades: cantidad, precio: producto.precio });
        validarStock(carrito, todosLosProductos); //funcion que valida si hay stock suficiente
        //condicion de salida
        let continuar = prompt('¿Desea agregar otro producto al carrito?  [ s | n ]').toLowerCase();
        if (continuar != "s" && continuar != "n") {
            continuar = prompt('Ingrese solo la letra S o letra N ')
        } else if (continuar == "n" || continuar != "s") {
            salida = false
        }
    }
    return carrito
}

function validarStock(carrito, todosLosProductos) {
    carrito.forEach(producto => {
        const nombreProducto = producto['Nombre del producto'];
        const unidadesCompradas = producto["Unidades"];
        todosLosProductos.forEach(producto => {
            if (producto.nombre.toLowerCase() == nombreProducto.toLowerCase()) {
                if (!(producto.stock >= unidadesCompradas)) {
                    alert(`Lo lamento, solo tenemos ${producto.stock} unidades de ${producto.nombre} `)
                    carrito.pop();
                    return;
                }
            }
        })
    })
}

function totalAPagar(carrito) {
    aPagar = 0;
    carrito.forEach(item => {
        aPagar += (item.Unidades * item.precio);
    });
    return 'El total a pagar es: ' + '$' + aPagar
}

function restarStock(todosLosProductos, carrito) {
    carrito.forEach(producto => {
        const nombreProducto = producto['Nombre del producto'];
        const unidadesCompradas = producto["Unidades"];
        todosLosProductos.forEach(producto => {
            if (producto.nombre.toLowerCase() == nombreProducto.toLowerCase()) {
                if (producto.stock >= unidadesCompradas) {
                    producto.stock -= unidadesCompradas;
                }
            }
        })
    })
    console.table(todosLosProductos)
}