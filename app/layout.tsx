import "./globals.scss";

import { GoogleAnalytics } from '@next/third-parties/google';
import GridOverlay from "./_components/GridOverlay";
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'James Dow',
  description: 'blah blah blah blah blah',
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
    </html>
  );
}
