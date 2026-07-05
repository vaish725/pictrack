"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Baby } from "lucide-react";
import { getChild, hasSeenOnboarding, markOnboardingSeen } from "@/lib/storage";
import AddChildForm from "@/components/AddChildForm";
import Onboarding from "@/components/Onboarding";

export default function Home() {
  const router = useRouter();
  const [checkedStorage, setCheckedStorage] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    // localStorage isn't readable during SSR, so this must run client-side on mount.
    if (!hasSeenOnboarding()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowOnboarding(true);
      setCheckedStorage(true);
    } else if (getChild()) {
      router.replace("/timeline");
    } else {
      setCheckedStorage(true);
    }
  }, [router]);

  function handleOnboardingDone() {
    markOnboardingSeen();
    if (getChild()) {
      router.replace("/timeline");
    } else {
      setShowOnboarding(false);
    }
  }

  if (!checkedStorage) return null;

  if (showOnboarding) {
    return <Onboarding onDone={handleOnboardingDone} />;
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 bg-zinc-50 px-6 py-16 text-center">
      <Baby size={64} className="text-blue-600" />
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
        Add your child
      </h1>
      <AddChildForm onAdded={() => router.push("/timeline")} />
    </div>
  );
}
