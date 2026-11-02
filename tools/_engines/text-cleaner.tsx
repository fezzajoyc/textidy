"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { CopyButton } from "@/components/client-ui";
import { ToolPanel } from "@/components/ui";
import { runCleaner, type CleanerToggles } from "../_lib/textidy";

type Opt = {
  id: keyof CleanerToggles;
  label: Record<string, string>;
  hint: Record<string, string>;
};

const OPTIONS: Opt[] = [
  {
    id: "clean",
    label: { en: "Clean characters", zh: "清洗字符", ja: "文字をクリーニング", es: "Limpiar caracteres", pt: "Limpar caracteres" },
    hint: {
      en: "invisible/control chars, curly quotes and dashes, collapsed spaces, trimmed lines",
      zh: "不可见/控制字符、弯引号与长破折号、连续空格、行首尾空白",
      ja: "不可視/制御文字、曲線引用符とダッシュ、連続スペース、行頭行末の空白",
      es: "caracteres invisibles/de control, comillas y guiones tipográficos, espacios seguidos, bordes de línea",
      pt: "caracteres invisíveis/de controle, aspas e travessões, espaços seguidos, bordas de linha",
    },
  },
  {
    id: "spaces",
    label: { en: "Remove extra spaces", zh: "去除多余空格", ja: "余分なスペースを削除", es: "Quitar espacios de más", pt: "Remover espaços extras" },
    hint: {
      en: "collapse runs of spaces, tabs to single spaces",
      zh: "连续空格折叠为一个,制表符转为空格",
      ja: "連続するスペースを 1 つにし、タブをスペースに置換",
      es: "reduce espacios seguidos y convierte tabulaciones en un espacio",
      pt: "reduz espaços seguidos e converte tabulações em um espaço",
    },
  },
  {
    id: "dedupe",
    label: { en: "Deduplicate lines", zh: "去除重复行", ja: "重複行を削除", es: "Eliminar líneas duplicadas", pt: "Eliminar linhas duplicadas" },
    hint: {
      en: "keep the first occurrence of every line, duplicates and extra empty lines go",
      zh: "每个重复行只保留第一次出现,多余空行一并去掉",
      ja: "各行の最初の 1 つを残し、重複と余分な空行を削除",
      es: "conserva la primera aparición de cada línea; los duplicados y las líneas vacías extra desaparecen",
      pt: "mantém a primeira ocorrência de cada linha; duplicadas e linhas vazias extras saem",
    },
  },
  {
    id: "sort",
    label: { en: "Sort lines A→Z", zh: "按 A→Z 排序", ja: "A→Z で並べ替え", es: "Ordenar líneas A→Z", pt: "Ordenar linhas A→Z" },
    hint: {
      en: "natural alphabetical order (numbers sort sensibly too)",
      zh: "自然字母顺序(数字也会按大小排)",
      ja: "自然なアルファベット順(数字も大小順)",
      es: "orden alfabético natural (los números también se ordenan bien)",
      pt: "ordem alfabética natural (números também ordenam bem)",
    },
  },
];

const tr = (m: Record<string, string>, locale: string): string => m[locale] ?? m.en;

const ALL_ON: CleanerToggles = { clean: true, spaces: true, dedupe: true, sort: true };

export function TextCleaner() {
  const { locale, t } = useI18n();
  const [input, setInput] = useState("");
  const [opts, setOpts] = useState<CleanerToggles>({ clean: true, spaces: true, dedupe: false, sort: false });

  const { output, counts } = useMemo(() => runCleaner(input, opts), [input, opts]);
  const total = counts.clean + counts.spaces + counts.dedupe + counts.sort;

  const toggle = (id: keyof CleanerToggles) => setOpts((o) => ({ ...o, [id]: !o[id] }));

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

      <fieldset className="mt-4 grid gap-2.5 sm:grid-cols-2">
        <legend className="sr-only">{t.common.settings}</legend>
        {OPTIONS.map((o) => (
          <label
            key={o.id}
            className="flex cursor-pointer items-start gap-2.5 rounded-xl border hairline px-3.5 py-2.5 transition-colors hover:bg-[var(--color-surface)]"
          >
            <input
              type="checkbox"
              checked={opts[o.id]}
              onChange={() => toggle(o.id)}
              className="mt-0.5 h-4 w-4 accent-[var(--color-accent)]"
            />
            <span className="min-w-0">
              <span className="flex items-center gap-2 text-[13.5px] font-medium text-[var(--color-ink)]">
                {tr(o.label, locale)}
                {opts[o.id] && counts[o.id] > 0 && (
                  <span className="rounded-full bg-[rgba(26,127,55,0.1)] px-2 py-0.5 text-[11px] font-semibold text-[var(--color-good)]">
                    {counts[o.id]}
                  </span>
                )}
              </span>
              <span className="mt-0.5 block text-[12px] leading-4 text-[var(--color-sub)]">
                {tr(o.hint, locale)}
              </span>
            </span>
          </label>
        ))}
      </fieldset>

      <div className="mt-3 flex flex-wrap items-center gap-2.5">
        <button
          type="button"
          onClick={() => setOpts(ALL_ON)}
          className="rounded-full border hairline px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:bg-[var(--color-surface)]"
        >
          {locale === "zh" ? "全部选项" : locale === "ja" ? "すべて有効" : locale === "es" ? "Activar todo" : locale === "pt" ? "Ativar tudo" : "Turn all on"}
        </button>
        <span className="text-[12.5px] text-[var(--color-sub)]">
          {total > 0
            ? locale === "zh"
              ? `${total} 处修改`
              : locale === "ja"
                ? `${total} 件の変更`
                : locale === "es"
                  ? `${total} cambios`
                  : locale === "pt"
                    ? `${total} alterações`
                    : `${total} changes`
            : "\u00a0"}
        </span>
      </div>

      <textarea
        className="field mono mt-3 bg-[var(--color-surface)]"
        rows={6}
        value={output}
        readOnly
        placeholder={t.common.output}
        aria-label={t.common.output}
      />
      <div className="mt-3">
        <CopyButton value={output} />
      </div>
    </ToolPanel>
  );
}
