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
    <div className="bg-white shadow rounded-xl p-4 flex justify-between items-center">

      <div>

        <h3 className="font-bold text-lg">
          {nombre}
        </h3>

        <p className="text-sm text-gray-600">
          📞 {telefono}
        </p>

        <p className="text-sm text-gray-600">
          ✉ {correo}
        </p>

        {etiqueta && (
          <span className="inline-block mt-2 bg-teal-200 text-teal-800 px-2 py-1 rounded-lg text-xs">
            {etiqueta}
          </span>
        )}

       {/* Empresa (si existe) */}
        {empresa && (
          <p className="text-gray-600 text-sm flex items-center gap-2">
            <span className="text-purple-500 text-lg">🏢</span>
            {empresa}
          </p>
        )}

      </div>

      <div className="flex gap-2">

        <button
          onClick={onEditar}
          className="bg-blue-500 text-white px-3 py-1 rounded-lg"
        >
          Editar
        </button>

        <button
          onClick={onEliminar}
          className="bg-red-500 text-white px-3 py-1 rounded-lg"
        >
          Eliminar
        </button>

      </div>

    </div>
  );
}