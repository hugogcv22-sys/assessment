import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import { describe, expect, it } from "vitest";

describe.each(["public/walkthrough.html", "src/content/trolley-script.js"])("Hero beat navigation in %s", (file) => {
  it.each([[1, 0], [2, 5], [3, 9], [4, 15], [5, 20]])("seeks beat %i to second %i", (beat, seconds) => {
    const source = readFileSync(file, "utf8");
    const handler = source.match(/function previewHeroBeat\([^]*?\n        }/)?.[0];
    if (!handler) throw new Error("Hero beat handler missing");
    const video = { duration: 25.125, currentTime: 2, classList: { contains: () => false } };
    let endHidden = true;
    const endCard = { classList: { toggle: (_name: string, hidden: boolean) => { endHidden = hidden; } } };
    const nodes = new Map<string, unknown>([["hero-reel-video", video], ["hero-end-card", endCard]]);
    const document = { getElementById: (id: string) => {
      if (!nodes.has(id)) nodes.set(id, { innerText: "", style: {}, dataset: {} });
      return nodes.get(id);
    } };
    const endHandler = source.match(/function setHeroEndCard\([^]*?\n        }/)?.[0];
    if (!endHandler) throw new Error("Closing card handler missing");
    runInNewContext(`${endHandler}\n${handler}\npreviewHeroBeat(${beat}, '', '', '', '25%');`, { document });
    expect(video.currentTime).toBe(seconds);
    expect(endHidden).toBe(beat !== 5);
  });
});