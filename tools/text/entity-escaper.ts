import { EntityEscaper } from "../_engines/entity-escaper";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "entity-escaper",
  category: "text",
  icon: "code",
  engine: { component: EntityEscaper, props: {} },
  related: ["slug-forge", "word-surgeon", "case-studio"],
  copy: {
    en: {
      name: "Entity Escaper",
      h1: "Entity Escaper — HTML escape and unescape, both directions",
      tagline:
        "Escape text to HTML entities (& < > \" ') and unescape back again, with an optional numeric-entities mode for non-ASCII and a 60-entry named-entity reference chart.",
      intro: [
        "Shipping code samples, angle brackets or ampersands inside HTML? Escape turns them into &lt;, &gt; and &amp; so browsers render them as text instead of parsing them as markup. Unescape goes the other way: paste entities and get readable text back.",
        "The numeric option also encodes non-ASCII characters (&#233; for é) for email templates and legacy systems. Below the editor, a named-entity chart lists every entity the unescaper recognizes — tap any of them to copy.",
      ],
      steps: [
        "Paste your text (or entity-encoded text) into the input box.",
        "Pick Escape or Unescape; toggle numeric entities for non-ASCII when escaping.",
        "Copy the result, or use Swap to reverse direction with the same text.",
        "Consult the named-entity chart below for quick reference.",
      ],
      faqs: [
        {
          q: "Which characters get escaped?",
          a: "The five markup-significant ones: & becomes &amp;, < becomes &lt;, > becomes &gt;, \" becomes &quot; and ' becomes &#39;. Everything else passes through untouched unless numeric mode is on.",
        },
        {
          q: "What are numeric entities?",
          a: "Decimal references like &#233; for é or &#x27; for the apostrophe. They cover every Unicode character without a memorable name, which makes them the safe choice for email templates and older CMSs.",
        },
        {
          q: "What happens to entities it does not know?",
          a: "Unescape recognizes the 60+ entities in the chart below plus all &#decimal; and &#xhex; forms. Unknown names are left untouched rather than dropped, so you can spot the problem instead of losing characters silently.",
        },
        {
          q: "Is the conversion reversible?",
          a: "Yes for standard input: escape then unescape returns your original text. Round-tripping first-unescape-then-escape can differ if your input contained entities that escape re-encodes differently (like &#39; vs &apos;).",
        },
      ],
    },
    zh: {
      name: "实体转义器",
      h1: "实体转义器——HTML 转义与反转义,双向可用",
      tagline:
        "把文本转义成 HTML 实体(& < > \" ')再反转义回来,可选数字实体模式处理非 ASCII,附 60 余条命名实体速查表。",
      intro: [
        "要在 HTML 里展示代码示例、尖括号或 & 符号?转义把它们变成 &lt;、&gt; 和 &amp;,浏览器就会按文本渲染,而不是当标记解析。反转义则相反:粘入实体,取回可读文本。",
        "数字实体选项还会把非 ASCII 字符编码成 &#233;(é),适合邮件模板和老旧系统。编辑器下方是命名实体速查表,列出反转义可识别的全部实体——点一下即可复制。",
      ],
      steps: [
        "把文本(或实体编码文本)粘贴进输入框。",
        "选择转义或反转义;转义时可开启非 ASCII 数字实体。",
        "复制结果,或用交换按钮把同一文本反向处理。",
        "需要速查时看下方的命名实体表。",
      ],
      faqs: [
        {
          q: "哪些字符会被转义?",
          a: "五个标记敏感字符:& 变 &amp;,< 变 &lt;,> 变 &gt;,\" 变 &quot;,' 变 &#39;。其余字符原样保留,除非开启数字实体模式。",
        },
        {
          q: "什么是数字实体?",
          a: "形如 &#233;(é)、&#x27;(单引号)的十进制/十六进制引用。它覆盖所有没有好记名字的 Unicode 字符,是邮件模板和老旧 CMS 的安全选择。",
        },
        {
          q: "不认识的实体会怎么处理?",
          a: "反转义可识别下方速查表中的 60 多个命名实体以及所有 &#十进制; 与 &#x十六进制; 形式。不认识的实体名原样保留而不是丢弃,让你能发现问题,而不是悄悄丢字符。",
        },
        {
          q: "转换是可逆的吗?",
          a: "对标准输入是的:先转义再反转义会回到原文。先反转义再转义可能不同——如果你的输入含有被转义后写法不同的实体(如 &#39; 与 &apos;)。",
        },
      ],
    },
    ja: {
      name: "実体エスケーパー",
      h1: "実体エスケーパー — HTML エスケープとアンエスケープの双方向",
      tagline:
        "テキストを HTML 実体(& < > \" ')へエスケープし、逆に戻す。非 ASCII 用の数値実体モードと 60 項目の名前付き実体リファレンス付き。",
      intro: [
        "HTML 内にコード例や山括弧、アンパサンドを載せたいとき、エスケープはそれらを &lt;・&gt;・&amp; に変え、ブラウザがマークアップではなくテキストとして表示するようにします。アンエスケープはその逆:実体を貼れば読めるテキストに戻ります。",
        "数値オプションは非 ASCII 文字も符号化し(é → &#233;)、メールテンプレートやレガシーシステムに対応。エディタの下には、アンエスケープが認識するすべての実体を並べたリファレンス表があり、クリックでコピーできます。",
      ],
      steps: [
        "テキスト(または実体化されたテキスト)を入力欄に貼り付けます。",
        "エスケープ/アンエスケープを選び、エスケープ時は数値実体を切り替え。",
        "結果をコピーするか、スワップで同じテキストを逆方向に処理。",
        "素早く確認したいときは下の実体リファレンス表を。",
      ],
      faqs: [
        {
          q: "どの文字がエスケープされますか?",
          a: "マークアップ上重要な 5 つです:& は &amp;、< は &lt;、> は &gt;、\" は &quot;、' は &#39;。数値モードを有効にしない限り、他の文字はそのまま通ります。",
        },
        {
          q: "数値実体とは?",
          a: "é を表す &#233; のような 10 進参照です。名前の付いていないすべての Unicode 文字を扱えるので、メールテンプレートや古い CMS での安全な選択肢になります。",
        },
        {
          q: "未知の実体はどうなりますか?",
          a: "アンエスケープは下の表にある 60 以上の実体と、&#10進;・&#x16進; のすべての形式を認識します。未知の名前は黙って捨てずそのまま残すので、文字を失う代わりに問題に気付けます。",
        },
        {
          q: "変換は可逆ですか?",
          a: "標準的な入力なら可逆です:エスケープしてからアンエスケープすれば元に戻ります。先にアンエスケープすると、入力に &#39; と &apos; のような再エンコードで書き方が変わる実体があった場合、結果が異なることがあります。",
        },
      ],
    },
    es: {
      name: "Escapador de entidades",
      h1: "Escapador de entidades — escape y desescape HTML en ambos sentidos",
      tagline:
        "Escapa texto a entidades HTML (& < > \" ') y desescápalo de vuelta, con modo opcional de entidades numéricas para no ASCII y una tabla de referencia con más de 60 entidades.",
      intro: [
        "¿Publicas ejemplos de código, ángulos o ampersands dentro de HTML? Escapar los convierte en &lt;, &gt; y &amp; para que el navegador los muestre como texto en lugar de interpretarlos como marcado. Desescapar hace lo contrario: pega entidades y recupera texto legible.",
        "La opción numérica también codifica los caracteres no ASCII (&#233; para é), útil para plantillas de correo y sistemas antiguos. Bajo el editor, una tabla de entidades con nombre lista todas las que reconoce el desescape: toca cualquiera para copiarla.",
      ],
      steps: [
        "Pega tu texto (o texto ya codificado) en el cuadro de entrada.",
        "Elige Escapar o Desescapar; al escapar, activa las entidades numéricas para no ASCII.",
        "Copia el resultado o usa Intercambiar para invertir el sentido con el mismo texto.",
        "Consulta la tabla de entidades de abajo como referencia rápida.",
      ],
      faqs: [
        {
          q: "¿Qué caracteres se escapan?",
          a: "Los cinco significativos para el marcado: & pasa a &amp;, < a &lt;, > a &gt;, \" a &quot; y ' a &#39;. Todo lo demás pasa intacto salvo que actives el modo numérico.",
        },
        {
          q: "¿Qué son las entidades numéricas?",
          a: "Referencias decimales como &#233; para é. Cubren cualquier carácter Unicode sin nombre memorable, lo que las hace la opción segura en plantillas de correo y CMS antiguos.",
        },
        {
          q: "¿Qué ocurre con las entidades desconocidas?",
          a: "El desescape reconoce las más de 60 entidades de la tabla de abajo más todas las formas &#decimal; y &#xhex;. Los nombres desconocidos se dejan intactos en lugar de eliminarse, así detectas el problema en vez de perder caracteres en silencio.",
        },
        {
          q: "¿La conversión es reversible?",
          a: "Sí para entrada estándar: escapar y luego desescapar devuelve el texto original. Desescapar primero puede diferir si tu entrada contenía entidades que el escape recodifica de otra forma (como &#39; frente a &apos;).",
        },
      ],
    },
    pt: {
      name: "Escapador de entidades",
      h1: "Escapador de entidades — escape e desescape HTML nos dois sentidos",
      tagline:
        "Escape texto para entidades HTML (& < > \" ') e desescape de volta, com modo opcional de entidades numéricas para não-ASCII e tabela de referência com mais de 60 entidades.",
      intro: [
        "Vai publicar exemplos de código, colchetes angulares ou e-commercials dentro de HTML? O escape os transforma em &lt;, &gt; e &amp; para que o navegador os renderize como texto em vez de interpretá-los como marcação. O desescape faz o contrário: cole entidades e recupere texto legível.",
        "A opção numérica também codifica caracteres não-ASCII (&#233; para é), útil para templates de e-mail e sistemas antigos. Abaixo do editor, uma tabela de entidades nomeadas lista tudo o que o desescape reconhece — toque em qualquer uma para copiar.",
      ],
      steps: [
        "Cole seu texto (ou texto já codificado) na caixa de entrada.",
        "Escolha Escapar ou Desescapar; ao escapar, ative entidades numéricas para não-ASCII.",
        "Copie o resultado ou use Trocar para inverter o sentido com o mesmo texto.",
        "Consulte a tabela de entidades abaixo como referência rápida.",
      ],
      faqs: [
        {
          q: "Quais caracteres são escapados?",
          a: "Os cinco significativos para marcação: & vira &amp;, < vira &lt;, > vira &gt;, \" vira &quot; e ' vira &#39;. Todo o resto passa intacto, a menos que o modo numérico esteja ativo.",
        },
        {
          q: "O que são entidades numéricas?",
          a: "Referências decimais como &#233; para é. Cobrem qualquer caractere Unicode sem nome memorável, o que as torna a escolha segura em templates de e-mail e CMSs antigos.",
        },
        {
          q: "O que acontece com entidades desconhecidas?",
          a: "O desescape reconhece as mais de 60 entidades da tabela abaixo mais todas as formas &#decimal; e &#xhex;. Nomes desconhecidos ficam intactos em vez de descartados, então você percebe o problema em vez de perder caracteres em silêncio.",
        },
        {
          q: "A conversão é reversível?",
          a: "Sim para entrada padrão: escapar e depois desescapar devolve o texto original. Desescapar primeiro pode diferir se a entrada continha entidades que o escape recodifica de outra forma (como &#39; versus &apos;).",
        },
      ],
    },
  },
});
