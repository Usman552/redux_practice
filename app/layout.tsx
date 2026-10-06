import type { Metadata } from "next";
import { ThemeProvider } from "../components/ThemeProvider";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "../components/ReduxProvider";
import KeycloakProvider from "@/components/KeycloakProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/Toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Nexora",
    template: "%s | Nexora",
  },
  description: "Shop quality products at great prices, all in one place.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <ReduxProvider>
            <KeycloakProvider>
              <Navbar />
              <div className="flex flex-1 flex-col">{children}</div>
              <Footer />
              <Toaster />
            </KeycloakProvider>
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
