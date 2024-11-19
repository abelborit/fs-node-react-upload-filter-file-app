import { useState, useEffect } from "react";

/**
 * Hook personalizado para manejar debounce en valores.
 *
 * @param value - El valor que se deboucea.
 * @param delay - El tiempo en milisegundos para esperar antes de actualizar el valor.
 * @returns El valor debouceado.
 */

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Limpiar el timeout si el valor cambia antes de que el delay termine
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
