import { TextCleaner } from "../_engines/text-cleaner";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "text-cleaner",
  category: "text",
  icon: "sparkle",
  featured: true,
  engine: { component: TextCleaner, props: {} },
  related: ["word-surgeon", "case-studio", "slug-forge", "lorem-generator"],
  copy: {
    en: {
      name: "Text Cleaner",
      h1: "Text Cleaner — scrub messy text with toggleable passes",
      tagline:
        "Clean messy text with four toggleable passes — invisible characters, extra spaces, duplicate lines and A→Z sorting — applied in sequence with a live change count for each.",
      intro: [
        "Copy-pasted text arrives with invisible control characters, curly quotes that break search, runs of spaces, duplicated lines and random order. Text Cleaner fixes all of it with four passes you switch on or off — no all-or-nothing button.",
        "Each pass reports exactly how many things it changed, and the pipeline applies in a fixed, predictable order: clean characters, then collapse spaces, then deduplicate lines, then sort. Everything happens in your browser as you type.",
      ],
      steps: [
        "Paste the messy text into the input box.",
        "Toggle the passes you want — clean characters, extra spaces, duplicate lines, sorting.",
        "Watch each pass report its change count while the result updates live.",
        "Copy the cleaned text, or adjust the toggles and compare again.",
      ],
      faqs: [
        {
          q: "What invisible characters get removed?",
          a: "Zero-width spaces, soft hyphens, byte-order marks, control characters and other unprintable Unicode. These are invisible in your editor but break searches, diffs and imports.",
        },
        {
          q: "Does cleaning change my quotation marks?",
          a: "Yes, optionally: curly quotes (“ ” ‘ ’), en/em dashes and the ellipsis character are normalized to their plain ASCII equivalents, which is what most search tools, CSVs and code expect.",
        },
        {
          q: "How does line deduplication decide what to keep?",
          a: "It keeps the first occurrence of every line and drops later duplicates, wherever they appear. Repeated empty lines collapse to one, so the paragraph structure survives.",
        },
        {
          q: "Is any of my text uploaded?",
          a: "No. All four passes run locally in your browser — your text never leaves your device.",
        },
      ],
    },
    zh: {
      name: "文本清洗器",
      h1: "文本清洗器——四个可开关的清理步骤,逐项计数",
      tagline:
        "四个可自由开关的清理步骤:不可见字符、多余空格、重复行、A→Z 排序,按固定顺序依次应用,每一步实时显示修改计数。",
      intro: [
        "复制来的文本常带着不可见控制字符、影响搜索的弯引号、成串的空格、重复的行和乱序。文本清洗器用四个可独立开关的步骤一次搞定,不再是“一键全做”或“什么都不做”。",
        "每一步都会精确报告改了多少处,管线按固定可预期的顺序执行:先清字符、再压空格、然后去重行、最后排序。所有处理都在你的浏览器里边输入边完成。",
      ],
      steps: [
        "把乱文本粘贴进输入框。",
        "按需开关四个步骤:清洗字符、多余空格、重复行、排序。",
        "观察每一步的修改计数,结果实时刷新。",
        "复制清洗后的文本,或调整开关再次对比。",
      ],
      faqs: [
        {
          q: "会移除哪些不可见字符?",
          a: "零宽空格、软连字符、字节顺序标记(BOM)、控制字符等不可打印的 Unicode。它们在编辑器里看不见,却会破坏搜索、diff 和数据导入。",
        },
        {
          q: "清洗会改动我的引号吗?",
          a: "会,而且是可选的:弯引号(“ ” ‘ ’)、短/长破折号和省略号字符会被归一成普通 ASCII 等价物——这正是大多数搜索工具、CSV 和代码所期待的。",
        },
        {
          q: "行去重保留哪一行?",
          a: "保留每一行的第一次出现,后面出现的重复行无论位置都会移除。重复的空行也会压缩成一个,段落结构得以保留。",
        },
        {
          q: "文本会被上传吗?",
          a: "不会。四个步骤全部在你的浏览器本地运行——文本从不离开你的设备。",
        },
      ],
    },
    ja: {
      name: "テキストクリーナー",
      h1: "テキストクリーナー — 切り替え可能な 4 パスでテキストを掃除",
      tagline:
        "4 つのオン/オフできるパスで乱れたテキストを整形:不可視文字、余分な空白、重複行、A→Z ソート。固定順序で順に適用し、各パスの変更数をリアルタイム表示。",
      intro: [
        "コピペしたテキストには、不可視の制御文字、検索を壊す曲線引用符、連続する空白、重複行、バラバラの順序が混ざりがちです。テキストクリーナーは 4 つのパスを個別にオン/オフして解決します。「全部一括」型のボタンではありません。",
        "各パスは正確に変更件数を報告し、パイプラインは固定の予測可能な順序で実行されます:文字のクリーニング → 空白の圧縮 → 行の重複削除 → ソート。すべてブラウザ内で入力しながら処理されます。",
      ],
      steps: [
        "乱れたテキストを入力欄に貼り付けます。",
        "必要なパスを切り替えます:文字クリーニング、余分な空白、重複行、ソート。",
        "各パスの変更数を見ながら、結果がリアルタイムに更新されます。",
        "整形後のテキストをコピーするか、切り替えを調整して再度比較します。",
      ],
      faqs: [
        {
          q: "どの不可視文字が削除されますか?",
          a: "ゼロ幅スペース、ソフトハイフン、BOM、制御文字など印刷不可の Unicode です。エディタでは見えませんが、検索・diff・インポートを壊します。",
        },
        {
          q: "クリーニングで引用符は変わりますか?",
          a: "変わります(任意):曲線引用符(“ ” ‘ ’)、en/em ダッシュ、省略記号は平文の ASCII 相当に正規化されます。ほとんどの検索ツール・CSV・コードが期待する形です。",
        },
        {
          q: "行の重複削除はどれを残しますか?",
          a: "各行の最初の出現を残し、後から現れた重複を位置にかかわらず削除します。空行の重複も 1 つにまとまるので、段落構造は保たれます。",
        },
        {
          q: "テキストはアップロードされますか?",
          a: "いいえ。4 つのパスはすべてブラウザ内でローカルに実行されます——テキストが端末の外に出ることはありません。",
        },
      ],
    },
    es: {
      name: "Limpiador de texto",
      h1: "Limpiador de texto — cuatro pasadas activables, con recuento de cambios",
      tagline:
        "Limpia texto sucio con cuatro pasadas activables — caracteres invisibles, espacios de más, líneas duplicadas y orden A→Z — aplicadas en secuencia y con recuento de cambios en vivo.",
      intro: [
        "El texto copiado llega con caracteres de control invisibles, comillas tipográficas que rompen búsquedas, ráfagas de espacios, líneas duplicadas y orden aleatorio. El Limpiador de texto lo arregla con cuatro pasadas que activas o desactivas: nada de un botón de todo-o-nada.",
        "Cada pasada informa exactamente de cuántos cambios hizo, y el pipeline se aplica en un orden fijo y predecible: limpiar caracteres, colapsar espacios, deduplicar líneas y ordenar. Todo ocurre en tu navegador mientras escribes.",
      ],
      steps: [
        "Pega el texto sucio en el cuadro de entrada.",
        "Activa las pasadas que quieras: caracteres, espacios, líneas duplicadas, orden.",
        "Mira cómo cada pasada informa su recuento mientras el resultado se actualiza.",
        "Copia el texto limpio o ajusta las opciones y compara de nuevo.",
      ],
      faqs: [
        {
          q: "¿Qué caracteres invisibles se eliminan?",
          a: "Espacios de ancho cero, guiones blandos, marcas BOM, caracteres de control y demás Unicode no imprimibles. Son invisibles en el editor pero rompen búsquedas, diffs e importaciones.",
        },
        {
          q: "¿La limpieza cambia mis comillas?",
          a: "Sí, opcionalmente: las comillas tipográficas (“ ” ‘ ’), los guiones en/em y el carácter de puntos suspensivos se normalizan a sus equivalentes ASCII, que es lo que esperan buscadores, CSV y código.",
        },
        {
          q: "¿Qué línea conserva la deduplicación?",
          a: "Conserva la primera aparición de cada línea y elimina los duplicados posteriores, aparezcan donde aparezcan. Las líneas vacías repetidas se colapsan en una, así que la estructura de párrafos sobrevive.",
        },
        {
          q: "¿Se sube mi texto?",
          a: "No. Las cuatro pasadas se ejecutan localmente en tu navegador: tu texto nunca sale de tu dispositivo.",
        },
      ],
    },
    pt: {
      name: "Limpador de texto",
      h1: "Limpador de texto — quatro passadas alternáveis, com contagem de mudanças",
      tagline:
        "Limpe texto bagunçado com quatro passadas alternáveis — caracteres invisíveis, espaços extras, linhas duplicadas e ordem A→Z — aplicadas em sequência e com contagem de mudanças ao vivo.",
      intro: [
        "Texto copiado chega com caracteres de controle invisíveis, aspas tipográficas que quebram buscas, rajadas de espaços, linhas duplicadas e ordem aleatória. O Limpador de texto resolve isso com quatro passadas que você liga ou desliga — nada de botão tudo-ou-nada.",
        "Cada passada informa exatamente quantas mudanças fez, e o pipeline segue uma ordem fixa e previsível: limpar caracteres, colapsar espaços, eliminar duplicatas e ordenar. Tudo acontece no seu navegador enquanto você digita.",
      ],
      steps: [
        "Cole o texto bagunçado na caixa de entrada.",
        "Ative as passadas que quiser: caracteres, espaços, linhas duplicadas, ordenação.",
        "Acompanhe a contagem de cada passada enquanto o resultado se atualiza.",
        "Copie o texto limpo ou ajuste as opções e compare de novo.",
      ],
      faqs: [
        {
          q: "Quais caracteres invisíveis são removidos?",
          a: "Espaços de largura zero, hífens moles, marcas BOM, caracteres de controle e outros Unicode não imprimíveis. São invisíveis no editor, mas quebram buscas, diffs e importações.",
        },
        {
          q: "A limpeza altera minhas aspas?",
          a: "Sim, opcionalmente: aspas tipográficas (“ ” ‘ ’), travessões e o caractere de reticências viram equivalentes ASCII simples, que é o que buscas, CSVs e código esperam.",
        },
        {
          q: "Qual linha a deduplicação mantém?",
          a: "Ela mantém a primeira ocorrência de cada linha e remove as duplicatas seguintes, onde quer que apareçam. Linhas vazias repetidas colapsam em uma, então a estrutura dos parágrafos sobrevive.",
        },
        {
          q: "Meu texto é enviado?",
          a: "Não. As quatro passadas rodam localmente no seu navegador — seu texto nunca sai do seu dispositivo.",
        },
      ],
    },
  },
});
