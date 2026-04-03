import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { LocationWithCategory } from '../lib/database.types';

export function useLocations(categoryId?: string | null) {
  const [locations, setLocations] = useState<LocationWithCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLocations() {
      try {
        setLoading(true);
        setError(null);

        let query = supabase
          .from('locations')
          .select(`
            *,
            category:categories(*)
          `)
          .eq('is_active', true);

        if (categoryId) {
          query = query.eq('category_id', categoryId);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) throw fetchError;

        setLocations(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch locations');
      } finally {
        setLoading(false);
      }
    }

    fetchLocations();
  }, [categoryId]);

  return { locations, loading, error };
}
