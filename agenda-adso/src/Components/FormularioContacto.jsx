import { useState, useEffect } from "react";

export default function FormularioContacto({
  onAgregar,
  onActualizar,
  contactoEditando,
}) {

  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    empresa: "",
    etiqueta: "",
  });

  const [errores, setErrores] = useState({
    nombre: "",
    telefono: "",
    correo: "",
  });

  const [enviando, setEnviando] = useState(false);

  // ================= CARGAR DATOS SI SE ESTÁ EDITANDO =================
  useEffect(() => {
    if (contactoEditando) {
      setForm({
        nombre: contactoEditando.nombre || "",
        telefono: contactoEditando.telefono || "",
        correo: contactoEditando.correo || "",
        empresa: contactoEditando.empresa || "",
        etiqueta: contactoEditando.etiqueta || "",
      });
    }
  }, [contactoEditando]);

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ================= VALIDACIÓN =================
  const validarFormulario = () => {
    const nuevosErrores = {
      nombre: "",
      telefono: "",
      correo: "",
    };

    if (!form.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio.";
    }

    const telefonoLimpio = form.telefono.trim();

    if (!telefonoLimpio) {
      nuevosErrores.telefono = "El teléfono es obligatorio.";
    } else if (!/^\d+$/.test(telefonoLimpio)) {
      nuevosErrores.telefono =
        "El teléfono solo debe contener números.";
    } else if (telefonoLimpio.length !== 10) {
      nuevosErrores.telefono =
        "El teléfono debe tener exactamente 10 dígitos.";
    }

    if (!form.correo.trim()) {
      nuevosErrores.correo = "El correo es obligatorio.";
    } else if (!form.correo.includes("@")) {
      nuevosErrores.correo = "El correo debe contener @.";
    }

    setErrores(nuevosErrores);

    return (
      !nuevosErrores.nombre &&
      !nuevosErrores.telefono &&
      !nuevosErrores.correo
    );
  };

  // ================= ENVIAR FORMULARIO =================
  const onSubmit = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    try {
      setEnviando(true);

      await new Promise((resolve) => setTimeout(resolve, 300));

      if (contactoEditando) {
        await onActualizar(form);
      } else {
        await onAgregar(form);
      }

      setForm({
        nombre: "",
        telefono: "",
        correo: "",
        empresa: "",
        etiqueta: "",
      });

      setErrores({
        nombre: "",
        telefono: "",
        correo: "",
      });

    } catch (error) {
      console.error("Error al enviar:", error);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Nombre */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre *
          </label>
          <input
            className="w-full rounded-xl border-gray-300 focus:ring-teal-500 focus:border-teal-500"
            name="nombre"
            value={form.nombre}
            onChange={onChange}
          />
          {errores.nombre && (
            <p className="text-red-600 text-xs mt-1">
              {errores.nombre}
            </p>
          )}
        </div>

        {/* Teléfono */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Teléfono *
          </label>
          <input
            type="tel"
            maxLength={10}
            className="w-full rounded-xl border-gray-300 focus:ring-teal-500 focus:border-teal-500"
            name="telefono"
            value={form.telefono}
            onChange={onChange}
          />
          {errores.telefono && (
            <p className="text-red-600 text-xs mt-1">
              {errores.telefono}
            </p>
          )}
        </div>

      </div>

      {/* Correo */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Correo *
        </label>
        <input
          className="w-full rounded-xl border-gray-300 focus:ring-teal-500 focus:border-teal-500"
          name="correo"
          value={form.correo}
          onChange={onChange}
        />
        {errores.correo && (
          <p className="text-red-600 text-xs mt-1">
            {errores.correo}
          </p>
        )}
      </div>

      {/* Empresa */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Empresa
        </label>
        <input
          className="w-full rounded-xl border-gray-300 focus:ring-teal-500 focus:border-teal-500"
          name="empresa"
          value={form.empresa}
          onChange={onChange}
        />
      </div>

      {/* Etiqueta */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Etiqueta
        </label>
        <input
          className="w-full rounded-xl border-gray-300 focus:ring-teal-500 focus:border-teal-500"
          name="etiqueta"
          value={form.etiqueta}
          onChange={onChange}
        />
      </div>

      {/* Botón */}
      <button
        type="submit"
        disabled={enviando}
        className="w-full md:w-auto bg-teal-500 hover:bg-teal-600
        disabled:bg-teal-300 disabled:cursor-not-allowed
        text-white px-6 py-3 rounded-xl font-semibold shadow-sm"
      >
        {enviando
          ? "Guardando..."
          : contactoEditando
          ? "Actualizar contacto"
          : "Agregar contacto"}
      </button>

    </form>
  );
}