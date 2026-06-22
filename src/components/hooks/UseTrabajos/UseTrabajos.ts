import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import type { ITrabajo } from '../../../model/interfaces/ITrabajo'; 

export const useTrabajo = (id: string | undefined) => {
  const [trabajo, setTrabajo] = useState<ITrabajo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrabajo = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const { data, error: supabaseError } = await supabase
          .from('trabajos')
          .select('*')
          .eq('id', id)
          .single();

        if (supabaseError) throw supabaseError;
        setTrabajo(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrabajo();
  }, [id]);

  return { trabajo, loading, error };
};