// Importamos hooks de React
import { useEffect, useState } from "react";

// Importamos las funciones de la API (capa de datos)
import {
  listarContactos,
  crearContacto,
  eliminarContactoPorId,
  actualizarContacto,
} from "./api";

// Importamos la configuración global de la aplicación
import { APP_INFO } from "./config";

// Importamos componentes hijos
import FormularioContacto from "./Components/FormularioContacto";
import ContactoCard from "./Components/ContactoCard";

function App() {

  const [contactos, setContactos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [ordenAsc, setOrdenAsc] = useState(true);
  const [contactoEditando, setContactoEditando] = useState(null);

  // Modal eliminar
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [contactoAEliminar, setContactoAEliminar] = useState(null);

  // ================= CARGAR CONTACTOS =================
  useEffect(() => {
    const cargarContactos = async () => {
      try {
        setCargando(true);
        setError("");

        const data = await listarContactos();
        setContactos(data);

      } catch (error) {
        console.error("Error al cargar contactos:", error);
        setError(
          "No se pudieron cargar los contactos. Verifica que el servidor esté encendido."
        );
      } finally {
        setCargando(false);
      }
    };

    cargarContactos();
  }, []);

  // ================= CREAR CONTACTO =================
  const onAgregarContacto = async (nuevoContacto) => {
    try {
      setError("");

      const creado = await crearContacto(nuevoContacto);
      setContactos((prev) => [...prev, creado]);

    } catch (error) {
      console.error("Error al crear contacto:", error);
      setError("No se pudo guardar el contacto.");
      throw error;
    }
  };

  // ================= ACTUALIZAR CONTACTO =================
  const onActualizarContacto = async (datosActualizados) => {
    try {
      setError("");

      const actualizado = await actualizarContacto(
        contactoEditando.id,
        datosActualizados
      );

      setContactos((prev) =>
        prev.map((c) =>
          c.id === contactoEditando.id ? actualizado : c
        )
      );

      setContactoEditando(null);

    } catch (error) {
      console.error("Error al actualizar contacto:", error);
      setError("No se pudo actualizar el contacto.");
    }
  };

  // ================= PEDIR ELIMINAR =================
  const pedirEliminarContacto = (id) => {
    setContactoAEliminar(id);
    setMostrarConfirmacion(true);
  };

  // ================= CONFIRMAR ELIMINAR =================
  const confirmarEliminar = async () => {
    try {
      await eliminarContactoPorId(contactoAEliminar);

      setContactos((prev) =>
        prev.filter((c) => c.id !== contactoAEliminar)
      );

    } catch (error) {
      console.error("Error al eliminar contacto:", error);
      setError("No se pudo eliminar el contacto.");
    }

    setMostrarConfirmacion(false);
    setContactoAEliminar(null);
  };

  // ================= CANCELAR ELIMINAR =================
  const cancelarEliminar = () => {
    setMostrarConfirmacion(false);
    setContactoAEliminar(null);
  };

  // ================= FILTRADO =================
  const contactosFiltrados = contactos.filter((c) => {

    const termino = busqueda.toLowerCase();

    const nombre = (c.nombre || "").toLowerCase();
    const correo = (c.correo || "").toLowerCase();
    const etiqueta = (c.etiqueta || "").toLowerCase();
    const telefono = (c.telefono || "").toLowerCase();

    return (
      nombre.includes(termino) ||
      correo.includes(termino) ||
      etiqueta.includes(termino) ||
      telefono.includes(termino)
    );
  });

  // ================= ORDENAMIENTO =================
  const contactosOrdenados = [...contactosFiltrados].sort((a, b) => {

    const nombreA = (a.nombre || "").toLowerCase();
    const nombreB = (b.nombre || "").toLowerCase();

    if (nombreA < nombreB) return ordenAsc ? -1 : 1;
    if (nombreA > nombreB) return ordenAsc ? 1 : -1;
    return 0;

  });

  // ================= RENDER =================
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-teal-100">

      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* Encabezado */}
        <header className="mb-8">

          <p className="text-xs tracking-[0.3em] text-gray-500 uppercase">
            Desarrollo Web ReactJS Ficha {APP_INFO.ficha}
          </p>

          <h1 className="text-4xl font-extrabold text-gray-900 mt-2">
            {APP_INFO.titulo}
          </h1>

          <p className="text-sm text-gray-600 mt-1">
            {APP_INFO.subtitulo}
          </p>

        </header>

        {/* Error */}
        {error && (
          <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3">
            <p className="text-sm font-medium text-red-700">
              {error}
            </p>
          </div>
        )}

        {/* Cargando */}
        {cargando ? (
          <p className="text-sm text-gray-500">
            Cargando contactos...
          </p>
        ) : (
          <>

            {/* Formulario */}
            <FormularioContacto
              onAgregar={onAgregarContacto}
              onActualizar={onActualizarContacto}
              contactoEditando={contactoEditando}
              onCancelarEdicion={() => setContactoEditando(null)}
            />

            {/* Buscador y orden */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">

              <input
                type="text"
                className="w-full md:flex-1 rounded-xl border-gray-300 focus:ring-teal-500 focus:border-teal-500 text-sm"
                placeholder="Buscar por nombre, correo, etiqueta o teléfono..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />

              <button
                type="button"
                onClick={() => setOrdenAsc((prev) => !prev)}
                className="bg-gray-100 text-gray-700 text-sm px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-200"
              >
                {ordenAsc ? "Ordenar Z-A" : "Ordenar A-Z"}
              </button>

            </div>

            {/* Lista */}
            <section className="space-y-4">

              {contactosOrdenados.length === 0 ? (
                <p className="text-sm text-gray-500">
                  No se encontraron contactos.
                </p>
              ) : (
                <>
                  <p className="text-sm text-gray-500">
                    {contactosOrdenados.length === 1
                      ? "Se encontró 1 contacto."
                      : `Se encontraron ${contactosOrdenados.length} contactos.`}
                  </p>

                  {contactosOrdenados.map((c) => (
                    <ContactoCard
                      key={c.id}
                      nombre={c.nombre}
                      telefono={c.telefono}
                      correo={c.correo}
                      empresa={c.empresa}
                      etiqueta={c.etiqueta}
                      onEliminar={() => pedirEliminarContacto(c.id)}
                      onEditar={() => setContactoEditando(c)}
                    />
                  ))}
                </>
              )}

            </section>

          </>
        )}

        {/* Modal confirmar eliminación */}
        {mostrarConfirmacion && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">

            <div className="bg-white rounded-2xl shadow-xl p-6 w-80">

              <h2 className="text-lg font-bold mb-2">
                Eliminar contacto
              </h2>

              <p className="text-sm text-gray-600 mb-6">
                ¿Seguro que deseas eliminar este contacto?
              </p>

              <div className="flex justify-end gap-3">

                <button
                  onClick={cancelarEliminar}
                  className="px-4 py-2 bg-gray-200 rounded-xl hover:bg-gray-300"
                >
                  Cancelar
                </button>

                <button
                  onClick={confirmarEliminar}
                  className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600"
                >
                  Eliminar
                </button>

              </div>

            </div>

          </div>
        )}

        {/* Footer */}
        <footer className="mt-8 text-xs text-gray-400">

          <p>Desarrollo Web – ReactJS | Proyecto Agenda ADSO</p>
          <p>Instructor: Gustavo Adolfo Bolaños Dorado</p>

        </footer>

      </div>

    </div>
  );
}

export default App;