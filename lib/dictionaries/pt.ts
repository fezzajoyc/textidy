import type { Dictionary } from "../i18n";

const pt: Dictionary = {
  brand: "Textidy",
  tagline: "Todas as ferramentas rodam no seu navegador.",
  metaDesc:
    "Textidy é a oficina de texto para quem trabalha com palavras: 6 ferramentas de estilos de caixa, limpeza, slugs, texto de preenchimento, entidades HTML e cirurgia de texto. Tudo no navegador, sem envios.",

  nav: {
    tools: "Todas as ferramentas",
    categories: "Categorias",
    about: "Sobre",
    menu: "Menu",
    language: "Idioma",
  },

  home: {
    heroTitle: "Cirurgia de texto para quem trabalha com palavras",
    heroSub:
      "Seis ferramentas especializadas: estilos de caixa, limpeza, slugs, texto de preenchimento, entidades HTML e cirurgia de texto em várias etapas. Tudo roda no seu navegador — rápido, grátis, sem cadastro, nada enviado.",
    browseAll: "Ver todas as ferramentas",
    categoriesTitle: "Categorias",
    featuredTitle: "Ferramentas populares",
    trustLocal: "Seus arquivos ficam no seu dispositivo",
    trustFree: "Grátis, sem conta",
    trustFast: "Instantâneo, funciona offline",
    rotating: [
      "Oito estilos de caixa numa única tabela — compare e copie o certo",
      "Remove caracteres invisíveis, aspas tipográficas e linhas duplicadas numa passada",
      "Transforma qualquer título em um slug limpo e sem acentos",
      "Texto de preenchimento por parágrafos, frases ou contagem exata de palavras",
    ],
    statsLabels: { tools: "ferramentas", languages: "idiomas", uploads: "envios", accounts: "contas" },
    eyebrow: "Grátis sempre",
    heroCtaSecondary: "Como funciona",
    statsTools: "{n} ferramentas",
    statsLanguages: "{n} idiomas",
    statsUploads: "0 envios",
    statsAccounts: "0 contas",
    categoriesSub: "Um ofício, seis ferramentas — cada uma mirando um fluxo diário de trabalho com texto.",
    popularSub: "As ferramentas mais usadas.",
    privacyTitle: "Seus arquivos nunca saem do seu dispositivo.",
    privacySub: "Não existe a etapa de envio: as ferramentas são JavaScript rodando no seu navegador. Não é promessa de política, é como elas são feitas.",
    privacyPoint1T: "Processamento local",
    privacyPoint1D: "Os arquivos são lidos pela File API do navegador e processados na memória. Nada é transmitido.",
    privacyPoint2T: "Sem contas",
    privacyPoint2D: "Sem cadastro, sem e-mail, sem histórico. Abra e use.",
    privacyPoint3T: "Honestos por design",
    privacyPoint3D: "Se algo não dá para fazer no navegador, dizemos em vez de fingir.",
    privacyLink: "Ler a nota de privacidade",
    endTitle: "Escolha uma ferramenta. Ela funciona.",
    endSub: "Seis ferramentas, quinze idiomas, zero envios, nada para instalar.",
  },

  tools: {
    title: "Todas as ferramentas",
    subtitle: "Pesquise entre {count} ferramentas gratuitas. Sem uploads, sem cadastro.",
    filterPlaceholder: "Pesquisar ferramentas…",
    count: "{count} ferramentas",
    empty: "Nenhuma ferramenta corresponde a “{query}”.",
  },

  categories: {
    pdf: { name: "PDF", desc: "Junte, divida, converta e edite PDFs sem enviar nada para servidores." },
    image: { name: "Imagem", desc: "Comprima, redimensione, recorte e converta imagens no navegador." },
    text: { name: "Texto", desc: "Estilos de caixa, limpeza, slugs, texto de preenchimento, entidades e cirurgia de texto — cada ferramenta com saída ao vivo." },
    developer: { name: "Desenvolvedor", desc: "Formatadores, codificadores, decodificadores e geradores para o dia a dia." },
    seo: { name: "SEO", desc: "Meta tags, dados estruturados, prévia de SERP e outros auxiliares de SEO." },
    security: { name: "Segurança", desc: "Senhas, hashes e consultas — gerados e verificados no seu dispositivo." },
    utility: { name: "Utilidades", desc: "Conversores de unidades, calculadoras e ajudas do cotidiano." },
  },

  tool: {
    howTo: "Como usar",
    faq: "Perguntas frequentes",
    related: "Ferramentas relacionadas",
    privacyNote:
      "Esta ferramenta roda inteiramente no seu navegador. Seus dados nunca saem do seu dispositivo e não são enviados a nenhum servidor.",
    inCategory: "Mais em {category}",
    backToCategory: "Todas as ferramentas de {category}",
  },

  common: {
    openTool: "Abrir ferramenta",
    copy: "Copiar",
    copied: "Copiado",
    download: "Baixar",
    reset: "Redefinir",
    swap: "Inverter",
    clear: "Limpar",
    error: "Algo deu errado. Verifique os dados e tente novamente.",
    input: "Entrada",
    output: "Resultado",
    settings: "Opções",
    dropFiles: "Arraste arquivos aqui ou clique para escolher",
    dropFile: "Arraste um arquivo aqui ou clique para escolher",
    processing: "Processando…",
    fileSize: "Tamanho",
    sample: "Testar um exemplo",
    uppercase: "MAIÚSCULAS",
  },

  unit: {
    from: "De",
    to: "Para",
    amount: "Quantidade",
    result: "Resultado",
    common: "Conversões comuns",
    formula: "Fórmula",
    allUnits: "Todas as unidades",
  },

  text: {
    stats: {
      words: "Palavras",
      characters: "Caracteres",
      charsNoSpaces: "Sem espaços",
      sentences: "Frases",
      paragraphs: "Parágrafos",
      lines: "Linhas",
      readingTime: "Tempo de leitura",
      readingMinutes: "{n} min de leitura",
    },
  },

  footer: {
    line: "Ferramentas de texto que rodam no seu navegador. Suas palavras nunca saem do seu dispositivo.",
    privacy: "Privacidade",
    terms: "Termos",
    about: "Sobre",
    badges: "Selos",
    language: "Idioma",
  },

  badge: {
    title: "Selos do Textidy",
    desc: "Coloque um selo do Textidy no seu site, README ou documentação. Ele linka para cá e conta que as ferramentas de texto rodam inteiramente no navegador.",
    voluntary: "Incorporar é totalmente voluntário — escolha um selo se gostar do projeto. Não precisa de permissão.",
    md: "Markdown (README)",
    html: "HTML (site)",
    thanks: "Obrigado por divulgar — cada incorporação ajuda mais pessoas a descobrir ferramentas que respeitam seus arquivos.",
  },

    embed: {
    title: "Incorporar esta ferramenta",
    desc: "Coloque esta ferramenta no seu site com uma linha — ela roda no navegador do visitante.",
  },

    mcp: {
    title: "Servidor MCP — ferramentas acessíveis para IA",
    desc1: "O Textidy inclui um servidor MCP (Model Context Protocol): assistentes de IA como Claude ou Cursor podem executar as mesmas transformações de texto deste site — mesma lógica testada, sem reimplementação.",
    desc2: "As ferramentas rodam as funções puras do site (conversão de unidades, finanças, estimativas de saúde e processamento de texto). Executam via npx na máquina do cliente de IA; nada é enviado aos nossos servidores.",
    toolsTitle: "Ferramentas executáveis ({n})",
    requiresNode: "Requer Node.js 18+. O servidor roda localmente via stdio; apenas as chamadas que você fizer são calculadas na sua máquina.",
    privacy: "Requer Node.js 18+. O servidor roda localmente via stdio; apenas as chamadas que você fizer são calculadas na sua máquina.",
  },

    notFound: {
    title: "Página não encontrada",
    body: "A ferramenta que você procura não existe. Explore todas as ferramentas.",
    home: "Ir para a página inicial",
  },
};

export default pt;
