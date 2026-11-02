/**
 * Textidy 六个工具的组合逻辑:只做编排(把 transforms.ts 的纯函数按工具语义串起来),
 * 不重复实现任何变换本身。每个导出都可单测,站上引擎与 MCP server 共用同一份实现。
 */
import {
  cleanText, dedupeLines, loremParagraphs, loremWords, removeExtraSpaces, slugify, sortLines,
} from "./transforms";

/* --------------------------------------------------------------------------
 * case-studio:8 种大小写一次并列(纯接线,无组合逻辑;引擎直接调 transforms)。
 * -------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------
 * text-cleaner:四个开关按固定顺序应用,并给出每步的精确变化计数。
 * 顺序:字符清洗 → 多余空白 → 去重行 → 排序行。
 * -------------------------------------------------------------------------- */

export type CleanerToggles = { clean: boolean; spaces: boolean; dedupe: boolean; sort: boolean };
export type CleanerCounts = { clean: number; spaces: number; dedupe: number; sort: number };

/** cleanText.normalizePunct 会归一化的字符(计数用:多为 1:1 替换,… 例外展开为 3 字符,故不能用长度差)。 */
const PUNCT_NORM_RE = /[\u2018\u2019\u201b\u201c\u201d\u201e\u2013\u2014\u2026\u00a0]/g;
/** removeExtraSpaces 会折叠的空白段(每段记 1 次变化)。 */
const WS_RUN_RE = / {2,}|\t+/g;

/**
 * 按固定顺序应用启用的清理步骤。计数语义:
 * - clean   → 清除/归一的字符数(不可见字符 + 弯引号/破折号 + 折叠掉的空格 + 行首尾空白)
 * - spaces  → 折叠的空白段数(连续空格/制表符,各记 1)
 * - dedupe  → 移除的重复行数(含空行去重)
 * - sort    → 排序后位置发生变化的行数
 */
export function runCleaner(
  input: string,
  o: CleanerToggles,
): { output: string; counts: CleanerCounts } {
  const counts: CleanerCounts = { clean: 0, spaces: 0, dedupe: 0, sort: 0 };
  let s = input;

  if (o.clean) {
    // 分步调用 cleanText 以精确计数(与单次全量调用结果一致:各子选项互不影响)。
    const s1 = cleanText(s, { removePrintable: true });
    counts.clean += s.length - s1.length;
    counts.clean += (s1.match(PUNCT_NORM_RE) ?? []).length;
    const s2 = cleanText(s1, { normalizePunct: true });
    const s3 = cleanText(s2, { collapseSpaces: true });
    counts.clean += s2.length - s3.length;
    const s4 = cleanText(s3, { trimLines: true });
    counts.clean += s3.length - s4.length;
    s = cleanText(input, { removePrintable: true, normalizePunct: true, collapseSpaces: true, trimLines: true });
  }
  if (o.spaces) {
    counts.spaces = (s.match(WS_RUN_RE) ?? []).length;
    s = removeExtraSpaces(s, { tabs: true });
  }
  if (o.dedupe) {
    const before = s.split(/\r?\n/).length;
    s = dedupeLines(s);
    counts.dedupe = before - s.split(/\r?\n/).length;
  }
  if (o.sort) {
    const inLines = s.split(/\r?\n/);
    s = sortLines(s, "asc");
    const outLines = s.split(/\r?\n/);
    counts.sort = inLines.filter((l, i) => l !== outLines[i]).length;
  }
  return { output: s, counts };
}

/* --------------------------------------------------------------------------
 * slug-forge:slugify + 分隔符/大写/停用词选项(停用词在 slugify 之前剔除)。
 * -------------------------------------------------------------------------- */

/** 英文停用词表(slug 常见诉求:去掉 the/of/and 等虚词)。 */
export const SLUG_STOPWORDS = new Set([
  "a", "an", "and", "as", "at", "but", "by", "for", "from", "in", "into", "nor",
  "of", "on", "onto", "or", "the", "to", "with",
]);

export type SlugForgeOptions = {
  separator?: "-" | "_";
  uppercase?: boolean;
  removeStopwords?: boolean;
};

/**
 * 生成 URL slug:先按需剔除停用词(按词核匹配,忽略大小写与标点),
 * 再走 transforms.slugify(小写、去重音符、折叠分隔),最后替换分隔符/转大写。
 * 纯 CJK 等非拉丁输入会得到空串(slugify 语义,不抛错)。
 */
export function slugForge(s: string, o: SlugForgeOptions = {}): string {
  let src = s;
  if (o.removeStopwords) {
    src = src
      .split(/\s+/)
      .filter((w) => {
        const core = w.replace(/[^\p{L}\p{N}]/gu, "").toLowerCase();
        return core !== "" && !SLUG_STOPWORDS.has(core);
      })
      .join(" ");
  }
  const base = slugify(src);
  const out = o.separator === "_" ? base.replace(/-/g, "_") : base;
  return o.uppercase ? out.toUpperCase() : out;
}

/* --------------------------------------------------------------------------
 * lorem-generator:classic 直接用 transforms 的 loremWords / loremParagraphs;
 * modern 用 lipsum.com 的 de Finibus 现代填充文词库,固定以 "But" 开头,
 * 且保证输出永不包含 "Lorem ipsum"。
 * -------------------------------------------------------------------------- */

export type LoremMode = "paragraphs" | "sentences" | "words";
export type LoremStyle = "classic" | "modern";

/** lipsum.com "modern filler"(Cicero, De Finibus 译段)的词库(小写、去重)。 */
export const MODERN_WORDS = [
  "must", "explain", "you", "how", "all", "this", "mistaken", "idea", "of", "denouncing",
  "pleasure", "and", "praising", "pain", "was", "born", "will", "give", "a", "complete",
  "account", "the", "system", "expound", "actual", "teachings", "great", "explorer", "truth",
  "master-builder", "human", "happiness", "no", "one", "rejects", "dislikes", "or", "avoids",
  "itself", "because", "it", "is", "but", "those", "who", "do", "not", "know", "to", "pursue",
  "rationally", "encounter", "consequences", "that", "are", "extremely", "painful", "nor",
  "again", "there", "anyone", "loves", "or", "desires", "obtain", "occasionally",
  "circumstances", "occur", "in", "which", "toil", "can", "procure", "him", "some", "take",
  "trivial", "example", "us", "ever", "undertakes", "laborious", "physical", "exercise",
  "except", "advantage", "from", "has", "any", "right", "find", "fault", "with", "man",
  "chooses", "enjoy", "annoying", "produces", "resultant",
];

/** modern 模式的固定开头(与 lipsum.com 的现代填充文一致:以 "But I must explain to you" 起句)。 */
const MODERN_OPENER = ["But", "I", "must", "explain", "to", "you"];

export const LOREM_LIMITS = { words: 5000, sentences: 500, paragraphs: 100 } as const;

/** 与 transforms.loremWords 同一线性同余发生器,词库参数化。 */
function bankWords(bank: string[], n: number, seed: number, opener: string[] = []): string {
  let s = seed;
  const rand = () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
  const fromOpener = opener.slice(0, n);
  const rest = Array.from({ length: Math.max(0, n - fromOpener.length) }, () => bank[Math.floor(rand() * bank.length)]);
  const words = [...fromOpener, ...rest];
  if (words.length === 0) return "";
  let text = words.join(" ");
  text = text.charAt(0).toUpperCase() + text.slice(1);
  return text.endsWith(".") ? text : text + ".";
}

/** 一组句子(classic 走 transforms.loremWords,modern 走词库)。首句可带固定开头。 */
function bankSentences(style: LoremStyle, n: number, seed: number): string[] {
  const out: string[] = [];
  for (let i = 0; i < n; i++) {
    const len = 8 + ((seed * (i + 1) * (i + 3)) % 12);
    if (style === "classic") {
      out.push(loremWords(len, seed + i * 977));
    } else {
      const opener = i === 0 ? MODERN_OPENER : [];
      out.push(bankWords(MODERN_WORDS, len, seed + i * 977, opener));
    }
  }
  return out;
}

function capFirst(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export type LoremOptions = {
  mode: LoremMode;
  count: number;
  style: LoremStyle;
  seed?: number;
  /** 用 <p> 包裹段落(words/sentences 视为单段)。 */
  html?: boolean;
};

/** 生成占位文本;count 超界时按 LOREM_LIMITS 收敛。 */
export function generateLorem(o: LoremOptions): string {
  const seed = Math.abs(Math.floor(o.seed ?? Date.now())) || 1;
  const count = Math.max(1, Math.floor(o.count) || 1);
  let out = "";

  if (o.mode === "words") {
    const n = Math.min(count, LOREM_LIMITS.words);
    out = o.style === "classic"
      ? loremWords(n, seed)
      : bankWords(MODERN_WORDS, n, seed, MODERN_OPENER);
  } else if (o.mode === "sentences") {
    const n = Math.min(count, LOREM_LIMITS.sentences);
    out = bankSentences(o.style, n, seed).join(" ");
  } else {
    const n = Math.min(count, LOREM_LIMITS.paragraphs);
    if (o.style === "classic") {
      out = loremParagraphs(n, seed);
    } else {
      const paras: string[] = [];
      for (let p = 0; p < n; p++) {
        const sentences = 3 + (Math.abs(Math.floor(seed + p * 7919)) % 3);
        paras.push(bankSentences("modern", sentences, seed + p * 131).join(" "));
      }
      out = paras.join("\n\n");
    }
  }

  if (o.html) {
    const paras = out.split(/\n{2,}/).filter((p) => p !== "");
    return paras.map((p) => `<p>${p}</p>`).join("\n");
  }
  return out;
}

/* --------------------------------------------------------------------------
 * word-surgeon:查找替换 → 每行前后缀 → 行号(按固定顺序),配合 countTextStats。
 * -------------------------------------------------------------------------- */

/** 字面量查找替换全部出现;find 为空串原样返回;replace 不解释 $ 模式。 */
export function replaceAll(
  s: string,
  find: string,
  replace: string,
  o: { matchCase?: boolean } = {},
): string {
  if (find === "") return s;
  const esc = find.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(esc, o.matchCase ? "g" : "gi");
  return s.replace(re, () => replace);
}

/** 给每一行加前后缀(项目符号、引号包裹等)。 */
export function addAffixes(s: string, prefix: string, suffix: string): string {
  if (prefix === "" && suffix === "") return s;
  return s
    .split(/\r?\n/)
    .map((l) => prefix + l + suffix)
    .join("\n");
}

/** 行号编号:从 start 起,序号左补空格对齐到最大宽度,格式 "N. 行"。 */
export function numberLines(s: string, start = 1): string {
  const lines = s.split(/\r?\n/);
  const width = String(start + Math.max(lines.length - 1, 0)).length;
  return lines
    .map((l, i) => `${String(start + i).padStart(width, " ")}. ${l}`)
    .join("\n");
}
