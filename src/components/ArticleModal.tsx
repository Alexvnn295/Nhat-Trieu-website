import React, { useState, useRef, useEffect } from 'react';
import { BlogPost } from '../types';
import {
  X,
  Clock,
  Calendar,
  User,
  Share2,
  Check,
  Bookmark,
  ThumbsUp,
  Printer,
  Link as LinkIcon,
  Copy,
  Linkedin,
  Mail,
  Send,
  MessageSquare,
  Globe,
  ExternalLink,
  Headphones,
  Play,
  Pause,
  Eye,
  TrendingUp,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { useData } from '../context/DataContext';
import { PERSONAL_PORTRAITS } from '../data/profileData';
import { useBlogAudioReader } from '../hooks/useBlogAudioReader';
import { BlogAudioPlayer } from './BlogAudioPlayer';

interface ArticleModalProps {
  post: BlogPost | null;
  onClose: () => void;
  onSelectTag?: (tag: string) => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  post,
  onClose,
  onSelectTag,
}) => {
  const { language, t } = useLanguage();
  const { showSuccess } = useToast();
  const { profile } = useData();
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(48);
  const [saved, setSaved] = useState(false);
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const [isBottomShareMenuOpen, setIsBottomShareMenuOpen] = useState(false);
  const shareMenuRef = useRef<HTMLDivElement>(null);
  const bottomShareMenuRef = useRef<HTMLDivElement>(null);

  const portraits = profile.personalPortraits || PERSONAL_PORTRAITS;
  const activePhoto =
    portraits.find((p) => p.id === profile.activePhotoId) || portraits[0];
  const authorAvatarSrc = profile.avatarUrl || activePhoto.url;
  const authorAvatarFallback = activePhoto.fallbackUrl;

  // View count analytics state starting at base 10,000+
  const [viewCount, setViewCount] = useState<number>(() => {
    if (!post) return 10000;
    const hash = post.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const baseOffset = (hash * 173) % 4820; // range 10,000 to 14,819
    const initialBase = 10000 + baseOffset;
    try {
      const storageKey = `article_views_${post.id}`;
      const stored = localStorage.getItem(storageKey);
      const current = stored ? parseInt(stored, 10) : initialBase;
      const nextCount = Math.max(10000, current + 1);
      localStorage.setItem(storageKey, nextCount.toString());
      return nextCount;
    } catch {
      return initialBase + 1;
    }
  });

  useEffect(() => {
    if (!post) return;
    const hash = post.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const baseOffset = (hash * 173) % 4820;
    const initialBase = 10000 + baseOffset;
    try {
      const storageKey = `article_views_${post.id}`;
      const stored = localStorage.getItem(storageKey);
      const current = stored ? parseInt(stored, 10) : initialBase;
      const nextCount = Math.max(10000, current + 1);
      localStorage.setItem(storageKey, nextCount.toString());
      setViewCount(nextCount);
    } catch {
      setViewCount(initialBase + 1);
    }
  }, [post?.id]);

  // Audio Reader Hook
  const audioReader = useBlogAudioReader(post, language);

  // Stop audio on close
  const handleModalClose = () => {
    audioReader.stop();
    onClose();
  };

  // Close share menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(e.target as Node)) {
        setIsShareMenuOpen(false);
      }
      if (bottomShareMenuRef.current && !bottomShareMenuRef.current.contains(e.target as Node)) {
        setIsBottomShareMenuOpen(false);
      }
    };
    if (isShareMenuOpen || isBottomShareMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isShareMenuOpen, isBottomShareMenuOpen]);

  if (!post) return null;

  const getShareUrl = () => {
    try {
      const origin = window.location.origin;
      const pathname = window.location.pathname;
      return `${origin}${pathname}?tab=blog&article=${post.id}`;
    } catch {
      return window.location.href;
    }
  };

  const handleCopyLink = async (silent = false) => {
    const url = getShareUrl();
    let success = false;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
        success = true;
      } else {
        // Fallback for non-secure or restricted iframe contexts
        const textArea = document.createElement('textarea');
        textArea.value = url;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        success = document.execCommand('copy');
        document.body.removeChild(textArea);
      }
    } catch {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = url;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        success = true;
      } catch {
        success = false;
      }
    }

    setCopied(true);
    if (!silent) {
      showSuccess(
        t('blog.linkCopied', 'Đã sao chép liên kết!'),
        t('blog.linkCopiedDesc', 'Liên kết bài viết đã được lưu vào bộ nhớ tạm để chia sẻ.')
      );
    }
    setTimeout(() => setCopied(false), 2500);
    return success;
  };

  const handleNativeShare = async (triggerSource: 'top' | 'bottom' = 'top') => {
    const shareUrl = getShareUrl();
    const shareData = {
      title: post.title,
      text: `${post.title} - Cao Nguyễn Nhật Triều: ${post.excerpt}`,
      url: shareUrl,
    };

    // Attempt Web Share API first
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        await navigator.share(shareData);
        showSuccess(
          language === 'vi' ? 'Đã chia sẻ bài viết!' : 'Article Shared!',
          language === 'vi' ? 'Cảm ơn bạn đã lan tỏa tri thức cùng cộng đồng.' : 'Thank you for sharing with the community.'
        );
        return;
      } catch (err: unknown) {
        if ((err as Error)?.name === 'AbortError') {
          // User dismissed the native share sheet
          return;
        }
        // If native share fails or permissions are restricted in iframe, fallback to menu
        if (triggerSource === 'bottom') {
          setIsBottomShareMenuOpen(true);
        } else {
          setIsShareMenuOpen(true);
        }
        return;
      }
    }

    // If Web Share API is not supported on this device/browser, toggle share menu at trigger position
    if (triggerSource === 'bottom') {
      setIsBottomShareMenuOpen((prev) => !prev);
    } else {
      setIsShareMenuOpen((prev) => !prev);
    }
  };

  const handleSocialShare = (platform: 'linkedin' | 'facebook' | 'mail' | 'telegram' | 'whatsapp') => {
    const url = encodeURIComponent(getShareUrl());
    const title = encodeURIComponent(post.title);
    const summary = encodeURIComponent(post.excerpt);

    let targetUrl = '';
    switch (platform) {
      case 'linkedin':
        targetUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case 'facebook':
        targetUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'telegram':
        targetUrl = `https://t.me/share/url?url=${url}&text=${title}`;
        break;
      case 'whatsapp':
        targetUrl = `https://api.whatsapp.com/send?text=${title}%20${url}`;
        break;
      case 'mail':
        targetUrl = `mailto:?subject=${title}&body=${summary}%0A%0AĐọc chi tiết tại: ${url}`;
        break;
    }

    if (platform === 'mail') {
      window.location.href = targetUrl;
    } else if (targetUrl) {
      window.open(targetUrl, '_blank', 'noopener,noreferrer,width=600,height=500');
    }
    setIsShareMenuOpen(false);
    setIsBottomShareMenuOpen(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikeCount((c) => c - 1);
    } else {
      setLiked(true);
      setLikeCount((c) => c + 1);
    }
  };

  return (
    <div className="article-modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="article-modal-card bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto border border-[#bfc9c3]/60 shadow-2xl relative">
        {/* Top Sticky Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-[#bfc9c3]/50 px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between z-20 no-print gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`px-3 py-1 rounded-full text-[12px] font-body font-bold ${
                post.category === 'Kinh tế' || post.category.includes('Econ')
                  ? 'bg-[#003527] text-white'
                  : post.category === 'Giáo dục' || post.category.includes('Edu')
                  ? 'bg-[#2b6954] text-white'
                  : 'bg-[#213145] text-white'
              }`}
            >
              {post.category}
            </span>

            {/* Popularity Analytics View Count Badge (Starts at base 10,000+) */}
            <div
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#eff4ff] border border-[#003527]/15 text-[#003527] text-[12px] font-body font-semibold shadow-xs"
              title={
                language === 'vi'
                  ? `Thống kê mức độ quan tâm: ${viewCount.toLocaleString('en-US')} lượt đọc bài viết`
                  : `Article popularity: ${viewCount.toLocaleString('en-US')} total reads`
              }
            >
              <Eye className="w-3.5 h-3.5 text-[#003527]" />
              <span className="font-mono font-bold">{viewCount.toLocaleString('en-US')}</span>
              <span className="text-[11px] font-normal text-[#404944] hidden sm:inline">
                {language === 'vi' ? 'lượt xem' : 'views'}
              </span>
            </div>

            <span className="text-[13px] font-body text-[#707974] hidden md:flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {post.readTime}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Audio Play / Pause Header Button */}
            {audioReader.isSupported && (
              <button
                onClick={audioReader.togglePlay}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-body font-bold transition-all cursor-pointer ${
                  audioReader.isPlaying
                    ? 'bg-[#003527] text-[#80e5b7] shadow-sm animate-pulse'
                    : 'bg-[#eff4ff] hover:bg-[#dce9ff] text-[#003527]'
                }`}
                title={audioReader.isPlaying ? (language === 'vi' ? 'Tạm dừng đọc' : 'Pause audio') : (language === 'vi' ? 'Nghe bài viết' : 'Listen to article')}
                aria-label="Toggle audio reader"
              >
                {audioReader.isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5 fill-current" />
                    <span className="text-[12px] hidden sm:inline">{language === 'vi' ? 'Đang phát' : 'Playing'}</span>
                  </>
                ) : (
                  <>
                    <Headphones className="w-3.5 h-3.5" />
                    <span className="text-[12px] hidden sm:inline">{language === 'vi' ? 'Nghe bài' : 'Listen'}</span>
                  </>
                )}
              </button>
            )}

            {/* Print Article */}
            <button
              onClick={handlePrint}
              className="p-2 rounded-full hover:bg-[#eff4ff] text-[#003527] transition-colors cursor-pointer"
              title={t('blog.printArticle', 'In bài viết (Print Article)')}
              aria-label="Print article"
            >
              <Printer className="w-4 h-4" />
            </button>

            {/* Quick Copy Link Button with Visual Feedback */}
            <button
              onClick={() => handleCopyLink(false)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[13px] font-body font-medium transition-all cursor-pointer ${
                copied
                  ? 'bg-[#15803d]/15 text-[#15803d] border border-[#15803d]/30'
                  : 'hover:bg-[#eff4ff] text-[#003527] border border-transparent'
              }`}
              title={t('blog.copyLink', 'Sao chép liên kết')}
              aria-label="Copy link to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600 animate-in zoom-in duration-150" />
                  <span className="text-[12px] font-semibold text-emerald-700 hidden sm:inline">
                    {t('blog.linkCopied', 'Đã sao chép!')}
                  </span>
                </>
              ) : (
                <>
                  <LinkIcon className="w-4 h-4" />
                  <span className="text-[12px] hidden sm:inline">
                    {t('blog.copyLink', 'Sao chép')}
                  </span>
                </>
              )}
            </button>

            {/* Native Share & Social Share Menu Dropdown */}
            <div className="relative" ref={shareMenuRef}>
              <button
                onClick={() => handleNativeShare('top')}
                className={`p-2 rounded-full transition-colors cursor-pointer flex items-center gap-1.5 ${
                  isShareMenuOpen
                    ? 'bg-[#003527] text-white'
                    : 'hover:bg-[#eff4ff] text-[#003527]'
                }`}
                title={t('blog.shareArticle', 'Chia sẻ bài viết')}
                aria-label="Share article"
                aria-haspopup="true"
                aria-expanded={isShareMenuOpen}
              >
                <Share2 className="w-4 h-4" />
              </button>

              {/* Share Options Popup Menu */}
              {isShareMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-[#bfc9c3]/70 py-2.5 z-30 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3.5 py-1.5 border-b border-[#bfc9c3]/30 mb-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#707974]">
                      {t('blog.shareVia', 'Chia sẻ bài viết qua')}
                    </span>
                  </div>

                  {/* Copy Link Option inside Menu */}
                  <button
                    onClick={() => {
                      handleCopyLink();
                      setIsShareMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[13px] font-body text-[#0b1c30] hover:bg-[#eff4ff] hover:text-[#003527] transition-colors cursor-pointer text-left"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#eff4ff] text-[#003527] flex items-center justify-center flex-shrink-0">
                      {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="font-semibold">{t('blog.copyLink', 'Sao chép liên kết')}</div>
                      <div className="text-[11px] text-[#707974]">URL trực tiếp tới bài viết</div>
                    </div>
                  </button>

                  {/* LinkedIn */}
                  <button
                    onClick={() => handleSocialShare('linkedin')}
                    className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[13px] font-body text-[#0b1c30] hover:bg-[#eff4ff] hover:text-[#003527] transition-colors cursor-pointer text-left"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#0077b5]/10 text-[#0077b5] flex items-center justify-center flex-shrink-0">
                      <Linkedin className="w-4 h-4" />
                    </div>
                    <span>LinkedIn</span>
                  </button>

                  {/* Facebook */}
                  <button
                    onClick={() => handleSocialShare('facebook')}
                    className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[13px] font-body text-[#0b1c30] hover:bg-[#eff4ff] hover:text-[#003527] transition-colors cursor-pointer text-left"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#1877f2]/10 text-[#1877f2] flex items-center justify-center flex-shrink-0">
                      <Globe className="w-4 h-4" />
                    </div>
                    <span>Facebook</span>
                  </button>

                  {/* Telegram */}
                  <button
                    onClick={() => handleSocialShare('telegram')}
                    className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[13px] font-body text-[#0b1c30] hover:bg-[#eff4ff] hover:text-[#003527] transition-colors cursor-pointer text-left"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#229ed9]/10 text-[#229ed9] flex items-center justify-center flex-shrink-0">
                      <Send className="w-4 h-4" />
                    </div>
                    <span>Telegram</span>
                  </button>

                  {/* Email */}
                  <button
                    onClick={() => handleSocialShare('mail')}
                    className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[13px] font-body text-[#0b1c30] hover:bg-[#eff4ff] hover:text-[#003527] transition-colors cursor-pointer text-left"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#003527]/10 text-[#003527] flex items-center justify-center flex-shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span>Email</span>
                  </button>
                </div>
              )}
            </div>

            {/* Bookmark / Save */}
            <button
              onClick={() => setSaved(!saved)}
              className={`p-2 rounded-full hover:bg-[#eff4ff] transition-colors cursor-pointer ${
                saved ? 'text-[#003527] fill-[#003527]' : 'text-[#707974]'
              }`}
              title={t('blog.saveArticle', 'Lưu bài viết')}
              aria-label="Save article"
            >
              <Bookmark className="w-4 h-4" />
            </button>

            {/* Close Modal Button */}
            <button
              onClick={handleModalClose}
              className="w-8 h-8 rounded-full bg-[#eff4ff] hover:bg-[#dce9ff] text-[#003527] flex items-center justify-center transition-colors cursor-pointer ml-1"
              aria-label="Close article"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Container */}
        <div className="p-4 sm:p-6 md:p-10">
          {/* Title */}
          <h1 className="font-display text-[22px] sm:text-[28px] md:text-[34px] lg:text-[36px] font-bold text-[#0b1c30] leading-snug sm:leading-tight mb-4">
            {post.title}
          </h1>

          {/* Metadata Row */}
          <div className="article-meta flex flex-wrap items-center gap-4 text-[14px] font-body text-[#707974] pb-6 border-b border-[#bfc9c3]/50 mb-6">
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-[#003527]" />
              <span className="font-medium text-[#0b1c30]">{post.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#003527] font-medium">
              <Eye className="w-4 h-4 text-[#003527]" />
              <span className="font-mono font-semibold">{viewCount.toLocaleString('en-US')}</span>
              <span className="text-[#707974] text-[13px]">{language === 'vi' ? 'lượt đọc' : 'reads'}</span>
            </div>
            <div className="flex items-center gap-1.5 ml-auto text-[13px] text-[#707974]">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Dedicated Blog Audio Reader Player */}
          {audioReader.isSupported && (
            <div className="no-print">
              <BlogAudioPlayer post={post} audioReader={audioReader} />
            </div>
          )}

          {/* Main Hero Image */}
          <div className="rounded-xl overflow-hidden mb-8 border border-[#bfc9c3]/60 shadow-sm max-h-[380px]">
            <img
              src={post.image}
              alt={post.imageAlt}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Excerpt Lead */}
          <div className={`article-lead p-4 bg-[#eff4ff] border-l-4 border-[#003527] rounded-r-lg mb-8 font-body text-[16px] md:text-[17px] text-[#0b1c30] italic leading-relaxed transition-all ${
            audioReader.isPlaying && audioReader.isHighlighted && audioReader.activeSentenceText.includes(post.excerpt.slice(0, 30))
              ? 'ring-2 ring-[#10b981] bg-[#e6fcf5] shadow-xs'
              : ''
          }`}>
            &quot;{post.excerpt}&quot;
          </div>

          {/* Article Body with dynamic live audio highlighting & rich executive formatting */}
          <div className="article-body font-body text-[16px] md:text-[17px] text-[#404944] leading-[1.8] space-y-5">
            {(() => {
              const renderInline = (text: string) => {
                const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
                return parts.map((part, i) => {
                  if (part.startsWith('**') && part.endsWith('**')) {
                    return (
                      <strong key={i} className="font-bold text-[#0b1c30]">
                        {part.slice(2, -2)}
                      </strong>
                    );
                  }
                  if (part.startsWith('*') && part.endsWith('*')) {
                    return (
                      <em key={i} className="italic text-[#0b1c30]">
                        {part.slice(1, -1)}
                      </em>
                    );
                  }
                  return part;
                });
              };

              return post.content.split('\n\n').map((block, pIdx) => {
                const cleanBlock = block.trim();
                const isCurrentReading =
                  audioReader.isPlaying &&
                  audioReader.isHighlighted &&
                  audioReader.activeSentenceText &&
                  cleanBlock.toLowerCase().includes(audioReader.activeSentenceText.slice(0, 30).toLowerCase());

                if (cleanBlock === '---') {
                  return <hr key={pIdx} className="my-8 border-t border-[#bfc9c3]/60" />;
                }

                if (cleanBlock.startsWith('### ')) {
                  const headingText = cleanBlock.replace(/^###\s+/, '');
                  const isHooks = headingText.includes('Đúc kết') || headingText.includes('hook');
                  return (
                    <h3
                      key={pIdx}
                      className={`font-display text-[19px] sm:text-[22px] font-bold text-[#003527] mt-8 mb-3 flex items-center gap-2.5 transition-all duration-300 ${
                        isCurrentReading ? 'bg-[#10b981]/15 px-2 py-1 rounded-lg' : ''
                      }`}
                    >
                      <span className="w-1.5 h-5 bg-[#003527] rounded-full inline-block flex-shrink-0" />
                      <span>{renderInline(headingText)}</span>
                    </h3>
                  );
                }

                if (cleanBlock.startsWith('#### ')) {
                  return (
                    <h4
                      key={pIdx}
                      className={`font-display text-[17px] sm:text-[18px] font-bold text-[#0b1c30] mt-6 mb-2 transition-all duration-300 ${
                        isCurrentReading ? 'bg-[#10b981]/15 px-2 py-1 rounded-lg' : ''
                      }`}
                    >
                      {renderInline(cleanBlock.replace(/^####\s+/, ''))}
                    </h4>
                  );
                }

                // Executive Hooks or Numbered List Box
                if (cleanBlock.includes('💡 5 Đúc kết then chốt') || cleanBlock.includes('5 phiên bản hook ngắn')) {
                  const lines = cleanBlock.split('\n');
                  const headerLine = lines[0];
                  const items = lines.slice(1).filter((l) => l.trim().length > 0);

                  return (
                    <div
                      key={pIdx}
                      className="my-8 p-5 sm:p-7 rounded-2xl bg-gradient-to-br from-[#00281d] via-[#003527] to-[#041c14] text-white shadow-xl border border-[#a7f3d0]/20 space-y-4"
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-white/15">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-5 h-5 text-[#80e5b7]" />
                          <h4 className="font-display text-[17px] sm:text-[19px] font-bold text-white tracking-wide">
                            {headerLine.replace(/^###\s+/, '')}
                          </h4>
                        </div>
                        <span className="text-[11px] font-mono uppercase bg-[#80e5b7]/20 text-[#80e5b7] px-2.5 py-0.5 rounded-full font-bold">
                          Executive Hooks
                        </span>
                      </div>
                      <div className="space-y-3">
                        {items.map((item, idx) => {
                          const cleanItem = item.replace(/^\d+\.\s*/, '').replace(/^[-*]\s*/, '');
                          return (
                            <div
                              key={idx}
                              className="flex items-start gap-3 p-3.5 rounded-xl bg-white/10 hover:bg-white/15 transition-colors border border-white/10"
                            >
                              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#80e5b7] text-[#003527] font-bold text-[12px] flex items-center justify-center font-display mt-0.5">
                                {idx + 1}
                              </span>
                              <p className="font-body text-[14px] sm:text-[15px] text-[#ecfdf5] leading-relaxed">
                                {renderInline(cleanItem)}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                }

                // Multiline list items
                const lines = cleanBlock.split('\n');
                if (lines.length > 1 && lines.every((l) => /^\s*(\d+\.|[-*])\s+/.test(l))) {
                  const isOrdered = /^\s*\d+\.\s+/.test(lines[0]);
                  return isOrdered ? (
                    <ol key={pIdx} className="space-y-2.5 my-4 pl-4 list-decimal list-outside font-body text-[16px] text-[#404944]">
                      {lines.map((l, i) => (
                        <li key={i} className="leading-relaxed pl-1">
                          {renderInline(l.replace(/^\s*\d+\.\s+/, ''))}
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <ul key={pIdx} className="space-y-2.5 my-4 pl-4 list-disc list-outside font-body text-[16px] text-[#404944]">
                      {lines.map((l, i) => (
                        <li key={i} className="leading-relaxed pl-1">
                          {renderInline(l.replace(/^\s*[-*]\s+/, ''))}
                        </li>
                      ))}
                    </ul>
                  );
                }

                return (
                  <p
                    key={pIdx}
                    className={`transition-all duration-300 rounded-lg p-1.5 -mx-1.5 leading-[1.8] ${
                      isCurrentReading
                        ? 'bg-[#10b981]/15 text-[#003527] border-l-4 border-[#10b981] pl-3.5 font-medium shadow-xs'
                        : ''
                    }`}
                  >
                    {renderInline(cleanBlock)}
                  </p>
                );
              });
            })()}
          </div>

          {/* Tags */}
          <div className="article-tags mt-10 pt-6 border-t border-[#bfc9c3]/50 flex flex-wrap items-center gap-2">
            <span className="font-body text-[13px] font-bold text-[#707974] uppercase mr-2">Tags:</span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                onClick={() => {
                  onSelectTag?.(tag);
                  handleModalClose();
                }}
                className="px-3 py-1 rounded-full text-[13px] font-body font-medium bg-[#d3e4fe]/60 text-[#0b1c30] hover:bg-[#b0f0d6] cursor-pointer transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Author Profile Card */}
          <div className="mt-8 p-5 bg-[#eff4ff] border border-[#003527]/15 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden border-2 border-[#003527]/20 shadow-md flex-shrink-0 bg-neutral-900">
              <img
                src={authorAvatarSrc}
                alt={profile.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = authorAvatarFallback;
                }}
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-display text-[16px] sm:text-[17px] font-bold text-[#003527]">
                  {profile.name}
                </span>
                <span className="px-2 py-0.5 bg-[#b0f0d6] text-[#003527] rounded text-[11px] font-body font-bold">
                  {language === 'vi' ? 'Tác giả' : 'Author'}
                </span>
              </div>
              <p className="font-body text-[13px] font-medium text-[#0b1c30] mb-1">
                {language === 'vi' ? profile.titleVi : profile.titleEn}
              </p>
              <p className="font-body text-[12px] text-[#404944] leading-relaxed line-clamp-2">
                {language === 'vi' ? profile.summaryVi : profile.summaryEn}
              </p>
            </div>
          </div>

          {/* Reaction & Comprehensive Social Sharing Bar */}
          <div className="mt-8 p-4 bg-[#f8f9ff] rounded-xl flex flex-wrap items-center justify-between gap-4 border border-[#bfc9c3]/40 no-print">
            {/* Left: Like Button */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-body text-[14px] font-medium cursor-pointer ${
                  liked ? 'bg-[#003527] text-white' : 'bg-white text-[#0b1c30] hover:bg-[#eff4ff] border border-[#bfc9c3]'
                }`}
              >
                <ThumbsUp className={`w-4 h-4 ${liked ? 'fill-white' : ''}`} />
                <span>{t('blog.helpful', 'Hữu ích')} ({likeCount})</span>
              </button>
            </div>

            {/* Right: Copy Link & Native / Social Share Buttons */}
            <div className="flex items-center flex-wrap gap-2">
              {/* Primary Copy Link Button */}
              <button
                onClick={() => handleCopyLink(false)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg font-body text-[13px] font-semibold transition-all cursor-pointer shadow-xs ${
                  copied
                    ? 'bg-[#15803d] text-white shadow-sm'
                    : 'bg-white text-[#003527] border border-[#bfc9c3] hover:bg-[#eff4ff]'
                }`}
                title={t('blog.copyLink', 'Sao chép liên kết')}
                aria-label="Copy link to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-white animate-in zoom-in duration-150" />
                    <span>{t('blog.linkCopied', 'Đã sao chép liên kết!')}</span>
                  </>
                ) : (
                  <>
                    <LinkIcon className="w-4 h-4 text-[#003527]" />
                    <span>{t('blog.copyLink', 'Sao chép liên kết')}</span>
                  </>
                )}
              </button>

              {/* Native / Social Share Button Container */}
              <div className="relative" ref={bottomShareMenuRef}>
                <button
                  onClick={() => handleNativeShare('bottom')}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#003527] hover:bg-[#044e3b] text-white rounded-lg font-body text-[13px] font-semibold transition-colors cursor-pointer shadow-sm"
                  title={t('blog.shareArticle', 'Chia sẻ bài viết')}
                  aria-label="Share article"
                  aria-haspopup="true"
                  aria-expanded={isBottomShareMenuOpen}
                >
                  <Share2 className="w-4 h-4" />
                  <span>{t('blog.shareArticle', 'Chia sẻ')}</span>
                </button>

                {/* Bottom Share Dropdown Menu (Pops up upwards) */}
                {isBottomShareMenuOpen && (
                  <div className="absolute right-0 bottom-full mb-2 w-64 bg-white rounded-xl shadow-2xl border border-[#bfc9c3]/70 py-2.5 z-30 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3.5 py-1.5 border-b border-[#bfc9c3]/30 mb-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#707974]">
                        {t('blog.shareVia', 'Chia sẻ bài viết qua')}
                      </span>
                    </div>

                    {/* Copy Link Option */}
                    <button
                      onClick={() => {
                        handleCopyLink(false);
                        setIsBottomShareMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[13px] font-body text-[#0b1c30] hover:bg-[#eff4ff] hover:text-[#003527] transition-colors cursor-pointer text-left"
                    >
                      <div className="w-7 h-7 rounded-lg bg-[#eff4ff] text-[#003527] flex items-center justify-center flex-shrink-0">
                        {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      </div>
                      <div>
                        <div className="font-semibold">{t('blog.copyLink', 'Sao chép liên kết')}</div>
                        <div className="text-[11px] text-[#707974]">URL trực tiếp tới bài viết</div>
                      </div>
                    </button>

                    {/* LinkedIn */}
                    <button
                      onClick={() => handleSocialShare('linkedin')}
                      className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[13px] font-body text-[#0b1c30] hover:bg-[#eff4ff] hover:text-[#003527] transition-colors cursor-pointer text-left"
                    >
                      <div className="w-7 h-7 rounded-lg bg-[#0077b5]/10 text-[#0077b5] flex items-center justify-center flex-shrink-0">
                        <Linkedin className="w-4 h-4" />
                      </div>
                      <span>LinkedIn</span>
                    </button>

                    {/* Facebook */}
                    <button
                      onClick={() => handleSocialShare('facebook')}
                      className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[13px] font-body text-[#0b1c30] hover:bg-[#eff4ff] hover:text-[#003527] transition-colors cursor-pointer text-left"
                    >
                      <div className="w-7 h-7 rounded-lg bg-[#1877f2]/10 text-[#1877f2] flex items-center justify-center flex-shrink-0">
                        <Globe className="w-4 h-4" />
                      </div>
                      <span>Facebook</span>
                    </button>

                    {/* Telegram */}
                    <button
                      onClick={() => handleSocialShare('telegram')}
                      className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[13px] font-body text-[#0b1c30] hover:bg-[#eff4ff] hover:text-[#003527] transition-colors cursor-pointer text-left"
                    >
                      <div className="w-7 h-7 rounded-lg bg-[#229ed9]/10 text-[#229ed9] flex items-center justify-center flex-shrink-0">
                        <Send className="w-4 h-4" />
                      </div>
                      <span>Telegram</span>
                    </button>

                    {/* Email */}
                    <button
                      onClick={() => handleSocialShare('mail')}
                      className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[13px] font-body text-[#0b1c30] hover:bg-[#eff4ff] hover:text-[#003527] transition-colors cursor-pointer text-left"
                    >
                      <div className="w-7 h-7 rounded-lg bg-[#003527]/10 text-[#003527] flex items-center justify-center flex-shrink-0">
                        <Mail className="w-4 h-4" />
                      </div>
                      <span>Email</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Quick Social Share Shortcuts */}
              <div className="hidden sm:flex items-center gap-1 border-l border-[#bfc9c3]/50 pl-2">
                <button
                  onClick={() => handleSocialShare('linkedin')}
                  className="p-2 rounded-lg bg-white border border-[#bfc9c3]/60 text-[#0077b5] hover:bg-[#0077b5]/10 transition-colors cursor-pointer"
                  title="Share on LinkedIn"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleSocialShare('facebook')}
                  className="p-2 rounded-lg bg-white border border-[#bfc9c3]/60 text-[#1877f2] hover:bg-[#1877f2]/10 transition-colors cursor-pointer"
                  title="Share on Facebook"
                  aria-label="Share on Facebook"
                >
                  <Globe className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleSocialShare('mail')}
                  className="p-2 rounded-lg bg-white border border-[#bfc9c3]/60 text-[#003527] hover:bg-[#eff4ff] transition-colors cursor-pointer"
                  title="Share via Email"
                  aria-label="Share via Email"
                >
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
