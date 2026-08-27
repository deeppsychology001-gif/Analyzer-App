/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ScriptStats } from "../types";

/**
 * Highly optimized, zero-allocation word counter.
 * Iterates through the text once, avoiding creating massive temporary arrays.
 */
export function countWords(text: string): number {
  let count = 0;
  let inWord = false;
  const len = text.length;

  for (let i = 0; i < len; i++) {
    const char = text[i];
    const isSpace = char === " " || char === "\t" || char === "\n" || char === "\r";
    if (!isSpace) {
      if (!inWord) {
        count++;
        inWord = true;
      }
    } else {
      inWord = false;
    }
  }
  return count;
}

/**
 * Counts characters without any whitespaces (spaces, tabs, newlines).
 */
export function countCharsWithoutSpaces(text: string): number {
  let count = 0;
  const len = text.length;

  for (let i = 0; i < len; i++) {
    const char = text[i];
    if (char !== " " && char !== "\t" && char !== "\n" && char !== "\r") {
      count++;
    }
  }
  return count;
}

/**
 * Counts sentences ending with '.', '?', or '!' that are followed by spaces/newlines or end of text.
 */
export function countSentences(text: string): number {
  let count = 0;
  let lastCharWasTerminal = false;
  const len = text.length;

  for (let i = 0; i < len; i++) {
    const char = text[i];
    if (char === "." || char === "?" || char === "!") {
      if (!lastCharWasTerminal) {
        count++;
        lastCharWasTerminal = true;
      }
    } else if (char !== " " && char !== "\n" && char !== "\r" && char !== "\t") {
      lastCharWasTerminal = false;
    }
  }
  return count;
}

/**
 * Counts paragraphs, where a paragraph is a block of non-empty lines separated by empty lines.
 */
export function countParagraphs(text: string): number {
  let count = 0;
  let inParagraph = false;
  let lineHasContent = false;
  const len = text.length;

  for (let i = 0; i < len; i++) {
    const char = text[i];
    if (char === "\n") {
      if (lineHasContent) {
        if (!inParagraph) {
          count++;
          inParagraph = true;
        }
        lineHasContent = false;
      } else {
        inParagraph = false;
      }
    } else if (char !== "\r" && char !== " " && char !== "\t") {
      lineHasContent = true;
    }
  }

  if (lineHasContent && !inParagraph) {
    count++;
  }

  return count;
}

/**
 * Counts total lines in the script.
 */
export function countLines(text: string): number {
  if (text.length === 0) return 0;
  let count = 1;
  const len = text.length;

  for (let i = 0; i < len; i++) {
    if (text[i] === "\n") {
      count++;
    }
  }
  return count;
}

/**
 * Performs full live analysis on the given script text.
 */
export function analyzeScript(text: string): ScriptStats {
  if (!text) {
    return {
      charactersWithSpaces: 0,
      charactersWithoutSpaces: 0,
      words: 0,
      sentences: 0,
      paragraphs: 0,
      lines: 0,
      readingTimeSeconds: 0,
      speakingTimeSeconds: 0,
    };
  }

  const words = countWords(text);
  
  // Reading Time: 200 words/minute -> 200 words / 60 seconds = 3.33 words per second
  const readingTimeSeconds = Math.round((words / 200) * 60);

  // Speaking Time: 150 words/minute -> 150 words / 60 seconds = 2.5 words per second
  const speakingTimeSeconds = Math.round((words / 150) * 60);

  return {
    charactersWithSpaces: text.length,
    charactersWithoutSpaces: countCharsWithoutSpaces(text),
    words: words,
    sentences: countSentences(text),
    paragraphs: countParagraphs(text),
    lines: countLines(text),
    readingTimeSeconds,
    speakingTimeSeconds,
  };
}

/**
 * "Remove Empty Lines" feature:
 * 1. Remove every completely blank line.
 * 2. Remove multiple consecutive blank lines.
 * 3. Keep all normal paragraphs.
 * 4. Do NOT remove line breaks that actually contain text.
 * 5. Preserve punctuation exactly.
 * 6. Preserve capitalization exactly.
 * 7. Do not change any words.
 */
export function removeEmptyLines(text: string): string {
  if (!text) return "";
  const lines = text.split(/\r?\n/);
  const nonEmptyLines = lines.filter((line) => line.trim().length > 0);
  return nonEmptyLines.join("\n");
}

/**
 * "Normalize Spacing" feature:
 * - Remove extra spaces between words.
 * - Remove spaces before commas.
 * - Remove spaces before periods.
 * - Remove trailing spaces.
 * - Keep one space after punctuation.
 * - Do not change line order.
 */
export function normalizeSpacing(text: string): string {
  if (!text) return "";
  const lines = text.split(/\r?\n/);
  
  const normalizedLines = lines.map((line) => {
    // 1. Remove leading and trailing spaces for this line (trailing spaces removed)
    let processed = line.trim();
    if (!processed) return "";

    // 2. Remove extra spaces between words (multiple spaces replaced with single space)
    processed = processed.replace(/[ \t]+/g, " ");

    // 3. Remove spaces before commas and periods (plus other standard punctuations)
    // e.g. "word , word" -> "word, word", "word ." -> "word."
    processed = processed.replace(/\s+([.,;:!?])/g, "$1");

    // 4. Keep exactly one space after punctuation (comma, period, colon, semicolon, question mark, exclamation)
    // if followed by any character (excluding other punctuations like quotes, parentheses, ellipses etc.)
    processed = processed.replace(/([.,;:!?]) *(?=[a-zA-Z0-9])/g, "$1 ");

    return processed;
  });

  return normalizedLines.join("\n");
}

/**
 * Formats seconds into MM:SS format or readable minutes/seconds.
 */
export function formatTime(totalSeconds: number): string {
  if (totalSeconds < 60) {
    return `${totalSeconds}s`;
  }
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return seconds > 0 ? `${minutes}m ${seconds}s` : `${minutes}m`;
}
