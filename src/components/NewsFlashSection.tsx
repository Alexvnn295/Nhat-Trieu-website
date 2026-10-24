import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  TrendingUp,
  RefreshCw,
  Search,
  ExternalLink,
  Sparkles,
  Zap,
  Globe,
  Clock,
  CheckCircle2,
  ChevronRight,
  Filter,
  Layers,
  ArrowUpRight,
  Bookmark,
  Share2,
  X,
  Radio,
  Building2,
  Cpu,
  LineChart,
  Volume2,
  VolumeX,
  Calendar,
  SlidersHorizontal,
  BookmarkCheck,
  Newspaper,
  Check,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { NewsFlashItem, NewsCategory, BlogPost } from '../types';
import {
  INITIAL_NEWS_FLASHES,
  LIVE_NEWS_ROTATION_POOL,
  TRUSTED_NEWS_SOURCES,
} from '../data/newsData';

interface NewsFlashSectionProps {
  onOpenArticle?: (post: BlogPost) => void;
}

export const NewsFlashSection: React.FC<NewsFlashSectionProps> = ({ onOpenArticle }) => {
  const { language, t } = useLanguage();
  const { showSuccess } = useToast();
  const isVi = language === 'vi';

  const [newsList, setNewsList] = useState<NewsFlashItem[]>(INITIAL_NEWS_FLASHES);
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory>('all');
  const [selectedSourceFilter, setSelectedSourceFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdatedTime, setLastUpdatedTime] = useState<string>('');
  const [activeTickerIndex, setActiveTickerIndex] = useState(0);
  const [selectedNewsDetail, setSelectedNewsDetail] = useState<NewsFlashItem | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('executive_saved_news');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize current dynamic date & time
  useEffect(() => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString(isVi ? 'vi-VN' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
    setLastUpdatedTime(isVi ? `Hôm nay, lúc ${timeStr}` : `Today, at ${timeStr}`);
  }, [isVi]);

  // Save bookmarks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('executive_saved_news', JSON.stringify(bookmarkedIds));
    } catch (e) {
      console.warn('Cannot persist bookmarks:', e);
    }
  }, [bookmarkedIds]);

  // Auto-rotate breaking news ticker every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTickerIndex((prev) => (prev + 1) % newsList.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [newsList.length]);

  // Toggle Bookmark
  const toggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setBookmarkedIds((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((item) => item !== id) : [...prev, id];
      showSuccess(
        exists
          ? isVi
            ? 'Đã xóa tin khỏi mục đánh dấu'
            : 'Removed from bookmarks'
          : isVi
          ? 'Đã lưu bản tin vào mục đánh dấu!'
          : 'Saved to bookmarks!'
      );
      return next;
    });
  };

  // Refresh handler: simulate live news pull from rotation pool
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      const availablePool = LIVE_NEWS_ROTATION_POOL.filter(
        (item) => !newsList.some((n) => n.id === item.id)
      );

      if (availablePool.length > 0) {
        const nextItem = availablePool[0];
        setNewsList((prev) => [nextItem, ...prev]);
        showSuccess(
          isVi
            ? 'Đã tải thêm bản tin kinh tế - công nghệ mới nhất!'
            : 'Fetched latest macroeconomic & tech updates!'
        );
      } else {
        showSuccess(
          isVi
            ? 'Bảng tin đã ở trạng thái cập nhật mới nhất hôm nay!'
            : 'News feed is fully up to date for today!'
        );
      }

      const now = new Date();
      const timeStr = now.toLocaleTimeString(isVi ? 'vi-VN' : 'en-US', {
        hour: '2-digit',
        minute: '2-digit',
      });
      setLastUpdatedTime(isVi ? `Hôm nay, lúc ${timeStr}` : `Today, at ${timeStr}`);
      setIsRefreshing(false);
    }, 650);
  };

  // Executive Audio Briefing Reader (Web Speech API)
  const handleToggleAudioBriefing = () => {
    if (!('speechSynthesis' in window)) {
      showSuccess(isVi ? 'Trình duyệt không hỗ trợ đọc âm thanh' : 'Speech synthesis not supported');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    // Prepare top 3 news briefing script
    const topItems = newsList.slice(0, 3);
    const briefingText = topItems
      .map((item, idx) => {
        const num = idx + 1;
        const tStr = isVi ? item.title.vi : item.title.en;
        const sStr = isVi ? item.summary.vi : item.summary.en;
        return `${isVi ? `Bản tin số ${num}` : `Headline ${num}`}: ${tStr}. ${sStr}`;
      })
      .join('. ');

    const intro = isVi
      ? `Sau đây là tóm tắt bản tin kinh tế, công nghệ và chiến lược cập nhật hôm nay. ${briefingText}. Kết thúc bản tin tóm tắt.`
      : `Here is today's executive macroeconomic and tech intelligence briefing. ${briefingText}. End of daily summary.`;

    const utterance = new SpeechSynthesisUtterance(intro);
    utterance.lang = isVi ? 'vi-VN' : 'en-US';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onend = () => {
      setIsPlayingAudio(false);
    };
    utterance.onerror = () => {
      setIsPlayingAudio(false);
    };

    speechRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsPlayingAudio(true);
    showSuccess(
      isVi
        ? 'Đang phát bản tin tóm tắt 60 giây cho lãnh đạo...'
        : 'Playing 60-second executive audio briefing...'
    );
  };

  // Copy share link
  const handleCopyShare = (item: NewsFlashItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const textToCopy = `📌 ${item.title[isVi ? 'vi' : 'en']}\n\n💡 ${item.summary[isVi ? 'vi' : 'en']}\n\n📰 Nguồn: ${item.sourceName} (${item.sourceUrl})\n🔗 Chia sẻ từ: Cao Nguyễn Nhật Triều Executive Briefing`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(item.id);
    showSuccess(isVi ? 'Đã sao chép nội dung tin vắn vào clipboard!' : 'Copied news brief to clipboard!');
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Filter logic
  const filteredNews = useMemo(() => {
    return newsList.filter((item) => {
      // Bookmark filter
      if (showBookmarksOnly && !bookmarkedIds.includes(item.id)) {
        return false;
      }

      // Category filter
      const matchCategory =
        selectedCategory === 'all' ? true : item.category === selectedCategory;

      // Source filter
      const matchSource =
        selectedSourceFilter === 'all'
          ? true
          : item.sourceName.toLowerCase().includes(selectedSourceFilter.toLowerCase()) ||
            item.sourceDomain.toLowerCase().includes(selectedSourceFilter.toLowerCase());

      // Search Query filter
      const titleVi = item.title.vi.toLowerCase();
      const titleEn = item.title.en.toLowerCase();
      const summaryVi = item.summary.vi.toLowerCase();
      const summaryEn = item.summary.en.toLowerCase();
      const query = searchQuery.toLowerCase().trim();

      const matchSearch =
        !query ||
        titleVi.includes(query) ||
        titleEn.includes(query) ||
        summaryVi.includes(query) ||
        summaryEn.includes(query) ||
        item.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        item.sourceName.toLowerCase().includes(query);

      return matchCategory && matchSource && matchSearch;
    });
  }, [newsList, selectedCategory, selectedSourceFilter, searchQuery, showBookmarksOnly, bookmarkedIds]);

  const categories: { id: NewsCategory; labelVi: string; labelEn: string; icon: React.ReactNode }[] = [
    {
      id: 'all',
      labelVi: 'Tất cả tin vắn',
      labelEn: 'All Updates',
      icon: <Layers className="w-3.5 h-3.5" />,
    },
    {
      id: 'vietnam',
      labelVi: 'Việt Nam & Chính sách',
      labelEn: 'Vietnam & Policy',
      icon: <Globe className="w-3.5 h-3.5 text-red-600" />,
    },
    {
      id: 'tech',
      labelVi: 'Công nghệ & AI',
      labelEn: 'Tech & AI Frontier',
      icon: <Cpu className="w-3.5 h-3.5 text-emerald-600" />,
    },
    {
      id: 'economy',
      labelVi: 'Kinh tế & Tài chính',
      labelEn: 'Macro & Finance',
      icon: <LineChart className="w-3.5 h-3.5 text-blue-600" />,
    },
    {
      id: 'enterprise',
      labelVi: 'Doanh nghiệp & Vận hành',
      labelEn: 'Enterprise & M&A',
      icon: <Building2 className="w-3.5 h-3.5 text-amber-600" />,
    },
  ];

  const currentTickerItem = newsList[activeTickerIndex] || newsList[0];

  // Format today date in readable form
  const formattedToday = useMemo(() => {
    const today = new Date();
    return today.toLocaleDateString(isVi ? 'vi-VN' : 'en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }, [isVi]);

  return (
    <section
      id="news-pulse-section"
      className="py-16 px-4 md:px-6 bg-[#f8f9ff] border-b border-[#bfc9c3]/35 relative overflow-hidden"
    >
      {/* Background Accent Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#003527]/5 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-[1280px] mx-auto relative z-10">
        {/* Top Section Header with Live Status & Date */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-8 gap-5 pb-6 border-b border-[#bfc9c3]/40">
          <div>
            {/* Header Badge */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#003527] text-white w-fit shadow-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                </span>
                <span className="font-body text-[11px] font-bold tracking-wider uppercase">
                  {isVi ? 'NGUỒN TIN MỚI NHẤT • CẬP NHẬT HÀNG NGÀY' : 'LIVE DAILY UPDATED INTELLIGENCE'}
                </span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#bfc9c3]/60 text-[12px] font-body text-[#404944] shadow-2xs">
                <Calendar className="w-3.5 h-3.5 text-[#003527]" />
                <span className="capitalize">{formattedToday}</span>
              </div>
            </div>

            <h2 className="font-display text-[26px] sm:text-[32px] md:text-[36px] font-bold text-[#0b1c30] tracking-tight leading-tight">
              {isVi ? 'Tin vắn Kinh tế, Công nghệ & Chiến lược' : 'Macroeconomics, Frontier Tech & Strategy Pulse'}
            </h2>
            <p className="font-body text-[14.5px] md:text-[15.5px] text-[#404944] mt-1.5 max-w-2xl leading-relaxed">
              {isVi
                ? 'Tổng hợp và phân tích các tín hiệu vĩ mô trọng yếu từ Bloomberg, Reuters, MIT Tech Review, Báo Chính Phủ, CafeF và các hãng thông tấn uy tín toàn cầu phục vụ hoạch định chiến lược cho lãnh đạo.'
                : 'Curated strategic signals from Bloomberg, Reuters, MIT Tech Review, Government Portals, CafeF, and premier global intelligence wires.'}
            </p>
          </div>

          {/* Action Tools: Audio Briefing, Refresh & Bookmarks */}
          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto justify-between lg:justify-end">
            {/* Audio 60s Briefing Button */}
            <button
              onClick={handleToggleAudioBriefing}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[13px] font-body font-bold transition-all shadow-xs cursor-pointer ${
                isPlayingAudio
                  ? 'bg-rose-600 text-white animate-pulse'
                  : 'bg-white hover:bg-[#eff4ff] text-[#003527] border border-[#003527]/30'
              }`}
              title={isVi ? 'Nghe bản tin tóm tắt 60 giây cho lãnh đạo' : 'Listen to 60-second audio summary'}
            >
              {isPlayingAudio ? (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span>{isVi ? 'Dừng đọc tin' : 'Stop Briefing'}</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-[#003527]" />
                  <span>{isVi ? 'Nghe bản tin nhanh' : 'Audio Briefing'}</span>
                </>
              )}
            </button>

            {/* Bookmarks Toggle */}
            <button
              onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[13px] font-body font-medium transition-all shadow-xs cursor-pointer ${
                showBookmarksOnly
                  ? 'bg-[#003527] text-white font-bold'
                  : 'bg-white hover:bg-[#eff4ff] text-[#404944] border border-[#bfc9c3]/60'
              }`}
              title={isVi ? 'Xem tin đã lưu đánh dấu' : 'View bookmarked updates'}
            >
              <Bookmark className={`w-3.5 h-3.5 ${showBookmarksOnly ? 'fill-current' : ''}`} />
              <span>
                {isVi ? 'Đã lưu' : 'Saved'} ({bookmarkedIds.length})
              </span>
            </button>

            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#003527] hover:bg-[#064e3b] text-white rounded-xl text-[13px] font-body font-bold transition-all shadow-xs active:scale-95 cursor-pointer disabled:opacity-60"
              title={isVi ? 'Làm mới nguồn tin mới nhất' : 'Refresh News Stream'}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isVi ? 'Cập nhật tin mới' : 'Refresh'}</span>
            </button>
          </div>
        </div>

        {/* Live Breaking Ticker Bar */}
        {currentTickerItem && (
          <div className="mb-6 p-3 sm:p-3.5 bg-white rounded-xl border border-[#bfc9c3]/60 shadow-xs flex items-center justify-between gap-3 overflow-hidden">
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-rose-50 border border-rose-200 text-rose-700 text-[11px] font-bold tracking-wide uppercase flex-shrink-0">
                <Zap className="w-3.5 h-3.5 text-rose-600 animate-bounce" />
                <span>{isVi ? 'Tin nổi bật hôm nay' : 'Breaking Flash'}</span>
              </span>

              <div
                onClick={() => setSelectedNewsDetail(currentTickerItem)}
                className="font-body text-[13px] sm:text-[14px] font-semibold text-[#0b1c30] truncate hover:text-[#003527] cursor-pointer transition-colors"
              >
                {currentTickerItem.title[isVi ? 'vi' : 'en']}
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="hidden sm:inline-block text-[11.5px] font-mono text-[#707974] px-2 py-0.5 bg-[#eff4ff] rounded border border-[#bfc9c3]/30">
                {currentTickerItem.sourceName}
              </span>
              <button
                type="button"
                onClick={() => setSelectedNewsDetail(currentTickerItem)}
                className="text-[12px] font-bold text-[#003527] hover:underline flex items-center gap-0.5 cursor-pointer"
              >
                <span>{isVi ? 'Xem nhanh' : 'View'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Sources Carousel / Quick Filter Bar */}
        <div className="mb-6 bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-[#bfc9c3]/50 shadow-xs">
          <div className="flex items-center justify-between gap-2 mb-2 px-1">
            <div className="flex items-center gap-2 text-[12px] font-body font-bold text-[#003527] uppercase tracking-wider">
              <Newspaper className="w-3.5 h-3.5 text-[#003527]" />
              <span>{isVi ? 'Lọc nhanh theo Nguồn tin uy tín' : 'Filter by Trusted Sources'}</span>
            </div>
            {selectedSourceFilter !== 'all' && (
              <button
                onClick={() => setSelectedSourceFilter('all')}
                className="text-[11.5px] text-[#003527] font-bold hover:underline cursor-pointer"
              >
                {isVi ? 'Xem tất cả nguồn' : 'Reset sources'}
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedSourceFilter('all')}
              className={`px-3 py-1 rounded-lg text-[12px] font-body whitespace-nowrap transition-all cursor-pointer ${
                selectedSourceFilter === 'all'
                  ? 'bg-[#003527] text-white font-bold shadow-2xs'
                  : 'bg-[#eff4ff] text-[#404944] hover:bg-[#dce9ff] hover:text-[#003527]'
              }`}
            >
              {isVi ? 'Tất cả nguồn' : 'All Sources'}
            </button>
            {TRUSTED_NEWS_SOURCES.map((source) => {
              const isSelected = selectedSourceFilter === source.name;
              return (
                <button
                  key={source.id}
                  onClick={() => setSelectedSourceFilter(isSelected ? 'all' : source.name)}
                  className={`px-3 py-1 rounded-lg text-[12px] font-body whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#003527] text-white font-bold shadow-2xs'
                      : 'bg-white text-[#404944] border border-[#bfc9c3]/40 hover:bg-[#eff4ff] hover:text-[#003527]'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>{source.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-6">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full scrollbar-none">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[13px] font-body transition-all whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-[#003527] text-white font-bold shadow-xs'
                      : 'bg-white text-[#404944] border border-[#bfc9c3]/50 hover:bg-[#eff4ff] hover:text-[#003527]'
                  }`}
                >
                  {cat.icon}
                  <span>{isVi ? cat.labelVi : cat.labelEn}</span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-80">
            <Search className="w-4 h-4 text-[#707974] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isVi ? 'Tìm tin tức, chủ đề, từ khóa...' : 'Search news, tags, topics...'
              }
              className="w-full pl-9 pr-8 py-2.5 bg-white border border-[#bfc9c3]/60 rounded-xl text-[13px] font-body text-[#0b1c30] placeholder-[#707974] focus:outline-none focus:border-[#003527] focus:ring-1 focus:ring-[#003527] transition-all shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#707974] hover:text-[#0b1c30] p-0.5 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* News Flash Grid */}
        {filteredNews.length === 0 ? (
          <div className="py-14 px-4 text-center bg-white rounded-2xl border border-[#bfc9c3]/40">
            <div className="w-12 h-12 rounded-full bg-[#eff4ff] text-[#003527] flex items-center justify-center mx-auto mb-3">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="font-display text-[17px] font-bold text-[#0b1c30]">
              {isVi ? 'Không tìm thấy bản tin phù hợp' : 'No news found matching your criteria'}
            </h3>
            <p className="text-[13.5px] text-[#707974] mt-1.5 max-w-sm mx-auto font-body">
              {isVi
                ? 'Hãy thử tìm kiếm với từ khóa khác, bỏ lọc nguồn tin hoặc chọn lại mục Tất cả tin tức.'
                : 'Try searching with different keywords, reset source filters, or view all categories.'}
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedSourceFilter('all');
                setShowBookmarksOnly(false);
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-[#003527] text-white font-body text-[13px] font-bold rounded-xl hover:bg-[#064e3b] transition-colors cursor-pointer shadow-xs"
            >
              {isVi ? 'Xóa toàn bộ bộ lọc' : 'Clear all filters'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredNews.map((item) => {
              const title = item.title[isVi ? 'vi' : 'en'];
              const summary = item.summary[isVi ? 'vi' : 'en'];
              const isBookmarked = bookmarkedIds.includes(item.id);

              return (
                <article
                  key={item.id}
                  className="bg-white rounded-2xl border border-[#bfc9c3]/50 p-5 shadow-[0px_2px_12px_rgba(15,23,42,0.03)] hover:shadow-[0px_8px_25px_rgba(15,23,42,0.08)] hover:border-[#003527]/40 transition-all duration-200 flex flex-col justify-between group"
                >
                  <div>
                    {/* Source & Metadata Bar */}
                    <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-[#bfc9c3]/25">
                      <div className="flex items-center gap-2 min-w-0">
                        {/* Source Tag */}
                        <div className="flex items-center gap-1 text-[11px] font-bold text-[#003527] font-body bg-[#eff4ff] px-2 py-0.5 rounded-md border border-[#bfc9c3]/30 truncate">
                          <Globe className="w-3 h-3 text-[#003527] flex-shrink-0" />
                          <span className="truncate max-w-[130px]">{item.sourceName}</span>
                        </div>

                        {/* Impact Tag */}
                        {item.impact === 'positive' && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 flex-shrink-0">
                            {isVi ? 'Tích cực' : 'Positive'}
                          </span>
                        )}
                        {item.impact === 'strategic' && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 flex-shrink-0">
                            {isVi ? 'Chiến lược' : 'Strategic'}
                          </span>
                        )}
                        {item.impact === 'warning' && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 flex-shrink-0">
                            {isVi ? 'Cảnh báo' : 'Warning'}
                          </span>
                        )}
                      </div>

                      {/* Right Action Icons: Bookmark & Share */}
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button
                          type="button"
                          onClick={(e) => toggleBookmark(item.id, e)}
                          className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                            isBookmarked
                              ? 'text-amber-500 bg-amber-50 hover:bg-amber-100'
                              : 'text-[#707974] hover:text-[#003527] hover:bg-[#eff4ff]'
                          }`}
                          title={isBookmarked ? (isVi ? 'Bỏ lưu tin' : 'Unsave') : (isVi ? 'Lưu tin' : 'Save')}
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
                        </button>

                        <button
                          type="button"
                          onClick={(e) => handleCopyShare(item, e)}
                          className="p-1.5 rounded-md text-[#707974] hover:text-[#003527] hover:bg-[#eff4ff] transition-colors cursor-pointer"
                          title={isVi ? 'Sao chép chia sẻ tin' : 'Share brief'}
                        >
                          {copiedId === item.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Share2 className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Headline */}
                    <h3
                      onClick={() => setSelectedNewsDetail(item)}
                      className="font-display text-[16px] sm:text-[17px] font-bold text-[#0b1c30] leading-[1.38] group-hover:text-[#003527] transition-colors cursor-pointer mb-2.5"
                    >
                      {title}
                    </h3>

                    {/* Summary */}
                    <p className="font-body text-[13.5px] text-[#404944] leading-relaxed line-clamp-3 mb-4">
                      {summary}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {item.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-body px-2 py-0.5 bg-[#f8f9ff] text-[#55625d] rounded-md border border-[#bfc9c3]/30"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="pt-3 border-t border-[#bfc9c3]/30 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setSelectedNewsDetail(item)}
                      className="text-[12.5px] font-bold text-[#003527] hover:text-[#064e3b] flex items-center gap-1 group/btn cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#003527]" />
                      <span>{isVi ? 'Tóm tắt & Luận điểm' : 'Key Insights'}</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-[#707974] font-body">
                        {item.publishedAt}
                      </span>
                      <a
                        href={item.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[12px] font-body text-[#707974] hover:text-[#003527] flex items-center gap-0.5 cursor-pointer"
                        title={isVi ? 'Mở bài gốc tại nguồn báo' : 'Read original source'}
                      >
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Detailed News Modal / Drawer */}
      {selectedNewsDetail && (
        <div
          className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setSelectedNewsDetail(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-7 shadow-2xl relative border border-[#bfc9c3]/50 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedNewsDetail(null)}
              className="absolute right-5 top-5 p-2 rounded-full bg-[#f8f9ff] hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-1 rounded-md bg-[#eff4ff] text-[#003527] text-[11px] font-bold font-body border border-[#bfc9c3]/40 flex items-center gap-1">
                <Globe className="w-3.5 h-3.5" />
                {selectedNewsDetail.sourceName}
              </span>
              <span className="text-[12px] text-[#707974] font-body">
                • {selectedNewsDetail.publishedAt}
              </span>
              <span className="text-[12px] text-[#707974] font-body">
                • {selectedNewsDetail.readTime}
              </span>
            </div>

            <h3 className="font-display text-[20px] md:text-[23px] font-bold text-[#0b1c30] leading-snug mb-3.5">
              {selectedNewsDetail.title[isVi ? 'vi' : 'en']}
            </h3>

            <p className="font-body text-[15px] text-[#404944] leading-relaxed mb-5 bg-[#f8f9ff] p-4 rounded-xl border border-[#bfc9c3]/30">
              {selectedNewsDetail.summary[isVi ? 'vi' : 'en']}
            </p>

            {/* Key Strategic Takeaways Box */}
            <div className="bg-[#eff4ff]/80 rounded-xl p-4 md:p-5 border border-[#003527]/20 mb-5">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-[#003527]" />
                <h4 className="font-display text-[15px] font-bold text-[#003527]">
                  {isVi
                    ? 'Góc nhìn & Luận điểm chiến lược cho lãnh đạo'
                    : 'Executive Takeaways & Strategic Implications'}
                </h4>
              </div>

              <ul className="space-y-2.5">
                {selectedNewsDetail.keyTakeaways[isVi ? 'vi' : 'en'].map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-[13.5px] font-body text-[#0b1c30]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {selectedNewsDetail.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[11px] font-body px-2.5 py-1 bg-[#f8f9ff] text-[#404944] rounded-lg border border-[#bfc9c3]/40"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Modal Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#bfc9c3]/40">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => toggleBookmark(selectedNewsDetail.id)}
                  className={`px-3.5 py-2 rounded-xl border text-[13px] font-body font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                    bookmarkedIds.includes(selectedNewsDetail.id)
                      ? 'bg-amber-50 border-amber-300 text-amber-800'
                      : 'border-[#bfc9c3] hover:bg-[#f8f9ff] text-[#0b1c30]'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${bookmarkedIds.includes(selectedNewsDetail.id) ? 'fill-current' : ''}`} />
                  <span>
                    {bookmarkedIds.includes(selectedNewsDetail.id)
                      ? isVi
                        ? 'Đã lưu'
                        : 'Saved'
                      : isVi
                      ? 'Lưu tin'
                      : 'Save'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleCopyShare(selectedNewsDetail)}
                  className="px-3.5 py-2 rounded-xl border border-[#bfc9c3] hover:bg-[#f8f9ff] text-[#0b1c30] text-[13px] font-body font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Share2 className="w-4 h-4 text-[#003527]" />
                  <span>{copiedId === selectedNewsDetail.id ? (isVi ? 'Đã sao chép!' : 'Copied!') : (isVi ? 'Chia sẻ tin' : 'Share')}</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedNewsDetail(null)}
                  className="px-4 py-2 text-[13px] font-body font-medium text-[#404944] hover:bg-[#f8f9ff] rounded-xl cursor-pointer"
                >
                  {isVi ? 'Đóng' : 'Close'}
                </button>

                <a
                  href={selectedNewsDetail.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#003527] hover:bg-[#064e3b] text-white text-[13px] font-body font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-transform active:scale-95 cursor-pointer"
                >
                  <span>
                    {isVi ? 'Đọc bài gốc tại' : 'Read at'} {selectedNewsDetail.sourceName}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
