"use client"

import { useState } from "react"
import { AlertTriangle, Terminal, ExternalLink, ChevronRight, Bug, Shield, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"

const vulnerabilities = [
  {
    id: 1,
    title: "Critical Authentication Bypass",
    company: "Major E-commerce Platform",
    severity: "Critical",
    bounty: "$10,000",
    date: "Dec 2023",
    description:
      "Discovered a flaw in the OAuth implementation that allowed complete authentication bypass, giving unauthorized access to user accounts.",
    impact: "Potential compromise of all user accounts and personal information.",
    tags: ["Authentication", "OAuth", "OWASP Top 10"],
  },
  {
    id: 2,
    title: "Stored XSS in User Profile",
    company: "Social Media Company",
    severity: "High",
    bounty: "$5,000",
    date: "Oct 2023",
    description:
      "Identified a stored XSS vulnerability in the user profile section that allowed execution of arbitrary JavaScript.",
    impact: "Account takeover, data theft, and session hijacking possibilities.",
    tags: ["XSS", "Client-Side", "Injection"],
  },
  {
    id: 3,
    title: "SQL Injection in Search Function",
    company: "Financial Services Provider",
    severity: "Critical",
    bounty: "$15,000",
    date: "Aug 2023",
    description:
      "Found a SQL injection vulnerability in the search functionality that allowed extraction of sensitive database information.",
    impact: "Potential access to customer financial records and personal information.",
    tags: ["SQLi", "Injection", "Data Breach"],
  },
  {
    id: 4,
    title: "IDOR in User Management API",
    company: "SaaS Platform",
    severity: "High",
    bounty: "$7,500",
    date: "Jul 2023",
    description:
      "Discovered an Insecure Direct Object Reference vulnerability in the user management API that allowed accessing other users' data.",
    impact: "Unauthorized access to sensitive user information across accounts.",
    tags: ["IDOR", "API Security", "Access Control"],
  },
]

export default function Vulnerabilities() {
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <section className="py-20 relative" id="vulnerabilities">
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black to-transparent z-10"></div>

      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-12">
          <Terminal className="h-6 w-6 text-red-500" />
          <h2 className="text-3xl font-bold text-blue-400">Vulnerabilities Reported</h2>
          <div className="h-px flex-grow bg-blue-500/20"></div>
        </div>

        <div className="text-center mb-12">
          <h3 className="text-xl text-blue-300 mb-4">Notable Security Findings</h3>
          <p className="text-blue-100/70 max-w-2xl mx-auto">
            A selection of significant vulnerabilities I've discovered and responsibly disclosed. All issues were
            reported through official bug bounty programs and fixed by the affected organizations.
          </p>
        </div>

        <div className="space-y-6">
          {vulnerabilities.map((vuln) => (
            <div
              key={vuln.id}
              className={`bg-black/40 backdrop-blur-sm border border-blue-500/20 rounded-lg overflow-hidden transition-all duration-300 ${
                expandedId === vuln.id ? "border-blue-500/50" : "hover:border-blue-500/40"
              }`}
            >
              <div
                className="p-4 md:p-6 cursor-pointer flex flex-wrap md:flex-nowrap items-start gap-4 md:gap-6"
                onClick={() => toggleExpand(vuln.id)}
              >
                <div className="flex-shrink-0">
                  <SeverityBadge severity={vuln.severity} />
                </div>

                <div className="flex-grow">
                  <h4 className="text-lg font-bold text-blue-300 mb-1 flex items-center gap-2">
                    <Bug className="h-4 w-4 text-red-500" />
                    {vuln.title}
                  </h4>

                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-blue-400/70 mb-3">
                    <div>
                      Company: <span className="text-blue-300">{vuln.company}</span>
                    </div>
                    <div>
                      Date: <span className="text-blue-300">{vuln.date}</span>
                    </div>
                    <div>
                      Bounty: <span className="text-green-400">{vuln.bounty}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {vuln.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900/30 text-blue-300 border border-blue-500/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex-shrink-0 ml-auto">
                  <ChevronRight
                    className={`h-5 w-5 text-blue-400 transition-transform duration-300 ${
                      expandedId === vuln.id ? "rotate-90" : ""
                    }`}
                  />
                </div>
              </div>

              {expandedId === vuln.id && (
                <div className="px-4 md:px-6 pb-6 pt-2 border-t border-blue-500/20 bg-blue-900/5">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-sm font-medium text-blue-300 mb-2 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                        Description
                      </h5>
                      <p className="text-sm text-blue-100/80 leading-relaxed">{vuln.description}</p>
                    </div>

                    <div>
                      <h5 className="text-sm font-medium text-blue-300 mb-2 flex items-center gap-2">
                        <Shield className="h-4 w-4 text-red-500" />
                        Impact
                      </h5>
                      <p className="text-sm text-blue-100/80 leading-relaxed">{vuln.impact}</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-blue-500/10 flex justify-end">
                    <Button
                      variant="outline"
                      className="text-xs border border-blue-500/30 text-blue-400 hover:bg-blue-500/10 inline-flex items-center gap-1.5"
                    >
                      <Lock className="h-3 w-3" />
                      View Redacted Report
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button className="bg-blue-600/80 hover:bg-blue-700 text-white border border-blue-500 px-6 py-2 rounded-md hover:glow-blue transition-all duration-300 inline-flex items-center gap-2">
            <ExternalLink className="h-4 w-4" />
            View All Reports
          </Button>
        </div>
      </div>
    </section>
  )
}

function SeverityBadge({ severity }: { severity: string }) {
  let bgColor = "bg-yellow-500/20"
  let textColor = "text-yellow-400"
  let borderColor = "border-yellow-500/30"

  if (severity === "Critical") {
    bgColor = "bg-red-500/20"
    textColor = "text-red-400"
    borderColor = "border-red-500/30"
  } else if (severity === "High") {
    bgColor = "bg-orange-500/20"
    textColor = "text-orange-400"
    borderColor = "border-orange-500/30"
  } else if (severity === "Medium") {
    bgColor = "bg-yellow-500/20"
    textColor = "text-yellow-400"
    borderColor = "border-yellow-500/30"
  } else if (severity === "Low") {
    bgColor = "bg-blue-500/20"
    textColor = "text-blue-400"
    borderColor = "border-blue-500/30"
  }

  return (
    <div
      className={`px-3 py-1.5 rounded-md ${bgColor} ${textColor} border ${borderColor} text-xs font-medium uppercase tracking-wider`}
    >
      {severity}
    </div>
  )
}
