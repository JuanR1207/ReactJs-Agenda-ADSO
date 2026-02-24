// import "./App.css"; // Importamos estilos de la app 


// import ContactoCard from "src/Componentes/contactocard"; // Importamos el componente hijo 

// export default function App() { 
//   // Esta es nuestra "base de datos" inicial quemada en el código 
//   const contactos = [ 
//     { 
//       id: 1, 
//       nombre: "Carolina Pérez", 
//       telefono: "300 123 4567", 
//       correo: "carolina@sena.edu.co", 
//       etiqueta: "Compañera", 
//     }, 
//     { 
//       id: 2, 
//       nombre: "Juan Díaz", 
//       telefono: "301 987 6543", 
//       correo: "juan@sena.edu.co", 
//       etiqueta: "Instructor", 
//     }, 
//     {
//       id: 3, 
//       nombre: "Luisa Martínez", 
//       telefono: "320 555 7788", 
//       correo: "luisa@sena.edu.co", 
//       etiqueta: "Cliente", 
//     }, 
//     {
//       id: 4,
//       nombre: "Karol Gómez",
//       telefono: "322 444 5566",
//       correo: "karolG@sena.edu.co",
//       etiqueta: "Pareja",
//     },
//     {
//       id: 5,
//       nombre: "Ferney Alvarez",
//       telefono: "321 333 2211",
//       correo: "ferneyA@sena.edu.co",
//       etiqueta: "Amigo",
//     },
//   ]; 
//   return ( 
//     <main className="app-container"> 
//       <h1 className="app-title">Agenda ADSO 📒</h1> 
//       <p className="app-subtitle">Contactos guardados</p> 

//       {/* Recorremos el arreglo contactos y pintamos una tarjeta por cada uno */} 
//       {contactos.map((c) => ( 
//         <ContactoCard 
//           key={c.id}            // key única para React 
//           nombre={c.nombre}     // prop nombre 
//           telefono={c.telefono} // prop telefono 
//           correo={c.correo}     // prop correo 
//           etiqueta={c.etiqueta} // prop etiqueta (Cliente, Instructor, etc.) 
//         /> 
//       ))} 
//       <p className="app-nota"> 
//         (Versión 0.1 - solo lectura, sin agregar ni editar todavía) 
//       </p> 
//     </main> 
//   ); 
// } 
/////////////////////////////////////////////////////////////////////////////////////////
// CLASE 4

// import { useState } from "react";;
// import "./App.css";;
// import ContactoCard from "./Componentes/ContactoCard";
// import FormularioContacto from "./Componentes/FormularioContacto";
// export default function App() {
//  const [contactos, setContactos] = useState([
//  {
//  id: 1,
//  nombre: "Carolina Pérez",
//  telefono: "300 123 4567",
//  correo: "carolina@sena.edu.co",
//  etiqueta: "Compañera",
//  },
//  ]);

//  const agregarContacto = (nuevoContacto) => {
//  setContactos([...contactos, { id: Date.now(), ...nuevoContacto }]);
//  };
// // Eliminar
//  const eliminarContacto = (id) => {
//  setContactos((prev) => prev.filter((c) => c.id !== id));
//  };
//  return (
//  <main className="app-container">
//  <h1 className="app-title">Agenda ADSO v2</h1>

//  <FormularioContacto onAgregar={agregarContacto} />

//  <section className="lista-contactos">
//  {contactos.map((c) => (
//  <ContactoCard
//  key={c.id}
//  id={c.id}
//  nombre={c.nombre}
//  telefono={c.telefono}
//  correo={c.correo}
//  etiqueta={c.etiqueta}
//  onDelete={eliminarContacto}
//  />
//  ))}
//  </section>
//  </main>
//  );
// }

///////////////////////////////////////////////////////
// CLASE 5

import { useState, useEffect } from "react";
import "./App.css";
import FormularioContacto from "./Components/FormularioContacto";
import ContactoCard from "./Components/ContactoCard";

export default function App() {
  const contactosGuardados =
    JSON.parse(localStorage.getItem("contactos")) || [];

  const [contactos, setContactos] = useState(contactosGuardados);

  useEffect(() => {
    localStorage.setItem("contactos", JSON.stringify(contactos));
  }, [contactos]);

  const agregarContacto = (nuevo) => {
    setContactos((prev) => [...prev, nuevo]);
  };

  const eliminarContacto = (correo) => {
    setContactos((prev) => prev.filter((c) => c.correo !== correo));
  };

  return (
    <main className="max-w-2xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold text-morado text-center mb-2">
        Agenda ADSO v4
      </h1>
     <p className="text-gray-500 text-center mb-6">
      Interfaz moderna con TailwindCSS
    </p>

      <FormularioContacto onAgregar={agregarContacto} />

      {contactos.map((c) => (
        <ContactoCard
          key={c.correo}
          {...c}
          onEliminar={eliminarContacto}
        />
      ))}
    </main>
  );
}




