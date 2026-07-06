import Head from "next/head";
import { BRAND, CONTACT } from "./data";

// Production URL — single source of truth for canonical / OG / structured data.
// Keep in sync with public/robots.txt and public/sitemap.xml.
export const SITE_URL = "https://portfolio.omar-js-script.com";

const TITLE = "Omar AbdelHalim — Senior Frontend Developer";
const DESCRIPTION =
  "Senior frontend engineer with 6+ years building fast, browser-native 3D web apps in React, Next.js & Three.js — from a HIPAA-grade 3D dental platform to logistics portals that saved six figures.";
const OG_IMAGE = `${SITE_URL}/assets/og-image.jpg`;

export default function Seo() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: BRAND.name,
    jobTitle: "Senior Frontend Developer",
    url: SITE_URL,
    image: OG_IMAGE,
    email: `mailto:${CONTACT.email}`,
    sameAs: [CONTACT.github, CONTACT.linkedin],
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "Three.js",
      "react-three-fiber",
      "WebGL",
      "Frontend Architecture",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Alexandria",
      addressCountry: "EG",
    },
  };

  return (
    <Head>
      <title>{TITLE}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={DESCRIPTION} />
      <meta
        name="keywords"
        content="Omar AbdelHalim, senior frontend developer, React developer, Next.js, Three.js, react-three-fiber, WebGL, 3D web apps, frontend engineer, Alexandria Egypt"
      />
      <meta name="author" content={BRAND.name} />
      <meta name="robots" content="index, follow" />
      <meta name="theme-color" content="#0A0C11" />
      <link rel="canonical" href={`${SITE_URL}/`} />
      <link rel="icon" href="/favicon.ico" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={BRAND.name} />
      <meta property="og:title" content={TITLE} />
      <meta property="og:description" content={DESCRIPTION} />
      <meta property="og:url" content={`${SITE_URL}/`} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:alt" content={`${BRAND.name} — portfolio`} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={TITLE} />
      <meta name="twitter:description" content={DESCRIPTION} />
      <meta name="twitter:image" content={OG_IMAGE} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Head>
  );
}
