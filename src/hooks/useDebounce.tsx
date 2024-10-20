import { useEffect, useState } from "react";

const DEFAULT_DEBOUCE_DELAY = 500;

export default function useDebounce<T>(
  value: T,
  delay = DEFAULT_DEBOUCE_DELAY
): T | null {
  const [debouncedValue, setDebouncedValue] = useState<T | null>(null);

  useEffect(() => {
    const timeoutHandler = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      clearTimeout(timeoutHandler);
    };
  }, [value, delay]);

  return debouncedValue;
}
