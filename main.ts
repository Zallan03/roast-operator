import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "He has no laptop, but a phone, a voice note, and a rule: every message needs a title and a divider — even the one that says goodnight.";

// Gate guard: the entry must be one non-blank line of 1-140 characters.
// Count code points (not UTF-16 units) so multi-byte characters are
// measured the way the gate counts them.
const charCount = [...LINE].length;
if (charCount < 1 || charCount > 140) {
  throw new Error(`entry must be 1-140 characters, got ${charCount}`);
}
if (LINE.trim().length === 0 || /[\r\n]/.test(LINE)) {
  throw new Error("entry must be a single non-blank line");
}
if (LINE !== LINE.trim()) {
  throw new Error("entry must not start or end with whitespace");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Verify the written file round-trips byte-for-byte, with no trailing newline.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== LINE) {
  throw new Error("written entry does not match the line exactly");
}
