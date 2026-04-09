"use client"

import { createContext, useContext, useState, useEffect } from "react"
import en from "./i18n/en.json"
import ar from "./i18n/ar.json"
import es from "./i18n/es.json"
import bn from "./i18n/bn.json"

const translations = { EN: en, AR: ar, ES: es, BN: bn }

const RTL_LANGUAGES = ["AR"]

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("EN")

  // Load saved language on mount
  useEffect(() => {
    const saved = localStorage.getItem("maf_language")
    if (saved && translations[saved]) {
      setLanguage(saved)
      applyLanguageToDocument(saved)
    }
  }, [])

  function applyLanguageToDocument(lang) {
    const isRTL = RTL_LANGUAGES.includes(lang)
    document.documentElement.dir = isRTL ? "rtl" : "ltr"
    document.documentElement.lang = lang.toLowerCase()
  }

  function changeLanguage(lang) {
    if (!translations[lang]) return
    setLanguage(lang)
    localStorage.setItem("maf_language", lang)
    applyLanguageToDocument(lang)
  }

  // Resolve a dot-notation key like "nav.home" against the current translation
  function t(key) {
    const dict = translations[language] || translations["EN"]
    const value = key.split(".").reduce((obj, k) => obj?.[k], dict)
    // Fall back to English if key not found
    if (value === undefined) {
      const fallback = key.split(".").reduce((obj, k) => obj?.[k], translations["EN"])
      return fallback ?? key
    }
    return value
  }

  const isRTL = RTL_LANGUAGES.includes(language)

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage must be used inside <LanguageProvider>")
  return ctx
}
