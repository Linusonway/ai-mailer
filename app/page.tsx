"use client"
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [techStack, setTechStack] = useState(['Supabase', 'Next.js', 'Resend', 'Groq', 'GPT-OSS', 'AI SDK', 'Github Actions']);

  return (
    <>
      The AI Mailer,

      check the API route.

      <div className="routes">
        <p>
          <Link href="/api/test">/api/test</Link> </p>
        <p>
          <Link href="/api/send-digest">/api/send-digest</Link> </p>
      </div>

      <br /><br />
      <div className="text-lg"> Built using,</div>
      {techStack.map((item, index) => (
        <p className="text-md" key={index}>&nbsp; - {item}</p>
      ))}
    </>
  );
}