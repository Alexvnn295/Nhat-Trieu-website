import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  BlogPost,
  Project,
  Product,
  ContactInquiry,
  ContactStatus,
  SEOSettings,
  AccessCode,
  CodeValidationResult,
  CartItem,
  Order,
  NewsletterSubscriber,
  PromoBannerConfig,
  UTMCampaignLink,
  BroadcastCampaign,
  LeadMagnetConfig,
} from '../types';
import { BLOG_POSTS, PROJECTS, PRODUCTS, INITIAL_CONTACTS } from '../data/mockData';
import { EXECUTIVE_PROFILE, ExecutiveProfileData, PERSONAL_PORTRAITS } from '../data/profileData';
import { INITIAL_ACCESS_CODES } from '../data/accessCodesData';

interface DataContextType {
  // Profile & General Content
  profile: ExecutiveProfileData;
  updateProfile: (updated: Partial<ExecutiveProfileData>) => void;

  // Blog Posts CRUD
  posts: BlogPost[];
  addPost: (post: Omit<BlogPost, 'id'> & { id?: string }) => void;
  updatePost: (id: string, updated: Partial<BlogPost>) => void;
  deletePost: (id: string) => void;

  // Shop Products CRUD
  products: Product[];
  addProduct: (product: Omit<Product, 'id'> & { id?: string }) => void;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Portfolio Projects CRUD
  projects: Project[];
  addProject: (project: Omit<Project, 'id'> & { id?: string }) => void;
  updateProject: (id: string, updated: Partial<Project>) => void;
  deleteProject: (id: string) => void;

  // Contacts & Inquiries
  contacts: ContactInquiry[];
  addContactInquiry: (inquiry: Omit<ContactInquiry, 'id' | 'createdAt' | 'status'>) => void;
  updateContactStatus: (id: string, status: ContactStatus, notes?: string) => void;
  deleteContact: (id: string) => void;

  // Orders Management
  orders: Order[];
  updateOrderStatus: (id: string, paymentStatus: Order['paymentStatus'], notes?: string) => Promise<boolean>;
  deleteOrder: (id: string) => Promise<boolean>;

  // Subscribers Management
  subscribers: NewsletterSubscriber[];
  deleteSubscriber: (idOrEmail: string) => Promise<boolean>;

  // Marketing & Promotional Tools
  promoBanner: PromoBannerConfig;
  updatePromoBanner: (updated: Partial<PromoBannerConfig>) => Promise<boolean>;
  utmLinks: UTMCampaignLink[];
  createUTMLink: (link: Omit<UTMCampaignLink, 'id' | 'clicksCount' | 'conversionsCount' | 'createdAt'>) => Promise<boolean>;
  updateUTMLink: (id: string, updated: Partial<UTMCampaignLink>) => Promise<boolean>;
  deleteUTMLink: (id: string) => Promise<boolean>;
  campaigns: BroadcastCampaign[];
  sendBroadcastCampaign: (campaign: Omit<BroadcastCampaign, 'id'>) => Promise<{ success: boolean; message?: string }>;
  leadMagnets: LeadMagnetConfig[];
  updateLeadMagnet: (id: string, updated: Partial<LeadMagnetConfig>) => Promise<boolean>;
  recordLeadDownload: (id: string) => Promise<boolean>;

  // SEO & Metadata Settings
  seoSettings: SEOSettings;
  updateSEOSettings: (settings: Partial<SEOSettings>) => void;

  // Categories
  blogCategories: string[];
  shopCategories: string[];
  addShopCategory: (category: string) => void;
  addBlogCategory: (category: string) => void;

  // Access Codes & Permissions Management (Admin Configured)
  accessCodes: AccessCode[];
  addAccessCode: (code: Omit<AccessCode, 'id' | 'createdAt' | 'usedCount'> & { id?: string }) => void;
  updateAccessCode: (id: string, updated: Partial<AccessCode>) => void;
  deleteAccessCode: (id: string) => void;
  toggleAccessCodeStatus: (id: string) => void;
  extendAccessCodeExpiry: (id: string, daysToAdd: number) => void;
  verifyAndApplyCode: (inputCode: string, items?: CartItem[]) => CodeValidationResult;
  verifyPortfolioCode: (inputCode: string) => { isValid: boolean; errorMessage?: string; codeObj?: AccessCode };
  recordCodeUsage: (codeString: string) => void;

  // Reset & Backup
  resetAllData: () => void;
  exportDataJSON: () => string;
  importDataJSON: (jsonStr: string) => { success: boolean; error?: string };

  // Admin Auth State
  isAdminAuthenticated: boolean;
  loginAdmin: (pin: string) => boolean;
  logoutAdmin: () => void;

  // Backend Integration & Synchronization
  backendConnected: boolean;
  backendStats: any;
  refreshBackendData: () => Promise<void>;
  submitOrder: (orderInput: any) => Promise<{ success: boolean; data?: any; error?: string; message?: string }>;
  subscribeNewsletter: (email: string, source?: string) => Promise<{ success: boolean; message?: string; error?: string }>;
  askAIAdvisor: (message: string) => Promise<{ success: boolean; reply: string; source?: string }>;
}

const STORAGE_KEYS = {
  PROFILE: 'cnd_admin_profile_v2',
  POSTS: 'cnd_admin_posts_v2',
  PRODUCTS: 'cnd_admin_products_v2',
  PROJECTS: 'cnd_admin_projects_v2',
  CONTACTS: 'cnd_admin_contacts_v2',
  SEO: 'cnd_admin_seo_v2',
  CATEGORIES_SHOP: 'cnd_admin_cats_shop_v2',
  CATEGORIES_BLOG: 'cnd_admin_cats_blog_v2',
  ACCESS_CODES: 'cnd_admin_access_codes_v2',
  ADMIN_AUTH: 'cnd_admin_auth_v2',
};

const DEFAULT_SEO: SEOSettings = {
  title: 'Cao Nguyễn Nhật Triều | Executive Profile - Strategy, Tech & AI Consultant',
  description: 'Hồ sơ năng lực chuyên gia Cao Nguyễn Nhật Triều - Hơn 15 năm kinh nghiệm về Chiến lược, Vận hành thương mại, Phát triển EdTech, AI và Chuyển đổi số.',
  keywords: 'Cao Nguyễn Nhật Triều, Chuyên gia AI, Tư vấn chiến lược, EdTech, FinTech, Chuyển đổi số, Kiosk Y tế, Qualcomm TOP AI, SME Consulting',
  author: 'Cao Nguyễn Nhật Triều',
  geoRegion: 'VN-SG',
  geoPlaceName: 'Ho Chi Minh City',
  ogImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpj_SV1Ro3r0D--0-kXN9L-DV5eiPGXagqpe0SvyxCKNMLG4EPhDBOa9QotfnQxqRE8Eq9THRWmuHb_Tz9C1NCUk7M07Fwy2CjxEKDrXbBN2TM1aqOrDPNevYyM3qiFb8TuU-WeXOTub23rOII68XXld3LgMjITEDiOlDLZnCj6rtzwyYYFnf03ppgNF4jO00CFzgySjSrnIhGaTOHC-plm2b6tXa62GC3-TlyGXvhaX1Ad9M-H3MBVQ',
};

const DEFAULT_SHOP_CATEGORIES = ['Tất cả', 'Tư vấn', 'Khóa học', 'Công cụ số', 'Sách'];
const DEFAULT_BLOG_CATEGORIES = ['Tất cả', 'Kinh tế', 'Giáo dục', 'Công nghệ', 'AI', 'Chiến lược'];

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 1. Profile State
  const [profile, setProfile] = useState<ExecutiveProfileData>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          // If stored avatarUrl was an old stock photo or outdated version, sanitize and upgrade it
          if (
            !parsed.avatarUrl ||
            parsed.avatarUrl.includes('unsplash') ||
            parsed.avatarUrl.includes('AB6AXuBLETyQoA2X') ||
            parsed.avatarUrl.includes('GRU02105') ||
            parsed.avatarUrl === '/images/profile/GRU02101.JPG' ||
            parsed.avatarUrl.startsWith('/images/profile/GRU02101.JPG?v=')
          ) {
            parsed.avatarUrl = '/images/profile/GRU02101.JPG?v=4';
          }
          if (!parsed.activePhotoId || parsed.activePhotoId === 'custom-avatar') {
            parsed.activePhotoId = 'photo-01';
          }
          if (parsed.personalPortraits && Array.isArray(parsed.personalPortraits)) {
            // Keep custom user uploads (data: or custom-), but refresh default studio portraits to use new real photos & reliable fallbacks
            parsed.personalPortraits = PERSONAL_PORTRAITS.map((dp) => {
              const existing = parsed.personalPortraits.find((p: any) => p.id === dp.id);
              if (existing && existing.url && existing.url.startsWith('data:')) {
                return {
                  ...dp,
                  url: existing.url,
                  fallbackUrl: dp.fallbackUrl,
                };
              }
              return dp;
            });
          } else {
            parsed.personalPortraits = PERSONAL_PORTRAITS;
          }
          return { ...EXECUTIVE_PROFILE, ...parsed };
        } catch (e) {
          console.error('Failed to parse stored profile:', e);
        }
      }
    }
    return EXECUTIVE_PROFILE;
  });

  // 2. Posts State
  const [posts, setPosts] = useState<BlogPost[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEYS.POSTS);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          console.error('Failed to parse stored posts:', e);
        }
      }
    }
    return BLOG_POSTS;
  });

  // 3. Products State
  const [products, setProducts] = useState<Product[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            const storedIds = new Set(parsed.map((p: Product) => p.id));
            const missing = PRODUCTS.filter((p) => !storedIds.has(p.id));
            if (missing.length > 0) {
              return [...parsed, ...missing];
            }
            return parsed;
          }
        } catch (e) {
          console.error('Failed to parse stored products:', e);
        }
      }
    }
    return PRODUCTS;
  });

  // 4. Projects State
  const [projects, setProjects] = useState<Project[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          console.error('Failed to parse stored projects:', e);
        }
      }
    }
    return PROJECTS;
  });

  // 5. Contacts State
  const [contacts, setContacts] = useState<ContactInquiry[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEYS.CONTACTS);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          console.error('Failed to parse stored contacts:', e);
        }
      }
    }
    return INITIAL_CONTACTS;
  });

  // 6. SEO Settings
  const [seoSettings, setSeoSettings] = useState<SEOSettings>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEYS.SEO);
      if (stored) {
        try {
          return { ...DEFAULT_SEO, ...JSON.parse(stored) };
        } catch (e) {
          console.error('Failed to parse stored SEO:', e);
        }
      }
    }
    return DEFAULT_SEO;
  });

  // 7. Categories
  const [shopCategories, setShopCategories] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEYS.CATEGORIES_SHOP);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          console.error('Failed to parse stored shop categories:', e);
        }
      }
    }
    return DEFAULT_SHOP_CATEGORIES;
  });

  const [blogCategories, setBlogCategories] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEYS.CATEGORIES_BLOG);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          console.error('Failed to parse stored blog categories:', e);
        }
      }
    }
    return DEFAULT_BLOG_CATEGORIES;
  });

  // 8. Access Codes & Permissions State (Managed in Admin Portal)
  const [accessCodes, setAccessCodes] = useState<AccessCode[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEYS.ACCESS_CODES);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        } catch (e) {
          console.error('Failed to parse stored access codes:', e);
        }
      }
    }
    return INITIAL_ACCESS_CODES;
  });

  // 9. Admin Auth
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
    }
    return false;
  });

  // 10. Backend Integration State
  const [backendConnected, setBackendConnected] = useState<boolean>(false);
  const [backendStats, setBackendStats] = useState<any>(null);

  // 11. Orders & Subscribers State
  const [orders, setOrders] = useState<Order[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);

  // 12. Marketing & Promotional Tools State
  const [promoBanner, setPromoBanner] = useState<PromoBannerConfig>({
    enabled: true,
    badge: 'MỚI XUẤT BẢN',
    textVi: 'Báo cáo Chiến lược AI & Chuyển đổi số Doanh nghiệp 2026 đã sẵn sàng!',
    textEn: 'Special Executive Brief: AI & Enterprise Transformation 2026 is released!',
    ctaTextVi: 'Khám Phá Ngay',
    ctaTextEn: 'Read Now',
    targetTab: 'blog',
    theme: 'emerald',
  });
  const [utmLinks, setUtmLinks] = useState<UTMCampaignLink[]>([]);
  const [campaigns, setCampaigns] = useState<BroadcastCampaign[]>([]);
  const [leadMagnets, setLeadMagnets] = useState<LeadMagnetConfig[]>([]);

  const refreshBackendData = async () => {
    try {
      const healthRes = await fetch('/api/health');
      if (healthRes.ok) {
        const healthData = await healthRes.json();
        setBackendConnected(true);
        setBackendStats(healthData.stats || null);

        // Synchronize all collections from server
        const [postsRes, projsRes, prodsRes, contactsRes, codesRes, profRes, seoRes, ordersRes, subsRes, mktRes] =
          await Promise.allSettled([
            fetch('/api/posts').then((r) => r.json()),
            fetch('/api/projects').then((r) => r.json()),
            fetch('/api/products').then((r) => r.json()),
            fetch('/api/contacts').then((r) => r.json()),
            fetch('/api/access-codes').then((r) => r.json()),
            fetch('/api/profile').then((r) => r.json()),
            fetch('/api/seo').then((r) => r.json()),
            fetch('/api/orders').then((r) => r.json()),
            fetch('/api/newsletter').then((r) => r.json()),
            fetch('/api/marketing').then((r) => r.json()),
          ]);

        if (postsRes.status === 'fulfilled' && postsRes.value?.success && Array.isArray(postsRes.value.data)) {
          setPosts(postsRes.value.data);
        }
        if (projsRes.status === 'fulfilled' && projsRes.value?.success && Array.isArray(projsRes.value.data)) {
          setProjects(projsRes.value.data);
        }
        if (prodsRes.status === 'fulfilled' && prodsRes.value?.success && Array.isArray(prodsRes.value.data)) {
          setProducts(prodsRes.value.data);
        }
        if (contactsRes.status === 'fulfilled' && contactsRes.value?.success && Array.isArray(contactsRes.value.data)) {
          setContacts(contactsRes.value.data);
        }
        if (codesRes.status === 'fulfilled' && codesRes.value?.success && Array.isArray(codesRes.value.data)) {
          setAccessCodes(codesRes.value.data);
        }
        if (profRes.status === 'fulfilled' && profRes.value?.success && profRes.value.data) {
          setProfile(profRes.value.data);
        }
        if (seoRes.status === 'fulfilled' && seoRes.value?.success && seoRes.value.data) {
          setSeoSettings(seoRes.value.data);
        }
        if (ordersRes.status === 'fulfilled' && ordersRes.value?.success && Array.isArray(ordersRes.value.data)) {
          setOrders(ordersRes.value.data);
        }
        if (subsRes.status === 'fulfilled' && subsRes.value?.success && Array.isArray(subsRes.value.data)) {
          setSubscribers(subsRes.value.data);
        }
        if (mktRes.status === 'fulfilled' && mktRes.value?.success && mktRes.value.data) {
          const m = mktRes.value.data;
          if (m.promoBanner) setPromoBanner(m.promoBanner);
          if (Array.isArray(m.utmLinks)) setUtmLinks(m.utmLinks);
          if (Array.isArray(m.campaigns)) setCampaigns(m.campaigns);
          if (Array.isArray(m.leadMagnets)) setLeadMagnets(m.leadMagnets);
        }
      } else {
        setBackendConnected(false);
      }
    } catch {
      setBackendConnected(false);
    }
  };

  useEffect(() => {
    refreshBackendData();
  }, []);

  // Persist handlers
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    }
  }, [profile]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
    }
  }, [posts]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    }
  }, [products]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    }
  }, [projects]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(contacts));
    }
  }, [contacts]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.SEO, JSON.stringify(seoSettings));
    }
  }, [seoSettings]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES_SHOP, JSON.stringify(shopCategories));
    }
  }, [shopCategories]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES_BLOG, JSON.stringify(blogCategories));
    }
  }, [blogCategories]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.ACCESS_CODES, JSON.stringify(accessCodes));
    }
  }, [accessCodes]);

  // Methods
  const updateProfile = (updated: Partial<ExecutiveProfileData>) => {
    setProfile((prev) => ({ ...prev, ...updated }));
    fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    }).catch((err) => console.warn('[DataContext] Backend updateProfile fallback:', err.message));
  };

  const addPost = (postData: Omit<BlogPost, 'id'> & { id?: string }) => {
    const id = postData.id || `post-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    const newPost: BlogPost = { ...postData, id };
    setPosts((prev) => [newPost, ...prev]);
    fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPost),
    }).catch((err) => console.warn('[DataContext] Backend addPost fallback:', err.message));
  };

  const updatePost = (id: string, updated: Partial<BlogPost>) => {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));
    fetch(`/api/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    }).catch((err) => console.warn('[DataContext] Backend updatePost fallback:', err.message));
  };

  const deletePost = (id: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
    fetch(`/api/posts/${id}`, { method: 'DELETE' }).catch((err) =>
      console.warn('[DataContext] Backend deletePost fallback:', err.message)
    );
  };

  const addProduct = (prodData: Omit<Product, 'id'> & { id?: string }) => {
    const id = prodData.id || `prod-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    const newProd: Product = { ...prodData, id };
    setProducts((prev) => [newProd, ...prev]);
    fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProd),
    }).catch((err) => console.warn('[DataContext] Backend addProduct fallback:', err.message));
  };

  const updateProduct = (id: string, updated: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));
    fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    }).catch((err) => console.warn('[DataContext] Backend updateProduct fallback:', err.message));
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    fetch(`/api/products/${id}`, { method: 'DELETE' }).catch((err) =>
      console.warn('[DataContext] Backend deleteProduct fallback:', err.message)
    );
  };

  const addProject = (projData: Omit<Project, 'id'> & { id?: string }) => {
    const id = projData.id || `proj-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    const newProj: Project = { ...projData, id };
    setProjects((prev) => [newProj, ...prev]);
    fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProj),
    }).catch((err) => console.warn('[DataContext] Backend addProject fallback:', err.message));
  };

  const updateProject = (id: string, updated: Partial<Project>) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));
    fetch(`/api/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    }).catch((err) => console.warn('[DataContext] Backend updateProject fallback:', err.message));
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    fetch(`/api/projects/${id}`, { method: 'DELETE' }).catch((err) =>
      console.warn('[DataContext] Backend deleteProject fallback:', err.message)
    );
  };

  const addContactInquiry = (inquiry: Omit<ContactInquiry, 'id' | 'createdAt' | 'status'>) => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
      now.getDate()
    ).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newInquiry: ContactInquiry = {
      ...inquiry,
      id: `inq-${Date.now()}`,
      createdAt: formattedDate,
      status: 'new',
    };
    setContacts((prev) => [newInquiry, ...prev]);
    fetch('/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inquiry),
    }).catch((err) => console.warn('[DataContext] Backend addContactInquiry fallback:', err.message));
  };

  const updateContactStatus = (id: string, status: ContactStatus, notes?: string) => {
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status, ...(notes !== undefined ? { notes } : {}) } : c))
    );
    fetch(`/api/contacts/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, notes }),
    }).catch((err) => console.warn('[DataContext] Backend updateContactStatus fallback:', err.message));
  };

  const deleteContact = (id: string) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
    fetch(`/api/contacts/${id}`, { method: 'DELETE' }).catch((err) =>
      console.warn('[DataContext] Backend deleteContact fallback:', err.message)
    );
  };

  const updateSEOSettings = (settings: Partial<SEOSettings>) => {
    setSeoSettings((prev) => ({ ...prev, ...settings }));
    fetch('/api/seo', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    }).catch((err) => console.warn('[DataContext] Backend updateSEOSettings fallback:', err.message));
  };

  const addShopCategory = (category: string) => {
    if (!shopCategories.includes(category)) {
      setShopCategories((prev) => [...prev, category]);
    }
  };

  const addBlogCategory = (category: string) => {
    if (!blogCategories.includes(category)) {
      setBlogCategories((prev) => [...prev, category]);
    }
  };

  // Access Codes CRUD & Actions
  const addAccessCode = (codeData: Omit<AccessCode, 'id' | 'createdAt' | 'usedCount'> & { id?: string }) => {
    const id = codeData.id || `code-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    const newCode: AccessCode = {
      ...codeData,
      id,
      code: codeData.code.trim().toUpperCase(),
      usedCount: 0,
      createdAt: new Date().toISOString(),
    };
    setAccessCodes((prev) => [newCode, ...prev]);
    fetch('/api/access-codes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCode),
    }).catch((err) => console.warn('[DataContext] Backend addAccessCode fallback:', err.message));
  };

  const updateAccessCode = (id: string, updated: Partial<AccessCode>) => {
    setAccessCodes((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const formattedCode = updated.code ? updated.code.trim().toUpperCase() : c.code;
          return { ...c, ...updated, code: formattedCode };
        }
        return c;
      })
    );
    fetch(`/api/access-codes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    }).catch((err) => console.warn('[DataContext] Backend updateAccessCode fallback:', err.message));
  };

  const deleteAccessCode = (id: string) => {
    setAccessCodes((prev) => prev.filter((c) => c.id !== id));
    fetch(`/api/access-codes/${id}`, { method: 'DELETE' }).catch((err) =>
      console.warn('[DataContext] Backend deleteAccessCode fallback:', err.message)
    );
  };

  const toggleAccessCodeStatus = (id: string) => {
    setAccessCodes((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    );
  };

  const extendAccessCodeExpiry = (id: string, daysToAdd: number) => {
    setAccessCodes((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          let baseDate = new Date();
          if (c.validUntil) {
            const parsed = new Date(c.validUntil);
            if (!isNaN(parsed.getTime()) && parsed > baseDate) {
              baseDate = parsed;
            }
          }
          baseDate.setDate(baseDate.getDate() + daysToAdd);
          const newDateStr = baseDate.toISOString().slice(0, 10);
          return { ...c, validUntil: newDateStr, hasExpiry: true, isActive: true };
        }
        return c;
      })
    );
  };

  // Verify and Apply dynamic code
  const verifyAndApplyCode = (inputCode: string, items?: CartItem[]): CodeValidationResult => {
    const cleanCode = inputCode.trim().toUpperCase();
    if (!cleanCode) {
      return {
        isValid: false,
        errorMessage: 'Vui lòng nhập mã code.',
        discountPercent: 0,
        discountAmountUsd: 0,
        isFullAccess: false,
        grantedPermissions: [],
        scope: 'all',
      };
    }

    const found = accessCodes.find((c) => c.code === cleanCode);
    if (!found) {
      return {
        isValid: false,
        errorMessage: 'Mã code không hợp lệ hoặc chưa được thiết lập trong hệ thống quản trị.',
        discountPercent: 0,
        discountAmountUsd: 0,
        isFullAccess: false,
        grantedPermissions: [],
        scope: 'all',
      };
    }

    if (!found.isActive) {
      return {
        isValid: false,
        codeObj: found,
        errorMessage: 'Mã code này hiện đang bị tạm khóa quyền hạn bởi Quản trị viên.',
        discountPercent: 0,
        discountAmountUsd: 0,
        isFullAccess: false,
        grantedPermissions: [],
        scope: found.scope,
      };
    }

    // Check expiration date
    if (found.hasExpiry && found.validUntil) {
      const todayStr = new Date().toISOString().slice(0, 10);
      if (found.validFrom && todayStr < found.validFrom) {
        return {
          isValid: false,
          codeObj: found,
          errorMessage: `Mã code này bắt đầu có hiệu lực từ ngày ${found.validFrom}.`,
          discountPercent: 0,
          discountAmountUsd: 0,
          isFullAccess: false,
          grantedPermissions: [],
          scope: found.scope,
        };
      }
      if (todayStr > found.validUntil) {
        return {
          isValid: false,
          codeObj: found,
          errorMessage: `Mã code đã hết thời gian hiệu lực vào ngày ${found.validUntil}. Vui lòng liên hệ Quản trị viên để gia hạn.`,
          discountPercent: 0,
          discountAmountUsd: 0,
          isFullAccess: false,
          grantedPermissions: [],
          scope: found.scope,
        };
      }
    }

    // Check usage limits
    if (found.maxUsage > 0 && found.usedCount >= found.maxUsage) {
      return {
        isValid: false,
        codeObj: found,
        errorMessage: `Mã code đã đạt giới hạn sử dụng tối đa (${found.maxUsage}/${found.maxUsage} lượt).`,
        discountPercent: 0,
        discountAmountUsd: 0,
        isFullAccess: false,
        grantedPermissions: [],
        scope: found.scope,
      };
    }

    // Check scope if items are provided
    if (items && items.length > 0 && found.scope !== 'all') {
      const hasMatchingCategory = items.some((item) => {
        const cat = item.product.category.toLowerCase();
        if (found.scope === 'tools') return cat.includes('công cụ') || cat.includes('tool') || cat.includes('digital');
        if (found.scope === 'courses') return cat.includes('khóa học') || cat.includes('course');
        if (found.scope === 'books') return cat.includes('sách') || cat.includes('book');
        return true;
      });

      if (!hasMatchingCategory) {
        const scopeLabels: Record<string, string> = {
          tools: 'Công cụ số',
          courses: 'Khóa học',
          books: 'Sách & Ấn phẩm',
        };
        return {
          isValid: false,
          codeObj: found,
          errorMessage: `Mã này chỉ áp dụng cho danh mục "${scopeLabels[found.scope] || found.scope}".`,
          discountPercent: 0,
          discountAmountUsd: 0,
          isFullAccess: false,
          grantedPermissions: [],
          scope: found.scope,
        };
      }
    }

    let discountPercent = 0;
    let isFullAccess = false;
    if (found.type === 'full_access') {
      discountPercent = 100;
      isFullAccess = true;
    } else if (found.type === 'discount_percent') {
      discountPercent = found.discountPercent || 0;
    } else if (found.type === 'special_privilege') {
      discountPercent = found.discountPercent || 0;
    }

    return {
      isValid: true,
      codeObj: found,
      discountPercent,
      discountAmountUsd: found.discountAmountUsd || 0,
      isFullAccess,
      grantedPermissions: found.permissions || [],
      scope: found.scope,
    };
  };

  const verifyPortfolioCode = (inputCode: string): { isValid: boolean; errorMessage?: string; codeObj?: AccessCode } => {
    const cleanCode = inputCode.trim().toUpperCase();
    if (!cleanCode) {
      return {
        isValid: false,
        errorMessage: 'Vui lòng nhập mã bảo mật cấp phép.',
      };
    }

    const found = accessCodes.find((c) => c.code === cleanCode);
    if (!found) {
      return {
        isValid: false,
        errorMessage: 'Mã bảo mật không chính xác hoặc chưa được kích hoạt trong hệ thống.',
      };
    }

    if (!found.isActive) {
      return {
        isValid: false,
        codeObj: found,
        errorMessage: 'Mã bảo mật này hiện đang bị tạm khóa quyền hạn bởi Quản trị viên.',
      };
    }

    // Check expiration
    if (found.hasExpiry && found.validUntil) {
      const todayStr = new Date().toISOString().slice(0, 10);
      if (found.validFrom && todayStr < found.validFrom) {
        return {
          isValid: false,
          codeObj: found,
          errorMessage: `Mã bảo mật có hiệu lực bắt đầu từ ngày ${found.validFrom}.`,
        };
      }
      if (todayStr > found.validUntil) {
        return {
          isValid: false,
          codeObj: found,
          errorMessage: `Mã bảo mật đã hết hạn vào ngày ${found.validUntil}. Vui lòng liên hệ Quản trị viên để gia hạn.`,
        };
      }
    }

    // Check usage limits
    if (found.maxUsage > 0 && found.usedCount >= found.maxUsage) {
      return {
        isValid: false,
        codeObj: found,
        errorMessage: `Mã bảo mật đã đạt giới hạn lượt sử dụng tối đa (${found.maxUsage}/${found.maxUsage} lượt).`,
      };
    }

    // Record code usage
    recordCodeUsage(cleanCode);

    return {
      isValid: true,
      codeObj: found,
    };
  };

  const recordCodeUsage = (codeString: string) => {
    const clean = codeString.trim().toUpperCase();
    setAccessCodes((prev) =>
      prev.map((c) => (c.code === clean ? { ...c, usedCount: (c.usedCount || 0) + 1 } : c))
    );
    fetch(`/api/access-codes/use/${encodeURIComponent(clean)}`, { method: 'POST' }).catch((err) =>
      console.warn('[DataContext] Backend recordCodeUsage fallback:', err.message)
    );
  };

  const submitOrder = async (orderInput: any) => {
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderInput),
      });
      const data = await res.json();
      return data;
    } catch (err: any) {
      return { success: false, error: err.message || 'Lỗi gửi đơn hàng lên máy chủ' };
    }
  };

  const subscribeNewsletter = async (email: string, source: string = 'website') => {
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
      });
      const data = await res.json();
      return data;
    } catch (err: any) {
      return { success: false, error: err.message || 'Lỗi đăng ký bản tin' };
    }
  };

  const askAIAdvisor = async (message: string) => {
    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      if (data.success && data.reply) {
        return { success: true, reply: data.reply, source: data.source };
      }
      return { success: false, reply: data.error || 'Lỗi phản hồi từ Cố vấn AI.', source: 'error' };
    } catch (err: any) {
      return { success: false, reply: 'Không thể kết nối đến máy chủ AI.', source: 'network_error' };
    }
  };

  const updateOrderStatus = async (id: string, paymentStatus: Order['paymentStatus'], notes?: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/orders/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentStatus, notes }),
      });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) =>
          prev.map((o) => (o.id === id ? { ...o, paymentStatus, notes: notes ?? o.notes, updatedAt: new Date().toISOString() } : o))
        );
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const deleteOrder = async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/orders/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) => prev.filter((o) => o.id !== id));
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const deleteSubscriber = async (idOrEmail: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/newsletter/${encodeURIComponent(idOrEmail)}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setSubscribers((prev) => prev.filter((s) => s.id !== idOrEmail && s.email !== idOrEmail));
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const updatePromoBanner = async (updated: Partial<PromoBannerConfig>): Promise<boolean> => {
    try {
      const res = await fetch('/api/marketing/promo-banner', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setPromoBanner(data.data);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const createUTMLink = async (link: Omit<UTMCampaignLink, 'id' | 'clicksCount' | 'conversionsCount' | 'createdAt'>): Promise<boolean> => {
    try {
      const res = await fetch('/api/marketing/utm-links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(link),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setUtmLinks((prev) => [data.data, ...prev]);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const updateUTMLink = async (id: string, updated: Partial<UTMCampaignLink>): Promise<boolean> => {
    try {
      const res = await fetch(`/api/marketing/utm-links/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setUtmLinks((prev) => prev.map((l) => (l.id === id ? data.data : l)));
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const deleteUTMLink = async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/marketing/utm-links/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setUtmLinks((prev) => prev.filter((l) => l.id !== id));
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const sendBroadcastCampaign = async (campaign: Omit<BroadcastCampaign, 'id'>): Promise<{ success: boolean; message?: string }> => {
    try {
      const res = await fetch('/api/marketing/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(campaign),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setCampaigns((prev) => [data.data, ...prev]);
        return { success: true, message: data.message };
      }
      return { success: false, message: data.error || 'Lỗi phát chiến dịch' };
    } catch (err: any) {
      return { success: false, message: err.message };
    }
  };

  const updateLeadMagnet = async (id: string, updated: Partial<LeadMagnetConfig>): Promise<boolean> => {
    try {
      const res = await fetch(`/api/marketing/lead-magnets/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setLeadMagnets((prev) => prev.map((lm) => (lm.id === id ? data.data : lm)));
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const recordLeadDownload = async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/marketing/lead-magnets/${id}/download`, { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setLeadMagnets((prev) =>
          prev.map((lm) => (lm.id === id ? { ...lm, downloadsCount: (lm.downloadsCount || 0) + 1 } : lm))
        );
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const resetAllData = () => {
    setProfile(EXECUTIVE_PROFILE);
    setPosts(BLOG_POSTS);
    setProducts(PRODUCTS);
    setProjects(PROJECTS);
    setContacts(INITIAL_CONTACTS);
    setSeoSettings(DEFAULT_SEO);
    setShopCategories(DEFAULT_SHOP_CATEGORIES);
    setBlogCategories(DEFAULT_BLOG_CATEGORIES);
    setAccessCodes(INITIAL_ACCESS_CODES);

    if (typeof window !== 'undefined') {
      Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
    }
    fetch('/api/admin/reset', { method: 'POST' }).catch((err) =>
      console.warn('[DataContext] Backend reset fallback:', err.message)
    );
  };

  const exportDataJSON = () => {
    const backup = {
      profile,
      posts,
      products,
      projects,
      contacts,
      seoSettings,
      shopCategories,
      blogCategories,
      accessCodes,
      exportedAt: new Date().toISOString(),
      version: '2.1.0',
    };
    return JSON.stringify(backup, null, 2);
  };

  const importDataJSON = (jsonStr: string) => {
    try {
      const data = JSON.parse(jsonStr);
      if (data.profile) setProfile(data.profile);
      if (Array.isArray(data.posts)) setPosts(data.posts);
      if (Array.isArray(data.products)) setProducts(data.products);
      if (Array.isArray(data.projects)) setProjects(data.projects);
      if (Array.isArray(data.contacts)) setContacts(data.contacts);
      if (data.seoSettings) setSeoSettings(data.seoSettings);
      if (Array.isArray(data.shopCategories)) setShopCategories(data.shopCategories);
      if (Array.isArray(data.blogCategories)) setBlogCategories(data.blogCategories);
      if (Array.isArray(data.accessCodes)) setAccessCodes(data.accessCodes);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Invalid JSON format' };
    }
  };

  const loginAdmin = (pin: string) => {
    // Standard secure admin PIN code or quick access
    // Accepts '123456', '888888', or user email prefix for flexible access
    if (['123456', '888888', 'trieucnn', 'admin'].includes(pin.trim())) {
      setIsAdminAuthenticated(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      }
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
    }
  };

  return (
    <DataContext.Provider
      value={{
        profile,
        updateProfile,
        posts,
        addPost,
        updatePost,
        deletePost,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        projects,
        addProject,
        updateProject,
        deleteProject,
        contacts,
        addContactInquiry,
        updateContactStatus,
        deleteContact,
        orders,
        updateOrderStatus,
        deleteOrder,
        subscribers,
        deleteSubscriber,
        promoBanner,
        updatePromoBanner,
        utmLinks,
        createUTMLink,
        updateUTMLink,
        deleteUTMLink,
        campaigns,
        sendBroadcastCampaign,
        leadMagnets,
        updateLeadMagnet,
        recordLeadDownload,
        seoSettings,
        updateSEOSettings,
        blogCategories,
        shopCategories,
        addShopCategory,
        addBlogCategory,
        accessCodes,
        addAccessCode,
        updateAccessCode,
        deleteAccessCode,
        toggleAccessCodeStatus,
        extendAccessCodeExpiry,
        verifyAndApplyCode,
        verifyPortfolioCode,
        recordCodeUsage,
        resetAllData,
        exportDataJSON,
        importDataJSON,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        backendConnected,
        backendStats,
        refreshBackendData,
        submitOrder,
        subscribeNewsletter,
        askAIAdvisor,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
