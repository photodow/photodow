import type { Metadata } from "next";
import { Inter } from "next/font/google";
import GridOverlay from "./components/GridOverlay";
import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en" data-carbon-theme="g90">
      <body className={inter.className}>
        {children}
        <GridOverlay />
      </body>
    </html>
  );
}
