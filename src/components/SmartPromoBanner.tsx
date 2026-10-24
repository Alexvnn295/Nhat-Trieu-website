import React, { useState } from 'react';
import { PromoBannerConfig, NavTab } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { ArrowRight, Sparkles, X } from 'lucide-react';

interface SmartPromoBannerProps {
  config?: PromoBannerConfig;
  onNavigateTab?: (tab: NavTab) => void;
  onNavigate?: (tab: NavTab) => void;
}

export const SmartPromoBanner: React.FC<SmartPromoBannerProps> = ({
  config: propConfig,
  onNavigateTab,
  onNavigate,
}) => {
  const { promoBanner } = useData();
  const config = propConfig || promoBanner;
  const navigate = onNavigateTab || onNavigate || (() => {});
  const { language } = useLanguage();
  const [dismissed, setDismissed] = useState(false);

  if (!config || !config.enabled || dismissed) {
    return null;
  }

  const isVi = language === 'vi';
  const text = isVi ? (config.textVi || '') : (config.textEn || config.textVi || '');
  const ctaText = isVi ? (config.ctaTextVi || 'Xem Ngay') : (config.ctaTextEn || config.ctaTextVi || 'View');

  // Theme style mapping
  const themeKey = config.theme || 'emerald';
  const themeClasses = {
    emerald: {
      bg: 'bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-950 border-b border-emerald-500/20 text-emerald-100',
      badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      cta: 'bg-emerald-500 text-emerald-950 hover:bg-emerald-400 font-medium',
      sparkle: 'text-emerald-400',
    },
    amber: {
      bg: 'bg-gradient-to-r from-amber-950 via-orange-950 to-neutral-950 border-b border-amber-500/20 text-amber-100',
      badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      cta: 'bg-amber-500 text-amber-950 hover:bg-amber-400 font-medium',
      sparkle: 'text-amber-400',
    },
    indigo: {
      bg: 'bg-gradient-to-r from-indigo-950 via-slate-900 to-sky-950 border-b border-indigo-500/20 text-indigo-100',
      badge: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      cta: 'bg-indigo-500 text-indigo-950 hover:bg-indigo-400 font-medium',
      sparkle: 'text-indigo-400',
    },
    rose: {
      bg: 'bg-gradient-to-r from-rose-950 via-slate-900 to-neutral-950 border-b border-rose-500/20 text-rose-100',
      badge: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      cta: 'bg-rose-500 text-white hover:bg-rose-400 font-medium',
      sparkle: 'text-rose-400',
    },
  }[themeKey] || {
    bg: 'bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-950 border-b border-emerald-500/20 text-emerald-100',
    badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    cta: 'bg-emerald-500 text-emerald-950 hover:bg-emerald-400 font-medium',
    sparkle: 'text-emerald-400',
  };

  const handleCtaClick = () => {
    if (config.targetUrl && config.targetUrl.startsWith('http')) {
      window.open(config.targetUrl, '_blank', 'noopener,noreferrer');
    } else {
      navigate(config.targetTab || 'blog');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div
      id="smart-promo-banner"
      className={`${themeClasses.bg} py-2.5 px-4 relative z-50 text-xs sm:text-sm font-sans transition-all duration-300 shadow-sm`}
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold border ${themeClasses.badge} whitespace-nowrap`}
          >
            <Sparkles className={`w-3 h-3 ${themeClasses.sparkle}`} />
            {config.badge}
          </span>
          <p className="truncate text-white/90 font-medium">{text}</p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            id="promo-banner-cta-button"
            onClick={handleCtaClick}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs transition-colors cursor-pointer shadow-sm ${themeClasses.cta}`}
          >
            <span>{ctaText}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            id="promo-banner-dismiss-button"
            onClick={() => setDismissed(true)}
            className="text-white/60 hover:text-white p-1 transition-colors cursor-pointer rounded"
            title="Đóng thông báo"
            aria-label="Đóng thông báo"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
