"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, X, FileText, CheckCircle, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generatePageSummary, extractActionItems, askPageQuestion } from "@/actions/ai-actions";
import AIResultOutput, { SummaryResult } from "./ai-result";
import { Block } from "@/types";

function useAutoResizeTextarea({ minHeight, maxHeight }: { minHeight: number; maxHeight?: number }) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback((reset?: boolean) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = `${minHeight}px`;
    if (!reset) {
      const newHeight = Math.max(
        minHeight,
        Math.min(textarea.scrollHeight, maxHeight ?? Number.POSITIVE_INFINITY)
      );
      textarea.style.height = `${newHeight}px`;
    }
  }, [minHeight, maxHeight]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) textarea.style.height = `${minHeight}px`;
  }, [minHeight]);

  useEffect(() => {
    const handleResize = () => adjustHeight();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [adjustHeight]);

  return { textareaRef, adjustHeight };
}

interface AIToolsProps {
  blocks: Block[];
}

const AITools = ({ blocks }: AIToolsProps) => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SummaryResult | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({ minHeight: 48, maxHeight: 164 });

  const pageContent = blocks.map((b) => b.content).join("\n");

  const handleSummary = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const data = await generatePageSummary(pageContent);
      setResult(data);
    } catch (err: any) {
    if (err?.type === "rate_limit" || err.message?.includes("Rate limit exceeded")) {
      setErrorMessage("You've hit the AI usage limit. Please try again later.");
    } else {
      setErrorMessage("Something went wrong while generating the summary.");
    }
    } finally {
      setLoading(false);
    }
  };

  const handleActions = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const data = await extractActionItems(pageContent);
      const hasItems = Array.isArray(data) && data.length > 0;
      setResult({
        title: "Action Items",
        summary: hasItems
          ? "Here are the key action items."
          : "No actionable items were found from the page content.",
        key_points: hasItems ? data : ["Try rephrasing the content or asking a different question."],
      });
    } catch (err: any) {
      if (err?.type === "rate_limit" || err.message?.includes("Rate limit exceeded")) {
        setErrorMessage("You've hit the AI usage limit. Please try again later.");
      } else {
        setErrorMessage("Something went wrong while generating the summary.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleQnA = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const data = await askPageQuestion(pageContent, value);
      setResult({
        title: "Answer",
        summary: data,
        key_points: [],
      });
      setValue("");
      adjustHeight(true);
    } catch (err: any) {
      if (err?.type === "rate_limit" || err.message?.includes("Rate limit exceeded")) {
        setErrorMessage("You've hit the AI usage limit. Please try again later.");
      } else {
        setErrorMessage("Something went wrong while generating the summary.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
        <button
        className="fixed bottom-4 right-4 z-50 bg-primary hover:bg-primary/90 text-white 
                    p-3 sm:p-4 rounded-full shadow-md sm:shadow-lg transition 
                    sm:bottom-6 sm:right-6"
        onClick={() => setIsOpen(!isOpen)}
        >
        {isOpen ? <X className="size-5 sm:size-6" /> : <Bot className="size-5 sm:size-6 animate-pulse" />}
        </button>
        <AnimatePresence>
        {isOpen && (
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="fixed bottom-0 left-0 right-0 z-50 sm:bottom-20 sm:right-4 sm:left-auto sm:w-[360px]"
            >
            <Card className="max-h-[80vh] sm:max-h-[70vh] sm:rounded-xl overflow-y-auto shadow-xl">
                <CardHeader className="flex items-center justify-between mb-2">
                    <CardTitle className="flex items-center gap-2">
                        <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 1.5, repeat: Infinity }} >
                            <Bot className="w-5 h-5 text-primary" />
                        </motion.div>
                        AI Assistant
                    </CardTitle>
                    <button className="sm:hidden text-muted-foreground hover:text-foreground" onClick={() => setIsOpen(false)} >
                        <X className="w-5 h-5" />
                    </button>
                </CardHeader>

                <CardContent className="space-y-4">
                {errorMessage && (
                  <div className="text-sm text-red-500 bg-red-100 dark:bg-red-900/20 rounded p-3">
                    {errorMessage}
                  </div>
                )}
                {loading ? (
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <motion.div
                            className="rounded-full w-3 h-3 bg-primary animate-ping"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 1 }}
                        />
                        Generating response...
                    </div>
                ) : (
                    <AIResultOutput result={result} />
                )}

                <div className="flex flex-wrap gap-2 mt-2">
                    <button 
                        onClick={handleSummary}
                        disabled={loading}
                        className="flex items-center gap-1 rounded-full border px-4 py-1.5 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    >
                    <FileText className="size-4 text-primary" /> Summary
                    </button>
                    <button
                        onClick={handleActions}
                        disabled={loading}
                        className="flex items-center gap-1 rounded-full border px-4 py-1.5 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    >
                    <CheckCircle className="size-4 text-primary" /> Actions
                    </button>
                </div>

                <div className="relative border rounded-2xl bg-neutral-100 dark:bg-neutral-800 p-1">
                    <Textarea
                    ref={textareaRef}
                    value={value}
                    placeholder="Ask a question about this page..."
                    className="w-full bg-transparent border-none resize-none focus-visible:ring-0 text-sm px-3 py-2"
                    onChange={(e) => {
                        setValue(e.target.value);
                        adjustHeight();
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleQnA();
                        }
                    }}
                    />
                    <div className="absolute right-2 bottom-2">
                    <button
                        onClick={handleQnA}
                        disabled={loading || !value.trim()}
                        className={cn(
                        "rounded-full p-2",
                        value.trim()
                            ? "bg-primary/10 text-primary hover:bg-primary/20"
                            : "text-muted-foreground"
                        )}
                    >
                        <Send className="w-4 h-4" />
                    </button>
                    </div>
                </div>
                </CardContent>
            </Card>
            </motion.div>
            )}
        </AnimatePresence>
    </>
  );
};

export default AITools;
