import type { Dictionary } from "../i18n";

// 한국어(ko) — 합니다체로 통일, 불필요한 외래어 표기 지양.
// 계약: 키 구조는 en과 완전히 동일(tests/seo.test.ts), 값은 한국어로 번역.
const ko: Dictionary = {
  brand: "Textidy",
  tagline: "모든 도구가 브라우저에서 실행됩니다.",
  metaDesc:
    "Textidy는 말로 일하는 사람들의 텍스트 작업실입니다. 대소문자, 정리, 슬러그, 더미 텍스트, HTML 엔티티, 텍스트 수술을 위한 6가지 도구. 모두 브라우저에서 실행되며 텍스트는 기기를 떠나지 않습니다.",

  nav: {
    tools: "전체 도구",
    categories: "카테고리",
    about: "소개",
    menu: "메뉴",
    language: "언어",
  },

  home: {
    heroTitle: "말로 일하는 사람들을 위한 텍스트 수술",
    heroSub:
      "여섯 가지 특화 도구: 대소문자 스타일, 정리, 슬러그, 더미 텍스트, HTML 엔티티, 다단계 텍스트 수술. 모든 처리가 브라우저에서 로컬로 실행됩니다 — 빠르고, 무료이며, 가입도 업로드도 없습니다.",
    browseAll: "전체 도구 보기",
    categoriesTitle: "카테고리",
    featuredTitle: "인기 도구",
    trustLocal: "파일은 기기에만 보관됩니다",
    trustFree: "무료, 계정 불필요",
    trustFast: "즉시 실행, 오프라인 작동",
    rotating: [
      "여덟 가지 대소문자를 한 표에서 비교하고 — 올바른 것을 바로 복사",
      "보이지 않는 문자, 타이포그래피 따옴표, 중복 줄을 한 번의 패스로 정리",
      "어떤 제목이든 깔끔하고 악센트 없는 URL 슬러그로 변환",
      "단락, 문장 또는 정확한 단어 수로 더미 텍스트 생성",
    ],
    statsLabels: { tools: "도구", languages: "개 언어", uploads: "업로드", accounts: "계정" },
    eyebrow: "평생 무료",
    heroCtaSecondary: "이용 방법",
    statsTools: "도구 {n}개",
    statsLanguages: "{n}개 언어",
    statsUploads: "업로드 0건",
    statsAccounts: "계정 0개",
    categoriesSub: "하나의 기술, 여섯 가지 도구 — 각 도구는 매일의 텍스트 작업 흐름을 겨냥합니다.",
    popularSub: "가장 많이 열어보는 도구입니다.",
    privacyTitle: "파일은 절대 기기를 떠나지 않습니다.",
    privacySub:
      "업로드 단계가 아예 없습니다. 도구는 브라우저에서 실행되는 JavaScript일 뿐입니다 — 정책상 약속이 아니라, 애초에 그렇게 만들어진 구조입니다.",
    privacyPoint1T: "로컬 처리",
    privacyPoint1D:
      "파일은 브라우저의 File API로 읽어 메모리 안에서 처리합니다. 어디로도 전송되지 않습니다.",
    privacyPoint2T: "계정 없음",
    privacyPoint2D: "가입도, 이메일도, 저장되는 기록도 없습니다. 도구를 열고 바로 쓰면 됩니다.",
    privacyPoint3T: "설계부터 정직하게",
    privacyPoint3D:
      "브라우저에서 정말 불가능한 일이라면 그렇다고 말합니다. 가능한 척하지 않습니다.",
    privacyLink: "전체 개인정보 노트 읽기",
    endTitle: "도구를 고르면, 바로 작동합니다.",
    endSub: "도구 여섯 개, 열다섯 개 언어, 업로드 0건, 설치할 것 없음.",
  },

  tools: {
    title: "전체 도구",
    subtitle: "브라우저에서 도는 무료 도구 {count}개. 업로드도, 가입도 없습니다.",
    filterPlaceholder: "도구 검색…",
    count: "도구 {count}개",
    empty: "“{query}”에 해당하는 도구가 없습니다.",
  },

  categories: {
    pdf: { name: "PDF", desc: "어디에도 업로드하지 않고 PDF를 합치고, 나누고, 변환하고, 편집합니다." },
    image: { name: "이미지", desc: "브라우저 안에서 이미지를 압축하고, 크기를 조정하고, 자르고, 변환합니다." },
    text: { name: "텍스트", desc: "대소문자, 정리, 슬러그, 더미 텍스트, 엔티티 이스케이프, 텍스트 수술 — 모든 도구가 입력과 동시에 결과를 보여 줍니다." },
    developer: { name: "개발", desc: "매일 쓰는 포매터, 인코더, 디코더, 생성기 모음." },
    seo: { name: "SEO", desc: "메타 태그, 스키마 마크업, SERP 미리보기 등 온페이지 SEO 도우미." },
    security: { name: "보안", desc: "비밀번호, 해시, 조회 도구 — 기기에서 생성하고 확인합니다." },
    utility: { name: "생활", desc: "단위 변환기, 계산기 등 생활 속 도우미." },
  },

  tool: {
    howTo: "사용 방법",
    faq: "자주 묻는 질문",
    related: "관련 도구",
    privacyNote:
      "이 도구는 전부 브라우저 안에서 실행됩니다. 데이터는 기기를 떠나지 않으며 어떤 서버로도 업로드되지 않습니다.",
    inCategory: "{category}의 다른 도구",
    backToCategory: "{category} 전체 도구",
  },

  common: {
    copy: "복사",
    copied: "복사됨",
    download: "다운로드",
    reset: "초기화",
    swap: "바꾸기",
    clear: "지우기",
    error: "문제가 발생했습니다. 입력값을 확인하고 다시 시도해 주세요.",
    input: "입력",
    output: "결과",
    settings: "옵션",
    dropFiles: "파일을 끌어다 놓거나 클릭해서 선택하세요",
    dropFile: "파일을 끌어다 놓거나 클릭해서 선택하세요",
    processing: "처리 중…",
    fileSize: "크기",
    sample: "예시로 써보기",
    uppercase: "대문자",
  },

  unit: {
    from: "변환 전",
    to: "변환 후",
    amount: "값",
    result: "결과",
    common: "자주 쓰는 변환",
    formula: "계산식",
    allUnits: "전체 단위",
  },

  text: {
    stats: {
      words: "단어",
      characters: "글자",
      charsNoSpaces: "공백 제외",
      sentences: "문장",
      paragraphs: "단락",
      lines: "줄",
      readingTime: "읽는 시간",
      readingMinutes: "약 {n}분",
    },
  },

  footer: {
    line: "브라우저에서 실행되는 텍스트 도구. 당신의 말은 기기를 떠나지 않습니다.",
    privacy: "개인정보",
    terms: "약관",
    about: "소개",
    badges: "배지",
    language: "언어",
  },

  badge: {
    title: "Textidy 배지",
    desc: "사이트, README, 문서에 Textidy 배지를 달아 보세요. 여기로 연결되며, 배지 뒤의 텍스트 도구들이 전부 브라우저 안에서 실행된다는 뜻이기도 합니다.",
    voluntary: "배지 삽입은 완전히 자율입니다 — 마음에 드는 배지를 골라 쓰세요. 허락받을 필요 없습니다.",
    md: "Markdown (README)",
    html: "HTML (웹사이트)",
    thanks: "널리 알려 주셔서 감사합니다 — 하나의 삽입이 도구를 더 많은 사람에게 알려 줍니다.",
  },

  embed: {
    title: "도구 삽입",
    desc: "한 줄로 사이트에 도구를 넣으세요. 방문자의 브라우저에서 실행됩니다.",
  },

    mcp: {
    title: "MCP 서버 — AI가 호출하는 도구",
    desc1: "Textidy는 MCP(Model Context Protocol) 서버를 제공합니다: Claude, Cursor 같은 AI 어시스턴트가 이 사이트의 텍스트 변환을 그대로 실행합니다 — 같은 테스트된 로직, 재구현 없이.",
    desc2: "도구는 사이트의 순수 함수(단위 변환, 금융, 건강 추정, 텍스트 처리)를 실행합니다. npx를 통해 AI 클라이언트 머신에서 동작하며, 우리 서버로 전송되지 않습니다.",
    toolsTitle: "실행 가능한 도구({n}개)",
    requiresNode: "Node.js 18+ 필요. 서버는 stdio로 로컬 실행되며, 호출한 도구 계산만 로컬에서 이루어집니다.",
    privacy: "Node.js 18+ 필요. 서버는 stdio로 로컬 실행되며, 호출한 도구 계산만 로컬에서 이루어집니다.",
  },

    notFound: {
    title: "페이지를 찾을 수 없습니다",
    body: "찾으시는 도구가 존재하지 않습니다. 전체 도구를 둘러보세요.",
    home: "홈으로 가기",
  },
};

export default ko;
