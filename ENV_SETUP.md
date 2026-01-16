# 🔧 Environment Setup Guide

## Quick Summary

**Good news!** Resumify requires **NO environment variables** to run. 🎉

This application uses [Puter.js](https://puter.com/), a client-side SDK that handles authentication, file storage, and AI capabilities without any server-side configuration.

---

## How Puter.js Works

Puter.js provides all the backend functionality your app needs, directly in the browser:

| Feature | Description |
|---------|-------------|
| 🔐 **Authentication** | OAuth-style popup authentication, no setup needed |
| 💾 **File Storage** | Cloud storage for uploaded resumes (up to 10GB free) |
| 🤖 **AI Integration** | Access to GPT-4, Claude, and other models |
| 📦 **Key-Value Store** | Persistent data storage for resume analysis |

### User-Paid Model

The unique aspect of Puter.js is that:
- **You (the developer)** don't need API keys or pay for AI usage
- **Users** authenticate with their Puter account
- **AI costs** are borne by the users (through their Puter account)

This means you can run the app with zero configuration!

---

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

### 3. Open Your Browser

Navigate to [http://localhost:5173](http://localhost:5173)

That's it! The app is ready to use.

---

## Optional Configuration

While no environment variables are required, you can optionally configure these for production:

### Production Settings

Create a `.env` file in the root directory:

```env
# Node environment
NODE_ENV=production

# Server port (for production builds)
PORT=3000
```

### Analytics (Optional)

If you want to add analytics:

```env
# Google Analytics
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
```

### Error Tracking (Optional)

For production error tracking:

```env
# Sentry
VITE_SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
```

---

## Puter.js Features Used

### Authentication

```typescript
// Sign in
await puter.auth.signIn();

// Check if signed in
const isSignedIn = await puter.auth.isSignedIn();

// Get user info
const user = await puter.auth.getUser();
```

### File Storage

```typescript
// Upload a file
const file = await puter.fs.upload([fileObject]);

// Read a file
const blob = await puter.fs.read(filePath);

// Delete a file
await puter.fs.delete(filePath);
```

### AI Chat

```typescript
// Chat with AI (uses Claude by default)
const response = await puter.ai.chat([
  {
    role: "user",
    content: [
      { type: "file", puter_path: resumePath },
      { type: "text", text: "Analyze this resume..." }
    ]
  }
], { model: "claude-sonnet-4" });
```

### Key-Value Store

```typescript
// Store data
await puter.kv.set("resume:123", JSON.stringify(data));

// Retrieve data
const data = await puter.kv.get("resume:123");

// List all keys matching pattern
const items = await puter.kv.list("resume:*", true);

// Delete all data
await puter.kv.flush();
```

---

## Deployment

### Vercel

No special configuration needed:

```bash
npm i -g vercel
vercel
```

### Docker

```bash
docker build -t resumify .
docker run -p 3000:3000 resumify
```

### Other Platforms

Deploy to any Node.js-compatible platform:
- Netlify
- Railway
- Render
- Heroku
- AWS/GCP/Azure

---

## Troubleshooting

### "Puter.js not available" Error

This usually means the Puter.js script hasn't loaded yet. The app handles this automatically with a retry mechanism, but if it persists:

1. Check your internet connection
2. Ensure `https://js.puter.com/v2/` is not blocked
3. Try refreshing the page

### Authentication Issues

1. Make sure popups are allowed for the site
2. Clear browser cache and try again
3. Try a different browser

### AI Analysis Fails

1. The user's Puter account might have usage limits
2. Try with a smaller PDF file
3. Check that the PDF isn't corrupted

---

## Resources

- [Puter.js Documentation](https://docs.puter.com/)
- [Puter.js GitHub](https://github.com/HeyPuter/puter)
- [React Router Documentation](https://reactrouter.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

## Need Help?

If you encounter issues:

1. Check the browser console for errors
2. Ensure you're using Node.js 18+
3. Try deleting `node_modules` and reinstalling
4. Open an issue on GitHub

Happy coding! 🚀
