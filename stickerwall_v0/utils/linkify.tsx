"use client"
import { ExternalLink } from "lucide-react"

interface LinkifyProps {
  text: string
  className?: string
}

export function Linkify({ text, className = "" }: LinkifyProps) {
  // Enhanced URL regex that catches more URL patterns
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.([a-zA-Z]{2,})(\/[^\s]*)?)/gi

  const parts = text.split(urlRegex)

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (urlRegex.test(part)) {
          // Ensure URL has protocol
          let url = part
          if (!part.startsWith("http://") && !part.startsWith("https://")) {
            url = "https://" + part
          }

          // Check if it's a YouTube URL for special styling
          const isYouTube = part.includes("youtube.com") || part.includes("youtu.be")

          return (
            <a
              key={index}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                inline-flex items-center gap-1 text-orange hover:text-orange/80 
                underline decoration-orange/50 hover:decoration-orange
                transition-colors duration-200 font-medium
                ${isYouTube ? "bg-red-50 px-1 py-0.5 rounded text-red-600 hover:text-red-700 decoration-red-400" : ""}
              `}
              onClick={(e) => e.stopPropagation()}
            >
              {isYouTube && <span className="text-red-500">▶</span>}
              {part}
              <ExternalLink size={12} className="opacity-70" />
            </a>
          )
        }
        return part
      })}
    </span>
  )
}

// Utility function to extract domain from URL for display
export function getDomainFromUrl(url: string): string {
  try {
    const domain = new URL(url.startsWith("http") ? url : `https://${url}`).hostname
    return domain.replace("www.", "")
  } catch {
    return url
  }
}

// Function to check if URL is a video/media link
export function isMediaUrl(url: string): boolean {
  const mediaPatterns = [
    /youtube\.com\/watch/i,
    /youtu\.be\//i,
    /vimeo\.com/i,
    /tiktok\.com/i,
    /instagram\.com\/p\//i,
    /twitter\.com\/.*\/status/i,
    /x\.com\/.*\/status/i,
  ]

  return mediaPatterns.some((pattern) => pattern.test(url))
}
