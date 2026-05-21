import type { Metadata } from "next";
import { Geist, Geist_Mono, Lato } from "next/font/google";
// @ts-ignore
import "./globals.css";
// @ts-ignore
import './styles/app.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const latoSans = Lato({
  variable: "--font-lato-sans",
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"], // required
});

export const metadata: Metadata = {
  title: "Lunevia",
  description: "We create spaces where architecture meets landscape, where culture meets comfort, and where every detail is intentional.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${latoSans.variable} ${latoSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
