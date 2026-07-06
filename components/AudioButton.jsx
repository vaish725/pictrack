"use client";

import { useState, useEffect, useMemo } from "react";
import { Volume2, Pause } from "lucide-react";

// Precomputes each word's character range so onboundary's charIndex
// (from the Web Speech API) can be mapped back to a word to highlight.
function buildWordOffsets(text) {
  const words = text.split(/\s+/).filter(Boolean);
  let searchFrom = 0;
  return words.map((word) => {
    const start = text.indexOf(word, searchFrom);
    searchFrom = start + word.length;
    return { word, start, end: searchFrom };
  });
}

export default function AudioButton({ text }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [activeWordIndex, setActiveWordIndex] = useState(null);
  const wordOffsets = useMemo(() => buildWordOffsets(text), [text]);

  useEffect(() => {
    // Browser feature detection can't run during SSR, so this must run client-side on mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsSupported(typeof window !== "undefined" && "speechSynthesis" in window);
  }, []);

  function handleClick() {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setActiveWordIndex(null);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    // Word-boundary support varies by browser; when absent, the
    // transcript below still renders, just without live highlighting.
    utterance.onboundary = (event) => {
      if (event.name && event.name !== "word") return;
      const idx = wordOffsets.findIndex(
        ({ start, end }) => event.charIndex >= start && event.charIndex < end
      );
      if (idx !== -1) setActiveWordIndex(idx);
    };
    utterance.onend = () => {
      setIsSpeaking(false);
      setActiveWordIndex(null);
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      setActiveWordIndex(null);
    };
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  }

  if (!isSupported) {
    return (
      <div className="flex flex-col items-start gap-2">
        <p className="text-sm text-zinc-500">
          Audio isn&apos;t available on this device — read the explanation
          below.
        </p>
        <p className="text-zinc-700">{text}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start gap-3">
      <button
        type="button"
        onClick={handleClick}
        aria-label={isSpeaking ? "Stop audio" : "Play audio explanation"}
        className="flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-white active:bg-blue-700"
      >
        {isSpeaking ? <Pause size={20} /> : <Volume2 size={20} />}
        <span>{isSpeaking ? "Stop" : "Listen"}</span>
      </button>
      <p className="text-zinc-700">
        {wordOffsets.map(({ word }, i) => (
          <span
            key={i}
            className={
              i === activeWordIndex ? "rounded bg-yellow-200 text-zinc-900" : undefined
            }
          >
            {word}{" "}
          </span>
        ))}
      </p>
    </div>
  );
}
