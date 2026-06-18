import { useParams, Link } from "react-router-dom";
import dataTrabajos from '@/model/data/trabajos.json';
import type { ITrabajo } from "@/model/interfaces/ITrabajo";

export const TrabajoDetalle = () => {
  const { id } = useParams<{ id: string }>(); 
  
  // Buscamos el trabajo de forma segura
  const trabajo = dataTrabajos.find((trab) => trab.id === Number(id)) as ITrabajo | undefined;

  // Control de estado de error: Si no existe el trabajo, mostramos una interfaz limpia
  if (!trabajo) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-6">
        <h2 className="text-2xl font-bold text-red-400 mb-2">Trabajo no encontrado</h2>
        <p className="text-gray-400 mb-4">El trabajo con ID {id} no existe o fue eliminado.</p>
        <Link to="/trabajos" className="text-blue-400 hover:underline">
          ← Volver a Trabajos
        </Link>
      </div>
    );
  }

  // Interfaz principal estructurada y con diseño (Ejemplo usando clases semánticas o Tailwind)
  return (
    <main className="max-w-4xl mx-auto my-8 p-6 bg-slate-900 rounded-lg shadow-lg border border-slate-800 text-slate-100">
      {/* Encabezado */}
      <header className="border-b border-slate-700 pb-4 mb-6">
        <span className="text-xs font-semibold tracking-wider text-blue-400 uppercase">
          {trabajo.categoria}
        </span>
        <h1 className="text-3xl font-bold mt-1 text-white">
          {trabajo.titulo}
        </h1>
        <p className="text-sm text-slate-400 mt-2">
          Detalle del trabajo #{id}
        </p>
      </header>

      {/* Contenido Principal */}
      <section className="space-y-6">
        <div>
          <h2 className="text-lg font-medium text-slate-300 mb-2">Descripción del Trabajo</h2>
          <p className="text-slate-400 leading-relaxed text-justify">
            {trabajo.descripcion}
          </p>
        </div>
      </section>

      {/* Footer del contenedor / Botón de retorno */}
      <footer className="mt-8 pt-4 border-t border-slate-700 flex justify-end">
        <Link 
          to="/trabajos" 
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-200"
        >
          Volver a la lista
        </Link>
      </footer>
    </main>
  );
};