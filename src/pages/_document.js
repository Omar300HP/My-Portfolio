import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta
          name="description"
          content="Omar AbdelHalim — Senior Frontend Developer with 6+ years shipping fast, browser-native 3D web apps in React & Next.js."
        />
        <meta
          name="keywords"
          content="Omar AbdelHalim, senior frontend developer, React, Next.js, Three.js, react-three-fiber, WebGL, 3D web apps"
        />
        <meta name="author" content="Omar AbdelHalim" />

        <meta property="og:title" content="Omar AbdelHalim — Senior Frontend Developer" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://omarabdelhalim.com" />
        <meta
          property="og:description"
          content="Senior frontend engineer building fast, browser-native 3D web apps in React & Next.js — from a HIPAA-grade 3D dental platform to logistics portals that saved six figures."
        />
        <meta property="og:image" content="/assets/og-image.jpg" />

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
