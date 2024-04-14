export function calculateScore(
  maxBugs,
  maxHints,
  time,
  solutionType,
  bugs,
  hints
) {
  return (
    0.75 * (1 - hints / maxHints) +
    (1 - bugs / maxBugs) +
    (1 - time / 45) +
    0.75 * (solutionType / 4)
  );
}

export function removeUnicodeAndLowerCase(str) {
  return str
    .replace(/[^\x00-\x7F]/g, "")
    .toLowerCase()
    .trim();
}

export function sanitizeInput(input) {
  return input ? input.replace(/</g, "&lt;").replace(/>/g, "&gt;") : "";
}
