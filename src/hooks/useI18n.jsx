import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { LANGUAGES, STRINGS } from "../data/i18n";
import { itemName } from "../data/menu";
import { formatMoney } from "../lib/pricing";

const STORAGE_KEY = "957-lang";
const I18nContext = createContext(null);

function readInitialLanguage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (LANGUAGES.includes(saved)) return saved;
  } catch {
    // Storage can be blocked; fall back to the browser language.
  }
  const browser = (navigator.language || "ca").slice(0, 2);
  return LANGUAGES.includes(browser) ? browser : "ca";
}

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(readInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Ignore storage errors in private mode.
    }
  }, [lang]);

  const t = useCallback((key, vars) => {
    const template = STRINGS[lang][key] ?? STRINGS.ca[key] ?? key;
    return vars ? template.replace(/\{(\w+)\}/g, (_, name) => vars[name] ?? "") : template;
  }, [lang]);

  const value = useMemo(() => ({
    lang,
    setLang,
    t,
    money: (amount) => formatMoney(amount, lang),
    name: (item) => itemName(item, lang),
    desc: (item) => (item.desc ? item.desc[lang] || item.desc.ca : "")
  }), [lang, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}
