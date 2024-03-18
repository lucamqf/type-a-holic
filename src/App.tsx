import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEventListener } from "@/hooks/useEventListenet";
import { cn } from "@/lib/utils";
import words from "@/data/words.json";

function App() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [randomWords, setRandomWords] = useState<string[]>(generateWords());
  const [wordInFocus, setWordInfocus] = useState(0);
  const [typedWord, setTypedWord] = useState("");
  const [inScreenCorrectWords, setInScreenCorrectWords] = useState<string[]>(
    []
  );
  const [inScreenWrongWords, setInScreenWrongWords] = useState<string[]>([]);
  const [correctWordsCount, setCorrectWordsCount] = useState(0);
  const [wrongWordsCount, setWrongWordsCount] = useState(0);

  useEventListener("keydown", handleCompleteWord, inputRef.current);

  function generateWords() {
    const amountOfWords = 20;

    const randomWords: string[] = [];

    while (randomWords.length < amountOfWords) {
      const randomIndex = Math.floor(Math.random() * words.length);

      if (randomWords.includes(words[randomIndex])) continue;

      randomWords.push(words[randomIndex]);
    }

    return randomWords;
  }

  function handleCompleteWord(event: KeyboardEvent) {
    if (event.key !== " " && event.key !== "Enter") return;

    const word = randomWords[wordInFocus];

    const cleanedTypedWord = typedWord.trim();

    if (word === cleanedTypedWord) {
      setInScreenCorrectWords((prev) => [...prev, word]);
    } else {
      setInScreenWrongWords((prev) => [...prev, word]);
    }

    setTypedWord("");

    if (wordInFocus + 1 === randomWords.length) {
      goToNewWordsPage();
      return;
    }

    setWordInfocus((prev) => prev + 1);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;

    const trimmedWord = value.trim();

    setTypedWord(trimmedWord);
  }

  function goToNewWordsPage() {
    setWordInfocus(0);

    setCorrectWordsCount((prev) => prev + inScreenCorrectWords.length);
    setWrongWordsCount((prev) => prev + inScreenWrongWords.length);

    setInScreenCorrectWords([]);
    setInScreenWrongWords([]);

    const newWords = generateWords();
    setRandomWords(newWords);
  }

  useEffect(() => {
    const shouldGenerateMoreWords = wordInFocus + 1 > randomWords.length;

    if (shouldGenerateMoreWords) {
      generateWords();
    }
  }, [randomWords, wordInFocus]);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-6 bg-slate-50">
      <Card className="flex max-w-[600px] flex-col gap-6 p-6">
        <div className="flex flex-wrap gap-x-[4px] gap-y-4 ">
          {randomWords.map((word, index) => (
            <p
              key={word}
              className={cn([
                wordInFocus === index ? "bg-slate-200" : "bg-transparent",
                inScreenCorrectWords.includes(word) ? "bg-green-200" : "",
                inScreenWrongWords.includes(word) ? "bg-red-200" : "",
                "rounded-lg px-2 py-[2px]",
              ])}
            >
              {word}
            </p>
          ))}
        </div>
      </Card>

      <Input
        ref={inputRef}
        className="w-full max-w-[600px] bg-white"
        placeholder="Digite a palavra aqui"
        value={typedWord}
        onChange={handleChange}
      />
    </div>
  );
}

export default App;
