Project Summary

I want to build an automated learning digest newsletter system.

The system should run once per day using GitHub Actions (scheduled workflow).

It will use a database (Supabase) to store an array of topics I want to learn.

Table/collection: new_topics (pending topics)

Table/collection: learnt_topics (archive of learnt digests)

Each topic has: id, title, status, day_number, date_sent.




Each day, the system should:

Fetch the next pending topic from the DB.

Use an AI SDK (Using Groq AI -- Gpt-oss-120b) to generate a digest:

Summary of the topic

Key takeaways

Short code examples (if relevant)

At least one quiz question at the end



Format the digest into an HTML email with:

Subject line: Day N of M – {Topic Title}

Body: structured content + quiz question (Can Use MD format)

Send the email using Resend API.


Update the DB:

Mark the topic as learnt and archive it in learnt_topics.

Folder structure should be modular:

/db for database queries

/llm for AI generation logic

/email for email formatting + sending

/scripts for the daily job (daily.js)

The goal:

A self-running personal newsletter that helps me learn React, Next.js, AI, and web dev concepts.

Each digest is personalized, tracks progress (Day N of M), and encourages learning with a quiz.


My tech stack:
Next.js + GitHub Actions (Coding services)

Resend (Mail) + Supabase DB (Saas)

GPT OSS (Using Groq) + AI SDK (AI services)