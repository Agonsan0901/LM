import { useParams, Link } from "react-router-dom";
import dataProductos from "../../model/data/productos.json";
import type { IProducto } from "../../model/interfaces/IProducto";

export const ProductoDetalle = () => {
  const { id } = useParams<{ id: string }>(); 
  
  const producto = dataProductos.find((prod) => prod.id === Number(id)) as IProducto | undefined;

  if (!producto) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-6">
        <h2 className="text-2xl font-bold text-red-400 mb-2">Producto no encontrado</h2>
        <p className="text-gray-400 mb-4">El producto con ID {id} no existe o fue eliminado.</p>
        <Link to="/productos" className="text-blue-400 hover:underline">
          ← Volver a Productos
        </Link>
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto my-8 p-6 bg-slate-900 rounded-lg shadow-lg border border-slate-800 text-slate-100">
      <header className="border-b border-slate-700 pb-4 mb-6">
        <span className="text-xs font-semibold tracking-wider text-blue-400 uppercase">
          {producto.categoria}
        </span>
        <h1 className="text-3xl font-bold mt-1 text-white">
          {producto.titulo}
        </h1>
        <p className="text-sm text-slate-400 mt-2">
          Detalle del producto #{id}
        </p>
      </header>

      <section className="space-y-6">
        <div>
          <h2 className="text-lg font-medium text-slate-300 mb-2">Descripción del Producto</h2>
          <p className="text-slate-400 leading-relaxed text-justify">
            {producto.descripcion}
          </p>
        </div>
      </section>

      <footer className="mt-8 pt-4 border-t border-slate-700 flex justify-end">
        <Link 
          to="/productos" 
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-200"
        >
          Volver a la lista
        </Link>
      </footer>
    </main>
  );
};