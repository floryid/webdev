"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Terminal, Shield, Cpu } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Hero() {
  const [text, setText] = useState("")
  const fullText = "Hi, I'm CyberWolf"
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    let i = 0
    const typing = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.substring(0, i + 1))
        i++
      } else {
        clearInterval(typing)
      }
    }, 100)

    const cursorBlink = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)

    return () => {
      clearInterval(typing)
      clearInterval(cursorBlink)
    }
  }, [])

  return (
    <section
      className="py-20 md:py-32 flex flex-col items-center justify-center min-h-[90vh] relative overflow-hidden"
      id="home"
    >
      {/* Animated circuit lines in background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border border-blue-500 rounded-full animate-pulse"></div>
        <div
          className="absolute top-1/3 left-1/3 w-1/3 h-1/3 border border-red-500 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-[40%] left-[40%] w-1/5 h-1/5 border border-blue-300 rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 z-10 text-center">
        <div className="mb-8 relative inline-block">
          <div className="w-40 h-40 md:w-48 md:h-48 relative mx-auto mb-6 rounded-full overflow-hidden border-2 border-blue-500 glow-blue">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-red-500/20 z-10"></div>
            <Image
              src="/placeholderlogo.jpg?height=200&width=200"
              alt="CyberWolf Avatar"
              width={200}
              height={200}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-red-500/10 animate-pulse"></div>
          </div>

          {/* Orbiting icons */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-orbit">
            <Shield className="h-6 w-6 text-red-500" />
          </div>
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 animate-orbit"
            style={{ animationDelay: "1s" }}
          >
            <Cpu className="h-6 w-6 text-blue-500" />
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-red-500">
          <span className="inline-block">{text}</span>
          <span className={`inline-block w-3 h-8 ml-1 bg-red-500 ${showCursor ? "opacity-100" : "opacity-0"}`}></span>
        </h1>

        <h2 className="text-xl md:text-2xl text-blue-400/80 mb-8 glitch-text">
          Ethical Hacker | Bug Bounty Hunter | AI Recon Specialist
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white border border-blue-500 px-6 py-2 rounded-md hover:glow-blue transition-all duration-300">
            View Projects
          </Button>
          <Button
            variant="outline"
            className="border border-red-500 text-red-400 hover:bg-red-500/10 px-6 py-2 rounded-md hover:glow-red transition-all duration-300"
          >
            Contact Me
          </Button>
        </div>

        <div className="inline-flex items-center justify-center px-4 py-2 bg-black/50 backdrop-blur-sm border border-blue-500/30 rounded-lg text-blue-400 text-sm">
          <Terminal className="h-4 w-4 mr-2 text-red-500" />
          <span className="typing-text">Currently hunting on HackerOne, Bugcrowd, and private programs</span>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-blue-500 flex justify-center items-start p-1">
          <div className="w-1 h-2 bg-blue-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
