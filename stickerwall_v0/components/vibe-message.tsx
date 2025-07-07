import { Linkify, isMediaUrl } from "@/utils/linkify"

interface VibeMessageProps {
  message: string
  className?: string
}

export function VibeMessage({ message, className = "" }: VibeMessageProps) {
  // Check if message contains media URLs for special handling
  const hasMediaUrl = isMediaUrl(message)

  return (
    <div className={`${className} ${hasMediaUrl ? "border-l-4 border-orange/30 pl-3" : ""}`}>
      <Linkify text={message} className="text-olive-dark leading-relaxed" />
      {hasMediaUrl && (
        <div className="mt-2 text-xs text-sage flex items-center gap-1">
          <span>🎬</span>
          <span>Media content shared</span>
        </div>
      )}
    </div>
  )
}
