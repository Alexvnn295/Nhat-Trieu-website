import React, { useState } from 'react';
import { Product } from '../types';
import { X, Star, ShoppingBag, Check, ShieldCheck, Download, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [added, setAdded] = useState(false);
  const { t, formatPrice } = useLanguage();

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto border border-[#bfc9c3]/60 shadow-2xl relative">
        {/* Sticky Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-[#bfc9c3]/50 px-6 py-4 flex items-center justify-between z-20">
          <span className="px-3.5 py-1 bg-[#eff4ff] text-[#003527] text-[12px] font-body font-bold rounded-full border border-[#003527]/10">
            {product.category}
          </span>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#eff4ff] hover:bg-[#dce9ff] text-[#003527] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close product details"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
            {/* Image */}
            <div className="col-span-12 md:col-span-5 rounded-xl overflow-hidden bg-[#eff4ff] border border-[#bfc9c3]/60 max-h-[300px]">
              <img
                src={product.image}
                alt={product.imageAlt}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Basic Info */}
            <div className="col-span-12 md:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-amber-500 mb-2">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-[14px] font-bold font-body text-[#0b1c30]">
                    {product.rating.toFixed(1)} / 5.0
                  </span>
                  <span className="text-[13px] text-[#707974] font-body">
                    ({t('productModal.verifiedQuality', 'Đã kiểm định chất lượng')})
                  </span>
                </div>

                <h1 className="font-display text-[24px] md:text-[28px] font-bold text-[#0b1c30] mb-3 leading-snug">
                  {product.title}
                </h1>

                <p className="font-body text-[15px] text-[#404944] leading-relaxed mb-4">
                  {product.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#bfc9c3]/40 flex items-center justify-between">
                <div>
                  <span className="text-[12px] uppercase text-[#707974] block font-body font-medium">
                    {t('productModal.promoPrice', 'Giá ưu đãi')}
                  </span>
                  <span className="font-display text-[28px] font-bold text-[#003527]">
                    {formatPrice(product.price)}
                  </span>
                </div>

                <button
                  onClick={handleAdd}
                  className={`px-6 py-3 rounded-[4px] font-body text-[15px] font-semibold flex items-center gap-2 cursor-pointer shadow-sm transition-all ${
                    added
                      ? 'bg-[#2b6954] text-white'
                      : 'bg-[#003527] text-white hover:bg-[#064e3b] active:scale-95'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" /> {t('productModal.addedToCart', 'Đã thêm vào giỏ')}
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

          {/* Full Details */}
          <div className="border-t border-[#bfc9c3]/50 pt-6 mb-8">
            <h2 className="font-display text-[18px] font-bold text-[#0b1c30] mb-3">
              {t('productModal.fullDescription', 'Mô tả chi tiết sản phẩm')}
            </h2>
            <p className="font-body text-[15px] text-[#404944] leading-relaxed">
              {product.fullDetails}
            </p>
          </div>

          {/* Features list */}
          <div className="mb-8">
            <h2 className="font-display text-[18px] font-bold text-[#0b1c30] mb-3">
              {t('productModal.benefits', 'Quyền lợi bạn nhận được')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {product.features.map((feat, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2.5 p-3 rounded-lg bg-[#eff4ff]/60 border border-[#bfc9c3]/40 font-body text-[14px] text-[#0b1c30]"
                >
                  <Sparkles className="w-4 h-4 text-[#003527] flex-shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-[#f8f9ff] border border-[#bfc9c3]/50">
            <div className="flex items-center gap-3">
              <Download className="w-5 h-5 text-[#003527]" />
              <div className="font-body text-[13px] text-[#404944]">
                <strong className="text-[#0b1c30] block">
                  {t('productModal.instantDownload', 'Tải về tức thì')}
                </strong>{' '}
                {t('productModal.instantDesc', 'Truy cập file hoặc nội dung khóa học ngay sau khi hoàn tất.')}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#003527]" />
              <div className="font-body text-[13px] text-[#404944]">
                <strong className="text-[#0b1c30] block">
                  {t('productModal.satisfaction', 'Bảo đảm hài lòng')}
                </strong>{' '}
                {t('productModal.satisfactionDesc', 'Hỗ trợ giải đáp chuyên môn và cập nhật định kỳ miễn phí.')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

