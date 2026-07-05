"use client";

import { useState, useEffect } from "react";
import { Volume2, Pause } from "lucide-react";

export default function AudioButton({ text }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Browser feature detection can't run during SSR, so this must run client-side on mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsSupported(typeof window !== "undefined" && "speechSynthesis" in window);
  }, []);

  function handleClick() {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  }

  if (!isSupported) {
    return (
      <p className="text-sm text-zinc-500">
        Audio isn&apos;t available on this device — read the explanation above.
      </p>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={isSpeaking ? "Stop audio" : "Play audio explanation"}
      className="flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-white active:bg-blue-700"
    >
      {isSpeaking ? <Pause size={20} /> : <Volume2 size={20} />}
      <span>{isSpeaking ? "Stop" : "Listen"}</span>
    </button>
  );
}
