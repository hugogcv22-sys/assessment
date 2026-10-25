import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { ProposalFrame } from "@/components/proposal-frame";
import instagramGrid from "@/assets/moj_instagram_grid.png.asset.json";
import instagramAvatar from "@/assets/moj_instagram_avatar.png.asset.json";
import opusclipReel1 from "@/assets/opusclip_reel_1.mp4.asset.json";
import opusclipReel2 from "@/assets/opusclip_reel_2.mp4.asset.json";
import heroVideo from "@/assets/katie_campaign_real_voice.mp4.asset.json";
import heroFallback from "@/assets/katie_campaign_real_voice.webm.asset.json";
import heroPoster from "@/assets/katie_campaign_poster.jpg.asset.json";
import instagramVideo from "@/assets/moj_instagram_example.mp4.asset.json";
import instagramFallback from "@/assets/moj_instagram_example.webm.asset.json";
import instagramPoster from "@/assets/moj_instagram_example_poster.jpg.asset.json";

export const Route = createFileRoute("/proposal-one")({
  head: () => ({ meta: [
    { title: "Founder Mode — Proposal 01 | Hugo Castro" },
    { name: "description", content: "The human-led Moj Founder Mode marketing coordinator practical test proposal." },
    { property: "og:title", content: "Founder Mode — Proposal 01 | Hugo Castro" },
    { property: "og:description", content: "Explore Moj's editorial strategy, talent, campaign and defense." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: ProposalOne,
});

function ProposalOne() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const sendAssets = () => {
    iframeRef.current?.contentWindow?.postMessage({ type: "moj-instagram-asset", url: instagramGrid.url,
      avatarUrl: instagramAvatar.url, videoUrls: [opusclipReel1.url, opusclipReel2.url],
      instagramVideoUrl: instagramVideo.url, instagramFallbackUrl: instagramFallback.url, instagramPosterUrl: instagramPoster.url,
      heroVideoUrl: heroVideo.url, heroFallbackUrl: heroFallback.url, heroPosterUrl: heroPoster.url }, window.location.origin);
  };
  useEffect(() => { sendAssets(); }, []);
  return <ProposalFrame name="01 — Founder Mode"><iframe ref={iframeRef} src="/walkthrough.html" onLoad={sendAssets}
    title="Founder Mode proposal" className="proposal-iframe" /></ProposalFrame>;
}