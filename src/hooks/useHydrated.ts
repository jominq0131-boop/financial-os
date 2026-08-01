import { useEffect, useState } from 'react';

/**
 * Next.js App Router Client Component Hydration helper hook
 * Returns true once mounted on the client to prevent SSR/Client markup mismatch.
 */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated;
}
