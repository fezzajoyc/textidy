import { describe, expect, it } from "vitest";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { createServer } from "@/mcp/server";

async function connect() {
  const server = createServer();
  const client = new Client({ name: "test", version: "0.0.0" });
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  await Promise.all([server.connect(serverTransport), client.connect(clientTransport)]);
  return client;
}

describe("textidy MCP server", () => {
  it("exposes exactly the 6 text tools", async () => {
    const client = await connect();
    const { tools } = await client.listTools();
    expect(tools.map((t) => t.name).sort()).toEqual([
      "case_styles", "clean_text", "generate_lorem", "html_entities", "slugify", "text_surgeon",
    ]);
    for (const tool of tools) {
      expect(tool.description?.length ?? 0).toBeGreaterThan(20);
    }
    await client.close();
  });

  it("case_styles returns all 8 styles from one input", async () => {
    const client = await connect();
    const r = await client.callTool({ name: "case_styles", arguments: { text: "the wrong case FIX" } });
    const parsed = JSON.parse((r.content as any)[0].text);
    expect(parsed).toEqual({
      title_case: "The Wrong Case Fix",
      sentence_case: "The wrong case fix",
      camelCase: "theWrongCaseFix",
      PascalCase: "TheWrongCaseFix",
      snake_case: "the_wrong_case_fix",
      "kebab-case": "the-wrong-case-fix",
      CONSTANT_CASE: "THE_WRONG_CASE_FIX",
      aLtErNaTiNg: "tHe WrOnG cAsE fIx",
    });
    await client.close();
  });

  it("clean_text applies passes in sequence with exact change counts", async () => {
    const client = await connect();
    // spaces → dedupe → sort, 依次生效:折叠 1 段空格、去 1 行重复、排序移动 2 行
    const r = await client.callTool({
      name: "clean_text",
      arguments: { text: "b  a\nb\na\nb", clean: false, spaces: true, dedupe: true, sort: true },
    });
    const parsed = JSON.parse((r.content as any)[0].text);
    expect(parsed.text).toBe("a\nb\nb a");
    expect(parsed.changes).toEqual({ clean: 0, spaces: 1, dedupe: 1, sort: 2 });
    await client.close();
  });

  it("clean_text removes invisible characters and normalizes curly quotes", async () => {
    const client = await connect();
    const r = await client.callTool({
      name: "clean_text",
      arguments: { text: "a\u200bb “quoted”" },
    });
    const parsed = JSON.parse((r.content as any)[0].text);
    expect(parsed.text).toBe('ab "quoted"');
    // 零宽空格 1 个 + 弯引号 2 个
    expect(parsed.changes.clean).toBe(3);
    await client.close();
  });

  it("slugify strips accents, stop words and honors separator/uppercase", async () => {
    const client = await connect();
    const s = async (args: Record<string, unknown>) => {
      const r = await client.callTool({ name: "slugify", arguments: args });
      return (r.content as any)[0].text as string;
    };
    expect(await s({ text: "Café Mémoirs — 2026!" })).toBe("cafe-memoirs-2026");
    expect(await s({ text: "The Best of Café Guides!", remove_stopwords: true })).toBe("best-cafe-guides");
    expect(await s({ text: "Hello World", separator: "_" })).toBe("hello_world");
    expect(await s({ text: "Hello World", separator: "_", uppercase: true })).toBe("HELLO_WORLD");
    expect(await s({ text: "你好世界" })).toBe("");
    await client.close();
  });

  it("generate_lorem produces the requested amount in both styles", async () => {
    const client = await connect();
    const classic = await client.callTool({ name: "generate_lorem", arguments: { mode: "words", count: 5, seed: 42 } });
    expect((classic.content as any)[0].text.split(" ").length).toBe(5);

    const modern = await client.callTool({ name: "generate_lorem", arguments: { mode: "words", count: 12, seed: 42, style: "modern" } });
    const mt = (modern.content as any)[0].text as string;
    expect(mt.startsWith("But I")).toBe(true);
    expect(mt.split(" ").length).toBe(12);
    expect(mt.toLowerCase()).not.toContain("lorem");

    const html = await client.callTool({ name: "generate_lorem", arguments: { mode: "paragraphs", count: 3, seed: 7, html: true } });
    const ht = (html.content as any)[0].text as string;
    expect(ht.match(/<p>/g)?.length).toBe(3);
    expect(ht.match(/<\/p>/g)?.length).toBe(3);
    await client.close();
  });

  it("generate_lorem rejects counts beyond the mode limit", async () => {
    const client = await connect();
    const r = await client.callTool({ name: "generate_lorem", arguments: { mode: "paragraphs", count: 200 } });
    expect((r as any).isError).toBe(true);
    expect((r.content as any)[0].text).toContain("100");
    await client.close();
  });

  it("html_entities escapes and unescapes both ways, incl. numeric mode", async () => {
    const client = await connect();
    const call = async (args: Record<string, unknown>) => {
      const r = await client.callTool({ name: "html_entities", arguments: args });
      return (r.content as any)[0].text as string;
    };
    const src = '<b class="x">Café & co</b>';
    expect(await call({ text: src })).toBe("&lt;b class=&quot;x&quot;&gt;Café &amp; co&lt;/b&gt;");
    expect(await call({ text: src, numeric: true })).toBe("&lt;b class=&quot;x&quot;&gt;Caf&#233; &amp; co&lt;/b&gt;");
    expect(await call({ text: "&lt;p&gt;a&nbsp;b&lt;/p&gt;", mode: "unescape" })).toBe("<p>a\u00a0b</p>");
    // 往返一致
    const escaped = await call({ text: src, numeric: true });
    expect(await call({ text: escaped, mode: "unescape" })).toBe(src);
    await client.close();
  });

  it("text_surgeon chains replace → affixes → numbering and returns CJK-aware stats", async () => {
    const client = await connect();
    const r = await client.callTool({
      name: "text_surgeon",
      arguments: {
        text: "alpha\nbeta\nALPHA",
        find: "alpha", replace: "omega",
        prefix: "- ", suffix: ";",
        number_lines: true, number_start: 1,
      },
    });
    const parsed = JSON.parse((r.content as any)[0].text);
    expect(parsed.text).toBe("1. - omega;\n2. - beta;\n3. - omega;");
    expect(parsed.stats.words).toBe(9);
    expect(parsed.stats.lines).toBe(3);
    expect(parsed.stats.characters).toBe(34);
    await client.close();
  });

  it("text_surgeon replaces literally and respects match_case", async () => {
    const client = await connect();
    const call = async (args: Record<string, unknown>) => {
      const r = await client.callTool({ name: "text_surgeon", arguments: args });
      return (JSON.parse((r.content as any)[0].text) as { text: string }).text;
    };
    // 字面量:正则元字符不解释
    expect(await call({ text: "a.b c", find: ".", replace: "-" })).toBe("a-b c");
    expect(await call({ text: "Foo foo FOO", find: "foo", replace: "bar", match_case: true })).toBe("Foo bar FOO");
    expect(await call({ text: "Foo foo FOO", find: "foo", replace: "bar" })).toBe("bar bar bar");
    await client.close();
  });

  it("handles invalid input at two layers: schema (protocol error) and logic (isError)", async () => {
    const client = await connect();
    // schema 层:负数 start 被 zod 拒绝 → SDK 返回 isError 结果(不 throw)
    const schemaBad = await client.callTool({
      name: "text_surgeon",
      arguments: { text: "x", number_lines: true, number_start: -1 },
    });
    expect((schemaBad as any).isError).toBe(true);
    expect((schemaBad.content as any)[0].text).toContain("-32602");
    // schema 层:未知枚举
    const enumBad = await client.callTool({ name: "slugify", arguments: { text: "x", separator: "dot" } });
    expect((enumBad as any).isError).toBe(true);
    await client.close();
  });
});
