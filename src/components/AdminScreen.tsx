import React, { useState } from 'react';
import {
  Settings,
  FileText,
  ShoppingBag,
  Users,
  Shield,
  Plus,
  Edit,
  Trash2,
  Save,
  CheckCircle2,
  AlertCircle,
  Eye,
  ExternalLink,
  Mail,
  Phone,
  Calendar,
  Search,
  Filter,
  Download,
  Upload,
  RefreshCw,
  Sparkles,
  Lock,
  Unlock,
  Layers,
  ArrowRight,
  TrendingUp,
  Award,
  Globe,
  Tag,
  Check,
  X,
  MessageSquare,
  Key,
  Megaphone,
  Send
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { BlogPost, Product, Project, ContactInquiry, ContactStatus } from '../types';
import { AdminAccessCodesTab } from './admin/AdminAccessCodesTab';
import { AdminProjectsTab } from './admin/AdminProjectsTab';
import { AdminOrdersTab } from './admin/AdminOrdersTab';
import { AdminSubscribersTab } from './admin/AdminSubscribersTab';
import { AdminMarketingTab } from './admin/AdminMarketingTab';

type AdminTab = 'inquiries' | 'orders' | 'marketing' | 'projects' | 'subscribers' | 'blog' | 'shop' | 'access-codes' | 'profile' | 'backup';

export const AdminScreen: React.FC = () => {
  const {
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
    deleteUTMLink,
    campaigns,
    sendBroadcastCampaign,
    leadMagnets,
    updateLeadMagnet,
    seoSettings,
    updateSEOSettings,
    shopCategories,
    addShopCategory,
    blogCategories,
    addBlogCategory,
    accessCodes,
    resetAllData,
    exportDataJSON,
    importDataJSON,
    isAdminAuthenticated,
    loginAdmin,
    logoutAdmin,
    backendConnected,
    backendStats,
    refreshBackendData,
  } = useData();

  const { t, formatPrice } = useLanguage();
  const { showSuccess, showError } = useToast();

  const [activeTab, setActiveTab] = useState<AdminTab>('inquiries');
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  // Form states for Blog
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [postForm, setPostForm] = useState<Partial<BlogPost>>({
    title: '',
    category: 'Kinh tế',
    excerpt: '',
    content: '',
    readTime: '5 phút đọc',
    tags: ['AI', 'Chiến lược'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0nfs-QE97ZSzPp1ePqwuJnL9Y8sYkh8kidQJAYCebU14EOYejcoy9MduTqZ6lBVKP_LVgLtpAESpHDLSokI62umBM_p5Cw1x36O4RItYPSxNB2V8zvzHD26W63AW2QrivLe6xQHlDODhloJjb7GASV5l3nmo50gpO12WWVwIJchubus92f_j_9aSfpEwwVzZnlpM_TY3QgTQ8KAo-3hH5Hf0RoSkHJen3B2MdR7CEfnTIYWCNQMaaDA',
    imageAlt: 'Blog article cover visual',
    author: 'Cao Nguyễn Nhật Triều',
    date: new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: 'short', year: 'numeric' }),
  });
  const [tagInput, setTagInput] = useState('');
  const [blogSearchQuery, setBlogSearchQuery] = useState('');
  const [blogCategoryFilter, setBlogCategoryFilter] = useState('all');
  const [newBlogCategory, setNewBlogCategory] = useState('');

  // Form states for Shop Products
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);
  const [productForm, setProductForm] = useState<Partial<Product>>({
    title: '',
    category: 'Tư vấn',
    price: 199.0,
    description: '',
    fullDetails: '',
    rating: 5.0,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoLV7Sz_GogQx4KLhjqNPlLBXfb1lI4lJ-5-5Mtmn3XoPTiY2csMeoAMP-zXY0FG3v86ZTuEVScrw3iOGMeQBHT9N9me1bVaOwlrKpf7C6O8RUf82yJYOIHghq4us2t78Su_K0V3RlylEZTSL-OoiDagiIiMiK-tJlf6G5W-XFjVilNHnzWEhl_cVSK0Xl3g0-Jt-_a1ZNnBJiTe-sb5CN8NqHeiD_8cbA6FKxLmrjafUPZF8XU0eRtQ',
    imageAlt: 'Product offering cover visual',
    features: ['Tư vấn chuyên sâu 1-1', 'Hỗ trợ giải pháp thực chiến', 'Tài liệu hướng dẫn chi tiết'],
  });
  const [featureInput, setFeatureInput] = useState('');
  const [shopSearchQuery, setShopSearchQuery] = useState('');
  const [shopCategoryFilter, setShopCategoryFilter] = useState('all');
  const [newShopCategory, setNewShopCategory] = useState('');

  // Form states for Inquiries
  const [inquiryFilter, setInquiryFilter] = useState<'all' | ContactStatus>('all');
  const [inquirySearch, setInquirySearch] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState<ContactInquiry | null>(null);
  const [inquiryNote, setInquiryNote] = useState('');

  // Profile Edit State
  const [profileForm, setProfileForm] = useState({
    name: profile.name,
    titleVi: profile.titleVi,
    titleEn: profile.titleEn,
    summaryVi: profile.summaryVi,
    summaryEn: profile.summaryEn,
    email: profile.contact.email,
    phone: profile.contact.phone,
    locationVi: profile.contact.locationVi,
    linkedin: profile.contact.linkedin,
    github: profile.contact.github || '',
  });

  // SEO Edit State
  const [seoForm, setSeoForm] = useState({ ...seoSettings });

  // Handle PIN Login
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(pinInput)) {
      setPinError(false);
      setPinInput('');
      showSuccess('Xác thực quản trị viên thành công', 'Chào mừng bạn đến với Bảng điều khiển quản trị.');
    } else {
      setPinError(true);
    }
  };

  const handleQuickLogin = () => {
    loginAdmin('123456');
    showSuccess('Đã đăng nhập Quản trị viên', 'Quyền quản trị đã được kích hoạt.');
  };

  // Blog Save Handler
  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postForm.title || !postForm.content) {
      showError('Thiếu thông tin', 'Vui lòng nhập đầy đủ tiêu đề và nội dung bài viết.');
      return;
    }

    if (editingPost) {
      updatePost(editingPost.id, postForm);
      showSuccess('Cập nhật bài viết thành công', `Bài viết "${postForm.title}" đã được lưu.`);
      setEditingPost(null);
    } else {
      addPost(postForm as Omit<BlogPost, 'id'>);
      showSuccess('Tạo bài viết mới thành công', `Bài viết "${postForm.title}" đã được xuất bản.`);
      setIsCreatingPost(false);
    }

    // Reset form
    setPostForm({
      title: '',
      category: 'Kinh tế',
      excerpt: '',
      content: '',
      readTime: '5 phút đọc',
      tags: ['AI', 'Chiến lược'],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0nfs-QE97ZSzPp1ePqwuJnL9Y8sYkh8kidQJAYCebU14EOYejcoy9MduTqZ6lBVKP_LVgLtpAESpHDLSokI62umBM_p5Cw1x36O4RItYPSxNB2V8zvzHD26W63AW2QrivLe6xQHlDODhloJjb7GASV5l3nmo50gpO12WWVwIJchubus92f_j_9aSfpEwwVzZnlpM_TY3QgTQ8KAo-3hH5Hf0RoSkHJen3B2MdR7CEfnTIYWCNQMaaDA',
      imageAlt: 'Blog article cover visual',
      author: 'Cao Nguyễn Nhật Triều',
      date: new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: 'short', year: 'numeric' }),
    });
  };

  // Product Save Handler
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.title || !productForm.description) {
      showError('Thiếu thông tin', 'Vui lòng nhập đầy đủ tên và mô tả sản phẩm.');
      return;
    }

    if (editingProduct) {
      updateProduct(editingProduct.id, productForm);
      showSuccess('Cập nhật sản phẩm thành công', `Sản phẩm "${productForm.title}" đã được lưu.`);
      setEditingProduct(null);
    } else {
      addProduct(productForm as Omit<Product, 'id'>);
      showSuccess('Thêm sản phẩm mới thành công', `Sản phẩm "${productForm.title}" đã được hiển thị trong Shop.`);
      setIsCreatingProduct(false);
    }

    // Reset form
    setProductForm({
      title: '',
      category: 'Tư vấn',
      price: 199.0,
      description: '',
      fullDetails: '',
      rating: 5.0,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoLV7Sz_GogQx4KLhjqNPlLBXfb1lI4lJ-5-5Mtmn3XoPTiY2csMeoAMP-zXY0FG3v86ZTuEVScrw3iOGMeQBHT9N9me1bVaOwlrKpf7C6O8RUf82yJYOIHghq4us2t78Su_K0V3RlylEZTSL-OoiDagiIiMiK-tJlf6G5W-XFjVilNHnzWEhl_cVSK0Xl3g0-Jt-_a1ZNnBJiTe-sb5CN8NqHeiD_8cbA6FKxLmrjafUPZF8XU0eRtQ',
      imageAlt: 'Product offering cover visual',
      features: ['Tư vấn chuyên sâu 1-1', 'Hỗ trợ giải pháp thực chiến', 'Tài liệu hướng dẫn chi tiết'],
    });
  };

  // Profile Save Handler
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: profileForm.name,
      titleVi: profileForm.titleVi,
      titleEn: profileForm.titleEn,
      summaryVi: profileForm.summaryVi,
      summaryEn: profileForm.summaryEn,
      contact: {
        ...profile.contact,
        email: profileForm.email,
        phone: profileForm.phone,
        locationVi: profileForm.locationVi,
        linkedin: profileForm.linkedin,
        github: profileForm.github,
      },
    });
    showSuccess('Cập nhật thông tin website thành công', 'Toàn bộ nội dung hồ sơ cá nhân và liên hệ đã được lưu.');
  };

  // SEO Save Handler
  const handleSaveSEO = (e: React.FormEvent) => {
    e.preventDefault();
    updateSEOSettings(seoForm);
    showSuccess('Cập nhật SEO thành công', 'Cấu hình tiêu đề và thẻ Meta đã được cập nhật.');
  };

  // Export Contacts to CSV
  const handleExportContactsCSV = () => {
    const headers = ['Mã', 'Họ tên', 'Email', 'Điện thoại', 'Dịch vụ', 'Nội dung', 'Thời gian gửi', 'Trạng thái', 'Ghi chú'];
    const rows = contacts.map((c) => [
      c.id,
      `"${(c.name || '').replace(/"/g, '""')}"`,
      `"${(c.email || '').replace(/"/g, '""')}"`,
      `"${(c.phone || '').replace(/"/g, '""')}"`,
      `"${(c.serviceLabel || c.service || '').replace(/"/g, '""')}"`,
      `"${(c.message || '').replace(/"/g, '""')}"`,
      `"${c.createdAt || ''}"`,
      c.status,
      `"${(c.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `danh_sach_lien_he_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showSuccess('Xuất file CSV thành công', `Đã tải xuống danh sách ${contacts.length} liên hệ.`);
  };

  // Download Backup JSON
  const handleDownloadBackup = () => {
    const jsonStr = exportDataJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `backup_website_trieu_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showSuccess('Xuất bản sao lưu thành công', 'File backup JSON đã được lưu vào máy của bạn.');
  };

  // Upload Restore JSON
  const handleUploadBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const result = importDataJSON(content);
        if (result.success) {
          showSuccess('Khôi phục dữ liệu thành công', 'Hệ thống đã nạp dữ liệu từ bản sao lưu JSON.');
        } else {
          showError('Khôi phục thất bại', result.error || 'Định dạng file không hợp lệ.');
        }
      }
    };
    reader.readAsText(file);
  };

  // If not authenticated, show PIN Login Screen
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-2xl max-w-md w-full p-8 border border-[#bfc9c3]/60 shadow-xl text-center">
          <div className="w-16 h-16 bg-[#eff4ff] text-[#003527] rounded-full flex items-center justify-center mx-auto mb-5 border border-[#003527]/10">
            <Lock className="w-8 h-8" />
          </div>

          <span className="px-3 py-1 bg-[#b0f0d6]/60 text-[#003527] text-[12px] font-body font-bold rounded-full border border-[#003527]/10 inline-block mb-3">
            ADMIN PORTAL
          </span>

          <h2 className="font-display text-[24px] font-bold text-[#003527] mb-2">
            Đăng Nhập Trang Quản Trị
          </h2>
          <p className="font-body text-[14px] text-[#404944] mb-6">
            Khu vực dành riêng cho Cao Nguyễn Nhật Triều để quản lý nội dung, blog, sản phẩm và theo dõi liên hệ.
          </p>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError(false);
                }}
                placeholder="Nhập mã PIN hoặc mật khẩu..."
                className={`w-full px-4 py-3 text-center tracking-widest text-lg bg-[#f8f9ff] border rounded-lg outline-none font-body transition-colors ${
                  pinError ? 'border-red-500 ring-1 ring-red-500' : 'border-[#bfc9c3] focus:border-[#003527] focus:ring-1 focus:ring-[#003527]'
                }`}
                autoFocus
              />
              {pinError && (
                <p className="text-red-600 text-[13px] font-body mt-1.5 flex items-center justify-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> Mã PIN chưa chính xác. Vui lòng thử lại.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#003527] hover:bg-[#064e3b] text-white py-3 rounded-lg font-body font-bold text-[15px] transition-colors cursor-pointer shadow-md flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" /> Đăng nhập Bảng điều khiển
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#bfc9c3]/40">
            <button
              onClick={handleQuickLogin}
              className="text-[13px] font-body text-[#003527] hover:underline font-semibold flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#10b981]" /> Nhấp để truy cập nhanh tài khoản Quản trị
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Filtered Blog Posts
  const filteredPosts = posts.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(blogSearchQuery.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(blogSearchQuery.toLowerCase());
    const matchesCategory = blogCategoryFilter === 'all' || p.category === blogCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Filtered Shop Products
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(shopSearchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(shopSearchQuery.toLowerCase());
    const matchesCategory = shopCategoryFilter === 'all' || p.category === shopCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Filtered Inquiries
  const filteredInquiries = contacts.filter((c) => {
    const matchesFilter = inquiryFilter === 'all' || c.status === inquiryFilter;
    const matchesSearch =
      c.name.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      c.email.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      c.message.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      (c.serviceLabel || '').toLowerCase().includes(inquirySearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const inquiryStats = {
    total: contacts.length,
    new: contacts.filter((c) => c.status === 'new').length,
    contacted: contacts.filter((c) => c.status === 'contacted').length,
    in_progress: contacts.filter((c) => c.status === 'in_progress').length,
    archived: contacts.filter((c) => c.status === 'archived').length,
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-8 animate-in fade-in duration-200">
      {/* Top Header Banner */}
      <div className="bg-gradient-to-r from-[#003527] to-[#064e3b] text-white rounded-2xl p-6 md:p-8 shadow-xl mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 bg-[#b0f0d6]/20 border border-[#b0f0d6]/40 text-[#b0f0d6] text-[12px] font-bold rounded-full tracking-wide">
              ADMIN CONTROL CENTER
            </span>
            <span className="flex items-center gap-1.5 text-[12px] text-white/90 bg-white/10 px-3 py-0.5 rounded-full border border-white/20">
              <span className={`w-2 h-2 rounded-full ${backendConnected ? 'bg-[#10b981] animate-pulse' : 'bg-amber-400'}`} />
              <span>Backend API (Port 3000): {backendConnected ? 'Online (Đang kết nối)' : 'Cục bộ / Đang kết nối...'}</span>
            </span>
          </div>
          <h1 className="font-display text-2xl md:text-3xl font-bold tracking-tight">
            Trang Quản Trị Hệ Thống Website
          </h1>
          <p className="font-body text-white/80 text-[14px] md:text-[15px] mt-1 max-w-2xl">
            Quản lý và cập nhật toàn diện nội dung cá nhân, bài viết blog, sản phẩm cửa hàng, và theo dõi trực tiếp các liên hệ hợp tác từ khách hàng & đối tác.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={async () => {
              await refreshBackendData();
              showSuccess('Đồng bộ Server thành công', 'Toàn bộ dữ liệu đã được làm mới từ máy chủ Express.');
            }}
            className="bg-white/10 hover:bg-white/20 text-white px-3.5 py-2 rounded-lg font-body text-[13px] font-medium transition-colors border border-white/20 flex items-center gap-1.5 cursor-pointer"
            title="Đồng bộ lại dữ liệu từ Server"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#b0f0d6]" /> Đồng bộ Server
          </button>

          <button
            onClick={() => {
              if (window.confirm('Bạn có chắc chắn muốn khôi phục dữ liệu chuẩn gốc của Cao Nguyễn Nhật Triều?')) {
                resetAllData();
                showSuccess('Khôi phục dữ liệu gốc thành công', 'Toàn bộ nội dung đã được làm mới về dữ liệu chuẩn.');
              }
            }}
            className="bg-white/10 hover:bg-white/20 text-white px-3.5 py-2 rounded-lg font-body text-[13px] font-medium transition-colors border border-white/20 flex items-center gap-1.5 cursor-pointer"
            title="Khôi phục dữ liệu chuẩn"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#b0f0d6]" /> Reset chuẩn
          </button>

          <button
            onClick={logoutAdmin}
            className="bg-red-500/20 hover:bg-red-500/30 text-white px-3.5 py-2 rounded-lg font-body text-[13px] font-medium transition-colors border border-red-300/30 flex items-center gap-1.5 cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5" /> Đăng xuất
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap gap-2 md:gap-3 border-b border-[#bfc9c3]/50 pb-4 mb-8">
        <button
          onClick={() => setActiveTab('inquiries')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-body text-[14px] font-bold transition-all cursor-pointer ${
            activeTab === 'inquiries'
              ? 'bg-[#003527] text-white shadow-md'
              : 'bg-white text-[#404944] hover:bg-[#eff4ff] border border-[#bfc9c3]/50'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Theo dõi Liên hệ</span>
          {inquiryStats.new > 0 && (
            <span className="bg-[#10b981] text-[#003527] text-[11px] font-black px-2 py-0.2 rounded-full ml-1">
              {inquiryStats.new} mới
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-body text-[14px] font-bold transition-all cursor-pointer ${
            activeTab === 'orders'
              ? 'bg-[#003527] text-white shadow-md'
              : 'bg-white text-[#404944] hover:bg-[#eff4ff] border border-[#bfc9c3]/50'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Đơn Hàng ({orders.length})</span>
          {orders.filter((o) => o.paymentStatus === 'pending').length > 0 && (
            <span className="bg-amber-400 text-slate-900 text-[11px] font-black px-2 py-0.2 rounded-full ml-1">
              {orders.filter((o) => o.paymentStatus === 'pending').length} chờ
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('marketing')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-body text-[14px] font-bold transition-all cursor-pointer ${
            activeTab === 'marketing'
              ? 'bg-[#003527] text-white shadow-md'
              : 'bg-white text-[#404944] hover:bg-[#eff4ff] border border-[#bfc9c3]/50'
          }`}
        >
          <Megaphone className="w-4 h-4 text-amber-500" />
          <span>Công Cụ Quảng Bá</span>
          <span className="bg-[#b0f0d6] text-[#003527] text-[10px] font-extrabold px-1.5 py-0.5 rounded uppercase">
            Mới
          </span>
        </button>

        <button
          onClick={() => setActiveTab('projects')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-body text-[14px] font-bold transition-all cursor-pointer ${
            activeTab === 'projects'
              ? 'bg-[#003527] text-white shadow-md'
              : 'bg-white text-[#404944] hover:bg-[#eff4ff] border border-[#bfc9c3]/50'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Dự Án Portfolio ({projects.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('subscribers')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-body text-[14px] font-bold transition-all cursor-pointer ${
            activeTab === 'subscribers'
              ? 'bg-[#003527] text-white shadow-md'
              : 'bg-white text-[#404944] hover:bg-[#eff4ff] border border-[#bfc9c3]/50'
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>Độc Giả ({subscribers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('blog')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-body text-[14px] font-bold transition-all cursor-pointer ${
            activeTab === 'blog'
              ? 'bg-[#003527] text-white shadow-md'
              : 'bg-white text-[#404944] hover:bg-[#eff4ff] border border-[#bfc9c3]/50'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Quản lý Blog ({posts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('shop')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-body text-[14px] font-bold transition-all cursor-pointer ${
            activeTab === 'shop'
              ? 'bg-[#003527] text-white shadow-md'
              : 'bg-white text-[#404944] hover:bg-[#eff4ff] border border-[#bfc9c3]/50'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Sản phẩm Shop ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('access-codes')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-body text-[14px] font-bold transition-all cursor-pointer ${
            activeTab === 'access-codes'
              ? 'bg-[#003527] text-white shadow-md'
              : 'bg-white text-[#404944] hover:bg-[#eff4ff] border border-[#bfc9c3]/50'
          }`}
        >
          <Key className="w-4 h-4" />
          <span>Mã Quyền hạn ({accessCodes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-body text-[14px] font-bold transition-all cursor-pointer ${
            activeTab === 'profile'
              ? 'bg-[#003527] text-white shadow-md'
              : 'bg-white text-[#404944] hover:bg-[#eff4ff] border border-[#bfc9c3]/50'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Nội dung & SEO</span>
        </button>

        <button
          onClick={() => setActiveTab('backup')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-body text-[14px] font-bold transition-all cursor-pointer ${
            activeTab === 'backup'
              ? 'bg-[#003527] text-white shadow-md'
              : 'bg-white text-[#404944] hover:bg-[#eff4ff] border border-[#bfc9c3]/50'
          }`}
        >
          <Download className="w-4 h-4" />
          <span>Sao lưu & Hệ thống</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: THEO DÕI LIÊN HỆ & HỢP TÁC (INQUIRIES TRACKER) */}
      {/* ======================================================== */}
      {activeTab === 'inquiries' && (
        <div className="space-y-6">
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-[#bfc9c3]/60 shadow-sm">
              <div className="text-[13px] font-body text-[#404944] font-medium">Tổng liên hệ</div>
              <div className="text-2xl font-bold font-display text-[#003527] mt-1">{inquiryStats.total}</div>
            </div>
            <div className="bg-[#eff4ff] p-4 rounded-xl border border-[#003527]/20 shadow-sm">
              <div className="text-[13px] font-body text-[#003527] font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#10b981]"></span> Chưa xử lý (Mới)
              </div>
              <div className="text-2xl font-bold font-display text-[#003527] mt-1">{inquiryStats.new}</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-[#bfc9c3]/60 shadow-sm">
              <div className="text-[13px] font-body text-[#404944] font-medium">Đã phản hồi</div>
              <div className="text-2xl font-bold font-display text-blue-700 mt-1">{inquiryStats.contacted}</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-[#bfc9c3]/60 shadow-sm">
              <div className="text-[13px] font-body text-[#404944] font-medium">Đang trao đổi</div>
              <div className="text-2xl font-bold font-display text-amber-600 mt-1">{inquiryStats.in_progress}</div>
            </div>
          </div>

          {/* Controls & Search */}
          <div className="bg-white p-4 rounded-xl border border-[#bfc9c3]/60 shadow-sm flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {(['all', 'new', 'contacted', 'in_progress', 'archived'] as const).map((st) => {
                const labels: Record<string, string> = {
                  all: `Tất cả (${contacts.length})`,
                  new: `Mới (${inquiryStats.new})`,
                  contacted: `Đã liên hệ (${inquiryStats.contacted})`,
                  in_progress: `Đang trao đổi (${inquiryStats.in_progress})`,
                  archived: `Lưu trữ (${inquiryStats.archived})`,
                };
                return (
                  <button
                    key={st}
                    onClick={() => setInquiryFilter(st)}
                    className={`px-3 py-1.5 rounded-lg text-[13px] font-body font-semibold transition-colors cursor-pointer ${
                      inquiryFilter === st
                        ? 'bg-[#003527] text-white'
                        : 'bg-[#f8f9ff] text-[#404944] hover:bg-[#eff4ff] border border-[#bfc9c3]/40'
                    }`}
                  >
                    {labels[st]}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              <div className="relative flex-1 md:w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#404944]" />
                <input
                  type="text"
                  placeholder="Tìm kiếm người gửi, email..."
                  value={inquirySearch}
                  onChange={(e) => setInquirySearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-[#f8f9ff] border border-[#bfc9c3] rounded-lg text-[13px] font-body outline-none focus:border-[#003527]"
                />
              </div>

              <button
                onClick={handleExportContactsCSV}
                className="bg-[#eff4ff] hover:bg-[#dce9ff] text-[#003527] border border-[#003527]/20 px-3.5 py-2 rounded-lg text-[13px] font-body font-bold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
              >
                <Download className="w-4 h-4" /> Xuất CSV
              </button>
            </div>
          </div>

          {/* Inquiries Table / List */}
          <div className="bg-white rounded-xl border border-[#bfc9c3]/60 shadow-sm overflow-hidden">
            {filteredInquiries.length === 0 ? (
              <div className="p-12 text-center text-[#404944]">
                <MessageSquare className="w-12 h-12 mx-auto text-[#bfc9c3] mb-3" />
                <p className="font-body text-[15px]">Không tìm thấy thông tin liên hệ nào phù hợp.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left font-body text-[14px]">
                  <thead className="bg-[#f8f9ff] border-b border-[#bfc9c3]/50 text-[#003527] font-bold text-[13px] uppercase tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4">Người liên hệ</th>
                      <th className="py-3.5 px-4">Dịch vụ quan tâm</th>
                      <th className="py-3.5 px-4">Nội dung trao đổi</th>
                      <th className="py-3.5 px-4">Thời gian</th>
                      <th className="py-3.5 px-4">Trạng thái</th>
                      <th className="py-3.5 px-4 text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#bfc9c3]/30">
                    {filteredInquiries.map((inq) => {
                      const statusBadges: Record<ContactStatus, { label: string; bg: string; text: string }> = {
                        new: { label: 'Mới nhận', bg: 'bg-[#b0f0d6]', text: 'text-[#003527]' },
                        contacted: { label: 'Đã phản hồi', bg: 'bg-blue-100', text: 'text-blue-800' },
                        in_progress: { label: 'Đang xử lý', bg: 'bg-amber-100', text: 'text-amber-800' },
                        archived: { label: 'Lưu trữ', bg: 'bg-gray-100', text: 'text-gray-700' },
                      };
                      const badge = statusBadges[inq.status] || statusBadges.new;

                      return (
                        <tr key={inq.id} className="hover:bg-[#f8f9ff]/80 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-[#0b1c30]">{inq.name}</div>
                            <a
                              href={`mailto:${inq.email}`}
                              className="text-[13px] text-[#003527] hover:underline flex items-center gap-1 mt-0.5"
                            >
                              <Mail className="w-3 h-3 text-[#404944]" /> {inq.email}
                            </a>
                            {inq.phone && (
                              <div className="text-[12px] text-[#404944] flex items-center gap-1 mt-0.5">
                                <Phone className="w-3 h-3 text-[#404944]" /> {inq.phone}
                              </div>
                            )}
                          </td>

                          <td className="py-3.5 px-4">
                            <span className="inline-block bg-[#eff4ff] text-[#003527] border border-[#003527]/10 px-2.5 py-1 rounded-md text-[12px] font-bold">
                              {inq.serviceLabel || inq.service}
                            </span>
                            {inq.source && (
                              <div className="text-[11px] text-[#404944] mt-1 italic">
                                Nguồn: {inq.source === 'quick_fab' ? 'Nút nổi FAB' : inq.source === 'newsletter' ? 'Bản tin' : 'Form liên hệ'}
                              </div>
                            )}
                          </td>

                          <td className="py-3.5 px-4 max-w-xs">
                            <p className="line-clamp-2 text-[#404944] text-[13px] leading-relaxed">
                              {inq.message}
                            </p>
                            {inq.notes && (
                              <div className="text-[11px] bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded mt-1 font-medium">
                                Ghi chú: {inq.notes}
                              </div>
                            )}
                          </td>

                          <td className="py-3.5 px-4 whitespace-nowrap text-[13px] text-[#404944]">
                            {inq.createdAt}
                          </td>

                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <select
                              value={inq.status}
                              onChange={(e) => {
                                const newStatus = e.target.value as ContactStatus;
                                updateContactStatus(inq.id, newStatus);
                                showSuccess('Đã cập nhật trạng thái', `Liên hệ của ${inq.name} chuyển sang: ${statusBadges[newStatus].label}`);
                              }}
                              className={`px-2.5 py-1 rounded-full text-[12px] font-bold border-none outline-none cursor-pointer ${badge.bg} ${badge.text}`}
                            >
                              <option value="new">Mới nhận</option>
                              <option value="contacted">Đã phản hồi</option>
                              <option value="in_progress">Đang trao đổi</option>
                              <option value="archived">Lưu trữ</option>
                            </select>
                          </td>

                          <td className="py-3.5 px-4 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1.5">
                              <a
                                href={`mailto:${inq.email}?subject=Phản hồi liên hệ từ Cao Nguyễn Nhật Triều - ${encodeURIComponent(inq.serviceLabel || '')}&body=Chào bạn ${encodeURIComponent(inq.name)},%0D%0A%0D%0ACảm ơn bạn đã liên hệ...`}
                                className="p-2 bg-[#eff4ff] text-[#003527] hover:bg-[#dce9ff] rounded-lg transition-colors inline-flex"
                                title="Gửi email phản hồi"
                              >
                                <Mail className="w-4 h-4" />
                              </a>

                              <button
                                onClick={() => {
                                  const currentNote = inq.notes || '';
                                  const promptNote = window.prompt('Nhập ghi chú nội bộ cho liên hệ này:', currentNote);
                                  if (promptNote !== null) {
                                    updateContactStatus(inq.id, inq.status, promptNote);
                                    showSuccess('Đã lưu ghi chú', 'Ghi chú nội bộ đã được cập nhật.');
                                  }
                                }}
                                className="p-2 bg-[#f8f9ff] text-[#404944] hover:text-[#003527] hover:bg-[#eff4ff] border border-[#bfc9c3]/40 rounded-lg transition-colors"
                                title="Thêm ghi chú"
                              >
                                <Edit className="w-4 h-4" />
                              </button>

                              <button
                                onClick={() => {
                                  if (window.confirm(`Xóa liên hệ của ${inq.name}?`)) {
                                    deleteContact(inq.id);
                                    showSuccess('Đã xóa liên hệ', 'Mục liên hệ đã được loại bỏ.');
                                  }
                                }}
                                className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                title="Xóa liên hệ"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: QUẢN LÝ BLOG (ARTICLES CRUD) */}
      {/* ======================================================== */}
      {activeTab === 'blog' && (
        <div className="space-y-6">
          {/* Header Action Bar */}
          <div className="bg-white p-4 rounded-xl border border-[#bfc9c3]/60 shadow-sm flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  setIsCreatingPost(true);
                  setEditingPost(null);
                  setPostForm({
                    title: '',
                    category: 'Kinh tế',
                    excerpt: '',
                    content: '',
                    readTime: '5 phút đọc',
                    tags: ['AI', 'Chiến lược'],
                    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0nfs-QE97ZSzPp1ePqwuJnL9Y8sYkh8kidQJAYCebU14EOYejcoy9MduTqZ6lBVKP_LVgLtpAESpHDLSokI62umBM_p5Cw1x36O4RItYPSxNB2V8zvzHD26W63AW2QrivLe6xQHlDODhloJjb7GASV5l3nmo50gpO12WWVwIJchubus92f_j_9aSfpEwwVzZnlpM_TY3QgTQ8KAo-3hH5Hf0RoSkHJen3B2MdR7CEfnTIYWCNQMaaDA',
                    imageAlt: 'Blog article cover visual',
                    author: 'Cao Nguyễn Nhật Triều',
                    date: new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: 'short', year: 'numeric' }),
                  });
                }}
                className="bg-[#003527] hover:bg-[#064e3b] text-white px-4 py-2 rounded-lg font-body font-bold text-[14px] flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Viết bài mới
              </button>

              <select
                value={blogCategoryFilter}
                onChange={(e) => setBlogCategoryFilter(e.target.value)}
                className="bg-[#f8f9ff] border border-[#bfc9c3] text-[#003527] px-3 py-2 rounded-lg text-[13px] font-body font-semibold outline-none"
              >
                <option value="all">Tất cả danh mục ({posts.length})</option>
                {blogCategories.filter((c) => c !== 'Tất cả').map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="relative md:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#404944]" />
              <input
                type="text"
                placeholder="Tìm bài viết blog..."
                value={blogSearchQuery}
                onChange={(e) => setBlogSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-[#f8f9ff] border border-[#bfc9c3] rounded-lg text-[13px] font-body outline-none focus:border-[#003527]"
              />
            </div>
          </div>

          {/* Form Modal / Inline Editor for Blog */}
          {(isCreatingPost || editingPost) && (
            <div className="bg-white rounded-2xl p-6 border-2 border-[#003527] shadow-xl animate-in fade-in duration-200">
              <div className="flex justify-between items-center pb-4 mb-6 border-b border-[#bfc9c3]/50">
                <h3 className="font-display text-xl font-bold text-[#003527]">
                  {editingPost ? 'Chỉnh sửa bài viết' : 'Tạo bài viết Blog mới'}
                </h3>
                <button
                  onClick={() => {
                    setIsCreatingPost(false);
                    setEditingPost(null);
                  }}
                  className="w-8 h-8 rounded-full bg-[#eff4ff] text-[#003527] flex items-center justify-center hover:bg-[#dce9ff]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSavePost} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <label className="block font-body text-[13px] font-bold text-[#003527] mb-1">
                      Tiêu đề bài viết <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={postForm.title || ''}
                      onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                      placeholder="Ví dụ: Chiến lược Chuyển đổi số & Tích hợp Kiosk Y tế Thông minh..."
                      className="w-full px-4 py-2.5 bg-[#f8f9ff] border border-[#bfc9c3] rounded-lg text-[15px] font-body font-bold outline-none focus:border-[#003527]"
                    />
                  </div>

                  <div>
                    <label className="block font-body text-[13px] font-bold text-[#003527] mb-1">
                      Danh mục <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-2">
                      <select
                        value={postForm.category || 'Kinh tế'}
                        onChange={(e) => setPostForm({ ...postForm, category: e.target.value })}
                        className="w-full px-3 py-2.5 bg-[#f8f9ff] border border-[#bfc9c3] rounded-lg text-[14px] font-body outline-none focus:border-[#003527]"
                      >
                        {blogCategories.filter((c) => c !== 'Tất cả').map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-body text-[13px] font-bold text-[#003527] mb-1">
                      Thời gian đọc (Read time)
                    </label>
                    <input
                      type="text"
                      value={postForm.readTime || '5 phút đọc'}
                      onChange={(e) => setPostForm({ ...postForm, readTime: e.target.value })}
                      placeholder="Ví dụ: 6 phút đọc"
                      className="w-full px-4 py-2 bg-[#f8f9ff] border border-[#bfc9c3] rounded-lg text-[14px] font-body outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-body text-[13px] font-bold text-[#003527] mb-1">
                      Tác giả
                    </label>
                    <input
                      type="text"
                      value={postForm.author || 'Cao Nguyễn Nhật Triều'}
                      onChange={(e) => setPostForm({ ...postForm, author: e.target.value })}
                      className="w-full px-4 py-2 bg-[#f8f9ff] border border-[#bfc9c3] rounded-lg text-[14px] font-body outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-body text-[13px] font-bold text-[#003527] mb-1">
                      Ngày xuất bản
                    </label>
                    <input
                      type="text"
                      value={postForm.date || ''}
                      onChange={(e) => setPostForm({ ...postForm, date: e.target.value })}
                      placeholder="Ví dụ: 15 Thg 10, 2024"
                      className="w-full px-4 py-2 bg-[#f8f9ff] border border-[#bfc9c3] rounded-lg text-[14px] font-body outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-body text-[13px] font-bold text-[#003527] mb-1">
                    URL Hình ảnh bìa
                  </label>
                  <input
                    type="url"
                    value={postForm.image || ''}
                    onChange={(e) => setPostForm({ ...postForm, image: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-4 py-2 bg-[#f8f9ff] border border-[#bfc9c3] rounded-lg text-[14px] font-body outline-none"
                  />
                </div>

                <div>
                  <label className="block font-body text-[13px] font-bold text-[#003527] mb-1">
                    Tóm tắt bài viết (Excerpt) <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={postForm.excerpt || ''}
                    onChange={(e) => setPostForm({ ...postForm, excerpt: e.target.value })}
                    placeholder="Mô tả ngắn gọn nội dung cốt lõi của bài viết để hiển thị trên danh sách..."
                    className="w-full px-4 py-2 bg-[#f8f9ff] border border-[#bfc9c3] rounded-lg text-[14px] font-body outline-none"
                  />
                </div>

                <div>
                  <label className="block font-body text-[13px] font-bold text-[#003527] mb-1">
                    Nội dung chi tiết (Định dạng Markdown / Text) <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={8}
                    required
                    value={postForm.content || ''}
                    onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                    placeholder="Soạn thảo nội dung bài viết chi tiết tại đây (hỗ trợ các tiêu đề ##, danh sách, đoạn văn)..."
                    className="w-full px-4 py-2.5 bg-[#f8f9ff] border border-[#bfc9c3] rounded-lg text-[14px] font-body font-mono leading-relaxed outline-none focus:border-[#003527]"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-[#bfc9c3]/50">
                  <button
                    type="button"
                    onClick={() => {
                      setIsCreatingPost(false);
                      setEditingPost(null);
                    }}
                    className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-[#404944] rounded-lg font-body text-[14px] font-semibold transition-colors cursor-pointer"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#003527] hover:bg-[#064e3b] text-white rounded-lg font-body text-[14px] font-bold flex items-center gap-2 shadow-md transition-colors cursor-pointer"
                  >
                    <Save className="w-4 h-4" /> {editingPost ? 'Lưu cập nhật' : 'Xuất bản bài viết'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Posts Grid / Table */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-xl border border-[#bfc9c3]/60 shadow-sm p-5 flex flex-col justify-between hover:border-[#003527]/50 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2.5 py-0.5 bg-[#eff4ff] text-[#003527] text-[12px] font-bold rounded-full border border-[#003527]/10">
                      {post.category}
                    </span>
                    <span className="text-[12px] text-[#404944] font-medium">{post.date}</span>
                  </div>

                  <h4 className="font-display text-[17px] font-bold text-[#003527] leading-snug mb-2 line-clamp-2">
                    {post.title}
                  </h4>
                  <p className="font-body text-[13px] text-[#404944] line-clamp-2 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#bfc9c3]/30 flex items-center justify-between">
                  <span className="text-[12px] text-[#404944] font-medium flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {post.readTime}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingPost(post);
                        setIsCreatingPost(false);
                        setPostForm(post);
                        window.scrollTo({ top: 300, behavior: 'smooth' });
                      }}
                      className="px-3 py-1.5 bg-[#eff4ff] hover:bg-[#dce9ff] text-[#003527] rounded-lg text-[13px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Edit className="w-3.5 h-3.5" /> Sửa
                    </button>

                    <button
                      onClick={() => {
                        if (window.confirm(`Bạn có chắc muốn xóa bài viết "${post.title}"?`)) {
                          deletePost(post.id);
                          showSuccess('Đã xóa bài viết', `Bài viết "${post.title}" đã được gỡ bỏ.`);
                        }
                      }}
                      className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors cursor-pointer"
                      title="Xóa bài viết"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: QUẢN LÝ SẢN PHẨM SHOP (SHOP CRUD) */}
      {/* ======================================================== */}
      {activeTab === 'shop' && (
        <div className="space-y-6">
          {/* Header Action Bar */}
          <div className="bg-white p-4 rounded-xl border border-[#bfc9c3]/60 shadow-sm flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  setIsCreatingProduct(true);
                  setEditingProduct(null);
                  setProductForm({
                    title: '',
                    category: 'Tư vấn',
                    price: 199.0,
                    description: '',
                    fullDetails: '',
                    rating: 5.0,
                    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoLV7Sz_GogQx4KLhjqNPlLBXfb1lI4lJ-5-5Mtmn3XoPTiY2csMeoAMP-zXY0FG3v86ZTuEVScrw3iOGMeQBHT9N9me1bVaOwlrKpf7C6O8RUf82yJYOIHghq4us2t78Su_K0V3RlylEZTSL-OoiDagiIiMiK-tJlf6G5W-XFjVilNHnzWEhl_cVSK0Xl3g0-Jt-_a1ZNnBJiTe-sb5CN8NqHeiD_8cbA6FKxLmrjafUPZF8XU0eRtQ',
                    imageAlt: 'Product offering cover visual',
                    features: ['Tư vấn chuyên sâu 1-1', 'Hỗ trợ giải pháp thực chiến', 'Tài liệu hướng dẫn chi tiết'],
                  });
                }}
                className="bg-[#003527] hover:bg-[#064e3b] text-white px-4 py-2 rounded-lg font-body font-bold text-[14px] flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Thêm sản phẩm / Dịch vụ
              </button>

              <select
                value={shopCategoryFilter}
                onChange={(e) => setShopCategoryFilter(e.target.value)}
                className="bg-[#f8f9ff] border border-[#bfc9c3] text-[#003527] px-3 py-2 rounded-lg text-[13px] font-body font-semibold outline-none"
              >
                <option value="all">Tất cả phân loại ({products.length})</option>
                {shopCategories.filter((c) => c !== 'Tất cả').map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Thêm danh mục mới..."
                value={newShopCategory}
                onChange={(e) => setNewShopCategory(e.target.value)}
                className="px-3 py-1.5 bg-[#f8f9ff] border border-[#bfc9c3] rounded-lg text-[13px] font-body outline-none w-44"
              />
              <button
                onClick={() => {
                  if (newShopCategory.trim()) {
                    addShopCategory(newShopCategory.trim());
                    showSuccess('Đã thêm danh mục mới', `Danh mục "${newShopCategory.trim()}" đã sẵn sàng.`);
                    setNewShopCategory('');
                  }
                }}
                className="bg-[#eff4ff] hover:bg-[#dce9ff] text-[#003527] px-3 py-1.5 rounded-lg text-[13px] font-body font-bold border border-[#003527]/20 cursor-pointer"
              >
                + Thêm
              </button>
            </div>
          </div>

          {/* Form Modal / Inline Editor for Product */}
          {(isCreatingProduct || editingProduct) && (
            <div className="bg-white rounded-2xl p-6 border-2 border-[#003527] shadow-xl animate-in fade-in duration-200">
              <div className="flex justify-between items-center pb-4 mb-6 border-b border-[#bfc9c3]/50">
                <h3 className="font-display text-xl font-bold text-[#003527]">
                  {editingProduct ? 'Chỉnh sửa sản phẩm / Khóa học' : 'Thêm sản phẩm Shop mới'}
                </h3>
                <button
                  onClick={() => {
                    setIsCreatingProduct(false);
                    setEditingProduct(null);
                  }}
                  className="w-8 h-8 rounded-full bg-[#eff4ff] text-[#003527] flex items-center justify-center hover:bg-[#dce9ff]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <label className="block font-body text-[13px] font-bold text-[#003527] mb-1">
                      Tên sản phẩm / Khóa học / Dịch vụ <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={productForm.title || ''}
                      onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                      placeholder="Ví dụ: Gói Tư Vấn Chiến Lược & Tối Ưu Vận Hành Doanh Nghiệp..."
                      className="w-full px-4 py-2.5 bg-[#f8f9ff] border border-[#bfc9c3] rounded-lg text-[15px] font-body font-bold outline-none focus:border-[#003527]"
                    />
                  </div>

                  <div>
                    <label className="block font-body text-[13px] font-bold text-[#003527] mb-1">
                      Danh mục <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={productForm.category || 'Tư vấn'}
                      onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                      className="w-full px-3 py-2.5 bg-[#f8f9ff] border border-[#bfc9c3] rounded-lg text-[14px] font-body outline-none focus:border-[#003527]"
                    >
                      {shopCategories.filter((c) => c !== 'Tất cả').map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-body text-[13px] font-bold text-[#003527] mb-1">
                      Giá niêm yết (USD) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-[#404944]">$</span>
                      <input
                        type="number"
                        step="1"
                        required
                        value={productForm.price || 0}
                        onChange={(e) => setProductForm({ ...productForm, price: parseFloat(e.target.value) || 0 })}
                        className="w-full pl-8 pr-4 py-2 bg-[#f8f9ff] border border-[#bfc9c3] rounded-lg text-[15px] font-body font-bold outline-none"
                      />
                    </div>
                    <div className="text-[12px] text-[#003527] font-semibold mt-1">
                      ≈ {formatPrice(productForm.price || 0)}
                    </div>
                  </div>

                  <div>
                    <label className="block font-body text-[13px] font-bold text-[#003527] mb-1">
                      Đánh giá (Rating 1.0 - 5.0)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="1"
                      max="5"
                      value={productForm.rating || 5.0}
                      onChange={(e) => setProductForm({ ...productForm, rating: parseFloat(e.target.value) || 5.0 })}
                      className="w-full px-4 py-2 bg-[#f8f9ff] border border-[#bfc9c3] rounded-lg text-[14px] font-body outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-body text-[13px] font-bold text-[#003527] mb-1">
                      URL Ảnh đại diện sản phẩm
                    </label>
                    <input
                      type="url"
                      value={productForm.image || ''}
                      onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-4 py-2 bg-[#f8f9ff] border border-[#bfc9c3] rounded-lg text-[14px] font-body outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-body text-[13px] font-bold text-[#003527] mb-1">
                    Mô tả tóm tắt ngắn (Description) <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={productForm.description || ''}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    placeholder="Mô tả tóm tắt 1-2 câu hiển thị ở danh mục thẻ sản phẩm..."
                    className="w-full px-4 py-2 bg-[#f8f9ff] border border-[#bfc9c3] rounded-lg text-[14px] font-body outline-none"
                  />
                </div>

                <div>
                  <label className="block font-body text-[13px] font-bold text-[#003527] mb-1">
                    Nội dung chi tiết đầy đủ (Full Details)
                  </label>
                  <textarea
                    rows={4}
                    value={productForm.fullDetails || ''}
                    onChange={(e) => setProductForm({ ...productForm, fullDetails: e.target.value })}
                    placeholder="Nội dung chuyên sâu giải thích chi tiết về khóa học, lộ trình hoặc lợi ích mang lại..."
                    className="w-full px-4 py-2 bg-[#f8f9ff] border border-[#bfc9c3] rounded-lg text-[14px] font-body outline-none"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-[#bfc9c3]/50">
                  <button
                    type="button"
                    onClick={() => {
                      setIsCreatingProduct(false);
                      setEditingProduct(null);
                    }}
                    className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-[#404944] rounded-lg font-body text-[14px] font-semibold transition-colors cursor-pointer"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#003527] hover:bg-[#064e3b] text-white rounded-lg font-body text-[14px] font-bold flex items-center gap-2 shadow-md transition-colors cursor-pointer"
                  >
                    <Save className="w-4 h-4" /> {editingProduct ? 'Lưu sản phẩm' : 'Đăng bán sản phẩm'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-white rounded-2xl border border-[#bfc9c3]/60 shadow-sm overflow-hidden flex flex-col justify-between hover:border-[#003527]/50 transition-colors"
              >
                <div className="p-5">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2.5 py-0.5 bg-[#eff4ff] text-[#003527] text-[12px] font-bold rounded-full border border-[#003527]/10">
                      {prod.category}
                    </span>
                    <span className="text-[14px] font-bold text-[#003527]">
                      {formatPrice(prod.price)}
                    </span>
                  </div>

                  <h4 className="font-display text-[17px] font-bold text-[#003527] leading-snug mb-2 line-clamp-2">
                    {prod.title}
                  </h4>
                  <p className="font-body text-[13px] text-[#404944] line-clamp-3 mb-4 leading-relaxed">
                    {prod.description}
                  </p>

                  <div className="space-y-1.5 mb-4">
                    {prod.features?.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[12px] text-[#404944]">
                        <Check className="w-3.5 h-3.5 text-[#10b981] shrink-0" />
                        <span className="line-clamp-1">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="px-5 py-3 bg-[#f8f9ff] border-t border-[#bfc9c3]/30 flex items-center justify-between">
                  <span className="text-[12px] font-bold text-amber-600 flex items-center gap-1">
                    ★ {prod.rating} / 5.0
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingProduct(prod);
                        setIsCreatingProduct(false);
                        setProductForm(prod);
                        window.scrollTo({ top: 300, behavior: 'smooth' });
                      }}
                      className="px-3 py-1.5 bg-white hover:bg-[#eff4ff] text-[#003527] border border-[#bfc9c3]/50 rounded-lg text-[13px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Edit className="w-3.5 h-3.5" /> Sửa
                    </button>

                    <button
                      onClick={() => {
                        if (window.confirm(`Bạn có chắc muốn xóa sản phẩm "${prod.title}"?`)) {
                          deleteProduct(prod.id);
                          showSuccess('Đã xóa sản phẩm', `Sản phẩm "${prod.title}" đã được gỡ khỏi Shop.`);
                        }
                      }}
                      className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors cursor-pointer"
                      title="Xóa sản phẩm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 4: THÔNG TIN HỒ SƠ & SEO (PROFILE & SEO) */}
      {/* ======================================================== */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile Form */}
          <div className="bg-white p-6 rounded-2xl border border-[#bfc9c3]/60 shadow-sm space-y-6">
            <div className="border-b border-[#bfc9c3]/40 pb-3">
              <h3 className="font-display text-xl font-bold text-[#003527]">
                Thông Tin Chuyên Gia & Giới Thiệu
              </h3>
              <p className="font-body text-[13px] text-[#404944]">
                Điều chỉnh thông tin thương hiệu cá nhân xuất hiện trên Trang chủ và các phần giới thiệu.
              </p>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block font-body text-[13px] font-bold text-[#003527] mb-1">
                  Họ và tên chuyên gia
                </label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  className="w-full px-4 py-2 bg-[#f8f9ff] border border-[#bfc9c3] rounded-lg text-[14px] font-body outline-none"
                />
              </div>

              <div>
                <label className="block font-body text-[13px] font-bold text-[#003527] mb-1">
                  Tiêu đề chuyên gia (Tiếng Việt)
                </label>
                <input
                  type="text"
                  value={profileForm.titleVi}
                  onChange={(e) => setProfileForm({ ...profileForm, titleVi: e.target.value })}
                  className="w-full px-4 py-2 bg-[#f8f9ff] border border-[#bfc9c3] rounded-lg text-[14px] font-body outline-none"
                />
              </div>

              <div>
                <label className="block font-body text-[13px] font-bold text-[#003527] mb-1">
                  Lời giới thiệu tóm tắt (Tiếng Việt)
                </label>
                <textarea
                  rows={4}
                  value={profileForm.summaryVi}
                  onChange={(e) => setProfileForm({ ...profileForm, summaryVi: e.target.value })}
                  className="w-full px-4 py-2 bg-[#f8f9ff] border border-[#bfc9c3] rounded-lg text-[14px] font-body leading-relaxed outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-body text-[13px] font-bold text-[#003527] mb-1">
                    Email liên hệ
                  </label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full px-4 py-2 bg-[#f8f9ff] border border-[#bfc9c3] rounded-lg text-[14px] font-body outline-none"
                  />
                </div>

                <div>
                  <label className="block font-body text-[13px] font-bold text-[#003527] mb-1">
                    Số điện thoại
                  </label>
                  <input
                    type="text"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    className="w-full px-4 py-2 bg-[#f8f9ff] border border-[#bfc9c3] rounded-lg text-[14px] font-body outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-body text-[13px] font-bold text-[#003527] mb-1">
                    Địa chỉ / Thành phố
                  </label>
                  <input
                    type="text"
                    value={profileForm.locationVi}
                    onChange={(e) => setProfileForm({ ...profileForm, locationVi: e.target.value })}
                    className="w-full px-4 py-2 bg-[#f8f9ff] border border-[#bfc9c3] rounded-lg text-[14px] font-body outline-none"
                  />
                </div>

                <div>
                  <label className="block font-body text-[13px] font-bold text-[#003527] mb-1">
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    value={profileForm.linkedin}
                    onChange={(e) => setProfileForm({ ...profileForm, linkedin: e.target.value })}
                    className="w-full px-4 py-2 bg-[#f8f9ff] border border-[#bfc9c3] rounded-lg text-[14px] font-body outline-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="bg-[#003527] hover:bg-[#064e3b] text-white px-6 py-2.5 rounded-lg font-body font-bold text-[14px] flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
                >
                  <Save className="w-4 h-4" /> Lưu thông tin hồ sơ
                </button>
              </div>
            </form>
          </div>

          {/* SEO & Meta Form */}
          <div className="bg-white p-6 rounded-2xl border border-[#bfc9c3]/60 shadow-sm space-y-6">
            <div className="border-b border-[#bfc9c3]/40 pb-3">
              <h3 className="font-display text-xl font-bold text-[#003527]">
                Cấu Hình SEO & GEO Metadata
              </h3>
              <p className="font-body text-[13px] text-[#404944]">
                Tối ưu hóa thẻ tiêu đề Google, Open Graph chia sẻ mạng xã hội và định vị vùng địa lý.
              </p>
            </div>

            <form onSubmit={handleSaveSEO} className="space-y-4">
              <div>
                <label className="block font-body text-[13px] font-bold text-[#003527] mb-1">
                  Tiêu đề trang (Page Title)
                </label>
                <input
                  type="text"
                  value={seoForm.title}
                  onChange={(e) => setSeoForm({ ...seoForm, title: e.target.value })}
                  className="w-full px-4 py-2 bg-[#f8f9ff] border border-[#bfc9c3] rounded-lg text-[14px] font-body outline-none"
                />
              </div>

              <div>
                <label className="block font-body text-[13px] font-bold text-[#003527] mb-1">
                  Mô tả Meta (Description)
                </label>
                <textarea
                  rows={3}
                  value={seoForm.description}
                  onChange={(e) => setSeoForm({ ...seoForm, description: e.target.value })}
                  className="w-full px-4 py-2 bg-[#f8f9ff] border border-[#bfc9c3] rounded-lg text-[14px] font-body leading-relaxed outline-none"
                />
              </div>

              <div>
                <label className="block font-body text-[13px] font-bold text-[#003527] mb-1">
                  Từ khóa SEO (Keywords)
                </label>
                <input
                  type="text"
                  value={seoForm.keywords}
                  onChange={(e) => setSeoForm({ ...seoForm, keywords: e.target.value })}
                  className="w-full px-4 py-2 bg-[#f8f9ff] border border-[#bfc9c3] rounded-lg text-[14px] font-body outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-body text-[13px] font-bold text-[#003527] mb-1">
                    Vùng địa lý (GEO Region)
                  </label>
                  <input
                    type="text"
                    value={seoForm.geoRegion}
                    onChange={(e) => setSeoForm({ ...seoForm, geoRegion: e.target.value })}
                    className="w-full px-4 py-2 bg-[#f8f9ff] border border-[#bfc9c3] rounded-lg text-[14px] font-body outline-none"
                  />
                </div>

                <div>
                  <label className="block font-body text-[13px] font-bold text-[#003527] mb-1">
                    Địa điểm (GEO Place)
                  </label>
                  <input
                    type="text"
                    value={seoForm.geoPlaceName}
                    onChange={(e) => setSeoForm({ ...seoForm, geoPlaceName: e.target.value })}
                    className="w-full px-4 py-2 bg-[#f8f9ff] border border-[#bfc9c3] rounded-lg text-[14px] font-body outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-body text-[13px] font-bold text-[#003527] mb-1">
                  URL Ảnh chia sẻ OpenGraph (og:image)
                </label>
                <input
                  type="url"
                  value={seoForm.ogImage}
                  onChange={(e) => setSeoForm({ ...seoForm, ogImage: e.target.value })}
                  className="w-full px-4 py-2 bg-[#f8f9ff] border border-[#bfc9c3] rounded-lg text-[14px] font-body outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="bg-[#003527] hover:bg-[#064e3b] text-white px-6 py-2.5 rounded-lg font-body font-bold text-[14px] flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
                >
                  <Save className="w-4 h-4" /> Cập nhật cấu hình SEO
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 5: SAO LƯU & HỆ THỐNG (BACKUP & RESTORE) */}
      {/* ======================================================== */}
      {activeTab === 'backup' && (
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-[#bfc9c3]/60 shadow-sm max-w-3xl mx-auto space-y-8">
          <div className="border-b border-[#bfc9c3]/40 pb-4">
            <h3 className="font-display text-2xl font-bold text-[#003527]">
              Sao Lưu & Quản Trị Dữ Liệu Website
            </h3>
            <p className="font-body text-[14px] text-[#404944] mt-1">
              Xuất dữ liệu dự phòng an toàn hoặc khôi phục dữ liệu bài viết, sản phẩm, liên hệ và cài đặt về trạng thái mong muốn.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Export Backup Card */}
            <div className="p-6 rounded-xl border border-[#bfc9c3]/60 bg-[#f8f9ff] flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#eff4ff] text-[#003527] flex items-center justify-center mb-4">
                  <Download className="w-6 h-6" />
                </div>
                <h4 className="font-display text-[18px] font-bold text-[#003527] mb-2">
                  Xuất bản sao lưu (Export JSON)
                </h4>
                <p className="font-body text-[13px] text-[#404944] leading-relaxed mb-6">
                  Tải toàn bộ bài viết blog, sản phẩm shop, danh sách liên hệ khách hàng và cấu hình SEO thành 1 file JSON duy nhất.
                </p>
              </div>

              <button
                onClick={handleDownloadBackup}
                className="w-full bg-[#003527] hover:bg-[#064e3b] text-white py-2.5 rounded-lg font-body font-bold text-[14px] flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
              >
                <Download className="w-4 h-4" /> Tải về file Backup (.json)
              </button>
            </div>

            {/* Import Restore Card */}
            <div className="p-6 rounded-xl border border-[#bfc9c3]/60 bg-[#f8f9ff] flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#eff4ff] text-[#003527] flex items-center justify-center mb-4">
                  <Upload className="w-6 h-6" />
                </div>
                <h4 className="font-display text-[18px] font-bold text-[#003527] mb-2">
                  Khôi phục từ file (Restore JSON)
                </h4>
                <p className="font-body text-[13px] text-[#404944] leading-relaxed mb-6">
                  Nạp lại dữ liệu từ file backup JSON đã lưu trước đó để khôi phục toàn bộ website.
                </p>
              </div>

              <label className="w-full bg-white hover:bg-[#eff4ff] text-[#003527] border border-[#003527]/30 py-2.5 rounded-lg font-body font-bold text-[14px] flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm">
                <Upload className="w-4 h-4" /> Chọn file JSON khôi phục
                <input
                  type="file"
                  accept=".json"
                  onChange={handleUploadBackup}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Backend Infrastructure & Persistence Status Card */}
          <div className="p-6 rounded-xl border border-[#003527]/20 bg-[#eff4ff]/60">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-[#003527] text-[#b0f0d6] flex items-center justify-center">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display text-[16px] font-bold text-[#003527]">
                    Kiến Trúc Backend & Lưu Trữ Bền Vững (Database & Server Engine)
                  </h4>
                  <p className="font-body text-[12px] text-[#404944]">
                    Máy chủ API Node.js Express kết hợp hệ thống tệp lưu trữ tự động đồng bộ và bảo vệ an toàn.
                  </p>
                </div>
              </div>

              <span className={`px-3 py-1 rounded-full text-[12px] font-mono font-bold flex items-center gap-1.5 ${
                backendConnected ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-amber-100 text-amber-800 border border-amber-300'
              }`}>
                <span className={`w-2 h-2 rounded-full ${backendConnected ? 'bg-emerald-600 animate-pulse' : 'bg-amber-500'}`} />
                {backendConnected ? 'API Server Online (Port 3000)' : 'Chế độ Cục bộ (Local Fallback)'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              <div className="bg-white p-3 rounded-lg border border-[#bfc9c3]/50">
                <span className="text-[11px] text-[#404944] font-medium block">Cơ sở dữ liệu</span>
                <span className="font-mono text-[13px] font-bold text-[#003527] truncate block">/data/app-db.json</span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-[#bfc9c3]/50">
                <span className="text-[11px] text-[#404944] font-medium block">Dịch vụ Express</span>
                <span className="font-mono text-[13px] font-bold text-[#003527] block">v4.21 + tsx/esbuild</span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-[#bfc9c3]/50">
                <span className="text-[11px] text-[#404944] font-medium block">Trí tuệ nhân tạo (AI)</span>
                <span className="font-mono text-[13px] font-bold text-[#003527] block">Gemini 3.8 Flash</span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-[#bfc9c3]/50">
                <span className="text-[11px] text-[#404944] font-medium block">Tập dữ liệu quản lý</span>
                <span className="font-mono text-[13px] font-bold text-[#003527] block">
                  {posts.length}b · {products.length}sp · {contacts.length}lh
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#003527]/10 flex-wrap gap-2">
              <span className="text-[12px] text-[#404944] font-body">
                Hỗ trợ mở rộng API endpoints: <code className="font-mono text-[11px] text-[#003527]">/api/posts, /api/projects, /api/products, /api/contacts, /api/orders, /api/ai</code>
              </span>
              <button
                onClick={async () => {
                  try {
                    const res = await fetch('/api/admin/backup', { method: 'POST' });
                    const d = await res.json();
                    if (d.success) {
                      showSuccess('Tạo bản sao lưu Server thành công', `Lưu tại: ${d.backupFile}`);
                    } else {
                      showError('Lỗi sao lưu server', d.error);
                    }
                  } catch (err: any) {
                    showError('Lỗi kết nối', err.message);
                  }
                }}
                className="bg-[#003527] hover:bg-[#064e3b] text-white px-3.5 py-1.5 rounded-lg font-body text-[12px] font-bold transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5 text-[#b0f0d6]" /> Tạo bản sao lưu Snapshot trên Server
              </button>
            </div>
          </div>

          {/* Reset Defaults Card */}
          <div className="p-6 rounded-xl border border-red-200 bg-red-50/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h4 className="font-display text-[16px] font-bold text-red-900 mb-1 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600" /> Khôi phục dữ liệu chuẩn của Cao Nguyễn Nhật Triều
              </h4>
              <p className="font-body text-[13px] text-red-800">
                Xóa tất cả các thay đổi tùy biến tạm thời và đưa toàn bộ nội dung về dữ liệu chuẩn xác ban đầu.
              </p>
            </div>

            <button
              onClick={() => {
                if (window.confirm('Khôi phục toàn bộ dữ liệu về trạng thái chuẩn gốc của Cao Nguyễn Nhật Triều?')) {
                  resetAllData();
                  showSuccess('Đã khôi phục dữ liệu gốc', 'Hệ thống đã nạp lại dữ liệu chuẩn.');
                }
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg font-body font-bold text-[13px] transition-colors cursor-pointer whitespace-nowrap shadow-sm"
            >
              Reset dữ liệu gốc
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB: QUẢN LÝ ĐƠN HÀNG (ORDERS)                           */}
      {/* ======================================================== */}
      {activeTab === 'orders' && (
        <AdminOrdersTab
          orders={orders}
          onUpdateOrderStatus={updateOrderStatus}
          onDeleteOrder={deleteOrder}
        />
      )}

      {/* ======================================================== */}
      {/* TAB: CÔNG CỤ QUẢNG BÁ HIỆN ĐẠI (MARKETING & PROMO)       */}
      {/* ======================================================== */}
      {activeTab === 'marketing' && (
        <AdminMarketingTab
          promoBanner={promoBanner}
          onUpdatePromoBanner={updatePromoBanner}
          utmLinks={utmLinks}
          onCreateUTMLink={createUTMLink}
          onDeleteUTMLink={deleteUTMLink}
          campaigns={campaigns}
          onSendCampaign={sendBroadcastCampaign}
          leadMagnets={leadMagnets}
          onUpdateLeadMagnet={updateLeadMagnet}
          subscribersCount={subscribers.length}
        />
      )}

      {/* ======================================================== */}
      {/* TAB: QUẢN LÝ DỰ ÁN PORTFOLIO (PROJECTS)                  */}
      {/* ======================================================== */}
      {activeTab === 'projects' && (
        <AdminProjectsTab
          projects={projects}
          onAddProject={addProject}
          onUpdateProject={updateProject}
          onDeleteProject={deleteProject}
        />
      )}

      {/* ======================================================== */}
      {/* TAB: ĐỘC GIẢ BẢN TIN (SUBSCRIBERS)                       */}
      {/* ======================================================== */}
      {activeTab === 'subscribers' && (
        <AdminSubscribersTab
          subscribers={subscribers}
          onDeleteSubscriber={deleteSubscriber}
          onNavigateToMarketing={() => setActiveTab('marketing')}
        />
      )}

      {/* ======================================================== */}
      {/* TAB: QUẢN LÝ MÃ QUYỀN HẠN & KHÓA TRUY CẬP (ACCESS CODES) */}
      {/* ======================================================== */}
      {activeTab === 'access-codes' && <AdminAccessCodesTab />}
    </div>
  );
};
