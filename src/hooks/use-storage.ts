import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

type UseStorageReturnType<T> = [
  T | undefined,
  Dispatch<SetStateAction<T | undefined>>,
  () => void,
];

export function useLocalStorage<T>(
  key: string,
  defaultValue: T
): UseStorageReturnType<T> {
  const [value, setValue] = useState((() => {
    const jsonValue = localStorage.getItem(key);

    if (jsonValue != null) return JSON.parse(jsonValue);

    if (typeof defaultValue === "function") {
      return defaultValue();
    }

    return defaultValue;
  }) as T | undefined);

  useEffect(() => {
    if (value === undefined) return localStorage.removeItem(key);

    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  const remove = useCallback(() => {
    setValue(undefined);
  }, []);

  return [value, setValue, remove];
}
