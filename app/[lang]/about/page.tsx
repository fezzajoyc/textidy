import { dict } from "@/lib/i18n";
import { isLocale, LOCALES, type Locale } from "@/lib/site";
import { ALL_TOOLS } from "@/tools/registry";
import { Container, Prose, SectionHead } from "@/components/ui";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

const CONTENT: Partial<Record<Locale, string[]>> = {
  en: [
    "Textidy is a workshop of text tools for people who work with words — writers, editors, students, developers. Everything runs entirely in your browser: there is no backend, so the text you paste is processed by JavaScript on your own device.",
    "That design gives us three properties we care about. It is private by construction — there is nothing to upload, so nothing can leak. It is fast — there is no round trip to a server. And it is honest — every tool does exactly what the page says, no tricks.",
    "The current set covers six daily text workflows: comparing eight case styles at once, cleaning messy text with per-pass change counts, forging URL slugs, generating placeholder text, escaping HTML entities and multi-step text surgery. New tools are added regularly — each one targets a workflow, not a checkbox.",
  ],
  zh: [
    "Textidy 是为文字工作者——写作者、编辑、学生、开发者——打造的文本工具坊。所有工具完全在浏览器里运行:没有后端,你粘贴的文本由你自己设备上的 JavaScript 处理。",
    "这个设计带来三个我们看重的性质:隐私是构造出来的——没有上传,就谈不上泄露;速度快——没有服务器往返;诚实——每个工具都做页面所说的事,不玩花样。",
    "目前的六个工具对应六种日常文本工作流:8 种大小写一次对比、按步骤计数清洗乱文本、锻造 URL slug、生成占位文、HTML 实体转义、多步文本手术。工具会持续新增——每一个都对准一种真实工作流,而不是凑数。",
  ],
  ja: [
    "Textidy は、言葉を仕事にする人——書き手・編集者・学生・開発者——のためのテキストツール集です。すべてブラウザ内で動きます。バックエンドはなく、貼り付けたテキストは自分のデバイス上の JavaScript が処理します。",
    "この設計には、私たちが大切にする 3 つの性質があります。プライバシーは構造的に保証される(アップロードがないので漏えいもない)、速い(サーバー往復がない)、そして誠実(各ツールはページに書かれた通りのことだけをする)。",
    "現在の 6 つのツールは、日々のテキスト作業に対応します:8 種類のケースを一度に比較、パスごとの変更数つきクリーニング、URL スラッグの生成、ダミーテキスト、HTML 実体のエスケープ、多段階のテキスト手術。ツールは随時追加します——チェック欄を埋めるためではなく、実際の作業のためです。",
  ],
  es: [
    "Textidy es un taller de herramientas de texto para quienes trabajan con palabras: escritores, editores, estudiantes, desarrolladores. Todo funciona por completo en tu navegador: no hay backend, así que el texto que pegas lo procesa el JavaScript de tu propio dispositivo.",
    "Ese diseño nos da tres propiedades que nos importan. Privacidad por construcción: no hay subidas, así que no puede haber fugas. Velocidad: sin viajes de ida y vuelta al servidor. Honestidad: cada herramienta hace exactamente lo que dice su página.",
    "Las seis herramientas actuales cubren seis flujos de trabajo diarios: comparar ocho estilos de caja a la vez, limpiar texto sucio con recuento por pasada, forjar slugs, generar texto de relleno, escapar entidades HTML y cirugía de texto en varios pasos. Se añaden herramientas con regularidad — cada una apunta a un flujo real, no a una casilla.",
  ],
  pt: [
    "Textidy é uma oficina de ferramentas de texto para quem trabalha com palavras: escritores, editores, estudantes, desenvolvedores. Tudo roda inteiramente no seu navegador: não há backend, então o texto que você cola é processado pelo JavaScript do seu próprio dispositivo.",
    "Esse design nos dá três propriedades que valorizamos. Privacidade por construção: não há uploads, logo não há vazamentos. Velocidade: sem viagem ao servidor. Honestidade: cada ferramenta faz exatamente o que a página diz.",
    "As seis ferramentas atuais cobrem seis fluxos de trabalho diários: comparar oito estilos de caixa de uma vez, limpar texto bagunçado com contagem por passada, forjar slugs, gerar texto de preenchimento, escapar entidades HTML e cirurgia de texto em várias etapas. Novas ferramentas chegam com regularidade — cada uma mira um fluxo real, não uma caixinha.",
  ],
};

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) return null;
  const t = dict(lang as Locale);
  return (
    <Container className="max-w-3xl py-12">
      <SectionHead title={t.nav.about} />
      <Prose paragraphs={CONTENT[lang as Locale] ?? CONTENT.en!} />
      <p className="mt-6 text-[14px] text-[var(--color-sub)]">
        {ALL_TOOLS.length} tools · {LOCALES.length} languages
      </p>
    </Container>
  );
}
