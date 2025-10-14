import { NextResponse } from "next/server";
import axios from "axios";
import { fetchNewTopics_FirstRow, addToLearntTopics, deleteNewTopics } from "@/app/lib/topics_list_DB";


// To the AI Route:
export async function GET() {
    try {
        // Get the host from the request headers
        // const host = request.headers.get('host') || 'localhost:3000';
        // const protocol = host.includes('localhost') ? 'http' : 'https';
        // const baseUrl = `${protocol}://${host}`;

        // Use absolute URL for server-side requests
        // const aiResponse = await axios.post(`${baseUrl}/api/ai_draft`, {


        // Database Fetch:
        let topic = "What is Trigonometry?"
        let chapter = 'Mathematics - Deep Dive'

        // AI Draft:
        const aiResponse = await axios.post(`http://localhost:3000/api/ai_draft`, {
            topic: topic,
            chapter: chapter
        });

        let textResponse = aiResponse.data.text

        // Send the email:
        const sendMail = await axios.post(`http://localhost:3000/api/emailer`, {
            email: process.env.EMAIL_ADDRESS,   
            subject: `${topic} - ${chapter}`,
            html: textResponse
        });

        return NextResponse.json({ data: textResponse, sendMail: sendMail.data });  
    } catch (error) {
        console.error('Error in test route:', error);
        return NextResponse.json({ error: 'Failed to fetch AI response' }, { status: 500 });
    }
}



// import emailSample from "@/app/ui/example_email";

// // To the Mailer route:
// export async function GET(request: Request) {
//     try {
//         // Use absolute URL for server-side requests
//         const sendMail = await axios.post(`http://localhost:3000/api/emailer`, {
//             email: 'tomandlinus@gmail.com',
//             subject: 'Test Email',
//             html: emailSample
//         });

//         // console.log(sendMail);

//         return NextResponse.json({ data: sendMail.data });
//     } catch (error) {
//         console.error('Error in test route:', error);
//         return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
//     }
// }
