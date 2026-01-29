# Deployment Guide

Panduan deploy aplikasi Ramadhan 1447H ke berbagai platform.

## 🚀 Vercel (Recommended)

Vercel adalah platform terbaik untuk Next.js apps.

### Deploy via GitHub
1. Push code ke GitHub (sudah done ✅)
2. Buka [vercel.com](https://vercel.com)
3. Sign in dengan GitHub
4. Click "New Project"
5. Import repository: `yogiputrap/ramadhan-tracker-and-countdown`
6. Configure:
   - Framework Preset: Next.js
   - Root Directory: `./` (sudah di root ramadhan-v2)
   - Build Command: `npm run build`
   - Output Directory: `.next`
7. Click "Deploy"

### Environment Variables (Optional)
Tidak ada environment variables yang required, semua menggunakan public API.

### Custom Domain
1. Pergi ke Project Settings > Domains
2. Add domain Anda
3. Update DNS records sesuai instruksi Vercel

## 🌐 Netlify

### Deploy via GitHub
1. Buka [netlify.com](https://netlify.com)
2. Click "Add new site" > "Import an existing project"
3. Connect to GitHub
4. Select repository: `yogiputrap/ramadhan-tracker-and-countdown`
5. Configure:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Base directory: (kosongkan)
6. Click "Deploy site"

### Netlify Configuration
Buat file `netlify.toml` di root:
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## 📦 Docker

### Build Docker Image
```bash
docker build -t ramadhan-1447h .
```

### Run Container
```bash
docker run -p 3002:3002 ramadhan-1447h
```

### Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3002

CMD ["npm", "start"]
```

## ☁️ AWS Amplify

1. Buka AWS Amplify Console
2. Click "New app" > "Host web app"
3. Connect GitHub repository
4. Configure build settings:
   - Build command: `npm run build`
   - Output directory: `.next`
5. Deploy

## 🔧 VPS/Server Manual

### Prerequisites
- Node.js 18+
- npm atau yarn
- PM2 (process manager)

### Steps
```bash
# Clone repository
git clone git@github.com:yogiputrap/ramadhan-tracker-and-countdown.git
cd ramadhan-tracker-and-countdown

# Install dependencies
npm install

# Build
npm run build

# Install PM2
npm install -g pm2

# Start with PM2
pm2 start npm --name "ramadhan-app" -- start

# Save PM2 config
pm2 save
pm2 startup
```

### Nginx Configuration
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 🔒 HTTPS Setup

### Vercel/Netlify
HTTPS otomatis enabled.

### Manual Server (Let's Encrypt)
```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d yourdomain.com

# Auto-renewal
sudo certbot renew --dry-run
```

## 📊 Performance Optimization

### Next.js Optimization
- ✅ Image optimization (Next.js Image component)
- ✅ Code splitting otomatis
- ✅ Static generation untuk pages
- ✅ API routes untuk server-side logic

### PWA Optimization
- ✅ Service Worker caching
- ✅ Offline support
- ✅ Lazy loading components
- ✅ Optimized bundle size

## 🧪 Testing Production Build

```bash
# Build
npm run build

# Test locally
npm start

# Open browser
open http://localhost:3002
```

## 📱 PWA Testing

### Chrome DevTools
1. Open DevTools (F12)
2. Go to "Application" tab
3. Check:
   - Manifest
   - Service Workers
   - Cache Storage
   - Icons

### Lighthouse Audit
1. Open DevTools
2. Go to "Lighthouse" tab
3. Select "Progressive Web App"
4. Generate report
5. Target: 90+ score

## 🔄 CI/CD

### GitHub Actions
Buat `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 🐛 Troubleshooting

### Build Errors
```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### Service Worker Issues
- Clear browser cache
- Unregister old service workers
- Hard refresh (Ctrl+Shift+R)

### API Issues
- Check API endpoints are accessible
- Verify CORS settings
- Check rate limits

## 📞 Support

Jika ada masalah deployment:
1. Check build logs
2. Verify environment variables
3. Test locally first
4. Check platform-specific documentation

---

**Happy Deploying! 🚀**
