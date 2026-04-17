# Quick Start Guide - Portfolio Generator

## 🚀 5-Minute Setup

### Option 1: Using Windows Batch Script
```bash
setup.bat
```

### Option 2: Using Bash Script (Linux/Mac)
```bash
chmod +x setup.sh
./setup.sh
```

### Option 3: Manual Setup
```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Update .env.local with your credentials
# Then run the dev server
npm run dev
```

## 📋 Configuration Checklist

Before running the app, ensure you have:

### MongoDB Atlas
- [ ] Created MongoDB Atlas account
- [ ] Created a cluster
- [ ] Added database user
- [ ] Copied connection string to `MONGODB_URI`
- [ ] Added Vercel IP to IP whitelist (if deploying)

### NextAuth
- [ ] Generated `NEXTAUTH_SECRET` using:
  ```bash
  openssl rand -base64 32
  ```
- [ ] Set `NEXTAUTH_URL` (default: http://localhost:3000)

### Cloudinary (Optional)
- [ ] Created account at cloudinary.com
- [ ] Copied Cloud Name to `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
- [ ] Added API credentials

### Claude API (Optional)
- [ ] Created account at console.anthropic.com
- [ ] Copied API key to `ANTHROPIC_API_KEY`

## 🏃 Running the App

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### Production Build
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## 🧪 Testing the Features

### 1. Landing Page ✅
- Visit http://localhost:3000
- Verify featured sections display
- Click "Get Started"

### 2. Signup ✅
- Go to /signup
- Create account with test credentials
- Verify email/username validation

### 3. Login ✅
- Go to /login
- Sign in with created account
- Should redirect to /editor

### 4. Editor ✅
- Fill in basic info section
- Watch live preview update instantly
- Add a project and skill
- Toggle between templates

### 5. Save Portfolio ✅
- Click "Save" button
- Check console for success message
- Refresh page - data should persist

### 6. PDF Export ✅
- Click Download icon in form panel
- Portfolio should download as PDF

### 7. JSON Export ✅
- Click JSON icon in form panel
- Portfolio data should download

### 8. Share Portfolio ✅
- Click Share icon
- Get unique public URL
- Share with others

### 9. View Public Portfolio ✅
- Visit /p/[username] URL
- Should see selected template rendered

## 📦 Project Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm install` | Install dependencies |
| `npm update` | Update packages |

## 📁 Key Files to Know

- `.env.local` - Environment variables (⚠️ never commit)
- `app/page.tsx` - Landing page
- `app/(editor)/editor/page.tsx` - Main editor
- `store/usePortfolioStore.ts` - Live preview state
- `components/editor/FormPanel.tsx` - Form UI
- `components/templates/*.tsx` - Portfolio templates
- `lib/models/*.ts` - Database schemas

## 🔍 Troubleshooting

### "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Port 3000 already in use
```bash
npm run dev -- -p 3001
```

### MongoDB connection error
- Verify `MONGODB_URI` in `.env.local`
- Check IP whitelist in MongoDB Atlas
- Ensure database user password is correct

### NextAuth not loading
- Verify `NEXTAUTH_SECRET` is set
- Restart dev server
- Clear browser cookies

### Crypto module error
- Node.js issue - ensure using Node 18+
- Run `node --version` to check

## 🎯 Next Steps After Setup

1. **Customize Templates** - Edit files in `components/templates/`
2. **Add Features** - Create new API routes in `app/api/`
3. **Improve UI** - Modify components and styles
4. **Deploy** - See `DEPLOYMENT.md` for Vercel setup
5. **Add Analytics** - Integrate Google Analytics or similar

## 📚 Documentation

- [README.md](./README.md) - Full documentation
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide
- [Next.js Docs](https://nextjs.org/docs)
- [MongoDB Docs](https://mongodbtutorials.org)
- [NextAuth Docs](https://next-auth.js.org)
- [Tailwind Docs](https://tailwindcss.com/docs)

## 🆘 Getting Help

1. Check error messages in console
2. Review browser DevTools (F12)
3. Check Vercel logs if deployed
4. Read relevant documentation
5. Search Stack Overflow
6. Check GitHub issues

## 💡 Pro Tips

- Use browser DevTools to inspect live preview
- Test with various screen sizes for responsiveness
- Use `console.log()` for debugging state
- Keep `.env.local` backed up but not in git
- Test all templates before deploying
- Enable HTTPS in production
- Monitor API usage and costs

## 🚀 Ready to Deploy?

Follow [DEPLOYMENT.md](./DEPLOYMENT.md) for:
- Vercel setup
- MongoDB Atlas configuration
- Cloudinary integration
- Custom domain setup
- Production monitoring

---

**Happy building! 🎉**

Next: [Full README](./README.md) | [Deployment Guide](./DEPLOYMENT.md)
