import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { ProductosCard } from "../../components/main/productos/ProductosCard";

const Productos = () => {
  const [productos, setProductos] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProductos = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("productos")
          .select("*");

        if (error) throw error;

        console.log("DATA PRODUCTOS:", data);
        setProductos(data || []);
      } catch (err: any) {
        console.error("ERROR PRODUCTOS:", err);
        setError(err.message || "Error al cargar los datos");
      } finally {
        setLoading(false);
      }
    };

    getProductos();
  }, []);

  // Adaptamos los datos directamente
  const productosAdaptados = productos.map((p: any) => ({
    id: p.id,
    titulo: p.titulo || p.nombre || "",
    categoria: p.categoria || p.tipo || "General",
    descripcion: p.descripcion || "",
    imagen: p.imagen || "",
    tecnologias: typeof p.tecnologias === 'string'
      ? String(p.tecnologias).split(',').map((t: string) => t.trim()).filter(Boolean)
      : Array.isArray(p.tecnologias) ? p.tecnologias : []
  }));

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <p>Cargando productos...</p>
      </section>
    );
  }

  return (
    <section
      id="productos"
      className="min-h-screen flex-col items-center justify-center"
    >
      <h1 className="text-center bg-gray-900 py-5">
        Productos Ofrecidos
      </h1>

      {error ? (
        <p className="text-center text-red-500 py-10">{error}</p>
      ) : (
        <ProductosCard productos={productosAdaptados} />
      )}
    </section>
  );
};

export default Productos;