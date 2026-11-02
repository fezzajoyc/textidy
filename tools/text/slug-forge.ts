import { SlugForge } from "../_engines/slug-forge";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "slug-forge",
  category: "text",
  icon: "link",
  featured: true,
  engine: { component: SlugForge, props: {} },
  related: ["case-studio", "text-cleaner", "entity-escaper"],
  copy: {
    en: {
      name: "Slug Forge",
      h1: "Slug Forge — turn any headline into a clean URL slug",
      tagline:
        "Turn any title into a clean URL slug: accents stripped, stop words optional, hyphen or underscore separators, plus an UPPERCASE variant — with a live preview and one-click copy.",
      intro: [
        "A good slug is lowercase, accent-free, and free of filler words. Slug Forge takes your headline, strips diacritics (Café → cafe), optionally drops stop words like “the”, “of” and “and”, and joins the rest with hyphens or underscores.",
        "Every option updates the slug live, shows an example URL, and copies with one click. Accented Latin, punctuation and mixed case all fold into a single predictable pattern — no guessing at what a CMS will accept.",
      ],
      steps: [
        "Type or paste your headline into the input box.",
        "Pick a separator (hyphen or underscore) and toggle stop-word removal or UPPERCASE.",
        "Copy the slug or the example URL preview.",
      ],
      faqs: [
        {
          q: "What are stop words and why remove them?",
          a: "Short function words like “a”, “the”, “of” and “and” add length without meaning. Removing them makes slugs like /best-coffee-shops instead of /the-best-of-coffee-shops — shorter, cleaner, and easier to read in search results.",
        },
        {
          q: "What happens to accented characters?",
          a: "Diacritics are stripped using Unicode decomposition: café → cafe, mémoire → memoire. The letter itself is kept, only the accent mark goes.",
        },
        {
          q: "Can I slugify Chinese, Japanese or Korean text?",
          a: "No — slugs can only contain the letters a–z, digits 0–9 and the separator, so pure CJK input produces an empty result. Transliterate or use a Latin title first.",
        },
        {
          q: "Should URLs be uppercase?",
          a: "Traditionally they are lowercase, but some systems (campaign codes, file naming conventions) require uppercase. The UPPERCASE toggle covers those cases without changing the word structure.",
        },
      ],
    },
    zh: {
      name: "Slug 锻造台",
      h1: "Slug 锻造台——把任意标题变成干净的 URL slug",
      tagline:
        "把任意标题变成干净的 URL slug:去重音符、可选去停用词、连字符或下划线分隔、还能输出大写变体——实时预览,一键复制。",
      intro: [
        "好的 slug 应该是小写、无重音、没有虚词的。Slug 锻造台拿到你的标题,去掉变音符号(Café → cafe),可选地去掉 the、of、and 等停用词,再把剩下的词用连字符或下划线连起来。",
        "每个选项都会实时刷新 slug,附示例 URL,一键复制。带重音的拉丁字母、标点和混合大小写都会折叠成同一个可预期的模式——不用猜 CMS 会接受什么。",
      ],
      steps: [
        "把标题输入或粘贴到输入框。",
        "选择分隔符(连字符或下划线),按需开关去停用词和大写。",
        "复制 slug 或示例 URL 预览。",
      ],
      faqs: [
        {
          q: "什么是停用词,为什么要去掉?",
          a: "a、the、of、and 这类短虚词只增加长度不增加含义。去掉后 slug 是 /best-coffee-shops 而不是 /the-best-of-coffee-shops——更短、更干净,在搜索结果里也更好读。",
        },
        {
          q: "带重音的字符怎么处理?",
          a: "用 Unicode 分解去掉变音符号:café → cafe,mémoire → memoire。字母本身保留,只去掉重音符号。",
        },
        {
          q: "中文、日文、韩文能生成 slug 吗?",
          a: "不能——slug 只能包含字母 a–z、数字 0–9 和分隔符,纯 CJK 输入会得到空结果。请先音译或改用拉丁字母标题。",
        },
        {
          q: "URL 应该用大写吗?",
          a: "惯例是小写,但有些系统(活动代码、文件命名规范)要求大写。大写开关专为这些场景准备,不改变词的结构。",
        },
      ],
    },
    ja: {
      name: "スラッグ鍛造",
      h1: "スラッグ鍛造 — 見出しをきれいな URL スラッグに",
      tagline:
        "どんな見出しもきれいな URL スラッグに:アクセント除去、ストップワード除去(任意)、ハイフン/アンダースコア区切り、大文字バリアントも。ライブプレビューとワンクリックコピー付き。",
      intro: [
        "良いスラッグは小文字・アクセントなし・不要語なし。スラッグ鍛造は見出しからダイアクリティカルマークを外し(Café → cafe)、the・of・and などのストップワードを任意で除き、残りをハイフンまたはアンダースコアでつなぎます。",
        "どのオプションもスラッグをリアルタイムに更新し、URL 例を表示、ワンクリックでコピー。アクセント付きラテン文字・記号・大小混在もひとつの予測可能なパターンに畳み込みます——CMS が何を受け入れるか推測する必要はありません。",
      ],
      steps: [
        "見出しを入力欄に入力または貼り付けます。",
        "区切り文字(ハイフン/アンダースコア)を選び、ストップワード除去や大文字を切り替えます。",
        "スラッグまたは URL 例をコピーします。",
      ],
      faqs: [
        {
          q: "ストップワードとは?なぜ除去するの?",
          a: "a・the・of・and のような短い機能語は、長さを増やすだけで意味を加えません。除去すれば /best-coffee-shops のようになり、/the-best-of-coffee-shops より短く、検索結果でも読みやすくなります。",
        },
        {
          q: "アクセント付き文字はどうなりますか?",
          a: "Unicode 分解でダイアクリティカルマークを除去します:café → cafe、mémoire → memoire。文字自体は残り、アクセント記号だけが外れます。",
        },
        {
          q: "中国語・日本語・韓国語もスラッグ化できますか?",
          a: "できません——スラッグは a–z、0–9 と区切り文字のみなので、CJK のみの入力は空になります。先に翻字するか、ラテン文字のタイトルを使ってください。",
        },
        {
          q: "URL は大文字にすべき?",
          a: "慣習的には小文字ですが、キャンペーンコードやファイル命名規則など大文字を求めるシステムもあります。大文字トグルは語構造を変えずにそのケースに対応します。",
        },
      ],
    },
    es: {
      name: "Forja de slugs",
      h1: "Forja de slugs — convierte cualquier titular en un slug limpio",
      tagline:
        "Convierte cualquier titular en un slug limpio: sin acentos, sin palabras vacías (opcional), separador de guion o guion bajo, variante en MAYÚSCULAS — con vista previa en vivo y copia de un clic.",
      intro: [
        "Un buen slug va en minúsculas, sin acentos y sin palabras de relleno. La Forja de slugs toma tu titular, quita los diacríticos (Café → cafe), opcionalmente elimina palabras vacías como «the», «of» y «and», y une el resto con guiones o guiones bajos.",
        "Cada opción actualiza el slug en vivo, muestra una URL de ejemplo y copia con un clic. Latín acentuado, puntuación y mayúsculas mezcladas se pliegan en un patrón único y predecible — sin adivinar qué aceptará el CMS.",
      ],
      steps: [
        "Escribe o pega tu titular en el cuadro de entrada.",
        "Elige separador (guion o guion bajo) y activa la eliminación de palabras vacías o las MAYÚSCULAS.",
        "Copia el slug o la vista previa de la URL.",
      ],
      faqs: [
        {
          q: "¿Qué son las palabras vacías y por qué quitarlas?",
          a: "Palabras cortas como «a», «the», «of» y «and» añaden longitud sin significado. Quitarlas produce slugs como /best-coffee-shops en vez de /the-best-of-coffee-shops: más cortos, más limpios y más legibles en los resultados de búsqueda.",
        },
        {
          q: "¿Qué pasa con los caracteres acentuados?",
          a: "Los diacríticos se quitan por descomposición Unicode: café → cafe, mémoire → memoire. La letra se conserva; solo desaparece la marca.",
        },
        {
          q: "¿Puedo crear slugs en chino, japonés o coreano?",
          a: "No — los slugs solo admiten letras a–z, dígitos 0–9 y el separador, así que la entrada puramente CJK da un resultado vacío. Translitera o usa antes un título en alfabeto latino.",
        },
        {
          q: "¿Las URL deberían ir en mayúsculas?",
          a: "Por convención van en minúsculas, pero algunos sistemas (códigos de campaña, convenciones de archivos) exigen mayúsculas. El interruptor MAYÚSCULAS cubre esos casos sin alterar la estructura de las palabras.",
        },
      ],
    },
    pt: {
      name: "Forja de slugs",
      h1: "Forja de slugs — transforme qualquer título em um slug limpo",
      tagline:
        "Transforme qualquer título em um slug limpo: sem acentos, palavras vazias opcionais, separador por hífen ou sublinhado, variante em MAIÚSCULAS — com pré-visualização ao vivo e cópia de um clique.",
      intro: [
        "Um bom slug é minúsculo, sem acentos e sem palavras de enchimento. A Forja de slugs pega seu título, remove os diacríticos (Café → cafe), opcionalmente descarta palavras vazias como “the”, “of” e “and” e junta o resto com hífens ou sublinhados.",
        "Cada opção atualiza o slug ao vivo, mostra uma URL de exemplo e copia com um clique. Latim acentuado, pontuação e maiúsculas misturadas viram um padrão único e previsível — sem adivinhar o que o CMS vai aceitar.",
      ],
      steps: [
        "Digite ou cole seu título na caixa de entrada.",
        "Escolha o separador (hífen ou sublinhado) e ative a remoção de palavras vazias ou MAIÚSCULAS.",
        "Copie o slug ou a pré-visualização da URL.",
      ],
      faqs: [
        {
          q: "O que são palavras vazias e por que removê-las?",
          a: "Palavras curtas como “a”, “the”, “of” e “and” adicionam comprimento sem significado. Removê-las gera slugs como /best-coffee-shops em vez de /the-best-of-coffee-shops — mais curtos, mais limpos e mais legíveis nos resultados de busca.",
        },
        {
          q: "O que acontece com caracteres acentuados?",
          a: "Os diacríticos são removidos por decomposição Unicode: café → cafe, mémoire → memoire. A letra permanece; só a marca de acento sai.",
        },
        {
          q: "Dá para criar slugs em chinês, japonês ou coreano?",
          a: "Não — slugs só aceitam letras a–z, dígitos 0–9 e o separador, então entrada puramente CJK produz um resultado vazio. Translitera ou use antes um título em alfabeto latino.",
        },
        {
          q: "As URLs deveriam ser em maiúsculas?",
          a: "Por convenção são minúsculas, mas alguns sistemas (códigos de campanha, convenções de arquivos) exigem maiúsculas. A opção MAIÚSCULAS cobre esses casos sem mudar a estrutura das palavras.",
        },
      ],
    },
  },
});
