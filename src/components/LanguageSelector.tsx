import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe, Check, Sparkles, ChevronDown } from 'lucide-react';
import { SupportedLanguage } from '../types';

interface LanguageSelectorProps {
  compact?: boolean;
  align?: 'left' | 'right';
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  compact = false,
  align = 'right',
}) => {
  const {
    language,
    setLanguage,
    allLanguages,
    activeLanguageOption,
    autoDetect,
    setAutoDetect,
    isTranslating,
    t,
  } = useLanguage();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code: SupportedLanguage) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Selector Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#bfc9c3]/60 bg-white/80 hover:bg-[#eff4ff] hover:border-[#003527]/40 text-[#0b1c30] transition-all cursor-pointer text-[13px] font-body font-medium shadow-2xs ${
          isTranslating ? 'animate-pulse' : ''
        }`}
        title={t('nav.language')}
        aria-expanded={isOpen}
      >
        <span className="text-[15px]">{activeLanguageOption.flag}</span>
        {!compact && (
          <span className="hidden sm:inline font-bold text-[#003527]">
            {activeLanguageOption.code.toUpperCase()}
          </span>
        )}
        <ChevronDown
          className={`w-3.5 h-3.5 text-[#707974] transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#003527]' : ''
          }`}
        />
      </button>

      {/* Translating Floating Toast Badge */}
      {isTranslating && (
        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-[#003527] text-white text-[11px] font-body px-2.5 py-1 rounded-full whitespace-nowrap shadow-lg flex items-center gap-1.5 z-50 animate-bounce">
          <Sparkles className="w-3 h-3 text-emerald-300" />
          <span>{t('modal.translating', 'Translating...')}</span>
        </div>
      )}

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute ${
            align === 'right' ? 'right-0' : 'left-0'
          } mt-2 w-56 bg-white rounded-xl shadow-xl border border-[#bfc9c3]/70 py-2 z-50 animate-in fade-in zoom-in-95 duration-150`}
        >
          {/* Header */}
          <div className="px-3.5 py-2 border-b border-[#bfc9c3]/40 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[12px] font-bold text-[#003527] uppercase tracking-wider font-display">
              <Globe className="w-3.5 h-3.5" />
              <span>{t('nav.language', 'Language')}</span>
            </div>
            <span className="text-[11px] text-[#707974] bg-[#eff4ff] px-1.5 py-0.5 rounded font-mono">
              i18n
            </span>
          </div>

          {/* Auto Translate Toggle */}
          <div className="px-3 py-2 border-b border-[#bfc9c3]/30 bg-[#f8f9ff]">
            <label className="flex items-center justify-between cursor-pointer group">
              <span className="text-[12px] font-body text-[#404944] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#003527]" />
                {t('nav.autoTranslate', 'Auto Translate')}
              </span>
              <input
                type="checkbox"
                checked={autoDetect}
                onChange={(e) => setAutoDetect(e.target.checked)}
                className="w-4 h-4 accent-[#003527] rounded cursor-pointer"
              />
            </label>
          </div>

          {/* Language Options List */}
          <div className="py-1 max-h-60 overflow-y-auto">
            {allLanguages.map((lang) => {
              const isSelected = lang.code === language;
              return (
                <button
                  key={lang.code}
                  onClick={() => handleSelect(lang.code)}
                  className={`w-full text-left px-3.5 py-2 flex items-center justify-between hover:bg-[#eff4ff] transition-colors cursor-pointer text-[13px] font-body ${
                    isSelected
                      ? 'bg-[#eff4ff]/80 text-[#003527] font-bold'
                      : 'text-[#0b1c30]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-[16px]">{lang.flag}</span>
                    <div className="flex flex-col">
                      <span>{lang.nativeName}</span>
                      <span className="text-[11px] text-[#707974] font-normal">
                        {lang.name}
                      </span>
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-[#003527] flex-shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
