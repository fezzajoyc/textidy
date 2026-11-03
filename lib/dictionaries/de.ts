// de:Deutsche Übersetzung — Werte natürlich übersetzt, Schlüsselform identisch mit en.
// Vertrag: Schlüsselform muss mit en exakt übereinstimmen (tests/seo.test.ts tiefvergleichend), Werte müssen de sein.
const de = {
  brand: "Textidy",
  tagline: "Jedes Tool läuft in Ihrem Browser.",
  metaDesc:
    "Textidy ist die Textwerkstatt für alle, die mit Worten arbeiten: 6 spezialisierte Tools für Schreibweisen, Bereinigung, Slugs, Platzhaltertext, HTML-Entities und Textchirurgie. Alles in Ihrem Browser — Ihr Text verlässt Ihr Gerät nie.",

  nav: {
    tools: "Alle Tools",
    categories: "Kategorien",
    about: "Über uns",
    menu: "Menü",
    language: "Sprache",
  },

  home: {
    heroTitle: "Textchirurgie für Menschen, die mit Worten arbeiten",
    heroSub:
      "Sechs spezialisierte Tools: Schreibweisen, Bereinigung, Slugs, Platzhaltertext, HTML-Entities und mehrstufige Textchirurgie. Alles läuft lokal in Ihrem Browser — schnell, kostenlos, ohne Anmeldung, ohne Uploads.",
    browseAll: "Alle Tools ansehen",
    pinned: "Angepinnt",
    pin: "Oben anpinnen",
    unpin: "Nicht mehr anpinnen",
    popular: "Gerade beliebt",
    categoriesTitle: "Kategorien",
    featuredTitle: "Beliebte Tools",
    trustLocal: "Dateien bleiben auf Ihrem Gerät",
    trustFree: "Kostenlos, ohne Konto",
    trustFast: "Sofort, funktioniert offline",
    rotating: [
      "Acht Schreibweisen in einer Tabelle — vergleichen und die richtige kopieren",
      "Unsichtbare Zeichen, typografische Anführungszeichen und Dubletten in einem Durchgang entfernen",
      "Jede Überschrift in einen sauberen, akzentfreien URL-Slug verwandeln",
      "Platzhaltertext nach Absätzen, Sätzen oder exakter Wortanzahl",
    ],
    statsLabels: { tools: "Tools", languages: "Sprachen", uploads: "Uploads", accounts: "Konten" },
    eyebrow: "Für immer kostenlos",
    heroCtaSecondary: "So funktioniert es",
    statsTools: "{n} Tools",
    statsLanguages: "{n} Sprachen",
    statsUploads: "0 Uploads",
    statsAccounts: "0 Konten",
    categoriesSub: "Ein Handwerk, sechs Tools — jedes zielt auf einen täglichen Text-Workflow.",
    popularSub: "Die Tools, die am häufigsten geöffnet werden.",
    privacyTitle: "Ihre Dateien verlassen Ihr Gerät nie.",
    privacySub:
      "Es gibt keinen Upload-Schritt. Die Tools sind JavaScript, das in Ihrem Browser läuft — das ist kein Versprechen in einer Datenschutzerklärung, sondern die Art, wie sie gebaut sind.",
    privacyPoint1T: "Lokale Verarbeitung",
    privacyPoint1D:
      "Dateien werden mit der eigenen File-API des Browsers gelesen und im Arbeitsspeicher verarbeitet. Nichts wird übertragen — nirgendwohin.",
    privacyPoint2T: "Keine Konten",
    privacyPoint2D: "Keine Anmeldung, keine E-Mail, kein gespeicherter Verlauf. Tool öffnen und loslegen.",
    privacyPoint3T: "Ehrlich von Grund auf",
    privacyPoint3D:
      "Wenn etwas im Browser wirklich nicht geht, sagen wir das — statt es so zu tun, als würde es funktionieren.",
    privacyLink: "Die vollständigen Datenschutzhinweise lesen",
    endTitle: "Wählen Sie ein Tool. Es funktioniert einfach.",
    endSub: "Sechs Tools, fünfzehn Sprachen, null Uploads, nichts zu installieren.",
  },

  tools: {
    title: "Alle Tools",
    subtitle: "Durchsuchen Sie {count} kostenlose Browser-Tools. Kein Upload, keine Anmeldung.",
    filterPlaceholder: "Tools suchen…",
    count: "{count} Tools",
    empty: "Keine Tools passen zu „{query}“.",
  },

  categories: {
    pdf: { name: "PDF", desc: "PDF-Dateien zusammenfügen, teilen, konvertieren und bearbeiten — ohne sie irgendwo hochzuladen." },
    image: { name: "Bilder", desc: "Bilder direkt im Browser komprimieren, skalieren, zuschneiden und konvertieren." },
    text: { name: "Text", desc: "Schreibweisen, Bereinigung, Slugs, Platzhaltertext, Entities und Textchirurgie — jedes Tool liefert live Ergebnisse." },
    developer: { name: "Entwickler", desc: "Formatierer, Encoder, Decoder und Generatoren für die tägliche Entwicklerarbeit." },
    seo: { name: "SEO", desc: "Meta-Tags, Schema-Markup, SERP-Vorschau und weitere On-Page-SEO-Helfer." },
    security: { name: "Sicherheit", desc: "Passwörter, Hashes und Lookups — auf Ihrem Gerät erzeugt und geprüft." },
    utility: { name: "Werkzeuge", desc: "Einheitenrechner, Taschenrechner und Alltags-Helfer." },
  },

  tool: {
    howTo: "So verwenden Sie es",
    faq: "Häufige Fragen",
    related: "Verwandte Tools",
    nextStep: "Nächste Schritte",
    copyLink: "Link kopieren",
    privacyNote:
      "Dieses Tool läuft vollständig in Ihrem Browser. Ihre Daten verlassen Ihr Gerät nie — sie werden auf keinen Server hochgeladen.",
    inCategory: "Mehr in {category}",
    backToCategory: "Alle {category}-Tools",
  },

  common: {
    openTool: "Werkzeug öffnen",
    copy: "Kopieren",
    copied: "Kopiert",
    download: "Herunterladen",
    reset: "Zurücksetzen",
    swap: "Tauschen",
    clear: "Leeren",
    error: "Etwas ist schiefgelaufen. Prüfen Sie Ihre Eingabe und versuchen Sie es erneut.",
    input: "Eingabe",
    output: "Ergebnis",
    settings: "Optionen",
    dropFiles: "Dateien hierher ziehen oder klicken zum Auswählen",
    dropFile: "Datei hierher ziehen oder klicken zum Auswählen",
    processing: "Verarbeitung…",
    fileSize: "Größe",
    sample: "Beispiel ausprobieren",
    uppercase: "GROSSBUCHSTABEN",
  },

  unit: {
    from: "Von",
    to: "Nach",
    amount: "Menge",
    result: "Ergebnis",
    common: "Häufige Umrechnungen",
    formula: "Formel",
    allUnits: "Alle Einheiten",
  },

  text: {
    stats: {
      words: "Wörter",
      characters: "Zeichen",
      charsNoSpaces: "Ohne Leerzeichen",
      sentences: "Sätze",
      paragraphs: "Absätze",
      lines: "Zeilen",
      readingTime: "Lesezeit",
      readingMinutes: "{n} Min. Lesezeit",
    },
  },

  footer: {
    line: "Text-Tools, die in Ihrem Browser laufen. Ihre Worte verlassen Ihr Gerät nie.",
    privacy: "Datenschutz",
    terms: "Nutzungsbedingungen",
    about: "Über uns",
    badges: "Badges",
    language: "Sprache",
  },

  badge: {
    title: "Textidy-Badges",
    desc: "Setzen Sie ein Textidy-Badge auf Ihre Website, Ihr README oder Ihre Doku. Es verlinkt hierher und zeigt, dass die Text-Tools dahinter vollständig im Browser laufen.",
    voluntary: "Das Einbetten ist völlig freiwillig — nehmen Sie ein Badge, wenn Ihnen das Projekt gefällt. Keine Erlaubnis nötig.",
    md: "Markdown (README)",
    html: "HTML (Website)",
    thanks: "Danke für die Weiterempfehlung — jede Einbettung hilft mehr Menschen, Tools zu entdecken, die ihre Dateien respektieren.",
  },

    embed: {
    title: "Dieses Tool einbetten",
    desc: "Binden Sie dieses Tool mit einer Zeile in Ihre Website ein — es läuft im Browser des Besuchers.",
  },

    mcp: {
    title: "MCP-Server — KI-zugängliche Tools",
    desc1: "Textidy liefert einen MCP-Server (Model Context Protocol): KI-Assistenten wie Claude oder Cursor führen dieselben Texttransformationen aus wie auf dieser Website — dieselbe getestete Logik, keine Neuimplementierung.",
    desc2: "Die Tools nutzen die Pure Functions der Website (Einheitenumrechnung, Finanzen, Gesundheitsschätzungen, Textverarbeitung). Sie laufen über npx auf dem Rechner des KI-Clients — nichts wird an unsere Server gesendet.",
    toolsTitle: "Ausführbare Tools ({n})",
    requiresNode: "Benötigt Node.js 18+. Der Server läuft lokal über stdio; nur die von Ihnen aufgerufenen Tools werden auf Ihrer Maschine berechnet.",
    privacy: "Benötigt Node.js 18+. Der Server läuft lokal über stdio; nur die von Ihnen aufgerufenen Tools werden auf Ihrer Maschine berechnet.",
  },

    notFound: {
    title: "Seite nicht gefunden",
    body: "Das gesuchte Tool existiert nicht. Sehen Sie sich stattdessen alle Tools an.",
    home: "Zur Startseite",
  },
};

export default de;
