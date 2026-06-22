import { Outlet, NavLink } from "react-router-dom";

export const BackendLayout = () => {
  // Función para definir los estilos de los enlaces de forma limpia
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2.5 rounded-lg transition-all duration-200 font-medium flex items-center ${
      isActive 
        ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" 
        : "text-slate-400 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <div className="min-h-screen w-full bg-slate-950 text-white flex">
      {/* Sidebar Lateral */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-8 tracking-tight text-white flex items-center gap-2">
          <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
          Panel Admin
        </h2>

        <nav className="flex flex-col gap-1.5">
          <NavLink to="/admin/productos" className={getLinkClass}>Productos</NavLink>
          <NavLink to="/admin/trabajos" className={getLinkClass}>Trabajos</NavLink>
          <NavLink to="/admin/mensajes" className={getLinkClass}>Mensajes</NavLink>
          <NavLink to="/admin/servicios" className={getLinkClass}>Servicios</NavLink>
        </nav>

        {/* Pie del Sidebar opcional */}
        <div className="mt-auto pt-6 border-t border-slate-800 text-xs text-slate-500">
          Backend v1.0
        </div>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-1 p-8 bg-slate-950 overflow-y-auto">
        {/* Aquí se inyectan tus páginas de administración */}
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};