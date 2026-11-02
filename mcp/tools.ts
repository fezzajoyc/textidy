import { z } from "zod";
import {
  countTextStats, htmlEscapeEntities, htmlUnescapeEntities,
  toAlternating, toCamel, toConstant, toKebab,
  toPascal, toSentenceCase, toSnake, toTitleCase,
} from "../tools/_lib/transforms";
import {
  LOREM_LIMITS, SLUG_STOPWORDS, addAffixes, generateLorem, numberLines,
  replaceAll, runCleaner, slugForge,
} from "../tools/_lib/textidy";

/**
 * Textidy MCP 工具注册表:把站上 6 个文本工具背后的纯函数暴露为 AI 可执行工具。
 * 站上的工具在浏览器里跑(交互式),这里跑同一份经过测试的实现——
 * 人和 AI 用同一套逻辑,而不是两套各写各的。
 */

const json = (v: unknown) => ({ content: [{ type: "text" as const, text: JSON.stringify(v, null, 2) }] });
const text = (t: string) => ({ content: [{ type: "text" as const, text: t }] });

export type McpToolDef = {
  name: string;
  title: string;
  description: string;
  schema: Record<string, any>;
  run: (args: any) => { content: { type: "text"; text: string }[]; isError?: boolean };
};

export const MCP_TOOLS: McpToolDef[] = [
  {
    name: "case_styles",
    title: "Case styles",
    description:
      "Convert text into 8 case styles at once: title_case (small words stay lowercase mid-sentence), sentence_case, camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE and aLtErNaTiNg. Returns an object keyed by style.",
    schema: { text: z.string().describe("text to convert") },
    run: (a) =>
      json({
        title_case: toTitleCase(a.text),
        sentence_case: toSentenceCase(a.text),
        camelCase: toCamel(a.text),
        PascalCase: toPascal(a.text),
        snake_case: toSnake(a.text),
        "kebab-case": toKebab(a.text),
        CONSTANT_CASE: toConstant(a.text),
        aLtErNaTiNg: toAlternating(a.text),
      }),
  },
  {
    name: "clean_text",
    title: "Clean text",
    description:
      "Clean messy text with toggleable passes applied in sequence: clean (remove invisible/control chars, normalize curly quotes/dashes/ellipsis, collapse space runs, trim line edges), spaces (collapse runs of spaces, tabs to single space), dedupe (drop duplicate lines, keep first), sort (natural A→Z line sort). Returns the cleaned text plus an exact change count per enabled pass.",
    schema: {
      text: z.string().describe("text to clean"),
      clean: z.boolean().default(true).describe("character-level cleanup pass"),
      spaces: z.boolean().default(false).describe("collapse extra spaces/tabs"),
      dedupe: z.boolean().default(false).describe("remove duplicate lines"),
      sort: z.boolean().default(false).describe("sort lines A→Z (after dedupe)"),
    },
    run: (a) => {
      const r = runCleaner(a.text, { clean: a.clean, spaces: a.spaces, dedupe: a.dedupe, sort: a.sort });
      return json({ text: r.output, changes: r.counts });
    },
  },
  {
    name: "slugify",
    title: "URL slug",
    description:
      "Turn text into a URL-safe slug: lowercase, accents stripped (café → cafe), non-alphanumerics folded into one separator. Options: separator '-' or '_', UPPERCASE variant, and removal of English stop words (the, of, and…) before joining. Pure CJK input yields an empty string.",
    schema: {
      text: z.string().describe("title or headline to slugify"),
      separator: z.enum(["-", "_"]).default("-"),
      uppercase: z.boolean().default(false),
      remove_stopwords: z.boolean().default(false).describe(`drop words like ${[...SLUG_STOPWORDS].slice(0, 8).join(", ")}…`),
    },
    run: (a) => text(slugForge(a.text, { separator: a.separator, uppercase: a.uppercase, removeStopwords: a.remove_stopwords })),
  },
  {
    name: "generate_lorem",
    title: "Lorem generator",
    description:
      "Generate placeholder filler text. classic = the Lorem ipsum Latin canon; modern = the English de Finibus filler used by lipsum.com, always starting 'But I must explain to you…' and never containing 'Lorem ipsum'. Units: paragraphs (3–5 sentences each), sentences (8–19 words each) or an exact word count. html=true wraps each paragraph in <p> tags. Deterministic for a given seed.",
    schema: {
      mode: z.enum(["paragraphs", "sentences", "words"]).default("paragraphs"),
      count: z.number().int().positive().default(3),
      style: z.enum(["classic", "modern"]).default("classic"),
      html: z.boolean().default(false).describe("wrap each paragraph in <p> tags"),
      seed: z.number().int().optional().describe("omit for a random draw"),
    },
    run: (a) => {
      const limits = LOREM_LIMITS;
      const max = a.mode === "paragraphs" ? limits.paragraphs : a.mode === "sentences" ? limits.sentences : limits.words;
      if (a.count > max) {
        return { content: [{ type: "text", text: `count ${a.count} exceeds the ${max} limit for mode '${a.mode}'` }], isError: true };
      }
      return text(generateLorem({ mode: a.mode, count: a.count, style: a.style, html: a.html, seed: a.seed }));
    },
  },
  {
    name: "html_entities",
    title: "HTML entity escape/unescape",
    description:
      "Escape text to HTML entities (& < > \" ' → &amp; &lt; &gt; &quot; &#39;) or unescape back. numeric=true (escape mode only) also encodes non-ASCII characters as decimal numeric entities (é → &#233;). Unescape recognizes 60+ named entities plus all &#decimal; and &#xhex; forms; unknown names pass through untouched.",
    schema: {
      text: z.string(),
      mode: z.enum(["escape", "unescape"]).default("escape"),
      numeric: z.boolean().default(false).describe("escape mode: also encode non-ASCII as numeric entities"),
    },
    run: (a) =>
      text(a.mode === "unescape" ? htmlUnescapeEntities(a.text) : htmlEscapeEntities(a.text, a.numeric)),
  },
  {
    name: "text_surgeon",
    title: "Text surgeon",
    description:
      "Multi-step text surgery, applied in order: literal find-and-replace-all (optional case-insensitive), then add a prefix/suffix to every line, then number lines ('1. …', zero-padded to align). Returns the transformed text plus stats: word count (CJK-aware), characters with/without spaces, sentences, lines.",
    schema: {
      text: z.string(),
      find: z.string().default("").describe("literal text to find; empty = skip replacement"),
      replace: z.string().default(""),
      match_case: z.boolean().default(false).describe("true = case-sensitive replacement"),
      prefix: z.string().default("").describe("added before every line"),
      suffix: z.string().default("").describe("added after every line"),
      number_lines: z.boolean().default(false),
      number_start: z.number().int().min(0).default(1),
    },
    run: (a) => {
      let s = a.text;
      if (a.find !== "") s = replaceAll(s, a.find, a.replace, { matchCase: a.match_case });
      if (a.prefix !== "" || a.suffix !== "") s = addAffixes(s, a.prefix, a.suffix);
      if (a.number_lines) s = numberLines(s, a.number_start);
      return json({ text: s, stats: countTextStats(s) });
    },
  },
];
