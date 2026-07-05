import { Check, TriangleAlert, Circle } from "lucide-react";

const ITEMS = [
  { icon: Check, label: "Done", className: "text-emerald-600" },
  { icon: Circle, label: "Upcoming", className: "text-zinc-400" },
  { icon: TriangleAlert, label: "Still due", className: "text-amber-600" },
];

export default function IconLegend() {
  return (
    <div className="flex items-center justify-center gap-6 text-sm text-zinc-600">
      {ITEMS.map(({ icon: Icon, label, className }) => (
        <div key={label} className="flex items-center gap-2">
          <Icon size={18} className={className} />
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
