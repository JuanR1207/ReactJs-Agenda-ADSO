export default function ContactoCard({
  nombre,
  telefono,
  correo,
  empresa,
  etiqueta,
  onEliminar,
}) {
  return (
    <div className="bg-white shadow-sm rounded-2xl p-5 border border-gray-100 flex justify-between items-start hover:shadow-md transition">

      <div className="space-y-1">

        <h3 className="text-lg font-semibold text-gray-900">
          {nombre}
        </h3>

        <p className="text-sm text-gray-600">
          📞 {telefono}
        </p>

        <p className="text-sm text-gray-600">
          ✉️ {correo}
        </p>

        {empresa && (
          <p className="text-sm text-gray-500">
            🏢 Empresa: <span className="font-medium">{empresa}</span>
          </p>
        )}

        {etiqueta && (
          <span className="inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-700">
            {etiqueta}
          </span>
        )}
      </div>

      <button
        onClick={onEliminar}
        className="text-sm text-red-600 hover:text-red-800 font-semibold transition"
      >
        Eliminar
      </button>
    </div>
  );
}