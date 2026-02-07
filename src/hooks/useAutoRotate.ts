import { useEffect, useState } from "react";

export function useAutoRotate<T>(items: T[], intervalMs = 3000) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % items.length),
      intervalMs,
    );
    return () => clearInterval(id);
  }, [items, intervalMs]);

  return items[index];
}
