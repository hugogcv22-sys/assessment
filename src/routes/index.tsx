import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import mojPhoto from "@/assets/photos/moj_stockholm.json";
import trolleyPhoto from "@/assets/proposal-two/img0.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Two Creative Proposals | Marketing Coordinator Practical Test — Hugo Castro" },
      { name: "description", content: "Choose between Founder Mode and Trolley Command Center: two creative proposals for the marketing coordinator practical test by Hugo Castro." },
      { property: "og:title", content: "Two Creative Proposals | Hugo Castro" },
      { property: "og:description", content: "Two perspectives on one brief. Explore Founder Mode or Trolley Command Center." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <main className="proposal-lobby">
    <header className="lobby-header"><Link to="/" className="lobby-signature">HUGO CASTRO<span>Creative strategy & storytelling</span></Link><span className="lobby-edition">MOJ / TROLLEY <span>2026</span></span></header>
    <section className="lobby-intro"><p className="lobby-eyebrow">ONE BRIEF. TWO PERSPECTIVES.</p><h1>Marketing Coordinator<br /><span>Practical Test</span></h1><p className="lobby-invitation">Welcome. Which proposal would you like to explore?</p></section>
    <div className="lobby-choices">
      <section className="lobby-half lobby-human" aria-labelledby="founder-title">
        <div className="lobby-half-top"><span>PROPOSAL / 01</span><span>THE HUMAN PERSPECTIVE</span></div>
        <Link to="/proposal-one" className="lobby-art lobby-polaroid" aria-label="Preview Founder Mode"><img src={mojPhoto.url} alt="Moj on a Stockholm balcony" /><span>Moj, beyond the title.</span></Link>
        <div className="lobby-half-bottom"><div><p className="lobby-kicker">REAL PEOPLE. REAL CONNECTION.</p><h2 id="founder-title">Founder Mode</h2></div><Button asChild variant="ghost" className="lobby-enter"><Link to="/proposal-one">Explore proposal <ArrowUpRight /></Link></Button></div>
      </section>
      <section className="lobby-half lobby-system" aria-labelledby="trolley-title">
        <div className="lobby-half-top"><span>PROPOSAL / 02</span><span>THE CREATIVE SYSTEM</span></div>
        <Link to="/proposal-two" className="lobby-art lobby-graphic" aria-label="Preview Trolley Command Center"><img src={trolleyPhoto.url} alt="Moj editorial concept with bold blue and orange artwork" /><span>STORY × STRATEGY × CULTURE</span></Link>
        <div className="lobby-half-bottom"><div><p className="lobby-kicker">BOLD IDEAS. CONNECTED WORLDS.</p><h2 id="trolley-title">Trolley<br />Command Center</h2></div><Button asChild variant="ghost" className="lobby-enter"><Link to="/proposal-two">Explore proposal <ArrowUpRight /></Link></Button></div>
      </section>
    </div>
    <footer className="lobby-footer"><span>Prepared by Hugo Castro</span><span>Two directions. One ambition.</span></footer>
  </main>;
}
