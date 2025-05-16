"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Terminal, Github, Twitter, Linkedin } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-black/40 border-b border-blue-500/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
              <Terminal className="h-5 w-5 text-red-500" />
              <span className="text-lg font-bold tracking-wider">CyberWolf</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="#about">About Me</NavLink>
            <NavLink href="#hall-of-fame">Hall of Fame</NavLink>
            <NavLink href="#vulnerabilities">Vulnerabilities</NavLink>
            <NavLink href="#live-recon">Live Recon</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <SocialLink href="https://github.com" icon={<Github className="h-5 w-5" />} />
            <SocialLink href="https://twitter.com" icon={<Twitter className="h-5 w-5" />} />
            <SocialLink href="https://linkedin.com" icon={<Linkedin className="h-5 w-5" />} />
          </div>

          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-blue-400 hover:text-blue-300 focus:outline-none">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-md border-b border-blue-500/20">
          <div className="container mx-auto px-4 py-4 space-y-2">
            <MobileNavLink href="#about" onClick={toggleMenu}>
              About Me
            </MobileNavLink>
            <MobileNavLink href="#hall-of-fame" onClick={toggleMenu}>
              Hall of Fame
            </MobileNavLink>
            <MobileNavLink href="#vulnerabilities" onClick={toggleMenu}>
              Vulnerabilities
            </MobileNavLink>
            <MobileNavLink href="#live-recon" onClick={toggleMenu}>
              Live Recon
            </MobileNavLink>
            <MobileNavLink href="#contact" onClick={toggleMenu}>
              Contact
            </MobileNavLink>

            <div className="flex items-center space-x-4 pt-4 border-t border-blue-500/20 mt-4">
              <SocialLink href="https://github.com" icon={<Github className="h-5 w-5" />} />
              <SocialLink href="https://twitter.com" icon={<Twitter className="h-5 w-5" />} />
              <SocialLink href="https://linkedin.com" icon={<Linkedin className="h-5 w-5" />} />
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-blue-400/80 hover:text-blue-300 transition-colors relative group">
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>
    </Link>
  )
}

function MobileNavLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block py-2 text-blue-400/80 hover:text-blue-300 transition-colors border-b border-blue-500/10"
    >
      {children}
    </Link>
  )
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-400/70 hover:text-blue-300 transition-colors p-2 rounded-full hover:bg-blue-500/10"
    >
      {icon}
    </Link>
  )
}
