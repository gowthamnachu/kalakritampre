import React from 'react';
import { useSEO } from '../../hooks/useSEO';

const SEO = ({
  title = "Kalakritam - Manifesting Through Art",
  description = "Discover Kalakritam - Manifesting Through Art. Experience our curated collection of traditional and contemporary Indian artworks, join immersive workshops, and connect with India's vibrant artistic community.",
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

  // Use the custom SEO hook WITHOUT any structured data to avoid validation conflicts
  // Use the custom SEO hook WITHOUT any structured data to avoid validation conflicts
  useSEO({
    title,
    description,
    keywords,
    image: fullImageUrl,
    url: fullUrl,
    type,
    author,
    locale,
    twitterCard,
    canonical,
    noindex,
    nofollow,
    structuredData: null // Completely disable structured data injection
  });

  return null; // This component doesn't render anything visible
};

export default SEO;
