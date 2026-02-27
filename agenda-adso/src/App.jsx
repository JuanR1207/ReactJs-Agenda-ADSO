import { useEffect, useState } from "react";
import {
  listarContactos,
  crearContacto,
  eliminarContactoPorId,
} from "./api.js";
import FormularioContacto from "./Components/FormularioContacto";
import ContactoCard from "./Components/ContactoCard";

export default function App() {
  const [contactos, setContactos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [mensajeExito, setMensajeExito] = useState("");

  // 🔵 Cargar contactos al iniciar
  useEffect(() => {
    cargarContactos();
  }, []);

  // Función para cargar contactos desde la API
  const cargarContactos = async () => {
    try {
      setError("");
      setCargando(true);

      const data = await listarContactos();
      setContactos(data);
    } catch (error) {
      console.error("Error al cargar contactos:", error);
      setError(
        "No se pudieron cargar los contactos. Verifica que JSON Server esté encendido."
      );
    } finally {
      setCargando(false);
    }
  };

  // 🟢 Agregar contacto
  const agregarContacto = async (nuevo) => {
    try {
      setError("");
      setMensajeExito("");

      const creado = await crearContacto(nuevo);

      // 🔥 Actualizar la lista en estado directamente
      setContactos((prev) => [...prev, creado]);

      setMensajeExito("Contacto guardado correctamente ✅");
    } catch (error) {
      console.error("Error al crear contacto:", error);
      setError(
        "No se pudo guardar el contacto. Verifica tu conexión o el servidor."
      );
      throw error;
    }
  };

  // 🔴 Eliminar contacto
  const eliminarContacto = async (id) => {
    try {
      setError("");
      setMensajeExito("");

      await eliminarContactoPorId(id);

      // Actualizamos estado eliminando localmente
      setContactos((prev) => prev.filter((c) => c.id !== id));

      setMensajeExito("Contacto eliminado correctamente ✅");
    } catch (error) {
      console.error("Error al eliminar contacto:", error);
      setError(
        "No se pudo eliminar el contacto. Intenta nuevamente."
      );
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="max-w-6xl mx-auto px-6 pt-8">
        <p className="text-sm font-semibold text-gray-400 tracking-[0.25em] uppercase">
          Programa ADSO
        </p>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mt-2">
          Agenda ADSO v6
        </h1>
        <p className="text-gray-500 mt-1">
          Gestión de contactos con validaciones y mejor experiencia de usuario.
        </p>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-8 space-y-6">

        {/* 🔴 Error global */}
        {error && (
          <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* 🟢 Mensaje éxito */}
        {mensajeExito && (
          <div className="rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
            {mensajeExito}
          </div>
        )}

        {/* 🟣 Cargando */}
        {cargando && (
          <div className="rounded-xl bg-purple-50 border border-purple-200 px-4 py-3 text-sm text-purple-700">
            Cargando contactos desde la API...
          </div>
        )}

        {/* Formulario */}
        <FormularioContacto onAgregar={agregarContacto} />

        {/* Lista de contactos */}
        <div className="space-y-4">
          {contactos.length === 0 && !cargando && (
            <p className="text-gray-500 text-sm">
              No hay contactos aún. Agrega el primero usando el formulario.
            </p>
          )}

          {contactos.map((c) => (
            <ContactoCard
              key={c.id}
              {...c}
              onEliminar={() => eliminarContacto(c.id)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}