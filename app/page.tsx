import { HeroSection } from "@/components/hero-section"
import { StickyNav } from "@/components/sticky-nav"
import { ProblemSection } from "@/components/problem-section"
import { StrategySection } from "@/components/strategy-section"
import { ForceSection } from "@/components/force-section"
import { OpportunitySection } from "@/components/opportunity-section"
import { AnalysisSection } from "@/components/analysis-section"
import { ConclusionSection } from "@/components/conclusion-section"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <main>
      <HeroSection />
      <StickyNav />
      <ProblemSection />
      <StrategySection />
      <ForceSection />
      <OpportunitySection />
      <AnalysisSection />
      <ConclusionSection />
      <Footer />
    </main>
  )
}
