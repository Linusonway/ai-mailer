import { NextResponse } from "next/server";
import systemPrompt from "@/app/ui/systemPrompt";
import emailSample from "@/app/ui/example_email";
import { groq } from "@ai-sdk/groq";
// import { browserSearch, groq } from "@ai-sdk/groq";
import { generateText } from "ai";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { Topic, Chapter } = body;

    if (!Topic) {
      return NextResponse.json(
        { error: "Missing Topic" },
        { status: 400 }
      );
    }

    const ChapterExists = Chapter ? `, on Chapter: ${Chapter}` : " "; // Send only if the Chapter valule exists
    const prompt = `Write an article on the Topic: ${Topic} ${ChapterExists} \n\n Email sample: ${emailSample}`;

    // Tool Call
    const { text } = await generateText({
      // model: groq("openai/gpt-oss-120b"),
      model: groq("openai/gpt-oss-120b"),
      system: systemPrompt,
      prompt,
      tools: { browser_search: groq.tools.browserSearch({}) },
      toolChoice: "auto",
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
