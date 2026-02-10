const aprendices = [
{ id: 1, nombre: "Ana", ficha:
3223874, nota: 4.2 },
{ id: 2, nombre: "Luis", ficha:
3223874, nota: 3.5 },
{ id: 3, nombre: "María", ficha:
3223875, nota: 4.8 }
];
// Implementa estas funciones:
// 1. obtenerAprobados(aprendices)
// 1. Retorna array con nota >= 3.0
const obtenerAprobados = (aprendices) => {
return aprendices.filter(a=> a.nota >= 3.0);
};
console.log("Aprobados:", obtenerAprobados(aprendices));

// 2. calcularPromedio(aprendices)
// 2. Retorna promedio del grupo
const calcularPromedio = (aprendices) => {
const total = aprendices.reduce((sum, a) => sum + a.nota, 0);
return total / aprendices.length;
};
console.log("Promedio grupo:", calcularPromedio(aprendices).toFixed(2));

// 3. buscarPorNombre(aprendices,nombre)
// 3 Retorna aprendiz que coincida
const buscarPorNombre = (aprendices, nombre) => {
return aprendices.find(a => a.nombre.toLowerCase() === nombre.toLowerCase());
};
console.log("Buscar por nombre 'María':", buscarPorNombre(aprendices, "María"));

// 4. obtenerNombres(aprendices)
// 4 Retorna array solo con nombres
const obtenerNombres = (aprendices) => {
return aprendices.map(a => a.nombre);
};
console.log("Nombres:", obtenerNombres(aprendices));