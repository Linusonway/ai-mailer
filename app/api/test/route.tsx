// import { NextResponse } from "next/server";
// import axios from "axios";
// import { fetchNewTopics_FirstRow, addToLearntTopics, deleteNewTopics } from "@/app/lib/topics_list_DB";


// // To the AI Route:
// export async function GET(request: Request) {
//     try {
//         // Get the host from the request headers
//         const host = request.headers.get('host') || 'localhost:3000';
//         const protocol = host.includes('localhost') ? 'http' : 'https';
//         const baseUrl = `${protocol}://${host}`;

//         // DB data fetch:
//         let topics = await fetchNewTopics_FirstRow();
//         let {Topic, Day, Chapter} = topics;


//         // AI Draft:
//         const aiResponse = await axios.post(`${baseUrl}/api/ai_draft`, {
//             Topic: Topic,
//             Chapter: Chapter
//         });
//         let textResponse = aiResponse.data.text

//         // Send the email:
//         const sendMail = await axios.post(`${baseUrl}/api/emailer`, {
//             email: process.env.EMAIL_ADDRESS,   
//             subject: `${Topic} - ${Chapter} | ${Day}`,
//             html: textResponse
//         });
        
//         // DB transfer & deletion:
//         // Only transfer & delete if both previous calls succeeded
//         if (aiResponse.status === 200 && sendMail.status === 200) {

//             await addToLearntTopics(topics); // Add to Learnt Topics:
//             await deleteNewTopics(topics); // Delete from New Topics:
//         }

//         return NextResponse.json({ data: textResponse, sendMail: sendMail.data });  
//     } catch (error) {
//         console.error('Error in test route:', error);
//         return NextResponse.json({ error: 'Failed to fetch AI response' }, { status: 500 });
//     }
// }





// import emailSample from "@/app/ui/example_email";

// // To the Mailer route:
// export async function GET(request: Request) {
//     try {
//         // Use absolute URL for server-side requests
//         const sendMail = await axios.post(`http://localhost:3000/api/emailer`, {
//             email: process.env.EMAIL_ADDRESS,   
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



// // DB route test:
// export async function GET(request: Request) {
//     try {

//         // DB call:

//         let topics = await fetchNewTopics_FirstRow();
//         let {id, Topic, Day, Chapter} = topics;
//         // Add to Learnt Topics:
//         await addToLearntTopics(topics);
//         // Delete from New Topics:
//         await deleteNewTopics(topics);

//         console.log("sent the mail!!!")
//         return NextResponse.json({ data: topics });
//     } catch (error) {
//         console.error('Error in test route:', error);
//         return NextResponse.json({ error: 'Failed to fetch topics' }, { status: 500 });
//     }
// }