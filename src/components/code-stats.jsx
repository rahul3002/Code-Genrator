"use client"

import { Card } from "./ui/card"

export function CodeStats({ code }) {
  const stats = {
    lines: code.split('\n').length,
    characters: code.length,
    words: code.split(/\s+/).length,
  }

  return (
    <div className="flex gap-2">
      {Object.entries(stats).map(([key, value]) => (
        <Card key={key} className="p-2">
          <p className="text-xs text-muted-foreground capitalize">{key}</p>
          <p className="text-lg font-bold">{value}</p>
        </Card>
      ))}
    </div>
  )
} 