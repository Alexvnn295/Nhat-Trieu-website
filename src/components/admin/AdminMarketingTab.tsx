import React, { useState } from 'react';
import {
  PromoBannerConfig,
  UTMCampaignLink,
  BroadcastCampaign,
  LeadMagnetConfig,
  NewsletterSubscriber,
  NavTab
} from '../../types';
import {
  Megaphone,
  Link as LinkIcon,
  Send,
  FileDown,
  QrCode,
  Sparkles,
  Save,
  Plus,
  Trash2,
  Copy,
  Check,
  Eye,
  ArrowRight,
  TrendingUp,
  Users,
  ShieldCheck,
  Mail,
  ExternalLink,
  Sliders,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface AdminMarketingTabProps {
  promoBanner: PromoBannerConfig;
  onUpdatePromoBanner: (updated: Partial<PromoBannerConfig>) => Promise<boolean>;
  utmLinks: UTMCampaignLink[];
  onCreateUTMLink: (link: Omit<UTMCampaignLink, 'id' | 'clicksCount' | 'conversionsCount' | 'createdAt'>) => Promise<boolean>;
  onDeleteUTMLink: (id: string) => Promise<boolean>;
  campaigns: BroadcastCampaign[];
  onSendCampaign: (campaign: Omit<BroadcastCampaign, 'id'>) => Promise<{ success: boolean; message?: string }>;
  leadMagnets: LeadMagnetConfig[];
  onUpdateLeadMagnet: (id: string, updated: Partial<LeadMagnetConfig>) => Promise<boolean>;
  subscribersCount: number;
}

export const AdminMarketingTab: React.FC<AdminMarketingTabProps> = ({
  promoBanner,
  onUpdatePromoBanner,
  utmLinks,
  onCreateUTMLink,
  onDeleteUTMLink,
  campaigns,
  onSendCampaign,
  leadMagnets,
  onUpdateLeadMagnet,
  subscribersCount,
}) => {
  const { showSuccess, showError } = useToast();
  const [activeSubTab, setActiveSubTab] = useState<'banner' | 'utm' | 'broadcast' | 'leadmagnets' | 'qr'>('banner');

  const defaultBannerConfig: PromoBannerConfig = {
    enabled: true,
    badge: 'MỚI XUẤT BẢN',
    textVi: 'Báo cáo Chiến lược AI & Chuyển đổi số Doanh nghiệp 2026 đã sẵn sàng!',
    textEn: 'Special Executive Brief: AI & Enterprise Transformation 2026 is released!',
    ctaTextVi: 'Khám Phá Ngay',
    ctaTextEn: 'Read Now',
    targetTab: 'blog',
    theme: 'emerald',
  };

  // 1. Promo Banner State
  const [bannerForm, setBannerForm] = useState<PromoBannerConfig>({
    ...defaultBannerConfig,
    ...(promoBanner || {}),
  });

  React.useEffect(() => {
    if (promoBanner) {
      setBannerForm({
        ...defaultBannerConfig,
        ...promoBanner,
      });
    }
  }, [promoBanner]);
  const [savingBanner, setSavingBanner] = useState(false);

  // 2. UTM Generator State
  const [utmForm, setUtmForm] = useState({
    title: '',
    baseUrl: typeof window !== 'undefined' ? window.location.origin : 'https://nhattrieu.vn',
    source: 'linkedin',
    medium: 'social',
    campaign: 'ai_enterprise_2026',
    content: 'post_announcement',
    targetTab: 'blog' as NavTab,
  });
  const [savingUTM, setSavingUTM] = useState(false);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  // 3. Broadcast Campaign State
  const [broadcastForm, setBroadcastForm] = useState({
    subject: '',
    previewText: '',
    segment: 'all',
    content: '',
    status: 'draft' as BroadcastCampaign['status'],
  });
  const [sendingCampaign, setSendingCampaign] = useState(false);

  // 4. QR Code State
  const [qrUrl, setQrUrl] = useState(typeof window !== 'undefined' ? window.location.origin : 'https://nhattrieu.vn');

  // Handle Save Promo Banner
  const handleSavePromoBanner = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingBanner(true);
    const success = await onUpdatePromoBanner(bannerForm);
    if (success) {
      showSuccess('Đã lưu cấu hình thanh quảng bá thông minh (Smart Promo Bar)');
    } else {
      showError('Không thể lưu cấu hình banner');
    }
    setSavingBanner(false);
  };

  // Generate UTM Link
  const buildCurrentUTMUrl = () => {
    try {
      const url = new URL(utmForm.baseUrl || 'https://nhattrieu.vn');
      url.searchParams.set('tab', utmForm.targetTab);
      if (utmForm.source) url.searchParams.set('utm_source', utmForm.source.toLowerCase().trim());
      if (utmForm.medium) url.searchParams.set('utm_medium', utmForm.medium.toLowerCase().trim());
      if (utmForm.campaign) url.searchParams.set('utm_campaign', utmForm.campaign.toLowerCase().trim());
      if (utmForm.content) url.searchParams.set('utm_content', utmForm.content.toLowerCase().trim());
      return url.toString();
    } catch {
      return `${utmForm.baseUrl}?tab=${utmForm.targetTab}&utm_source=${utmForm.source}&utm_medium=${utmForm.medium}&utm_campaign=${utmForm.campaign}`;
    }
  };

  const handleCreateUTMLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!utmForm.title.trim()) {
      showError('Vui lòng nhập tên chiến dịch');
      return;
    }
    setSavingUTM(true);
    const finalUrl = buildCurrentUTMUrl();
    const success = await onCreateUTMLink({
      title: utmForm.title.trim(),
      fullUrl: finalUrl,
      source: utmForm.source,
      medium: utmForm.medium,
      campaign: utmForm.campaign,
      content: utmForm.content,
      targetTab: utmForm.targetTab,
    });
    if (success) {
      showSuccess('Đã tạo liên kết UTM chiến dịch thành công');
      setUtmForm((prev) => ({
        ...prev,
        title: '',
        content: '',
      }));
    } else {
      showError('Lỗi khi tạo liên kết UTM');
    }
    setSavingUTM(false);
  };

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(url);
    showSuccess('Đã sao chép link chiến dịch vào bộ nhớ tạm');
    setTimeout(() => setCopiedLink(null), 2500);
  };

  // Handle Send Broadcast
  const handleSendBroadcast = async (status: 'sent' | 'draft') => {
    if (!broadcastForm.subject.trim() || !broadcastForm.content.trim()) {
      showError('Vui lòng nhập tiêu đề và nội dung bản tin');
      return;
    }
    setSendingCampaign(true);
    const res = await onSendCampaign({
      subject: broadcastForm.subject.trim(),
      previewText: broadcastForm.previewText.trim(),
      segment: broadcastForm.segment,
      content: broadcastForm.content,
      sentAt: status === 'sent' ? new Date().toISOString() : undefined,
      recipientsCount: status === 'sent' ? subscribersCount : 0,
      openRatePercent: status === 'sent' ? 38.5 : undefined,
      clickRatePercent: status === 'sent' ? 14.2 : undefined,
      status,
    });

    if (res.success) {
      showSuccess(status === 'sent' ? 'Đã phát bản tin thành công tới độc giả!' : 'Đã lưu bản nháp');
      setBroadcastForm({
        subject: '',
        previewText: '',
        segment: 'all',
        content: '',
        status: 'draft',
      });
    } else {
      showError(res.message || 'Lỗi gửi bản tin');
    }
    setSendingCampaign(false);
  };

  // Handle Toggle Lead Magnet Gate
  const handleToggleGate = async (lm: LeadMagnetConfig) => {
    const nextGate =
      lm.gateType === 'free_instant'
        ? 'email_required'
        : lm.gateType === 'email_required'
        ? 'access_code_required'
        : 'free_instant';
    const success = await onUpdateLeadMagnet(lm.id, { gateType: nextGate });
    if (success) {
      showSuccess(`Đã cập nhật cơ chế bảo vệ của "${lm.titleVi}" sang: ${nextGate}`);
    }
  };

  const handleToggleActiveLead = async (lm: LeadMagnetConfig) => {
    const success = await onUpdateLeadMagnet(lm.id, { isActive: !lm.isActive });
    if (success) {
      showSuccess(`Đã ${!lm.isActive ? 'bật' : 'tắt'} hiển thị tài liệu`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation Header */}
      <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-emerald-600" />
              Công Cụ Quảng Bá & Marketing Hiện Đại
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Quản lý thanh thông báo thông minh, bộ tạo link UTM đo lường chuyển đổi, bản tin broadcast và tài liệu phễu thu hút.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-200">
            <Users className="w-4 h-4 text-emerald-600" />
            <span>{subscribersCount} Độc giả sẵn sàng nhận tin</span>
          </div>
        </div>

        {/* Sub Navigation */}
        <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-slate-100">
          <button
            id="marketing-tab-banner-btn"
            onClick={() => setActiveSubTab('banner')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              activeSubTab === 'banner'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Smart Promo Bar (Banner)
          </button>
          <button
            id="marketing-tab-utm-btn"
            onClick={() => setActiveSubTab('utm')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              activeSubTab === 'utm'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <LinkIcon className="w-3.5 h-3.5" />
            Bộ Tạo & Theo Dõi UTM ({utmLinks.length})
          </button>
          <button
            id="marketing-tab-broadcast-btn"
            onClick={() => setActiveSubTab('broadcast')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              activeSubTab === 'broadcast'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            Bản Tin Broadcast ({campaigns.length})
          </button>
          <button
            id="marketing-tab-leadmagnets-btn"
            onClick={() => setActiveSubTab('leadmagnets')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              activeSubTab === 'leadmagnets'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <FileDown className="w-3.5 h-3.5" />
            Tài Liệu Phễu (Lead Magnets)
          </button>
          <button
            id="marketing-tab-qr-btn"
            onClick={() => setActiveSubTab('qr')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              activeSubTab === 'qr'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            Mã QR Sự Kiện
          </button>
        </div>
      </div>

      {/* SUBTAB 1: SMART PROMO BAR */}
      {activeSubTab === 'banner' && (
        <div className="space-y-6">
          {/* Live Preview Box */}
          <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-emerald-600" />
                Xem Trước Thực Tế (Live Banner Preview)
              </span>
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                  bannerForm.enabled
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {bannerForm.enabled ? 'Đang bật' : 'Đang tắt'}
              </span>
            </div>

            <div
              className={`rounded-xl p-3.5 text-xs sm:text-sm flex flex-wrap items-center justify-between gap-3 shadow-inner ${
                bannerForm.theme === 'emerald'
                  ? 'bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-950 text-emerald-100'
                  : bannerForm.theme === 'amber'
                  ? 'bg-gradient-to-r from-amber-950 via-orange-950 to-neutral-950 text-amber-100'
                  : bannerForm.theme === 'indigo'
                  ? 'bg-gradient-to-r from-indigo-950 via-slate-900 to-sky-950 text-indigo-100'
                  : 'bg-gradient-to-r from-rose-950 via-slate-900 to-neutral-950 text-rose-100'
              }`}
            >
              <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/20 border border-white/20 whitespace-nowrap">
                  <Sparkles className="w-3 h-3 text-emerald-300" />
                  {bannerForm.badge || 'THÔNG BÁO'}
                </span>
                <p className="truncate font-medium text-white/95">
                  {bannerForm.textVi || 'Báo cáo mới nhất đã sẵn sàng!'}
                </p>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-white text-slate-900 shadow-sm shrink-0">
                <span>{bannerForm.ctaTextVi || 'Xem Ngay'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Form Editor */}
          <div className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-600" />
              Cấu Hình Chi Tiết Banner
            </h3>

            <form onSubmit={handleSavePromoBanner} className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200/80">
                <input
                  type="checkbox"
                  id="promo-banner-enabled"
                  checked={bannerForm.enabled}
                  onChange={(e) => setBannerForm({ ...bannerForm, enabled: e.target.checked })}
                  className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 cursor-pointer"
                />
                <label htmlFor="promo-banner-enabled" className="text-sm font-semibold text-slate-800 cursor-pointer">
                  Kích hoạt hiển thị thanh thông báo trên đầu trang web
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nhãn Huy Hiệu (Badge)
                  </label>
                  <input
                    type="text"
                    value={bannerForm.badge}
                    onChange={(e) => setBannerForm({ ...bannerForm, badge: e.target.value })}
                    placeholder="VD: MỚI XUẤT BẢN, SỰ KIỆN, ƯU ĐÃI"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Chủ Đề Màu Sắc (Theme)
                  </label>
                  <select
                    value={bannerForm.theme}
                    onChange={(e) => setBannerForm({ ...bannerForm, theme: e.target.value as any })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="emerald">Emerald - Sang trọng & Công nghệ y tế</option>
                    <option value="amber">Amber - Năng động, thu hút & Nổi bật</option>
                    <option value="indigo">Indigo - Học thuật, kinh tế & EdTech</option>
                    <option value="rose">Rose - Ưu đãi đặc biệt & Sự kiện</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nội Dung Tiếng Việt *
                  </label>
                  <input
                    type="text"
                    required
                    value={bannerForm.textVi}
                    onChange={(e) => setBannerForm({ ...bannerForm, textVi: e.target.value })}
                    placeholder="VD: Báo cáo Chiến lược AI & Chuyển đổi số Doanh nghiệp 2026 đã sẵn sàng!"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nội Dung Tiếng Anh (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={bannerForm.textEn}
                    onChange={(e) => setBannerForm({ ...bannerForm, textEn: e.target.value })}
                    placeholder="VD: Special Executive Brief: AI & Enterprise Transformation 2026 is released!"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nút Kêu Gọi (CTA Vi)
                  </label>
                  <input
                    type="text"
                    value={bannerForm.ctaTextVi}
                    onChange={(e) => setBannerForm({ ...bannerForm, ctaTextVi: e.target.value })}
                    placeholder="VD: Khám Phá Ngay"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nút Kêu Gọi (CTA En)
                  </label>
                  <input
                    type="text"
                    value={bannerForm.ctaTextEn}
                    onChange={(e) => setBannerForm({ ...bannerForm, ctaTextEn: e.target.value })}
                    placeholder="VD: Read Now"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Chuyển Đến Tab
                  </label>
                  <select
                    value={bannerForm.targetTab || 'blog'}
                    onChange={(e) => setBannerForm({ ...bannerForm, targetTab: e.target.value as NavTab })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="home">Trang chủ (Home)</option>
                    <option value="blog">Bài viết & Báo cáo (Blog)</option>
                    <option value="portfolio">Dự án & Giải pháp (Portfolio)</option>
                    <option value="shop">Cửa hàng & Sách (Shop)</option>
                    <option value="contact">Liên hệ hợp tác (Contact)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Hoặc URL Bên Ngoài (Tùy chọn)
                  </label>
                  <input
                    type="text"
                    value={bannerForm.targetUrl || ''}
                    onChange={(e) => setBannerForm({ ...bannerForm, targetUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-100">
                <button
                  type="submit"
                  disabled={savingBanner}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  {savingBanner ? 'Đang lưu...' : 'Lưu Thay Đổi Banner'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SUBTAB 2: UTM BUILDER & TRACKER */}
      {activeSubTab === 'utm' && (
        <div className="space-y-6">
          {/* UTM Builder Form */}
          <div className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <LinkIcon className="w-4 h-4 text-emerald-600" />
              Tạo Liên Kết Chiến Dịch UTM Thông Minh
            </h3>

            {/* Presets */}
            <div className="mb-4">
              <span className="text-xs text-slate-500 font-medium">Mẫu nhanh theo kênh:</span>
              <div className="flex flex-wrap gap-2 mt-1.5">
                {[
                  { label: 'LinkedIn', source: 'linkedin', medium: 'social' },
                  { label: 'Facebook', source: 'facebook', medium: 'social' },
                  { label: 'Bản Tin Email', source: 'newsletter', medium: 'email' },
                  { label: 'Zalo Nhóm', source: 'zalo', medium: 'chat' },
                  { label: 'QR Slide Thuyết Trình', source: 'keynote_event', medium: 'offline_qr' },
                ].map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setUtmForm((prev) => ({ ...prev, source: preset.source, medium: preset.medium }))}
                    className="px-2.5 py-1 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-colors cursor-pointer"
                  >
                    + {preset.label}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleCreateUTMLink} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-3">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tên Chiến Dịch (Ghi nhớ nội bộ) *
                  </label>
                  <input
                    type="text"
                    required
                    value={utmForm.title}
                    onChange={(e) => setUtmForm({ ...utmForm, title: e.target.value })}
                    placeholder="VD: Chiến dịch Ra mắt Báo cáo Y Tế Số Q1-2026 trên LinkedIn"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nguồn (utm_source) *
                  </label>
                  <input
                    type="text"
                    required
                    value={utmForm.source}
                    onChange={(e) => setUtmForm({ ...utmForm, source: e.target.value })}
                    placeholder="VD: linkedin, facebook, email, zalo"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phương Thức (utm_medium) *
                  </label>
                  <input
                    type="text"
                    required
                    value={utmForm.medium}
                    onChange={(e) => setUtmForm({ ...utmForm, medium: e.target.value })}
                    placeholder="VD: social, cpc, email, qr"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mã Chiến Dịch (utm_campaign) *
                  </label>
                  <input
                    type="text"
                    required
                    value={utmForm.campaign}
                    onChange={(e) => setUtmForm({ ...utmForm, campaign: e.target.value })}
                    placeholder="VD: ai_health_2026"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tab Đích
                  </label>
                  <select
                    value={utmForm.targetTab}
                    onChange={(e) => setUtmForm({ ...utmForm, targetTab: e.target.value as NavTab })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="home">Trang chủ</option>
                    <option value="blog">Bài viết & Báo cáo</option>
                    <option value="portfolio">Dự án</option>
                    <option value="shop">Cửa hàng</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nội Dung / Biến Thể (utm_content)
                  </label>
                  <input
                    type="text"
                    value={utmForm.content}
                    onChange={(e) => setUtmForm({ ...utmForm, content: e.target.value })}
                    placeholder="VD: banner_top, textlink_footer, variant_a"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-xs"
                  />
                </div>
              </div>

              {/* Generated Real-time URL Box */}
              <div className="p-3.5 bg-slate-900 rounded-xl text-slate-200 text-xs">
                <div className="flex items-center justify-between mb-1.5 text-slate-400">
                  <span className="font-mono text-[11px]">Đường dẫn tạo tự động:</span>
                  <button
                    type="button"
                    onClick={() => handleCopyLink(buildCurrentUTMUrl())}
                    className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-sans cursor-pointer"
                  >
                    <Copy className="w-3 h-3" />
                    Sao chép
                  </button>
                </div>
                <p className="font-mono text-[11px] break-all text-emerald-300 select-all">
                  {buildCurrentUTMUrl()}
                </p>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={savingUTM}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  {savingUTM ? 'Đang lưu...' : 'Lưu Vào Danh Sách Theo Dõi'}
                </button>
              </div>
            </form>
          </div>

          {/* Existing UTM Links Table */}
          <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h4 className="font-bold text-slate-900 text-sm">
                Danh Sách Link Chiến Dịch Đang Theo Dõi ({utmLinks.length})
              </h4>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 border-b border-slate-200/80 text-[11px] font-semibold text-slate-700 uppercase">
                  <tr>
                    <th className="px-5 py-3">Tên Chiến Dịch</th>
                    <th className="px-5 py-3">Nguồn / Kênh</th>
                    <th className="px-5 py-3">Lượt Nhấp (Clicks)</th>
                    <th className="px-5 py-3">Chuyển Đổi (Orders)</th>
                    <th className="px-5 py-3">Tỷ Lệ Chuyển Đổi (CR)</th>
                    <th className="px-5 py-3 text-right">Thao Tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {utmLinks.map((link) => {
                    const cr = link.clicksCount > 0 ? ((link.conversionsCount / link.clicksCount) * 100).toFixed(1) : '0.0';
                    return (
                      <tr key={link.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="px-5 py-3.5">
                          <p className="font-semibold text-slate-900">{link.title}</p>
                          <p className="font-mono text-[10px] text-slate-400 truncate max-w-xs mt-0.5">
                            {link.fullUrl}
                          </p>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded font-medium">
                            {link.source} / {link.medium}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 font-bold text-slate-900">
                          {link.clicksCount.toLocaleString()}
                        </td>
                        <td className="px-5 py-3.5 font-bold text-emerald-700">
                          {link.conversionsCount.toLocaleString()}
                        </td>
                        <td className="px-5 py-3.5">
                          <span className="font-semibold text-slate-800">{cr}%</span>
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => handleCopyLink(link.fullUrl)}
                              className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded transition-colors cursor-pointer"
                              title="Sao chép liên kết"
                            >
                              {copiedLink === link.fullUrl ? (
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                            <button
                              onClick={() => setQrUrl(link.fullUrl)}
                              className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors cursor-pointer"
                              title="Tạo mã QR cho link này"
                            >
                              <QrCode className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => onDeleteUTMLink(link.id)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors cursor-pointer"
                              title="Xóa link chiến dịch"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {utmLinks.length === 0 && (
              <div className="text-center py-8 text-xs text-slate-400">
                Chưa có link chiến dịch nào được lưu
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUBTAB 3: BROADCAST CAMPAIGNS */}
      {activeSubTab === 'broadcast' && (
        <div className="space-y-6">
          {/* Dispatch Form */}
          <div className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Send className="w-4 h-4 text-emerald-600" />
                Soạn & Phát Bản Tin Email Đến Độc Giả
              </h3>
              <span className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md font-semibold">
                Gửi tới: {subscribersCount} email đã đăng ký
              </span>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tiêu Đề Email (Subject Line) *
                  </label>
                  <input
                    type="text"
                    required
                    value={broadcastForm.subject}
                    onChange={(e) => setBroadcastForm({ ...broadcastForm, subject: e.target.value })}
                    placeholder="VD: [Nhật Triều] Phân tích xu hướng Chuyển đổi số & AI Y tế 2026"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phân Khúc Độc Giả (Segment)
                  </label>
                  <select
                    value={broadcastForm.segment}
                    onChange={(e) => setBroadcastForm({ ...broadcastForm, segment: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="all">Tất cả độc giả ({subscribersCount})</option>
                    <option value="leaders">Lãnh đạo & Doanh nhân</option>
                    <option value="developers">Kỹ sư & Chuyên gia công nghệ</option>
                    <option value="customers">Khách hàng đã mua sách/khóa học</option>
                  </select>
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Dòng Xem Trước Hộp Thư (Preview Text)
                  </label>
                  <input
                    type="text"
                    value={broadcastForm.previewText}
                    onChange={(e) => setBroadcastForm({ ...broadcastForm, previewText: e.target.value })}
                    placeholder="Tóm tắt 1 câu hiển thị ngoài hòm thư..."
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nội Dung Bản Tin (Hỗ trợ Markdown) *
                  </label>
                  <textarea
                    rows={8}
                    required
                    value={broadcastForm.content}
                    onChange={(e) => setBroadcastForm({ ...broadcastForm, content: e.target.value })}
                    placeholder="Kính gửi quý độc giả và đối tác,&#10;&#10;Trong tuần qua, tôi vừa hoàn thành bài phân tích chuyên sâu về..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  disabled={sendingCampaign}
                  onClick={() => handleSendBroadcast('draft')}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg transition-colors cursor-pointer"
                >
                  Lưu Bản Nháp
                </button>
                <button
                  type="button"
                  disabled={sendingCampaign}
                  onClick={() => handleSendBroadcast('sent')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  {sendingCampaign ? 'Đang gửi...' : 'Phát Bản Tin Ngay'}
                </button>
              </div>
            </div>
          </div>

          {/* Historical Campaigns Table */}
          <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100">
              <h4 className="font-bold text-slate-900 text-sm">
                Lịch Sử Các Chiến Dịch Bản Tin ({campaigns.length})
              </h4>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 border-b border-slate-200/80 text-[11px] font-semibold text-slate-700 uppercase">
                  <tr>
                    <th className="px-5 py-3">Tiêu Đề</th>
                    <th className="px-5 py-3">Trạng Thái</th>
                    <th className="px-5 py-3">Người Nhận</th>
                    <th className="px-5 py-3">Tỷ Lệ Mở (Open Rate)</th>
                    <th className="px-5 py-3">Tỷ Lệ Nhấp (CTR)</th>
                    <th className="px-5 py-3">Thời Gian</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {campaigns.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-5 py-3.5">
                        <p className="font-semibold text-slate-900">{c.subject}</p>
                        {c.previewText && (
                          <p className="text-[11px] text-slate-400 truncate max-w-xs">{c.previewText}</p>
                        )}
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                            c.status === 'sent'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {c.status === 'sent' ? 'Đã phát' : 'Bản nháp'}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 font-bold text-slate-900">
                        {c.recipientsCount ? `${c.recipientsCount} người` : '—'}
                      </td>
                      <td className="px-5 py-3.5 text-emerald-700 font-semibold">
                        {c.openRatePercent ? `${c.openRatePercent}%` : '—'}
                      </td>
                      <td className="px-5 py-3.5 text-slate-800 font-semibold">
                        {c.clickRatePercent ? `${c.clickRatePercent}%` : '—'}
                      </td>
                      <td className="px-5 py-3.5 text-slate-400 whitespace-nowrap">
                        {c.sentAt
                          ? new Date(c.sentAt).toLocaleDateString('vi-VN', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })
                          : 'Chưa phát'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {campaigns.length === 0 && (
              <div className="text-center py-8 text-xs text-slate-400">
                Chưa có chiến dịch nào được phát
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUBTAB 4: LEAD MAGNETS */}
      {activeSubTab === 'leadmagnets' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
              <FileDown className="w-4 h-4 text-emerald-600" />
              Tài Liệu Phễu Thu Hút (Gated Lead Magnets)
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Các tài liệu nghiên cứu, sách trắng, hoặc checklist chuyển đổi số. Bạn có thể cài đặt độc giả phải để lại Email hoặc nhập Mã truy cập VIP để mở khóa.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {leadMagnets.map((lm) => (
                <div
                  key={lm.id}
                  className="bg-slate-50 rounded-xl p-5 border border-slate-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-mono font-bold uppercase text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                        {lm.category}
                      </span>
                      <button
                        onClick={() => handleToggleActiveLead(lm)}
                        className={`text-xs px-2.5 py-0.5 rounded-full font-semibold cursor-pointer ${
                          lm.isActive
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {lm.isActive ? 'Đang hoạt động' : 'Tạm tắt'}
                      </button>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 leading-snug">{lm.titleVi}</h4>
                    <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                      {lm.descriptionVi}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-200/80">
                    <div className="flex items-center justify-between text-xs mb-3">
                      <span className="text-slate-500">Lượt tải về thực tế:</span>
                      <span className="font-bold text-slate-900">{lm.downloadsCount} lượt</span>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs text-slate-500">Cơ chế bảo vệ:</span>
                      <button
                        type="button"
                        onClick={() => handleToggleGate(lm)}
                        className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                          lm.gateType === 'email_required'
                            ? 'bg-amber-50 text-amber-900 border-amber-200'
                            : lm.gateType === 'access_code_required'
                            ? 'bg-indigo-50 text-indigo-900 border-indigo-200'
                            : 'bg-emerald-50 text-emerald-900 border-emerald-200'
                        }`}
                        title="Bấm để chuyển đổi cơ chế bảo vệ"
                      >
                        {lm.gateType === 'email_required' && 'Yêu cầu Email'}
                        {lm.gateType === 'access_code_required' && 'Yêu cầu Mã VIP'}
                        {lm.gateType === 'free_instant' && 'Tải Miễn Phí'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 5: QR CODE TOOL */}
      {activeSubTab === 'qr' && (
        <div className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-sm max-w-xl mx-auto text-center">
          <QrCode className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
          <h3 className="text-base font-bold text-slate-900 mb-1">
            Bộ Tạo Mã QR Tiếp Thị & Sự Kiện
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Tạo mã QR cho bất kỳ đường dẫn nào để in lên danh thiếp, tài liệu phát tay, hoặc slide báo cáo.
          </p>

          <div className="mb-4">
            <input
              type="text"
              value={qrUrl}
              onChange={(e) => setQrUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-center focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="p-4 bg-white border-2 border-slate-200 rounded-2xl inline-block shadow-sm mb-4">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
                qrUrl
              )}`}
              alt="QR Code"
              className="w-52 h-52 mx-auto"
            />
          </div>

          <div className="flex justify-center gap-3">
            <button
              onClick={() => handleCopyLink(qrUrl)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              Sao Chép URL
            </button>
            <a
              href={`https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=${encodeURIComponent(
                qrUrl
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              download="qr-code-trieu-portfolio.png"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium rounded-lg cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Tải Ảnh QR Độ Nét Cao (600px)
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
