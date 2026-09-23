import type { Metadata, Viewport } from "next";
import { Lato } from "next/font/google";
// @ts-ignore
import "./globals.css";
// @ts-ignore
import './styles/app.css';
import { ThemeProvider } from "./providers/ThemeProvider";
import { SmoothScroll } from "./providers/SmoothScroll";
import SplashScreen from "@/components/SplashScreen";
import { Toaster } from "@/components/ui/sonner";

const latoSans = Lato({
  variable: "--font-lato-sans",
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"], // required
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lunevia",
  description: "We create spaces where architecture meets landscape, where culture meets comfort, and where every detail is intentional.",
};

// Declared explicitly (this is a customized Next build — see AGENTS.md — so don't
// rely on default meta injection). maximumScale/userScalable are intentionally
// omitted to preserve pinch-to-zoom accessibility.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${latoSans.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SmoothScroll>{children}</SmoothScroll>
          <SplashScreen />
          <Toaster richColors position="top-center" />

        </ThemeProvider>
      </body>
    </html>
  );
}
