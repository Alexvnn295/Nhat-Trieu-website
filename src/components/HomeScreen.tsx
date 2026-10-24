import React, { useState, useEffect, useMemo } from 'react';
import { NavTab, BlogPost, Project } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import {
  TrendingUp,
  Briefcase,
  GraduationCap,
  Laptop,
  ArrowRight,
  Sparkles,
  MessageSquare,
  Send,
  Calendar,
  X,
  Camera,
  Upload,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  RotateCw,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { PERSONAL_PORTRAITS } from '../data/profileData';
import { MediaShowcase } from './MediaShowcase';
import { PhotoManagerModal } from './PhotoManagerModal';

interface HomeScreenProps {
  onNavigate: (tab: NavTab) => void;
  onOpenArticle: (post: BlogPost) => void;
  onOpenProject: (project: Project) => void;
  onOpenConnect?: (subject?: string) => void;
  latestInsightArticle: BlogPost;
  featuredProjects: Project[];
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  onOpenArticle,
  onOpenProject,
  onOpenConnect,
  latestInsightArticle,
  featuredProjects,
}) => {
  const { t, language } = useLanguage();
  const { profile, updateProfile } = useData();
  const [isFabHovered, setIsFabHovered] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

  const isVi = language === 'vi';
  
  // Combine official studio portraits and any custom portraits uploaded by the user
  const basePortraits = profile.personalPortraits || PERSONAL_PORTRAITS;
  const cleanUrl = (u?: string) => (u ? u.split('?')[0] : '');

  const portraits = useMemo(() => {
    const list = [...basePortraits];
    if (
      profile.avatarUrl &&
      !list.some(
        (p) =>
          cleanUrl(p.url) === cleanUrl(profile.avatarUrl) ||
          cleanUrl(p.fallbackUrl) === cleanUrl(profile.avatarUrl)
      )
    ) {
      list.unshift({
        id: 'custom-avatar',
        filename: 'custom_portrait.jpg',
        url: profile.avatarUrl,
        fallbackUrl: profile.avatarUrl,
        titleVi: 'Chân dung Tải lên Mới nhất',
        titleEn: 'Latest Uploaded Portrait',
        poseVi: 'Hình ảnh chân dung tùy chỉnh cập nhật mới nhất',
        poseEn: 'Latest custom uploaded executive portrait',
        badgeVi: 'Ảnh Đã Tải Lên',
        badgeEn: 'Uploaded Photo',
        isDefault: true,
      });
    }
    return list;
  }, [basePortraits, profile.avatarUrl]);

  // Active portrait index and auto-rotation states
  const [currentIndex, setCurrentIndex] = useState(() => {
    const idx = portraits.findIndex((p) => p.id === profile.activePhotoId);
    return idx >= 0 ? idx : 0;
  });
  const [direction, setDirection] = useState<number>(1);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [imageErrorMap, setImageErrorMap] = useState<Record<string, boolean>>({});

  const handleHeroQuickUpload = (photo: typeof portraits[0], e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const result = event.target?.result as string;
      if (result) {
        // Clear error immediately
        setImageErrorMap((prev) => ({ ...prev, [photo.id]: false }));

        const updatedPortraits = portraits.map((p) =>
          p.id === photo.id
            ? { ...p, url: result, fallbackUrl: result }
            : p
        );

        updateProfile({
          avatarUrl: result,
          activePhotoId: photo.id,
          personalPortraits: updatedPortraits,
        });

        // Persist to server
        try {
          await fetch('/api/profile/upload-photo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              filename: photo.filename,
              base64Data: result,
              photoId: photo.id,
            }),
          });
        } catch (err) {
          console.error('Server upload error:', err);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  // Sync if profile.activePhotoId changes externally
  useEffect(() => {
    if (profile.activePhotoId) {
      const idx = portraits.findIndex((p) => p.id === profile.activePhotoId);
      if (idx >= 0 && idx !== currentIndex) {
        setDirection(idx > currentIndex ? 1 : -1);
        setCurrentIndex(idx);
      }
    }
  }, [profile.activePhotoId, portraits]);

  // Auto-rotation timer effect (cycles every 4.5 seconds)
  const ROTATION_INTERVAL = 4500;
  useEffect(() => {
    if (!isAutoRotating || isCardHovered || portraits.length <= 1) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % portraits.length);
    }, ROTATION_INTERVAL);

    return () => clearInterval(interval);
  }, [isAutoRotating, isCardHovered, portraits.length]);

  const activePhoto = portraits[currentIndex] || portraits[0];

  const handleSelectIndex = (idx: number) => {
    if (idx === currentIndex) return;
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
    const selected = portraits[idx];
    if (selected) {
      updateProfile({ avatarUrl: selected.url, activePhotoId: selected.id });
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + portraits.length) % portraits.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % portraits.length);
  };

  const toggleAutoRotate = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAutoRotating((prev) => !prev);
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-20 pb-20 px-4 md:px-6 overflow-hidden">
        {/* Subtle decorative background gradient */}
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#b0f0d6]/40 via-[#f8f9ff] to-[#f8f9ff]"></div>

        <div className="max-w-[1280px] mx-auto relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left Column: Text & CTAs */}
          <div className="col-span-12 md:col-span-7 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#003527]/10 border border-[#003527]/20 w-fit">
              <span className="w-2 h-2 rounded-[2px] bg-[#003527] block"></span>
              <span className="font-body text-[12px] font-bold text-[#003527] tracking-widest uppercase">
                {t('hero.badge', 'CHIẾN LƯỢC & VẬN HÀNH TOÀN DIỆN')}
              </span>
            </div>

            <h1 className="font-display text-[28px] sm:text-[38px] md:text-[46px] lg:text-[52px] font-bold text-[#0b1c30] leading-[1.18] sm:leading-[1.14] tracking-tight">
              {t('hero.title.pre', 'Hoạch định')}{' '}
              <span className="text-[#003527]">{t('hero.title.economics', 'Chiến lược')}</span>,{' '}
              <span className="text-[#2b6954]">{t('hero.title.education', 'Vận hành & Bán hàng')}</span> &amp;{' '}
              <span className="text-[#003527]">{t('hero.title.tech', 'Doanh nghiệp Nền tảng')}</span>.
            </h1>

            <p className="font-body text-[16px] sm:text-[17px] md:text-[18px] text-[#404944] leading-relaxed max-w-2xl">
              {t('hero.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2 w-full sm:w-auto">
              <button
                onClick={() => {
                  const element = document.getElementById('core-focus-areas');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-[#003527] text-white px-8 py-3.5 min-h-[44px] rounded-xl font-display text-[15px] sm:text-[16px] font-semibold hover:bg-[#064e3b] transition-all duration-100 active:scale-95 shadow-sm cursor-pointer text-center flex items-center justify-center"
              >
                {t('hero.cta.explore', 'Explore Now')}
              </button>
              <button
                onClick={() => onNavigate('portfolio')}
                className="border border-[#003527] text-[#003527] px-8 py-3.5 min-h-[44px] rounded-xl font-display text-[15px] sm:text-[16px] font-semibold hover:bg-[#eff4ff] transition-all duration-100 active:scale-95 cursor-pointer text-center flex items-center justify-center"
              >
                {t('hero.cta.portfolio', 'View Portfolio')}
              </button>
            </div>
          </div>

          {/* Right Column: Hero Portrait with Rotating Showcase & Glass Card */}
          <div className="col-span-12 md:col-span-5 relative mt-6 md:mt-0">
            <div
              className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-[0px_8px_30px_rgba(15,23,42,0.12)] border border-[#003527]/20 group bg-neutral-950 select-none"
              style={{ perspective: 1200 }}
              onMouseEnter={() => setIsCardHovered(true)}
              onMouseLeave={() => setIsCardHovered(false)}
            >
              {/* Animated 3D Rotating Portrait Display */}
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activePhoto.id + '-' + currentIndex}
                  custom={direction}
                  initial={{
                    opacity: 0,
                    rotateY: direction > 0 ? 12 : -12,
                    scale: 0.96,
                    filter: 'blur(3px)',
                  }}
                  animate={{
                    opacity: 1,
                    rotateY: 0,
                    scale: 1,
                    filter: 'blur(0px)',
                  }}
                  exit={{
                    opacity: 0,
                    rotateY: direction > 0 ? -12 : 12,
                    scale: 1.04,
                    filter: 'blur(3px)',
                  }}
                  transition={{
                    duration: 0.65,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="absolute inset-0 w-full h-full"
                >
                  {imageErrorMap[activePhoto.id] ? (
                    <div className="w-full h-full bg-gradient-to-br from-[#00281d] via-[#003527] to-[#041c14] flex flex-col items-center justify-center p-6 text-center text-white relative select-none">
                      {/* Decorative subtle ambient ring */}
                      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-tr from-[#004d38] to-[#10b981]/30 border border-[#a7f3d0]/30 shadow-2xl flex items-center justify-center mb-4 relative group">
                        <span className="font-display text-[26px] sm:text-[30px] font-bold text-[#ecfdf5] tracking-wider">
                          CNN
                        </span>
                        <div className="absolute -bottom-2 px-2 py-0.5 bg-emerald-500 text-neutral-950 text-[10px] font-bold uppercase rounded-md shadow-xs">
                          {isVi ? 'Hồ sơ' : 'Executive'}
                        </div>
                      </div>

                      <h3 className="font-display text-[18px] sm:text-[22px] font-bold text-white mb-1 tracking-tight">
                        Cao Nguyễn Nhật Triều
                      </h3>
                      <p className="font-body text-[12px] text-[#a7f3d0] max-w-[260px] leading-relaxed mb-4">
                        {isVi
                          ? 'Chiến lược, Vận hành, Bán hàng & AI'
                          : 'Strategy, Operations, Sales & AI Consultant'}
                      </p>

                      {/* File Target Info & Direct Upload Button */}
                      <div className="w-full max-w-[280px] bg-black/40 backdrop-blur-md rounded-xl p-3 border border-white/15 space-y-2 mb-2">
                        <div className="flex items-center justify-between text-[11px] font-mono text-[#d1fae5]">
                          <span>📁 {activePhoto.filename}</span>
                          <span className="text-emerald-400 font-sans text-[10px] bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                            {isVi ? 'Chờ tải tệp' : 'Upload ready'}
                          </span>
                        </div>
                        <label className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:scale-98 text-neutral-950 font-display text-[13px] font-bold shadow-lg transition-all cursor-pointer">
                          <Upload className="w-4 h-4" />
                          <span>{isVi ? 'Tải ảnh này lên ngay' : 'Upload this portrait'}</span>
                          <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp,image/jpg"
                            className="hidden"
                            onChange={(e) => handleHeroQuickUpload(activePhoto, e)}
                          />
                        </label>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsPhotoModalOpen(true);
                        }}
                        className="text-[11px] text-white/70 hover:text-white underline underline-offset-4 cursor-pointer pt-1"
                      >
                        {isVi ? 'Mở quản lý 4 bộ ảnh chân dung' : 'Open 4-portrait studio manager'}
                      </button>
                    </div>
                  ) : (
                    <>
                      <img
                        src={activePhoto.url}
                        alt={isVi ? activePhoto.titleVi : activePhoto.titleEn}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (!target.dataset.fallbackStep) {
                            target.dataset.fallbackStep = '1';
                            target.src = activePhoto.fallbackUrl || `/images/profile/${activePhoto.filename}`;
                          } else if (target.dataset.fallbackStep === '1') {
                            target.dataset.fallbackStep = '2';
                            target.src = `/images/profile/${activePhoto.filename.replace(/\.[^.]+$/, '')}.svg`;
                          } else {
                            setImageErrorMap((prev) => ({ ...prev, [activePhoto.id]: true }));
                          }
                        }}
                      />
                      {/* Subtle Vignette & Gradient Overlays for High Legibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/60 pointer-events-none" />
                    </>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Segmented Timeline Progress Bars (Top Edge) */}
              <div className="absolute top-2 left-4 right-4 z-25 flex items-center gap-1.5 pointer-events-auto">
                {portraits.map((p, idx) => {
                  const isCurrent = idx === currentIndex;
                  const isPast = idx < currentIndex;
                  return (
                    <button
                      key={p.id + '-prog'}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectIndex(idx);
                      }}
                      className="flex-1 h-1 rounded-full bg-white/20 overflow-hidden cursor-pointer hover:h-1.5 transition-all"
                      title={`${p.filename} (${idx + 1}/${portraits.length})`}
                      aria-label={`Jump to portrait ${idx + 1}`}
                    >
                      {isCurrent ? (
                        <motion.div
                          key={`prog-bar-${currentIndex}-${isAutoRotating && !isCardHovered}`}
                          initial={{ width: '0%' }}
                          animate={{
                            width: isAutoRotating && !isCardHovered ? '100%' : '100%',
                          }}
                          transition={{
                            duration: isAutoRotating && !isCardHovered ? ROTATION_INTERVAL / 1000 : 0.2,
                            ease: 'linear',
                          }}
                          className="h-full bg-emerald-400 rounded-full"
                        />
                      ) : (
                        <div
                          className={`h-full rounded-full transition-all ${
                            isPast ? 'bg-white/60' : 'bg-transparent'
                          }`}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Top Controls: Executive Badge & Pose Switcher */}
              <div className="absolute top-5 left-4 right-4 z-20 flex items-center justify-between gap-2 pointer-events-auto">
                {/* Executive Status Badge Left */}
                <span className="px-2.5 py-1 bg-black/65 backdrop-blur-md text-white text-[11px] font-body font-bold rounded-lg border border-white/20 shadow-xs flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="hidden sm:inline">Cao Nguyễn Nhật Triều</span>
                  <span className="sm:hidden">Triều Cao</span>
                </span>

                {/* Quick Pose Switcher, Auto-rotate Toggle & Photo Manager */}
                <div className="flex items-center gap-1 bg-black/65 backdrop-blur-md p-1 rounded-xl border border-white/20 shadow-xs">
                  {portraits.map((p, idx) => {
                    const isActive = currentIndex === idx;
                    const shortLabel =
                      idx === 0
                        ? isVi
                          ? 'Trực diện'
                          : 'Front'
                        : idx === 1
                        ? isVi
                          ? 'Góc nghiêng'
                          : '3/4'
                        : idx === 2
                        ? isVi
                          ? 'Lãnh đạo'
                          : 'Action'
                        : `#${idx + 1}`;
                    return (
                      <button
                        key={p.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectIndex(idx);
                        }}
                        className={`px-2 py-1 rounded-lg text-[11px] font-body font-semibold transition-all cursor-pointer relative ${
                          isActive
                            ? 'bg-[#003527] text-white shadow-xs'
                            : 'text-white/80 hover:text-white hover:bg-white/15'
                        }`}
                        title={`${p.filename} - ${isVi ? p.titleVi : p.titleEn}`}
                      >
                        {shortLabel}
                      </button>
                    );
                  })}

                  {/* Auto-rotate Toggle Button */}
                  <button
                    onClick={toggleAutoRotate}
                    className={`p-1 rounded-lg transition-colors cursor-pointer ${
                      isAutoRotating
                        ? 'text-emerald-400 hover:text-emerald-300 hover:bg-white/15'
                        : 'text-white/50 hover:text-white hover:bg-white/15'
                    }`}
                    title={
                      isAutoRotating
                        ? isVi
                          ? 'Tạm dừng tự động xoay chuyển'
                          : 'Pause auto-rotation'
                        : isVi
                        ? 'Bật tự động xoay chuyển theo thời gian'
                        : 'Resume auto-rotation'
                    }
                    aria-label="Toggle auto-rotate"
                  >
                    {isAutoRotating ? (
                      <Pause className="w-3.5 h-3.5" />
                    ) : (
                      <Play className="w-3.5 h-3.5" />
                    )}
                  </button>

                  {/* Photo Manager Modal Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsPhotoModalOpen(true);
                    }}
                    className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/15 transition-colors cursor-pointer ml-0.5"
                    title={isVi ? 'Quản lý & tải ảnh chân dung mới' : 'Manage portraits'}
                    aria-label="Manage portraits"
                  >
                    <Camera className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Next / Prev Chevrons (Hover to reveal) */}
              {portraits.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/55 hover:bg-black/85 backdrop-blur-md text-white/80 hover:text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 hover:scale-108 shadow-md border border-white/15 cursor-pointer"
                    title={isVi ? 'Ảnh trước' : 'Previous portrait'}
                    aria-label="Previous portrait"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/55 hover:bg-black/85 backdrop-blur-md text-white/80 hover:text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 hover:scale-108 shadow-md border border-white/15 cursor-pointer"
                    title={isVi ? 'Ảnh kế tiếp' : 'Next portrait'}
                    aria-label="Next portrait"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {/* Current Active Photo Caption Pill (Above Insight Card) */}
              <div className="absolute bottom-20 left-4 right-4 z-20 flex items-center justify-between gap-2 pointer-events-none">
                <div className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/15 text-white/90 text-[11px] font-body flex items-center gap-1.5 shadow-sm max-w-[80%] truncate">
                  <RotateCw
                    className={`w-3 h-3 text-emerald-400 flex-shrink-0 ${
                      isAutoRotating && !isCardHovered ? 'animate-spin' : ''
                    }`}
                    style={{ animationDuration: '6s' }}
                  />
                  <span className="font-mono text-[10px] text-emerald-300 font-semibold flex-shrink-0">
                    {activePhoto.filename}
                  </span>
                  <span className="text-white/40">•</span>
                  <span className="truncate">
                    {isVi ? activePhoto.titleVi : activePhoto.titleEn}
                  </span>
                </div>

                <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/15 text-white/80 text-[10px] font-mono shadow-sm flex-shrink-0">
                  {currentIndex + 1}/{portraits.length}
                </span>
              </div>

              {/* Latest Insight Glass Floating Card */}
              <div
                onClick={() => onOpenArticle(latestInsightArticle)}
                className="absolute bottom-4 left-4 right-4 p-3.5 sm:p-4 glass-card rounded-xl flex items-center justify-between cursor-pointer hover:bg-white/95 transition-all duration-200 shadow-lg group/card z-20"
              >
                <div className="min-w-0 pr-2">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#003527] flex-shrink-0" />
                    <p className="font-body text-[13px] sm:text-[14px] font-bold text-[#0b1c30]">
                      {t('hero.latestInsight', 'Latest Insight')}
                    </p>
                  </div>
                  <p className="font-body text-[11px] sm:text-[12px] font-medium text-[#404944] mt-0.5 tracking-wider uppercase truncate">
                    {latestInsightArticle ? latestInsightArticle.title : t('hero.latestInsightTitle')}
                  </p>
                </div>
                <div className="bg-[#b0f0d6] text-[#003527] p-2 sm:p-2.5 rounded-full group-hover/card:scale-110 transition-transform flex-shrink-0 shadow-xs">
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Focus Areas Section (Bento Layout) */}
      <section id="core-focus-areas" className="py-20 px-4 md:px-6 bg-[#eff4ff]/35 backdrop-blur-xs border-y border-[#bfc9c3]/30">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-display text-[28px] md:text-[34px] font-bold text-[#0b1c30] mb-3">
              {t('focus.title', 'Core Focus Areas')}
            </h2>
            <p className="font-body text-[17px] text-[#404944] max-w-2xl mx-auto">
              {t('focus.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Focus 1: Management & Operations */}
            <div
              onClick={() => onNavigate('portfolio')}
              className="tech-card-glass p-8 rounded-xl shadow-[0px_4px_20px_rgba(15,23,42,0.03)] hover:shadow-[0px_8px_30px_rgba(15,23,42,0.07)] hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
            >
              <div className="w-12 h-12 bg-[#003527]/10 rounded-lg flex items-center justify-center mb-6 text-[#003527] group-hover:bg-[#003527] group-hover:text-white transition-colors">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="font-display text-[22px] font-semibold text-[#0b1c30] mb-3">
                {t('focus.eco.title', 'Quản trị và vận hành')}
              </h3>
              <p className="font-body text-[15px] text-[#404944] leading-relaxed mb-6">
                {t('focus.eco.desc')}
              </p>
              <ul className="space-y-2.5">
                <li className="flex items-center gap-2.5 font-body text-[15px] text-[#404944]">
                  <span className="w-1.5 h-1.5 bg-[#003527] rounded-[2px] block"></span>
                  {t('focus.eco.item1', 'Vận hành theo chuẩn và linh hoạt')}
                </li>
                <li className="flex items-center gap-2.5 font-body text-[15px] text-[#404944]">
                  <span className="w-1.5 h-1.5 bg-[#003527] rounded-[2px] block"></span>
                  {t('focus.eco.item2', 'Chiến lược và quản trị rủi ro')}
                </li>
              </ul>
            </div>

            {/* Focus 2: Training & Knowledge Transfer */}
            <div
              onClick={() => onNavigate('blog')}
              className="tech-card-glass p-8 rounded-xl shadow-[0px_4px_20px_rgba(15,23,42,0.03)] hover:shadow-[0px_8px_30px_rgba(15,23,42,0.07)] hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
            >
              <div className="w-12 h-12 bg-[#003527]/10 rounded-lg flex items-center justify-center mb-6 text-[#003527] group-hover:bg-[#003527] group-hover:text-white transition-colors">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="font-display text-[22px] font-semibold text-[#0b1c30] mb-3">
                {t('focus.edu.title', 'Đào tạo và chuyển giao')}
              </h3>
              <p className="font-body text-[15px] text-[#404944] leading-relaxed mb-6">
                {t('focus.edu.desc')}
              </p>
              <ul className="space-y-2.5">
                <li className="flex items-center gap-2.5 font-body text-[15px] text-[#404944]">
                  <span className="w-1.5 h-1.5 bg-[#003527] rounded-[2px] block"></span>
                  {t('focus.edu.item1', 'Thiết kế các hoạt động theo nhu cầu')}
                </li>
                <li className="flex items-center gap-2.5 font-body text-[15px] text-[#404944]">
                  <span className="w-1.5 h-1.5 bg-[#003527] rounded-[2px] block"></span>
                  {t('focus.edu.item2', 'Kết hợp giữa thực tiễn và phù hợp')}
                </li>
              </ul>
            </div>

            {/* Focus 3: Technology */}
            <div
              onClick={() => onNavigate('portfolio')}
              className="tech-card-glass p-8 rounded-xl shadow-[0px_4px_20px_rgba(15,23,42,0.03)] hover:shadow-[0px_8px_30px_rgba(15,23,42,0.07)] hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
            >
              <div className="w-12 h-12 bg-[#003527]/10 rounded-lg flex items-center justify-center mb-6 text-[#003527] group-hover:bg-[#003527] group-hover:text-white transition-colors">
                <Laptop className="w-6 h-6" />
              </div>
              <h3 className="font-display text-[22px] font-semibold text-[#0b1c30] mb-3">
                {t('focus.tech.title', 'Công nghệ')}
              </h3>
              <p className="font-body text-[15px] text-[#404944] leading-relaxed mb-6">
                {t('focus.tech.desc')}
              </p>
              <ul className="space-y-2.5">
                <li className="flex items-center gap-2.5 font-body text-[15px] text-[#404944]">
                  <span className="w-1.5 h-1.5 bg-[#003527] rounded-[2px] block"></span>
                  {t('focus.tech.item1', 'Phát triển Giải pháp')}
                </li>
                <li className="flex items-center gap-2.5 font-body text-[15px] text-[#404944]">
                  <span className="w-1.5 h-1.5 bg-[#003527] rounded-[2px] block"></span>
                  {t('focus.tech.item2', 'Kiến trúc hệ thống doanh nghiệp toàn diện')}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 px-4 md:px-6">
        <div className="max-w-[1280px] mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-[#bfc9c3]/50 pb-6 gap-4">
            <div>
              <h2 className="font-display text-[28px] md:text-[34px] font-bold text-[#0b1c30] mb-2">
                {t('featured.title', 'Featured Projects')}
              </h2>
              <p className="font-body text-[17px] text-[#404944]">
                {t('featured.subtitle', 'Curated applications and digital platforms.')}
              </p>
            </div>
            <button
              onClick={() => onNavigate('portfolio')}
              className="flex items-center gap-2 text-[#003527] font-body text-[16px] font-semibold hover:underline cursor-pointer group"
            >
              <span>{t('featured.viewAll', 'View Full Portfolio')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Projects Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Project 1 */}
            {featuredProjects[0] && (
              <div
                onClick={() => onOpenProject(featuredProjects[0])}
                className="col-span-12 md:col-span-8 group relative overflow-hidden rounded-xl border border-[#bfc9c3]/60 tech-card-glass shadow-[0px_4px_20px_rgba(15,23,42,0.04)] hover:shadow-[0px_8px_30px_rgba(15,23,42,0.08)] transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div className="relative h-[340px] md:h-[390px] overflow-hidden bg-[#eff4ff]">
                  <img
                    src={featuredProjects[0].image}
                    alt={featuredProjects[0].imageAlt}
                    className="w-full h-full object-cover transform group-hover:scale-104 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 z-20 flex items-center gap-2 flex-wrap justify-end">
                    <span className="px-3.5 py-1 bg-white/90 backdrop-blur rounded font-body text-[12px] font-bold text-[#003527] border border-[#bfc9c3]/60">
                      {featuredProjects[0].badge}
                    </span>
                    {featuredProjects[0].articleUrl && (
                      <span className="px-2.5 py-1 bg-amber-100/95 backdrop-blur rounded font-body text-[11px] font-bold text-amber-900 border border-amber-300">
                        {featuredProjects[0].pressSource || 'Báo Chính Phủ'}
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-6 md:p-8 bg-white/85 backdrop-blur-sm border-t border-[#bfc9c3]/40">
                  <h3 className="font-display text-[22px] md:text-[24px] font-semibold text-[#0b1c30] mb-2 group-hover:text-[#003527] transition-colors">
                    {featuredProjects[0].title}
                  </h3>
                  <p className="font-body text-[15px] text-[#404944] leading-relaxed">
                    {featuredProjects[0].excerpt}
                  </p>
                </div>
              </div>
            )}

            {/* Project 2 */}
            {featuredProjects[1] && (
              <div
                onClick={() => onOpenProject(featuredProjects[1])}
                className="col-span-12 md:col-span-4 group relative overflow-hidden rounded-xl border border-[#bfc9c3]/60 tech-card-glass shadow-[0px_4px_20px_rgba(15,23,42,0.04)] hover:shadow-[0px_8px_30px_rgba(15,23,42,0.08)] transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div className="relative h-[220px] md:h-[250px] overflow-hidden bg-[#eff4ff]">
                  <img
                    src={featuredProjects[1].image}
                    alt={featuredProjects[1].imageAlt}
                    className="w-full h-full object-cover transform group-hover:scale-104 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6 md:p-7 flex-1 flex flex-col justify-center bg-white/85 backdrop-blur-sm border-t border-[#bfc9c3]/40">
                  <div className="mb-2">
                    <span className="px-2.5 py-1 bg-[#eff4ff] text-[#003527] rounded font-body text-[12px] font-bold inline-block">
                      {featuredProjects[1].badge}
                    </span>
                  </div>
                  <h3 className="font-display text-[20px] md:text-[22px] font-semibold text-[#0b1c30] mb-2 group-hover:text-[#003527] transition-colors">
                    {featuredProjects[1].title}
                  </h3>
                  <p className="font-body text-[14px] text-[#404944] leading-relaxed line-clamp-3">
                    {featuredProjects[1].excerpt}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Media & Podcasts (YouTube & Spotify) Section */}
      <MediaShowcase />

      {/* Quick Contact Floating Action Button (FAB) */}
      <div className="fixed bottom-6 right-5 sm:right-6 md:bottom-8 md:right-8 z-40 flex flex-col items-end gap-2">
        {/* Hover / Context Tooltip */}
        {isFabHovered && (
          <div className="hidden sm:flex items-center gap-2 bg-[#0b1c30] text-white text-[12px] font-body py-1.5 px-3 rounded-lg shadow-xl border border-white/10 animate-in fade-in slide-in-from-bottom-2 duration-150 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></span>
            <span>{t('connect.quickFabTooltip', 'Đặt lịch tư vấn chiến lược trực tiếp cùng Cao Nguyễn Nhật Triều')}</span>
          </div>
        )}

        <button
          id="quick-contact-fab"
          onClick={() => {
            if (onOpenConnect) {
              onOpenConnect(t('connect.consultingSubjectTitle', 'Tư vấn Chiến lược & Vận hành'));
            }
          }}
          onMouseEnter={() => setIsFabHovered(true)}
          onMouseLeave={() => setIsFabHovered(false)}
          className="group relative flex items-center gap-2.5 bg-gradient-to-r from-[#003527] to-[#064e3b] text-white pl-4 pr-5 py-3 rounded-full shadow-[0_8px_24px_rgba(0,53,39,0.35)] hover:shadow-[0_12px_30px_rgba(0,53,39,0.5)] border border-[#b0f0d6]/30 hover:border-[#b0f0d6]/70 transition-all duration-200 active:scale-95 cursor-pointer"
          aria-label="Quick Contact & Consulting Inquiry"
        >
          {/* Pulsing Online Status Indicator */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#b0f0d6] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10b981]"></span>
          </span>

          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#b0f0d6] group-hover:scale-110 transition-transform" />
            <div className="flex flex-col text-left">
              <span className="font-body text-[13px] font-bold leading-tight text-white tracking-wide">
                {t('connect.quickFabTitle', 'Tư vấn & Kết nối')}
              </span>
              <span className="font-body text-[11px] text-[#b0f0d6]/90 font-medium leading-tight">
                {t('connect.quickFabSubtitle', 'Tư vấn Chiến lược & Vận hành')}
              </span>
            </div>
          </div>

          <Sparkles className="w-3.5 h-3.5 text-[#b0f0d6] ml-0.5 opacity-80 group-hover:rotate-12 transition-transform" />
        </button>
      </div>

      {/* Photo Manager Modal */}
      <PhotoManagerModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
      />
    </div>
  );
};

