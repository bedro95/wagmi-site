import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { message, context } = await req.json();
    
    // تأكد من أن هذا المفتاح فعال (أو استبدله بمفتاحك الخاص من Google AI Studio)
    const genAI = new GoogleGenerativeAI("AIzaSyBLkZt6NrBn58Zc0-xO0cz-Ga_9TgK7Lng");
    
    // استخدمنا موديل pro لضمان جودة الرد وسرعته
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: `You are Wagmi Assistant. User info: ${context}. Question: ${message}. Answer briefly in English.` }] }],
      generationConfig: {
        maxOutputTokens: 200,
        temperature: 0.7,
      },
    });

    const response = await result.response;
    return NextResponse.json({ text: response.text() });
    
  } catch (error: any) {
    // هذا السطر سيطبع الخطأ الحقيقي في لوحة تحكم Vercel لنعرف السبب
    console.error("DEBUG AI ERROR:", error.message);
    return NextResponse.json({ text: "AI Service is busy. Please try one more time." });
  }
}