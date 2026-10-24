import React, { useState } from 'react';
import { NavTab } from '../types';
import { Search, ShoppingBag, Menu, X, Shield } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSelector } from './LanguageSelector';
import { useData } from '../context/DataContext';

interface TopNavBarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenConnect: () => void;
}

export const TopNavBar: React.FC<TopNavBarProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenConnect,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const { t } = useLanguage();
  const { isAdminAuthenticated, profile } = useData();

  const portraits = profile.personalPortraits;
  const activePhoto =
    portraits?.find((p) => p.id === profile.activePhotoId) || portraits?.[0];
  const avatarSrc =
    profile.avatarUrl ||
    activePhoto?.url ||
    '/images/profile/GRU02101.JPG?v=4';
  const avatarFallback =
    activePhoto?.fallbackUrl ||
    '/images/profile/GRU02101.JPG?v=4';

  const navItems: { key: NavTab; label: string }[] = [
    { key: 'home', label: t('nav.home', 'Home') },
    { key: 'blog', label: t('nav.blog', 'Blog') },
    { key: 'portfolio', label: t('nav.portfolio', 'Portfolio') },
    { key: 'shop', label: t('nav.shop', 'Shop') },
    { key: 'admin', label: t('nav.admin', 'Quản trị') },
    { key: 'contact', label: t('nav.contact', 'Contact') },
  ];

  const handleNavClick = (tab: NavTab) => {
    if (tab === 'contact') {
      onOpenConnect();
    } else {
      setActiveTab(tab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-[#f8f9ff] border-b border-[#bfc9c3]/50 sticky top-0 z-40 w-full backdrop-blur-md bg-opacity-95 transition-all duration-300">
      <div className="flex justify-between items-center h-20 px-4 md:px-6 max-w-[1280px] mx-auto w-full">
        {/* Brand Name */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left font-display text-[19px] sm:text-2xl md:text-[26px] font-bold text-[#003527] tracking-tight hover:opacity-90 transition-opacity cursor-pointer flex items-center gap-2.5 sm:gap-3 flex-shrink min-w-0"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-[#003527]/30 shadow-xs flex-shrink-0 bg-[#003527] flex items-center justify-center text-white font-display text-[12px] font-bold">
            {avatarError || !avatarSrc ? (
              <span>CT</span>
            ) : (
              <img
                src={avatarSrc}
                alt="Cao Nguyễn Nhật Triều"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.tried) {
                    target.dataset.tried = '1';
                    target.src = avatarFallback;
                  } else if (target.dataset.tried === '1') {
                    target.dataset.tried = '2';
                    target.src = '/images/profile/GRU02101.svg';
                  } else {
                    setAvatarError(true);
                  }
                }}
              />
            )}
          </div>
          <span className="truncate">Cao Nguyễn Nhật Triều</span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 items-center">
          {navItems.map((item) => {
            const isActive = activeTab === item.key;
            return (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.key)}
                className={`transition-all font-body text-[16px] px-2 py-1.5 cursor-pointer relative ${
                  isActive
                    ? 'text-[#003527] font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-[#003527] after:rounded-full'
                    : 'text-[#404944] hover:text-[#003527] hover:bg-[#eff4ff] rounded-lg'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 md:gap-3.5">
          {/* Language Selector */}
          <LanguageSelector align="right" />

          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-[#eff4ff] transition-colors text-[#003527] cursor-pointer"
            title={t('nav.searchTooltip', 'Search')}
            aria-label="Search"
          >
            <Search className="w-5 h-5 text-[#003527]" />
          </button>

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-[#eff4ff] transition-colors text-[#003527] cursor-pointer"
            title={t('nav.cartTooltip', 'Cart')}
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5 text-[#003527]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#003527] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* Connect Button (Desktop) */}
          <button
            onClick={onOpenConnect}
            className="hidden md:flex items-center justify-center bg-[#003527] text-white px-6 py-2.5 rounded-[4px] hover:bg-[#064e3b] transition-transform duration-100 active:scale-95 font-body text-[15px] font-medium shadow-sm cursor-pointer"
          >
            {t('nav.connectBtn', 'Connect')}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#003527] p-2 hover:bg-[#eff4ff] rounded-lg cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Backdrop & Drawer */}
      {mobileMenuOpen && (
        <>
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="md:hidden fixed inset-0 top-20 bg-black/40 backdrop-blur-xs z-30 animate-in fade-in duration-200"
          />
          <div className="md:hidden relative z-40 border-t border-[#bfc9c3]/50 bg-[#f8f9ff] px-6 py-4 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-200">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.key)}
                className={`w-full text-left px-4 py-3 rounded-xl font-body text-base min-h-[44px] flex items-center justify-between cursor-pointer ${
                  activeTab === item.key
                    ? 'bg-[#eff4ff] text-[#003527] font-bold'
                    : 'text-[#404944] hover:bg-[#eff4ff]'
                }`}
              >
                <span>{item.label}</span>
                {activeTab === item.key && <span className="w-2 h-2 rounded-full bg-[#003527]"></span>}
              </button>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConnect();
                }}
                className="w-full bg-[#003527] text-white py-3 min-h-[44px] rounded-xl font-medium font-body text-center cursor-pointer shadow-sm active:scale-98 transition-transform"
              >
                {t('nav.connectBtn', 'Connect')}
              </button>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

