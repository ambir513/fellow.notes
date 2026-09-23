import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers/theme-provider";
import TanstackQuery from "@/components/providers/tanstack-query";
import { ToastProvider } from "@/components/ui/toast";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#18181b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://fellownotes.app"),
  title: {
    default: "FellowNotes — The All-in-One Study Platform for Students",
    template: "%s — FellowNotes",
  },
  description:
    "Access chapter-wise notes, previous year question papers, AI study tools, and a student community — all in one place. Made for students who need the right study materials at the right time.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "FellowNotes",
    startupImage: ["/icons/icon-512x512.png"],
  },
  icons: {
    icon: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
  },
  keywords: [
    "study platform",
    "student notes",
    "PYQs",
    "previous year question papers",
    "AI study tools",
    "student community",
    "exam preparation",
    "study materials",
    "chapter wise notes",
    "BSc IT notes",
    "Mumbai University notes",
    "college notes",
    "note sharing",
    "document collaboration",
    "FellowNotes",
  ],
  authors: [{ name: "Amar Biradar", url: "https://github.com/ambir513" }],
  creator: "Amar Biradar",
  publisher: "Fellow Notes",
  openGraph: {
    title: "FellowNotes — The All-in-One Study Platform for Students",
    description:
      "Chapter-wise notes, PYQs, AI study tools, and a student community — designed for productivity.",
    url: "https://fellownotes.app",
    siteName: "FellowNotes",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/brand/og.png",
        width: 1200,
        height: 630,
        alt: "FellowNotes — The All-in-One Study Platform for Students",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FellowNotes — The All-in-One Study Platform for Students",
    description:
      "Chapter-wise notes, PYQs, AI study tools, and a student community — designed for productivity.",
    creator: "@ambir513",
    site: "@ambir513",
    images: ["/brand/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://fellownotes.app",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <TanstackQuery>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ToastProvider position="bottom-right">{children}</ToastProvider>
          </ThemeProvider>
        </TanstackQuery>
      </body>
    </html>
  );
}
