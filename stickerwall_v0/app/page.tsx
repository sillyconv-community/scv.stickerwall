"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"
import { X, Instagram } from "lucide-react"
import Image from "next/image"
import { VibeMessage } from "@/components/vibe-message"

const supabaseUrl = "https://cegaqgovzbqovefquoxw.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlZ2FxZ292emJxb3ZlZnF1b3h3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3MTUwMDUsImV4cCI6MjA2NzI5MTAwNX0.-UGyAieQrtZlkUuWuV2Zkbjlqpw1RyqJsPYC7KhIJyE"

const supabase = createClient(supabaseUrl, supabaseAnonKey)
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

interface Vibe {
  id: number
  emoji: string
  message: string
  name?: string
  created_at: string
}

export default function VibeWall() {
  const [selectedEmoji, setSelectedEmoji] = useState("🔥")
  const [message, setMessage] = useState("")
  const [name, setName] = useState("")
  const [vibes, setVibes] = useState<Vibe[]>([])
  const [showPopup, setShowPopup] = useState(false)

  const emojis = ["🔥", "🎧", "💡", "🤘🏻", "😴"]

  useEffect(() => {
    loadVibes()

    const channel = supabase
      .channel("public:vibes")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "vibes" }, loadVibes)
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const loadVibes = async () => {
    const { data } = await supabase.from("vibes").select("*").order("created_at", { ascending: false }).limit(10)

    if (data) {
      setVibes(data)
    }
  }

  const handleSubmit = async () => {
    if (!message.trim()) return

    const vibeData = {
      emoji: selectedEmoji,
      message: message.trim(),
      ...(name.trim() && { name: name.trim() }),
    }

    await supabase.from("vibes").insert([vibeData])

    setMessage("")
    setName("")
    setShowPopup(true)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="min-h-screen bg-cream p-6 font-sans">
      <div className="max-w-2xl mx-auto">
        {/* Header with Logo */}
        <div className="text-center mb-8">
          <div className="mb-6">
            <Image
              src={`${basePath}/brand-logo.png`}
              alt="Brand Logo"
              width={200}
              height={150}
              className="mx-auto rounded-lg shadow-lg"
            />
          </div>
          <h1 className="text-4xl font-bold text-olive-dark mb-2">SILLY CONV. VALLEY</h1>
          <p className="text-olive text-lg">歡迎登陸 "啱 VIBE 留言板🌴" <br /> 此網站是來自廣東話 Podcast SILLY CONV. VALLEY EP.25 中的 <br />即興 VIBE CODE 環節！</p>
        </div>

        {/* Emoji Selection */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6 border border-sage/20">
          <h3 className="text-olive-dark font-semibold mb-4 text-lg">Choose your vibe:</h3>
          <div className="flex gap-3 justify-center flex-wrap">
            {emojis.map((emoji) => (
              <button
                key={emoji}
                onClick={() => setSelectedEmoji(emoji)}
                className={`text-4xl p-3 rounded-xl transition-all duration-200 hover:scale-110 ${
                  selectedEmoji === emoji ? "bg-sage ring-4 ring-orange shadow-lg" : "bg-cream hover:bg-sage/30"
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8 border border-sage/20">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-olive-dark font-medium mb-2">
                Your name (optional)
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name..."
                className="w-full p-3 rounded-xl border-2 border-sage/30 focus:border-orange focus:outline-none transition-colors bg-cream/50"
                onKeyPress={handleKeyPress}
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-olive-dark font-medium mb-2">
                Your message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Say something... (URLs will be automatically made clickable!)"
                rows={3}
                className="w-full p-3 rounded-xl border-2 border-sage/30 focus:border-orange focus:outline-none transition-colors bg-cream/50 resize-none"
                onKeyPress={handleKeyPress}
              />
              <p className="text-xs text-sage mt-1">
                💡 Tip: Paste YouTube, Instagram, or any web links - they&apos;ll become clickable!
              </p>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!message.trim()}
              className="w-full bg-orange hover:bg-orange/90 disabled:bg-sage/50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
            >
              Send Vibe {selectedEmoji}
            </button>
          </div>
        </div>

        {/* Live Vibes Feed */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-sage/20">
          <h2 className="text-2xl font-bold text-olive-dark mb-6 flex items-center gap-2">
            Live Vibes
            <span className="text-orange">✨</span>
          </h2>

          <div className="space-y-4">
            {vibes.length === 0 ? (
              <p className="text-olive text-center py-8">No vibes yet. Be the first to share!</p>
            ) : (
              vibes.map((vibe) => (
                <div
                  key={vibe.id}
                  className="bg-cream/50 rounded-xl p-4 border border-sage/20 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-3xl flex-shrink-0">{vibe.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <VibeMessage message={vibe.message} className="font-medium mb-2" />
                      {vibe.name && <p className="text-olive text-sm mt-1">— {vibe.name}</p>}
                      <p className="text-sage text-xs mt-2">{new Date(vibe.created_at).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl border border-sage/20">
            <div className="text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-olive-dark mb-4">Vibe Shared!</h3>
              <p className="text-olive mb-6">
                Thanks for sharing your vibe! Connect with us on social media for more fun content.
              </p>

              <a
                href="https://www.instagram.com/sillyconv.valley"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg mb-4"
              >
                <Instagram size={20} />
                Follow us on Instagram
              </a>

              <div>
                <button
                  onClick={() => setShowPopup(false)}
                  className="inline-flex items-center gap-2 text-olive hover:text-olive-dark transition-colors"
                >
                  <X size={16} />
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
