/**
 * Engine tests for the 6 Textidy tools' wiring (tools/_lib/textidy.ts + transforms.ts).
 * Matrix per the workspace standard: normal values (exact, hand-computed), empty input,
 * boundaries (0/1/≥10⁴ chars), invalid input (never an unhandled throw), Unicode & CJK,
 * roundtrip. The RNG-based lorem vectors are pinned from the documented LCG draws.
 */
import { describe, it, expect } from "vitest";
import {
  toTitleCase, toSentenceCase, toCamel, toPascal, toSnake,
  toKebab, toConstant, toAlternating,
  cleanText, htmlEscapeEntities, htmlUnescapeEntities, HTML_NAMED, countTextStats,
} from "@/tools/_lib/transforms";
import {
  SLUG_STOPWORDS, addAffixes, generateLorem, numberLines,
  replaceAll, runCleaner, slugForge,
} from "@/tools/_lib/textidy";

/* ------------------------------------------------------------------ */
/* case-studio: 8 styles from one input                                */
/* ------------------------------------------------------------------ */

describe("case-studio: all 8 styles on one input", () => {
  const SRC = "the wrong case FIX";
  it("renders every style exactly (hand-computed)", () => {
    expect(toTitleCase(SRC)).toBe("The Wrong Case Fix");
    expect(toSentenceCase(SRC)).toBe("The wrong case fix");
    expect(toCamel(SRC)).toBe("theWrongCaseFix");
    expect(toPascal(SRC)).toBe("TheWrongCaseFix");
    expect(toSnake(SRC)).toBe("the_wrong_case_fix");
    expect(toKebab(SRC)).toBe("the-wrong-case-fix");
    expect(toConstant(SRC)).toBe("THE_WRONG_CASE_FIX");
    // 字母交替,非字母不消耗游标,原样保留
    expect(toAlternating(SRC)).toBe("tHe WrOnG cAsE fIx");
  });

  it("kebab and snake agree modulo the separator", () => {
    expect(toSnake(SRC)).toBe(toKebab(SRC).replace(/-/g, "_"));
  });

  it("empty input stays empty in every style (never throws)", () => {
    for (const fn of [toTitleCase, toSentenceCase, toCamel, toPascal, toSnake, toKebab, toConstant, toAlternating]) {
      expect(fn("")).toBe("");
    }
  });

  it("passes CJK through untouched (case has no meaning there)", () => {
    expect(toTitleCase("你好 世界")).toBe("你好 世界");
    expect(toCamel("你好 世界")).toBe("");
    expect(toAlternating("你好")).toBe("你好");
  });

  it("keeps accents while casing Latin text", () => {
    expect(toTitleCase("café society")).toBe("Café Society");
    expect(toPascal("ÉLAN vital")).toBe("ÉlanVital");
  });

  it("splits camelCase humps back into words (letter→letter boundaries)", () => {
    expect(toSnake("myVariableName")).toBe("my_variable_name");
    // 数字与字母之间不切分(splitWords 只处理字母大小写驼峰)
    expect(toKebab("TheBeatles2026")).toBe("the-beatles2026");
  });
});

/* ------------------------------------------------------------------ */
/* text-cleaner: runCleaner pipeline with exact per-pass counts        */
/* ------------------------------------------------------------------ */

describe("text-cleaner: runCleaner passes and counts", () => {
  it("all toggles off is a no-op with zero counts", () => {
    const src = "  messy   “text”\n\u200bhere\n";
    const r = runCleaner(src, { clean: false, spaces: false, dedupe: false, sort: false });
    expect(r.output).toBe(src);
    expect(r.counts).toEqual({ clean: 0, spaces: 0, dedupe: 0, sort: 0 });
  });

  it("clean pass counts removed characters (4 collapsed + 2 trimmed)", () => {
    const r = runCleaner("  hi   there  \n", { clean: true, spaces: false, dedupe: false, sort: false });
    expect(r.output).toBe("hi there\n");
    // 7 个空格折叠成 3 个(移除 4 字符)+ 行首尾各去 1 字符
    expect(r.counts.clean).toBe(6);
  });

  it("clean pass counts invisible chars and punct normalization (1 + 4)", () => {
    // \u200b 移除 1 处;“ ” — … 归一 4 处(… 展开成 3 字符也不影响计数)
    const r = runCleaner("a\u200bb “c” — d…", { clean: true, spaces: false, dedupe: false, sort: false });
    expect(r.output).toBe('ab "c" - d...');
    expect(r.counts.clean).toBe(5);
  });

  it("spaces pass counts every collapsed whitespace run", () => {
    const r = runCleaner("a  b\t\tc\td", { clean: false, spaces: true, dedupe: false, sort: false });
    expect(r.output).toBe("a b c d");
    expect(r.counts.spaces).toBe(3);
  });

  it("dedupe pass keeps first occurrence and collapses repeated empty lines", () => {
    const r = runCleaner("x\ny\nx\n\n\ny", { clean: false, spaces: false, dedupe: true, sort: false });
    expect(r.output).toBe("x\ny\n");
    expect(r.counts.dedupe).toBe(3); // 第二个 x、第二个空行、后面的 y
  });

  it("sort pass counts displaced line positions (natural A→Z)", () => {
    const r = runCleaner("pear\napple\nbanana", { clean: false, spaces: false, dedupe: false, sort: true });
    expect(r.output).toBe("apple\nbanana\npear");
    expect(r.counts.sort).toBe(3);
  });

  it("applies passes in sequence: spaces → dedupe → sort (clean off)", () => {
    const r = runCleaner("b  a\nb\na\nb", { clean: false, spaces: true, dedupe: true, sort: true });
    expect(r.output).toBe("a\nb\nb a");
    expect(r.counts).toEqual({ clean: 0, spaces: 1, dedupe: 1, sort: 2 });
  });

  it("clean output equals the single full cleanText call (parity)", () => {
    const src = "  messy   “text”\n\u200bhere —  ok\n\n\n";
    const r = runCleaner(src, { clean: true, spaces: false, dedupe: false, sort: false });
    expect(r.output).toBe(cleanText(src, { removePrintable: true, normalizePunct: true, collapseSpaces: true, trimLines: true }));
  });

  it("normalizes CRLF to LF through the sort pass", () => {
    const r = runCleaner("b\r\na", { clean: false, spaces: false, dedupe: false, sort: true });
    expect(r.output).toBe("a\nb");
  });

  it("handles a 20k-char input without throwing", () => {
    const src = `${"word ".repeat(4000)}end`;
    const r = runCleaner(src, { clean: true, spaces: true, dedupe: true, sort: true });
    expect(r.output.startsWith("word word")).toBe(true);
    expect(r.output.endsWith("end")).toBe(true);
  });
});

/* ------------------------------------------------------------------ */
/* slug-forge: slugify + separator/uppercase/stop-words                */
/* ------------------------------------------------------------------ */

describe("slug-forge: slugForge options", () => {
  it("strips accents and folds punctuation (hand-computed)", () => {
    expect(slugForge("Café Mémoirs — 2026!")).toBe("cafe-memoirs-2026");
    expect(slugForge("Café ☕ 2026")).toBe("cafe-2026");
    expect(slugForge("123 45")).toBe("123-45");
  });

  it("removes stop words before slugifying (core match, punctuation ignored)", () => {
    expect(slugForge("The Best of Café Guides!", { removeStopwords: true })).toBe("best-cafe-guides");
    expect(slugForge("Follow the Leader!", { removeStopwords: true })).toBe("follow-leader");
  });

  it("yields an empty slug when every word is a stop word", () => {
    expect(slugForge("The of and", { removeStopwords: true })).toBe("");
  });

  it("supports underscore separator and UPPERCASE in any combination", () => {
    expect(slugForge("Hello World", { separator: "_" })).toBe("hello_world");
    expect(slugForge("Hello World", { uppercase: true })).toBe("HELLO-WORLD");
    expect(slugForge("Hello World", { separator: "_", uppercase: true })).toBe("HELLO_WORLD");
  });

  it("returns an empty string for pure CJK (documented limitation, no throw)", () => {
    expect(slugForge("你好世界")).toBe("");
    expect(slugForge("你好世界", { removeStopwords: true })).toBe("");
  });

  it("stop-word list is the documented English function words", () => {
    expect(SLUG_STOPWORDS.has("the")).toBe(true);
    expect(SLUG_STOPWORDS.has("café")).toBe(false);
  });

  it("agrees with the case studio on already-kebab input", () => {
    expect(slugForge(toKebab("Hello World"))).toBe(toKebab("Hello World"));
  });
});

/* ------------------------------------------------------------------ */
/* lorem-generator: classic + modern, three units, HTML wrap           */
/* ------------------------------------------------------------------ */

describe("lorem-generator: units, styles, HTML wrap", () => {
  it("classic words: pinned LCG draw (seed 42, count 5)", () => {
    expect(generateLorem({ mode: "words", count: 5, style: "classic", seed: 42 })).toBe(
      "Irure commodo deserunt fugiat excepteur.",
    );
  });

  it("modern words: fixed 'But I must explain to you' opener + pinned draw (seed 42)", () => {
    expect(generateLorem({ mode: "words", count: 7, style: "modern", seed: 42 })).toBe(
      "But I must explain to you nor.",
    );
    expect(generateLorem({ mode: "words", count: 12, style: "modern", seed: 42 })).toBe(
      "But I must explain to you nor encounter find which some in.",
    );
  });

  it("produces exactly the requested word count in both styles", () => {
    for (let n = 1; n <= 50; n++) {
      expect(generateLorem({ mode: "words", count: n, style: "classic", seed: 7 }).split(" ").length).toBe(n);
      expect(generateLorem({ mode: "words", count: n, style: "modern", seed: 7 }).split(" ").length).toBe(n);
    }
  });

  it("modern filler never contains 'Lorem ipsum' and always starts with 'But'", () => {
    for (const mode of ["words", "sentences", "paragraphs"] as const) {
      const out = generateLorem({ mode, count: 4, style: "modern", seed: 3 });
      expect(out.toLowerCase()).not.toContain("lorem");
      expect(out.startsWith("But ")).toBe(true);
    }
  });

  it("sentences mode yields the requested sentence count of 8–19 words each", () => {
    const out = generateLorem({ mode: "sentences", count: 10, style: "classic", seed: 11 });
    const sentences = out.split(". ").filter((s) => s.trim() !== "");
    expect(sentences.length).toBe(10);
    for (const s of sentences) {
      const words = s.replace(/\.$/, "").split(" ").length;
      expect(words).toBeGreaterThanOrEqual(8);
      expect(words).toBeLessThanOrEqual(19);
    }
  });

  it("paragraphs mode yields the requested paragraph count separated by blank lines", () => {
    for (const style of ["classic", "modern"] as const) {
      const out = generateLorem({ mode: "paragraphs", count: 4, style, seed: 5 });
      expect(out.split(/\n{2,}/).length).toBe(4);
    }
  });

  it("html wrap covers every paragraph; words mode becomes a single <p>", () => {
    const p = generateLorem({ mode: "paragraphs", count: 3, style: "classic", seed: 9, html: true });
    expect((p.match(/<p>/g) ?? []).length).toBe(3);
    expect((p.match(/<\/p>/g) ?? []).length).toBe(3);
    const w = generateLorem({ mode: "words", count: 6, style: "modern", seed: 9, html: true });
    expect(w.startsWith("<p>But")).toBe(true);
    expect(w.endsWith("</p>")).toBe(true);
  });

  it("clamps oversized word counts to the documented limit", () => {
    expect(generateLorem({ mode: "words", count: 999999, style: "classic", seed: 1 }).split(" ").length).toBe(5000);
  });

  it("is deterministic for a given seed", () => {
    const a = generateLorem({ mode: "paragraphs", count: 2, style: "modern", seed: 12345 });
    const b = generateLorem({ mode: "paragraphs", count: 2, style: "modern", seed: 12345 });
    expect(a).toBe(b);
  });

  it("handles count 1 in every mode without throwing", () => {
    for (const mode of ["words", "sentences", "paragraphs"] as const) {
      for (const style of ["classic", "modern"] as const) {
        expect(generateLorem({ mode, count: 1, style, seed: 2 }).length).toBeGreaterThan(0);
      }
    }
  });
});

/* ------------------------------------------------------------------ */
/* entity-escaper: two-way escape/unescape + named chart data          */
/* ------------------------------------------------------------------ */

describe("entity-escaper: escape, unescape, roundtrip, chart", () => {
  const SRC = `<a href="x">Café & 'co'</a>`;

  it("escapes the five markup-significant characters, nothing else", () => {
    expect(htmlEscapeEntities(SRC)).toBe(
      "&lt;a href=&quot;x&quot;&gt;Café &amp; &#39;co&#39;&lt;/a&gt;",
    );
  });

  it("numeric mode encodes non-ASCII as decimal entities", () => {
    expect(htmlEscapeEntities("é 中", true)).toBe("&#233; &#20013;");
    expect(htmlEscapeEntities("é 中")).toBe("é 中");
  });

  it("unescapes named, decimal and hex entities (incl. astral plane)", () => {
    expect(htmlUnescapeEntities("&lt;p&gt;a&nbsp;b&lt;/p&gt;")).toBe("<p>a\u00a0b</p>");
    expect(htmlUnescapeEntities("&#x1F600;")).toBe("\u{1F600}");
    expect(htmlUnescapeEntities("&#39;&apos;&hellip;")).toBe("''…");
  });

  it("leaves invalid entities untouched instead of throwing", () => {
    const bad = "&unknownname; &#xZZ; &#1114112; &#55296; &";
    expect(htmlUnescapeEntities(bad)).toBe(bad);
  });

  it("roundtrips: unescape(escape(s, numeric)) === s", () => {
    expect(htmlUnescapeEntities(htmlEscapeEntities(SRC, true))).toBe(SRC);
  });

  it("exposes the named-entity chart (≥50 entries, non-empty values)", () => {
    const keys = Object.keys(HTML_NAMED);
    expect(keys.length).toBeGreaterThanOrEqual(50);
    for (const k of keys) {
      expect(HTML_NAMED[k].length).toBeGreaterThan(0);
    }
    expect(HTML_NAMED.amp).toBe("&");
    expect(HTML_NAMED.nbsp).toBe("\u00a0");
  });
});

/* ------------------------------------------------------------------ */
/* word-surgeon: replace → affixes → numbering + stats                 */
/* ------------------------------------------------------------------ */

describe("word-surgeon: replaceAll, addAffixes, numberLines", () => {
  it("replaces literally — regex metacharacters are not interpreted", () => {
    expect(replaceAll("a.b c", ".", "-")).toBe("a-b c");
    expect(replaceAll("a (b) c", "(b)", "x")).toBe("a x c");
  });

  it("is case-insensitive by default and case-sensitive on request", () => {
    expect(replaceAll("Foo foo FOO", "foo", "bar")).toBe("bar bar bar");
    expect(replaceAll("Foo foo FOO", "foo", "bar", { matchCase: true })).toBe("Foo bar FOO");
  });

  it("does not interpret $ patterns in the replacement", () => {
    expect(replaceAll("a b", "b", "$&$&")).toBe("a $&$&");
  });

  it("empty find is a no-op", () => {
    expect(replaceAll("abc", "", "x")).toBe("abc");
  });

  it("adds affixes per line; empty affixes change nothing", () => {
    expect(addAffixes("a\nb", "- ", ";")).toBe("- a;\n- b;");
    expect(addAffixes("a\nb", "", "")).toBe("a\nb");
  });

  it("splits CRLF lines when applying affixes", () => {
    expect(addAffixes("a\r\nb", ">", "")).toBe(">a\n>b");
  });

  it("numbers lines left-padded to the widest number", () => {
    expect(numberLines("a\nb\nc", 1)).toBe("1. a\n2. b\n3. c");
    expect(numberLines("a\nb\nc\nd\ne\nf\ng\nh\ni\nj", 1)).toBe(
      " 1. a\n 2. b\n 3. c\n 4. d\n 5. e\n 6. f\n 7. g\n 8. h\n 9. i\n10. j",
    );
  });

  it("honors the start offset and numbers empty lines too", () => {
    expect(numberLines("a\nb", 41)).toBe("41. a\n42. b");
    expect(numberLines("", 1)).toBe("1. ");
  });

  it("the stats wiring is CJK-aware (each CJK char counts as a word)", () => {
    const s = countTextStats(numberLines("你好\nworld", 1));
    expect(s.words).toBe(6); // "1." "你好"(按 2 词计) "2." "world"
    expect(s.lines).toBe(2);
    expect(countTextStats("Hello world").words).toBe(2);
    expect(countTextStats("").words).toBe(0);
  });
});
