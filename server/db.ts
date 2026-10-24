import fs from 'fs';
import path from 'path';
import {
  BlogPost,
  Project,
  Product,
  ContactInquiry,
  AccessCode,
  SEOSettings,
  PromoBannerConfig,
  UTMCampaignLink,
  BroadcastCampaign,
  LeadMagnetConfig,
} from '../src/types';
import { BLOG_POSTS, PROJECTS, PRODUCTS, INITIAL_CONTACTS } from '../src/data/mockData';
import { EXECUTIVE_PROFILE, ExecutiveProfileData } from '../src/data/profileData';
import { INITIAL_ACCESS_CODES } from '../src/data/accessCodesData';

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

export interface DatabaseSchema {
  version: string;
  profile: ExecutiveProfileData;
  posts: BlogPost[];
  projects: Project[];
  products: Product[];
  contacts: ContactInquiry[];
  subscribers: NewsletterSubscriber[];
  orders: Order[];
  accessCodes: AccessCode[];
  seo: SEOSettings;
  blogCategories: string[];
  shopCategories: string[];
  promoBanner: PromoBannerConfig;
  utmLinks: UTMCampaignLink[];
  campaigns: BroadcastCampaign[];
  leadMagnets: LeadMagnetConfig[];
  updatedAt: string;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'app-db.json');

const INITIAL_SEO: SEOSettings = {
  title: 'Cao Nguyễn Nhật Triều - Chiến lược, Vận hành, Giáo dục & Công nghệ',
  description: 'Trang cá nhân chính thức của Cao Nguyễn Nhật Triều - Chuyên gia hoạch định chiến lược, tối ưu vận hành, giáo dục EdTech và kiến trúc công nghệ.',
  keywords: 'Cao Nguyễn Nhật Triều, Hoạch định chiến lược, Tối ưu vận hành, Kinh tế lượng, EdTech, FinTech',
  author: 'Cao Nguyễn Nhật Triều',
  geoRegion: 'VN',
  geoPlaceName: 'Ho Chi Minh City, Vietnam',
  ogImage: '/images/profile/GRU02101.JPG?v=3',
};

const INITIAL_SUBSCRIBERS: NewsletterSubscriber[] = [
  {
    id: 'sub-01',
    email: 'executive.network@example.com',
    source: 'homepage_newsletter',
    subscribedAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    active: true,
  },
  {
    id: 'sub-02',
    email: 'partners@fintech-ventures.vn',
    source: 'blog_reader',
    subscribedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    active: true,
  },
];

const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-2026-8801',
    customerName: 'Hoàng Minh Tuấn',
    customerEmail: 'tuan.hoang@investcorp.vn',
    customerPhone: '+84 908 123 456',
    items: [
      {
        productId: 'prod-01',
        title: 'Bộ Khung Mẫu Hoạch Định Chiến Lược Doanh Nghiệp 2025-2030',
        price: 99,
        quantity: 1,
      },
    ],
    subtotal: 99,
    discountAmount: 0,
    total: 99,
    paymentMethod: 'bank_transfer',
    paymentStatus: 'completed',
    notes: 'Đã hoàn tất xác nhận chuyển khoản ngân hàng.',
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 4).toISOString(),
  },
];

const INITIAL_PROMO_BANNER: PromoBannerConfig = {
  enabled: true,
  badge: 'MỚI XUẤT BẢN',
  textVi: 'Báo cáo Chiến lược AI & Chuyển đổi số Doanh nghiệp 2026 đã sẵn sàng!',
  textEn: 'Special Executive Brief: AI & Enterprise Transformation 2026 is released!',
  ctaTextVi: 'Khám Phá Ngay',
  ctaTextEn: 'Read Now',
  targetTab: 'blog',
  theme: 'emerald',
};

const INITIAL_UTM_LINKS: UTMCampaignLink[] = [
  {
    id: 'utm-001',
    title: 'LinkedIn - Bài phân tích AI Tài chính Toàn cầu',
    targetUrl: '/?tab=blog&article=ai-financial-markets',
    channel: 'linkedin',
    utmSource: 'linkedin',
    utmMedium: 'social_post',
    utmCampaign: 'thought_leadership_q4',
    fullUrl: '/?tab=blog&article=ai-financial-markets&utm_source=linkedin&utm_medium=social_post&utm_campaign=thought_leadership_q4',
    clicksCount: 184,
    conversionsCount: 16,
    createdAt: new Date(Date.now() - 86400000 * 12).toISOString(),
    notes: 'Bài chia sẻ nhận định xu hướng Fintech & Algorithmic Trading',
  },
  {
    id: 'utm-002',
    title: 'Mã QR Hội Thảo - Kết nối Tư vấn 1-1',
    targetUrl: '/?tab=contact',
    channel: 'qr_event',
    utmSource: 'executive_summit',
    utmMedium: 'qr_badge',
    utmCampaign: 'hcmc_innovation_2026',
    fullUrl: '/?tab=contact&utm_source=executive_summit&utm_medium=qr_badge&utm_campaign=hcmc_innovation_2026',
    clicksCount: 312,
    conversionsCount: 42,
    createdAt: new Date(Date.now() - 86400000 * 6).toISOString(),
    notes: 'In trên tài liệu và danh thiếp hội thảo Tech & Innovation Summit',
  },
  {
    id: 'utm-003',
    title: 'Zalo Executive Channel - Portfolio Dự án Y tế',
    targetUrl: '/?tab=portfolio',
    channel: 'zalo',
    utmSource: 'zalo_oa',
    utmMedium: 'broadcast',
    utmCampaign: 'smart_kiosk_case_study',
    fullUrl: '/?tab=portfolio&utm_source=zalo_oa&utm_medium=broadcast&utm_campaign=smart_kiosk_case_study',
    clicksCount: 145,
    conversionsCount: 11,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    notes: 'Case study triển khai Kiosk y tế BV Nhi Đồng 1',
  },
];

const INITIAL_CAMPAIGNS: BroadcastCampaign[] = [
  {
    id: 'camp-01',
    subject: 'Bản tin Chiến lược Tháng 9: Tác động của AI đối với Mô hình Kinh doanh',
    previewText: 'Tóm lược 3 chuyển dịch sống còn mà Hội đồng Quản trị cần định vị trong Q4/2026...',
    targetSegment: 'all',
    contentMarkdown: `Kính gửi Quý đối tác và Độc giả,

Trong bối cảnh công nghệ AI tăng tốc với cấp số nhân, bài viết mới nhất của tôi phân tích 3 trụ cột thiết yếu:
1. Tái cấu trúc quy trình nội bộ bằng mô hình tự động hóa thông minh
2. Quản trị rủi ro dữ liệu và an toàn thông tin
3. Định lượng chỉ số ROI thực tế của các sáng kiến chuyển đổi số

Mời Quý vị đón đọc toàn văn trên website.
Trân trọng,
Cao Nguyễn Nhật Triều`,
    sentAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    status: 'sent',
    recipientsCount: 146,
    openRateEstimated: 52.4,
    clickRateEstimated: 18.2,
  },
];

const INITIAL_LEAD_MAGNETS: LeadMagnetConfig[] = [
  {
    id: 'lm-01',
    titleVi: 'Sách Trắng: Khung Quản Trị Chuyển Đổi Số & Tối Ưu Chi Phí Vận Hành 2026',
    titleEn: 'Whitepaper: Digital Transformation Governance & OpEx Optimization Framework 2026',
    descriptionVi: 'Bộ cẩm nang thực chiến đúc kết phương pháp luận tinh gọn, kiến trúc microservices và kinh tế lượng ứng dụng cho doanh nghiệp.',
    descriptionEn: 'Executive field manual detailing lean methodology, enterprise architecture and econometric strategy.',
    category: 'Tài liệu Chiến lược',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoLV7Sz_GogQx4KLhjqNPlLBXfb1lI4lJ-5-5Mtmn3XoPTiY2csMeoAMP-zXY0FG3v86ZTuEVScrw3iOGMeQBHT9N9me1bVaOwlrKpf7C6O8RUf82yJYOIHghq4us2t78Su_K0V3RlylEZTSL-OoiDagiIiMiK-tJlf6G5W-XFjVilNHnzWEhl_cVSK0Xl3g0-Jt-_a1ZNnBJiTe-sb5CN8NqHeiD_8cbA6FKxLmrjafUPZF8XU0eRtQ',
    downloadUrl: '#',
    gateType: 'email_required',
    downloadsCount: 219,
    isActive: true,
  },
  {
    id: 'lm-02',
    titleVi: 'Checklist 20 Tiêu Chí Sẵn Sàng Ứng Dụng AI Vào Doanh Nghiệp',
    titleEn: 'Enterprise AI Readiness Checklist: 20 Crucial Criteria',
    descriptionVi: 'Bảng đánh giá độc quyền giúp CEO & CTO lượng hóa mức độ sẵn sàng về dữ liệu, con người và hạ tầng.',
    descriptionEn: 'Proprietary audit matrix to evaluate data, talent and infrastructure readiness.',
    category: 'Checklist Thực chiến',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0nfs-QE97ZSzPp1ePqwuJnL9Y8sYkh8kidQJAYCebU14EOYejcoy9MduTqZ6lBVKP_LVgLtpAESpHDLSokI62umBM_p5Cw1x36O4RItYPSxNB2V8zvzHD26W63AW2QrivLe6xQHlDODhloJjb7GASV5l3nmo50gpO12WWVwIJchubus92f_j_9aSfpEwwVzZnlpM_TY3QgTQ8KAo-3hH5Hf0RoSkHJen3B2MdR7CEfnTIYWCNQMaaDA',
    downloadUrl: '#',
    gateType: 'access_code_required',
    downloadsCount: 97,
    isActive: true,
  },
];

class Database {
  private cache: DatabaseSchema | null = null;
  private isSaving = false;

  constructor() {
    this.ensureDataFile();
  }

  private ensureDataFile(): DatabaseSchema {
    if (this.cache) {
      return this.cache;
    }

    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }

      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        this.cache = {
          ...parsed,
          promoBanner: parsed.promoBanner || INITIAL_PROMO_BANNER,
          utmLinks: Array.isArray(parsed.utmLinks) ? parsed.utmLinks : INITIAL_UTM_LINKS,
          campaigns: Array.isArray(parsed.campaigns) ? parsed.campaigns : INITIAL_CAMPAIGNS,
          leadMagnets: Array.isArray(parsed.leadMagnets) ? parsed.leadMagnets : INITIAL_LEAD_MAGNETS,
        };
        return this.cache!;
      }
    } catch (err) {
      console.warn('Could not read existing database file, falling back to initial data:', err);
    }

    // Default Seed Data
    const initialDb: DatabaseSchema = {
      version: '2.0.0',
      profile: EXECUTIVE_PROFILE,
      posts: BLOG_POSTS,
      projects: PROJECTS,
      products: PRODUCTS,
      contacts: INITIAL_CONTACTS,
      subscribers: INITIAL_SUBSCRIBERS,
      orders: INITIAL_ORDERS,
      accessCodes: INITIAL_ACCESS_CODES,
      seo: INITIAL_SEO,
      blogCategories: ['Tất cả', 'Kinh tế', 'Giáo dục', 'Công nghệ'],
      shopCategories: ['Tất cả', 'Công cụ số', 'Khóa học', 'Sách'],
      promoBanner: INITIAL_PROMO_BANNER,
      utmLinks: INITIAL_UTM_LINKS,
      campaigns: INITIAL_CAMPAIGNS,
      leadMagnets: INITIAL_LEAD_MAGNETS,
      updatedAt: new Date().toISOString(),
    };

    this.cache = initialDb;
    this.persist();
    return initialDb;
  }

  private persist() {
    if (!this.cache) return;
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      this.cache.updatedAt = new Date().toISOString();
      const tempFile = `${DB_FILE}.tmp`;
      fs.writeFileSync(tempFile, JSON.stringify(this.cache, null, 2), 'utf-8');
      fs.renameSync(tempFile, DB_FILE);
    } catch (err) {
      console.error('Error saving database to file:', err);
    }
  }

  // --- POSTS ---
  public getPosts(): BlogPost[] {
    return this.ensureDataFile().posts;
  }

  public getPost(id: string): BlogPost | undefined {
    return this.ensureDataFile().posts.find((p) => p.id === id);
  }

  public createPost(post: Omit<BlogPost, 'id'> & { id?: string }): BlogPost {
    const db = this.ensureDataFile();
    const newPost: BlogPost = {
      ...post,
      id: post.id || `post-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    };
    db.posts.unshift(newPost);
    this.persist();
    return newPost;
  }

  public updatePost(id: string, updated: Partial<BlogPost>): BlogPost | null {
    const db = this.ensureDataFile();
    const idx = db.posts.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    db.posts[idx] = { ...db.posts[idx], ...updated };
    this.persist();
    return db.posts[idx];
  }

  public deletePost(id: string): boolean {
    const db = this.ensureDataFile();
    const beforeLen = db.posts.length;
    db.posts = db.posts.filter((p) => p.id !== id);
    if (db.posts.length !== beforeLen) {
      this.persist();
      return true;
    }
    return false;
  }

  // --- PROJECTS ---
  public getProjects(): Project[] {
    return this.ensureDataFile().projects;
  }

  public getProject(id: string): Project | undefined {
    return this.ensureDataFile().projects.find((p) => p.id === id);
  }

  public createProject(project: Omit<Project, 'id'> & { id?: string }): Project {
    const db = this.ensureDataFile();
    const newProject: Project = {
      ...project,
      id: project.id || `proj-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    };
    db.projects.unshift(newProject);
    this.persist();
    return newProject;
  }

  public updateProject(id: string, updated: Partial<Project>): Project | null {
    const db = this.ensureDataFile();
    const idx = db.projects.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    db.projects[idx] = { ...db.projects[idx], ...updated };
    this.persist();
    return db.projects[idx];
  }

  public deleteProject(id: string): boolean {
    const db = this.ensureDataFile();
    const beforeLen = db.projects.length;
    db.projects = db.projects.filter((p) => p.id !== id);
    if (db.projects.length !== beforeLen) {
      this.persist();
      return true;
    }
    return false;
  }

  // --- PRODUCTS ---
  public getProducts(): Product[] {
    return this.ensureDataFile().products;
  }

  public getProduct(id: string): Product | undefined {
    return this.ensureDataFile().products.find((p) => p.id === id);
  }

  public createProduct(product: Omit<Product, 'id'> & { id?: string }): Product {
    const db = this.ensureDataFile();
    const newProduct: Product = {
      ...product,
      id: product.id || `prod-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    };
    db.products.push(newProduct);
    this.persist();
    return newProduct;
  }

  public updateProduct(id: string, updated: Partial<Product>): Product | null {
    const db = this.ensureDataFile();
    const idx = db.products.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    db.products[idx] = { ...db.products[idx], ...updated };
    this.persist();
    return db.products[idx];
  }

  public deleteProduct(id: string): boolean {
    const db = this.ensureDataFile();
    const beforeLen = db.products.length;
    db.products = db.products.filter((p) => p.id !== id);
    if (db.products.length !== beforeLen) {
      this.persist();
      return true;
    }
    return false;
  }

  // --- CONTACTS ---
  public getContacts(): ContactInquiry[] {
    return this.ensureDataFile().contacts;
  }

  public createContact(inquiry: Omit<ContactInquiry, 'id' | 'createdAt' | 'status'>): ContactInquiry {
    const db = this.ensureDataFile();
    const newContact: ContactInquiry = {
      ...inquiry,
      id: `inq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    db.contacts.unshift(newContact);
    this.persist();
    return newContact;
  }

  public updateContact(id: string, updated: Partial<ContactInquiry>): ContactInquiry | null {
    const db = this.ensureDataFile();
    const idx = db.contacts.findIndex((c) => c.id === id);
    if (idx === -1) return null;
    db.contacts[idx] = { ...db.contacts[idx], ...updated };
    this.persist();
    return db.contacts[idx];
  }

  public deleteContact(id: string): boolean {
    const db = this.ensureDataFile();
    const beforeLen = db.contacts.length;
    db.contacts = db.contacts.filter((c) => c.id !== id);
    if (db.contacts.length !== beforeLen) {
      this.persist();
      return true;
    }
    return false;
  }

  // --- SUBSCRIBERS ---
  public getSubscribers(): NewsletterSubscriber[] {
    return this.ensureDataFile().subscribers;
  }

  public addSubscriber(email: string, source: string = 'website'): { subscriber: NewsletterSubscriber; isNew: boolean } {
    const db = this.ensureDataFile();
    const existing = db.subscribers.find((s) => s.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      if (!existing.active) {
        existing.active = true;
        this.persist();
      }
      return { subscriber: existing, isNew: false };
    }

    const newSub: NewsletterSubscriber = {
      id: `sub-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      email: email.trim().toLowerCase(),
      source,
      subscribedAt: new Date().toISOString(),
      active: true,
    };
    db.subscribers.unshift(newSub);
    this.persist();
    return { subscriber: newSub, isNew: true };
  }

  public removeSubscriber(idOrEmail: string): boolean {
    const db = this.ensureDataFile();
    const beforeLen = db.subscribers.length;
    db.subscribers = db.subscribers.filter(
      (s) => s.id !== idOrEmail && s.email.toLowerCase() !== idOrEmail.toLowerCase()
    );
    if (db.subscribers.length !== beforeLen) {
      this.persist();
      return true;
    }
    return false;
  }

  // --- ORDERS ---
  public getOrders(): Order[] {
    return this.ensureDataFile().orders;
  }

  public createOrder(orderInput: Omit<Order, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }): Order {
    const db = this.ensureDataFile();
    const newOrder: Order = {
      ...orderInput,
      id: orderInput.id || `ORD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    db.orders.unshift(newOrder);

    // If order used an access code, increment used count
    if (newOrder.appliedCode) {
      const codeObj = db.accessCodes.find(
        (c) => c.code.toUpperCase() === newOrder.appliedCode?.toUpperCase()
      );
      if (codeObj) {
        codeObj.usedCount = (codeObj.usedCount || 0) + 1;
      }
    }

    this.persist();
    return newOrder;
  }

  public updateOrderStatus(id: string, paymentStatus: Order['paymentStatus'], notes?: string): Order | null {
    const db = this.ensureDataFile();
    const order = db.orders.find((o) => o.id === id);
    if (!order) return null;
    order.paymentStatus = paymentStatus;
    if (notes) order.notes = notes;
    order.updatedAt = new Date().toISOString();
    this.persist();
    return order;
  }

  // --- ACCESS CODES ---
  public getAccessCodes(): AccessCode[] {
    return this.ensureDataFile().accessCodes;
  }

  public createAccessCode(code: Omit<AccessCode, 'id' | 'createdAt' | 'usedCount'> & { id?: string }): AccessCode {
    const db = this.ensureDataFile();
    const newCode: AccessCode = {
      ...code,
      id: code.id || `code-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      code: code.code.trim().toUpperCase(),
      createdAt: new Date().toISOString(),
      usedCount: 0,
      isActive: code.isActive !== undefined ? code.isActive : true,
    };
    db.accessCodes.unshift(newCode);
    this.persist();
    return newCode;
  }

  public updateAccessCode(id: string, updated: Partial<AccessCode>): AccessCode | null {
    const db = this.ensureDataFile();
    const idx = db.accessCodes.findIndex((c) => c.id === id);
    if (idx === -1) return null;
    db.accessCodes[idx] = { ...db.accessCodes[idx], ...updated };
    if (updated.code) {
      db.accessCodes[idx].code = updated.code.trim().toUpperCase();
    }
    this.persist();
    return db.accessCodes[idx];
  }

  public deleteAccessCode(id: string): boolean {
    const db = this.ensureDataFile();
    const beforeLen = db.accessCodes.length;
    db.accessCodes = db.accessCodes.filter((c) => c.id !== id);
    if (db.accessCodes.length !== beforeLen) {
      this.persist();
      return true;
    }
    return false;
  }

  public verifyAccessCode(inputCode: string): {
    isValid: boolean;
    codeObj?: AccessCode;
    errorMessage?: string;
  } {
    const clean = (inputCode || '').trim().toUpperCase();
    if (!clean) {
      return { isValid: false, errorMessage: 'Mã truy cập trống' };
    }

    const db = this.ensureDataFile();
    const found = db.accessCodes.find((c) => c.code.toUpperCase() === clean);

    if (!found) {
      return { isValid: false, errorMessage: 'Mã không tồn tại trên hệ thống' };
    }

    if (!found.isActive) {
      return { isValid: false, errorMessage: 'Mã ưu đãi này hiện đã bị tạm ngưng', codeObj: found };
    }

    const today = new Date().toISOString().split('T')[0];
    if (found.validFrom && found.validFrom > today) {
      return { isValid: false, errorMessage: `Mã chưa có hiệu lực (bắt đầu từ ${found.validFrom})`, codeObj: found };
    }

    if (found.hasExpiry && found.validUntil && found.validUntil < today) {
      return { isValid: false, errorMessage: `Mã đã hết hạn sử dụng vào ngày ${found.validUntil}`, codeObj: found };
    }

    if (found.maxUsage > 0 && found.usedCount >= found.maxUsage) {
      return { isValid: false, errorMessage: 'Mã đã đạt giới hạn lượt sử dụng tối đa', codeObj: found };
    }

    return { isValid: true, codeObj: found };
  }

  // --- PROFILE ---
  public getProfile(): ExecutiveProfileData {
    return this.ensureDataFile().profile;
  }

  public updateProfile(updated: Partial<ExecutiveProfileData>): ExecutiveProfileData {
    const db = this.ensureDataFile();
    db.profile = { ...db.profile, ...updated };
    this.persist();
    return db.profile;
  }

  // --- SEO ---
  public getSEO(): SEOSettings {
    return this.ensureDataFile().seo;
  }

  public updateSEO(updated: Partial<SEOSettings>): SEOSettings {
    const db = this.ensureDataFile();
    db.seo = { ...db.seo, ...updated };
    this.persist();
    return db.seo;
  }

  // --- MARKETING & PROMOTION ---
  public getPromoBanner(): PromoBannerConfig {
    return this.ensureDataFile().promoBanner;
  }

  public updatePromoBanner(updated: Partial<PromoBannerConfig>): PromoBannerConfig {
    const db = this.ensureDataFile();
    db.promoBanner = { ...db.promoBanner, ...updated };
    this.persist();
    return db.promoBanner;
  }

  public getUTMLinks(): UTMCampaignLink[] {
    return this.ensureDataFile().utmLinks;
  }

  public createUTMLink(link: Omit<UTMCampaignLink, 'id' | 'clicksCount' | 'conversionsCount' | 'createdAt'> & { id?: string }): UTMCampaignLink {
    const db = this.ensureDataFile();
    const newLink: UTMCampaignLink = {
      ...link,
      id: link.id || `utm-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      clicksCount: 0,
      conversionsCount: 0,
      createdAt: new Date().toISOString(),
    };
    db.utmLinks.unshift(newLink);
    this.persist();
    return newLink;
  }

  public updateUTMLink(id: string, updated: Partial<UTMCampaignLink>): UTMCampaignLink | null {
    const db = this.ensureDataFile();
    const idx = db.utmLinks.findIndex((l) => l.id === id);
    if (idx === -1) return null;
    db.utmLinks[idx] = { ...db.utmLinks[idx], ...updated };
    this.persist();
    return db.utmLinks[idx];
  }

  public deleteUTMLink(id: string): boolean {
    const db = this.ensureDataFile();
    const beforeLen = db.utmLinks.length;
    db.utmLinks = db.utmLinks.filter((l) => l.id !== id);
    if (db.utmLinks.length !== beforeLen) {
      this.persist();
      return true;
    }
    return false;
  }

  public recordUTMClick(idOrSource: string): boolean {
    const db = this.ensureDataFile();
    const link = db.utmLinks.find((l) => l.id === idOrSource || l.utmSource === idOrSource);
    if (link) {
      link.clicksCount = (link.clicksCount || 0) + 1;
      this.persist();
      return true;
    }
    return false;
  }

  public getCampaigns(): BroadcastCampaign[] {
    return this.ensureDataFile().campaigns;
  }

  public createCampaign(campaign: Omit<BroadcastCampaign, 'id'> & { id?: string }): BroadcastCampaign {
    const db = this.ensureDataFile();
    const newCamp: BroadcastCampaign = {
      ...campaign,
      id: campaign.id || `camp-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    };
    db.campaigns.unshift(newCamp);
    this.persist();
    return newCamp;
  }

  public getLeadMagnets(): LeadMagnetConfig[] {
    return this.ensureDataFile().leadMagnets;
  }

  public updateLeadMagnet(id: string, updated: Partial<LeadMagnetConfig>): LeadMagnetConfig | null {
    const db = this.ensureDataFile();
    const idx = db.leadMagnets.findIndex((lm) => lm.id === id);
    if (idx === -1) return null;
    db.leadMagnets[idx] = { ...db.leadMagnets[idx], ...updated };
    this.persist();
    return db.leadMagnets[idx];
  }

  public recordLeadDownload(id: string): boolean {
    const db = this.ensureDataFile();
    const lm = db.leadMagnets.find((item) => item.id === id);
    if (lm) {
      lm.downloadsCount = (lm.downloadsCount || 0) + 1;
      this.persist();
      return true;
    }
    return false;
  }

  // --- STATS & SYSTEM ---
  public getStats() {
    const db = this.ensureDataFile();
    const totalOrderValue = db.orders
      .filter((o) => o.paymentStatus === 'completed')
      .reduce((sum, o) => sum + o.total, 0);

    return {
      postsCount: db.posts.length,
      projectsCount: db.projects.length,
      productsCount: db.products.length,
      contactsCount: db.contacts.length,
      newContactsCount: db.contacts.filter((c) => c.status === 'new').length,
      subscribersCount: db.subscribers.filter((s) => s.active).length,
      ordersCount: db.orders.length,
      completedOrdersCount: db.orders.filter((o) => o.paymentStatus === 'completed').length,
      totalOrderRevenueUsd: totalOrderValue,
      accessCodesCount: db.accessCodes.length,
      activeAccessCodesCount: db.accessCodes.filter((c) => c.isActive).length,
      utmLinksCount: db.utmLinks?.length || 0,
      campaignsCount: db.campaigns?.length || 0,
      lastUpdated: db.updatedAt,
      version: db.version,
    };
  }

  // --- BACKUP & RESTORE ---
  public exportData(): DatabaseSchema {
    return this.ensureDataFile();
  }

  public importData(newData: Partial<DatabaseSchema>): boolean {
    const db = this.ensureDataFile();
    this.cache = {
      ...db,
      ...newData,
      updatedAt: new Date().toISOString(),
    };
    this.persist();
    return true;
  }

  public resetToDefault(): DatabaseSchema {
    this.cache = {
      version: '2.0.0',
      profile: EXECUTIVE_PROFILE,
      posts: BLOG_POSTS,
      projects: PROJECTS,
      products: PRODUCTS,
      contacts: INITIAL_CONTACTS,
      subscribers: INITIAL_SUBSCRIBERS,
      orders: INITIAL_ORDERS,
      accessCodes: INITIAL_ACCESS_CODES,
      seo: INITIAL_SEO,
      blogCategories: ['Tất cả', 'Kinh tế', 'Giáo dục', 'Công nghệ'],
      shopCategories: ['Tất cả', 'Công cụ số', 'Khóa học', 'Sách'],
      promoBanner: INITIAL_PROMO_BANNER,
      utmLinks: INITIAL_UTM_LINKS,
      campaigns: INITIAL_CAMPAIGNS,
      leadMagnets: INITIAL_LEAD_MAGNETS,
      updatedAt: new Date().toISOString(),
    };
    this.persist();
    return this.cache;
  }
}

export const db = new Database();
