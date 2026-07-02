const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000;

export function ageInWeeks(birthDate, today = new Date()) {
  const birth = new Date(birthDate);
  return Math.floor((today - birth) / MS_PER_WEEK);
}

export function getItemStatus(item, completed, currentAgeWeeks) {
  if (completed.includes(item.id)) return "done";
  if (currentAgeWeeks > item.ageWeeks) return "overdue";
  return "upcoming";
}

export function getNextItem(schedule, completed) {
  return schedule.find((item) => !completed.includes(item.id)) ?? null;
}
