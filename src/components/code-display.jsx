"use client"

import { useEffect } from 'react'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'
import { Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export function CodeDisplay({ code, language }) {
  useEffect(() => {
    hljs.highlightAll()
  }, [code])

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
  }

  return (
    <Card className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2"
        onClick={handleCopy}
      >
        <Copy className="h-4 w-4" />
      </Button>
      <pre className="p-4 overflow-auto">
        <code className={`language-${language}`}>
          {code}
        </code>
      </pre>
    </Card>
  )
} 