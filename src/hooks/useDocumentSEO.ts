import { useEffect } from 'react';
import { NavTab, BlogPost, Project, Product, SupportedLanguage } from '../types';

interface SEOOptions {
  activeTab: NavTab;
  language: SupportedLanguage;
  t: (key: string, defaultText?: string) => string;
  selectedArticle?: BlogPost | null;
  selectedProject?: Project | null;
  selectedProduct?: Product | null;
}

const LOCALE_MAP: Record<SupportedLanguage, string> = {
  vi: 'vi_VN',
  en: 'en_US',
  ja: 'ja_JP',
  zh: 'zh_CN',
  fr: 'fr_FR',
  de: 'de_DE',
};

const DEFAULT_IMAGE = '/images/profile/GRU02101.JPG?v=4';

/**
 * Custom hook to dynamically manage Document Title, Meta Description,
 * OpenGraph, Twitter Cards, GEO tags, and JSON-LD Structured Data for SEO and GEO (Generative Engine Optimization).
 */
export function useDocumentSEO({
  activeTab,
  language,
  t,
  selectedArticle,
  selectedProject,
  selectedProduct,
}: SEOOptions) {
  useEffect(() => {
    // 1. Determine Title, Description, Image, Type, and Canonical URL
    let title = '';
    let description = '';
    let image = DEFAULT_IMAGE;
    let ogType = 'website';
    let url = typeof window !== 'undefined' ? window.location.origin + window.location.pathname : '';
    let keywords = t('seo.keywords', 'Cao Nguyễn Nhật Triều, Hoạch định chiến lược, Tối ưu vận hành, Kinh tế lượng, EdTech, FinTech');

    if (selectedArticle) {
      title = `${selectedArticle.title} | Cao Nguyễn Nhật Triều`;
      description = selectedArticle.excerpt;
      image = selectedArticle.image || DEFAULT_IMAGE;
      ogType = 'article';
      url += `?tab=blog&article=${selectedArticle.id}`;
      keywords = `${selectedArticle.tags?.join(', ') || ''}, ${keywords}`;
    } else if (selectedProject) {
      title = `${selectedProject.title} | Cao Nguyễn Nhật Triều`;
      description = selectedProject.description;
      image = selectedProject.image || DEFAULT_IMAGE;
      ogType = 'website';
      url += `?tab=portfolio&project=${selectedProject.id}`;
      keywords = `${selectedProject.techStack?.join(', ') || ''}, ${keywords}`;
    } else if (selectedProduct) {
      title = `${selectedProduct.title} | Cao Nguyễn Nhật Triều`;
      description = selectedProduct.description;
      image = selectedProduct.image || DEFAULT_IMAGE;
      ogType = 'product';
      url += `?tab=shop&product=${selectedProduct.id}`;
    } else {
      // Tab-specific metadata
      switch (activeTab) {
        case 'blog':
          title = t('seo.blog.title', 'Góc nhìn & Bài viết Chuyên sâu | Cao Nguyễn Nhật Triều');
          description = t('seo.blog.desc', 'Khám phá các bài viết nghiên cứu và phân tích chuyên sâu về Kinh tế học, Chuyển đổi số Giáo dục và Công nghệ.');
          url += '?tab=blog';
          break;
        case 'portfolio':
          title = t('seo.portfolio.title', 'Dự án & Năng lực Tiêu biểu | Cao Nguyễn Nhật Triều');
          description = t('seo.portfolio.desc', 'Danh mục các dự án tiêu biểu, nền tảng số và hệ sinh thái công nghệ do Cao Nguyễn Nhật Triều trực tiếp kiến trúc.');
          url += '?tab=portfolio';
          break;
        case 'shop':
          title = t('seo.shop.title', 'Cửa hàng Tài nguyên Số & Khóa học | Cao Nguyễn Nhật Triều');
          description = t('seo.shop.desc', 'Tài liệu đào tạo chuyên sâu, khung mẫu phân tích tài chính định lượng và mã nguồn giải pháp công nghệ độc quyền.');
          url += '?tab=shop';
          break;
        case 'home':
        default:
          title = t('seo.home.title', 'Cao Nguyễn Nhật Triều - Chiến lược, Vận hành, Giáo dục & Công nghệ');
          description = t('seo.home.desc', 'Trang cá nhân chính thức của Cao Nguyễn Nhật Triều - Chuyên gia hoạch định chiến lược, tối ưu vận hành, giáo dục EdTech và kiến trúc công nghệ.');
          break;
      }
    }

    // 2. Update Document Title
    document.title = title;

    // 3. Update HTML lang attribute
    document.documentElement.lang = language || 'vi';

    // 4. Helper function to update or create meta tags
    const setMetaTag = (attrName: 'name' | 'property', attrValue: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Standard SEO Tags
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'keywords', keywords);
    setMetaTag('name', 'author', 'Cao Nguyễn Nhật Triều');
    setMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    // GEO (Generative Engine Optimization & Regional Metadata)
    setMetaTag('name', 'geo.region', 'VN');
    setMetaTag('name', 'geo.placename', 'Ho Chi Minh City, Vietnam');
    setMetaTag('name', 'geo.position', '10.8231;106.6297');
    setMetaTag('name', 'ICBM', '10.8231, 106.6297');

    // OpenGraph Tags
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', url);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:site_name', 'Cao Nguyễn Nhật Triều');
    setMetaTag('property', 'og:image', image);
    setMetaTag('property', 'og:locale', LOCALE_MAP[language] || 'vi_VN');

    // Twitter / Social Card Metadata Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', image);

    // 5. Update or create Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', url);

    // 6. Dynamic JSON-LD Structured Data Schema for Generative AI & Search Crawlers
    const schemaId = 'seo-schema-jsonld';
    let scriptTag = document.getElementById(schemaId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = schemaId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const basePersonSchema = {
      '@type': 'Person',
      name: 'Cao Nguyễn Nhật Triều',
      alternateName: 'Cao Nguyen Nhat Trieu',
      jobTitle: 'Chuyên gia Chiến lược, Vận hành, Giáo dục & Công nghệ',
      url: window.location.origin,
      sameAs: [
        'https://www.linkedin.com/in/trieucnn',
        'https://github.com/trieucnn',
        'https://open.spotify.com/show/7EHXAnC6XzGiFMpkkCu6Sq',
        'https://youtube.com/@TrieuCaoandTalks',
      ],
      knowsAbout: [
        'Strategic Planning',
        'Operational Excellence',
        'Sales Management',
        'Econometrics',
        'Quantitative Finance',
        'EdTech & Curriculum Design',
        'Enterprise Software Architecture',
        'Bancassurance & FinTech',
      ],
    };

    let structuredData: any = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          name: 'Cao Nguyễn Nhật Triều Official Website',
          url: window.location.origin,
          description: description,
          inLanguage: language,
          author: basePersonSchema,
        },
        basePersonSchema,
      ],
    };

    if (selectedArticle) {
      structuredData['@graph'].push({
        '@type': 'BlogPosting',
        headline: selectedArticle.title,
        description: selectedArticle.excerpt,
        image: selectedArticle.image,
        datePublished: selectedArticle.date,
        author: basePersonSchema,
        publisher: basePersonSchema,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': url,
        },
        keywords: selectedArticle.tags?.join(', '),
        inLanguage: language,
      });
    } else if (selectedProduct) {
      structuredData['@graph'].push({
        '@type': 'Product',
        name: selectedProduct.title,
        description: selectedProduct.description,
        image: selectedProduct.image,
        category: selectedProduct.category,
        offers: {
          '@type': 'Offer',
          price: selectedProduct.price,
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          url: url,
        },
      });
    } else if (selectedProject) {
      structuredData['@graph'].push({
        '@type': 'CreativeWork',
        name: selectedProject.title,
        description: selectedProject.description,
        image: selectedProject.image,
        creator: basePersonSchema,
        keywords: selectedProject.techStack?.join(', '),
      });
    }

    scriptTag.text = JSON.stringify(structuredData);
  }, [activeTab, language, t, selectedArticle, selectedProject, selectedProduct]);
}
