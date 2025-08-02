# Cloudflare Pages Deployment Configuration

## Build Settings
- **Build Command**: `npm run build`
- **Build Output Directory**: `dist`
- **Node.js Version**: `18` or `20`

## Environment Variables (Set in Cloudflare Pages Dashboard)
```
NODE_VERSION=20.11.0
NPM_VERSION=10.2.4
VITE_APP_NAME=Kalakritam
VITE_APP_URL=https://kalakritam.in
```

## Required Build Dependencies
All dependencies are in package.json - no additional setup needed.

## Cloudflare Pages Features Used
- **Custom _redirects file** for SPA routing
- **Custom headers** for security
- **Asset optimization** via Vite config
- **Function routing** (if needed later)

## Performance Optimizations
- **Code splitting** for vendor libraries
- **Asset hashing** for cache optimization
- **Minification** with Terser
- **Font optimization** with preloading
- **Image optimization** ready for Cloudflare Images

## SEO Features
- **Complete meta tags** in index.html
- **Structured data** (JSON-LD)
- **Sitemap.xml** in public folder
- **robots.txt** configured
- **Social media** meta tags

## Security Headers
- **CSP** (Content Security Policy)
- **XSS Protection**
- **Frame Options**
- **Content Type Options**

## Deploy Steps
1. Push code to GitHub repository
2. Connect repository to Cloudflare Pages
3. Set build command: `npm run build`
4. Set build output: `dist`
5. Deploy automatically on commits
