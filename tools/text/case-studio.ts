import { CaseStudio } from "../_engines/case-studio";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "case-studio",
  category: "text",
  icon: "text",
  featured: true,
  engine: { component: CaseStudio, props: {} },
  related: ["word-surgeon", "text-cleaner", "slug-forge"],
  copy: {
    en: {
      name: "Case Studio",
      h1: "Case Studio — see every case style side by side",
      tagline:
        "Type once and compare 8 case styles side by side: Title, Sentence, camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE and alternating — copy each with one click.",
      intro: [
        "A case converter shows you one result at a time. Case Studio shows all eight at once, in a comparison table that updates as you type — so you can pick the right style instead of guessing and re-converting.",
        "Editorial styles (Title Case, sentence case) sit next to code styles (camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE), plus alternating for playful text. Every row has its own copy button.",
      ],
      steps: [
        "Paste or type your text into the input box.",
        "All 8 case styles update instantly in the comparison table.",
        "Click Copy on the row you need — each style copies independently.",
      ],
      faqs: [
        {
          q: "What is the difference between camelCase and PascalCase?",
          a: "camelCase starts lowercase (myVariableName), PascalCase starts uppercase (MyVariableName). Both strip spaces and underscores before joining the words.",
        },
        {
          q: "Does Title Case keep small words lowercase?",
          a: "Yes. Articles and short prepositions (a, the, of, in…) stay lowercase unless they are the first or last word, following common editorial style.",
        },
        {
          q: "Why do I see all styles at once instead of buttons?",
          a: "Writers and developers usually compare two or three styles before choosing. Showing the full table removes the click-and-revert loop — you see the right answer immediately.",
        },
        {
          q: "Is my text uploaded anywhere?",
          a: "No. Everything runs locally in your browser with JavaScript — nothing is sent to any server.",
        },
      ],
    },
    zh: {
      name: "大小写工作室",
      h1: "大小写工作室——8 种大小写风格并排对比",
      tagline:
        "输入一次,8 种大小写风格并排实时对比:标题式、句首大写、camelCase、PascalCase、snake_case、kebab-case、CONSTANT_CASE 和大小写交替,每行一键复制。",
      intro: [
        "普通大小写转换器一次只显示一个结果。大小写工作室把 8 种风格放进同一张对比表,边输入边刷新——先比较再选择,不用来回切换重转。",
        "编辑风格(标题式、句首大写)与代码风格(camelCase、PascalCase、snake_case、kebab-case、CONSTANT_CASE)并排放,外加好玩的大小写交替,每一行都有独立的复制按钮。",
      ],
      steps: [
        "把文本粘贴或输入到输入框。",
        "8 种大小写风格在对比表中即时刷新。",
        "点击需要的那一行复制——每种风格独立复制。",
      ],
      faqs: [
        {
          q: "camelCase 和 PascalCase 有什么区别?",
          a: "camelCase 首字母小写(myVariableName),PascalCase 首字母大写(MyVariableName)。两者都会先去掉空格和下划线再拼接单词。",
        },
        {
          q: "标题式会保留小词的小写吗?",
          a: "会。冠词和短介词(a、the、of、in 等)保持小写,除非它们位于开头或结尾,符合通行编辑规范。",
        },
        {
          q: "为什么是一次看到全部风格,而不是按钮切换?",
          a: "写作者和开发者通常要对比两三种风格才能定。整表并排省掉了反复点击和切回的流程,一眼就能选对。",
        },
        {
          q: "文本会被上传吗?",
          a: "不会。所有转换都在你的浏览器里用 JavaScript 本地完成,不会发送到任何服务器。",
        },
      ],
    },
    ja: {
      name: "ケーススタジオ",
      h1: "ケーススタジオ — 8 種類のケースを並べて比較",
      tagline:
        "1 回入力すれば 8 種類のケーススタイルを並べて比較:タイトルケース、センテンスケース、camelCase、PascalCase、snake_case、kebab-case、CONSTANT_CASE、交互ケース。各行ワンクリックでコピー。",
      intro: [
        "通常のケース変換ツールは 1 回に 1 つの結果しか見せません。ケーススタジオは 8 種類すべてを 1 つの比較表に並べ、入力と同時に更新します。迷って変換し直す必要はありません。",
        "編集スタイル(タイトルケース、センテンスケース)とコードスタイル(camelCase、PascalCase、snake_case、kebab-case、CONSTANT_CASE)を並べ、さらに遊び心のある交互ケースも。各行に専用のコピーボタンが付いています。",
      ],
      steps: [
        "テキストを入力欄に入力または貼り付けます。",
        "8 種類のケーススタイルが比較表で即座に更新されます。",
        "必要な行のコピーをクリック——スタイルごとに独立してコピーできます。",
      ],
      faqs: [
        {
          q: "camelCase と PascalCase の違いは?",
          a: "camelCase は先頭が小文字(myVariableName)、PascalCase は先頭が大文字(MyVariableName)。どちらも空白とアンダースコアを取り除いてから単語を連結します。",
        },
        {
          q: "タイトルケースで短い語は小文字のまま?",
          a: "はい。冠詞や短い前置詞(a、the、of、in など)は先頭・末尾以外では小文字のままです。一般的な編集スタイルに従っています。",
        },
        {
          q: "ボタン式ではなく全スタイル同時表示なのはなぜ?",
          a: "書き手や開発者は通常、2〜3 のスタイルを比べてから選びます。表を一度に見せればクリックとやり直しの往復がなくなり、正解がひと目で分かります。",
        },
        {
          q: "テキストはアップロードされますか?",
          a: "いいえ。すべてブラウザ内の JavaScript でローカルに処理され、サーバーには何も送信されません。",
        },
      ],
    },
    es: {
      name: "Estudio de mayúsculas",
      h1: "Estudio de mayúsculas — compara los 8 estilos a la vez",
      tagline:
        "Escribe una vez y compara 8 estilos en paralelo: Tipo Título, tipo oración, camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE y alternante, con copia de un clic en cada fila.",
      intro: [
        "Un convertidor de mayúsculas te muestra un resultado cada vez. El Estudio de mayúsculas muestra los ocho juntos, en una tabla comparativa que se actualiza mientras escribes: eliges el estilo correcto sin conversiones de prueba y error.",
        "Los estilos editoriales (Tipo Título, tipo oración) conviven con los de código (camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE), más el alternante para textos juguetones. Cada fila tiene su propio botón de copiar.",
      ],
      steps: [
        "Pega o escribe tu texto en el cuadro de entrada.",
        "Los 8 estilos se actualizan al instante en la tabla comparativa.",
        "Pulsa Copiar en la fila que necesites: cada estilo se copia por separado.",
      ],
      faqs: [
        {
          q: "¿Qué diferencia hay entre camelCase y PascalCase?",
          a: "camelCase empieza en minúscula (miVariableNombre) y PascalCase en mayúscula (MiVariableNombre). Ambos eliminan espacios y guiones bajos antes de unir las palabras.",
        },
        {
          q: "¿El Tipo Título mantiene minúsculas las palabras cortas?",
          a: "Sí. Artículos y preposiciones cortas (a, el, de, en…) van en minúscula salvo al principio o al final, según el estilo editorial habitual.",
        },
        {
          q: "¿Por qué veo todos los estilos a la vez en lugar de botones?",
          a: "Quien escribe o programa suele comparar dos o tres estilos antes de decidir. La tabla completa elimina el ciclo de pulsar y volver: ves la respuesta correcta de inmediato.",
        },
        {
          q: "¿Se sube mi texto a algún sitio?",
          a: "No. Todo se ejecuta localmente en tu navegador con JavaScript: no se envía nada a ningún servidor.",
        },
      ],
    },
    pt: {
      name: "Estúdio de maiúsculas",
      h1: "Estúdio de maiúsculas — compare os 8 estilos lado a lado",
      tagline:
        "Digite uma vez e compare 8 estilos lado a lado: Tipo Título, tipo sentença, camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE e alternado, com cópia de um clique em cada linha.",
      intro: [
        "Um conversor de maiúsculas mostra um resultado por vez. O Estúdio de maiúsculas mostra os oito juntos, numa tabela comparativa que atualiza enquanto você digita — você escolhe o estilo certo sem ficar convertendo no teste e erro.",
        "Os estilos editoriais (Tipo Título, tipo sentença) ficam ao lado dos de código (camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE), além do alternado para textos divertidos. Cada linha tem seu próprio botão de copiar.",
      ],
      steps: [
        "Cole ou digite seu texto na caixa de entrada.",
        "Os 8 estilos se atualizam na hora na tabela comparativa.",
        "Clique em Copiar na linha que precisar — cada estilo copia de forma independente.",
      ],
      faqs: [
        {
          q: "Qual é a diferença entre camelCase e PascalCase?",
          a: "camelCase começa com minúscula (minhaVariavel) e PascalCase com maiúscula (MinhaVariavel). Ambos removem espaços e sublinhados antes de juntar as palavras.",
        },
        {
          q: "O Tipo Título mantém palavras curtas em minúsculas?",
          a: "Sim. Artigos e preposições curtas (a, o, de, em…) ficam em minúsculas, exceto na primeira ou última posição, seguindo o estilo editorial comum.",
        },
        {
          q: "Por que vejo todos os estilos de uma vez em vez de botões?",
          a: "Quem escreve ou programa normalmente compara dois ou três estilos antes de decidir. A tabela completa elimina o ciclo de clicar e voltar — a resposta certa aparece de imediato.",
        },
        {
          q: "Meu texto é enviado para algum lugar?",
          a: "Não. Tudo roda localmente no seu navegador com JavaScript — nada é enviado a nenhum servidor.",
        },
      ],
    },
  },
});
