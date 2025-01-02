"use client"

import { Button } from "./ui/button"
import { Settings2 } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import { Label } from "./ui/label"
import { Switch } from "./ui/switch"

export function SettingsPanel() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings2 className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
        </SheetHeader>
        <div className="space-y-4 py-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="auto-save">Auto-save history</Label>
            <Switch id="auto-save" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="line-numbers">Show line numbers</Label>
            <Switch id="line-numbers" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="word-wrap">Word wrap</Label>
            <Switch id="word-wrap" />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
} 