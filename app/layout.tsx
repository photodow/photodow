import "./globals.scss";

import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import GridOverlay from "./_components/GridOverlay";
import type { Metadata } from 'next';
import { descriptionBase, images, titleDefault, titleTemplate } from "./_utils/metadata";

export const metadata: Metadata = {
  metadataBase: new URL('https://jamesdow.me'),
  title: {
    template: titleTemplate,
    default: titleDefault,
  },
  description: descriptionBase,
  openGraph: {
    type: 'website',
    title: {
      template: titleTemplate,
      default: titleDefault,
    },
    description: descriptionBase,
    images: images,
    url: '/'
  },
  twitter: {
    card: 'summary_large_image',
    title: {
      template: titleTemplate,
      default: titleDefault,
    },
    description: descriptionBase,
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
      <head>
        <meta property="fb:app_id" content="413427994472526" />
      </head>
      <body>
        {children}
        <GridOverlay />
      </body>
      <GoogleAnalytics gaId="G-25V741CH1X" />
      <GoogleTagManager gtmId="GTM-P7QPPG7W" />
    </html>
  );
}
