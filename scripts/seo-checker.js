#!/usr/bin/env node

/**
 * Real-time SEO Checker for Kalakritam
 * Checks SEO implementation and provides live feedback
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

const log = (text, color = 'reset') => console.log(`${colors[color]}${text}${colors.reset}`);

class SEOChecker {
  constructor() {
    this.projectRoot = path.resolve(__dirname, '..');
    this.checks = [];
    this.passed = 0;
    this.failed = 0;
  }

  check(description, test, fix = '') {
    try {
      const result = test();
      if (result) {
        log(`✅ ${description}`, 'green');
        this.passed++;
      } else {
        log(`❌ ${description}`, 'red');
        if (fix) log(`   💡 Fix: ${fix}`, 'yellow');
        this.failed++;
      }
      return result;
    } catch (error) {
      log(`❌ ${description} (Error: ${error.message})`, 'red');
      this.failed++;
      return false;
    }
  }

  checkFile(filePath) {
    const fullPath = path.join(this.projectRoot, filePath);
    return fs.existsSync(fullPath);
  }

  readFile(filePath) {
    const fullPath = path.join(this.projectRoot, filePath);
    if (fs.existsSync(fullPath)) {
      return fs.readFileSync(fullPath, 'utf8');
    }
    return null;
  }

  async runChecks() {
    log('\n🔍 KALAKRITAM SEO REAL-TIME CHECK', 'bold');
    log('=====================================\n', 'cyan');

    // 1. Basic File Structure
    log('📁 File Structure', 'blue');
    this.check('index.html exists', () => this.checkFile('index.html'));
    this.check('sitemap.xml exists', () => this.checkFile('public/sitemap.xml'));
    this.check('robots.txt exists', () => this.checkFile('public/robots.txt'));
    this.check('_redirects file exists', () => this.checkFile('public/_redirects'));
    
    // 2. HTML Meta Tags
    log('\n📄 HTML Meta Tags', 'blue');
    const indexHtml = this.readFile('index.html');
    if (indexHtml) {
      this.check('Title tag present', () => indexHtml.includes('<title>'));
      this.check('Meta description present', () => indexHtml.includes('name="description"'));
      this.check('Open Graph tags present', () => indexHtml.includes('property="og:'));
      this.check('Twitter Card tags present', () => indexHtml.includes('name="twitter:'));
      this.check('Canonical URL set', () => indexHtml.includes('rel="canonical"'));
      this.check('Structured Data (JSON-LD) present', () => indexHtml.includes('application/ld+json'));
    }

    // 3. SEO Component Implementation
    log('\n⚛️ React SEO Implementation', 'blue');
    this.check('SEO component exists', () => this.checkFile('src/components/SEO/SEO.jsx'));
    this.check('useSEO hook exists', () => this.checkFile('src/hooks/useSEO.js'));
    
    const seoComponent = this.readFile('src/components/SEO/SEO.jsx');
    if (seoComponent) {
      this.check('SEO component has dynamic title', () => seoComponent.includes('title ='));
      this.check('SEO component has structured data', () => seoComponent.includes('structuredData'));
    }

    // 4. Home Page SEO
    log('\n🏠 Home Page SEO', 'blue');
    const homeComponent = this.readFile('src/components/Home/Home.jsx');
    if (homeComponent) {
      this.check('Home uses SEO component', () => homeComponent.includes('<SEO'));
      this.check('Home has structured data', () => homeComponent.includes('JSON.stringify(structuredData)'));
      this.check('Home has performance marks', () => homeComponent.includes('performance.mark'));
    }

    // 5. Sitemap Check
    log('\n🗺️ Sitemap Configuration', 'blue');
    const sitemap = this.readFile('public/sitemap.xml');
    if (sitemap) {
      this.check('Sitemap has kalakritam.in domain', () => sitemap.includes('kalakritam.in'));
      this.check('Sitemap has multiple pages', () => (sitemap.match(/<url>/g) || []).length > 1);
    }

    // 6. Build Configuration
    log('\n⚙️ Build & Performance', 'blue');
    const viteConfig = this.readFile('vite.config.js');
    if (viteConfig) {
      this.check('Vite config has SEO optimizations', () => viteConfig.includes('terser'));
      this.check('Build command configured', () => this.checkFile('package.json'));
    }

    // 7. Environment Variables
    log('\n🌐 Environment Setup', 'blue');
    this.check('.env.production exists', () => this.checkFile('.env.production'));
    const envProd = this.readFile('.env.production');
    if (envProd) {
      this.check('Production URL configured', () => envProd.includes('VITE_APP_URL'));
    }

    // 8. Performance Features
    log('\n⚡ Performance Features', 'blue');
    if (indexHtml) {
      this.check('Preload hints present', () => indexHtml.includes('rel="preload"'));
      this.check('DNS prefetch present', () => indexHtml.includes('rel="dns-prefetch"'));
      this.check('Font optimization present', () => indexHtml.includes('rel="preconnect"'));
    }

    // Results Summary
    log('\n📊 SEO CHECK RESULTS', 'bold');
    log('===================', 'cyan');
    log(`✅ Passed: ${this.passed}`, 'green');
    log(`❌ Failed: ${this.failed}`, 'red');
    
    const score = Math.round((this.passed / (this.passed + this.failed)) * 100);
    const scoreColor = score >= 90 ? 'green' : score >= 70 ? 'yellow' : 'red';
    log(`🎯 SEO Score: ${score}%`, scoreColor);

    if (score >= 90) {
      log('\n🎉 EXCELLENT! Your SEO is production-ready!', 'green');
    } else if (score >= 70) {
      log('\n⚠️ GOOD! Minor improvements needed.', 'yellow');
    } else {
      log('\n🔧 NEEDS WORK! Several SEO issues to fix.', 'red');
    }

    log('\n🚀 Next Steps for Real-Time SEO Testing:', 'blue');
    log('1. Run: npm run dev');
    log('2. Open: http://localhost:5173');
    log('3. Use browser dev tools (F12)');
    log('4. Check: Elements > <head> for meta tags');
    log('5. Test: Right-click > "View Page Source"');
    log('6. Validate: https://search.google.com/test/rich-results');
    log('7. Social: https://developers.facebook.com/tools/debug/\n');
  }
}

// Run the checker
const checker = new SEOChecker();
checker.runChecks().catch(console.error);
