import { NextResponse } from "next/server";
import systemPrompt from "@/app/ui/systemPrompt";
import emailSample from "@/app/ui/example_email";
import { groq } from "@ai-sdk/groq";
// import { browserSearch, groq } from "@ai-sdk/groq";
import { generateText } from "ai";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { topic, chapter } = body;

    if (!topic) {
      return NextResponse.json(
        { error: "Missing topic" },
        { status: 400 }
      );
    }

    const chapterExists = chapter ? `, on chapter: ${chapter}` : " "; // Send only if the chapter valule exists
    const prompt = `Write an article on the topic: ${topic} ${chapterExists} \n\n Email sample: ${emailSample}`;

    // Tool Call
    const { text } = await generateText({
      // model: groq("openai/gpt-oss-120b"),
      model: groq("openai/gpt-oss-20b"),
      system: systemPrompt,
      prompt,
      // tools: { browser_search: groq.tools.browserSearch({}) },
      // toolChoice: "auto",
    });
    // ----------


    return NextResponse.json({ text });
  } catch (error) {
    console.error("Error generating article:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
