"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { Terminal, RefreshCw, Wifi, Server, Database, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

// Simulated terminal output for the live recon feed
const reconCommands = [
  {
    command: "nmap -sV -p- nofri.com",
    output:
      "Starting Nmap scan...\nPort 22/tcp open ssh\nPort 80/tcp open http\nPort 443/tcp open https\nPort 8080/tcp open http-proxy",
  },
  {
    command: "subfinder -d nofri.com",
    output: "api.nofri.com\nadmin.nofri.com\ndev.nofri.com\nstaging.nofri.com\nmail.nofri.com",
  },
  {
    command: "nuclei -u https://nofri.com",
    output:
      "INFO[0000] Using Nuclei Engine v2.9.4\n[2023-12-15 14:23:45] [CVE-2021-44228] [critical] Found Log4j vulnerability\n[2023-12-15 14:23:48] [open-redirect] [medium] Found open redirect at /redirect?url=",
  },
  {
    command: "ffuf -u https://nofri.com/FUZZ",
    output:
      "admin                  [Status: 302, Size: 219, Words: 22]\napi                    [Status: 200, Size: 1521, Words: 54]\nbackup                 [Status: 403, Size: 1233, Words: 77]\ndev                    [Status: 200, Size: 4133, Words: 322]",
  },
  {
    command: "sqlmap -u 'https://nofri.com/product?id=1'",
    output:
      "sqlmap identified the following injection point(s):\nParameter: id (GET)\n    Type: boolean-based blind\n    Title: AND boolean-based blind - WHERE or HAVING clause\n    Payload: id=1 AND 5123=5123",
  },
]

export default function LiveRecon() {
  const [activeTab, setActiveTab] = useState("terminal")
  const [terminalLines, setTerminalLines] = useState<string[]>([])
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)

  // Simulate typing effect for terminal commands
  useEffect(() => {
    if (currentCommandIndex >= reconCommands.length) {
      // Reset to first command after delay
      const timer = setTimeout(() => {
        setTerminalLines([])
        setCurrentCommandIndex(0)
      }, 5000)
      return () => clearTimeout(timer)
    }

    const currentCommand = reconCommands[currentCommandIndex]

    // Type the command
    setIsTyping(true)
    const commandChars = currentCommand.command.split("")
    let currentText = ""

    const typeCommand = setInterval(() => {
      if (commandChars.length > 0) {
        currentText += commandChars.shift()
        setTerminalLines((prev) => [...prev.slice(0, -1), `$ ${currentText}`])
      } else {
        clearInterval(typeCommand)

        // After typing command, show output and move to next command
        setTimeout(() => {
          setIsTyping(false)
          setTerminalLines((prev) => [...prev, ...currentCommand.output.split("\n")])

          // Add new prompt line
          setTimeout(() => {
            setTerminalLines((prev) => [...prev, "$ "])
            setCurrentCommandIndex((prev) => prev + 1)
          }, 1000)
        }, 500)
      }
    }, 50)

    return () => clearInterval(typeCommand)
  }, [currentCommandIndex])

  // Auto-scroll terminal to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [terminalLines])

  // Initialize with empty prompt
  useEffect(() => {
    setTerminalLines(["$ "])
  }, [])

  return (
    <section className="py-20 relative" id="live-recon">
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black to-transparent z-10"></div>

      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-12">
          <Terminal className="h-6 w-6 text-red-500" />
          <h2 className="text-3xl font-bold text-blue-400">Live Recon</h2>
          <div className="h-px flex-grow bg-blue-500/20"></div>
        </div>

        <div className="text-center mb-12">
          <h3 className="text-xl text-blue-300 mb-4">Real-time Reconnaissance</h3>
          <p className="text-blue-100/70 max-w-2xl mx-auto">
            Watch my automated reconnaissance tools in action as they scan for vulnerabilities and security issues
            across target systems.
          </p>
        </div>

        <div className="bg-black/60 backdrop-blur-sm border border-blue-500/30 rounded-lg overflow-hidden">
          {/* Terminal header with tabs */}
          <div className="flex border-b border-blue-500/30 bg-blue-900/20">
            <TabButton
              active={activeTab === "terminal"}
              onClick={() => setActiveTab("terminal")}
              icon={<Terminal className="h-4 w-4" />}
              label="Terminal"
            />
            <TabButton
              active={activeTab === "network"}
              onClick={() => setActiveTab("network")}
              icon={<Wifi className="h-4 w-4" />}
              label="Network"
            />
            <TabButton
              active={activeTab === "endpoints"}
              onClick={() => setActiveTab("endpoints")}
              icon={<Server className="h-4 w-4" />}
              label="Endpoints"
            />
            <TabButton
              active={activeTab === "database"}
              onClick={() => setActiveTab("database")}
              icon={<Database className="h-4 w-4" />}
              label="Database"
            />

            <div className="ml-auto flex items-center px-3">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
              >
                <RefreshCw className="h-4 w-4" />
                <span className="sr-only">Refresh</span>
              </Button>
            </div>
          </div>

          {/* Terminal content */}
          <div ref={terminalRef} className="h-80 overflow-auto p-4 font-mono text-sm text-green-400 bg-black/90">
            {terminalLines.map((line, index) => (
              <div key={index} className={`mb-1 ${line.startsWith("$") ? "text-blue-300" : ""}`}>
                {line}
                {isTyping && index === terminalLines.length - 1 && (
                  <span className="inline-block w-2 h-4 bg-blue-400 ml-0.5 animate-pulse"></span>
                )}
              </div>
            ))}
          </div>

          {/* Terminal footer */}
          <div className="flex items-center justify-between border-t border-blue-500/30 bg-blue-900/20 px-4 py-2 text-xs text-blue-400/70">
            <div className="flex items-center gap-2">
              <Globe className="h-3 w-3 text-green-500" />
              <span>target.com</span>
            </div>
            <div>Scan in progress: 67%</div>
            <div>Last updated: {new Date().toLocaleTimeString()}</div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            title="Subdomains"
            value="127"
            change="+3 today"
            icon={<Globe className="h-5 w-5 text-blue-500" />}
          />
          <StatCard title="Open Ports" value="43" change="+5 today" icon={<Wifi className="h-5 w-5 text-red-500" />} />
          <StatCard
            title="Vulnerabilities"
            value="17"
            change="+2 today"
            icon={<AlertTriangle className="h-5 w-5 text-yellow-500" />}
          />
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
      className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
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

function StatCard({
  title,
  value,
  change,
  icon,
}: { title: string; value: string; change: string; icon: React.ReactNode }) {
  return (
    <div className="bg-black/40 backdrop-blur-sm border border-blue-500/20 rounded-lg p-4 hover:border-blue-500/40 transition-all duration-300">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-sm font-medium text-blue-400/70">{title}</h4>
          <div className="text-2xl font-bold text-blue-300 mt-1">{value}</div>
          <div className="text-xs text-green-400 mt-1">{change}</div>
        </div>
        <div className="p-2 bg-blue-900/20 rounded-md">{icon}</div>
      </div>
    </div>
  )
}

function AlertTriangle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  )
}
