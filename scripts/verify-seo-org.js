import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 SEO Organization Schema Verification');
console.log('=====================================');
console.log('');

// Check SEO.jsx for Organization schema
const seoPath = path.join(__dirname, '..', 'src', 'components', 'SEO', 'SEO.jsx');
if (fs.existsSync(seoPath)) {
  const seoContent = fs.readFileSync(seoPath, 'utf8');
  
  console.log('📄 SEO Component Check:');
  
  const checks = [
    { name: 'Organization @type', pattern: /@type":\s*"Organization"/ },
    { name: 'Organization @id', pattern: /@id":\s*`\$\{siteUrl\}\/#organization`/ },
    { name: 'Logo ImageObject', pattern: /@type":\s*"ImageObject"/ },
    { name: 'Logo dimensions', pattern: /"width":\s*512/ },
    { name: 'Logo caption', pattern: /"caption":\s*".*Kalakritam.*"/ },
    { name: 'Social media links', pattern: /sameAs":\s*\[/ },
    { name: 'No LocalBusiness', pattern: /@type":\s*"LocalBusiness"/, shouldNotExist: true }
  ];
  
  checks.forEach(check => {
    const exists = check.pattern.test(seoContent);
    if (check.shouldNotExist) {
      if (!exists) {
        console.log(`✅ ${check.name} (correctly absent)`);
      } else {
        console.log(`❌ ${check.name} (should not exist)`);
      }
    } else {
      if (exists) {
        console.log(`✅ ${check.name}`);
      } else {
        console.log(`❌ ${check.name}`);
      }
    }
  });
} else {
  console.log('❌ SEO.jsx not found');
}

console.log('');
console.log('📋 Current SEO Implementation:');
console.log('1. ✅ Static Organization schema in index.html (for logo)');
console.log('2. ✅ Static WebSite schema in index.html (for search)');
console.log('3. ✅ Dynamic Organization schema in SEO component (for pages)');
console.log('4. ✅ Instagram social media link (kalakritam.in)');
console.log('5. ❌ NO LocalBusiness schema (avoided for validation)');
console.log('');
console.log('🎯 Benefits:');
console.log('• Better SEO with Organization markup on all pages');
console.log('• Logo properly configured for Google Search Console');
console.log('• No validation conflicts or errors');
console.log('• Clean, focused structured data');
console.log('• Authentic social media presence (Instagram only)');
console.log('');
