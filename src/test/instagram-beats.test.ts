import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import { describe, expect, it } from "vitest";

describe.each(["public/walkthrough.html", "src/content/trolley-script.js"])("Instagram example timing in %s", file => {
  it.each([["00:00–00:05", 0], ["00:05–00:07", 5], ["00:07–00:14", 7], ["00:14–00:21", 14], ["00:21–00:25", 21]])("seeks %s to second %i", (time, seconds) => {
    const handler = readFileSync(file, "utf8").match(/function previewMojReelBeat\([^]*?\n        }/)?.[0];
    if (!handler) throw new Error("Instagram beat handler missing");
    const video = { duration: 25, currentTime: 2, classList: { contains: () => false } };
    const nodes = new Map<string, unknown>([["moj-reel-video", video]]);
    const document = { getElementById: (id: string) => {
      if (!nodes.has(id)) nodes.set(id, { innerText: "" });
      return nodes.get(id);
    } };
    runInNewContext(`${handler}\npreviewMojReelBeat('REEL ${time}', '', '');`, { document });
    expect(video.currentTime).toBe(seconds);
  });
});