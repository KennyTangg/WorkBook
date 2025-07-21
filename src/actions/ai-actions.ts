"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { PAGE_SUMMARY_PROMPT } from "@/lib/prompts/page-summary";
import { EXTRACT_ACTIONS_PROMPT } from "@/lib/prompts/extract-actions";
import { QNA_PAGE_PROMPT } from "@/lib/prompts/qna-page";
import { createClient } from "@/utils/supabase/server";
import checkAndUpdateRateLimit  from "@/utils/checkRateLimit";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

function cleanAIResponse(text: string) {
  let cleaned = text.trim();
  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.slice(7);
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned.slice(3);
  }
  if (cleaned.endsWith("```")) {
    cleaned = cleaned.slice(0, -3);
  }
  return cleaned.trim();
}

export async function generatePageSummary(content: string) {
  const supabase = createClient();
  const { data: { user }} = await supabase.auth.getUser();
  const { allowed } = await checkAndUpdateRateLimit(user?.id || "anonymous");

  if (!allowed) {
    const error = new Error("Rate limit exceeded") as Error & { type?: string };
    error.type = "rate_limit";
    throw error;
  }

  const prompt = PAGE_SUMMARY_PROMPT.replace("{content}", content);
  const result = await model.generateContent(prompt);
  const raw = result.response.text().trim();
  const text = cleanAIResponse(raw);

  try {
    const json = JSON.parse(text);
    return json;
  } catch (error) {
    console.error("Failed to parse Gemini JSON:", error, raw);
    throw new Error("Invalid AI response", { cause: error });
  }
}

export async function extractActionItems(content: string) {
  const supabase = createClient();
  const { data: { user }} = await supabase.auth.getUser();
  const { allowed } = await checkAndUpdateRateLimit(user?.id || "anonymous");

  if (!allowed) {
    const error = new Error("Rate limit exceeded") as Error & { type?: string };
    error.type = "rate_limit";
    throw error;
  }

  const prompt = EXTRACT_ACTIONS_PROMPT.replace("{content}", content);
  const result = await model.generateContent(prompt);
  const raw = result.response.text().trim();
  const text = cleanAIResponse(raw);

  try {
    const json = JSON.parse(text);
    return json.action_items || [];
  } catch (error) {
    console.error("Failed to parse Gemini JSON:", error, raw);
    throw new Error("Invalid AI response", { cause: error });
  }
}

export async function askPageQuestion(content: string, question: string) {
  const supabase = createClient();
  const { data: { user }} = await supabase.auth.getUser();
  const { allowed } = await checkAndUpdateRateLimit(user?.id || "anonymous");

  if (!allowed) {
    const error = new Error("Rate limit exceeded") as Error & { type?: string };
    error.type = "rate_limit";
    throw error;
  }

  const prompt = QNA_PAGE_PROMPT
    .replace("{content}", content)
    .replace("{question}", question);

  const result = await model.generateContent(prompt);
  const raw = result.response.text().trim();
  const text = cleanAIResponse(raw);

  try {
    const json = JSON.parse(text);
    return json.answer;
  } catch (error) {
    console.error("Failed to parse Gemini JSON:", error, raw);
    throw new Error("Invalid AI response", { cause: error });
  }
}