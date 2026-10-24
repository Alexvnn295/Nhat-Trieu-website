import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { ShoppingBag, Star, Eye, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ShopScreenProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onOpenProductModal: (product: Product) => void;
}

export const ShopScreen: React.FC<ShopScreenProps> = ({
  products,
  onAddToCart,
  onOpenProductModal,
}) => {
  const { t, formatPrice } = useLanguage();
  const [selectedFilterKey, setSelectedFilterKey] = useState<string>('all');
  const [addedId, setAddedId] = useState<string | null>(null);

  const filters = [
    { key: 'all', label: t('shop.filter.all', 'Tất cả') },
    { key: 'tools', label: t('shop.filter.tools', 'Công cụ số') },
    { key: 'courses', label: t('shop.filter.courses', 'Khóa học') },
    { key: 'books', label: t('shop.filter.books', 'Sách') },
  ];

  const filteredProducts = useMemo(() => {
    if (selectedFilterKey === 'all') return products;
    return products.filter((p) => {
      if (selectedFilterKey === 'tools') {
        return p.category.toLowerCase().includes('công cụ') || p.category.toLowerCase().includes('tool') || p.category.toLowerCase().includes('ツール') || p.category.toLowerCase().includes('工具') || p.category.toLowerCase().includes('outil') || p.category.toLowerCase().includes('digital');
      }
      if (selectedFilterKey === 'courses') {
        return p.category.toLowerCase().includes('khóa học') || p.category.toLowerCase().includes('course') || p.category.toLowerCase().includes('コース') || p.category.toLowerCase().includes('课程') || p.category.toLowerCase().includes('cours') || p.category.toLowerCase().includes('kurs');
      }
      if (selectedFilterKey === 'books') {
        return p.category.toLowerCase().includes('sách') || p.category.toLowerCase().includes('book') || p.category.toLowerCase().includes('本') || p.category.toLowerCase().includes('书') || p.category.toLowerCase().includes('livre') || p.category.toLowerCase().includes('buch');
      }
      return true;
    });
  }, [products, selectedFilterKey]);

  const handleBuyNow = (product: Product) => {
    onAddToCart(product);
    setAddedId(product.id);
    setTimeout(() => {
      setAddedId(null);
    }, 2000);
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-12 md:py-16">
      {/* Header */}
      <div className="mb-10">
        <h1 className="font-display text-[36px] md:text-[48px] font-bold text-[#003527] mb-3">
          {t('shop.title', 'Cửa hàng')}
        </h1>
        <p className="font-body text-[18px] text-[#404944] max-w-2xl">
          {t('shop.subtitle')}
        </p>
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap gap-2.5 mb-10 pb-4 border-b border-[#bfc9c3]/50">
        {filters.map((filter) => {
          const isActive = selectedFilterKey === filter.key;
          return (
            <button
              key={filter.key}
              onClick={() => setSelectedFilterKey(filter.key)}
              className={`px-5 py-2 rounded-full font-body text-[14px] font-medium transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#003527] text-white shadow-sm'
                  : 'bg-white border border-[#bfc9c3]/80 text-[#404944] hover:bg-[#eff4ff] hover:text-[#003527]'
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => {
          const isJustAdded = addedId === product.id;
          return (
            <div
              key={product.id}
              className="bg-white border border-[#bfc9c3]/60 rounded-xl overflow-hidden shadow-sm hover:shadow-[0px_8px_30px_rgba(15,23,42,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Product Image */}
              <div
                onClick={() => onOpenProductModal(product)}
                className="h-60 bg-[#eff4ff] overflow-hidden relative cursor-pointer"
              >
                <img
                  src={product.image}
                  alt={product.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur rounded-full text-[12px] font-body font-bold text-[#003527] border border-[#bfc9c3]/60 shadow-sm">
                  {product.category}
                </span>

                {/* Quick View Hover overlay */}
                <div className="absolute inset-0 bg-[#003527]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-white text-[#003527] px-4 py-2 rounded-full text-[13px] font-bold flex items-center gap-1.5 shadow-md">
                    <Eye className="w-4 h-4" /> {t('shop.viewDetails', 'Xem chi tiết')}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-amber-500 mb-2">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-[13px] font-bold font-body text-[#0b1c30]">
                      {product.rating.toFixed(1)}
                    </span>
                  </div>

                  <h2
                    onClick={() => onOpenProductModal(product)}
                    className="font-display text-[20px] font-bold text-[#0b1c30] mb-2 group-hover:text-[#003527] transition-colors cursor-pointer line-clamp-2"
                  >
                    {product.title}
                  </h2>

                  <p className="font-body text-[14px] text-[#404944] mb-6 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Price & Action */}
                <div className="pt-4 border-t border-[#bfc9c3]/40 flex items-center justify-between">
                  <div>
                    <span className="text-[12px] uppercase text-[#707974] block font-body font-medium">
                      {t('shop.price', 'Giá bán')}
                    </span>
                    <span className="font-display text-[22px] font-bold text-[#003527]">
                      {formatPrice(product.price)}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleBuyNow(product)}
                      className={`px-5 py-2.5 rounded-[4px] font-body text-[14px] font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm ${
                        isJustAdded
                          ? 'bg-[#2b6954] text-white'
                          : 'bg-[#003527] text-white hover:bg-[#064e3b] active:scale-95'
                      }`}
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-4 h-4" /> {t('shop.added', 'Đã thêm')}
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4" /> {t('shop.buyNow', 'Mua ngay')}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

