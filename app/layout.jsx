import { Inter } from "next/font/google"
import "./globals.css"
import ScrollToTop from "@/components/scroll-to-top"
import ChatHelp from "@/components/chat-help"
import InitialLoading from "@/components/initial-loading"
import { Toaster } from "sonner"
import { LanguageProvider } from "@/lib/language-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Mother Ayesha Foundation",
  description: "An independent, non-profit, non-governmental charitable organization dedicated to healthcare, education, research, skills development, and social welfare in Bangladesh.",
  generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <InitialLoading />
          <ScrollToTop />
          {children}
          <ChatHelp />
          <Toaster richColors position="bottom-right" />
        </LanguageProvider>
      </body>
    </html>
  )
}



import './globals.css'