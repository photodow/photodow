import "./globals.scss";

import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import GridOverlay from "./_components/GridOverlay";
import Head from "next/head";

const title = `James Dow's | Designer and Developer`;
const description = `James Dow works at the intersection of design and development for companies like Peacock and IBM. James Dow pushes ideas from conception to their existence. James Dow collaborates using HTML, CSS, Javascript, and Design Thinking.`;
const socialImage = `https://jamesdow.me/james-dow-experiences.png`;
const url = 'https://jamesdow.me';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={socialImage} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={url} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={socialImage} />
      </Head>
      <body>
        {children}
        <GridOverlay />
      </body>
      <GoogleAnalytics gaId="G-25V741CH1X" />
      <GoogleTagManager gtmId="GTM-P7QPPG7W" />
    </html>
  );
}
