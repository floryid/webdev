"use client"

import { useEffect, useRef } from "react"

export default function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Matrix characters
    const chars =
      "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    // Column settings
    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)

    // Array to track the y position of each column
    const drops: number[] = []
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -canvas.height)
    }

    // Draw function
    const draw = () => {
      // Semi-transparent black background to create trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Set text color and font
      ctx.font = `${fontSize}px monospace`

      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = chars[Math.floor(Math.random() * chars.length)]

        // Random color with blue/red bias
        const colorChoice = Math.random()
        if (colorChoice < 0.7) {
          // Blue shades (more common)
          ctx.fillStyle = `rgba(0, 100, 255, ${Math.random() * 0.5 + 0.5})`
        } else if (colorChoice < 0.9) {
          // Red shades
          ctx.fillStyle = `rgba(255, 0, 50, ${Math.random() * 0.5 + 0.5})`
        } else {
          // White/bright blue (rare)
          ctx.fillStyle = `rgba(180, 255, 255, ${Math.random() * 0.7 + 0.3})`
        }

        // Draw the character
        ctx.fillText(text, i * fontSize, drops[i])

        // Move the drop down
        drops[i] += fontSize

        // Reset drop position with some randomness
        if (drops[i] > canvas.height && Math.random() > 0.975) {
          drops[i] = Math.floor(Math.random() * -100)
        }
      }
    }

    // Animation loop
    const interval = setInterval(draw, 50)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0 opacity-30" />
}
