'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export interface SummaryResult {
  title: string
  summary?: string
  key_points?: (string | {
    task: string
    due_date?: string | null
    assignee?: string | null
  })[]
}

interface AIResultOutputProps {
  result: SummaryResult | null
}

const AIResultOutput = ({ result }: AIResultOutputProps) => {
  if (!result) return null;

  return (
    <Card
      className="
        mt-4 
        bg-gray-100 dark:bg-[#1f1f1f] 
        border border-muted 
        transition-colors
      "
    >
      <CardHeader>
        <CardTitle>{result.title}</CardTitle>
        {result.summary && (
          <CardDescription className="text-muted-foreground">
            {result.summary}
          </CardDescription>
        )}
      </CardHeader>
      <Separator />
      <CardContent className="space-y-4">
        {result.key_points && result.key_points.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold mb-1">Tasks</h4>
            <div className="space-y-3">
              {result.key_points.map((point, idx) => {
                if (typeof point === "string") {
                  return (
                    <p key={idx} className="text-sm text-muted-foreground">
                      • {point}
                    </p>
                  )
                } else {
                  return (
                    <div
                      key={idx}
                      className="
                        p-3 
                        border rounded-lg 
                        text-sm 
                        bg-white dark:bg-[#2a2a2a]
                        border-muted
                      "
                    >
                      <p><strong className="font-medium">Task:</strong> {point.task}</p>
                      <p><strong className="font-medium">Due:</strong> {point.due_date || "Not specified"}</p>
                      <p><strong className="font-medium">Assignee:</strong> {point.assignee || "Unassigned"}</p>
                    </div>
                  )
                }
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default AIResultOutput;