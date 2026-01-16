<div align="center">
  <div>
    <img alt="React" src="https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black">
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
    <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
    <img alt="Puter.js" src="https://img.shields.io/badge/Puter.js-6366F1?style=for-the-badge&logoColor=white">
  </div>

  <h1>RESUMIFY</h1>
  <h3>AI-Powered Resume Analyzer</h3>

  <p>
    Get instant AI-powered feedback on your resume. Improve your ATS score, enhance content quality, and land your dream job.
  </p>
</div>

---

## ✨ Features

- 🔐 **Seamless Authentication** - Browser-based auth using Puter.js, no backend setup required
- 📄 **Resume Upload & Storage** - Securely upload and store all your resumes in one place
- 🤖 **AI-Powered Analysis** - Get detailed feedback using Claude AI for comprehensive resume evaluation
- 📊 **ATS Score** - See how well your resume performs with Applicant Tracking Systems
- 💡 **Actionable Tips** - Receive personalized recommendations to improve your resume
- 📱 **Responsive Design** - Works beautifully on desktop, tablet, and mobile devices
- 🎨 **Modern UI** - Clean, polished interface with smooth animations

## 🛠️ Tech Stack

| Technology | Description |
|------------|-------------|
| **[React 19](https://react.dev/)** | Latest React with improved performance and features |
| **[React Router 7](https://reactrouter.com/)** | Modern routing with SSR support, data loaders, and error boundaries |
| **[Puter.js](https://puter.com/)** | Client-side SDK for auth, storage, database, and AI—no backend needed |
| **[Tailwind CSS 4](https://tailwindcss.com/)** | Utility-first CSS framework for rapid UI development |
| **[TypeScript](https://www.typescriptlang.org/)** | Type-safe JavaScript for better developer experience |
| **[Vite](https://vite.dev/)** | Lightning-fast build tool and dev server |
| **[Zustand](https://github.com/pmndrs/zustand)** | Minimal, hook-based state management |

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/resumify.git
cd resumify
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the development server**

```bash
npm run dev
```

4. **Open your browser**

Navigate to [http://localhost:5173](http://localhost:5173)

That's it! 🎉 No environment variables or API keys needed.

## 📁 Project Structure

```
resumify/
├── app/
│   ├── components/      # Reusable UI components
│   │   ├── Accordion.tsx
│   │   ├── ATS.tsx
│   │   ├── Details.tsx
│   │   ├── FileUploader.tsx
│   │   ├── Navbar.tsx
│   │   ├── ResumeCard.tsx
│   │   ├── ScoreCircle.tsx
│   │   ├── ScoreGauge.tsx
│   │   └── Summary.tsx
│   ├── libs/            # Utility functions and stores
│   │   ├── pdf2img.ts
│   │   ├── puter.ts     # Puter.js integration
│   │   └── utils.ts
│   ├── routes/          # Page components
│   │   ├── auth.tsx     # Authentication page
│   │   ├── home.tsx     # Dashboard/home page
│   │   ├── resume.tsx   # Resume detail view
│   │   ├── Upload.tsx   # Upload & analyze page
│   │   └── wipe.tsx     # Data management page
│   ├── app.css          # Global styles
│   └── root.tsx         # App entry point
├── constants/           # App constants and AI prompts
├── public/              # Static assets
├── types/               # TypeScript type definitions
└── package.json
```

## 🔧 Environment Variables

**Good news:** This application requires **no environment variables** to run!

Puter.js handles all authentication, storage, and AI capabilities client-side. Users authenticate with their own Puter account, and any AI usage costs are borne by them.

For optional configuration (analytics, production settings), see `.env.example`.

## 🤖 How It Works

1. **Sign In** - Users authenticate via Puter.js (OAuth-style popup)
2. **Upload Resume** - Upload a PDF resume and optionally provide job details
3. **AI Analysis** - Claude AI analyzes the resume for:
   - ATS (Applicant Tracking System) compatibility
   - Tone and writing style
   - Content quality and relevance
   - Document structure and layout
   - Skills match for the target job
4. **Get Feedback** - View detailed scores and actionable improvement tips
5. **Iterate** - Upload updated resumes to track your progress

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run typecheck` | Run TypeScript type checking |

## 🌐 Deployment

### Vercel (Recommended)

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

This app can be deployed to any platform that supports Node.js:
- Netlify
- Railway
- Render
- AWS/GCP/Azure

## 🔐 Privacy & Security

- **Your data stays yours** - Resumes are stored in your personal Puter cloud storage
- **No server-side storage** - We don't store any of your documents on our servers
- **Secure authentication** - OAuth-based auth through Puter.js
- **Client-side processing** - All PDF handling happens in your browser

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Puter.js](https://puter.com/) for the amazing client-side SDK
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [React Router](https://reactrouter.com/) for the excellent routing solution

---

<div align="center">
  <p>Built with ❤️ for job seekers everywhere</p>
  <p>
    <a href="#top">⬆️ Back to top</a>
  </p>
</div>
