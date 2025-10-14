import { NextResponse } from "next/server";
import { fetchNewTopics_FirstRow, addToLearntTopics, deleteNewTopics } from "@/app/lib/topics_list_DB";

export async function GET() {
  // Actual Workflow:
  // -- Call all the routes one by one and only delete or send the topic if it has been sent.

  const newTopics = await fetchNewTopics_FirstRow()
  if (newTopics[0] === "An error occured") {
    return NextResponse.json({ error: "An error occured" })
  }
  await addToLearntTopics(newTopics[0])
  // await deleteNewTopics(newTopics[0])

  return NextResponse.json({ newTopics })
}