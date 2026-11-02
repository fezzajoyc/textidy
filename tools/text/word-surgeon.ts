import { WordSurgeon } from "../_engines/word-surgeon";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "word-surgeon",
  category: "text",
  icon: "swap",
  featured: true,
  engine: { component: WordSurgeon, props: {} },
  related: ["text-cleaner", "case-studio", "lorem-generator"],
  copy: {
    en: {
      name: "Word Surgeon",
      h1: "Word Surgeon — find & replace, prefixes, line numbers and stats in one panel",
      tagline:
        "Multi-step text surgery in one panel: find & replace all, add a prefix or suffix to every line, number lines, and watch live word/character stats update as you operate.",
      intro: [
        "Most editing is a sequence of small operations: replace every old product name, put “- ” in front of each line for a list, number the steps, check you are still under the word limit. Word Surgeon chains those operations in one panel — no round-trips through different tools.",
        "The operations apply in a fixed order (replace, then affixes, then numbering), the output updates live, and the stats row counts words, characters, sentences and lines of the result — so the word limit check happens as you operate, not after.",
      ],
      steps: [
        "Paste your text into the input box.",
        "Set up a find & replace (optional match-case), a per-line prefix or suffix, and line numbering.",
        "Watch the output and live stats update with every keystroke.",
        "Copy the result — or keep stacking operations in the same panel.",
      ],
      faqs: [
        {
          q: "Is find & replace literal or regex?",
          a: "Literal: what you type is what gets found, with no regex metacharacter surprises. Leave the match-case box unticked to replace every capitalization variant.",
        },
        {
          q: "Are prefixes and prefixes applied per line or per paragraph?",
          a: "Per line. That is what turns a plain list into “- item” bullets or quotes every line with “> ” — the two jobs editors ask for most.",
        },
        {
          q: "Do line numbers align?",
          a: "Yes. Numbers are left-padded to the width of the largest number, so line 10 lines up with line 9 instead of shifting the text.",
        },
        {
          q: "Are the stats CJK-aware?",
          a: "Yes. Word counting treats each CJK character as a word, which matches how Chinese, Japanese and Korean text is actually measured, while Latin words count the usual way.",
        },
      ],
    },
    zh: {
      name: "词汇手术台",
      h1: "词汇手术台——查找替换、每行前后缀、行号与统计,一个面板全搞定",
      tagline:
        "一个面板完成多步文本手术:全部查找替换、每行加前后缀、行号编号,词数/字符统计随操作实时刷新。",
      intro: [
        "大多数编辑工作都是一连串小操作:替换所有旧产品名、给每行加“- ”变成列表、给步骤编号、确认没有超字数。词汇手术台把这些操作串在一个面板里——不用在多个工具间来回倒。",
        "操作按固定顺序执行(先替换、再加前后缀、最后编号),输出实时刷新,统计栏随时数着结果的词数、字符数、句数和行数——字数检查在操作中完成,而不是操作完再查。",
      ],
      steps: [
        "把文本粘贴进输入框。",
        "设置查找替换(可选区分大小写)、每行前后缀和行号编号。",
        "输出与实时统计随每次按键刷新。",
        "复制结果——或继续在同一面板叠加操作。",
      ],
      faqs: [
        {
          q: "查找替换是字面量还是正则?",
          a: "字面量:输入什么就找什么,不会有正则元字符的意外。不勾选区分大小写时,会替换所有大小写变体。",
        },
        {
          q: "前后缀是按行还是按段加?",
          a: "按行。这正是把普通清单变成“- 条目”项目符号、或给每行加“> ”引用的两个最常见需求。",
        },
        {
          q: "行号会对齐吗?",
          a: "会。序号按最大数字的宽度左补齐,第 10 行与第 9 行上下对齐,正文不会错位。",
        },
        {
          q: "统计支持中日韩文本吗?",
          a: "支持。词数统计把每个中日韩字符计为一个词,符合中文、日文、韩文的真实计量方式;拉丁文单词则按常规计数。",
        },
      ],
    },
    ja: {
      name: "ワードサージョン",
      h1: "ワードサージョン — 置換・接頭辞/接尾辞・行番号・統計を 1 パネルで",
      tagline:
        "1 パネルで多段階のテキスト手術:すべて置換、各行に接頭辞/接尾辞を追加、行番号付け、語数/文字数の統計は操作に合わせてリアルタイム更新。",
      intro: [
        "編集のほとんどは小さな操作の連続です:古い製品名をすべて置換、各行の頭に「- 」を付けてリスト化、手順に番号を付け、語数制限を確認。ワードサージョンはそれらを 1 パネルでつなぎます——別ツールへの往復はもう不要。",
        "操作は固定順序(置換 → 接頭辞/接尾辞 → 行番号)で適用され、出力はリアルタイム更新。統計行は結果の語数・文字数・文数・行数を数えるので、語数チェックは操作しながら済みます。",
      ],
      steps: [
        "テキストを入力欄に貼り付けます。",
        "検索と置換(大文字小文字の区別は任意)、各行の接頭辞/接尾辞、行番号を設定します。",
        "出力とリアルタイム統計がキー入力のたびに更新されます。",
        "結果をコピー——または同じパネルで操作を重ね続けます。",
      ],
      faqs: [
        {
          q: "検索と置換はリテラル?正規表現?",
          a: "リテラルです:入力した文字列がそのまま検索され、正規表現のメタ文字で驚くことはありません。大文字小文字を区別しないチェックを外せば、大文字小文字のバリエーションもすべて置換します。",
        },
        {
          q: "接頭辞/接尾辞は行ごと?段落ごと?",
          a: "行ごとです。普通のリストを「- 項目」の箇条書きにしたり、各行を「> 」で引用する——編集者からの依頼が最も多い 2 つの作業にそのまま使えます。",
        },
        {
          q: "行番号は揃いますか?",
          a: "揃います。番号は最大桁数に合わせて左側を空白でパディングするので、10 行目が 9 行目と縦に揃い、本文がずれません。",
        },
        {
          q: "統計は CJK 対応ですか?",
          a: "はい。語数の計算では CJK の 1 文字を 1 語として数えます。中国語・日本語・韓国語の実際の数え方に一致し、ラテン文字の単語は通常通り数えます。",
        },
      ],
    },
    es: {
      name: "Cirujano de palabras",
      h1: "Cirujano de palabras — buscar y reemplazar, prefijos, numeración y estadísticas en un panel",
      tagline:
        "Cirugía de texto en varios pasos dentro de un panel: buscar y reemplazar todo, añadir prefijo o sufijo a cada línea, numerar líneas y ver estadísticas de palabras y caracteres en vivo.",
      intro: [
        "Editar es, casi siempre, una secuencia de operaciones pequeñas: sustituir el nombre antiguo del producto, poner «- » delante de cada línea, numerar los pasos, comprobar que no te pasas de palabras. El Cirujano de palabras encadena esas operaciones en un solo panel, sin ir y volver entre herramientas.",
        "Las operaciones se aplican en un orden fijo (reemplazar, luego prefijos y sufijos, luego numeración), la salida se actualiza en vivo, y la fila de estadísticas cuenta palabras, caracteres, frases y líneas del resultado: el control del límite de palabras ocurre mientras operas, no después.",
      ],
      steps: [
        "Pega tu texto en el cuadro de entrada.",
        "Configura buscar y reemplazar (con mayúsculas opcional), un prefijo o sufijo por línea y la numeración.",
        "Observa cómo la salida y las estadísticas se actualizan con cada tecla.",
        "Copia el resultado, o sigue acumulando operaciones en el mismo panel.",
      ],
      faqs: [
        {
          q: "¿El buscar y reemplazar es literal o regex?",
          a: "Literal: lo que escribes es lo que se busca, sin sorpresas de metacaracteres. Deja sin marcar la casilla de mayúsculas para reemplazar todas las variantes de capitalización.",
        },
        {
          q: "¿Los prefijos se aplican por línea o por párrafo?",
          a: "Por línea. Es justo lo que convierte una lista simple en viñetas «- elemento» o cita cada línea con «> » — los dos encargos más frecuentes.",
        },
        {
          q: "¿Los números de línea se alinean?",
          a: "Sí. Los números se rellenan a la izquierda hasta el ancho del mayor, así la línea 10 queda alineada con la 9 en vez de desplazar el texto.",
        },
        {
          q: "¿Las estadísticas tienen en cuenta el CJK?",
          a: "Sí. El recuento de palabras trata cada carácter CJK como una palabra, como se mide de verdad el chino, el japonés y el coreano; las palabras latinas cuentan de la manera habitual.",
        },
      ],
    },
    pt: {
      name: "Cirurgião de palavras",
      h1: "Cirurgião de palavras — localizar e substituir, prefixos, numeração e estatísticas num painel",
      tagline:
        "Cirurgia de texto em várias etapas num painel: localizar e substituir tudo, adicionar prefixo ou sufixo a cada linha, numerar linhas e ver estatísticas de palavras e caracteres ao vivo.",
      intro: [
        "Editar é quase sempre uma sequência de operações pequenas: trocar o nome antigo do produto, colocar “- ” antes de cada linha, numerar os passos, conferir se não passou do limite de palavras. O Cirurgião de palavras encadeia essas operações num só painel — sem ir e voltar entre ferramentas.",
        "As operações são aplicadas numa ordem fixa (substituir, depois afixos, depois numeração), a saída atualiza ao vivo, e a linha de estatísticas conta palavras, caracteres, frases e linhas do resultado — a conferência do limite acontece enquanto você opera, não depois.",
      ],
      steps: [
        "Cole seu texto na caixa de entrada.",
        "Configure localizar e substituir (maiúsculas opcional), um prefixo ou sufixo por linha e a numeração.",
        "Acompanhe a saída e as estatísticas atualizando a cada tecla.",
        "Copie o resultado — ou continue acumulando operações no mesmo painel.",
      ],
      faqs: [
        {
          q: "O localizar e substituir é literal ou regex?",
          a: "Literal: o que você digita é o que será encontrado, sem surpresas de metacaracteres. Deixe a caixa de maiúsculas desmarcada para substituir todas as variantes de capitalização.",
        },
        {
          q: "Os prefixos valem por linha ou por parágrafo?",
          a: "Por linha. É exatamente o que transforma uma lista simples em marcadores “- item” ou cita cada linha com “> ” — os dois pedidos mais comuns.",
        },
        {
          q: "Os números de linha ficam alinhados?",
          a: "Sim. Os números recebem espaços à esquerda até a largura do maior, então a linha 10 alinha com a 9 em vez de empurrar o texto.",
        },
        {
          q: "As estatísticas reconhecem CJK?",
          a: "Sim. A contagem de palavras trata cada caractere CJK como uma palavra, como o chinês, o japonês e o coreano são medidos de verdade; palavras latinas contam do jeito usual.",
        },
      ],
    },
  },
});
