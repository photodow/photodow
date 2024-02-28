import "./globals.scss";

import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import GridOverlay from "./_components/GridOverlay";
import type { Metadata } from 'next';
import { metaDataObj } from "./_utils/metadata";

export const metadata: Metadata = metaDataObj();


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
      {renderAnalytics()}
    </html>
  );

  function renderAnalytics () {
    return process.env.NODE_ENV === 'development' ? null : (
      <>
        <GoogleAnalytics gaId="G-25V741CH1X" />
        <GoogleTagManager gtmId="GTM-P7QPPG7W" />
      </>
    );
  }
}
