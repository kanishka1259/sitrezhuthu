# 🎨 Portfolio Generator

A full-stack web application that empowers users to create, customize, and share stunning professional portfolios with zero coding required. Choose from 9+ professionally designed templates, customize with ease, and export as PDF or share publicly.

**🌐 Live Demo:** [https://sitrezhuthu.vercel.app](https://sitrezhuthu.vercel.app)

![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-9.4-green?style=flat-square&logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwind-css)

---

## ✨ Key Features

### 📋 Core Functionality
- **9+ Professional Templates** - Minimal, Modern Cards, Dark Theme, Glassmorphism, Tech Minimal, Creative, Neon, Executive, Bento
- **Live Preview System** - Real-time updates as you edit your portfolio
- **Organized Form Editor** - Intuitive tabs for Basic Info, Projects, Education, and Contact details
- **Public Portfolio Pages** - Share your portfolio with unique URLs like `/p/[username]`
- **PDF Export** - Download your portfolio as a print-ready PDF
- **JSON Export** - Backup and restore your portfolio data

### 🔐 User Management
- **Email/Password Authentication** - Secure signup and login with NextAuth.js
- **User Dashboard** - Manage multiple portfolios from one place
- **Profile Management** - Update personal information and settings

### 🎯 Advanced Features
- **Community Templates** - Submit your designs and discover others' creations
- **AI-Powered Suggestions** - Get content improvement suggestions using Claude API
- **Image Upload** - Upload project images via Cloudinary
- **Skill Management** - Tag-based skill input with visual indicators
- **Project Proficiency Bars** - Show expertise levels visually
- **Template Voting System** - Like and rate community templates

### 📱 Design & UX
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Smooth Animations** - Framer Motion for polished transitions
- **Dark Mode Ready** - Beautiful dark theme support
- **Real-time Statistics** - Track portfolio views and engagement

---

## 🛠 Tech Stack

### Frontend
- **Next.js 16.2** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling
- **Framer Motion** - Animation library
- **Zustand** - State management
- **html2canvas + jsPDF** - PDF export

### Backend
- **Next.js API Routes** - Serverless functions
- **MongoDB + Mongoose** - NoSQL database
- **Firebase** - Authentication and real-time features
- **NextAuth.js** - Authentication provider
- **Cloudinary** - Image hosting and optimization

### AI & APIs
- **Claude API (Anthropic)** - AI-powered suggestions
- **Firebase Admin SDK** - Backend authentication

### Testing & Quality
- **Jest** - Unit testing
- **Playwright** - E2E testing
- **ESLint** - Code linting
- **TypeScript** - Type checking

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- MongoDB Atlas account
- Firebase project
- Cloudinary account (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kanishka1259/sitrezhuthu.git
   cd sitrezhuthu
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and add:
   ```
   # MongoDB
   MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/portfolio-gen

   # NextAuth
   NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32
   NEXTAUTH_URL=http://localhost:3000

   # Firebase
   NEXT_PUBLIC_FIREBASE_API_KEY=your_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project
   FIREBASE_ADMIN_PROJECT_ID=your_project
   FIREBASE_ADMIN_CLIENT_EMAIL=your_email
   FIREBASE_ADMIN_PRIVATE_KEY=your_private_key

   # Cloudinary (optional)
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret

   # Claude API (optional)
   ANTHROPIC_API_KEY=sk-ant-...
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📦 Available Scripts

```bash
# Development
npm run dev              # Start dev server with hot reload

# Production
npm run build            # Build for production
npm start                # Start production server

# Testing
npm test                 # Run all tests
npm run test:unit        # Run unit tests only
npm run test:api         # Run API tests
npm run test:e2e         # Run E2E tests with Playwright

# Quality
npm run lint             # Run ESLint
```

---

## 📁 Project Structure

```
portfolio-gen/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication pages (login, signup)
│   ├── (editor)/                 # Editor layout and pages
│   ├── api/                      # API routes
│   │   ├── ai/suggest/          # AI suggestions endpoint
│   │   ├── portfolio/           # Portfolio CRUD
│   │   ├── templates/           # Template management
│   │   └── upload/              # Image upload
│   ├── [username]/              # Public portfolio pages
│   ├── admin/                   # Admin dashboard
│   ├── dashboard/               # User dashboard
│   └── templates/               # Template gallery
│
├── components/
│   ├── canvas/                  # Canvas editor components
│   ├── common/                  # Shared UI components
│   ├── editor/                  # Form editor components
│   ├── icons/                   # Social media icons
│   ├── preview/                 # Live preview
│   └── templates/               # Template components
│
├── lib/
│   ├── models/                  # MongoDB models
│   ├── config/                  # Configuration files
│   ├── firebase.ts              # Firebase client
│   ├── firebase-admin.ts        # Firebase admin
│   └── validations.ts           # Schema validation
│
├── store/                       # Zustand state management
├── types/                       # TypeScript type definitions
├── hooks/                       # Custom React hooks
├── public/                      # Static assets
│
└── __tests__/                   # Test files
    ├── api/                     # API tests
    ├── unit/                    # Unit tests
    └── setup/                   # Test setup
```

---

## 🔌 API Endpoints

### Portfolio
- `GET /api/portfolio` - Fetch user portfolio
- `POST /api/portfolio` - Create new portfolio
- `PUT /api/portfolio/:id` - Update portfolio
- `DELETE /api/portfolio/:id` - Delete portfolio
- `GET /api/portfolio/check-slug` - Check username availability

### Templates
- `GET /api/templates/community` - Fetch community templates
- `POST /api/templates/community` - Submit new template
- `PATCH /api/templates/stats` - Update template stats (likes/views)

### AI
- `POST /api/ai/suggest` - Get AI content suggestions

### Upload
- `POST /api/upload` - Upload image to Cloudinary

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New" → "Project"
   - Import your GitHub repository

3. **Add Environment Variables**
   - Set all variables from `.env.local` in Vercel Dashboard
   - Settings → Environment Variables

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete

5. **Post-Deployment**
   - Update `NEXTAUTH_URL` to your Vercel domain
   - Trigger a redeploy

---

## 🧪 Testing

### Unit Tests
```bash
npm run test:unit
```

### API Tests
```bash
npm run test:api
```

### E2E Tests
```bash
npm run test:e2e
```

### Run All Tests
```bash
npm test
```

---

## 📋 Templates Available

1. **Minimal** - Clean and professional
2. **Modern Cards** - Card-based layout
3. **Dark Theme** - Dark mode optimized
4. **Glassmorphism** - Frosted glass effect
5. **Tech Minimal** - Developer-focused
6. **Creative** - Artistic and bold
7. **Neon** - Vibrant neon colors
8. **Executive** - Corporate style
9. **Bento** - Grid-based layout

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure your code:
- Follows the existing code style
- Passes all tests
- Includes appropriate TypeScript types
- Has proper error handling

---

## 🐛 Known Issues & Roadmap

### Current Limitations
- MongoDB IP whitelist must include `0.0.0.0/0` for Vercel deployments
- Cloudinary upload preset must be unsigned for client-side uploads

### Future Enhancements
- [ ] Collaborative portfolio editing
- [ ] Portfolio analytics and insights
- [ ] More template themes
- [ ] Social media integration
- [ ] Mobile app companion
- [ ] Portfolio versioning
- [ ] Export as single HTML file
- [ ] Custom domain support

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Kanishka**  
- GitHub: [@kanishka1259](https://github.com/kanishka1259)
- Portfolio: [sitrezhuthu.vercel.app](https://sitrezhuthu.vercel.app)

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) - React framework
- [MongoDB](https://www.mongodb.com) - Database
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [Framer Motion](https://www.framer.com/motion) - Animations
- [Anthropic Claude](https://www.anthropic.com) - AI capabilities
- [Cloudinary](https://cloudinary.com) - Image hosting

---

## 📞 Support

If you encounter any issues:

1. Check the [documentation](./DEPLOYMENT.md)
2. Review existing [GitHub issues](https://github.com/kanishka1259/sitrezhuthu/issues)
3. Create a new issue with detailed information

---

**Built with ❤️ using Next.js and modern web technologies.**
