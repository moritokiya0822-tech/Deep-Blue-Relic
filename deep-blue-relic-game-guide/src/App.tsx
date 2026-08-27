import { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import WorldLoreSection from './components/WorldLoreSection';
import FourLightsSection from './components/FourLightsSection';
import SubmarineUpgradeSimulator from './components/SubmarineUpgradeSimulator';
import DepthOxygenChart from './components/DepthOxygenChart';
import RelicCompendium from './components/RelicCompendium';
import BeginnerStrategySection from './components/BeginnerStrategySection';
import Footer from './components/Footer';
import MiniDiveSimulator from './components/MiniDiveSimulator';

export default function App() {
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#020b18] text-slate-100 font-['Noto_Sans_JP'] relative overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Navbar */}
      <Navbar onOpenSimulator={() => setIsSimulatorOpen(true)} />

      {/* Main Content Sections */}
      <main>
        <HeroSection onOpenSimulator={() => setIsSimulatorOpen(true)} />
        <WorldLoreSection />
        <FourLightsSection />
        <SubmarineUpgradeSimulator />
        <DepthOxygenChart />
        <RelicCompendium />
        <BeginnerStrategySection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Mini Dive Simulator Modal */}
      <MiniDiveSimulator
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
      />
    </div>
  );
}
