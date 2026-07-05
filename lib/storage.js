const STORAGE_KEY = "pictrack:child";
const ONBOARDED_KEY = "pictrack:onboarded";

export function getChild() {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  return JSON.parse(raw);
}

export function saveChild(child) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(child));
}

export function markCompleted(scheduleId) {
  const child = getChild();
  if (!child) return null;
  if (!child.completed.includes(scheduleId)) {
    child.completed = [...child.completed, scheduleId];
    saveChild(child);
  }
  return child;
}

export function hasSeenOnboarding() {
  if (typeof window === "undefined") return true;
  return window.localStorage.getItem(ONBOARDED_KEY) === "true";
}

export function markOnboardingSeen() {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ONBOARDED_KEY, "true");
}
