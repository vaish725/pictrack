"use client";

import { useState } from "react";
import { saveChild } from "@/lib/storage";

export default function AddChildForm({ onAdded }) {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !birthDate) return;
    const child = {
      id: crypto.randomUUID(),
      name: name.trim(),
      birthDate,
      completed: [],
    };
    saveChild(child);
    onAdded(child);
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-sm flex-col gap-4">
      <label className="flex flex-col gap-1 text-left">
        <span className="text-sm font-medium text-zinc-700">Child&apos;s name</span>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-xl border border-zinc-300 px-4 py-3 text-lg"
          placeholder="e.g. Amina"
          required
        />
      </label>
      <label className="flex flex-col gap-1 text-left">
        <span className="text-sm font-medium text-zinc-700">Date of birth</span>
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="rounded-xl border border-zinc-300 px-4 py-3 text-lg"
          required
        />
      </label>
      <button
        type="submit"
        className="rounded-full bg-blue-600 px-6 py-4 text-lg font-medium text-white active:bg-blue-700"
      >
        Add child
      </button>
    </form>
  );
}
