"use client"
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const techStack = ['Supabase', 'Next.js', 'Resend', 'Groq', 'GPT-OSS', 'AI SDK'];

  return (
    <>
      The AI Mailer,

      check the API route.

      <div className="routes">
        <p>
          <Link href="/api/test">Testing route: api/test</Link> </p>
        <p>
          <div>Digest route: /api/send-digest</div> </p>
      </div>

      <br /><br />
      <div className="text-lg"> Built using,</div>
      {techStack.map((item, index) => (
        <p className="text-md" key={index}>&nbsp; - {item}</p>
      ))}
    </>
  );
}