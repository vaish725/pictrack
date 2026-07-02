const STORAGE_KEY = "pictrack:child";

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
