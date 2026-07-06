import { Html, Head, Main, NextScript } from "next/document";

// Document holds only static, global <head> concerns (fonts, favicon).
// All SEO/meta (title, description, canonical, OG, Twitter, JSON-LD) lives in
// the page-level <Seo> component via next/head so it stays in one place.
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
