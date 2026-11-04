"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { generateLorem, LOREM_LIMITS, type LoremMode, type LoremStyle } from "../_lib/textidy";

const MODES: { id: LoremMode; label: Record<string, string>; max: number }[] = [
  { id: "paragraphs", max: LOREM_LIMITS.paragraphs, label: { en: "Paragraphs", zh: "段落", ja: "段落", es: "Párrafos", pt: "Parágrafos" } },
  { id: "sentences", max: LOREM_LIMITS.sentences, label: { en: "Sentences", zh: "句子", ja: "文", es: "Frases", pt: "Frases" } },
  { id: "words", max: LOREM_LIMITS.words, label: { en: "Words", zh: "单词", ja: "単語", es: "Palabras", pt: "Palavras" } },
];

const STYLES: { id: LoremStyle; label: Record<string, string>; hint: Record<string, string> }[] = [
  {
    id: "classic",
    label: { en: "Classic", zh: "经典", ja: "クラシック", es: "Clásico", pt: "Clássico" },
    hint: {
      en: "Lorem ipsum dolor sit amet…",
      zh: "Lorem ipsum dolor sit amet…",
      ja: "Lorem ipsum dolor sit amet…",
      es: "Lorem ipsum dolor sit amet…",
      pt: "Lorem ipsum dolor sit amet…",
    },
  },
  {
    id: "modern",
    label: { en: "Modern", zh: "现代", ja: "モダン", es: "Moderno", pt: "Moderno" },
    hint: {
      en: "\u201cBut I must explain to you…\u201d — no Lorem ipsum",
      zh: "以“But I must explain to you…”开头——不含 Lorem ipsum",
      ja: "「But I must explain to you…」で開始——Lorem ipsum なし",
      es: "«But I must explain to you…» — sin Lorem ipsum",
      pt: "“But I must explain to you…” — sem Lorem ipsum",
    },
  },
];

const HTML_LABEL: Record<string, string> = {
  en: "Wrap in <p> tags", zh: "用 <p> 标签包裹", ja: "<p> タグで囲む", es: "Envolver en etiquetas <p>", pt: "Envolver em tags <p>",
};

const tr = (m: Record<string, string>, locale: string): string => m[locale] ?? m.en;

export function LoremGenerator() {
  const { locale, t } = useI18n();
  const [mode, setMode] = useState<LoremMode>("paragraphs");
  const [style, setStyle] = useState<LoremStyle>("classic");
  const [count, setCount] = useState(3);
  const [html, setHtml] = useState(false);
  const [seed, setSeed] = useState(() => Math.floor(Math.random() * 1e9) + 1);

  const max = MODES.find((m) => m.id === mode)!.max;
  const output = useMemo(
    () => generateLorem({ mode, count: Math.min(count, max), style, seed, html }),
    [mode, count, style, seed, html, max],
  );

  return (
    <ToolPanel>
      <fieldset>
        <legend className="sr-only">{t.common.settings}</legend>
        <div className="flex flex-wrap gap-2">
          {MODES.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => {
                setMode(m.id);
                setCount((c) => Math.min(c, m.max));
              }}
              aria-pressed={mode === m.id}
              className={`rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                mode === m.id
                  ? "border-transparent bg-[var(--color-ink)] text-white dark:bg-white dark:text-[#1d1d1f]"
                  : "hairline hover:bg-[var(--color-surface)]"
              }`}
            >
              {tr(m.label, locale)}
            </button>
          ))}
          <label className="ml-1 inline-flex items-center gap-2 text-[13.5px] font-medium text-[var(--color-ink)]">
            <input
              type="number"
              min={1}
              max={max}
              value={count}
              onChange={(e) => setCount(Math.max(1, Math.min(max, Math.floor(Number(e.target.value)) || 1)))}
              className="field !w-24 !py-1.5"
              aria-label={t.common.settings}
            />
            <span className="text-[12.5px] text-[var(--color-sub)]">1–{max}</span>
          </label>
        </div>

        <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
          {STYLES.map((s) => (
            <label
              key={s.id}
              className={`flex cursor-pointer items-start gap-2.5 rounded-xl border px-3.5 py-2.5 transition-colors ${
                style === s.id ? "border-[var(--color-accent)] bg-[rgba(0,113,227,0.05)]" : "hairline hover:bg-[var(--color-surface)]"
              }`}
            >
              <input
                type="radio"
                name="lorem-style"
                checked={style === s.id}
                onChange={() => setStyle(s.id)}
                className="mt-0.5 h-4 w-4 accent-[var(--color-accent)]"
              />
              <span>
                <span className="block text-[13.5px] font-medium text-[var(--color-ink)]">{tr(s.label, locale)}</span>
                <span className="mono mt-0.5 block text-[11.5px] leading-4 text-[var(--color-sub)]">{tr(s.hint, locale)}</span>
              </span>
            </label>
          ))}
        </div>

        <label className="mt-3 flex cursor-pointer items-center gap-2 text-[13.5px] font-medium text-[var(--color-ink)]">
          <input
            type="checkbox"
            checked={html}
            onChange={() => setHtml((v) => !v)}
            className="h-4 w-4 accent-[var(--color-accent)]"
          />
          <span className="mono">{tr(HTML_LABEL, locale)}</span>
        </label>
      </fieldset>

      <textarea
        className="field mono mt-3 bg-[var(--color-surface)]"
        rows={10}
        value={output}
        readOnly
        placeholder={t.common.output}
        aria-label={t.common.output}
      />
      <div className="mt-3 flex gap-2.5">
        <CopyButton value={output} />
        <button
          type="button"
          onClick={() => setSeed(Math.floor(Math.random() * 1e9) + 1)}
          className="inline-flex items-center gap-1.5 rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
        >
          {locale === "zh" ? "换一批" : locale === "ja" ? "生成し直す" : locale === "es" ? "Generar de nuevo" : locale === "pt" ? "Gerar de novo" : "Regenerate"}
        </button>
      </div>
    </ToolPanel>
  );
}
