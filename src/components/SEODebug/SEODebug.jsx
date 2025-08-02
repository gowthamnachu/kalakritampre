import React, { useState, useEffect } from 'react';
import './SEODebug.css';

const SEODebug = () => {
  const [seoData, setSeoData] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development
    if (import.meta.env.DEV) {
      setIsVisible(true);
      
      // Extract SEO data from document
      const extractSEOData = () => {
        const data = {
          title: document.title,
          description: document.querySelector('meta[name="description"]')?.content,
          keywords: document.querySelector('meta[name="keywords"]')?.content,
          ogTitle: document.querySelector('meta[property="og:title"]')?.content,
          ogDescription: document.querySelector('meta[property="og:description"]')?.content,
          ogImage: document.querySelector('meta[property="og:image"]')?.content,
          ogUrl: document.querySelector('meta[property="og:url"]')?.content,
          twitterCard: document.querySelector('meta[name="twitter:card"]')?.content,
          twitterTitle: document.querySelector('meta[name="twitter:title"]')?.content,
          canonical: document.querySelector('link[rel="canonical"]')?.href,
          structuredData: []
        };

        // Extract JSON-LD structured data
        const scripts = document.querySelectorAll('script[type="application/ld+json"]');
        scripts.forEach(script => {
          try {
            data.structuredData.push(JSON.parse(script.textContent));
          } catch (e) {
            console.warn('Invalid JSON-LD:', e);
          }
        });

        setSeoData(data);
      };

      extractSEOData();
      
      // Re-extract when DOM changes (for SPA navigation)
      const observer = new MutationObserver(extractSEOData);
      observer.observe(document.head, { childList: true, subtree: true });

      return () => observer.disconnect();
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className="seo-debug">
      <div className="seo-debug-header">
        <h3>🔍 SEO Debug Panel</h3>
        <button onClick={() => setIsVisible(false)}>×</button>
      </div>
      
      <div className="seo-debug-content">
        <div className="seo-section">
          <h4>📝 Basic Meta Tags</h4>
          <div className="seo-item">
            <strong>Title:</strong>
            <span className={seoData.title ? 'seo-ok' : 'seo-missing'}>
              {seoData.title || 'Missing'}
            </span>
          </div>
          <div className="seo-item">
            <strong>Description:</strong>
            <span className={seoData.description ? 'seo-ok' : 'seo-missing'}>
              {seoData.description || 'Missing'}
            </span>
          </div>
          <div className="seo-item">
            <strong>Keywords:</strong>
            <span className={seoData.keywords ? 'seo-ok' : 'seo-missing'}>
              {seoData.keywords || 'Missing'}
            </span>
          </div>
        </div>

        <div className="seo-section">
          <h4>📱 Open Graph Tags</h4>
          <div className="seo-item">
            <strong>OG Title:</strong>
            <span className={seoData.ogTitle ? 'seo-ok' : 'seo-missing'}>
              {seoData.ogTitle || 'Missing'}
            </span>
          </div>
          <div className="seo-item">
            <strong>OG Description:</strong>
            <span className={seoData.ogDescription ? 'seo-ok' : 'seo-missing'}>
              {seoData.ogDescription || 'Missing'}
            </span>
          </div>
          <div className="seo-item">
            <strong>OG Image:</strong>
            <span className={seoData.ogImage ? 'seo-ok' : 'seo-missing'}>
              {seoData.ogImage || 'Missing'}
            </span>
          </div>
        </div>

        <div className="seo-section">
          <h4>🐦 Twitter Cards</h4>
          <div className="seo-item">
            <strong>Twitter Card:</strong>
            <span className={seoData.twitterCard ? 'seo-ok' : 'seo-missing'}>
              {seoData.twitterCard || 'Missing'}
            </span>
          </div>
          <div className="seo-item">
            <strong>Twitter Title:</strong>
            <span className={seoData.twitterTitle ? 'seo-ok' : 'seo-missing'}>
              {seoData.twitterTitle || 'Missing'}
            </span>
          </div>
        </div>

        <div className="seo-section">
          <h4>🔗 Technical SEO</h4>
          <div className="seo-item">
            <strong>Canonical URL:</strong>
            <span className={seoData.canonical ? 'seo-ok' : 'seo-missing'}>
              {seoData.canonical || 'Missing'}
            </span>
          </div>
          <div className="seo-item">
            <strong>Structured Data:</strong>
            <span className={seoData.structuredData.length > 0 ? 'seo-ok' : 'seo-missing'}>
              {seoData.structuredData.length} schema(s) found
            </span>
          </div>
        </div>

        {seoData.structuredData.length > 0 && (
          <div className="seo-section">
            <h4>📊 Structured Data Preview</h4>
            {seoData.structuredData.map((schema, index) => (
              <details key={index} className="schema-details">
                <summary>Schema #{index + 1} - {schema['@type']}</summary>
                <pre>{JSON.stringify(schema, null, 2)}</pre>
              </details>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SEODebug;
