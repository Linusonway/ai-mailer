import { NextResponse } from "next/server";
import axios from "axios";
import { fetchNewTopics_FirstRow, addToLearntTopics, deleteNewTopics } from "@/app/lib/topics_list_DB";

export async function GET(request: Request) {
    try {
        // Get the host from the request headers
        const host = request.headers.get('host') || 'localhost:3000';
        const protocol = host.includes('localhost') ? 'http' : 'https';
        const baseUrl = `${protocol}://${host}`;

        // DB data fetch:
        let topics = await fetchNewTopics_FirstRow();
        let {Topic, Day, Chapter} = topics;


        // AI Draft:
        const aiResponse = await axios.post(`${baseUrl}/api/ai_draft`, {
            Topic: Topic,
            Chapter: Chapter
        });
        let textResponse = aiResponse.data.text

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

        return NextResponse.json({ data: textResponse, sendMail: sendMail.data });  
    } catch (error) {
        console.error('Error in test route:', error);
        return NextResponse.json({ error: 'Failed to fetch AI response' }, { status: 500 });
    }
}
