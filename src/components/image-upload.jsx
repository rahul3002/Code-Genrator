"use client"

import { useState } from 'react'
import { Upload, X, Loader2 } from 'lucide-react'
import { Button } from './ui/button'
import { Card } from './ui/card'
import Image from 'next/image'

export function ImageUpload({ onImageSelect, isLoading }) {
  const [preview, setPreview] = useState(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
        onImageSelect(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
        onImageSelect(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleClear = () => {
    setPreview(null)
    onImageSelect(null)
  }

  return (
    <Card
      className={`relative p-4 border-2 border-dashed ${
        preview ? 'border-primary' : 'border-muted-foreground'
      }`}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      {isLoading && (
        <div className="absolute inset-0 bg-background/80 flex items-center justify-center z-50">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      )}
      {preview ? (
        <div className="relative aspect-video w-full">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-10"
            onClick={handleClear}
          >
            <X className="h-4 w-4" />
          </Button>
          <Image
            src={preview}
            alt="Preview"
            fill
            className="object-contain"
          />
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center gap-2 cursor-pointer py-8">
          <Upload className="h-8 w-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Drop your design or click to upload
          </p>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      )}
    </Card>
  )
} 