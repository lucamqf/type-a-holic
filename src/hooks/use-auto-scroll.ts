import { useCallback, useEffect, useRef, useState } from "react";

interface IUseAutoScroll {
  activeWord: number;
  shouldAutoScroll?: boolean;
  onOverlapped?: () => void;
}

export function useAutoScroll<T extends HTMLDivElement>({
  activeWord,
  shouldAutoScroll = true,
  onOverlapped = () => undefined,
}: IUseAutoScroll) {
  const activeWordRef = useRef<HTMLDivElement>(null);

  const scrollRef = useRef<T>(null);
  const previousActiveWord = useRef<number>(0);
  const previousPosition = useRef<number>(0);

  const [wordsPosition, setWordsPosition] = useState<Record<string, number>>(
    {}
  );

  const handleRegisterWord = useCallback(
    (index: number, verticalPosition: number) => {
      const scrollPosition = scrollRef.current?.offsetTop ?? 0;
      const truePosition = verticalPosition - scrollPosition;

      if (wordsPosition[index] === truePosition) return;

      const position = Number.isNaN(truePosition) ? 0 : truePosition;

      setWordsPosition((prev) => ({ ...prev, [index]: position }));
    },
    [wordsPosition]
  );

  function resetScroll() {
    scroll(0);
    setWordsPosition({});
  }

  function scroll(position: number) {
    scrollRef.current?.scrollTo({
      top: position,
      behavior: "smooth",
    });
  }

  function handleScroll() {
    const currentWordPosition = wordsPosition?.[activeWord];
    const cellSize = getSmallestCellSize();
    const previousWordPosition = wordsPosition?.[activeWord - 1];

    const [currentPosition, previousPosition] = [
      currentWordPosition ?? 0,
      previousWordPosition ?? 0,
    ];

    if (shouldScrollToPreviousWord(previousPosition, currentPosition)) {
      scrollToPreviousWord(previousPosition);
      return;
    }

    if (
      !currentWordPosition ||
      isWithinFirstFourRows(currentPosition, cellSize)
    ) {
      previousActiveWord.current = activeWord;

      if (
        isFourthRow(currentPosition, cellSize) &&
        previousPosition < currentPosition
      ) {
        scroll(previousWordPosition);
      }

      return;
    }

    if (shouldScrollDown(previousPosition, currentPosition, cellSize)) {
      scroll(previousPosition);
    }

    previousActiveWord.current = activeWord;
  }

  function getSmallestCellSize(): number {
    return Object.values(wordsPosition ?? {})
      .filter(Boolean)
      .sort((a, b) => a - b)[0];
  }

  function shouldScrollToPreviousWord(
    previousWordPosition: number,
    currentWordPosition: number
  ): boolean {
    return (
      previousActiveWord.current > activeWord &&
      previousWordPosition < currentWordPosition
    );
  }

  function shouldScrollDown(
    previousCurrentWordPosition: number,
    currentWordPosition: number,
    cellSize: number
  ): boolean {
    if (previousCurrentWordPosition === currentWordPosition) return false;

    return currentWordPosition % (cellSize * 2) === 0;
  }

  function scrollToPreviousWord(previousWordPosition: number): void {
    previousActiveWord.current = activeWord;

    const lastItemWithSmallerPositionIndex = Object.values(wordsPosition ?? {})
      .reverse()
      .findIndex((position) => position < previousWordPosition);

    const wordToScrollToIndex =
      Object.keys(wordsPosition ?? {}).length -
      lastItemWithSmallerPositionIndex -
      1;

    if (wordToScrollToIndex <= 0) {
      scroll(0);
      return;
    }

    const scrollPosition = Object.values(wordsPosition ?? {})[
      wordToScrollToIndex
    ];
    scroll(scrollPosition);
  }

  function isWithinFirstFourRows(
    currentWordPosition: number,
    cellSize: number
  ): boolean {
    return currentWordPosition <= cellSize * 3;
  }

  function isFourthRow(currentWordPosition: number, cellSize: number): boolean {
    return currentWordPosition === cellSize * 3;
  }

  function scrollToNextRow() {
    const cellSize = getSmallestCellSize();

    if (!cellSize) return;

    const nextRowPosition = previousPosition.current + getSmallestCellSize();

    previousPosition.current = nextRowPosition;

    scroll(nextRowPosition);

    if (!activeWordRef.current || !scrollRef.current) return;

    const currentWordPosition =
      activeWordRef.current.offsetTop - scrollRef.current.offsetTop;

    console.log({ currentWordPosition, nextRowPosition });

    if (currentWordPosition < nextRowPosition) {
      onOverlapped();
    }
  }

  useEffect(() => {
    if (shouldAutoScroll) {
      handleScroll();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordsPosition, activeWord]);

  useEffect(() => {}, []);

  return {
    scrollRef,
    activeWordRef,
    resetScroll,
    registerWord: handleRegisterWord,
    scrollToNextRow,
  };
}
