# AI Mailer - Automated Learning Digest Newsletter

An intelligent email automation system that sends personalized learning digests daily using AI-generated content. Built with Next.js, Supabase, Resend, and Groq AI.

## 🚀 Features

- **Automated Daily Emails**: Sends one learning digest email per day maximum
- **AI-Powered Content**: Uses Groq AI (GPT-OSS-120B) to generate educational content
- **Smart Scheduling**: Built-in limitation to prevent duplicate emails within 24 hours
- **Database Management**: Tracks pending and completed topics using Supabase
- **Cron Job Integration**: Can be automated using free services like cron-jobs.org
- **Progress Tracking**: Day N of M format for structured learning

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Email Service**: Resend.dev
- **AI Service**: Groq AI (GPT-OSS-120B)
- **Automation**: GitHub Actions / Cron Jobs
- **Language**: TypeScript/JavaScript

## 📋 Prerequisites

Before running this project, you'll need:

1. **Supabase Account & Database Setup**
   - Create two tables: `new_topics` and `learnt_topics`
   - Configure your environment variables

2. **Resend Account**
   - Get your API key from resend.dev
   - Verify your sending domain

3. **Groq AI Account**
   - Obtain your API key

4. **Environment Variables**
   Create a `.env.local` file with:
   ```
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   RESEND_API_KEY=your_resend_api_key
   GROQ_API_KEY=your_groq_api_key
   EMAIL_ADDRESS=your_email@domain.com
   ```

## 🗄️ Database Schema

### new_topics Table
- `id` (Primary Key)
- `Topic` (Text) - The main subject/title
- `Day` (Text) - Day tracking (e.g., "1/30")
- `Chapter` (Text) - Chapter/subtopic information
- `created_at` (Timestamp)

### learnt_topics Table
- `id` (Primary Key)
- `Topic` (Text)
- `Day` (Text)
- `Chapter` (Text)
- `created_at` (Timestamp)
- `sent_at` (Timestamp) - When the email was sent

## 🔧 API Routes

### `/api/send-digest` (GET)
The main endpoint that orchestrates the email sending process:

1. **Daily Limit Check**: Ensures only one email per day
2. **Fetch Topic**: Gets the next pending topic from `new_topics`
3. **AI Generation**: Uses Groq AI to generate HTML email content
4. **Email Sending**: Sends via Resend API
5. **Database Update**: Moves topic from `new_topics` to `learnt_topics`

### `/api/ai_draft` (POST)
Generates AI-powered email content including:
- Topic summary
- Key takeaways
- Code examples (when relevant)
- Quiz questions

### `/api/emailer` (POST)
Handles email sending via Resend API

## 🔄 Workflow Process

1. **Daily Trigger**: Cron job calls `/api/send-digest`
2. **Limit Check**: System verifies no email sent today
3. **Topic Selection**: Fetches first pending topic from database
4. **Content Generation**: AI creates educational digest
5. **Email Delivery**: Sends formatted HTML email
6. **Status Update**: Archives completed topic

## 📧 Email Format

**Subject**: `{Topic} - {Chapter} | {Day}`

**Content Structure**:
- Topic introduction
- Detailed summary
- Key takeaways
- Code examples (if applicable)
- Quiz question(s)

## 🚀 Deployment & Automation

### Option 1: GitHub Actions (Recommended)
Set up a scheduled workflow to run daily:

```yaml
name: Daily Email Dispatch
on:
  schedule:
    - cron: '0 9 * * *'  # 9 AM daily
jobs:
  send-email:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger email send
        run: curl https://your-domain.com/api/send-digest
```
You can set the URL as a secret in your GitHub repository settings (As it is in this project).

### Option 2: External Cron Service
Use free services like [cron-jobs.org](https://cron-jobs.org) to schedule daily requests to your `/api/send-digest` endpoint.

## 🔒 Security Features

- Environment variable protection
- Daily sending limits to prevent spam
- Error handling and logging
- Database transaction safety

## 🐛 Error Handling

The system includes comprehensive error handling for:
- Database connection issues
- AI service failures
- Email delivery problems
- Daily limit enforcement

## 📊 Monitoring

Check your application logs and:
- Supabase dashboard for database activity
- Resend dashboard for email delivery status
- Cron job service for automation logs

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues:
1. Check the console logs for error messages
2. Verify all environment variables are set correctly
3. Ensure your database tables are properly configured
4. Confirm your API keys are valid and have proper permissions

---

**Happy Learning!** 🎓✨