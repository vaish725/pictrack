"use client";

import { Eye, Volume2, Check, Info } from "lucide-react";
import AudioButton from "./AudioButton";

const STEPS = [
  { icon: Eye, label: "See what's next" },
  { icon: Volume2, label: "Hear it explained" },
  { icon: Check, label: "Mark it done" },
];

const WELCOME_AUDIO =
  "Welcome to PicTrack. This app shows your child's vaccines using pictures and sound, so you don't need to read anything. Tap an item to see it explained and hear it read aloud. Mark it done, and the next one is shown automatically. This app is not medical advice — it only reminds and explains a public vaccine schedule. Always follow your health worker's guidance.";

export default function Onboarding({ onDone }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 bg-zinc-50 px-6 py-16 text-center">
      <div className="flex items-center justify-center gap-6">
        {STEPS.map(({ icon: Icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-2">
            <Icon size={40} className="text-blue-600" />
            <span className="text-sm text-zinc-600">{label}</span>
          </div>
        ))}
      </div>

      <AudioButton text={WELCOME_AUDIO} />

      <div className="flex max-w-sm items-start gap-3 rounded-2xl border-2 border-blue-200 bg-blue-50 p-4 text-left">
        <Info size={24} className="mt-0.5 shrink-0 text-blue-600" />
        <p className="text-sm text-zinc-700">
          Not medical advice. This app only reminds and explains a public
          vaccine schedule — always follow your health worker&apos;s
          guidance.
        </p>
      </div>

      <button
        type="button"
        onClick={onDone}
        className="rounded-full bg-blue-600 px-8 py-4 text-lg font-medium text-white active:bg-blue-700"
      >
        Got it
      </button>
    </div>
  );
}
