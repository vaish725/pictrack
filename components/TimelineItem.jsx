"use client";

import { Shield, Syringe, Droplet, Check, TriangleAlert } from "lucide-react";
import AudioButton from "./AudioButton";

const ICONS = { shield: Shield, syringe: Syringe, droplet: Droplet };

const STATUS_STYLES = {
  done: "border-emerald-300 bg-emerald-50",
  overdue: "border-amber-300 bg-amber-50",
  upcoming: "border-zinc-200 bg-white",
};

const STATUS_LABELS = {
  done: { text: "Done", className: "text-emerald-700" },
  overdue: { text: "Still due", className: "text-amber-700" },
  upcoming: { text: "Upcoming", className: "text-zinc-500" },
};

export default function TimelineItem({
  item,
  status,
  isNext,
  isSelected,
  onSelect,
  onMarkDone,
}) {
  const Icon = ICONS[item.icon] ?? Syringe;
  const statusLabel = STATUS_LABELS[status];

  return (
    <div
      className={`rounded-2xl border-2 p-4 transition ${STATUS_STYLES[status]} ${
        isNext ? "ring-2 ring-blue-400" : ""
      }`}
    >
      <button
        type="button"
        onClick={() => onSelect(item.id)}
        className="flex w-full items-center gap-4 text-left"
      >
        <Icon size={32} className="shrink-0 text-zinc-700" />
        <div className="flex-1">
          <p className="text-lg font-medium text-zinc-900">{item.label}</p>
          <p className={`text-sm ${statusLabel.className}`}>{statusLabel.text}</p>
        </div>
        {status === "done" && <Check size={24} className="text-emerald-600" />}
        {status === "overdue" && <TriangleAlert size={24} className="text-amber-600" />}
      </button>

      {isSelected && (
        <div className="mt-4 flex flex-col items-start gap-3 border-t border-zinc-200 pt-4">
          <p className="text-zinc-700">{item.audioText}</p>
          <AudioButton text={item.audioText} />
          {status !== "done" && (
            <button
              type="button"
              onClick={() => onMarkDone(item.id)}
              className="rounded-full bg-emerald-600 px-5 py-3 font-medium text-white active:bg-emerald-700"
            >
              Mark as done
            </button>
          )}
        </div>
      )}
    </div>
  );
}
