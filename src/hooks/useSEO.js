import { useEffect } from 'react';

export const useSEO = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  author,
  locale = 'en_IN',
  twitterCard = 'summary_large_image',
  canonical,
  noindex = false,
  nofollow = false,
  structuredData
}) => {
  useEffect(() => {
    // Get the base URL from environment or default
    const siteUrl = import.meta.env.VITE_APP_URL || "https://kalakritam.in";
    const fullUrl = url?.startsWith('http') ? url : `${siteUrl}${url || ''}`;
    const fullImageUrl = image?.startsWith('http') ? image : `${siteUrl}${image || '/og-image.jpg'}`;
    const canonicalUrl = canonical || fullUrl;

    // Set document title
    if (title) {
      document.title = title;
    }

    // Helper function to update or create meta tags
    const updateMetaTag = (selector, attribute, value) => {
      if (!value) return;
      
      let element = document.head.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        if (selector.includes('property=')) {
          element.setAttribute('property', selector.match(/property="([^"]+)"/)[1]);
        } else if (selector.includes('name=')) {
          element.setAttribute('name', selector.match(/name="([^"]+)"/)[1]);
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', value);
    };

    // Helper function for link tags
    const updateLinkTag = (rel, href) => {
      if (!href) return;
      
      let element = document.head.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // Basic meta tags
    updateMetaTag('meta[name="description"]', 'content', description);
    updateMetaTag('meta[name="keywords"]', 'content', keywords);
    updateMetaTag('meta[name="author"]', 'content', author);
    updateMetaTag('meta[name="robots"]', 'content', 
      `${noindex ? 'noindex' : 'index'}, ${nofollow ? 'nofollow' : 'follow'}, max-image-preview:large, max-snippet:-1, max-video-preview:-1`
    );

    // Open Graph tags
    updateMetaTag('meta[property="og:title"]', 'content', title);
    updateMetaTag('meta[property="og:description"]', 'content', description);
    updateMetaTag('meta[property="og:image"]', 'content', fullImageUrl);
    updateMetaTag('meta[property="og:url"]', 'content', fullUrl);
    updateMetaTag('meta[property="og:type"]', 'content', type);
    updateMetaTag('meta[property="og:locale"]', 'content', locale);
    updateMetaTag('meta[property="og:site_name"]', 'content', 'Kalakritam');

    // Twitter Card tags
    updateMetaTag('meta[name="twitter:card"]', 'content', twitterCard);
    updateMetaTag('meta[name="twitter:title"]', 'content', title);
    updateMetaTag('meta[name="twitter:description"]', 'content', description);
    updateMetaTag('meta[name="twitter:image"]', 'content', fullImageUrl);

    // Canonical URL
    updateLinkTag('canonical', canonicalUrl);

    // Structured Data (JSON-LD)
    if (structuredData) {
      let scriptElement = document.head.querySelector('script[type="application/ld+json"][data-seo]');
      if (!scriptElement) {
        scriptElement = document.createElement('script');
        scriptElement.setAttribute('type', 'application/ld+json');
        scriptElement.setAttribute('data-seo', 'true');
        document.head.appendChild(scriptElement);
      }
      scriptElement.textContent = JSON.stringify(structuredData);
    }

    // Cleanup function
    return () => {
      // Optional: Clean up meta tags when component unmounts
      // This might not be necessary for most use cases
    };
  }, [title, description, keywords, image, url, type, author, locale, twitterCard, canonical, noindex, nofollow, structuredData]);
};

export default useSEO;
