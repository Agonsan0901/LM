import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import type { IProducto } from '../../../model/interfaces/IProducto';

export const useProducto = (id: string | undefined) => {
  const [producto, setProducto] = useState<IProducto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducto = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const { data, error: supabaseError } = await supabase
          .from('productos')
          .select('*')
          .eq('id', id)
          .single();

        if (supabaseError) throw supabaseError;
        setProducto(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducto();
  }, [id]);

  return { producto, loading, error };
};