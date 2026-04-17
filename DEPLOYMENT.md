# Deployment Guide for Portfolio Generator

## Vercel Deployment (Recommended)

Vercel is the official Next.js hosting platform and offers the best integration.

### Step 1: Prepare Your Code

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial portfolio generator commit"

# Push to GitHub (or connect your repository)
git push origin main
```

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select "Import Git Repository"
4. Choose your repository
5. Select "Create a new team" or use existing team

### Step 3: Configure Environment Variables

In Vercel Dashboard:

1. Go to Project Settings > Environment Variables
2. Add all variables from `.env.local`:

```
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/portfolio-gen
NEXTAUTH_SECRET=your-generated-secret
NEXTAUTH_URL=https://yourdomain.vercel.app
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
ANTHROPIC_API_KEY=sk-ant-...
```

### Step 4: Deploy

1. Click "Deploy"
2. Wait for the deployment to complete
3. Once done, you'll get a URL like `https://portfolio-gen.vercel.app`

### Step 5: Update NEXTAUTH_URL

After deployment, update the `NEXTAUTH_URL` environment variable:

1. Go to Project Settings > Environment Variables
2. Update `NEXTAUTH_URL=https://your-vercel-domain.vercel.app`
3. Trigger a redeploy: Project Settings > Deployments > Click latest > "Redeploy"

## MongoDB Atlas Setup

### 1. Create MongoDB Cluster

1. Sign up at [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create a new organization and project
3. Build a cluster (free tier available)
4. Set cluster name (e.g., `portfolio-gen`)

### 2. Create Database User

1. Go to Database Access
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Generate a secure password
5. Set a username (e.g., `portfoliouser`)

### 3. Get Connection String

1. Go to Clusters > Connect
2. Choose "Drivers"
3. Copy the connection string
4. Replace `<password>` and `<username>`

Connection string format:
```
mongodb+srv://username:password@cluster0.mongodb.net/portfolio-gen?retryWrites=true&w=majority
```

### 4. Configure IP Whitelist

1. Go to Network Access
2. Add your IP address or allow 0.0.0.0/0 (less secure)
3. For Vercel, allow all IPs: 0.0.0.0/0

## Cloudinary Setup (Optional - for Image Uploads)

### 1. Create Account

1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Go to Dashboard > Settings > API Keys

### 2. Get Credentials

- `Cloud Name` - Your unique cloud name
- `API Key` - Public API key
- `API Secret` - Keep this secure!

### 3. Create Upload Preset

1. Go to Settings > Upload
2. Create new upload preset named `portfolio_gen_preset`
3. Set "Signing Mode" to "Unsigned"
4. Save

### 4. Add to Environment Variables

```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=portfolio_gen_preset
```

## Anthropic Claude API Setup (Optional - for AI Features)

### 1. Create Account

1. Sign up at [console.anthropic.com](https://console.anthropic.com)
2. Go to API Keys
3. Create a new API key

### 2. Add to Environment Variables

```
ANTHROPIC_API_KEY=sk-ant-...
```

### 3. Set Up Billing

- Add a payment method
- Set usage limits in API keys settings to control costs

## Custom Domain Setup

### 1. Add Domain to Vercel

1. Go to Project Settings > Domains
2. Enter your custom domain (e.g., `portfolio.example.com`)
3. Follow DNS configuration instructions

### 2. Update DNS Records

Add CNAME record pointing to Vercel:
```
CNAME portfolio -> cname.vercel-dns.com
```

### 3. Update NEXTAUTH_URL

1. Go to Environment Variables
2. Change `NEXTAUTH_URL` to your custom domain
3. Redeploy the project

## Monitoring and Maintenance

### Log Monitoring

1. Vercel Dashboard > Logs
2. Monitor for errors and issues

### Database Backups

1. MongoDB Atlas > Backup
2. Enable automatic backups

### Analytics

1. Vercel Dashboard > Real-time > Overview
2. Monitor traffic and performance

## Troubleshooting Deployment

### "Cannot find module" Error

Solution: Delete `node_modules` and `.next`, then redeploy:
```bash
rm -rf node_modules .next
npm install
```

### Blank Page After Deployment

1. Check browser console for errors
2. Check Vercel logs for server errors
3. Verify all environment variables are set
4. Check MongoDB connection string

### Authentication Not Working

1. Verify `NEXTAUTH_URL` matches your domain
2. Regenerate `NEXTAUTH_SECRET` if needed
3. Clear cookies and try again
4. Check NextAuth logs in Vercel

### Images Not Loading

1. Verify Cloudinary credentials
2. Check Cloudinary dashboard for upload errors
3. Ensure image URLs are HTTPS

### Database Connection Timeout

1. Check MongoDB URI format
2. Verify IP whitelist includes Vercel IPs
3. Check database user credentials
4. Verify network connectivity

## Post-Deployment Checklist

- [ ] Verify all environment variables are set
- [ ] Test signup and login flow
- [ ] Test portfolio creation and editing
- [ ] Test PDF export functionality
- [ ] Test portfolio sharing with public link
- [ ] Verify images upload correctly
- [ ] Test AI suggestions
- [ ] Check Google indexing for public portfolios
- [ ] Set up monitoring and alerts
- [ ] Enable HTTP/2 push in Vercel settings
- [ ] Configure caching headers

## Scaling Tips

As your app grows:

1. **Database**: MongoDB Atlas provides automatic scaling
2. **Images**: Cloudinary handles image optimization
3. **CDN**: Vercel Edge Network automatically scales
4. **API Rate Limiting**: Implement rate limiting for Claude API calls

## Security Best Practices

1. ✅ Never commit `.env.local` to git
2. ✅ Use strong `NEXTAUTH_SECRET`
3. ✅ Enable HTTPS (automatic with Vercel)
4. ✅ Keep dependencies updated: `npm audit`
5. ✅ Use environment variables for all secrets
6. ✅ Rotate API keys regularly
7. ✅ Monitor database access logs

## Support & Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com)
- [NextAuth.js Documentation](https://next-auth.js.org)
