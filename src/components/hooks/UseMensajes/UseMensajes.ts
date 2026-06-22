import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import type { IMensaje } from '../../../Context/StoreContext'; // Tomado de tu StoreContext actual

export const useMensaje = (id: string | undefined) => {
  const [mensaje, setMensaje] = useState<IMensaje | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMensaje = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const { data, error: supabaseError } = await supabase
          .from('mensajes') // Nombre idéntico a tu esquema de BD
          .select('*')
          .eq('id', id)
          .single();

        if (supabaseError) throw supabaseError;
        setMensaje(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMensaje();
  }, [id]);

  return { mensaje, loading, error };
};