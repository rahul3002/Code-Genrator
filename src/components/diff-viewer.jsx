"use client"

import { useState } from 'react'
import { diffLines } from 'diff'
import { Card } from './ui/card'
import { ScrollArea } from './ui/scroll-area'

export function DiffViewer({ oldCode, newCode }) {
  const diff = diffLines(oldCode, newCode)
  
  return (
    <Card className="w-full h-[500px]">
      <ScrollArea className="h-full">
        <pre className="p-4">
          {diff.map((part, index) => (
            <div
              key={index}
              className={cn(
                "font-mono text-sm",
                part.added && "bg-green-500/10 text-green-700",
                part.removed && "bg-red-500/10 text-red-700"
              )}
            >
              {part.value}
            </div>
          ))}
        </pre>
      </ScrollArea>
    </Card>
  )
} 