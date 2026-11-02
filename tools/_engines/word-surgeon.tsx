"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { addAffixes, numberLines, replaceAll } from "../_lib/textidy";
import { countTextStats } from "../_lib/transforms";

type L = Record<string, string>;

const LABELS: Record<string, L> = {
  find: { en: "Find", zh: "查找", ja: "検索", es: "Buscar", pt: "Localizar" },
  replaceWith: { en: "Replace with", zh: "替换为", ja: "置換後", es: "Reemplazar con", pt: "Substituir por" },
  matchCase: { en: "Match case", zh: "区分大小写", ja: "大文字小文字を区別", es: "Distinguir mayúsculas", pt: "Distinguir maiúsculas" },
  prefix: { en: "Add before each line", zh: "每行开头加", ja: "各行の先頭に追加", es: "Añadir al inicio de cada línea", pt: "Adicionar antes de cada linha" },
  suffix: { en: "Add after each line", zh: "每行结尾加", ja: "各行の末尾に追加", es: "Añadir al final de cada línea", pt: "Adicionar depois de cada linha" },
  numberLines: { en: "Number lines", zh: "给行编号", ja: "行番号を付ける", es: "Numerar líneas", pt: "Numerar linhas" },
  numberStart: { en: "Start at", zh: "起始编号", ja: "開始番号", es: "Empezar en", pt: "Começar em" },
  stats: { en: "Live stats", zh: "实时统计", ja: "リアルタイム統計", es: "Estadísticas en vivo", pt: "Estatísticas ao vivo" },
};

const tr = (m: L, locale: string): string => m[locale] ?? m.en;

export function WordSurgeon() {
  const { locale, t } = useI18n();
  const [input, setInput] = useState("");
  const [find, setFind] = useState("");
  const [replace, setReplace] = useState("");
  const [matchCase, setMatchCase] = useState(false);
  const [prefix, setPrefix] = useState("");
  const [suffix, setSuffix] = useState("");
  const [numbering, setNumbering] = useState(false);
  const [start, setStart] = useState(1);

  // 固定手术顺序:查找替换 → 每行前后缀 → 行号。
  const output = useMemo(() => {
    let s = input;
    try {
      if (find !== "") s = replaceAll(s, find, replace, { matchCase });
      if (prefix !== "" || suffix !== "") s = addAffixes(s, prefix, suffix);
      if (numbering) s = numberLines(s, start);
    } catch {
      return s;
    }
    return s;
  }, [input, find, replace, matchCase, prefix, suffix, numbering, start]);

  const stats = useMemo(() => countTextStats(output), [output]);
  const statKeys = ["words", "characters", "charsNoSpaces", "sentences", "lines"] as const;

  return (
    <ToolPanel>
      <textarea
        className="field"
        rows={6}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={t.common.input}
        aria-label={t.common.input}
      />

      {/* 第 1 步:查找替换 */}
      <div className="mt-4 rounded-xl border hairline p-3.5">
        <div className="grid gap-2.5 sm:grid-cols-2">
          <input
            className="field"
            value={find}
            onChange={(e) => setFind(e.target.value)}
            placeholder={`${tr(LABELS.find, locale)}…`}
            aria-label={tr(LABELS.find, locale)}
          />
          <input
            className="field"
            value={replace}
            onChange={(e) => setReplace(e.target.value)}
            placeholder={`${tr(LABELS.replaceWith, locale)}…`}
            aria-label={tr(LABELS.replaceWith, locale)}
          />
        </div>
        <label className="mt-2.5 inline-flex cursor-pointer items-center gap-2 text-[13px] font-medium text-[var(--color-ink)]">
          <input
            type="checkbox"
            checked={matchCase}
            onChange={() => setMatchCase((v) => !v)}
            className="h-4 w-4 accent-[var(--color-accent)]"
          />
          {tr(LABELS.matchCase, locale)}
        </label>
      </div>

      {/* 第 2 步:每行前后缀 */}
      <div className="mt-2.5 rounded-xl border hairline p-3.5">
        <div className="grid gap-2.5 sm:grid-cols-2">
          <input
            className="field mono"
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
            placeholder={`${tr(LABELS.prefix, locale)}…`}
            aria-label={tr(LABELS.prefix, locale)}
          />
          <input
            className="field mono"
            value={suffix}
            onChange={(e) => setSuffix(e.target.value)}
            placeholder={`${tr(LABELS.suffix, locale)}…`}
            aria-label={tr(LABELS.suffix, locale)}
          />
        </div>
      </div>

      {/* 第 3 步:行号 */}
      <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-2.5 rounded-xl border hairline p-3.5">
        <label className="inline-flex cursor-pointer items-center gap-2 text-[13px] font-medium text-[var(--color-ink)]">
          <input
            type="checkbox"
            checked={numbering}
            onChange={() => setNumbering((v) => !v)}
            className="h-4 w-4 accent-[var(--color-accent)]"
          />
          {tr(LABELS.numberLines, locale)}
        </label>
        {numbering && (
          <label className="inline-flex items-center gap-2 text-[13px] text-[var(--color-ink)]">
            {tr(LABELS.numberStart, locale)}
            <input
              type="number"
              min={0}
              value={start}
              onChange={(e) => setStart(Math.max(0, Math.floor(Number(e.target.value)) || 0))}
              className="field !w-20 !py-1"
              aria-label={tr(LABELS.numberStart, locale)}
            />
          </label>
        )}
      </div>

      <textarea
        className="field mono mt-3 bg-[var(--color-surface)]"
        rows={6}
        value={output}
        readOnly
        placeholder={t.common.output}
        aria-label={t.common.output}
      />
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
        <CopyButton value={output} />
        <dl className="flex flex-wrap gap-x-4 gap-y-1 text-[12.5px] text-[var(--color-sub)]">
          <dt className="sr-only">{tr(LABELS.stats, locale)}</dt>
          {statKeys.map((k) => (
            <div key={k} className="inline-flex gap-1.5">
              <dd className="font-semibold tabular-nums text-[var(--color-ink)]">{stats[k]}</dd>
              <dt>{t.text.stats[k]}</dt>
            </div>
          ))}
        </dl>
      </div>
    </ToolPanel>
  );
}
