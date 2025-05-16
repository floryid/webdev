"use client"

import type React from "react"

import { useState } from "react"
import { Shield, Target, Code, Award, Terminal } from "lucide-react"

export default function AboutMe() {
  const [activeTab, setActiveTab] = useState("skills")

  return (
    <section className="py-20 relative" id="about">
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black to-transparent z-10"></div>

      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-12">
          <Terminal className="h-6 w-6 text-red-500" />
          <h2 className="text-3xl font-bold text-blue-400">About Me</h2>
          <div className="h-px flex-grow bg-blue-500/20"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="bg-blue-900/10 backdrop-blur-sm border border-blue-500/20 rounded-lg p-6 hover:border-blue-500/40 transition-all duration-300">
              <h3 className="text-xl font-bold mb-4 text-blue-300">Mission</h3>
              <p className="text-blue-100/80 leading-relaxed">
                I'm a dedicated cybersecurity professional specializing in bug bounty hunting and ethical hacking. With
                over 5 years of experience identifying vulnerabilities across various platforms, I help organizations
                secure their digital assets through responsible disclosure.
              </p>
            </div>

            <div className="bg-red-900/10 backdrop-blur-sm border border-red-500/20 rounded-lg p-6 hover:border-red-500/40 transition-all duration-300">
              <h3 className="text-xl font-bold mb-4 text-red-300">Approach</h3>
              <p className="text-blue-100/80 leading-relaxed">
                I combine manual testing techniques with custom-built automation tools to discover security flaws that
                automated scanners miss. My methodology focuses on understanding the business logic of applications to
                identify high-impact vulnerabilities that matter.
              </p>
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-sm border border-blue-500/20 rounded-lg overflow-hidden">
            <div className="flex border-b border-blue-500/20">
              <TabButton
                active={activeTab === "skills"}
                onClick={() => setActiveTab("skills")}
                icon={<Code className="h-4 w-4" />}
                label="Skills"
              />
              <TabButton
                active={activeTab === "achievements"}
                onClick={() => setActiveTab("achievements")}
                icon={<Award className="h-4 w-4" />}
                label="Achievements"
              />
              <TabButton
                active={activeTab === "tools"}
                onClick={() => setActiveTab("tools")}
                icon={<Terminal className="h-4 w-4" />}
                label="Tools"
              />
            </div>

            <div className="p-6">
              {activeTab === "skills" && (
                <div className="space-y-4">
                  <SkillBar label="Web Application Security" percentage={95} color="blue" />
                  <SkillBar label="API Security Testing" percentage={90} color="red" />
                  <SkillBar label="Mobile Application Security" percentage={85} color="blue" />
                  <SkillBar label="Network Penetration Testing" percentage={80} color="red" />
                  <SkillBar label="Cloud Security" percentage={75} color="blue" />
                </div>
              )}

              {activeTab === "achievements" && (
                <div className="space-y-4">
                  <Achievement
                    icon={<Shield className="h-5 w-5 text-red-500" />}
                    title="Hall of Fame"
                    description="Listed in 20+ security hall of fames including Google, Microsoft, and Apple"
                  />
                  <Achievement
                    icon={<Award className="h-5 w-5 text-blue-500" />}
                    title="Top Hunter"
                    description="Ranked in top 50 hunters on HackerOne and Bugcrowd platforms"
                  />
                  <Achievement
                    icon={<Target className="h-5 w-5 text-red-500" />}
                    title="Critical Findings"
                    description="Discovered 15+ critical vulnerabilities in major applications"
                  />
                </div>
              )}

              {activeTab === "tools" && (
                <div className="grid grid-cols-2 gap-4">
                  <ToolCard name="Burp Suite" type="Web Proxy" />
                  <ToolCard name="Nuclei" type="Vulnerability Scanner" />
                  <ToolCard name="Amass" type="Reconnaissance" />
                  <ToolCard name="Metasploit" type="Exploitation" />
                  <ToolCard name="Custom Scripts" type="Automation" />
                  <ToolCard name="OWASP ZAP" type="Security Testing" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TabButton({
  active,
  onClick,
  icon,
  label,
}: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
        active
          ? "bg-blue-500/10 text-blue-400 border-b-2 border-blue-500"
          : "text-blue-400/60 hover:text-blue-400 hover:bg-blue-500/5"
      }`}
    >
      {icon}
      {label}
    </button>
  )
}

function SkillBar({ label, percentage, color }: { label: string; percentage: number; color: "blue" | "red" }) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm text-blue-300">{label}</span>
        <span className="text-sm text-blue-400/70">{percentage}%</span>
      </div>
      <div className="h-2 bg-black/50 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${color === "blue" ? "bg-blue-500" : "bg-red-500"}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  )
}

function Achievement({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex gap-3 p-3 bg-blue-900/10 rounded-md border border-blue-500/20">
      <div className="mt-1">{icon}</div>
      <div>
        <h4 className="font-medium text-blue-300">{title}</h4>
        <p className="text-sm text-blue-100/70">{description}</p>
      </div>
    </div>
  )
}

function ToolCard({ name, type }: { name: string; type: string }) {
  return (
    <div className="p-3 bg-blue-900/10 rounded-md border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300">
      <h4 className="font-medium text-blue-300">{name}</h4>
      <p className="text-xs text-blue-100/70">{type}</p>
    </div>
  )
}
