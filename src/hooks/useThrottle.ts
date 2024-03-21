import { useEffect, useRef, useState } from "react";

export function useThrottle<T>(value: T, delay: number) {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastCalled = useRef(0);

  useEffect(() => {
    const now = Date.now();
    const timeSinceLastCall = now - lastCalled.current;

    if (timeSinceLastCall >= delay) {
      lastCalled.current = now;
      setThrottledValue(value);
    }
  }, [value, delay]);

  return throttledValue;
}
