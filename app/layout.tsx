import type { Metadata } from "next";
import { GoogleAnalytics } from '@next/third-parties/google'
// import Head from 'next/head'
import Header from "./components/Header";
import GridOverlay from "./components/GridOverlay";
// import Script from 'next/script';
import "./globals.scss";

// declare global {
//     interface Window {
//         dataLayer:any;
//         arguments:any;
//     }
// }

export const metadata: Metadata = {
  title: "James Dow",
  description: "I'm James Dow, a passionate Web Designer & Developer. I thrive at the intersection of these two dynamic disciplines, witnessing the evolution of an idea from conception to its vibrant existence. My journey involves bringing concepts to life and ensuring they resonate seamlessly in the digital realm. Let's embark on a creative journey together!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-carbon-theme="g100">
      <body>
        <Header />
        {children}
        <GridOverlay />
      </body>
      <GoogleAnalytics gaId="G-25V741CH1X" />
    </html>
  );
}
