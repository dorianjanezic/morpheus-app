import { Html, Head, Main, NextScript } from "next/document";
import { ColorSchemeScript } from '@mantine/core';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <ColorSchemeScript defaultColorScheme="dark" />
        <title>Morpheus | Today</title>
        <meta name="description" content="Morpheus is designed to incentivize the first open-source peer-to-peer network of personal general-purpose AI, powered by the MOR token." />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <link rel='icon' href='/favicon.ico' />
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Morpheus" />
        <meta property="og:description" content="Morpheus is designed to incentivize the first open-source peer-to-peer network of personal general-purpose AI, powered by the MOR token." />
        <meta property="og:image" content="https://mor.org/og-image.png" />
        <meta property="og:url" content="https://mor.org/" />
        <meta property="og:type" content="website" />
        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Morpheus" />
        <meta name="twitter:description" content="Morpheus is designed to incentivize the first open-source peer-to-peer network of personal general-purpose AI, powered by the MOR token." />
        <meta name="twitter:image" content="https://mor.org/og-image.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
