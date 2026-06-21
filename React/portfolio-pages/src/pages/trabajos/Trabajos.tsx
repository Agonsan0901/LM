import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { TrabajosCard } from "../../components/main/trabajos/TrabajosCard";

const Trabajos = () => {
  const [trabajos, setTrabajos] = useState<any[]>([]);

  useEffect(() => {
    const getTrabajos = async () => {
      const { data, error } = await supabase
        .from("trabajos")
        .select("*");

      console.log("DATA:", data);
      console.log("ERROR:", error);

      setTrabajos(data || []);
    };

    getTrabajos();
  }, []);

  return (
    <section
      id="trabajos"
      className="min-h-screen flex-col items-center justify-center"
    >
      <h1 className="text-center bg-gray-900 py-5">
        Trabajos Ofrecidos
      </h1>

      <TrabajosCard trabajos={trabajos} />
    </section>
  );
};

export default Trabajos;