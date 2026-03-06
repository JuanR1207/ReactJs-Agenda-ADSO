export default function ContactoCard({
  nombre,
  telefono,
  correo,
  empresa,
  etiqueta,
  onEliminar,
  onEditar,
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex justify-between items-center">

      {/* Información del contacto */}
      <div>

        <h3 className="text-lg font-semibold text-gray-900">
          {nombre}
        </h3>

        {telefono && (
          <p className="text-sm text-gray-600">
            📞 {telefono}
          </p>
        )}

        {correo && (
          <p className="text-sm text-gray-600">
            ✉️ {correo}
          </p>
        )}

        {/* Empresa (si existe) */}
        {empresa && (
          <p className="text-gray-600 text-sm flex items-center gap-2">
            <span className="text-purple-500 text-lg">🏢</span>
            {empresa}
          </p>
        )}

        {etiqueta && (
          <span className="inline-block mt-1 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
            {etiqueta}
          </span>
        )}

      </div>

      {/* Botones */}
      <div className="flex gap-2">

        <button
          onClick={onEditar}
          className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded-lg"
        >
          Editar
        </button>

        <button
          onClick={onEliminar}
          className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded-lg"
        >
          Eliminar
        </button>

      </div>

    </div>
  );
}