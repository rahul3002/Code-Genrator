"use client"

import { Input } from './ui/input'
import { Button } from './ui/button'
import { useState } from 'react'

export function FigmaInput({ onFigmaLink }) {
  const [link, setLink] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (link.includes('figma.com')) {
      onFigmaLink(link)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        placeholder="Paste Figma link here..."
        value={link}
        onChange={(e) => setLink(e.target.value)}
        className="flex-1"
      />
      <Button type="submit" disabled={!link.includes('figma.com')}>
        Import
      </Button>
    </form>
  )
} 