import { Terminal } from "lucide-react"
import Hero from "@/components/hero"
import Navbar from "@/components/navbar"
import AboutMe from "@/components/about-me"
import HallOfFame from "@/components/hall-of-fame"
import Vulnerabilities from "@/components/vulnerabilities"
import LiveRecon from "@/components/live-recon"
import Contact from "@/components/contact"
import MatrixBackground from "@/components/matrix-background"

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden font-mono">
      <MatrixBackground />
      <div className="relative z-10">
        <Navbar />
        <main className="container mx-auto px-4">
          <Hero />
          <AboutMe />
          <HallOfFame />
          <Vulnerabilities />
          <LiveRecon />
          <Contact />
        </main>
        <footer className="border-t border-blue-500/20 mt-20 py-8 text-center text-blue-400/70">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Terminal className="h-5 w-5 text-red-500" />
              <span className="text-lg font-bold tracking-wider">CyberWolf</span>
            </div>
            <p className="text-sm">© {new Date().getFullYear()} CyberWolf. All rights reserved.</p>
            <p className="text-xs mt-2 text-blue-400/50">Ethical Hacker | Bug Bounty Hunter | AI Recon Specialist</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
