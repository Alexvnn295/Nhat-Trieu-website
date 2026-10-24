import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { SupportedLanguage, LanguageOption, BlogPost, Project, Product } from '../types';
import { LANGUAGES, UI_TRANSLATIONS } from '../data/translations';
import { BLOG_POSTS_LOCALIZED, PROJECTS_LOCALIZED, PRODUCTS_LOCALIZED } from '../data/localizedData';
import { useData } from './DataContext';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  autoDetect: boolean;
  setAutoDetect: (auto: boolean) => void;
  isTranslating: boolean;
  activeLanguageOption: LanguageOption;
  allLanguages: LanguageOption[];
  t: (key: string, defaultText?: string) => string;
  formatPrice: (amountUsd: number) => string;
  posts: BlogPost[];
  projects: Project[];
  products: Product[];
  triggerInstantTranslate: (targetLang?: SupportedLanguage) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY_LANG = 'portfolio_language_pref';
const STORAGE_KEY_AUTO = 'portfolio_language_autodetect';

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Detect browser language if auto-detect is enabled or no preference stored
  const detectBrowserLanguage = (): SupportedLanguage => {
    if (typeof window === 'undefined') return 'vi';
    const browserLang = (navigator.language || (navigator as any).userLanguage || '').toLowerCase();
    if (browserLang.startsWith('en')) return 'en';
    if (browserLang.startsWith('ja')) return 'ja';
    if (browserLang.startsWith('zh')) return 'zh';
    if (browserLang.startsWith('fr')) return 'fr';
    if (browserLang.startsWith('de')) return 'de';
    if (browserLang.startsWith('vi')) return 'vi';
    return 'vi';
  };

  const [autoDetect, setAutoDetectState] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY_AUTO);
      if (stored !== null) return stored === 'true';
    }
    return false; // Default to false so Vietnamese is always the initial default
  });

  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY_LANG) as SupportedLanguage;
      if (stored && ['vi', 'en', 'ja', 'zh', 'fr', 'de'].includes(stored)) {
        return stored;
      }
    }
    return 'vi'; // Default to Vietnamese
  });

  const [isTranslating, setIsTranslating] = useState<boolean>(false);

  // Sync to localStorage
  const setLanguage = (lang: SupportedLanguage) => {
    setIsTranslating(true);
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_LANG, lang);
    }
    setTimeout(() => {
      setIsTranslating(false);
    }, 400);
  };

  const setAutoDetect = (val: boolean) => {
    setAutoDetectState(val);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_AUTO, String(val));
    }
    if (val) {
      const detected = detectBrowserLanguage();
      setLanguage(detected);
    }
  };

  // Check language on initial mount if auto-detect is enabled
  useEffect(() => {
    if (autoDetect) {
      const detected = detectBrowserLanguage();
      if (detected !== language) {
        setLanguage(detected);
      }
    }
  }, []);

  const activeLanguageOption = useMemo(() => {
    return LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];
  }, [language]);

  // Translation lookup
  const t = (key: string, defaultText?: string): string => {
    const langDict = UI_TRANSLATIONS[language];
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    // Fallback to English dictionary
    if (UI_TRANSLATIONS.en[key]) {
      return UI_TRANSLATIONS.en[key];
    }
    // Fallback to Vietnamese dictionary
    if (UI_TRANSLATIONS.vi[key]) {
      return UI_TRANSLATIONS.vi[key];
    }
    return defaultText || key;
  };

  // Dynamic currency and price formatting
  const formatPrice = (amountUsd: number): string => {
    const rate = activeLanguageOption.currencyRate;
    const symbol = activeLanguageOption.currencySymbol;
    const converted = amountUsd * rate;

    if (language === 'vi') {
      return `${Math.round(converted).toLocaleString('vi-VN')} ${symbol}`;
    }
    if (language === 'ja' || language === 'zh') {
      return `${symbol}${Math.round(converted).toLocaleString()}`;
    }
    if (activeLanguageOption.currencyPosition === 'before') {
      return `${symbol}${converted.toFixed(2)}`;
    }
    return `${converted.toFixed(2)} ${symbol}`;
  };

  // Pull live data from DataContext
  const data = useData();

  // Localized datasets synced with live DataContext
  const posts = useMemo(() => {
    if (language === 'vi') return data.posts;
    const localized = BLOG_POSTS_LOCALIZED[language] || [];
    // Merge live posts from admin: if in localized, use it; if newly created or edited, keep data.posts
    return data.posts.map((post) => {
      const found = localized.find((lp) => lp.id === post.id);
      return found || post;
    });
  }, [language, data.posts]);

  const projects = useMemo(() => {
    if (language === 'vi') return data.projects;
    const localized = PROJECTS_LOCALIZED[language] || [];
    return data.projects.map((project) => {
      const found = localized.find((lp) => lp.id === project.id);
      return found || project;
    });
  }, [language, data.projects]);

  const products = useMemo(() => {
    if (language === 'vi') return data.products;
    const localized = PRODUCTS_LOCALIZED[language] || [];
    return data.products.map((product) => {
      const found = localized.find((lp) => lp.id === product.id);
      return found || product;
    });
  }, [language, data.products]);

  const triggerInstantTranslate = (targetLang?: SupportedLanguage) => {
    const langToSet = targetLang || (language === 'vi' ? 'en' : 'vi');
    setLanguage(langToSet);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        autoDetect,
        setAutoDetect,
        isTranslating,
        activeLanguageOption,
        allLanguages: LANGUAGES,
        t,
        formatPrice,
        posts,
        projects,
        products,
        triggerInstantTranslate,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
