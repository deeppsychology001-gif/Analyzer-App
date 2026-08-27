/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ScriptStats {
  charactersWithSpaces: number;
  charactersWithoutSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  lines: number;
  readingTimeSeconds: number; // calculated at 200 words/minute
  speakingTimeSeconds: number; // calculated at 150 words/minute
}
