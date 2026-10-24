import React from 'react';
import { Linkedin, Github, Youtube, Headphones } from 'lucide-react';
import { NavTab } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { NewsletterSubscription } from './NewsletterSubscription';

interface FooterProps {
  onNavigate: (tab: NavTab) => void;
  onOpenConnect: () => void;
  onShowNotice?: (title: string, content: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenConnect, onShowNotice }) => {
  const { t } = useLanguage();

  const handlePolicyClick = (e: React.MouseEvent, type: string) => {
    e.preventDefault();
    if (onShowNotice) {
      if (type === 'privacy') {
        onShowNotice(
          t('footer.privacyTitle', 'Chính sách bảo mật (Privacy Policy)'),
          t('footer.privacyDesc', 'Chúng tôi cam kết bảo vệ tuyệt đối thông tin cá nhân và dữ liệu liên hệ của bạn. Mọi email đăng ký bản tin hoặc thông tin dự án chỉ được sử dụng cho mục đích liên lạc chuyên nghiệp và không bao giờ được chia sẻ với bên thứ ba.')
        );
      } else if (type === 'terms') {
        onShowNotice(
          t('footer.termsTitle', 'Điều khoản dịch vụ (Terms of Service)'),
          t('footer.termsDesc', 'Tất cả tài nguyên học tập, ấn phẩm số, công cụ phần mềm và tài liệu phân tích thuộc quyền sở hữu trí tuệ của tác giả Cao Nguyễn Nhật Triều. Bạn được cấp quyền sử dụng phi thương mại đối với sản phẩm đã thanh toán.')
        );
      } else if (type === 'rss') {
        onShowNotice(
          t('footer.rssTitle', 'RSS Feed & Nguồn cấp dữ liệu'),
          t('footer.rssDesc', 'Nguồn tin RSS của blog đang hoạt động tại: /feed.xml. Bạn có thể thêm vào Feedly, Inoreader hoặc trình đọc RSS ưa thích của bạn để cập nhật bài viết mới nhất.')
        );
      } else if (type === 'sitemap') {
        onShowNotice(
          t('footer.sitemapTitle', 'Sitemap - Sơ đồ website'),
          t('footer.sitemapDesc', 'Cấu trúc trang: 1. Trang chủ (Home) | 2. Blog & Chia sẻ kiến thức | 3. Danh mục dự án (Portfolio) | 4. Cửa hàng tài nguyên số (Shop) | 5. Kết nối hợp tác (Connect).')
        );
      }
    }
  };

  const socialLinks = [
    {
      name: 'YouTube',
      href: 'https://www.youtube.com/@TrieuCaoandTalks',
      icon: Youtube,
      ariaLabel: 'Kênh YouTube Trieu Cao & Talks của Cao Nguyễn Nhật Triều',
    },
    {
      name: 'Podcast',
      href: 'https://open.spotify.com/show/7EHXAnC6XzGiFMpkkCu6Sq?si=e89ea1f2bbb14cbf',
      icon: Headphones,
      ariaLabel: 'Kênh Podcast Spotify Trieu Cao & Talks của Cao Nguyễn Nhật Triều',
    },
    {
      name: 'LinkedIn',
      href: 'https://vn.linkedin.com/in/alexvnn295',
      icon: Linkedin,
      ariaLabel: 'Hồ sơ LinkedIn của Cao Nguyễn Nhật Triều',
    },
    {
      name: 'GitHub',
      href: 'https://github.com/Alexvnn295',
      icon: Github,
      ariaLabel: 'Trang mã nguồn GitHub của Cao Nguyễn Nhật Triều (Alexvnn295)',
    },
  ];

  return (
    <footer id="main-footer" className="relative z-10 bg-white border-t border-[#bfc9c3]/50 w-full mt-20">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 pt-12 pb-10">
        {/* Newsletter Subscription in Footer to capture leads & build audience */}
        <div className="mb-12">
          <NewsletterSubscription variant="footer" />
        </div>

        {/* Brand, Socials & Legal navigation */}
        <div className="pt-8 border-t border-[#bfc9c3]/40 flex flex-col md:flex-row justify-between items-center w-full gap-6 text-center md:text-left">
          {/* Brand & Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <div className="font-display text-xl font-bold text-[#003527] tracking-tight">
              Cao Nguyễn Nhật Triều
            </div>
            <span className="hidden sm:inline text-[#bfc9c3]">•</span>
            <div className="font-body text-[14px] text-[#404944]">
              © {new Date().getFullYear()} Cao Nguyễn Nhật Triều. {t('footer.allRightsReserved', 'All rights reserved.')}
            </div>
          </div>

          {/* Social Media Links */}
          <div id="footer-social-links" className="flex items-center gap-3">
            {socialLinks.map((social) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={social.name}
                  id={`footer-social-${social.name.toLowerCase()}`}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.ariaLabel}
                  title={social.name}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-[#404944] hover:text-[#003527] hover:bg-[#eff4ff] border border-[#e2e8e4] hover:border-[#003527]/30 transition-all duration-200"
                >
                  <IconComponent className="w-5 h-5" />
                </a>
              );
            })}
          </div>

          {/* Legal Links */}
          <nav id="footer-legal-nav" className="flex flex-wrap justify-center gap-6 font-body text-[14px]">
            <button
              id="footer-privacy-btn"
              onClick={(e) => handlePolicyClick(e, 'privacy')}
              className="text-[#404944] hover:text-[#003527] transition-colors cursor-pointer"
            >
              {t('footer.privacy', 'Privacy Policy')}
            </button>
            <button
              id="footer-terms-btn"
              onClick={(e) => handlePolicyClick(e, 'terms')}
              className="text-[#404944] hover:text-[#003527] transition-colors cursor-pointer"
            >
              {t('footer.terms', 'Terms of Service')}
            </button>
            <button
              id="footer-rss-btn"
              onClick={(e) => handlePolicyClick(e, 'rss')}
              className="text-[#404944] hover:text-[#003527] transition-colors cursor-pointer"
            >
              {t('footer.rss', 'RSS Feed')}
            </button>
            <button
              id="footer-sitemap-btn"
              onClick={(e) => handlePolicyClick(e, 'sitemap')}
              className="text-[#404944] hover:text-[#003527] transition-colors cursor-pointer"
            >
              {t('footer.sitemap', 'Sitemap')}
            </button>
            <button
              id="footer-admin-btn"
              onClick={() => {
                onNavigate('admin');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-[#003527] font-semibold hover:underline transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>⚙️ {t('footer.admin', 'Quản trị Web')}</span>
            </button>
          </nav>
        </div>
      </div>
    </footer>
  );
};

