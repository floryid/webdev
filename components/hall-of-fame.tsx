"use client"

import { useState } from "react"
import Image from "next/image"
import { Trophy, ExternalLink, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"

const companies = [
  { name: "Google", logo: "/placeholder.svg?height=60&width=60", date: "2023", vulnerability: "XSS in Gmail" },
  { name: "Microsoft", logo: "/placeholder.svg?height=60&width=60", date: "2023", vulnerability: "SSRF in Azure" },
  { name: "Apple", logo: "/placeholder.svg?height=60&width=60", date: "2022", vulnerability: "Authentication Bypass" },
  { name: "Meta", logo: "/placeholder.svg?height=60&width=60", date: "2022", vulnerability: "IDOR in Facebook" },
  {
    name: "Twitter",
    logo: "/placeholder.svg?height=60&width=60",
    date: "2021",
    vulnerability: "OAuth Misconfiguration",
  },
  { name: "PayPal", logo: "/placeholder.svg?height=60&width=60", date: "2021", vulnerability: "Business Logic Flaw" },
  { name: "Shopify", logo: "/placeholder.svg?height=60&width=60", date: "2020", vulnerability: "Privilege Escalation" },
  { name: "Uber", logo: "/placeholder.svg?height=60&width=60", date: "2020", vulnerability: "Information Disclosure" },
]

export default function HallOfFame() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="py-20 relative" id="hall-of-fame">
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black to-transparent z-10"></div>

      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-12">
          <Terminal className="h-6 w-6 text-red-500" />
          <h2 className="text-3xl font-bold text-blue-400">Hall of Fame</h2>
          <div className="h-px flex-grow bg-blue-500/20"></div>
        </div>

        <div className="text-center mb-12">
          <h3 className="text-xl text-blue-300 mb-4">Recognized by Leading Companies</h3>
          <p className="text-blue-100/70 max-w-2xl mx-auto">
            I've been acknowledged by these organizations for responsibly disclosing security vulnerabilities in their
            systems, helping to protect millions of users worldwide.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {companies.map((company, index) => (
            <div
              key={company.name}
              className="relative group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="bg-black/40 backdrop-blur-sm border border-blue-500/20 rounded-lg p-6 h-full flex flex-col items-center justify-center transition-all duration-300 hover:border-blue-500/40 hover:transform hover:scale-105 hover:z-10">
                <div className="w-16 h-16 relative mb-4">
                  <Image
                    src={company.logo || "/placeholderlogo.jpg"}
                    alt={`${company.name} logo`}
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </div>
                <h4 className="font-bold text-blue-300">{company.name}</h4>
                <p className="text-xs text-blue-400/70 mt-1">{company.date}</p>

                {/* Trophy icon with glow effect */}
                <div className="absolute -top-3 -right-3 bg-black/80 rounded-full p-1.5 border border-yellow-500/50 text-yellow-500 transform rotate-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Trophy className="h-4 w-4" />
                </div>
              </div>

              {/* Popup with vulnerability details */}
              {hoveredIndex === index && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-black/90 backdrop-blur-md border border-blue-500/30 rounded-md p-3 z-20 shadow-lg shadow-blue-500/20">
                  <div className="text-sm font-medium text-blue-300 mb-1">Vulnerability:</div>
                  <div className="text-xs text-blue-100/80">{company.vulnerability}</div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button className="bg-blue-600/80 hover:bg-blue-700 text-white border border-blue-500 px-6 py-2 rounded-md hover:glow-blue transition-all duration-300 inline-flex items-center gap-2">
            <ExternalLink className="h-4 w-4" />
            View All Recognitions
          </Button>
        </div>
      </div>
    </section>
  )
}
