#!/bin/bash
# Build script for Cloudflare Pages deployment

echo "🚀 Building Kalakritam for Cloudflare Pages..."

# Install dependencies
npm ci

# Build the project
npm run build

# Ensure _redirects file is in build output
if [ -f "public/_redirects" ]; then
    cp public/_redirects dist/
    echo "✅ _redirects file copied to dist/"
fi

# Ensure robots.txt and sitemap.xml are copied
if [ -f "public/robots.txt" ]; then
    cp public/robots.txt dist/
    echo "✅ robots.txt copied to dist/"
fi

if [ -f "public/sitemap.xml" ]; then
    cp public/sitemap.xml dist/
    echo "✅ sitemap.xml copied to dist/"
fi

echo "✅ Build completed successfully for Cloudflare Pages!"
echo "📁 Output directory: dist/"
echo "🌐 Ready for deployment!"
