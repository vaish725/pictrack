// Source: WHO, "Summary of WHO Position Papers — Recommended Routine
// Immunizations for Children" (Table 2, updated September 2020).
// https://www.who.int/docs/default-source/immunization/tables/immunization-routine-table2.pdf
// Only the "Recommendations for all children" (universal) antigens are
// included. Ages given in months by WHO are converted to weeks
// (1 month ≈ 4.345 weeks) for a single sortable field.
export const VACCINE_SCHEDULE = [
  {
    id: "bcg",
    ageWeeks: 0,
    label: "At birth",
    icon: "shield",
    audioText:
      "This shot protects against a serious lung and body infection called tuberculosis. It's usually given as a single small mark on the arm right after birth.",
  },
  {
    id: "hepb-birth",
    ageWeeks: 0,
    label: "At birth",
    icon: "syringe",
    audioText:
      "This shot protects your baby's liver from a virus called hepatitis B. It should be given as soon as possible after birth.",
  },
  {
    id: "opv-birth",
    ageWeeks: 0,
    label: "At birth",
    icon: "droplet",
    audioText:
      "These are drops given by mouth to protect against polio, a disease that can weaken a child's legs.",
  },
  {
    id: "visit-6wk",
    ageWeeks: 6,
    label: "6 weeks",
    icon: "syringe",
    audioText:
      "At six weeks, your baby gets the first round of shots and drops protecting against whooping cough, tetanus, diphtheria, polio, and other common childhood illnesses.",
  },
  {
    id: "visit-10wk",
    ageWeeks: 10,
    label: "10 weeks",
    icon: "syringe",
    audioText:
      "At ten weeks, your baby gets the second round of the same protective shots and drops as before.",
  },
  {
    id: "visit-14wk",
    ageWeeks: 14,
    label: "14 weeks",
    icon: "syringe",
    audioText:
      "At fourteen weeks, your baby gets the third and final round of this early set of shots and drops.",
  },
  {
    id: "measles-rubella-1",
    ageWeeks: 39,
    label: "9 months",
    icon: "syringe",
    audioText:
      "At nine months, your baby gets a shot protecting against measles and rubella, two illnesses that spread easily and can make children very sick.",
  },
  {
    id: "measles-rubella-2",
    ageWeeks: 65,
    label: "15 months",
    icon: "syringe",
    audioText:
      "This is a second, booster shot for measles and rubella, plus a booster for the earlier shots, to keep your child's protection strong.",
  },
];
