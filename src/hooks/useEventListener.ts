import {
  IEventElement,
  IEventMap,
} from "@/types/hooks/useEventListener.struct";
import { useEffect, useRef } from "react";

export function useEventListener<K extends keyof IEventMap>(
  eventType: K,
  callback: (ev: IEventMap[K]) => void,
  element: IEventElement = window
) {
  const callbackRef = useRef<(event: IEventMap[K]) => void>(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handler = (e: IEventMap[K]) => callbackRef.current(e);

    const typeSafeEventType = eventType as string;
    const typeSafeHandler = handler as EventListener;

    element?.addEventListener(typeSafeEventType, typeSafeHandler);

    return () => {
      element?.removeEventListener(typeSafeEventType, typeSafeHandler);
    };
  }, [eventType, element]);
}
