import { Outlet, NavLink } from "react-router-dom";

export const BackendLayout = () => {
  return (
    <div className="min-h-screen w-full bg-slate-950 text-white flex">

      <aside className="w-64 bg-slate-900 p-4">
        <h2 className="text-xl font-bold mb-6">
          Panel Admin
        </h2>

        <nav className="flex flex-col gap-3">

          <NavLink
            to="/admin"
            className={({ isActive }) =>
              isActive
                ? "text-white bg-blue-600 px-3 py-2 rounded"
                : "text-gray-300 hover:text-white px-3 py-2"
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/productos"
            className={({ isActive }) =>
              isActive
                ? "text-white bg-blue-600 px-3 py-2 rounded"
                : "text-gray-300 hover:text-white px-3 py-2"
            }
          >
            Productos
          </NavLink>

          <NavLink
            to="/admin/trabajos"
            className={({ isActive }) =>
              isActive
                ? "text-white bg-blue-600 px-3 py-2 rounded"
                : "text-gray-300 hover:text-white px-3 py-2"
            }
          >
            Trabajos
          </NavLink>

          <NavLink
            to="/admin/mensajes"
            className={({ isActive }) =>
              isActive
                ? "text-white bg-blue-600 px-3 py-2 rounded"
                : "text-gray-300 hover:text-white px-3 py-2"
            }
          >
            Mensajes
          </NavLink>

        </nav>
      </aside>

      <main className="flex-1 p-6">
        <Outlet />
      </main>

    </div>
  );
};