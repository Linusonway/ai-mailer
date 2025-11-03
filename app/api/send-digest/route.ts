import { NextResponse } from "next/server";
import axios from "axios";
import { fetchNewTopics_FirstRow, addToLearntTopics, deleteNewTopics, getLastEmailDate } from "@/app/lib/topics_list_DB";

export async function GET(request: Request) {
    try {
        // Check if email already sent today
        const lastEmailDate = await getLastEmailDate();
        if (lastEmailDate) {
            const lastSent = new Date(lastEmailDate);
            const today = new Date();
            if (lastSent.toDateString() === today.toDateString()) {
                return NextResponse.json({ message: 'Email already sent today' }, { status: 429 });
            }   
        }

        // Get the host from the request headers
        const host = request.headers.get('host') || 'localhost:3000';
        const protocol = host.includes('localhost') ? 'http' : 'https';
        const baseUrl = `${protocol}://${host}`;

        // DB data fetch:
        const topics = await fetchNewTopics_FirstRow();
        const {Topic, Day, Chapter} = topics;
        // const {Topic, Day, Chapter} = {"Topic": "What is bayesian statistics", "Day": "1/1", "Chapter": "Mathematics in programming."};

        if (!Topic) {
            return NextResponse.json({ error: 'Topic is missing' }, { status: 400 });
        }

        // AI Draft:
        const aiResponse = await axios.post(`${baseUrl}/api/ai_draft`, {
            Topic: Topic,
            Chapter: Chapter
        });
        const textResponse = aiResponse.data.text

        // Send the email:
        const sendMail = await axios.post(`${baseUrl}/api/emailer`, {
            email: process.env.EMAIL_ADDRESS,   
            subject: `${Topic} - ${Chapter} | ${Day}`,
            html: textResponse
        });
        
        // DB transfer & deletion:
        // Only transfer & delete if both previous calls succeeded
        if (aiResponse.status === 200 && sendMail.status === 200) {
            await addToLearntTopics(topics); // Add to Learnt Topics:
            await deleteNewTopics(topics); // Delete from New Topics:
        }

        return NextResponse.json({ aidata: (textResponse? 'Success' : 'Failed'), sendMail: sendMail.data });   
    } catch (error) {
        console.error('Error in test route:', error);
        return NextResponse.json({ error: 'Failed to fetch AI response' }, { status: 500 });
    }
}
