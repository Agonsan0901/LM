import { useStore } from "../../Context/StoreContext";
import { ProductosCard } from "../../components/main/productos/ProductosCard";

const Productos = () => {
  const { productos, loading, error } = useStore();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <p className="text-lg animate-pulse">Cargando catálogo de productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-red-400">
        <p className="text-lg">Error al cargar productos: {error}</p>
      </div>
    );
  }

  // Modificación aquí: Si 'productos' es undefined, usamos un array vacío
  const listaProductos = productos || [];

  return (
    <section id="productos" className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3 tracking-tight">
            Productos Ofrecidos
          </h1>
          <p className="text-gray-400 max-w-md mx-auto">
            Explora nuestras soluciones y productos disponibles en la plataforma.
          </p>
        </header>

        {listaProductos.length === 0 ? (
          <p className="text-center text-gray-500 my-12">
            No hay productos disponibles en este momento.
          </p>
        ) : (
          <ProductosCard productos={listaProductos} />
        )}
      </div>
    </section>
  );
};

export default Productos;