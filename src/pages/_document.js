import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta
          name="description"
          content="I'm Omar AbdelHalim front-end developer with 4+ years of experience building beautiful, user-friendly web apps."
        />
        <meta
          name="keywords"
          content="Omar AbdelHalim, front-end developer, web developer, web apps, HTML, CSS, JavaScript"
        />
        <meta name="author" content="Omar AbdelHalim" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta property="og:title" content="Omar AbdelHalim Portfolio" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://omarabdelhalim.com" />
        <meta
          property="og:description"
          content="I'm Omar AbdelHalim front-end developer with 4+ years of experience building beautiful, user-friendly web apps."
        />
        <meta property="og:image" content="/assets/og-image.jpg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
