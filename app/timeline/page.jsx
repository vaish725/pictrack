"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getChild, markCompleted } from "@/lib/storage";
import { ageInWeeks, getItemStatus, getNextItem } from "@/lib/dateUtils";
import { VACCINE_SCHEDULE } from "@/lib/schedule";
import TimelineItem from "@/components/TimelineItem";
import IconLegend from "@/components/IconLegend";

export default function Timeline() {
  const router = useRouter();
  const [child, setChild] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const existing = getChild();
    if (!existing) {
      router.replace("/");
      return;
    }
    // localStorage isn't readable during SSR, so this must run client-side on mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setChild(existing);
  }, [router]);

  if (!child) return null;

  const currentAgeWeeks = ageInWeeks(child.birthDate);
  const nextItem = getNextItem(VACCINE_SCHEDULE, child.completed);

  function handleMarkDone(id) {
    const updated = markCompleted(id);
    setChild(updated);
    setSelectedId(null);
  }

  return (
    <div className="flex flex-1 flex-col items-center gap-6 bg-zinc-50 px-4 py-10">
      <h1 className="text-2xl font-semibold text-zinc-900">
        {child.name}&apos;s timeline
      </h1>
      <IconLegend />

      <div className="flex w-full max-w-md flex-col gap-4">
        {VACCINE_SCHEDULE.map((item) => (
          <TimelineItem
            key={item.id}
            item={item}
            status={getItemStatus(item, child.completed, currentAgeWeeks)}
            isNext={nextItem?.id === item.id}
            isSelected={selectedId === item.id}
            onSelect={(id) => setSelectedId((prev) => (prev === id ? null : id))}
            onMarkDone={handleMarkDone}
          />
        ))}
      </div>

      <p className="max-w-sm text-center text-xs text-zinc-400">
        Schedule based on WHO&apos;s recommended routine immunizations. This
        app reminds and explains — it is not medical advice.
      </p>
    </div>
  );
}
