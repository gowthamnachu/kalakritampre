import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({
  title = "Kalakritam - Premier Indian Art Gallery | Traditional Kala & Contemporary Kritam",
  description = "Discover Kalakritam, India's premier art gallery showcasing traditional kala, contemporary kritam, and cultural heritage. Explore 500+ masterpieces, join workshops, and connect with India's vibrant art community.",
  keywords = "Kalakritam, Indian art gallery, traditional kala art, contemporary kritam, Madhubani paintings, Warli art, Tanjore paintings, Indian cultural heritage, art workshops, art exhibitions, Indian artists, art community, art education, cultural tours, artist residency",
  image = "/og-image.jpg",
  url = "https://kalakritam.in",
  type = "website",
  author = "Kalakritam Art Gallery",
  publishedTime,
  modifiedTime,
  articleSection,
  articleTags,
  locale = "en_IN",
  twitterCard = "summary_large_image",
  canonical,
  noindex = false,
  nofollow = false,
  structuredData
}) => {
  // Get the base URL from environment or default
  const siteUrl = import.meta.env.VITE_APP_URL || "https://kalakritam.in";
  const fullUrl = url.startsWith('http') ? url : `${siteUrl}${url}`;
  const fullImageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;
  const canonicalUrl = canonical || fullUrl;

  const robotsContent = `${noindex ? 'noindex' : 'index'}, ${nofollow ? 'nofollow' : 'follow'}, max-image-preview:large, max-snippet:-1, max-video-preview:-1`;

  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": type === "article" ? "Article" : "WebPage",
    "name": title,
    "description": description,
    "url": fullUrl,
    "image": fullImageUrl,
    "publisher": {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      "name": "Kalakritam",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo.png`
      }
    },
    ...(type === "article" && {
      "author": {
        "@type": "Person",
        "name": author
      },
      "datePublished": publishedTime,
      "dateModified": modifiedTime || publishedTime,
      "articleSection": articleSection,
      "keywords": articleTags || keywords
    })
  };

  const finalStructuredData = structuredData || defaultStructuredData;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content={robotsContent} />
      <meta name="googlebot" content={robotsContent} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="Kalakritam" />
      <meta property="og:locale" content={locale} />
      
      {/* Article specific OG tags */}
      {type === "article" && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === "article" && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === "article" && articleSection && (
        <meta property="article:section" content={articleSection} />
      )}
      {type === "article" && articleTags && 
        articleTags.split(',').map((tag, index) => (
          <meta key={index} property="article:tag" content={tag.trim()} />
        ))
      }

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content="@kalakritam" />
      <meta name="twitter:creator" content="@kalakritam" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />

      {/* Additional Meta */}
      <meta name="theme-color" content="#c38f21" />
      <meta name="msapplication-TileColor" content="#c38f21" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(finalStructuredData)}
      </script>
    </Helmet>
  );
};

export default SEO;
