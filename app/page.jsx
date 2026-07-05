"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Baby } from "lucide-react";
import { getChild } from "@/lib/storage";
import AddChildForm from "@/components/AddChildForm";

export default function Home() {
  const router = useRouter();
  const [checkedStorage, setCheckedStorage] = useState(false);

  useEffect(() => {
    if (getChild()) {
      router.replace("/timeline");
    } else {
      // localStorage isn't readable during SSR, so this must run client-side on mount.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCheckedStorage(true);
    }
  }, [router]);

  if (!checkedStorage) return null;

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 bg-zinc-50 px-6 py-16 text-center">
      <Baby size={64} className="text-blue-600" />
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
        Add your child
      </h1>
      <AddChildForm onAdded={() => router.push("/timeline")} />
      <p className="max-w-sm text-xs text-zinc-400">
        This app reminds and explains a public vaccine schedule. It is not
        medical advice — always follow guidance from your health worker.
      </p>
    </div>
  );
}
