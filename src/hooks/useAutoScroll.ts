import { useEffect, useRef, useState } from "react";

interface IUseAutoScroll {
  activeWord: number;
}

export function useAutoScroll<T extends HTMLDivElement>({
  activeWord,
}: IUseAutoScroll) {
  const scrollRef = useRef<T>(null);

  const [wordsPosition, setWordsPosition] = useState<Record<string, number>>(
    {}
  );

  function handleRegisterWord(index: number, verticalPosition: number) {
    const scrollPosition = scrollRef.current?.offsetTop ?? 0;

    const truePosition = verticalPosition - scrollPosition;

    if (wordsPosition[index] === truePosition) return;

    const position = Number.isNaN(truePosition) ? 0 : truePosition;

    setWordsPosition((prev) => ({ ...prev, [index]: position }));
  }

  function scroll(position: number) {
    scrollRef.current?.scrollTo({
      top: position,
      behavior: "smooth",
    });
  }

  function handleScroll() {
    const currentWordPosition = wordsPosition?.[activeWord];

    const cellSize = Object.values(wordsPosition ?? {})
      .filter(Boolean)
      .sort((a, b) => a - b)[0];

    if (!currentWordPosition) return;

    if (currentWordPosition < cellSize * 3) return;

    const lastWordPosition = wordsPosition?.[activeWord - 1];

    if (lastWordPosition < currentWordPosition) {
      scroll(lastWordPosition);
    }
  }

  useEffect(() => {
    handleScroll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordsPosition, activeWord]);

  return {
    scrollRef,
    registerWord: handleRegisterWord,
  };
}
