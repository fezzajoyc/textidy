"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { HTML_NAMED, htmlEscapeEntities, htmlUnescapeEntities } from "../_lib/transforms";

const MODES: { id: "escape" | "unescape"; label: Record<string, string> }[] = [
  {
    id: "escape",
    label: { en: "Escape (text → entities)", zh: "转义(文本 → 实体)", ja: "エスケープ(テキスト → 実体)", es: "Escapar (texto → entidades)", pt: "Escapar (texto → entidades)" },
  },
  {
    id: "unescape",
    label: { en: "Unescape (entities → text)", zh: "反转义(实体 → 文本)", ja: "アンエスケープ(実体 → テキスト)", es: "Desescapar (entidades → texto)", pt: "Desescapar (entidades → texto)" },
  },
];

const LABELS = {
  numeric: {
    en: "Also encode non-ASCII as numeric entities (é → &#233;)",
    zh: "把非 ASCII 字符也编码为数字实体(é → &#233;)",
    ja: "非 ASCII 文字も数値実体に変換(é → &#233;)",
    es: "Codificar también los no ASCII como entidades numéricas (é → &#233;)",
    pt: "Codificar também não-ASCII como entidades numéricas (é → &#233;)",
  },
  chartTitle: {
    en: "Named entity reference", zh: "命名实体速查表", ja: "名前付き実体リファレンス", es: "Referencia de entidades con nombre", pt: "Referência de entidades nomeadas",
  },
  chartSub: {
    en: "These named entities are recognized on unescape — tap one to copy it.",
    zh: "反转义时可识别以下命名实体——点击即可复制。",
    ja: "アンエスケープで認識される名前付き実体——クリックでコピーできます。",
    es: "Estas entidades con nombre se reconocen al desescapar: toca una para copiarla.",
    pt: "Estas entidades nomeadas são reconhecidas ao desescapar — toque para copiar.",
  },
};

const tr = (m: Record<string, string>, locale: string): string => m[locale] ?? m.en;

const ENTITY_KEYS = Object.keys(HTML_NAMED);

export function EntityEscaper() {
  const { locale, t } = useI18n();
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"escape" | "unescape">("escape");
  const [numeric, setNumeric] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const output = useMemo(() => {
    try {
      return mode === "escape" ? htmlEscapeEntities(input, numeric) : htmlUnescapeEntities(input);
    } catch {
      return input;
    }
  }, [input, mode, numeric]);

  const copyEntity = async (name: string) => {
    const value = `&${name};`;
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      /* 降级:剪贴板不可用时忽略 */
    }
    setCopied(name);
    setTimeout(() => setCopied(null), 1400);
  };

  return (
    <ToolPanel>
      <fieldset>
        <legend className="sr-only">{t.common.settings}</legend>
        <div className="flex flex-wrap gap-2">
          {MODES.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMode(m.id)}
              aria-pressed={mode === m.id}
              className={`rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                mode === m.id
                  ? "border-transparent bg-[var(--color-ink)] text-white"
                  : "hairline hover:bg-[var(--color-surface)]"
              }`}
            >
              {tr(m.label, locale)}
            </button>
          ))}
        </div>
        {mode === "escape" && (
          <label className="mt-3 flex cursor-pointer items-center gap-2 text-[13.5px] font-medium text-[var(--color-ink)]">
            <input
              type="checkbox"
              checked={numeric}
              onChange={() => setNumeric((v) => !v)}
              className="h-4 w-4 accent-[var(--color-accent)]"
            />
            {tr(LABELS.numeric, locale)}
          </label>
        )}
      </fieldset>

      <textarea
        className="field mono mt-3"
        rows={5}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={t.common.input}
        aria-label={t.common.input}
      />
      <textarea
        className="field mono mt-3 bg-[var(--color-surface)]"
        rows={5}
        value={output}
        readOnly
        placeholder={t.common.output}
        aria-label={t.common.output}
      />
      <div className="mt-3 flex items-center gap-2.5">
        <CopyButton value={output} />
        <button
          type="button"
          onClick={() => setMode((m) => (m === "escape" ? "unescape" : "escape"))}
          className="inline-flex items-center gap-1.5 rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
        >
          {t.common.swap}
        </button>
      </div>

      <section className="mt-6">
        <h3 className="text-[14px] font-semibold text-[var(--color-ink)]">{tr(LABELS.chartTitle, locale)}</h3>
        <p className="mt-1 text-[12.5px] text-[var(--color-sub)]">{tr(LABELS.chartSub, locale)}</p>
        <div className="mt-3 grid grid-cols-2 gap-1.5 sm:grid-cols-3 lg:grid-cols-4">
          {ENTITY_KEYS.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => copyEntity(name)}
              className="mono flex items-center justify-between gap-2 rounded-lg border hairline px-2.5 py-1.5 text-left text-[12.5px] transition-colors hover:bg-[var(--color-surface)]"
              title={`&${name};`}
            >
              <span className="text-[var(--color-accent-strong)]">&{name};</span>
              <span className="min-w-0 truncate text-[var(--color-sub)]">
                {copied === name ? "✓" : HTML_NAMED[name]}
              </span>
            </button>
          ))}
        </div>
      </section>
    </ToolPanel>
  );
}
