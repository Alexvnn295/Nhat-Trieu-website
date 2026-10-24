import React from 'react';
import { NavTab } from '../types';
import { Home, BookOpen, Briefcase, ShoppingBag, Send, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';

interface MobileBottomNavProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  cartCount: number;
  onOpenConnect: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  onOpenConnect,
}) => {
  const { t, language } = useLanguage();
  const isVi = language === 'vi';
  const { isAdminAuthenticated } = useData();

  const handleTabClick = (tab: NavTab) => {
    if (tab === 'contact') {
      onOpenConnect();
    } else {
      setActiveTab(tab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navItems = [
    {
      key: 'home' as NavTab,
      label: isVi ? 'Trang chủ' : 'Home',
      icon: Home,
    },
    {
      key: 'blog' as NavTab,
      label: isVi ? 'Tri thức' : 'Insights',
      icon: BookOpen,
    },
    {
      key: 'portfolio' as NavTab,
      label: isVi ? 'Hồ sơ' : 'Portfolio',
      icon: Briefcase,
    },
    {
      key: 'shop' as NavTab,
      label: isVi ? 'Tài liệu' : 'Shop',
      icon: ShoppingBag,
      badge: cartCount > 0 ? cartCount : undefined,
    },
    {
      key: 'contact' as NavTab,
      label: isVi ? 'Liên hệ' : 'Contact',
      icon: Send,
    },
  ];

  return (
    <nav
      id="mobile-bottom-nav"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#bfc9c3]/60 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] no-print pb-[max(env(safe-area-inset-bottom),0px)]"
      aria-label="Mobile Navigation"
    >
      <div className="flex items-center justify-around h-16 px-1 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = activeTab === item.key;
          const Icon = item.icon;

          return (
            <button
              key={item.key}
              onClick={() => handleTabClick(item.key)}
              className={`relative flex flex-col items-center justify-center flex-1 h-full min-w-[54px] py-1 transition-all duration-200 cursor-pointer active:scale-95 ${
                isActive
                  ? 'text-[#003527] font-bold'
                  : 'text-[#707974] hover:text-[#003527]'
              }`}
            >
              {/* Active Indicator Top Pill */}
              {isActive && (
                <span className="absolute top-0 w-8 h-1 bg-[#003527] rounded-b-full shadow-xs" />
              )}

              {/* Icon Container with Badge */}
              <div className="relative flex items-center justify-center">
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? 'scale-110 stroke-[2.4px] text-[#003527]' : 'stroke-[1.8px]'
                  }`}
                />

                {item.badge !== undefined && (
                  <span className="absolute -top-1.5 -right-2.5 bg-[#003527] text-white text-[10px] font-bold min-w-[17px] h-[17px] px-1 rounded-full flex items-center justify-center shadow-xs">
                    {item.badge}
                  </span>
                )}
              </div>

              {/* Label */}
              <span className="text-[11px] font-body tracking-tight mt-1 truncate max-w-[62px]">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
