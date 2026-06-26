import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { ServiciosCard } from "../../components/main/servicios/ServiciosCard";

const Servicios = () => {
  const [servicios, setServicios] = useState<any[]>([]);

  useEffect(() => {
    const getServicios = async () => {
      const { data, error } = await supabase
        .from("servicios") // Tu tabla de Supabase
        .select("*");

      console.log("DATA SERVICIOS:", data);
      console.log("ERROR SERVICIOS:", error);

      setServicios(data || []);
    };

    getServicios();
  }, []);

  // Adaptamos los datos directamente antes de pasarlos al componente de la tarjeta
  const serviciosAdaptados = servicios.map((s: any) => ({
    id: s.id,
    titulo: s.nombre || "",
    categoria: s.tipo || "General",
    descripcion: s.descripcion || "",
    imagen: s.imagen || "",
    tecnologias: s.caracteristicas 
      ? String(s.caracteristicas).split(',').map((t: string) => t.trim()).filter(Boolean) 
      : [] 
  }));

  return (
    <section
      id="servicios"
      className="min-h-screen flex-col items-center justify-center"
    >
      <h1 className="text-center bg-gray-900 py-5">
        Servicios Ofrecidos
      </h1>

      <ServiciosCard servicios={serviciosAdaptados} />
    </section>
  );
};

export default Servicios;