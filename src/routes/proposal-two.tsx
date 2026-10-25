import { createFileRoute } from "@tanstack/react-router";
import { ProposalFrame } from "@/components/proposal-frame";
import trolleyBody from "@/content/trolley-body.html?raw";
import trolleyScript from "@/content/trolley-script.js?raw";
import trolleyCss from "@/content/trolley.css?url";
import { trolleyImages } from "@/content/trolley-images";
import opusclipReel1 from "@/assets/opusclip_reel_1.mp4.asset.json";
import opusclipReel2 from "@/assets/opusclip_reel_2.mp4.asset.json";
import heroTeaser from "@/content/hero-teaser.html?raw";
import heroVideo from "@/assets/katie_pop_art_campaign.mp4.asset.json";
import heroFallback from "@/assets/katie_pop_art_campaign.webm.asset.json";
import heroPoster from "@/assets/katie_pop_art_poster.jpg.asset.json";
import instagramVideo from "@/assets/moj_instagram_example.mp4.asset.json";
import instagramFallback from "@/assets/moj_instagram_example.webm.asset.json";
import instagramPoster from "@/assets/moj_instagram_example_poster.jpg.asset.json";

// The export includes an older inline copy of the script; execute only the standalone revision.
const body = trolleyBody.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
  .replace(/<video id="moj-reel-video"[^>]*><\/video>/, `<video id="moj-reel-video" aria-label="Moj Instagram example video" class="absolute inset-0 w-full h-full object-cover z-20" controls playsinline preload="metadata" poster="${instagramPoster.url}"><source src="${instagramVideo.url}" type="video/mp4"><source src="${instagramFallback.url}" type="video/webm"></video>`)
  .replace('id="moj-reel-placeholder" class="', 'id="moj-reel-placeholder" class="hidden ')
  .replace("__HERO_TEASER_SECTION__", heroTeaser
    .replace('class="hidden" controls=""', 'class="" controls=""')
    .replace('<video ', `<video poster="${heroPoster.url}" `)
    .replace('</video>', `<source src="${heroVideo.url}" type="video/mp4"><source src="${heroFallback.url}" type="video/webm"></video>`)
    .replace('class="hero-storyboard"', 'class="hero-storyboard hidden"'))
  .replace("__OPUSCLIP_SAMPLE_1__", opusclipReel1.url)
  .replace("__OPUSCLIP_SAMPLE_2__", opusclipReel2.url)
  .replace(/\/images\/(?:talent\/)?[\w-]+\.jpg/g, path => trolleyImages[path] ?? path)
  .replace(/loading="lazy"/g, 'loading="eager"');
const documentHtml = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Trolley Command Center | Hugo Castro</title>
<link rel="stylesheet" href="${trolleyCss}"><link rel="stylesheet" href="/hero-teaser.css"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Anton&family=Caveat:wght@600;700&family=Fraunces:ital,opsz,wght@0,9..144,700;1,9..144,600&family=Homemade+Apple&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap">
<style>@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}}</style></head>
<body class="min-h-screen flex flex-col canvas-grid">${body}<script>${trolleyScript.replace(/<\/script/gi, "<\\/script")}</script></body></html>`;

export const Route = createFileRoute("/proposal-two")({
  head: () => ({ meta: [
    { title: "Trolley Command Center — Proposal 02 | Hugo Castro" },
    { name: "description", content: "The Trolley Command Center marketing coordinator proposal: storytelling, talent, campaign and creative direction." },
    { property: "og:title", content: "Trolley Command Center — Proposal 02 | Hugo Castro" },
    { property: "og:description", content: "Explore the second creative proposal and its complete interactive brand system." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: ProposalTwo,
});

function ProposalTwo() {
  return <ProposalFrame name="02 — Trolley Command Center"><iframe title="Trolley Command Center proposal" srcDoc={documentHtml} className="proposal-iframe" /></ProposalFrame>;
}