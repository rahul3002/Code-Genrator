"use client"

import { Download } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Button } from "./ui/button"

export function ExportButton({ code, language }) {
  const handleExport = (format) => {
    const element = document.createElement("a")
    const file = new Blob([code], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = `code.${format}`
    document.body.appendChild(element)
    element.click()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => handleExport(language)}>
          As {language} file
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('txt')}>
          As Text file
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 