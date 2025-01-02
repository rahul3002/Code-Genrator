"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"

const templates = {
  javascript: {
    "React Component": `function Component() {\n  return (\n    <div>\n      \n    </div>\n  )\n}`,
    "API Route": `export default async function handler(req, res) {\n  if (req.method === 'POST') {\n    \n  }\n}`,
  },
  python: {
    "FastAPI Route": `@app.get("/")\ndef read_root():\n    return {"Hello": "World"}`,
    "Class Definition": `class MyClass:\n    def __init__(self):\n        pass`,
  }
}

export function TemplateSelector({ language, onSelect }) {
  return (
    <Select onValueChange={onSelect}>
      <SelectTrigger>
        <SelectValue placeholder="Choose template..." />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(templates[language] || {}).map(([name, code]) => (
          <SelectItem key={name} value={code}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
} 