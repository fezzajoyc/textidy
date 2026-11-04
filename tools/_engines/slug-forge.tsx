"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { slugForge } from "../_lib/textidy";

const SEP_LABEL: Record<string, Record<string, string>> = {
  "-": { en: "Hyphen  my-slug", zh: "连字符  my-slug", ja: "ハイフン  my-slug", es: "Guion  my-slug", pt: "Hífen  my-slug" },
  "_": { en: "Underscore  my_slug", zh: "下划线  my_slug", ja: "アンダースコア  my_slug", es: "Guion bajo  my_slug", pt: "Sublinhado  my_slug" },
};

const LABELS = {
  uppercase: {
    en: "UPPERCASE", zh: "全部大写", ja: "大文字", es: "MAYÚSCULAS", pt: "MAIÚSCULAS",
  },
  stopwords: {
    en: "Remove stop words (the, of, and…)",
    zh: "去掉停用词(the、of、and 等)",
    ja: "ストップワードを除去(the、of、and など)",
    es: "Quitar palabras vacías (the, of, and…)",
    pt: "Remover palavras vazias (the, of, and…)",
  },
  preview: {
    en: "Example URL:", zh: "示例 URL:", ja: "URL 例:", es: "URL de ejemplo:", pt: "URL de exemplo:",
  },
  nonLatin: {
    en: "No Latin letters found — slugs can only contain a–z, 0–9 and the separator.",
    zh: "没有检测到拉丁字母——slug 只能包含 a–z、0–9 和分隔符。",
    ja: "ラテン文字が見つかりません——スラッグは a–z、0–9 と区切り文字のみです。",
    es: "No se han encontrado letras latinas: los slugs solo admiten a–z, 0–9 y el separador.",
    pt: "Nenhuma letra latina encontrada — slugs só aceitam a–z, 0–9 e o separador.",
  },
};

const tr = (m: Record<string, string>, locale: string): string => m[locale] ?? m.en;

export function SlugForge() {
  const { locale, t } = useI18n();
  const [input, setInput] = useState("");
  const [separator, setSeparator] = useState<"-" | "_">("-");
  const [uppercase, setUppercase] = useState(false);
  const [stopwords, setStopwords] = useState(false);

  const slug = useMemo(
    () => slugForge(input, { separator, uppercase, removeStopwords: stopwords }),
    [input, separator, uppercase, stopwords],
  );
  const nonLatin = input.trim() !== "" && slug === "";

  return (
    <ToolPanel>
      <div className="flex items-end gap-2.5">
        <textarea
          className="field"
          rows={2}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.common.input}
          aria-label={t.common.input}
        />
        <button
          type="button"
          onClick={() => setInput("10 Unbelievably Good Café Stories of 2026!")}
          className="mb-1 whitespace-nowrap rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
        >
          {t.common.sample}
        </button>
      </div>

      <fieldset className="mt-4">
        <legend className="sr-only">{t.common.settings}</legend>
        <div className="flex flex-wrap gap-2">
          {(["-", "_"] as const).map((sep) => (
            <button
              key={sep}
              type="button"
              onClick={() => setSeparator(sep)}
              aria-pressed={separator === sep}
              className={`mono rounded-full border px-3 py-1.5 text-[13px] font-medium transition-colors ${
                separator === sep
                  ? "border-transparent bg-[var(--color-ink)] text-white dark:bg-white dark:text-[#1d1d1f]"
                  : "hairline hover:bg-[var(--color-surface)]"
              }`}
            >
              {tr(SEP_LABEL[sep], locale)}
            </button>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2.5">
          <label className="flex cursor-pointer items-center gap-2 text-[13.5px] font-medium text-[var(--color-ink)]">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={() => setUppercase((v) => !v)}
              className="h-4 w-4 accent-[var(--color-accent)]"
            />
            {tr(LABELS.uppercase, locale)}
          </label>
          <label className="flex cursor-pointer items-center gap-2 text-[13.5px] font-medium text-[var(--color-ink)]">
            <input
              type="checkbox"
              checked={stopwords}
              onChange={() => setStopwords((v) => !v)}
              className="h-4 w-4 accent-[var(--color-accent)]"
            />
            {tr(LABELS.stopwords, locale)}
          </label>
        </div>
      </fieldset>

      <div className="mt-4 rounded-xl border hairline bg-[var(--color-surface)] px-4 py-3.5">
        {nonLatin ? (
          <p className="text-[13.5px] text-[var(--color-sub)]">{tr(LABELS.nonLatin, locale)}</p>
        ) : (
          <code className="mono block break-all text-[15px] font-semibold text-[var(--color-ink)]">
            {slug || "\u00a0"}
          </code>
        )}
      </div>
      {slug && (
        <p className="mt-2 truncate text-[12.5px] text-[var(--color-sub)]">
          {tr(LABELS.preview, locale)}{" "}
          <span className="mono">https://example.com/{encodeURIComponent(slug)}</span>
        </p>
      )}
      <div className="mt-3">
        <CopyButton value={slug} />
      </div>
    </ToolPanel>
  );
}
