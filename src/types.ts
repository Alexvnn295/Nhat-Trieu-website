export type NavTab = 'home' | 'blog' | 'portfolio' | 'shop' | 'contact' | 'admin';

export type SupportedLanguage = 'vi' | 'en' | 'ja' | 'zh' | 'fr' | 'de';

export type ContactStatus = 'new' | 'contacted' | 'in_progress' | 'archived';

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service: string;
  serviceLabel: string;
  message: string;
  createdAt: string;
  status: ContactStatus;
  notes?: string;
  source?: 'contact_modal' | 'quick_fab' | 'newsletter' | 'manual';
}

export interface SEOSettings {
  title: string;
  description: string;
  keywords: string;
  author: string;
  geoRegion: string;
  geoPlaceName: string;
  ogImage: string;
}

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
  currencySymbol: string;
  currencyRate: number; // Relative to 1 USD
  currencyPosition: 'before' | 'after';
}

export interface BlogPost {
  id: string;
  title: string;
  category: 'Kinh tế' | 'Giáo dục' | 'Công nghệ' | 'Economics' | 'Education' | 'Technology' | string;
  date: string;
  excerpt: string;
  content: string;
  readTime: string;
  tags: string[];
  image: string;
  imageAlt: string;
  author: string;
}

export interface Project {
  id: string;
  title: string;
  badge: string;
  category: 'App Product' | 'Educational Ebook' | 'Web Platform' | 'System Architecture' | string;
  excerpt: string;
  description: string;
  image: string;
  imageAlt: string;
  highlights?: string[];
  techStack: string[];
  metrics?: { label: string; value: string }[];
  colSpan?: string;
  featured?: boolean;
  articleUrl?: string;
  videoUrl?: string;
  pressSource?: string;
  pressTitle?: string;
  pressLinks?: { source: string; title: string; url: string }[];
}

export interface Product {
  id: string;
  title: string;
  category: 'Công cụ số' | 'Khóa học' | 'Sách' | 'Digital Tools' | 'Courses' | 'Books' | string;
  price: number; // in USD base
  description: string;
  fullDetails: string;
  image: string;
  imageAlt: string;
  rating: number;
  features: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type ToastType = 'success' | 'cart' | 'info' | 'warning' | 'error';

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  product?: Product;
  action?: ToastAction;
  duration?: number;
}

export type NewsCategory = 'all' | 'economy' | 'tech' | 'enterprise' | 'vietnam';

export interface GalleryMediaItem {
  id: string;
  title: {
    vi: string;
    en: string;
  };
  subtitle: {
    vi: string;
    en: string;
  };
  category: 'digital_transformation' | 'press_coverage' | 'media_podcast' | 'events' | 'personal_portrait';
  categoryLabel: {
    vi: string;
    en: string;
  };
  badge: string;
  imageUrl: string;
  fallbackUrl?: string;
  imageAlt: string;
  aspectRatio?: 'landscape' | 'portrait' | 'square';
  date?: string;
  sourceLink?: {
    label: string;
    url: string;
    sourceName: string;
  };
  videoUrl?: string;
  description: {
    vi: string;
    en: string;
  };
  tags: string[];
}

export interface NewsFlashItem {
  id: string;
  title: {
    vi: string;
    en: string;
  };
  summary: {
    vi: string;
    en: string;
  };
  category: 'economy' | 'tech' | 'enterprise' | 'vietnam';
  sourceName: string;
  sourceUrl: string;
  sourceDomain: string;
  publishedAt: string; // ISO date or formatted
  readTime: string;
  badge?: 'breaking' | 'trending' | 'hot' | 'analysis';
  impact?: 'positive' | 'warning' | 'neutral' | 'strategic';
  tags: string[];
  keyTakeaways: {
    vi: string[];
    en: string[];
  };
  relatedInsightTopic?: string;
}

export type AccessCodeType = 'discount_percent' | 'discount_fixed' | 'full_access' | 'special_privilege';
export type AccessCodeScope = 'all' | 'tools' | 'courses' | 'books';

export interface AccessCode {
  id: string;
  code: string;
  description: string;
  type: AccessCodeType;
  discountPercent?: number;
  discountAmountUsd?: number;
  scope: AccessCodeScope;
  validFrom: string; // YYYY-MM-DD
  validUntil: string; // YYYY-MM-DD
  hasExpiry: boolean;
  maxUsage: number; // 0 = unlimited
  usedCount: number;
  permissions: string[];
  isActive: boolean;
  assignedTo?: string;
  createdAt: string;
  notes?: string;
}

export interface CodeValidationResult {
  isValid: boolean;
  codeObj?: AccessCode;
  errorMessage?: string;
  discountPercent: number;
  discountAmountUsd: number;
  isFullAccess: boolean;
  grantedPermissions: string[];
  scope: AccessCodeScope;
}

export interface OrderItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  items: OrderItem[];
  subtotal: number;
  discountAmount: number;
  appliedCode?: string;
  total: number;
  paymentMethod: 'bank_transfer' | 'paypal' | 'free_access' | string;
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  source?: string;
  subscribedAt: string;
  active: boolean;
}

export interface PromoBannerConfig {
  enabled: boolean;
  badge: string;
  textVi: string;
  textEn: string;
  ctaTextVi: string;
  ctaTextEn: string;
  targetTab: NavTab;
  targetUrl?: string;
  theme: 'emerald' | 'amber' | 'indigo' | 'rose';
  expiresAt?: string;
}

export interface UTMCampaignLink {
  id: string;
  title: string;
  targetUrl: string;
  channel: 'linkedin' | 'facebook' | 'zalo' | 'email' | 'qr_event' | 'press' | 'other';
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent?: string;
  fullUrl: string;
  clicksCount: number;
  conversionsCount: number;
  createdAt: string;
  notes?: string;
}

export interface BroadcastCampaign {
  id: string;
  subject: string;
  previewText: string;
  targetSegment: 'all' | 'executives' | 'investors' | 'edtech' | 'tech_devs';
  contentMarkdown: string;
  sentAt?: string;
  status: 'draft' | 'scheduled' | 'sent';
  recipientsCount: number;
  openRateEstimated: number;
  clickRateEstimated: number;
}

export interface LeadMagnetConfig {
  id: string;
  titleVi: string;
  titleEn: string;
  descriptionVi: string;
  descriptionEn: string;
  category: string;
  coverImage?: string;
  downloadUrl: string;
  gateType: 'email_required' | 'access_code_required' | 'free_instant';
  downloadsCount: number;
  isActive: boolean;
}



