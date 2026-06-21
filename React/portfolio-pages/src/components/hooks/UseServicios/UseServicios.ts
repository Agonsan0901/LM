import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import type { IServicio } from '../../../Context/StoreContext'; 

export const useServicio = (id: string | undefined) => {
  const [servicio, setServicio] = useState<IServicio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServicio = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const { data, error: supabaseError } = await supabase
          .from('servicios')
          .select('*')
          .eq('id', id)
          .single();

        if (supabaseError) throw supabaseError;

        if (data) {
          const servicioMapeado: IServicio = {
            id: data.id,
            nombre: data.titulo || "", 
            descripcion: data.descripcion || "",
            tipo: data.categoria || "", 
            precio: data.precio || 0,
            icono: data.icono || "",
            imagen: data.imagen || "",
            caracteristicas: data.tecnologias 
              ? (Array.isArray(data.tecnologias) ? data.tecnologias.join(", ") : String(data.tecnologias))
              : ""
          };
          setServicio(servicioMapeado);
        } else {
          setServicio(null);
        }

      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServicio();
  }, [id]);

  return { servicio, loading, error };
};