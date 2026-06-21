import { useParams, Link } from "react-router-dom";
import { useTrabajo } from "../../components/hooks/UseTrabajos/UseTrabajos";

export const TrabajoDetalle = () => {
  const { id } = useParams<{ id: string }>(); 
  
  const { trabajo, loading, error } = useTrabajo(id) as any;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-6 text-slate-400">
        <p className="animate-pulse text-lg">Cargando detalles del proyecto...</p>
      </div>
    );
  }

  if (error || !trabajo) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-6">
        <h2 className="text-2xl font-bold text-red-400 mb-2">Trabajo no encontrado</h2>
        <p className="text-gray-400 mb-4">
          {error ? "Hubo un problema al conectar con la base de datos." : `El trabajo con ID ${id} no existe o fue eliminado.`}
        </p>
        <Link to="/trabajos" className="text-blue-400 hover:underline">
          ← Volver a Trabajos
        </Link>
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto my-8 p-6 bg-slate-900 rounded-lg shadow-lg border border-slate-800 text-slate-100">
      <header className="border-b border-slate-700 pb-4 mb-6">
        <span className="text-xs font-semibold tracking-wider text-blue-400 uppercase">
          {trabajo.categoria || "Proyecto"}
        </span>
        <h1 className="text-3xl font-bold mt-1 text-white">
          {trabajo.titulo}
        </h1>
        <p className="text-sm text-slate-400 mt-2">
          Detalle del trabajo #{id}
        </p>
      </header>

      <section className="space-y-6">
        {trabajo.imagen && (
          <div className="w-full overflow-hidden rounded-md mb-4">
            <img 
              src={trabajo.imagen} 
              alt={trabajo.titulo} 
              className="w-full h-auto object-cover max-h-96"
            />
          </div>
        )}
        
        <div>
          <h2 className="text-lg font-medium text-slate-300 mb-2">Descripción del Trabajo</h2>
          <p className="text-slate-400 leading-relaxed text-justify">
            {trabajo.descripcion}
          </p>
        </div>

        {trabajo.tecnologias && (
          <div>
            <h2 className="text-lg font-medium text-slate-300 mb-2">Tecnologías / Herramientas</h2>
            <div className="flex flex-wrap gap-2">
              {(typeof trabajo.tecnologias === 'string' 
                ? trabajo.tecnologias.split(',') 
                : Array.isArray(trabajo.tecnologias)
                ? trabajo.tecnologias
                : []
              ).map((tech: string, index: number) => (
                <span key={index} className="px-3 py-1 bg-slate-800 text-xs font-medium rounded-full text-blue-300 border border-slate-700">
                  {tech.trim()}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>

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