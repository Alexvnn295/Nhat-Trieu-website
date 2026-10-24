/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { NavTab, BlogPost, Project, Product, CartItem } from './types';
import { DataProvider, useData } from './context/DataContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { ToastProvider, useToast } from './context/ToastContext';
import { TopNavBar } from './components/TopNavBar';
import { SmartPromoBanner } from './components/SmartPromoBanner';
import { Footer } from './components/Footer';
import { HomeScreen } from './components/HomeScreen';
import { BlogScreen } from './components/BlogScreen';
import { PortfolioScreen } from './components/PortfolioScreen';
import { ShopScreen } from './components/ShopScreen';
import { AdminScreen } from './components/AdminScreen';
import { ConnectModal } from './components/ConnectModal';
import { ArticleModal } from './components/ArticleModal';
import { ProjectModal } from './components/ProjectModal';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { NoticeModal } from './components/NoticeModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { TechLayeredBackground } from './components/TechLayeredBackground';
import { useDocumentSEO } from './hooks/useDocumentSEO';

function AppContent() {
  const { language, t, posts, projects, products } = useLanguage();
  const { recordUTMClick, promoBanner } = useData();
  const { showCartAdded } = useToast();
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('trieu_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modal States
  const [selectedArticle, setSelectedArticle] = useState<BlogPost | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isConnectOpen, setIsConnectOpen] = useState(false);
  const [connectSubject, setConnectSubject] = useState<string>('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [notice, setNotice] = useState<{ title: string; content: string } | null>(null);

  // Dynamically update document title, meta tags (SEO & GEO), OpenGraph & JSON-LD schema
  useDocumentSEO({
    activeTab,
    language,
    t,
    selectedArticle,
    selectedProject,
    selectedProduct,
  });

  // Sync Cart to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('trieu_cart', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  // Deep-link routing for shared articles, tabs, or projects, and UTM tracking
  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const articleParam = urlParams.get('article');
      const tabParam = urlParams.get('tab') as NavTab | null;
      const utmSource = urlParams.get('utm_source');
      const utmCampaign = urlParams.get('utm_campaign');

      // Record UTM visit
      if (utmSource || utmCampaign) {
        recordUTMClick(utmSource || undefined, utmCampaign || undefined);
      }

      if (tabParam && ['home', 'blog', 'portfolio', 'shop', 'admin'].includes(tabParam)) {
        setActiveTab(tabParam);
      }

      if (articleParam && posts.length > 0) {
        const found = posts.find(
          (p) => String(p.id) === String(articleParam) || p.slug === articleParam
        );
        if (found) {
          setSelectedArticle(found);
        }
      }
    } catch {
      // ignore
    }
  }, [posts, recordUTMClick]);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });

    // Trigger Toast Notification with quick-action to open Cart
    showCartAdded(product, () => setIsCartOpen(true));
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQ = item.quantity + delta;
            return newQ > 0 ? { ...item, quantity: newQ } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleOpenConnectWithPrefill = (subject?: string) => {
    setConnectSubject(subject || '');
    setIsConnectOpen(true);
  };

  const totalCartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9ff] text-[#0b1c30] selection:bg-[#b0f0d6] selection:text-[#003527] relative overflow-x-hidden">
      {/* Living Multi-layered Technology Background System */}
      <TechLayeredBackground activeTab={activeTab} />

      {/* Smart Promotional & Announcement Bar */}
      <SmartPromoBanner config={promoBanner} onNavigateTab={setActiveTab} />

      {/* Top Sticky Header */}
      <TopNavBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenConnect={() => handleOpenConnectWithPrefill()}
      />

      {/* Main View Router */}
      <main className="relative z-10 flex-1 w-full pb-20 md:pb-0 animate-in fade-in duration-300">
        {activeTab === 'home' && (
          <HomeScreen
            onNavigate={setActiveTab}
            onOpenArticle={(post) => setSelectedArticle(post)}
            onOpenProject={(proj) => setSelectedProject(proj)}
            onOpenConnect={(subj) => handleOpenConnectWithPrefill(subj)}
            latestInsightArticle={posts[0]}
            featuredProjects={projects.slice(0, 2)}
          />
        )}

        {activeTab === 'blog' && (
          <BlogScreen
            posts={posts}
            onOpenArticle={(post) => setSelectedArticle(post)}
          />
        )}

        {activeTab === 'portfolio' && (
          <PortfolioScreen
            projects={projects}
            onOpenProject={(proj) => setSelectedProject(proj)}
            onOpenConnect={(subj) => handleOpenConnectWithPrefill(subj)}
          />
        )}

        {activeTab === 'shop' && (
          <ShopScreen
            products={products}
            onAddToCart={handleAddToCart}
            onOpenProductModal={(prod) => setSelectedProduct(prod)}
          />
        )}

        {activeTab === 'admin' && (
          <AdminScreen />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={setActiveTab}
        onOpenConnect={() => handleOpenConnectWithPrefill()}
        onShowNotice={(title, content) => setNotice({ title, content })}
      />

      {/* Mobile Bottom Navigation Bar (Persistent on Mobile Devices) */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={totalCartCount}
        onOpenConnect={() => handleOpenConnectWithPrefill()}
      />

      {/* Interactive Overlays / Modals */}
      <ConnectModal
        isOpen={isConnectOpen}
        onClose={() => {
          setIsConnectOpen(false);
          setConnectSubject('');
        }}
        initialSubject={connectSubject}
      />

      <ArticleModal
        post={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onSelectTag={() => {
          setActiveTab('blog');
        }}
      />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenConnect={(title) => {
          handleOpenConnectWithPrefill(`Dự án: ${title}`);
        }}
      />

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        posts={posts}
        projects={projects}
        products={products}
        onSelectPost={(p) => setSelectedArticle(p)}
        onSelectProject={(p) => setSelectedProject(p)}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      <NoticeModal
        isOpen={notice !== null}
        onClose={() => setNotice(null)}
        title={notice?.title || ''}
        content={notice?.content || ''}
      />
    </div>
  );
}

export default function App() {
  return (
    <DataProvider>
      <LanguageProvider>
        <ToastProvider>
          <AppContent />
        </ToastProvider>
      </LanguageProvider>
    </DataProvider>
  );
}

