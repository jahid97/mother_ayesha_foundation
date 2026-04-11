import { Inter } from "next/font/google"
import "./globals.css"
import ScrollToTop from "@/components/scroll-to-top"
import InitialLoading from "@/components/initial-loading"
import Providers from "@/components/providers"
import { Toaster } from "sonner"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Mother Ayesha Foundation",
  description: "An independent, non-profit, non-governmental charitable organization dedicated to healthcare, education, research, skills development, and social welfare in Bangladesh.",
  generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <style>{`
          /* Hide Google Translate top toolbar */
          .goog-te-banner-frame,
          .goog-te-balloon-frame,
          #goog-gt-tt,
          .goog-te-menu-value:hover { display: none !important; }
          body { top: 0 !important; }
          .skiptranslate { display: none !important; }
        `}</style>
      </head>
      <body className={inter.className}>
        <Providers>
        {/* Hidden Google Translate mount point */}
        <div id="google_translate_element" style={{ display: "none" }} />

        <InitialLoading />
        <ScrollToTop />
        {children}
        <Toaster richColors position="bottom-right" />
        </Providers>

        {/* Google Translate scripts */}
        <Script id="google-translate-init" strategy="afterInteractive">{`
          function googleTranslateElementInit() {
            new google.translate.TranslateElement({
              pageLanguage: 'en',
              includedLanguages: 'ar,bn,es,en',
              autoDisplay: false
            }, 'google_translate_element');
          }
        `}</Script>
        <Script
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="lazyOnload"
        />
      </body>
    </html>
  )
}
