"use client"

import { Card } from "./ui/card"
import { ScrollArea } from "./ui/scroll-area"
import { formatDistanceToNow } from "date-fns"

export function CodeHistory({ history, onSelect }) {
  return (
    <Card className="w-64 h-full border-r">
      <ScrollArea className="h-full p-4">
        <h3 className="font-semibold mb-4">History</h3>
        <div className="space-y-2">
          {history.map((item, index) => (
            <Card
              key={index}
              className="p-3 cursor-pointer hover:bg-accent"
              onClick={() => onSelect(item)}
            >
              <p className="text-sm font-medium truncate">{item.prompt}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-muted-foreground">{item.language}</span>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </Card>
  )
} 