import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { PlatformOverview } from "@/components/sections/PlatformOverview";
import { Capabilities } from "@/components/sections/Capabilities";
import { ScenarioIntelligence } from "@/components/sections/ScenarioIntelligence";
import { PlatformScreens } from "@/components/sections/PlatformScreens";
import { Enterprise } from "@/components/sections/Enterprise";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhyChoose />
        <PlatformOverview />
        <Capabilities />
        <ScenarioIntelligence />
        <PlatformScreens />
        <Enterprise />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
