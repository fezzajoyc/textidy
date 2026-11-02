"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import {
  toAlternating, toCamel, toConstant, toKebab,
  toPascal, toSentenceCase, toSnake, toTitleCase,
} from "../_lib/transforms";

type Style = { id: string; label: Record<string, string>; fn: (s: string) => string };

const STYLES: Style[] = [
  {
    id: "title", fn: toTitleCase,
    label: { en: "Title Case", zh: "标题式", ja: "タイトルケース", es: "Tipo Título", pt: "Tipo Título" },
  },
  {
    id: "sentence", fn: toSentenceCase,
    label: { en: "Sentence case", zh: "句首大写", ja: "センテンスケース", es: "Tipo oración", pt: "Tipo sentença" },
  },
  { id: "camel", fn: toCamel, label: { en: "camelCase", zh: "camelCase", ja: "camelCase", es: "camelCase", pt: "camelCase" } },
  { id: "pascal", fn: toPascal, label: { en: "PascalCase", zh: "PascalCase", ja: "PascalCase", es: "PascalCase", pt: "PascalCase" } },
  { id: "snake", fn: toSnake, label: { en: "snake_case", zh: "snake_case", ja: "snake_case", es: "snake_case", pt: "snake_case" } },
  { id: "kebab", fn: toKebab, label: { en: "kebab-case", zh: "kebab-case", ja: "kebab-case", es: "kebab-case", pt: "kebab-case" } },
  { id: "constant", fn: toConstant, label: { en: "CONSTANT_CASE", zh: "CONSTANT_CASE", ja: "CONSTANT_CASE", es: "CONSTANT_CASE", pt: "CONSTANT_CASE" } },
  {
    id: "alternating", fn: toAlternating,
    label: { en: "aLtErNaTiNg", zh: "大小写交替", ja: "交互ケース", es: "aLtErNo", pt: "aLtErNaDo" },
  },
];

const tr = (m: Record<string, string>, locale: string): string => m[locale] ?? m.en;

export function CaseStudio() {
  const { locale, t } = useI18n();
  const [input, setInput] = useState("");

  const rows = useMemo(
    () =>
      STYLES.map((st) => {
        let out = "";
        try {
          out = st.fn(input);
        } catch {
          out = input;
        }
        return { ...st, out };
      }),
    [input],
  );

  return (
    <ToolPanel>
      <div className="flex items-end gap-2.5">
        <textarea
          className="field"
          rows={3}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.common.input}
          aria-label={t.common.input}
        />
        <button
          type="button"
          onClick={() => setInput("the quick brown fox and the lazy dog")}
          className="mb-1 whitespace-nowrap rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
        >
          {t.common.sample}
        </button>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border hairline">
        {rows.map((r, i) => (
          <div
            key={r.id}
            className={`flex flex-wrap items-center gap-x-3 gap-y-1.5 px-3.5 py-2.5 ${
              i % 2 ? "bg-[var(--color-surface)]" : "bg-[var(--color-card)]"
            }`}
          >
            <span className="w-32 flex-none text-[12.5px] font-semibold text-[var(--color-sub)]">
              {tr(r.label, locale)}
            </span>
            <code className="mono min-w-0 flex-1 break-all text-[13.5px] text-[var(--color-ink)]">
              {r.out || "\u00a0"}
            </code>
            <CopyButton value={r.out} className="flex-none !px-2.5 !py-1 text-[12px]" />
          </div>
        ))}
      </div>
    </ToolPanel>
  );
}
