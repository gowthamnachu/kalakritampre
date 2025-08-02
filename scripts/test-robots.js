#!/usr/bin/env node

/**
 * Robots.txt Tester for Kalakritam
 * Tests various user agents against robots.txt rules
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

class RobotsTester {
  constructor() {
    this.projectRoot = path.resolve(__dirname, '..');
    this.robotsPath = path.join(this.projectRoot, 'public', 'robots.txt');
  }

  testUserAgents() {
    log('\n🤖 ROBOTS.TXT CONFIGURATION TEST', 'bold');
    log('==================================\n', 'cyan');

    if (!fs.existsSync(this.robotsPath)) {
      log('❌ robots.txt file not found!', 'red');
      return;
    }

    const robotsContent = fs.readFileSync(this.robotsPath, 'utf8');

    // Test cases: [User-Agent, Expected Result, Description]
    const testCases = [
      // Search Engines (Should be ALLOWED)
      ['Googlebot', 'ALLOWED', 'Google Search Bot'],
      ['Bingbot', 'ALLOWED', 'Microsoft Bing Bot'],
      ['facebookexternalhit', 'ALLOWED', 'Facebook Link Preview'],
      ['Twitterbot', 'ALLOWED', 'Twitter Card Bot'],
      ['DuckDuckBot', 'ALLOWED', 'DuckDuckGo Bot'],
      ['YandexBot', 'ALLOWED', 'Yandex Search Bot'],
      
      // AI Scrapers (Should be BLOCKED)
      ['GPTBot', 'BLOCKED', 'OpenAI GPT Bot'],
      ['ClaudeBot', 'BLOCKED', 'Anthropic Claude Bot'],
      ['Google-Extended', 'BLOCKED', 'Google AI Training'],
      ['ChatGPT-User', 'BLOCKED', 'ChatGPT Web Browsing'],
      ['CCBot', 'BLOCKED', 'Common Crawl Bot'],
      ['ByteSpider', 'BLOCKED', 'ByteDance AI Bot'],
      ['PerplexityBot', 'BLOCKED', 'Perplexity AI Bot'],
      
      // Aggressive Scrapers (Should be BLOCKED)
      ['MJ12bot', 'BLOCKED', 'Majestic SEO Aggressive Bot'],
      ['SemrushBot-SA', 'BLOCKED', 'SEMrush Aggressive Bot'],
      
      // SEO Tools (Should be ALLOWED but with delays)
      ['AhrefsBot', 'ALLOWED', 'Ahrefs SEO Bot'],
      ['SemrushBot', 'ALLOWED', 'SEMrush SEO Bot'],
      ['MozBot', 'ALLOWED', 'Moz SEO Bot']
    ];

    log('🔍 Testing User Agents:', 'blue');
    log('========================\n', 'blue');

    let passed = 0;
    let failed = 0;

    testCases.forEach(([userAgent, expected, description]) => {
      const result = this.testUserAgent(robotsContent, userAgent);
      const status = result.allowed ? 'ALLOWED' : 'BLOCKED';
      
      if (status === expected) {
        log(`✅ ${userAgent.padEnd(20)} ${status.padEnd(8)} - ${description}`, 'green');
        passed++;
      } else {
        log(`❌ ${userAgent.padEnd(20)} ${status.padEnd(8)} - ${description} (Expected: ${expected})`, 'red');
        failed++;
      }

      if (result.crawlDelay) {
        log(`   ⏰ Crawl Delay: ${result.crawlDelay}s`, 'yellow');
      }
    });

    // Test directory access
    log('\n🗂️ Testing Directory Access:', 'blue');
    log('=============================\n', 'blue');

    const directoryTests = [
      ['/gallery', 'ALLOWED', 'Public gallery pages'],
      ['/admin/', 'BLOCKED', 'Admin area'],
      ['/api/private/', 'BLOCKED', 'Private API'],
      ['/src/', 'BLOCKED', 'Source code'],
      ['/sitemap.xml', 'ALLOWED', 'Sitemap file'],
      ['/favicon.ico', 'ALLOWED', 'Favicon'],
      ['/.env', 'BLOCKED', 'Environment file'],
      ['/assets/logo.png', 'ALLOWED', 'Public assets']
    ];

    directoryTests.forEach(([path, expected, description]) => {
      const blocked = this.isPathBlocked(robotsContent, path);
      const status = blocked ? 'BLOCKED' : 'ALLOWED';
      
      if (status === expected) {
        log(`✅ ${path.padEnd(20)} ${status.padEnd(8)} - ${description}`, 'green');
        passed++;
      } else {
        log(`❌ ${path.padEnd(20)} ${status.padEnd(8)} - ${description} (Expected: ${expected})`, 'red');
        failed++;
      }
    });

    // Summary
    log('\n📊 TEST RESULTS:', 'bold');
    log('================', 'cyan');
    log(`✅ Passed: ${passed}`, 'green');
    log(`❌ Failed: ${failed}`, 'red');
    
    const score = Math.round((passed / (passed + failed)) * 100);
    const scoreColor = score >= 95 ? 'green' : score >= 80 ? 'yellow' : 'red';
    log(`🎯 Score: ${score}%`, scoreColor);

    if (score >= 95) {
      log('\n🎉 EXCELLENT! Your robots.txt is perfectly configured!', 'green');
    } else if (score >= 80) {
      log('\n⚠️ GOOD! Minor adjustments may be needed.', 'yellow');
    } else {
      log('\n🔧 NEEDS WORK! Several configuration issues found.', 'red');
    }

    // Additional info
    log('\n🔗 Testing Resources:', 'blue');
    log('- Google Search Console: https://search.google.com/search-console');
    log('- Robots.txt Tester: https://www.google.com/webmasters/tools/robots-testing-tool');
    log('- Live Test: curl -A "Googlebot" https://kalakritam.in/robots.txt\n');
  }

  testUserAgent(robotsContent, userAgent) {
    const lines = robotsContent.split('\n');
    let rules = [];
    let currentUserAgent = null;
    let currentRules = [];

    // Parse all rules for each user agent
    for (const line of lines) {
      const trimmed = line.trim();
      
      if (trimmed.startsWith('User-agent:')) {
        // Save previous rules if any
        if (currentUserAgent && currentRules.length > 0) {
          rules.push({ userAgent: currentUserAgent, rules: currentRules });
        }
        
        currentUserAgent = trimmed.split(':')[1].trim();
        currentRules = [];
      } else if (currentUserAgent && (trimmed.startsWith('Disallow:') || 
                                   trimmed.startsWith('Allow:') || 
                                   trimmed.startsWith('Crawl-delay:'))) {
        currentRules.push(trimmed);
      }
    }
    
    // Save last set of rules
    if (currentUserAgent && currentRules.length > 0) {
      rules.push({ userAgent: currentUserAgent, rules: currentRules });
    }

    // Find matching rules - specific user agent takes precedence over *
    let matchingRules = null;
    let wildcardRules = null;
    
    for (const ruleSet of rules) {
      if (ruleSet.userAgent === userAgent) {
        matchingRules = ruleSet.rules;
        break;
      } else if (ruleSet.userAgent === '*') {
        wildcardRules = ruleSet.rules;
      }
    }
    
    // Use specific rules if found, otherwise fall back to wildcard
    const applicableRules = matchingRules || wildcardRules || [];
    
    let allowed = true; // Default allow
    let crawlDelay = null;
    let hasDisallowRoot = false;
    
    for (const rule of applicableRules) {
      if (rule.startsWith('Disallow:')) {
        const path = rule.split(':')[1].trim();
        if (path === '/') {
          hasDisallowRoot = true;
          allowed = false;
        }
      } else if (rule.startsWith('Allow:')) {
        const path = rule.split(':')[1].trim();
        if (path === '/') {
          allowed = true;
        }
      } else if (rule.startsWith('Crawl-delay:')) {
        crawlDelay = parseInt(rule.split(':')[1].trim());
      }
    }

    return { 
      allowed: !hasDisallowRoot || allowed, 
      crawlDelay, 
      specificRuleFound: matchingRules !== null 
    };
  }

  isPathBlocked(robotsContent, testPath) {
    const lines = robotsContent.split('\n');
    let rules = [];
    let currentUserAgent = null;
    let currentRules = [];

    // Parse all rules
    for (const line of lines) {
      const trimmed = line.trim();
      
      if (trimmed.startsWith('User-agent:')) {
        if (currentUserAgent && currentRules.length > 0) {
          rules.push({ userAgent: currentUserAgent, rules: currentRules });
        }
        currentUserAgent = trimmed.split(':')[1].trim();
        currentRules = [];
      } else if (currentUserAgent && (trimmed.startsWith('Disallow:') || trimmed.startsWith('Allow:'))) {
        currentRules.push(trimmed);
      }
    }
    
    if (currentUserAgent && currentRules.length > 0) {
      rules.push({ userAgent: currentUserAgent, rules: currentRules });
    }

    // Find wildcard rules
    const wildcardRules = rules.find(r => r.userAgent === '*')?.rules || [];
    
    // In robots.txt, the LAST matching rule wins
    let finalDecision = null; // null = allowed by default
    
    for (const rule of wildcardRules) {
      if (rule.startsWith('Disallow:')) {
        const disallowPath = rule.split(':')[1].trim();
        if (this.pathMatches(testPath, disallowPath)) {
          finalDecision = 'blocked';
        }
      } else if (rule.startsWith('Allow:')) {
        const allowPath = rule.split(':')[1].trim();
        if (this.pathMatches(testPath, allowPath)) {
          finalDecision = 'allowed';
        }
      }
    }
    
    // Return true if blocked, false if allowed
    return finalDecision === 'blocked';
  }

  pathMatches(path, pattern) {
    if (pattern.endsWith('$')) {
      // Exact match at end
      const cleanPattern = pattern.replace('$', '');
      if (cleanPattern.includes('*')) {
        const regex = new RegExp(cleanPattern.replace(/\*/g, '.*') + '$');
        return regex.test(path);
      }
      return path.endsWith(cleanPattern);
    } else if (pattern.includes('*')) {
      // Wildcard match
      const regex = new RegExp('^' + pattern.replace(/\*/g, '.*'));
      return regex.test(path);
    } else {
      // Prefix match (most common for directories)
      return path.startsWith(pattern);
    }
  }
}

// Run the tester
const tester = new RobotsTester();
tester.testUserAgents();
