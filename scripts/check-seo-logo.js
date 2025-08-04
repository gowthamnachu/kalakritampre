import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 SEO & Logo Checker for Kalakritam');
console.log('====================================');
console.log('');

// Check for logo files
const publicDir = path.join(__dirname, '..', 'public');
const logoFiles = ['logo.png', 'logo.svg', 'favicon.svg'];

console.log('📁 Logo Files Check:');
logoFiles.forEach(file => {
  const filePath = path.join(publicDir, file);
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    console.log(`✅ ${file} - ${(stats.size / 1024).toFixed(2)} KB`);
  } else {
    console.log(`❌ ${file} - Missing`);
  }
});

console.log('');

// Check index.html for structured data
const indexPath = path.join(__dirname, '..', 'index.html');
if (fs.existsSync(indexPath)) {
  const indexContent = fs.readFileSync(indexPath, 'utf8');
  
  console.log('📄 Index.html Structured Data Check:');
  
  const checks = [
    { name: 'Organization schema', pattern: /"@type":\s*"Organization"/ },
    { name: 'Logo ImageObject', pattern: /"@type":\s*"ImageObject"/ },
    { name: 'Logo URL', pattern: /"url":\s*"https:\/\/kalakritam\.in\/logo\.png"/ },
    { name: 'Logo dimensions', pattern: /"width":\s*512/ },
    { name: 'Logo caption', pattern: /"caption":\s*".*"/ },
    { name: 'WebSite schema', pattern: /"@type":\s*"WebSite"/ }
  ];
  
  checks.forEach(check => {
    if (check.pattern.test(indexContent)) {
      console.log(`✅ ${check.name}`);
    } else {
      console.log(`❌ ${check.name}`);
    }
  });
} else {
  console.log('❌ index.html not found');
}

console.log('');

// URLs to test
console.log('🌐 Testing URLs:');
const urls = [
  'https://search.google.com/test/rich-results?url=https://kalakritam.in',
  'https://developers.facebook.com/tools/debug/?q=https://kalakritam.in',
  'https://cards-dev.twitter.com/validator?url=https://kalakritam.in'
];

urls.forEach(url => {
  console.log(`🔗 ${url}`);
});

console.log('');
console.log('📋 Next Steps:');
console.log('1. Add logo.png file (512x512px) to /public folder');
console.log('2. Test structured data with Google Rich Results Test');
console.log('3. Submit sitemap to Google Search Console');
console.log('4. Request indexing for updated pages');
console.log('5. Monitor "Enhancements" section for logo-related data');
console.log('');
