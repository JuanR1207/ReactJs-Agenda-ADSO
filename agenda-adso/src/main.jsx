// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

import React from 'react' 
// React: la librería principal 

import ReactDOM from 'react-dom/client' 
// ReactDOM: dibuja React en el navegador 

import App from './App.jsx' 
// Importamos el componente raíz (nuestra Agenda ADSO) 

import './index.css' 
// Importamos los estilos globales 

ReactDOM.createRoot(document.getElementById('root')).render( 
  <React.StrictMode> 
    <App /> 
    {/* Aquí montamos nuestra Agenda ADSO */} 
  </React.StrictMode>, 
); 