import "./globals.scss";

import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import GridOverlay from "./_components/GridOverlay";
import type { Metadata } from 'next';

const title = `James Dow's | Designer and Developer`;
const description = `James Dow works at the intersection of design and development for companies like Peacock and IBM. James Dow pushes ideas from conception to their existence. James Dow collaborates using HTML, CSS, Javascript, and Design Thinking.`;
const images = `https://jamesdow.me/james-dow-experiences.png`;
const url = 'https://jamesdow.me';

export const metadata: Metadata = {
  title: {
    template: '%s | Designer and Developer',
    default: 'James Dow | Designer and Developer',
  },
  description,
  openGraph: {
    type: 'website',
    title,
    description,
    url,
    images
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <GridOverlay />
      </body>
      <GoogleAnalytics gaId="G-25V741CH1X" />
      <GoogleTagManager gtmId="GTM-P7QPPG7W" />
    </html>
  );
}
