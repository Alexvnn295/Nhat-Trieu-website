import React, { useState } from 'react';
import { Project } from '../types';
import {
  ArrowRight,
  CheckCircle2,
  Briefcase,
  GraduationCap,
  Award,
  Sparkles,
  Layers,
  Building2,
  MapPin,
  Mail,
  Linkedin,
  Github,
  Printer,
  ChevronRight,
  TrendingUp,
  Cpu,
  BookOpen,
  Users,
  ShieldCheck,
  Globe2,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  KeyRound,
  AlertCircle,
  X,
  FileText,
  ExternalLink,
  Shield,
  HeartPulse,
  Youtube,
  Camera,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';
import { EXECUTIVE_PROFILE, PERSONAL_PORTRAITS } from '../data/profileData';
import { PhotoManagerModal } from './PhotoManagerModal';

interface PortfolioScreenProps {
  projects: Project[];
  onOpenProject: (project: Project) => void;
  onOpenConnect: (prefillProject?: string) => void;
}

type PortfolioTab = 'all' | 'experience' | 'projects' | 'ai' | 'education';

export const PortfolioScreen: React.FC<PortfolioScreenProps> = ({
  projects,
  onOpenProject,
  onOpenConnect,
}) => {
  const { language, t } = useLanguage();
  const { verifyPortfolioCode, profile, updateProfile } = useData();
  const { showSuccess, showInfo } = useToast();
  const [activeFilter, setActiveFilter] = useState<PortfolioTab>('all');
  const isVi = language === 'vi';

  // Personal Portraits configuration
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState<boolean>(false);
  const portraits = profile.personalPortraits || PERSONAL_PORTRAITS;
  const activePhoto =
    portraits.find((p) => p.id === profile.activePhotoId) || portraits[0];
  const avatarSrc = profile.avatarUrl || activePhoto.url;
  const avatarFallback = activePhoto.fallbackUrl;

  // Security mode: Full Confidential Protection
  // Default is Confidential Headline-Only Mode (isUnlocked = false)
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [showSecurityModal, setShowSecurityModal] = useState<boolean>(false);
  const [securityModalPurpose, setSecurityModalPurpose] = useState<'view' | 'print'>('view');
  const [passcodeInput, setPasscodeInput] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleUnlockAttempt = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = passcodeInput.trim();
    if (!cleanInput) {
      setErrorMessage(
        isVi
          ? 'Vui lòng nhập mã bảo mật cấp phép.'
          : 'Please enter your authorized security passcode.'
      );
      return;
    }

    const verification = verifyPortfolioCode(cleanInput);

    if (verification.isValid) {
      setIsUnlocked(true);
      setShowSecurityModal(false);
      setErrorMessage('');
      const targetPurpose = securityModalPurpose;
      setPasscodeInput('');
      showSuccess(
        isVi ? 'Xác thực thành công' : 'Passcode Verified',
        isVi
          ? `Đã mở khóa toàn bộ hồ sơ năng lực chi tiết & quyền In ấn PDF (${verification.codeObj?.code || 'Hợp lệ'}).`
          : 'Full executive dossier unlocked successfully.'
      );
      if (targetPurpose === 'print') {
        setTimeout(() => {
          window.print();
        }, 300);
      }
    } else {
      setErrorMessage(
        verification.errorMessage ||
          (isVi
            ? 'Mã bảo mật không chính xác hoặc đã hết hạn. Vui lòng liên hệ để nhận mã cấp phép.'
            : 'Invalid passcode or expired. Please contact to request access.')
      );
    }
  };

  const handlePrintRequest = () => {
    if (!isUnlocked) {
      setSecurityModalPurpose('print');
      setShowSecurityModal(true);
      setErrorMessage('');
    } else {
      window.print();
    }
  };

  const handleOpenUnlockModal = () => {
    setSecurityModalPurpose('view');
    setShowSecurityModal(true);
    setErrorMessage('');
  };

  const handleLockProfile = () => {
    setIsUnlocked(false);
    showInfo(
      isVi ? 'Đã khóa bảo mật' : 'Dossier Locked',
      isVi ? 'Đã chuyển về chế độ bảo mật tiêu đề (Headline View).' : 'Switched back to confidential headline view.'
    );
  };

  return (
    <div className={`max-w-[1280px] mx-auto px-4 md:px-6 py-10 md:py-14 ${!isUnlocked ? 'portfolio-locked' : 'portfolio-unlocked'}`}>
      
      {/* ============================================================ */}
      {/* SECURITY STATUS BANNER (ALWAYS VISIBLE AT TOP) */}
      {/* ============================================================ */}
      <div className="mb-8 no-print">
        {!isUnlocked ? (
          <div className="bg-amber-50/90 border border-amber-200/80 rounded-xl p-4 md:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-body text-[14px] font-bold text-amber-900">
                    {isVi ? 'CHẾ ĐỘ BẢO MẬT HỒ SƠ: CHỈ XEM TIÊU ĐỀ (HEADLINE ONLY)' : 'SECURITY MODE: HEADLINE VIEW ONLY'}
                  </span>
                  <span className="px-2 py-0.5 bg-amber-200 text-amber-900 rounded text-[11px] font-bold tracking-wide">
                    PROTECTED
                  </span>
                </div>
                <p className="font-body text-[13px] text-amber-800 mt-0.5">
                  {isVi
                    ? 'Chi tiết các chỉ số nội bộ, dự án & hồ sơ công việc đang được ẩn nhằm bảo mật. Chức năng In ấn yêu cầu mã ủy quyền.'
                    : 'Confidential performance metrics, internal project specifics & operational workflows are protected. Printing requires passcode authorization.'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              <button
                onClick={handleOpenUnlockModal}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#003527] text-white rounded-[4px] font-body text-[13px] font-semibold hover:bg-[#064e3b] transition-all cursor-pointer shadow-sm whitespace-nowrap"
              >
                <KeyRound className="w-4 h-4" />
                <span>{isVi ? 'Nhập mã mở khóa chi tiết' : 'Enter Security Code'}</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-emerald-50/90 border border-emerald-200/80 rounded-xl p-4 md:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Unlock className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-body text-[14px] font-bold text-emerald-900">
                    {isVi ? 'HỒ SƠ ĐÃ MỞ KHÓA CHI TIẾT ĐẦY ĐỦ' : 'FULL EXECUTIVE DOSSIER UNLOCKED'}
                  </span>
                  <span className="px-2 py-0.5 bg-emerald-200 text-emerald-900 rounded text-[11px] font-bold tracking-wide">
                    AUTHORIZED
                  </span>
                </div>
                <p className="font-body text-[13px] text-emerald-800 mt-0.5">
                  {isVi
                    ? 'Bạn đang có toàn quyền xem các chỉ số vận hành chi tiết, thành tựu AI và cho phép In/Xuất PDF hồ sơ năng lực.'
                    : 'You have full authorization to review detailed KPIs, architecture breakdown, and print executive dossier.'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              <button
                onClick={handleLockProfile}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white text-[#404944] border border-[#bfc9c3] rounded-[4px] font-body text-[12px] font-medium hover:bg-neutral-50 transition-all cursor-pointer whitespace-nowrap"
              >
                <EyeOff className="w-3.5 h-3.5" />
                <span>{isVi ? 'Khóa bảo mật lại' : 'Lock Dossier'}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/* 1. EXECUTIVE HEADER BANNER & PROFESSIONAL PROFILE */}
      {/* ============================================================ */}
      <section className="bg-white border border-[#bfc9c3]/70 rounded-2xl p-6 md:p-10 shadow-sm mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#003527]/5 rounded-bl-full pointer-events-none -z-0" />
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-8 border-b border-[#bfc9c3]/40">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="flex flex-col items-center gap-2">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-[#003527]/20 shadow-md flex-shrink-0 bg-[#eff4ff] group">
                  <img
                    src={avatarSrc}
                    alt="Cao Nguyễn Nhật Triều"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.dataset.tried) {
                        target.dataset.tried = '1';
                        target.src = avatarFallback;
                      } else if (target.dataset.tried === '1') {
                        target.dataset.tried = '2';
                        target.src = '/images/profile/GRU02101.svg';
                      }
                    }}
                  />
                  {/* Camera overlay icon */}
                  <button
                    onClick={() => setIsPhotoModalOpen(true)}
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white cursor-pointer"
                    title={isVi ? 'Tùy chọn bộ ảnh' : 'Change portrait'}
                    aria-label="Change portrait"
                  >
                    <Camera className="w-5 h-5" />
                  </button>
                </div>

                {/* 3 Studio Portraits Quick Switcher Thumbnails */}
                <div className="flex items-center gap-1.5">
                  {portraits.map((p, idx) => {
                    const isSelected =
                      profile.activePhotoId === p.id ||
                      (!profile.activePhotoId && idx === 0);
                    return (
                      <button
                        key={p.id}
                        onClick={() =>
                          updateProfile({ avatarUrl: p.url, activePhotoId: p.id })
                        }
                        className={`w-6 h-6 rounded-md overflow-hidden border transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#003527] ring-1 ring-[#003527] scale-110 shadow-xs'
                            : 'border-[#bfc9c3] opacity-60 hover:opacity-100'
                        }`}
                        title={`${p.filename}: ${isVi ? p.titleVi : p.titleEn}`}
                      >
                        <img
                          src={p.url}
                          alt={p.filename}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.currentTarget;
                            if (!target.dataset.tried) {
                              target.dataset.tried = '1';
                              target.src = p.fallbackUrl;
                            } else if (target.dataset.tried === '1') {
                              target.dataset.tried = '2';
                              target.src = `/images/profile/${p.filename.replace(/\.[^.]+$/, '')}.svg`;
                            }
                          }}
                        />
                      </button>
                    );
                  })}
                  <button
                    onClick={() => setIsPhotoModalOpen(true)}
                    className="w-6 h-6 rounded-md border border-[#bfc9c3] bg-[#eff4ff] hover:bg-[#dce9ff] text-[#003527] flex items-center justify-center transition-colors cursor-pointer"
                    title={isVi ? 'Quản lý bộ ảnh chân dung' : 'Manage portraits'}
                    aria-label="Manage portraits"
                  >
                    <Camera className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#eff4ff] text-[#003527] rounded-full text-[12px] font-body font-bold border border-[#003527]/10 mb-2 tracking-wide">
                  <Sparkles className="w-3.5 h-3.5 text-[#003527]" />
                  <span>{isVi ? 'HỒ SƠ NĂNG LỰC CHUYÊN GIA' : 'PROFESSIONAL EXECUTIVE PROFILE'}</span>
                </div>
                <h1 className="font-display text-[28px] sm:text-[34px] md:text-[40px] font-bold text-[#003527] leading-tight mb-1.5">
                  {profile.name}
                </h1>
                <p className="font-body text-[15px] sm:text-[16px] md:text-[17px] font-medium text-[#0b1c30] max-w-2xl">
                  {isVi ? profile.titleVi : profile.titleEn}
                </p>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 no-print">
              <button
                onClick={handlePrintRequest}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#eff4ff] text-[#003527] border border-[#003527]/20 rounded-[4px] font-body text-[14px] font-semibold hover:bg-[#dce9ff] transition-all cursor-pointer shadow-sm relative group"
                title={isVi ? 'In / Lưu hồ sơ PDF (Cần mã bảo mật)' : 'Print / Save Executive PDF (Passcode required)'}
              >
                {isUnlocked ? (
                  <Printer className="w-4 h-4 text-[#003527]" />
                ) : (
                  <Lock className="w-4 h-4 text-amber-700" />
                )}
                <span>{isVi ? 'In Hồ sơ Năng lực' : 'Print Profile'}</span>
                {!isUnlocked && (
                  <span className="absolute -top-2 -right-2 px-1.5 py-0.5 bg-amber-600 text-white rounded-full text-[10px] font-bold">
                    Code
                  </span>
                )}
              </button>
              <button
                onClick={() => onOpenConnect(isVi ? 'Trao đổi hợp tác chiến lược' : 'Strategic Collaboration Request')}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#003527] text-white rounded-[4px] font-body text-[14px] font-semibold hover:bg-[#064e3b] transition-transform duration-100 active:scale-95 cursor-pointer shadow-sm"
              >
                <span>{t('portfolio.contactCollab', 'Liên hệ hợp tác')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Contact Bar & Quick Meta (Headline Level: Always visible) */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-6 pb-6 text-[14px] font-body text-[#404944] border-b border-[#bfc9c3]/30">
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-[#003527] flex-shrink-0" />
              <span>{isVi ? profile.contact.locationVi : profile.contact.locationEn}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-[#003527] flex-shrink-0" />
              <a href={`mailto:${profile.contact.email}`} className="hover:text-[#003527] hover:underline truncate font-medium text-[#0b1c30]">
                {profile.contact.email}
              </a>
            </div>
            <div className="flex items-center gap-2.5">
              <Linkedin className="w-4 h-4 text-[#003527] flex-shrink-0" />
              <a
                href={profile.contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#003527] hover:underline truncate font-medium text-[#003527]"
              >
                LinkedIn Profile
              </a>
            </div>
            <div className="flex items-center gap-2.5">
              <Github className="w-4 h-4 text-[#003527] flex-shrink-0" />
              <a
                href={profile.contact.github || 'https://github.com/Alexvnn295'}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#003527] hover:underline truncate font-medium text-[#003527]"
              >
                GitHub Profile
              </a>
            </div>
          </div>

          {/* Executive Summary (Headline Level Overview) */}
          <div className="pt-6">
            <h3 className="font-body text-[13px] font-bold text-[#003527] uppercase tracking-wider mb-2">
              {isVi ? 'TỔNG QUAN CHUYÊN MÔN' : 'EXECUTIVE SUMMARY'}
            </h3>
            <p className="font-body text-[15px] md:text-[16px] text-[#404944] leading-relaxed">
              {isVi ? profile.summaryVi : profile.summaryEn}
            </p>
          </div>

          {/* Key Stat Cards (Headline Overview) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            {profile.metrics.map((stat, i) => (
              <div
                key={i}
                className="bg-[#eff4ff]/60 border border-[#003527]/15 rounded-xl p-4 md:p-5 flex items-center gap-4 transition-all hover:bg-[#eff4ff]"
              >
                <div className="w-12 h-12 rounded-xl bg-[#003527] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                  {i === 0 ? <TrendingUp className="w-6 h-6" /> : i === 1 ? <Building2 className="w-6 h-6" /> : <Cpu className="w-6 h-6" />}
                </div>
                <div>
                  <div className="font-display text-[22px] md:text-[24px] font-bold text-[#003527] leading-none">
                    {stat.value}
                  </div>
                  <div className="font-body text-[14px] font-bold text-[#0b1c30] mt-1">
                    {isVi ? stat.labelVi : stat.labelEn}
                  </div>
                  <div className="font-body text-[12px] text-[#707974]">
                    {isVi ? stat.subLabelVi : stat.subLabelEn}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. FILTER PILLS (INTERACTIVE SECTION SELECTOR) */}
      {/* ============================================================ */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 no-print">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full sm:w-auto pb-1 max-w-full">
          {[
            { id: 'all', labelVi: 'Tất cả danh mục', labelEn: 'All Overview' },
            { id: 'experience', labelVi: 'Kinh nghiệm Chuyên môn', labelEn: 'Experience Timeline' },
            { id: 'projects', labelVi: 'Dự án & Nền tảng', labelEn: 'Featured Projects' },
            { id: 'ai', labelVi: 'Thành tựu & Đào tạo AI', labelEn: 'AI & Training' },
            { id: 'education', labelVi: 'Học vấn & Chứng chỉ', labelEn: 'Education & Certs' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as PortfolioTab)}
              className={`px-4 py-2 rounded-full font-body text-[13.5px] sm:text-[14px] font-medium transition-all cursor-pointer whitespace-nowrap flex-shrink-0 min-h-[40px] flex items-center ${
                activeFilter === tab.id
                  ? 'bg-[#003527] text-white shadow-sm'
                  : 'bg-white border border-[#bfc9c3]/60 text-[#404944] hover:bg-[#eff4ff] hover:text-[#003527]'
              }`}
            >
              {isVi ? tab.labelVi : tab.labelEn}
            </button>
          ))}
        </div>

        {!isUnlocked && (
          <button
            onClick={handleOpenUnlockModal}
            className="inline-flex items-center gap-2 text-[13px] font-body font-semibold text-[#003527] hover:underline bg-[#eff4ff] px-3.5 py-1.5 rounded-lg border border-[#003527]/20 cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>{isVi ? 'Xem bản đầy đủ không che' : 'Unlock full dossier'}</span>
          </button>
        )}
      </div>

      {/* ============================================================ */}
      {/* 3. CORE COMPETENCIES SECTION (HEADLINES vs DETAILS) */}
      {/* ============================================================ */}
      {(activeFilter === 'all' || activeFilter === 'experience') && (
        <section className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-[#003527]" />
              <h2 className="font-display text-[24px] md:text-[28px] font-bold text-[#0b1c30]">
                {isVi ? 'Năng Lực Cốt Lõi' : 'Core Competencies'}
              </h2>
            </div>
            {!isUnlocked && (
              <span className="text-[12px] font-body text-amber-700 bg-amber-50 px-2.5 py-1 rounded border border-amber-200 flex items-center gap-1">
                <Lock className="w-3 h-3" />
                <span>{isVi ? 'Chỉ hiển thị Tiêu đề' : 'Headline View'}</span>
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {profile.coreCompetencies.map((comp, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#bfc9c3]/60 rounded-xl p-5 md:p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-[#eff4ff] text-[#003527] flex items-center justify-center font-bold text-[14px] mb-3">
                    0{idx + 1}
                  </div>
                  {/* Headline Title: Always Visible */}
                  <h3 className="font-display text-[17px] font-bold text-[#003527] mb-2">
                    {isVi ? comp.titleVi : comp.titleEn}
                  </h3>

                  {/* Details: Protected if not unlocked */}
                  {isUnlocked ? (
                    <p className="font-body text-[14px] text-[#404944] leading-relaxed">
                      {isVi ? comp.descVi : comp.descEn}
                    </p>
                  ) : (
                    <div className="mt-3 pt-3 border-t border-dashed border-[#bfc9c3]/50">
                      <div className="flex items-center justify-between text-[12px] text-[#707974] bg-[#f8f9ff] p-2.5 rounded border border-[#bfc9c3]/40">
                        <span className="italic flex items-center gap-1.5">
                          <Lock className="w-3.5 h-3.5 text-amber-700" />
                          {isVi ? 'Nội dung chi tiết năng lực đã được khóa bảo mật' : 'Detailed scope protected'}
                        </span>
                        <button
                          onClick={handleOpenUnlockModal}
                          className="text-[#003527] font-semibold hover:underline cursor-pointer"
                        >
                          {isVi ? 'Mở' : 'View'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 4. FULL-TIME & PROJECT PROFESSIONAL EXPERIENCE */}
      {/* ============================================================ */}
      {(activeFilter === 'all' || activeFilter === 'experience') && (
        <section className="mb-14">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Briefcase className="w-6 h-6 text-[#003527]" />
              <h2 className="font-display text-[24px] md:text-[28px] font-bold text-[#0b1c30]">
                {isVi ? 'Kinh Nghiệm Làm Việc Toàn Thời Gian' : 'Full-Time Professional Experience'}
              </h2>
            </div>
            {!isUnlocked && (
              <span className="text-[12px] font-body text-amber-700 bg-amber-50 px-2.5 py-1 rounded border border-amber-200 flex items-center gap-1">
                <Lock className="w-3 h-3" />
                <span>{isVi ? 'Chỉ xem Vị trí & Công ty' : 'Role & Org Headline Only'}</span>
              </span>
            )}
          </div>

          <div className="space-y-6">
            {profile.fullTimeExperience.map((exp) => (
              <div
                key={exp.id}
                className="bg-white border border-[#bfc9c3]/60 rounded-xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all relative overflow-hidden"
              >
                {/* Headline: Role, Company - Always visible */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-4 border-b border-[#bfc9c3]/30 mb-4">
                  <div>
                    <h3 className="font-display text-[20px] md:text-[22px] font-bold text-[#003527]">
                      {isVi ? exp.roleVi : exp.role}
                    </h3>
                    <div className="font-body text-[15px] font-semibold text-[#0b1c30]">
                      {exp.company}
                    </div>
                  </div>
                </div>

                {/* Details Breakdown: Protected if locked */}
                {isUnlocked ? (
                  <>
                    <ul className="space-y-2.5 mb-4">
                      {(isVi ? exp.pointsVi : exp.pointsEn).map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2.5 font-body text-[15px] text-[#404944] leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-[#003527] flex-shrink-0 mt-1" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Project Highlight Box */}
                    {exp.highlight && (
                      <div className="mt-4 p-4 bg-[#eff4ff] border-l-4 border-[#003527] rounded-r-lg">
                        <div className="font-body text-[14px] md:text-[15px] font-semibold text-[#003527]">
                          {isVi ? exp.highlight.vi : exp.highlight.en}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="bg-[#f8f9ff] border border-dashed border-[#bfc9c3] rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 text-[14px] text-[#404944]">
                      <Lock className="w-4 h-4 text-amber-700 flex-shrink-0" />
                      <span>
                        {isVi
                          ? 'Chi tiết nhiệm vụ, KPI vận hành & đóng góp dự án đã được ẩn.'
                          : 'Operational duties, KPI metrics & system contributions are confidential.'}
                      </span>
                    </div>
                    <button
                      onClick={handleOpenUnlockModal}
                      className="text-[13px] font-body font-semibold text-[#003527] hover:underline whitespace-nowrap cursor-pointer"
                    >
                      {isVi ? 'Mở khóa chi tiết →' : 'Unlock details →'}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Project & Hybrid Experience Sub-Section */}
          <div className="mt-10">
            <h3 className="font-display text-[20px] font-bold text-[#0b1c30] mb-5 flex items-center gap-2">
              <Globe2 className="w-5 h-5 text-[#003527]" />
              <span>{isVi ? 'Kinh Nghiệm Dự Án & Bán Thời Gian' : 'Project & Hybrid Experience'}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {profile.projectExperience.map((projExp) => (
                <div
                  key={projExp.id}
                  className="bg-white border border-[#bfc9c3]/60 rounded-xl p-5 md:p-6 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h4 className="font-display text-[17px] font-bold text-[#003527]">
                        {isVi ? projExp.roleVi : projExp.role}
                      </h4>
                      <div className="font-body text-[14px] font-medium text-[#0b1c30]">
                        {projExp.company}
                      </div>
                    </div>
                  </div>

                  {isUnlocked ? (
                    <ul className="mt-3 space-y-1.5">
                      {(isVi ? projExp.pointsVi : projExp.pointsEn).map((pt, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-[13px] font-body text-[#404944]">
                          <ChevronRight className="w-3.5 h-3.5 text-[#003527] flex-shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="mt-3 text-[12px] text-[#707974] italic flex items-center gap-1.5 pt-2 border-t border-dashed border-[#bfc9c3]/40">
                      <Lock className="w-3 h-3 text-amber-700" />
                      <span>{isVi ? 'Nội dung dự án đối tác được bảo mật' : 'Partner details confidential'}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 5. AI TRAINING, DIGITAL TRANSFORMATION & RECOGNITION */}
      {/* ============================================================ */}
      {(activeFilter === 'all' || activeFilter === 'ai') && (
        <section className="mb-14 space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Award className="w-6 h-6 text-[#003527]" />
              <h2 className="font-display text-[24px] md:text-[28px] font-bold text-[#0b1c30]">
                {isVi ? 'Thành Tựu Chuyển Đổi Số & Đào Tạo AI' : 'Digital Transformation & AI Recognition'}
              </h2>
            </div>
            {!isUnlocked && (
              <span className="text-[12px] font-body text-amber-700 bg-amber-50 px-2.5 py-1 rounded border border-amber-200 flex items-center gap-1">
                <Lock className="w-3 h-3" />
                <span>{isVi ? 'Tiêu đề Chương trình' : 'Headline Focus'}</span>
              </span>
            )}
          </div>

          {/* Digital Transformation Achievement Banners */}
          {profile.digitalTransformationAchievements && profile.digitalTransformationAchievements.map((dt) => (
            <div
              key={dt.id}
              className="bg-gradient-to-br from-[#003527] to-[#044e3b] text-white rounded-2xl p-6 md:p-10 shadow-lg border border-[#003527]"
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-white/15">
                <div className="space-y-2.5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#b0f0d6] text-[#003527] rounded-full text-[12px] font-body font-bold uppercase tracking-wider">
                    <HeartPulse className="w-3.5 h-3.5" />
                    <span>{isVi ? dt.categoryVi : dt.categoryEn} • {dt.badge}</span>
                  </div>
                  <h3 className="font-display text-[22px] md:text-[26px] font-bold text-white leading-snug">
                    {isVi ? dt.titleVi : dt.titleEn}
                  </h3>
                  <p className="font-body text-[15px] text-[#eff4ff] max-w-3xl leading-relaxed">
                    {isVi ? dt.summaryVi : dt.summaryEn}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto flex-shrink-0">
                  {dt.articleUrl && (
                    <a
                      href={dt.articleUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-white text-[#003527] px-6 py-3 rounded-[4px] font-body text-[14px] font-bold hover:bg-[#eff4ff] transition-all duration-100 active:scale-95 shadow-sm whitespace-nowrap"
                    >
                      <span>{isVi ? `Đọc trên ${dt.pressSource}` : 'Read Press Article'}</span>
                      <ExternalLink className="w-4 h-4 text-[#003527]" />
                    </a>
                  )}
                  {dt.videoUrl && (
                    <a
                      href={dt.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-[#ff0000] hover:bg-[#cc0000] text-white px-6 py-3 rounded-[4px] font-body text-[14px] font-bold transition-all duration-100 active:scale-95 shadow-sm whitespace-nowrap"
                    >
                      <Youtube className="w-4 h-4 fill-current" />
                      <span>{isVi ? 'Xem Video / Livestream' : 'Watch Broadcast'}</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  <button
                    onClick={() => onOpenConnect(isVi ? `Hợp tác: ${dt.titleVi}` : `Inquiry: ${dt.titleEn}`)}
                    className="inline-flex items-center justify-center gap-2 bg-[#003527]/40 hover:bg-[#003527]/60 text-white border border-white/30 px-5 py-3 rounded-[4px] font-body text-[14px] font-medium transition-all"
                  >
                    <span>{isVi ? 'Liên hệ Hợp tác / Tư vấn' : 'Consulting Inquiry'}</span>
                  </button>
                </div>
              </div>

              {/* Highlights & Verified Press Source */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {(isVi ? dt.highlightsVi : dt.highlightsEn).map((hl, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-[14px] font-body text-[#eff4ff]/90">
                    <CheckCircle2 className="w-4 h-4 text-[#b0f0d6] flex-shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>

              {/* Press citation footer */}
              <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between text-[13px] text-[#b0f0d6] gap-2">
                <span className="flex items-center gap-1.5 font-medium">
                  <Shield className="w-4 h-4" />
                  <span>{isVi ? 'Nguồn xác thực:' : 'Verified by:'} <strong>{dt.pressSource}</strong> – "{dt.pressTitle}"</span>
                </span>
                <div className="flex items-center gap-3">
                  {dt.articleUrl && (
                    <a
                      href={dt.articleUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-white flex items-center gap-1 font-semibold"
                    >
                      <span>{isVi ? 'Xem bài viết gốc' : 'Read original coverage'} ↗</span>
                    </a>
                  )}
                  {dt.videoUrl && (
                    <a
                      href={dt.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-white flex items-center gap-1 font-semibold text-rose-300"
                    >
                      <Youtube className="w-3.5 h-3.5" />
                      <span>{isVi ? 'Xem video trực tiếp' : 'Watch stream'} ↗</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}

          <div className="bg-white border border-[#bfc9c3]/60 rounded-2xl p-6 md:p-10 shadow-sm space-y-8">
            {/* Qualcomm Achievement Banner (Headline) */}
            <div className="p-6 bg-[#003527] text-white rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-md">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#b0f0d6] text-[#003527] rounded-full text-[12px] font-body font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isVi ? 'THÀNH TỰU ĐỔI MỚI SÁNG TẠO' : 'INNOVATION ACHIEVEMENT'}</span>
                </div>
                <h3 className="font-display text-[22px] md:text-[26px] font-bold text-white">
                  {isVi ? profile.aiRecognition.awardVi : profile.aiRecognition.awardEn}
                </h3>
                <p className="font-body text-[15px] text-[#eff4ff] max-w-2xl leading-relaxed">
                  {isVi ? profile.aiRecognition.awardDescVi : profile.aiRecognition.awardDescEn}
                </p>
              </div>
              <button
                onClick={() => onOpenConnect(isVi ? 'Đào tạo AI Doanh nghiệp' : 'Enterprise AI Training Inquiry')}
                className="bg-white text-[#003527] px-6 py-3 rounded-[4px] font-body text-[14px] font-bold hover:bg-[#eff4ff] transition-transform duration-100 active:scale-95 whitespace-nowrap cursor-pointer shadow-sm"
              >
                {isVi ? 'Đăng ký Khóa đào tạo' : 'Request AI Coaching'}
              </button>
            </div>

            {/* AI Coaching Focus & Representative Courses */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Focus topics */}
              <div className="p-6 bg-[#f8f9ff] border border-[#bfc9c3]/50 rounded-xl">
                <h4 className="font-display text-[18px] font-bold text-[#003527] mb-3 flex items-center gap-2">
                  <Cpu className="w-5 h-5" />
                  <span>{isVi ? 'Trọng Tâm Đào Tạo AI' : 'Program Focus'}</span>
                </h4>
                <p className="font-body text-[14px] text-[#404944] mb-4">
                  {isVi ? profile.aiRecognition.coachingScopeVi : profile.aiRecognition.coachingScopeEn}
                </p>
                {isUnlocked ? (
                  <div className="space-y-2">
                    {(isVi ? profile.aiRecognition.focusTopicsVi : profile.aiRecognition.focusTopicsEn).map((topic, i) => (
                      <div key={i} className="flex items-center gap-2.5 font-body text-[14px] text-[#0b1c30]">
                        <CheckCircle2 className="w-4 h-4 text-[#003527] flex-shrink-0" />
                        <span>{topic}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 bg-white border border-dashed border-[#bfc9c3] rounded-lg text-[13px] text-[#707974] flex items-center justify-between">
                    <span className="italic flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-amber-700" />
                      {isVi ? 'Chủ đề chuyên sâu yêu cầu xác thực' : 'Deep topics require passcode'}
                    </span>
                    <button
                      onClick={handleOpenUnlockModal}
                      className="text-[#003527] font-semibold hover:underline cursor-pointer"
                    >
                      {isVi ? 'Mở khóa' : 'Unlock'}
                    </button>
                  </div>
                )}
              </div>

              {/* Representative Courses */}
              <div className="p-6 bg-[#f8f9ff] border border-[#bfc9c3]/50 rounded-xl">
                <h4 className="font-display text-[18px] font-bold text-[#003527] mb-3 flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  <span>{isVi ? 'Khóa Học Tiêu Biểu' : 'Representative Course Titles'}</span>
                </h4>
                <div className="space-y-3">
                  {profile.aiRecognition.keyCourses.map((course, i) => (
                    <div
                      key={i}
                      className="p-3 bg-white border border-[#bfc9c3]/60 rounded-lg flex items-center justify-between"
                    >
                      <span className="font-body text-[14px] font-medium text-[#0b1c30]">
                        {isVi ? course.titleVi : course.titleEn}
                      </span>
                      <span className="text-[12px] font-body text-[#003527] font-bold bg-[#eff4ff] px-2 py-0.5 rounded">
                        Module 0{i + 1}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Delivered Programs: Protected if locked */}
                {isUnlocked ? (
                  <div className="mt-5 pt-4 border-t border-[#bfc9c3]/40">
                    <h5 className="font-body text-[13px] font-bold text-[#707974] uppercase tracking-wider mb-2">
                      {isVi ? 'ĐÃ TRIỂN KHAI THỰC TẾ' : 'DELIVERED PROGRAMS'}
                    </h5>
                    <div className="space-y-1.5">
                      {profile.aiRecognition.deliveredPrograms.map((prog, pIdx) => (
                        <div key={pIdx} className="text-[13px] font-body text-[#404944] flex items-center gap-2">
                          <span className="font-semibold text-[#003527]">({prog.year})</span>
                          <span>{isVi ? prog.titleVi : prog.titleEn}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 pt-3 border-t border-dashed border-[#bfc9c3]/40 flex items-center justify-between text-[12px] text-[#707974]">
                    <span className="italic flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-amber-700" />
                      {isVi ? 'Danh sách đối tác đào tạo bảo mật' : 'Delivered client list protected'}
                    </span>
                    <button
                      onClick={handleOpenUnlockModal}
                      className="text-[#003527] font-semibold hover:underline cursor-pointer"
                    >
                      {isVi ? 'Mở' : 'View'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 6. FEATURED PROJECTS BENTO GRID (HEADLINES vs DETAILS) */}
      {/* ============================================================ */}
      {(activeFilter === 'all' || activeFilter === 'projects') && (
        <section className="mb-14">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Layers className="w-6 h-6 text-[#003527]" />
              <h2 className="font-display text-[24px] md:text-[28px] font-bold text-[#0b1c30]">
                {t('portfolio.title', 'Dự án & Nền tảng Tiêu biểu')}
              </h2>
            </div>
            {!isUnlocked && (
              <span className="text-[12px] font-body text-amber-700 bg-amber-50 px-2.5 py-1 rounded border border-amber-200 flex items-center gap-1">
                <Lock className="w-3 h-3" />
                <span>{isVi ? 'Tiêu đề & Tóm lược' : 'Headline & Excerpt View'}</span>
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className={`${
                  proj.colSpan || 'col-span-12 md:col-span-6'
                } bg-white border border-[#bfc9c3]/60 rounded-xl overflow-hidden shadow-sm hover:shadow-[0px_8px_30px_rgba(15,23,42,0.08)] transition-all duration-300 flex flex-col justify-between`}
              >
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Headline badge and category */}
                    <div className="flex justify-between items-start mb-3 gap-2 flex-wrap">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-3.5 py-1 bg-[#eff4ff] text-[#003527] text-[12px] font-body font-bold rounded-full border border-[#003527]/10">
                          {proj.badge}
                        </span>
                        {proj.articleUrl && (
                          <a
                            href={proj.articleUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-900 text-[11px] font-body font-bold rounded-full border border-amber-300 transition-colors"
                          >
                            <span>{proj.pressSource || 'Báo Chính Phủ'}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                      <span className="text-[12px] font-body text-[#707974]">{proj.category}</span>
                    </div>

                    {/* Headline Project Title */}
                    <h3
                      onClick={() => {
                        if (isUnlocked) {
                          onOpenProject(proj);
                        } else {
                          handleOpenUnlockModal();
                        }
                      }}
                      className="font-display text-[22px] md:text-[24px] font-bold text-[#0b1c30] mb-2 hover:text-[#003527] transition-colors cursor-pointer"
                    >
                      {proj.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="font-body text-[15px] text-[#404944] mb-5 leading-relaxed">
                      {proj.excerpt}
                    </p>

                    {/* Highlights - Shown only if unlocked */}
                    {isUnlocked ? (
                      proj.highlights && proj.highlights.length > 0 && (
                        <div className="space-y-1.5 mb-5">
                          {proj.highlights.slice(0, 2).map((hl, hlIdx) => (
                            <div key={hlIdx} className="flex items-center text-[14px] font-body text-[#404944]">
                              <CheckCircle2 className="w-4 h-4 mr-2 text-[#003527] flex-shrink-0" />
                              <span className="truncate">{hl}</span>
                            </div>
                          ))}
                        </div>
                      )
                    ) : (
                      <div className="mb-5 p-2.5 bg-[#f8f9ff] rounded border border-dashed border-[#bfc9c3] flex items-center justify-between text-[12px] text-[#707974]">
                        <span className="italic flex items-center gap-1.5">
                          <Lock className="w-3.5 h-3.5 text-amber-700" />
                          {isVi ? 'Thông số kỹ thuật & KPI ẩn' : 'Full architecture & KPIs locked'}
                        </span>
                        <button
                          onClick={handleOpenUnlockModal}
                          className="text-[#003527] font-semibold hover:underline cursor-pointer"
                        >
                          {isVi ? 'Mở' : 'Unlock'}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-[#bfc9c3]/30">
                    <button
                      onClick={() => {
                        if (isUnlocked) {
                          onOpenProject(proj);
                        } else {
                          handleOpenUnlockModal();
                        }
                      }}
                      className="bg-[#003527] text-white px-5 py-2 rounded-[4px] font-body text-[14px] font-medium hover:bg-[#064e3b] transition-transform duration-100 active:scale-95 cursor-pointer shadow-sm flex items-center gap-1.5"
                    >
                      {!isUnlocked && <Lock className="w-3.5 h-3.5" />}
                      <span>{t('portfolio.projectDetails', 'Chi tiết dự án')}</span>
                    </button>
                    <button
                      onClick={() => onOpenConnect(proj.title)}
                      className="border border-[#003527] text-[#003527] px-4 py-2 rounded-[4px] font-body text-[14px] font-medium hover:bg-[#eff4ff] transition-all cursor-pointer"
                    >
                      {t('portfolio.contactCollab', 'Hợp tác')}
                    </button>
                  </div>
                </div>

                {/* Project Image */}
                <div
                  onClick={() => {
                    if (isUnlocked) {
                      onOpenProject(proj);
                    } else {
                      handleOpenUnlockModal();
                    }
                  }}
                  className="h-56 md:h-64 bg-[#eff4ff] overflow-hidden relative border-t border-[#bfc9c3]/40 cursor-pointer group"
                >
                  <img
                    src={proj.image}
                    alt={proj.imageAlt}
                    className={`w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ease-out ${!isUnlocked ? 'filter blur-[2px] opacity-90' : ''}`}
                    referrerPolicy="no-referrer"
                  />
                  {!isUnlocked && (
                    <div className="absolute inset-0 bg-[#003527]/20 backdrop-blur-[1px] flex items-center justify-center">
                      <span className="px-3.5 py-1.5 bg-white/90 text-[#003527] rounded-full text-[12px] font-body font-bold shadow-md flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-amber-700" />
                        <span>{isVi ? 'Bản xem tiêu đề' : 'Headline View'}</span>
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 7. EDUCATION & CERTIFICATIONS (HEADLINES vs DETAILS) */}
      {/* ============================================================ */}
      {(activeFilter === 'all' || activeFilter === 'education') && (
        <section className="mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Education Timeline (Col 7) */}
            <div className="lg:col-span-7 bg-white border border-[#bfc9c3]/60 rounded-xl p-6 md:p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#bfc9c3]/30">
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-6 h-6 text-[#003527]" />
                  <h2 className="font-display text-[22px] md:text-[24px] font-bold text-[#0b1c30]">
                    {isVi ? 'Học Vấn & Nghiên Cứu' : 'Education & Academic Background'}
                  </h2>
                </div>
              </div>

              <div className="space-y-6">
                {profile.education.map((edu, idx) => (
                  <div key={idx} className="relative pl-6 border-l-2 border-[#003527]/30 pb-4 last:pb-0">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#003527] border-2 border-white shadow-sm" />
                    {/* Headline: Degree Title & Institution */}
                    <h3 className="font-display text-[17px] font-bold text-[#003527]">
                      {isVi ? edu.degreeVi : edu.degreeEn}
                    </h3>
                    <div className="font-body text-[15px] font-semibold text-[#0b1c30] mt-0.5">
                      {isVi ? edu.institutionVi : edu.institutionEn}
                    </div>

                    {/* Detailed Notes */}
                    {isUnlocked ? (
                      edu.noteEn && (
                        <p className="font-body text-[13px] text-[#707974] mt-1">
                          {isVi ? edu.noteVi : edu.noteEn}
                        </p>
                      )
                    ) : (
                      <div className="text-[12px] text-[#707974] italic mt-1 flex items-center gap-1">
                        <Lock className="w-3 h-3 text-amber-700" />
                        <span>{isVi ? 'Chi tiết đề tài & chuyên ngành bảo mật' : 'Academic scope protected'}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications & Skills (Col 5) */}
            <div className="lg:col-span-5 bg-white border border-[#bfc9c3]/60 rounded-xl p-6 md:p-8 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#bfc9c3]/30">
                  <Award className="w-6 h-6 text-[#003527]" />
                  <h2 className="font-display text-[22px] md:text-[24px] font-bold text-[#0b1c30]">
                    {isVi ? 'Chứng Chỉ & Kỹ Năng' : 'Certifications & Skills'}
                  </h2>
                </div>

                <div className="space-y-5">
                  {profile.certifications.map((certGroup, cIdx) => (
                    <div key={cIdx} className="p-4 rounded-lg bg-[#f8f9ff] border border-[#bfc9c3]/40">
                      <h4 className="font-display text-[15px] font-bold text-[#003527] mb-2">
                        {isVi ? certGroup.titleVi : certGroup.titleEn}
                      </h4>
                      {isUnlocked ? (
                        <ul className="space-y-1.5">
                          {certGroup.items.map((item, iIdx) => (
                            <li key={iIdx} className="text-[13px] font-body text-[#404944] flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#003527] mt-1.5 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="text-[12px] text-[#707974] italic flex items-center justify-between">
                          <span className="flex items-center gap-1">
                            <Lock className="w-3 h-3 text-amber-700" />
                            {isVi ? `${certGroup.items.length} chứng chỉ chuyên ngành` : `${certGroup.items.length} certificates registered`}
                          </span>
                          <button
                            onClick={handleOpenUnlockModal}
                            className="text-[#003527] font-semibold hover:underline cursor-pointer"
                          >
                            {isVi ? 'Mở' : 'View'}
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 8. OTHER ACTIVITIES & NETWORK */}
      {/* ============================================================ */}
      {(activeFilter === 'all' || activeFilter === 'experience') && (
        <section className="mb-14">
          <div className="bg-white border border-[#bfc9c3]/60 rounded-xl p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#bfc9c3]/30">
              <Users className="w-6 h-6 text-[#003527]" />
              <h2 className="font-display text-[22px] md:text-[24px] font-bold text-[#0b1c30]">
                {isVi ? 'Hoạt Động Xã Hội & Mạng Lưới Kết Nối' : 'Other Activities & Professional Network'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profile.otherActivities.map((act, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 bg-[#f8f9ff] rounded-lg border border-[#bfc9c3]/40">
                  <CheckCircle2 className="w-4 h-4 text-[#003527] flex-shrink-0 mt-0.5" />
                  <span className="font-body text-[14px] text-[#404944]">
                    {isVi ? act.vi : act.en}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 9. COLLABORATION CALLOUT BANNER */}
      {/* ============================================================ */}
      <section className="bg-[#eff4ff] border border-[#bfc9c3]/60 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm no-print">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Layers className="w-5 h-5 text-[#003527]" />
            <h3 className="font-display text-[22px] md:text-[26px] font-bold text-[#0b1c30]">
              {t('portfolio.collabBanner.title', 'Bạn đang có ý tưởng hoặc dự án cần phát triển?')}
            </h3>
          </div>
          <p className="font-body text-[15px] md:text-[16px] text-[#404944] max-w-2xl leading-relaxed">
            {t('portfolio.collabBanner.desc', 'Sẵn sàng hỗ trợ tư vấn kiến trúc công nghệ, phân tích kinh tế định lượng và giải pháp EdTech & AI chuyên sâu.')}
          </p>
        </div>
        <button
          onClick={() => onOpenConnect()}
          className="bg-[#003527] text-white px-8 py-3.5 rounded-[4px] font-body text-[15px] font-semibold hover:bg-[#064e3b] transition-transform duration-100 active:scale-95 whitespace-nowrap cursor-pointer shadow-sm"
        >
          {t('portfolio.collabBanner.btn', 'Bắt đầu trao đổi')}
        </button>
      </section>

      {/* ============================================================ */}
      {/* SECURITY PASSCODE MODAL DIALOG */}
      {/* ============================================================ */}
      {showSecurityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 no-print">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 md:p-8 border border-[#bfc9c3]/70 shadow-2xl relative">
            <button
              onClick={() => setShowSecurityModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#eff4ff] hover:bg-[#dce9ff] text-[#003527] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#003527] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                <KeyRound className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display text-[20px] font-bold text-[#0b1c30]">
                  {securityModalPurpose === 'print'
                    ? isVi
                      ? 'Xác thực In Hồ sơ Năng lực'
                      : 'Authorize Printing Dossier'
                    : isVi
                    ? 'Mở khóa Chi tiết Hồ sơ'
                    : 'Unlock Full Executive Profile'}
                </h3>
                <span className="text-[12px] font-body text-[#707974]">
                  {isVi ? 'Bảo mật thông tin chuyên gia & KPI' : 'Confidential data protection'}
                </span>
              </div>
            </div>

            <p className="font-body text-[14px] text-[#404944] mb-5 leading-relaxed">
              {securityModalPurpose === 'print'
                ? isVi
                  ? 'Theo quy định bảo mật, bạn cần nhập mã bảo mật ủy quyền để In hoặc Xuất file PDF hồ sơ năng lực đầy đủ.'
                  : 'Passcode authorization is required to print or export the complete executive profile.'
                : isVi
                ? 'Nhập mã bảo mật để xem toàn bộ thông số kỹ thuật, KPI dự án và danh mục đào tạo chi tiết.'
                : 'Enter your passcode to review detailed project architectures, operational KPIs, and training rosters.'}
            </p>

            <form onSubmit={handleUnlockAttempt} className="space-y-4">
              <div>
                <label className="block text-[13px] font-body font-bold text-[#0b1c30] mb-1.5">
                  {isVi ? 'Mã bảo mật cấp phép (Passcode)' : 'Security Passcode'}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={passcodeInput}
                    onChange={(e) => {
                      setPasscodeInput(e.target.value);
                      if (errorMessage) setErrorMessage('');
                    }}
                    placeholder={isVi ? 'Nhập mã bảo mật cấp phép riêng tư...' : 'Enter your confidential passcode...'}
                    className="w-full px-4 py-3 bg-[#f8f9ff] border border-[#bfc9c3] rounded-lg font-body text-[15px] text-[#0b1c30] tracking-wider uppercase focus:outline-none focus:border-[#003527] focus:ring-1 focus:ring-[#003527]"
                    autoFocus
                  />
                  <div className="absolute right-3 top-3 text-[#707974]">
                    <Lock className="w-5 h-5" />
                  </div>
                </div>
                {errorMessage && (
                  <div className="flex items-center gap-1.5 text-rose-600 text-[13px] font-body mt-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}
              </div>

              {/* Confidential Privacy Notice (No code displayed) */}
              <div className="p-3 bg-[#eff4ff] border border-[#003527]/10 rounded-lg flex items-start gap-2.5">
                <Shield className="w-4 h-4 text-[#003527] flex-shrink-0 mt-0.5" />
                <p className="text-[12px] font-body text-[#404944] leading-relaxed">
                  {isVi
                    ? 'Mã bảo mật được phân quyền và cấp phát riêng bởi Quản trị viên cho đối tác, nhà tuyển dụng và hội đồng chuyên môn.'
                    : 'Security codes are privately issued by the Administrator for partners, evaluators, and recruiters.'}
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSecurityModal(false)}
                  className="flex-1 px-4 py-2.5 border border-[#bfc9c3] rounded-[4px] font-body text-[14px] font-medium text-[#404944] hover:bg-neutral-50 transition-colors cursor-pointer"
                >
                  {isVi ? 'Hủy bỏ' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-[#003527] text-white rounded-[4px] font-body text-[14px] font-semibold hover:bg-[#064e3b] transition-all cursor-pointer shadow-sm"
                >
                  {isVi ? 'Xác nhận mở khóa' : 'Unlock Access'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* PRINT-ONLY SECURITY WATERMARK / BLOCKER */}
      {/* ============================================================ */}
      {!isUnlocked && (
        <div className="print-lock-notice hidden">
          <div style={{ textAlign: 'center', padding: '100px 20px', fontFamily: 'sans-serif' }}>
            <h2 style={{ fontSize: '24pt', color: '#003527', marginBottom: '16pt' }}>
              TÀI LIỆU BẢO MẬT - YÊU CẦU MÃ XÁC THỰC IN
            </h2>
            <p style={{ fontSize: '13pt', color: '#4b5563', maxWidth: '600px', margin: '0 auto 20pt' }}>
              Hồ sơ năng lực chuyên gia được bảo vệ theo chính sách bảo mật thông tin.
              Vui lòng nhập mã bảo mật cấp phép trên giao diện web trước khi in ấn hoặc xuất bản PDF.
            </p>
            <div style={{ fontSize: '11pt', color: '#6b7280', borderTop: '1px solid #e5e7eb', paddingTop: '15pt' }}>
              Liên hệ cấp phép: trieucnn@gmail.com
            </div>
          </div>
        </div>
      )}

      {/* Photo Manager Modal */}
      <PhotoManagerModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
      />
    </div>
  );
};
