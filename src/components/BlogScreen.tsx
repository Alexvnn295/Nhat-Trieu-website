import React, { useState, useMemo } from 'react';
import { BlogPost } from '../types';
import {
  Search,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Filter,
  Headphones,
  Sparkles,
  Newspaper,
  BookOpen,
  X,
  RotateCcw,
  Tag,
  ArrowUpDown,
  SlidersHorizontal,
  Layers,
  Calendar,
  Clock,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { NewsFlashSection } from './NewsFlashSection';

interface BlogScreenProps {
  posts: BlogPost[];
  onOpenArticle: (post: BlogPost) => void;
}

type BlogViewMode = 'all' | 'news' | 'articles';
type SortOption = 'newest' | 'oldest' | 'readTimeAsc' | 'readTimeDesc' | 'title';

export const BlogScreen: React.FC<BlogScreenProps> = ({ posts, onOpenArticle }) => {
  const [viewMode, setViewMode] = useState<BlogViewMode>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryKey, setSelectedCategoryKey] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(6);
  const { t, language } = useLanguage();
  const isVi = language === 'vi';

  // Dynamic category definitions with icons
  const categories = useMemo(() => [
    { key: 'all', label: t('blog.cat.all', 'Tất cả'), icon: Layers },
    { key: 'leadership', label: isVi ? 'Lãnh đạo' : 'Leadership', icon: Sparkles },
    { key: 'operations', label: isVi ? 'Vận hành' : 'Operations', icon: SlidersHorizontal },
    { key: 'economics', label: isVi ? 'Kinh tế' : 'Economics', icon: Filter },
    { key: 'tech', label: isVi ? 'Công nghệ' : 'Technology', icon: BookOpen },
    { key: 'education', label: isVi ? 'Giáo dục' : 'Education', icon: Newspaper },
  ], [isVi, t]);

  // Compute live count for each category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: posts.length,
      leadership: 0,
      operations: 0,
      economics: 0,
      tech: 0,
      education: 0,
    };

    posts.forEach((p) => {
      const cat = p.category.toLowerCase();
      const tagsList = (p.tags || []).map((t) => t.toLowerCase());

      if (
        cat.includes('lãnh đạo') ||
        cat.includes('leadership') ||
        tagsList.includes('leadership') ||
        tagsList.includes('management')
      ) {
        counts.leadership++;
      }
      if (
        cat.includes('vận hành') ||
        cat.includes('operations') ||
        cat.includes('kinh doanh') ||
        tagsList.includes('operations') ||
        tagsList.includes('business')
      ) {
        counts.operations++;
      }
      if (
        cat.includes('kinh tế') ||
        cat.includes('eco') ||
        cat.includes('tài chính') ||
        cat.includes('finance') ||
        tagsList.includes('finance')
      ) {
        counts.economics++;
      }
      if (
        cat.includes('công nghệ') ||
        cat.includes('tech') ||
        tagsList.includes('ai')
      ) {
        counts.tech++;
      }
      if (
        cat.includes('giáo dục') ||
        cat.includes('edu') ||
        tagsList.includes('edtech')
      ) {
        counts.education++;
      }
    });

    return counts;
  }, [posts]);

  // Compute all distinct tags and their live counts
  const tagStats = useMemo(() => {
    const counts: Record<string, number> = {};
    posts.forEach((p) => {
      (p.tags || []).forEach((tag) => {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    });
    // Sort tags by frequency
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [posts]);

  // Popular keyword suggestion chips
  const popularKeywords = useMemo(() => {
    return isVi
      ? ['80/20', 'Vận hành', 'Tài sản ròng', 'Leadership', 'Cổ chai', 'AI', 'Startup', 'Doanh nghiệp']
      : ['80/20', 'Operations', 'Net Worth', 'Leadership', 'Bottleneck', 'AI', 'Startup', 'Enterprise'];
  }, [isVi]);

  // Filtering & Sorting pipeline
  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const matches = posts.filter((post) => {
      // 1. Keyword search across multiple fields
      let matchSearch = true;
      if (q) {
        const titleMatch = post.title.toLowerCase().includes(q);
        const excerptMatch = post.excerpt.toLowerCase().includes(q);
        const contentMatch = post.content.toLowerCase().includes(q);
        const categoryMatch = post.category.toLowerCase().includes(q);
        const authorMatch = post.author.toLowerCase().includes(q);
        const tagMatch = (post.tags || []).some((t) => t.toLowerCase().includes(q));

        matchSearch = titleMatch || excerptMatch || contentMatch || categoryMatch || authorMatch || tagMatch;
      }

      // 2. Category match
      let matchCategory = true;
      const cat = post.category.toLowerCase();
      const tagsList = (post.tags || []).map((t) => t.toLowerCase());

      if (selectedCategoryKey === 'leadership') {
        matchCategory =
          cat.includes('lãnh đạo') ||
          cat.includes('leadership') ||
          tagsList.includes('leadership') ||
          tagsList.includes('management');
      } else if (selectedCategoryKey === 'operations') {
        matchCategory =
          cat.includes('vận hành') ||
          cat.includes('operations') ||
          cat.includes('kinh doanh') ||
          tagsList.includes('operations') ||
          tagsList.includes('business');
      } else if (selectedCategoryKey === 'economics') {
        matchCategory =
          cat.includes('kinh tế') ||
          cat.includes('eco') ||
          cat.includes('tài chính') ||
          cat.includes('finance') ||
          tagsList.includes('finance');
      } else if (selectedCategoryKey === 'education') {
        matchCategory =
          cat.includes('giáo dục') ||
          cat.includes('edu') ||
          tagsList.includes('edtech');
      } else if (selectedCategoryKey === 'tech') {
        matchCategory =
          cat.includes('công nghệ') ||
          cat.includes('tech') ||
          tagsList.includes('ai');
      }

      // 3. Tag match
      const matchTag =
        !selectedTag ||
        (post.tags || []).some((t) => t.toLowerCase() === selectedTag.toLowerCase());

      return matchSearch && matchCategory && matchTag;
    });

    // 4. Sort results
    return [...matches].sort((a, b) => {
      if (sortBy === 'newest') return 0; // Natural newest-first order in database
      if (sortBy === 'oldest') return 1; // Reverse order

      if (sortBy === 'readTimeAsc') {
        const timeA = parseInt(a.readTime, 10) || 5;
        const timeB = parseInt(b.readTime, 10) || 5;
        return timeA - timeB;
      }

      if (sortBy === 'readTimeDesc') {
        const timeA = parseInt(a.readTime, 10) || 5;
        const timeB = parseInt(b.readTime, 10) || 5;
        return timeB - timeA;
      }

      if (sortBy === 'title') {
        return a.title.localeCompare(b.title, isVi ? 'vi' : 'en');
      }

      return 0;
    });
  }, [posts, searchQuery, selectedCategoryKey, selectedTag, sortBy, isVi]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / itemsPerPage));
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCategoryChange = (key: string) => {
    setSelectedCategoryKey(key);
    setCurrentPage(1);
  };

  const handleTagClick = (tag: string) => {
    if (selectedTag?.toLowerCase() === tag.toLowerCase()) {
      setSelectedTag(null);
    } else {
      setSelectedTag(tag);
    }
    setCurrentPage(1);
  };

  const handleApplyKeyword = (kw: string) => {
    setSearchQuery(kw);
    setCurrentPage(1);
  };

  const handleResetAllFilters = () => {
    setSearchQuery('');
    setSelectedCategoryKey('all');
    setSelectedTag(null);
    setSortBy('newest');
    setCurrentPage(1);
  };

  const hasActiveFilters =
    searchQuery.trim() !== '' || selectedCategoryKey !== 'all' || selectedTag !== null;

  return (
    <div className="w-full">
      {/* Blog Hub Sub-navigation & Header */}
      <div className="bg-white border-b border-[#bfc9c3]/50 py-10 px-4 md:px-6">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#eff4ff] text-[#003527] rounded-full text-[12px] font-body font-bold border border-[#003527]/15 mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-[#003527]" />
              <span>{isVi ? 'TRUNG TÂM TRI THỨC & THÔNG TIN CHIẾN LƯỢC' : 'EXECUTIVE KNOWLEDGE & INTELLIGENCE HUB'}</span>
            </div>
            <h1 className="font-display text-[32px] sm:text-[40px] md:text-[44px] font-bold text-[#003527] leading-tight">
              {isVi ? 'Góc nhìn & Bản tin Tri thức' : 'Insights & Intelligence Hub'}
            </h1>
            <p className="font-body text-[16px] md:text-[17px] text-[#404944] max-w-2xl mt-1.5 leading-relaxed">
              {isVi
                ? 'Tổng hợp bài viết chiến lược, quản trị vận hành, tư duy lãnh đạo, tài chính cá nhân và kiến trúc công nghệ của Cao Nguyễn Nhật Triều.'
                : 'Curated strategic essays, operational frameworks, leadership mental models, personal finance, and enterprise technology by Cao Nguyen Nhat Trieu.'}
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center p-1.5 bg-[#f8f9ff] rounded-2xl border border-[#bfc9c3]/60 shadow-xs w-full md:w-auto overflow-x-auto">
            <button
              onClick={() => setViewMode('all')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-body transition-all whitespace-nowrap cursor-pointer ${
                viewMode === 'all'
                  ? 'bg-[#003527] text-white font-bold shadow-xs'
                  : 'text-[#404944] hover:text-[#003527] hover:bg-white'
              }`}
            >
              <span>{isVi ? 'Tất cả' : 'All Content'}</span>
            </button>
            <button
              onClick={() => setViewMode('news')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-body transition-all whitespace-nowrap cursor-pointer ${
                viewMode === 'news'
                  ? 'bg-[#003527] text-white font-bold shadow-xs'
                  : 'text-[#404944] hover:text-[#003527] hover:bg-white'
              }`}
            >
              <Newspaper className="w-3.5 h-3.5" />
              <span>{isVi ? 'Tin vắn Hàng ngày' : 'Daily News Flash'}</span>
            </button>
            <button
              onClick={() => setViewMode('articles')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-body transition-all whitespace-nowrap cursor-pointer ${
                viewMode === 'articles'
                  ? 'bg-[#003527] text-white font-bold shadow-xs'
                  : 'text-[#404944] hover:text-[#003527] hover:bg-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{isVi ? 'Bài viết Chuyên sâu' : 'In-depth Articles'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Render News Flash Section when in 'all' or 'news' mode */}
      {(viewMode === 'all' || viewMode === 'news') && (
        <NewsFlashSection onOpenArticle={onOpenArticle} />
      )}

      {/* Render In-Depth Articles Section when in 'all' or 'articles' mode */}
      {(viewMode === 'all' || viewMode === 'articles') && (
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-10 md:py-14">
          {/* Section Header */}
          <div className="mb-8 pb-4 border-b border-[#bfc9c3]/50 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#eff4ff] text-[#003527] text-[11.5px] font-body font-bold mb-2 uppercase tracking-wide">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{isVi ? 'GÓC NHÌN & PHÂN TÍCH CHUYÊN ĐỀ' : 'FEATURED ESSAYS & DEEP-DIVES'}</span>
              </div>
              <h2 className="font-display text-[26px] sm:text-[32px] font-bold text-[#0b1c30]">
                {isVi ? 'Bài viết & Luận điểm Chiến lược' : 'In-depth Articles & Case Studies'}
              </h2>
            </div>

            {/* Quick stats counter */}
            <div className="text-[13px] font-body text-[#707974]">
              {isVi ? (
                <span>
                  Hiển thị <strong className="text-[#003527] font-semibold">{filteredPosts.length}</strong> / {posts.length} bài viết
                </span>
              ) : (
                <span>
                  Showing <strong className="text-[#003527] font-semibold">{filteredPosts.length}</strong> of {posts.length} articles
                </span>
              )}
            </div>
          </div>

          {/* Top Interactive Category Tabs Bar */}
          <div className="mb-6 overflow-x-auto pb-2 scrollbar-none">
            <div className="flex items-center gap-2 min-w-max">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isSelected = selectedCategoryKey === cat.key;
                const count = categoryCounts[cat.key] || 0;

                return (
                  <button
                    key={cat.key}
                    onClick={() => handleCategoryChange(cat.key)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-body text-[14px] transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-[#003527] text-white border-[#003527] font-bold shadow-sm'
                        : 'bg-white text-[#404944] border-[#bfc9c3]/70 hover:border-[#003527] hover:text-[#003527]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{cat.label}</span>
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-[#eff4ff] text-[#003527]'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search Bar & Keyword Suggestions */}
          <div className="mb-6 p-4 sm:p-5 bg-white border border-[#bfc9c3]/60 rounded-2xl shadow-xs space-y-3.5">
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search input with live clear button */}
              <div className="relative flex-grow">
                <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#707974]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder={
                    isVi
                      ? 'Tìm kiếm theo từ khóa (vd: 80/20, vận hành, tài sản ròng, leadership...)'
                      : 'Search by keyword (e.g. 80/20, operations, net worth, leadership...)'
                  }
                  className="w-full pl-11 pr-10 py-3 rounded-xl border border-[#bfc9c3] bg-[#f8f9ff]/60 focus:bg-white focus:border-[#003527] focus:ring-1 focus:ring-[#003527] outline-none transition-all font-body text-[15px] text-[#0b1c30] placeholder:text-[#707974]"
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setCurrentPage(1);
                    }}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full hover:bg-black/10 flex items-center justify-center text-[#707974] hover:text-[#0b1c30] transition-colors cursor-pointer"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Sort Order Selector */}
              <div className="flex items-center gap-2 self-end sm:self-auto flex-shrink-0">
                <ArrowUpDown className="w-4 h-4 text-[#707974] hidden sm:inline" />
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value as SortOption);
                    setCurrentPage(1);
                  }}
                  className="px-3.5 py-3 rounded-xl border border-[#bfc9c3] bg-white font-body text-[14px] text-[#0b1c30] focus:border-[#003527] outline-none cursor-pointer"
                >
                  <option value="newest">{isVi ? 'Mới nhất' : 'Newest First'}</option>
                  <option value="oldest">{isVi ? 'Cũ nhất' : 'Oldest First'}</option>
                  <option value="readTimeAsc">{isVi ? 'Đọc nhanh nhất' : 'Shortest Read'}</option>
                  <option value="readTimeDesc">{isVi ? 'Đọc chuyên sâu' : 'Longest Read'}</option>
                  <option value="title">{isVi ? 'Tiêu đề (A - Z)' : 'Title (A - Z)'}</option>
                </select>
              </div>
            </div>

            {/* Popular Keyword Suggestions */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[12.5px] font-body font-semibold text-[#707974] flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-[#003527]" />
                {isVi ? 'Gợi ý từ khóa:' : 'Popular keywords:'}
              </span>
              {popularKeywords.map((kw) => {
                const isActive = searchQuery.toLowerCase() === kw.toLowerCase();
                return (
                  <button
                    key={kw}
                    onClick={() => handleApplyKeyword(isActive ? '' : kw)}
                    className={`px-2.5 py-1 rounded-lg text-[12px] font-body font-medium transition-colors cursor-pointer border ${
                      isActive
                        ? 'bg-[#003527] text-white border-[#003527]'
                        : 'bg-[#eff4ff] text-[#003527] border-transparent hover:bg-[#dce9ff]'
                    }`}
                  >
                    {kw}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Filter Chips Bar (Shown when any filter is active) */}
          {hasActiveFilters && (
            <div className="mb-6 p-3.5 bg-[#eff4ff]/70 border border-[#003527]/15 rounded-xl flex flex-wrap items-center justify-between gap-3 animate-in fade-in duration-200">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[12.5px] font-body font-bold text-[#003527] uppercase tracking-wide mr-1">
                  {isVi ? 'Đang lọc theo:' : 'Active filters:'}
                </span>

                {/* Category chip */}
                {selectedCategoryKey !== 'all' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#003527]/30 text-[#003527] rounded-full text-[12.5px] font-body font-semibold shadow-2xs">
                    <span>
                      {isVi ? 'Danh mục:' : 'Category:'}{' '}
                      {categories.find((c) => c.key === selectedCategoryKey)?.label}
                    </span>
                    <button
                      onClick={() => setSelectedCategoryKey('all')}
                      className="hover:text-red-600 transition-colors cursor-pointer"
                      aria-label="Remove category filter"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}

                {/* Tag chip */}
                {selectedTag && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#003527]/30 text-[#003527] rounded-full text-[12.5px] font-body font-semibold shadow-2xs">
                    <span>#{selectedTag}</span>
                    <button
                      onClick={() => setSelectedTag(null)}
                      className="hover:text-red-600 transition-colors cursor-pointer"
                      aria-label="Remove tag filter"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}

                {/* Search keyword chip */}
                {searchQuery.trim() !== '' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#003527]/30 text-[#003527] rounded-full text-[12.5px] font-body font-semibold shadow-2xs">
                    <span>
                      {isVi ? 'Từ khóa:' : 'Keyword:'} &ldquo;{searchQuery}&rdquo;
                    </span>
                    <button
                      onClick={() => setSearchQuery('')}
                      className="hover:text-red-600 transition-colors cursor-pointer"
                      aria-label="Clear keyword search"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}
              </div>

              {/* Reset all button */}
              <button
                onClick={handleResetAllFilters}
                className="inline-flex items-center gap-1.5 text-[12.5px] font-body font-bold text-[#003527] hover:text-red-600 transition-colors cursor-pointer underline underline-offset-2 ml-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{isVi ? 'Xóa tất cả bộ lọc' : 'Clear all filters'}</span>
              </button>
            </div>
          )}

          {/* Main Grid: Sidebar + Post Cards */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Sidebar (Desktop & Tablet) */}
            <aside className="col-span-12 md:col-span-3 space-y-6">
              {/* Category Sidebar Navigation */}
              <div className="bg-white border border-[#bfc9c3]/60 rounded-2xl p-5 shadow-xs">
                <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-[#bfc9c3]/40">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-[#003527]" />
                    <h3 className="font-display text-[17px] font-bold text-[#003527]">
                      {t('blog.categories', 'Danh mục')}
                    </h3>
                  </div>
                  <span className="text-[12px] font-mono font-bold text-[#707974]">
                    {categories.length - 1}
                  </span>
                </div>
                <ul className="space-y-1.5">
                  {categories.map((cat) => {
                    const isSelected = selectedCategoryKey === cat.key;
                    const count = categoryCounts[cat.key] || 0;

                    return (
                      <li key={cat.key}>
                        <button
                          onClick={() => handleCategoryChange(cat.key)}
                          className={`w-full text-left py-2.5 px-3 rounded-xl transition-all font-body text-[14px] cursor-pointer flex justify-between items-center ${
                            isSelected
                              ? 'bg-[#003527] text-white font-bold shadow-2xs'
                              : 'text-[#404944] hover:bg-[#eff4ff] hover:text-[#003527]'
                          }`}
                        >
                          <span>{cat.label}</span>
                          <span
                            className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                              isSelected
                                ? 'bg-white/20 text-white'
                                : 'bg-[#eff4ff] text-[#003527]'
                            }`}
                          >
                            {count}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Tags Cloud with Live Counts */}
              <div className="bg-white border border-[#bfc9c3]/60 rounded-2xl p-5 shadow-xs">
                <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-[#bfc9c3]/40">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-[#003527]" />
                    <h3 className="font-display text-[17px] font-bold text-[#003527]">
                      {isVi ? 'Thẻ chủ đề' : 'Topic Tags'}
                    </h3>
                  </div>
                  {selectedTag && (
                    <button
                      onClick={() => setSelectedTag(null)}
                      className="text-[11.5px] font-body text-red-600 hover:underline cursor-pointer"
                    >
                      {isVi ? 'Bỏ chọn' : 'Clear'}
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {tagStats.map(([tag, count]) => {
                    const isTagActive = selectedTag?.toLowerCase() === tag.toLowerCase();
                    return (
                      <button
                        key={tag}
                        onClick={() => handleTagClick(tag)}
                        className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[12px] font-body transition-all cursor-pointer border ${
                          isTagActive
                            ? 'bg-[#003527] text-white border-[#003527] font-bold shadow-2xs'
                            : 'bg-[#eff4ff]/80 text-[#003527] border-transparent hover:bg-[#dce9ff]'
                        }`}
                      >
                        <span>#{tag}</span>
                        <span
                          className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                            isTagActive
                              ? 'bg-white/20 text-white'
                              : 'bg-white text-[#003527]'
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </aside>

            {/* Blog Post Cards Grid */}
            <div className="col-span-12 md:col-span-9">
              {paginatedPosts.length === 0 ? (
                /* Empty state with helpful suggestions */
                <div className="bg-white border border-[#bfc9c3]/60 rounded-2xl p-10 sm:p-14 text-center shadow-xs">
                  <div className="w-14 h-14 mx-auto rounded-full bg-[#eff4ff] flex items-center justify-center text-[#003527] mb-4">
                    <Search className="w-7 h-7" />
                  </div>
                  <h3 className="font-display text-[20px] font-bold text-[#0b1c30] mb-2">
                    {isVi ? 'Không tìm thấy bài viết phù hợp' : 'No matching articles found'}
                  </h3>
                  <p className="font-body text-[15px] text-[#404944] max-w-md mx-auto mb-6 leading-relaxed">
                    {searchQuery ? (
                      <>
                        {isVi
                          ? `Không có bài viết nào khớp với từ khóa "${searchQuery}". Hãy thử tìm bằng các từ khóa khác hoặc đặt lại bộ lọc.`
                          : `No articles matched "${searchQuery}". Try broader keywords or reset filters.`}
                      </>
                    ) : (
                      <>
                        {isVi
                          ? 'Chưa có bài viết nào trong danh mục hoặc chủ đề đã chọn. Hãy chọn danh mục khác.'
                          : 'No articles currently found in this category or topic.'}
                      </>
                    )}
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={handleResetAllFilters}
                      className="inline-flex items-center gap-2 bg-[#003527] text-white px-6 py-2.5 rounded-xl font-body text-[14px] font-bold hover:bg-[#064e3b] transition-all cursor-pointer shadow-xs active:scale-95"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>{isVi ? 'Đặt lại toàn bộ bộ lọc' : 'Reset all filters'}</span>
                    </button>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategoryKey('all');
                        setSelectedTag(null);
                      }}
                      className="px-5 py-2.5 rounded-xl border border-[#bfc9c3] text-[#0b1c30] hover:bg-[#eff4ff] font-body text-[14px] font-medium transition-colors cursor-pointer"
                    >
                      {isVi ? 'Xem tất cả bài viết' : 'View all articles'}
                    </button>
                  </div>
                </div>
              ) : (
                /* Articles Grid (2 columns on md, responsive) */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {paginatedPosts.map((post) => (
                    <article
                      key={post.id}
                      onClick={() => onOpenArticle(post)}
                      className="bg-white border border-[#bfc9c3]/60 rounded-2xl overflow-hidden shadow-xs hover:shadow-[0px_8px_30px_rgba(15,23,42,0.08)] hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col justify-between"
                    >
                      {/* Image Header with Category Badge */}
                      <div className="h-52 overflow-hidden relative bg-[#eff4ff]">
                        <img
                          src={post.image}
                          alt={post.imageAlt}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[12px] font-body font-bold backdrop-blur-sm bg-[#003527] text-white shadow-xs">
                          {post.category}
                        </span>
                      </div>

                      {/* Card Content */}
                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          {/* Metadata Date & Reading Time */}
                          <div className="flex items-center justify-between text-[12.5px] font-body text-[#707974] mb-2.5">
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5" />
                              {post.date}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5" />
                              {post.readTime}
                            </span>
                          </div>

                          {/* Title */}
                          <h2 className="font-display text-[18px] sm:text-[19px] font-bold text-[#0b1c30] mb-2.5 group-hover:text-[#003527] transition-colors line-clamp-2 leading-snug">
                            {post.title}
                          </h2>

                          {/* Excerpt */}
                          <p className="font-body text-[14px] text-[#404944] mb-3.5 line-clamp-3 leading-relaxed">
                            {post.excerpt}
                          </p>

                          {/* Topic Tags (Clickable for instant filtering) */}
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {(post.tags || []).slice(0, 3).map((tag) => (
                              <button
                                key={tag}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleTagClick(tag);
                                }}
                                className={`text-[11.5px] px-2.5 py-0.5 rounded-md font-body font-medium transition-colors cursor-pointer ${
                                  selectedTag?.toLowerCase() === tag.toLowerCase()
                                    ? 'bg-[#003527] text-white font-bold'
                                    : 'bg-[#eff4ff] text-[#003527] hover:bg-[#dce9ff]'
                                }`}
                                title={isVi ? `Lọc bài viết theo #${tag}` : `Filter by #${tag}`}
                              >
                                #{tag}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Card Footer Actions */}
                        <div className="pt-3 border-t border-[#bfc9c3]/30 flex items-center justify-between">
                          <span className="inline-flex items-center text-[#003527] font-body text-[14px] font-bold group-hover:underline">
                            {t('blog.readMore', 'Đọc tiếp')}{' '}
                            <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </span>
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[12px] font-body font-semibold text-[#003527] bg-[#eff4ff] group-hover:bg-[#003527] group-hover:text-white transition-colors">
                            <Headphones className="w-3.5 h-3.5" />
                            <span>{t('blog.listen', 'Nghe bài')}</span>
                          </span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center items-center gap-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className={`w-10 h-10 rounded-xl border border-[#bfc9c3] flex items-center justify-center transition-colors cursor-pointer ${
                      currentPage === 1
                        ? 'opacity-40 cursor-not-allowed text-[#707974]'
                        : 'text-[#0b1c30] hover:bg-[#eff4ff]'
                    }`}
                    aria-label="Previous Page"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-xl font-body font-semibold flex items-center justify-center transition-colors cursor-pointer ${
                        currentPage === page
                          ? 'bg-[#003527] text-white shadow-xs'
                          : 'border border-[#bfc9c3] text-[#0b1c30] hover:bg-[#eff4ff]'
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    className={`w-10 h-10 rounded-xl border border-[#bfc9c3] flex items-center justify-center transition-colors cursor-pointer ${
                      currentPage === totalPages
                        ? 'opacity-40 cursor-not-allowed text-[#707974]'
                        : 'text-[#0b1c30] hover:bg-[#eff4ff]'
                    }`}
                    aria-label="Next Page"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
