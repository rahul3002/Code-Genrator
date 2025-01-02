"use client"

import { Button } from "./ui/button"
import { Share2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function ShareButton({ code, language }) {
  const { toast } = useToast()

  const handleShare = async () => {
    try {
      const response = await fetch('/api/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language })
      })
      
      const { shareUrl } = await response.json()
      await navigator.clipboard.writeText(shareUrl)
      
      toast({
        title: "Link copied!",
        description: "Share link has been copied to clipboard"
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate share link",
        variant: "destructive"
      })
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={handleShare}>
      <Share2 className="h-4 w-4 mr-2" />
      Share
    </Button>
  )
} 