"use client"

import { useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from './ui/input'

export function CodeSearch({ history, onSearch }) {
  const [query, setQuery] = useState('')

  const handleSearch = (e) => {
    const value = e.target.value
    setQuery(value)
    
    const filtered = history.filter(item => 
      item.prompt.toLowerCase().includes(value.toLowerCase()) ||
      item.code.toLowerCase().includes(value.toLowerCase())
    )
    
    onSearch(filtered)
  }

  return (
    <div className="relative">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search code..."
        value={query}
        onChange={handleSearch}
        className="pl-8"
      />
    </div>
  )
} 