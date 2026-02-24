// ContactoCard.jsx 

// Este componente muestra UN contacto de la agenda. 

// Recibe datos (props): nombre, telefono, correo, etiqueta. 

 

// export default function ContactoCard({ nombre, telefono, correo, etiqueta }) { 

//   return ( 

//     <div className="card-contacto"> 

//       {/* Nombre del contacto en negrita */} 
//       <h3 className="card-nombre">{nombre}</h3> 

//       {/* Teléfono */} 
//       <p className="card-linea">📞 {telefono}</p> 

//       {/* Correo */} 
//       <p className="card-linea">📧 {correo}</p> 

//       {/* Etiqueta adicional, si existe (por ejemplo: "Instructor", "Cliente", "Compañera") */} 
//       {etiqueta && ( 
//         <p className="card-etiqueta">{etiqueta}</p> 
//       )} 
//     </div> 
//   ); 
// } 
// CLASE 4

export default function ContactoCard({ 

 nombre, 
 telefono, 
 correo, 
 etiqueta, 
 onEliminar 

})
  {
  return (
    <article className="tarjeta-contacto">
      <h3>{nombre}</h3>
      <p>📞 {telefono}</p>
      <p>✉️ {correo}</p>
      {etiqueta && <p>{etiqueta}</p>}
      <div className="acciones">
        <button className="btn-eliminar" onClick={() => onEliminar(correo)}>
          Eliminar
        </button>
      </div>
    </article>
  );

  }