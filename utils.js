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

// Source: https://stackoverflow.com/questions/3426404/create-a-hexadecimal-colour-based-on-a-string-with-javascript
export const stringToColor = (str) => {
  let hash = 0;
  str.split("").forEach((char) => {
    hash = char.charCodeAt(0) + ((hash << 5) - hash);
  });
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += value.toString(16).padStart(2, "0");
  }
  return color;
};