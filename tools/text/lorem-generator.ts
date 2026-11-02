import { LoremGenerator } from "../_engines/lorem-generator";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "lorem-generator",
  category: "text",
  icon: "file",
  engine: { component: LoremGenerator, props: {} },
  related: ["word-surgeon", "case-studio", "text-cleaner"],
  copy: {
    en: {
      name: "Lorem Generator",
      h1: "Lorem Generator — placeholder text by paragraphs, sentences or words",
      tagline:
        "Generate placeholder filler by paragraphs, sentences or exact word counts — classic Lorem ipsum or the modern “But I must explain…” filler, with optional HTML <p> wrapping.",
      intro: [
        "Layouts need filler text in specific doses: three paragraphs for a wireframe, exactly 100 words for a template test, a single block for a typography specimen. This generator counts in paragraphs, sentences or words — the amount you ask for is the amount you get.",
        "Two vocabularies: the classic “Lorem ipsum dolor sit amet” canon, or the modern de Finibus filler that starts “But I must explain to you…” — the one lipsum.com itself uses when you want placeholder prose that does not scream lorem ipsum. HTML mode wraps paragraphs in <p> tags ready to paste into markup.",
      ],
      steps: [
        "Pick a unit — paragraphs, sentences or words — and set the amount.",
        "Choose classic Lorem ipsum or the modern filler style.",
        "Enable HTML wrap if you need <p> tags for markup.",
        "Copy the result, or hit Regenerate for a different random draw.",
      ],
      faqs: [
        {
          q: "What is the difference between classic and modern filler?",
          a: "Classic is the scrambled Latin canon that starts “Lorem ipsum dolor sit amet”. Modern is the English de Finibus passage used by lipsum.com — it starts “But I must explain to you…” and reads like real prose, so mockups look less obviously like placeholders.",
        },
        {
          q: "Does the word count include punctuation?",
          a: "Word mode produces exactly the number of space-separated words you request. Sentences are 8–19 words each; paragraphs are 3–5 sentences, so paragraph lengths vary like real text.",
        },
        {
          q: "Is the output random every time?",
          a: "The draw is seeded, so each Regenerate gives a new variation. Two renders with the same settings can differ — that is intentional, so repeated sections do not look copy-pasted.",
        },
        {
          q: "What does HTML wrap mode produce?",
          a: "Each paragraph becomes <p>…</p>, separated by newlines — ready to paste into HTML, JSX templates or CMS rich-text editors in HTML mode.",
        },
      ],
    },
    zh: {
      name: "占位文生成器",
      h1: "占位文生成器——按段落、句子或词数生成占位文本",
      tagline:
        "按段落、句子或精确词数生成占位填充文——经典 Lorem ipsum 或以“But I must explain…”开头的现代填充文,可选 HTML <p> 标签包裹。",
      intro: [
        "排版需要特定剂量的填充文:线框图要三段,模板测试要整整 100 个词,字体样张要一大块。这个生成器按段落、句子或词数计数——要多少就给多少。",
        "两种词库:经典的“Lorem ipsum dolor sit amet”正典,或以“But I must explain to you…”开头的现代 de Finibus 填充文——就是 lipsum.com 自用的那篇,想让占位文不那么一眼假时就用它。HTML 模式把每段包上 <p> 标签,直接粘进标记即可。",
      ],
      steps: [
        "选择单位——段落、句子或单词——并设定数量。",
        "选择经典 Lorem ipsum 或现代填充文风格。",
        "需要在标记中使用时开启 HTML 包裹。",
        "复制结果,或点“换一批”抽取新的随机组合。",
      ],
      faqs: [
        {
          q: "经典与现代填充文有什么区别?",
          a: "经典是“Lorem ipsum dolor sit amet”开头的拉丁乱序正典。现代是 lipsum.com 使用的英文 de Finibus 段落——以“But I must explain to you…”开头,读起来像真正的散文,让设计稿看起来不那么明显是占位符。",
        },
        {
          q: "词数包含标点吗?",
          a: "词模式输出的就是你要的空格分隔词数。每句 8–19 个词,每段 3–5 句,所以段落长短像真实文本一样有变化。",
        },
        {
          q: "每次输出都是随机的吗?",
          a: "随机数有种子,每次“换一批”都会得到新的变体。同样设置两次生成可能不同——这是有意为之,让重复的板块看起来不像复制粘贴。",
        },
        {
          q: "HTML 包裹模式输出什么?",
          a: "每段变成 <p>…</p>,段落之间用换行分隔——可直接粘进 HTML、JSX 模板或 CMS 富文本编辑器的 HTML 模式。",
        },
      ],
    },
    ja: {
      name: "ダミーテキスト生成",
      h1: "ダミーテキスト生成 — 段落・文・語数でプレースホルダーを作成",
      tagline:
        "段落・文・正確な語数でダミーテキストを生成——定番の Lorem ipsum または「But I must explain…」で始まるモダンなフィラー。HTML の <p> 囲みも選択可。",
      intro: [
        "レイアウトには決まった量のダミーテキストが必要です:ワイヤーフレームに 3 段落、テンプレート検証にちょうど 100 語、書体見本に 1 ブロック。この生成器は段落・文・語数で数え、指定した量をそのまま出力します。",
        "語彙は 2 種類:定番の「Lorem ipsum dolor sit amet」の正典、または lipsum.com 自身が使う De Finibus の現代フィラーで「But I must explain to you…」と始まります——プレースホルダーと見た目でバレない文章にしたいときに。HTML モードは各段落を <p> タグで囲み、そのままマークアップに貼れます。",
      ],
      steps: [
        "単位(段落・文・単語)を選び、量を指定します。",
        "クラシックの Lorem ipsum かモダンフィラーを選びます。",
        "マークアップに使うなら HTML 囲みを有効にします。",
        "結果をコピーするか、「生成し直す」で別の抽選に。",
      ],
      faqs: [
        {
          q: "クラシックとモダンの違いは?",
          a: "クラシックは「Lorem ipsum dolor sit amet」で始まるラテン語の定番。モダンは lipsum.com が使う英語の De Finibusの一節で「But I must explain to you…」と始まり、実際の文章のように読めるので、モックがプレースホルダーと分かりにくくなります。",
        },
        {
          q: "語数に句読点は含まれますか?",
          a: "単語モードは要求したスペース区切りの語数を正確に出力します。文は 8〜19 語、段落は 3〜5 文なので、段落の長さは実際のテキストのようにばらつきます。",
        },
        {
          q: "出力は毎回ランダムですか?",
          a: "抽選はシード付きで、「生成し直す」たびに新しいバリエーションになります。同じ設定でも結果が変わるのは意図的です——繰り返しのセクションがコピペに見えないように。",
        },
        {
          q: "HTML 囲みモードの出力は?",
          a: "各段落が <p>…</p> になり、改行で区切られます——HTML、JSX テンプレート、CMS リッチテキストエディタの HTML モードにそのまま貼れます。",
        },
      ],
    },
    es: {
      name: "Generador de lorem",
      h1: "Generador de lorem — texto de relleno por párrafos, frases o palabras",
      tagline:
        "Genera relleno por párrafos, frases o recuentos exactos de palabras — Lorem ipsum clásico o el relleno moderno «But I must explain…», con envoltorio HTML <p> opcional.",
      intro: [
        "Los maquetados necesitan relleno en dosis concretas: tres párrafos para un wireframe, exactamente 100 palabras para una plantilla, un solo bloque para una muestra tipográfica. Este generador cuenta en párrafos, frases o palabras: pides una cantidad y recibes exactamente esa.",
        "Dos vocabularios: el canon clásico «Lorem ipsum dolor sit amet» o el relleno moderno de De Finibus que empieza «But I must explain to you…» — el que usa lipsum.com cuando quieres prosa de relleno que no grite lorem ipsum. El modo HTML envuelve cada párrafo en etiquetas <p> listas para pegar.",
      ],
      steps: [
        "Elige la unidad — párrafos, frases o palabras — y fija la cantidad.",
        "Escoge Lorem ipsum clásico o el estilo de relleno moderno.",
        "Activa el envoltorio HTML si necesitas etiquetas <p>.",
        "Copia el resultado o pulsa Generar de nuevo para otra tirada.",
      ],
      faqs: [
        {
          q: "¿Qué diferencia hay entre el relleno clásico y el moderno?",
          a: "El clásico es el canon latino revuelto que empieza «Lorem ipsum dolor sit amet». El moderno es el pasaje de De Finibus que usa lipsum.com — empieza «But I must explain to you…» y se lee como prosa real, así que los mockups no parecen tan obviamente placeholders.",
        },
        {
          q: "¿El recuento de palabras incluye puntuación?",
          a: "El modo palabra produce exactamente las palabras separadas por espacios que pidas. Las frases tienen 8–19 palabras y los párrafos 3–5 frases, así que las longitudes varían como en un texto real.",
        },
        {
          q: "¿La salida es aleatoria cada vez?",
          a: "La tirada va con semilla: cada «Generar de nuevo» da una variación nueva. Dos generaciones con los mismos ajustes pueden diferir — es intencional, para que las secciones repetidas no parezcan copiadas.",
        },
        {
          q: "¿Qué produce el modo HTML?",
          a: "Cada párrafo se convierte en <p>…</p>, separados por saltos de línea — listo para pegar en HTML, plantillas JSX o editores de texto enriquecido del CMS en modo HTML.",
        },
      ],
    },
    pt: {
      name: "Gerador de lorem",
      h1: "Gerador de lorem — texto de preenchimento por parágrafos, frases ou palavras",
      tagline:
        "Gere preenchimento por parágrafos, frases ou contagens exatas de palavras — Lorem ipsum clássico ou o preenchimento moderno “But I must explain…”, com empacotamento HTML <p> opcional.",
      intro: [
        "Layouts precisam de preenchimento em doses específicas: três parágrafos para um wireframe, exatamente 100 palavras para um teste de template, um bloco único para uma amostra tipográfica. Este gerador conta em parágrafos, frases ou palavras — a quantidade que você pede é a que recebe.",
        "Dois vocabulários: o cânone clássico “Lorem ipsum dolor sit amet” ou o preenchimento moderno de De Finibus que começa “But I must explain to you…” — o que o lipsum.com usa quando você quer uma prosa de preenchimento que não grite lorem ipsum. O modo HTML envolve cada parágrafo em tags <p> prontas para colar.",
      ],
      steps: [
        "Escolha a unidade — parágrafos, frases ou palavras — e defina a quantidade.",
        "Escolha Lorem ipsum clássico ou o estilo de preenchimento moderno.",
        "Ative o empacotamento HTML se precisar de tags <p>.",
        "Copie o resultado ou clique em Gerar de novo para outra tiragem.",
      ],
      faqs: [
        {
          q: "Qual é a diferença entre o preenchimento clássico e o moderno?",
          a: "O clássico é o cânon latino embaralhado que começa “Lorem ipsum dolor sit amet”. O moderno é o trecho de De Finibus usado pelo lipsum.com — começa “But I must explain to you…” e lê-se como prosa real, então os mockups não parecem tão obviamente placeholders.",
        },
        {
          q: "A contagem de palavras inclui pontuação?",
          a: "O modo palavra produz exatamente as palavras separadas por espaço que você pediu. As frases têm 8–19 palavras e os parágrafos 3–5 frases, então os comprimentos variam como num texto real.",
        },
        {
          q: "A saída é aleatória toda vez?",
          a: "A tiragem usa semente: cada “Gerar de novo” traz uma variação nova. Duas gerações com as mesmas configurações podem diferir — é intencional, para que seções repetidas não pareçam copiadas.",
        },
        {
          q: "O que o modo HTML produz?",
          a: "Cada parágrafo vira <p>…</p>, separados por quebras de linha — pronto para colar em HTML, templates JSX ou editores de texto rico do CMS em modo HTML.",
        },
      ],
    },
  },
});
