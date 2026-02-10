const productos = [
  { nombre: "Laptop", precio: 1200000, stock: 5 },
  { nombre: "Mouse", precio: 35000, stock: 0 },
  { nombre: "Teclado", precio: 85000, stock: 12 }
];

// 1. Productos con stock > 0
const obtenerDisponibles = (productos) => {
  return productos.filter(producto => producto.stock > 0);
};

// 2. Valor total del inventario (precio * stock)
const calcularInventario = (productos) => {
  return productos.reduce(
    (total, producto) => total + (producto.precio * producto.stock), 0);
};

// 3. Reduce precios 
const aplicarDescuento = (productos, porcentaje) => {
  return productos.map(producto => ({
    ...producto,
    precio: producto.precio - (producto.precio * porcentaje / 100)}));
};

// 4. Ordenar por precio (menor a mayor)
const ordenarPorPrecio = (productos) => {
  return [...productos].sort((a, b) => a.precio - b.precio);
};

console.log("Productos disponibles:");
console.log(obtenerDisponibles(productos));

console.log("\nValor total del inventario:");
console.log(calcularInventario(productos));

console.log("\nProductos con 10% de descuento:");
console.log(aplicarDescuento(productos, 10));

console.log("\nProductos ordenados por precio:");
console.log(ordenarPorPrecio(productos));