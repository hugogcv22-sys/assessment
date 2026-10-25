import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";

export function ProposalFrame({ name, children }: { name: string; children: ReactNode }) {
  return <main className="proposal-view">
    <nav className="proposal-return" aria-label="Proposal navigation">
      <Button asChild variant="ghost" size="sm"><Link to="/"><ArrowLeft /> All proposals</Link></Button>
      <span>{name} <span className="proposal-author">/ Hugo Castro</span></span>
    </nav>
    {children}
  </main>;
}