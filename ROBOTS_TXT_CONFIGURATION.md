# 🤖 Kalakritam Robots.txt Configuration

## 📋 **Overview**

Our SEO-friendly robots.txt file is designed to maximize search engine visibility while protecting against AI scrapers and unwanted crawlers.

---

## ✅ **Allowed Bots (Search Engines)**

### **Major Search Engines**
- **Googlebot** - Google Search (crawl-delay: 1s)
- **Googlebot-Image** - Google Images
- **Googlebot-Mobile** - Google Mobile Search
- **Bingbot** - Microsoft Bing Search (crawl-delay: 1s)
- **BingPreview** - Bing Preview Service
- **Slurp** - Yahoo Search (crawl-delay: 2s)
- **DuckDuckBot** - DuckDuckGo Search
- **YandexBot** - Yandex (Russian search engine)
- **Baiduspider** - Baidu (Chinese search engine)

### **Social Media Bots**
- **FacebookBot** - Facebook link previews
- **facebookexternalhit** - Facebook external content
- **Twitterbot** - Twitter card previews
- **LinkedInBot** - LinkedIn link previews
- **Pinterestbot** - Pinterest content
- **WhatsApp** - WhatsApp link previews

### **SEO Analysis Tools**
- **AhrefsBot** - Ahrefs SEO analysis (crawl-delay: 5s)
- **SemrushBot** - SEMrush analysis (crawl-delay: 5s)
- **MozBot** - Moz SEO tools (crawl-delay: 5s)

---

## ❌ **Blocked Bots (AI Scrapers)**

### **Large Language Model Trainers**
- **GPTBot** - OpenAI's web crawler
- **ClaudeBot** - Anthropic's Claude crawler
- **Google-Extended** - Google's AI training crawler
- **ChatGPT-User** - ChatGPT web browsing
- **CCBot** - Common Crawl (used by AI training)

### **Company-Specific AI Bots**
- **ByteSpider** - ByteDance/TikTok AI
- **Meta-ExternalAgent** - Meta AI crawler
- **ia_archiver** - Internet Archive/Alexa
- **PerplexityBot** - Perplexity AI
- **CohereBot** - Cohere AI
- **YouBot** - You.com AI
- **AI2Bot** - Allen Institute AI

### **Aggressive Scrapers**
- **SemrushBot-SA** - Aggressive SEMrush variant
- **MJ12bot** - Majestic SEO aggressive crawler
- **DotBot** - Various aggressive scrapers
- **AhrefsBot-News** - Ahrefs news crawler

---

## 🚫 **Protected Directories**

### **Admin & Sensitive Areas**
```
/admin/          # Future admin panel
/dashboard/      # Management interface
/login/          # Authentication pages
/api/private/    # Private API endpoints
/api/admin/      # Admin API routes
```

### **Development Areas**
```
/dev/            # Development files
/test/           # Testing directories
/staging/        # Staging environment
/temp/           # Temporary files
/src/            # Source code
/node_modules/   # Dependencies
```

### **Configuration Files**
```
/*.json$         # JSON configuration files
/*.config$       # Config files
/.env            # Environment variables
/package.json    # Package configuration
/vite.config.js  # Build configuration
```

---

## ✅ **Explicitly Allowed Content**

### **Essential Files**
```
/sitemap.xml     # Main sitemap
/robots.txt      # This file
/favicon.ico     # Site icon
/.well-known/    # Standard web files
```

### **Media & Assets**
```
*.css, *.js      # Stylesheets and scripts
*.png, *.jpg     # Images
*.svg, *.webp    # Optimized images
*.mp4, *.webm    # Videos
*.woff, *.ttf    # Fonts
*.pdf            # Documents
```

### **Public Directories**
```
/assets/         # Static assets
/images/         # Image files
/videos/         # Video content
/fonts/          # Font files
```

---

## ⚡ **Crawl-Delay Settings**

| Bot Type | Delay | Reason |
|----------|-------|--------|
| Googlebot | 1s | Fast indexing for primary search |
| Bingbot | 1s | Fast indexing for secondary search |
| Social Media | None | Immediate preview generation |
| SEO Tools | 5s | Prevent server overload |
| Others | 2s | Balanced crawling |

---

## 🗺️ **Sitemap Configuration**

### **Current Sitemap**
```
Sitemap: https://kalakritam.in/sitemap.xml
```

### **Future Expansion (Commented)**
```
# Sitemap: https://kalakritam.in/gallery-sitemap.xml
# Sitemap: https://kalakritam.in/artists-sitemap.xml  
# Sitemap: https://kalakritam.in/blog-sitemap.xml
```

---

## 🔍 **SEO Benefits**

### **Search Engine Optimization**
- ✅ **Fast Discovery** - Major search engines can crawl immediately
- ✅ **Resource Protection** - Sensitive areas blocked
- ✅ **Crawl Budget** - Optimized delays prevent server overload
- ✅ **Social Sharing** - Link previews work perfectly

### **AI Protection**
- ✅ **Content Protection** - Blocks AI training scrapers
- ✅ **Bandwidth Saving** - Reduces unwanted traffic
- ✅ **Legal Compliance** - Respects content usage policies
- ✅ **Future-Proof** - Blocks emerging AI crawlers

---

## 🧪 **Testing & Validation**

### **Google Search Console**
1. Go to: https://search.google.com/search-console
2. Select your property
3. Navigate to: Coverage > robots.txt Tester
4. Test specific URLs

### **Robots.txt Validators**
- **Google Robots Testing Tool**: Test crawl permissions
- **Bing Webmaster Tools**: Validate Bing access
- **Online Validators**: Check syntax and rules

### **Command Line Testing**
```bash
# Test robots.txt accessibility
curl -A "Googlebot" https://kalakritam.in/robots.txt

# Test specific user agent
curl -A "GPTBot" https://kalakritam.in/robots.txt
```

---

## 📊 **Monitoring & Maintenance**

### **Regular Tasks**
- **Monthly**: Review crawl statistics in Search Console
- **Quarterly**: Update blocked AI bot list
- **Yearly**: Review and optimize crawl delays

### **Key Metrics to Monitor**
- **Crawl Requests**: Normal vs blocked traffic
- **Coverage**: Pages successfully indexed
- **Errors**: Blocked content that should be allowed

### **When to Update**
- ✅ New AI bots emerge
- ✅ New site sections added
- ✅ Admin areas implemented
- ✅ API endpoints change

---

## 🎯 **Best Practices Implemented**

1. **Whitelist Approach**: Explicitly allow important bots
2. **Granular Control**: Different rules for different bot types
3. **Resource Protection**: Block sensitive directories
4. **Performance Optimization**: Appropriate crawl delays
5. **Future-Proofing**: Commented expansion areas
6. **Documentation**: Clear comments and structure

---

**🤖 Your robots.txt is now optimized for SEO while protecting against AI scrapers!**

**Questions?** Test your robots.txt at Google Search Console or reach out for assistance.
