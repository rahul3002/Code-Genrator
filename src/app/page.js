// app/page.js
'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ThemeToggle } from "@/components/theme-toggle";
import { CodeDisplay } from "@/components/code-display";
import { CodeHistory } from "@/components/code-history";
import { Loader2, PanelLeftOpen, PanelLeftClose } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ShareButton } from "@/components/share-button";
import { ExportButton } from "@/components/export-button";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { SettingsPanel } from "@/components/settings-panel";
import { CodeSearch } from "@/components/code-search";
import { TemplateSelector } from "@/components/template-selector";
import { CodeStats } from "@/components/code-stats";

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt, 
          language: selectedLanguage 
        }),
      });

      const data = await response.json();

      // Check if the response contains an error
      if (data.error) {
        throw new Error(data.error);
      }

      // Extract the generated code from the response
      const generatedCode = data.code;
      
      if (!generatedCode) {
        throw new Error('No code was generated');
      }

      setCode(generatedCode);
      setHistory(prev => [...prev, {
        prompt,
        code: generatedCode,
        language: selectedLanguage,
        timestamp: new Date().toISOString()
      }]);

      toast({
        title: "Success",
        description: "Code generated successfully"
      });

    } catch (error) {
      console.error('Generation Error:', error);
      setError(error.message);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <div className="flex flex-col w-1/2 p-6 border-r">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">AI Code Generator</h1>
            <p className="text-muted-foreground">Generate code using AI</p>
          </div>
          <div className="flex items-center gap-2">
            <SettingsPanel />
            <ThemeToggle />
          </div>
        </div>
        <CodeSearch history={history} onSearch={setFilteredHistory} />
        <TemplateSelector language={selectedLanguage} onSelect={setPrompt} />

        <div className="flex flex-col gap-4 h-full">
          <Select
            value={selectedLanguage}
            onValueChange={setSelectedLanguage}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="java">Java</SelectItem>
              <SelectItem value="cpp">C++</SelectItem>
            </SelectContent>
          </Select>

          <Textarea
            placeholder="Describe what you want to create..."
            className="flex-1 min-h-[200px] p-4 resize-none"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={loading}
          />

          <Button 
            onClick={handleGenerate} 
            disabled={loading || !prompt.trim()}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : 'Generate Code'}
          </Button>

          {error && (
            <div className="bg-destructive/10 text-destructive p-4 rounded-md">
              {error}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col w-1/2 p-6 bg-muted/30">
        <div className="flex justify-end gap-2 mb-4">
          <ShareButton code={code} language={selectedLanguage} />
          <ExportButton code={code} language={selectedLanguage} />
        </div>
        {code ? (
          <CodeDisplay code={code} language={selectedLanguage} />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Generated code will appear here
          </div>
        )}
      </div>

      {showHistory && (
        <CodeHistory 
          history={filteredHistory.length > 0 ? filteredHistory : history} 
          onSelect={(item) => {
            setPrompt(item.prompt)
            setSelectedLanguage(item.language)
            setCode(item.code)
          }} 
        />
      )}
    </div>
  );
}
