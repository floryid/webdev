"use client"

import type React from "react"

import { useState } from "react"
import { Send, Terminal, Mail, MessageSquare, Github, Linkedin, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)

      // Reset form after showing success message
      setTimeout(() => {
        setSubmitted(false)
        setFormState({
          name: "",
          email: "",
          subject: "",
          message: "",
        })
      }, 3000)
    }, 1500)
  }

  return (
    <section className="py-20 relative" id="contact">
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black to-transparent z-10"></div>

      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-12">
          <Terminal className="h-6 w-6 text-red-500" />
          <h2 className="text-3xl font-bold text-blue-400">Contact</h2>
          <div className="h-px flex-grow bg-blue-500/20"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl text-blue-300 mb-4">Get in Touch</h3>
            <p className="text-blue-100/70 mb-6">
              Have a security concern or interested in working together? Send me a message and I'll get back to you as
              soon as possible.
            </p>

            <div className="space-y-6">
              <ContactMethod
                icon={<Mail className="h-5 w-5 text-red-500" />}
                title="Email"
                value="security@cyberwolf.dev"
              />

              <ContactMethod
                icon={<MessageSquare className="h-5 w-5 text-blue-500" />}
                title="Discord"
                value="cyberwolf#1337"
              />

              <div className="pt-6 border-t border-blue-500/20">
                <h4 className="text-sm font-medium text-blue-300 mb-3">Connect with me</h4>
                <div className="flex gap-4">
                  <SocialLink href="https://github.com" icon={<Github className="h-5 w-5" />} />
                  <SocialLink href="https://twitter.com" icon={<Twitter className="h-5 w-5" />} />
                  <SocialLink href="https://linkedin.com" icon={<Linkedin className="h-5 w-5" />} />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-sm border border-blue-500/30 rounded-lg p-6">
            <h3 className="text-lg text-blue-300 mb-6 flex items-center gap-2">
              <Terminal className="h-4 w-4 text-red-500" />
              <span>Send a Message</span>
            </h3>

            {submitted ? (
              <div className="bg-green-900/20 border border-green-500/30 rounded-md p-4 text-center">
                <h4 className="text-green-400 font-medium mb-2">Message Sent!</h4>
                <p className="text-sm text-blue-100/70">Thank you for reaching out. I'll get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-blue-300 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 bg-black/60 border border-blue-500/30 rounded-md text-blue-100 placeholder-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-blue-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 bg-black/60 border border-blue-500/30 rounded-md text-blue-100 placeholder-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-blue-300 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 bg-black/60 border border-blue-500/30 rounded-md text-blue-100 placeholder-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
                    placeholder="How can I help you?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-blue-300 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-3 py-2 bg-black/60 border border-blue-500/30 rounded-md text-blue-100 placeholder-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent resize-none font-mono"
                    placeholder="Type your message here..."
                  ></textarea>
                </div>

                <div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white border border-blue-500 py-2 rounded-md hover:glow-blue transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}

            <div className="mt-6 pt-6 border-t border-blue-500/20 text-xs text-blue-400/60 text-center">
              All communications are encrypted and handled securely.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactMethod({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="p-2 bg-blue-900/20 rounded-md border border-blue-500/20">{icon}</div>
      <div>
        <h4 className="text-sm font-medium text-blue-300">{title}</h4>
        <p className="text-blue-100/80">{value}</p>
      </div>
    </div>
  )
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-3 bg-blue-900/20 rounded-md border border-blue-500/20 text-blue-400 hover:text-blue-300 hover:border-blue-500/40 hover:glow-blue transition-all duration-300"
    >
      {icon}
    </a>
  )
}
