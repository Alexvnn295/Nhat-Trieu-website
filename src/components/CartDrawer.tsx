import React, { useState } from 'react';
import { CartItem, CodeValidationResult } from '../types';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle2, Tag, CreditCard, QrCode, ShieldCheck, Mail, Key, Sparkles, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { useData } from '../context/DataContext';
import { SYSTEM_PERMISSIONS } from '../data/accessCodesData';
import { BankQRCodeTransfer } from './BankQRCodeTransfer';
import { PayPalPayment } from './PayPalPayment';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const { language, t, formatPrice } = useLanguage();
  const { showSuccess, showError } = useToast();
  const { verifyAndApplyCode, recordCodeUsage, submitOrder } = useData();

  const [couponCode, setCouponCode] = useState('');
  const [appliedCodeResult, setAppliedCodeResult] = useState<CodeValidationResult | null>(null);
  const [appliedCodeString, setAppliedCodeString] = useState<string>('');
  const [couponMessage, setCouponMessage] = useState<string | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'qr' | 'paypal' | 'card'>('qr');
  const [orderComplete, setOrderComplete] = useState(false);
  const [customerEmail, setCustomerEmail] = useState('');
  const [orderCode, setOrderCode] = useState(() => `TRIEU${Math.floor(100000 + Math.random() * 900000)}`);

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  let discountAmount = 0;
  let discountPercent = 0;
  if (appliedCodeResult && appliedCodeResult.isValid) {
    if (appliedCodeResult.isFullAccess) {
      discountPercent = 100;
      discountAmount = subtotal;
    } else if (appliedCodeResult.discountPercent > 0) {
      discountPercent = appliedCodeResult.discountPercent;
      discountAmount = (subtotal * discountPercent) / 100;
    } else if (appliedCodeResult.discountAmountUsd > 0) {
      discountAmount = Math.min(subtotal, appliedCodeResult.discountAmountUsd);
      discountPercent = subtotal > 0 ? Math.round((discountAmount / subtotal) * 100) : 0;
    }
  }

  const total = Math.max(0, subtotal - discountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) {
      setCouponMessage(language === 'vi' ? 'Vui lòng nhập mã ưu đãi hoặc mã quyền truy cập.' : 'Please enter your access or promo code.');
      return;
    }

    const result = verifyAndApplyCode(couponCode, items);
    if (result.isValid) {
      setAppliedCodeResult(result);
      setAppliedCodeString(couponCode.trim().toUpperCase());
      if (result.isFullAccess) {
        setCouponMessage(language === 'vi' ? 'Đã kích hoạt Mã đặc quyền VIP 100% (Miễn phí toàn bộ)' : 'VIP 100% Full Access Granted (100% Free)');
      } else if (result.discountPercent > 0) {
        setCouponMessage(language === 'vi' ? `Áp dụng mã thành công: Giảm ${result.discountPercent}%` : `Code applied: -${result.discountPercent}% off`);
      } else {
        setCouponMessage(language === 'vi' ? 'Áp dụng mã quyền hạn thành công!' : 'Access code applied successfully!');
      }
    } else {
      setAppliedCodeResult(null);
      setAppliedCodeString('');
      setCouponMessage(result.errorMessage || (language === 'vi' ? 'Mã không hợp lệ hoặc đã hết hạn.' : 'Invalid or expired code.'));
    }
  };

  const handleRemoveAppliedCode = () => {
    setAppliedCodeResult(null);
    setAppliedCodeString('');
    setCouponCode('');
    setCouponMessage(null);
  };

  const handleStartCheckout = () => {
    setOrderCode(`TRIEU${Math.floor(100000 + Math.random() * 900000)}`);
    setIsCheckingOut(true);
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerEmail.trim()) return;

    if (appliedCodeString) {
      recordCodeUsage(appliedCodeString);
    }

    // Persist confirmed order to backend database
    submitOrder({
      id: orderCode,
      customerName: customerEmail.split('@')[0] || 'Khách hàng',
      customerEmail: customerEmail.trim(),
      items: items.map((i) => ({
        id: i.product.id,
        title: i.product.title,
        priceUsd: i.product.price,
        quantity: i.quantity,
      })),
      totalAmountUsd: total,
      currency: 'USD',
      status: 'completed',
      accessCodeUsed: appliedCodeString || undefined,
      paymentMethod: paymentMethod === 'qr' ? 'QR Ngân hàng VN' : paymentMethod === 'paypal' ? 'PayPal International' : 'Thẻ Quốc Tế',
      notes: `Đơn hàng trực tuyến từ gian hàng chuyên gia`,
    }).catch((err) => console.warn('[CartDrawer] Backend submitOrder error:', err));

    setIsCheckingOut(false);
    setOrderComplete(true);
    showSuccess(
      t('cart.orderSuccess', 'Đặt hàng thành công!'),
      t('cart.orderSuccessDesc', 'Đường dẫn tải tài nguyên số và hướng dẫn truy cập đã được gửi đến email của bạn.')
    );
    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className={`bg-white w-full ${isCheckingOut ? 'max-w-xl' : 'max-w-md'} h-full flex flex-col shadow-2xl border-l border-[#bfc9c3]/60 relative z-10 transition-all duration-200`}>
        {/* Header */}
        <div className="p-6 border-b border-[#bfc9c3]/50 flex items-center justify-between bg-[#f8f9ff]">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#003527]" />
            <h2 className="font-display text-[20px] font-bold text-[#003527]">
              {isCheckingOut ? (language === 'vi' ? 'Thanh toán đơn hàng' : 'Checkout Order') : t('cart.title', 'Giỏ hàng của bạn')}
            </h2>
            {!isCheckingOut && (
              <span className="bg-[#eff4ff] text-[#003527] px-2.5 py-0.5 rounded-full text-[12px] font-bold">
                {items.reduce((s, i) => s + i.quantity, 0)}
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#eff4ff] hover:bg-[#dce9ff] text-[#003527] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 md:p-6">
          {orderComplete ? (
            <div className="py-10 text-center">
              <div className="w-16 h-16 bg-[#b0f0d6] text-[#003527] rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="font-display text-[22px] font-bold text-[#003527] mb-2">
                {t('cart.orderSuccess', 'Đặt hàng thành công!')}
              </h3>
              <div className="inline-block px-3 py-1 bg-[#eff4ff] rounded-lg text-[13px] font-mono font-bold text-[#003527] mb-3">
                Mã đơn: #{orderCode}
              </div>
              <p className="font-body text-[14px] text-[#404944] mb-6 leading-relaxed max-w-sm mx-auto">
                {t('cart.orderSuccessDesc', 'Đường dẫn tải tài nguyên số và hướng dẫn truy cập đã được gửi đến')} <strong>{customerEmail}</strong>.
              </p>
              <button
                onClick={() => {
                  setOrderComplete(false);
                  onClose();
                }}
                className="bg-[#003527] text-white px-6 py-2.5 rounded-xl font-body text-[14px] font-medium hover:bg-[#064e3b] cursor-pointer shadow-sm"
              >
                {t('cart.continueShopping', 'Tiếp tục xem cửa hàng')}
              </button>
            </div>
          ) : isCheckingOut ? (
            <form onSubmit={handleCheckoutSubmit} className="space-y-4">
              {/* Recipient Email */}
              <div className="bg-[#f8f9ff] p-3.5 rounded-xl border border-[#bfc9c3]/50">
                <label className="block font-body text-[13px] font-bold text-[#0b1c30] mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-[#003527]" />
                  <span>{t('cart.emailLabel', 'Email nhận tài liệu / khóa học')}</span>
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#bfc9c3] rounded-lg text-[14px] font-body focus:border-[#003527] focus:ring-1 focus:ring-[#003527] outline-none"
                />
                <span className="text-[11px] text-[#707974] block mt-1">
                  {language === 'vi' ? 'Hệ thống sẽ gửi link tải tài liệu và key bản quyền tới email này.' : 'System will deliver digital download access link to this email.'}
                </span>
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block font-body text-[13px] font-bold text-[#0b1c30] mb-2">
                  {t('cart.paymentMethod', 'Phương thức thanh toán')}
                </label>
                <div className="grid grid-cols-3 gap-1.5 font-body text-[12px] md:text-[13px]">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('qr')}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      paymentMethod === 'qr'
                        ? 'border-[#003527] bg-[#eff4ff] text-[#003527] font-bold shadow-xs'
                        : 'border-[#bfc9c3]/70 bg-white text-[#404944] hover:bg-[#f8f9ff]'
                    }`}
                  >
                    <QrCode className="w-4 h-4 mb-1 text-[#003527]" />
                    <span className="leading-tight">{language === 'vi' ? 'VietQR 24/7' : 'VietQR'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paypal')}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      paymentMethod === 'paypal'
                        ? 'border-[#0079C1] bg-[#eff7ff] text-[#003087] font-bold shadow-xs'
                        : 'border-[#bfc9c3]/70 bg-white text-[#404944] hover:bg-[#f8f9ff]'
                    }`}
                  >
                    <span className="font-serif italic font-black text-[#0079C1] text-[15px] leading-none mb-1">P</span>
                    <span className="leading-tight">PayPal</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'border-[#003527] bg-[#eff4ff] text-[#003527] font-bold shadow-xs'
                        : 'border-[#bfc9c3]/70 bg-white text-[#404944] hover:bg-[#f8f9ff]'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 mb-1 text-[#003527]" />
                    <span className="leading-tight">{language === 'vi' ? 'Thẻ Quốc tế' : 'Credit Card'}</span>
                  </button>
                </div>
              </div>

              {/* Dynamic Payment Body: VietQR, PayPal, or Card */}
              {paymentMethod === 'qr' ? (
                <div className="pt-1">
                  <BankQRCodeTransfer
                    totalUsd={total}
                    orderId={orderCode}
                    customerEmail={customerEmail}
                  />
                </div>
              ) : paymentMethod === 'paypal' ? (
                <div className="pt-1">
                  <PayPalPayment
                    totalUsd={total}
                    orderId={orderCode}
                    customerEmail={customerEmail}
                  />
                </div>
              ) : (
                <div className="p-4 bg-[#f8f9ff] rounded-2xl border border-[#bfc9c3]/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-bold text-[#0b1c30]">Thông tin thẻ thanh toán quốc tế</span>
                    <span className="text-[11px] text-[#707974]">Visa / Master / JCB</span>
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="4111 2222 3333 4444"
                      maxLength={19}
                      className="w-full px-3.5 py-2 bg-white border border-[#bfc9c3] rounded-lg text-[13px] font-mono outline-none focus:border-[#003527]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      maxLength={5}
                      className="w-full px-3.5 py-2 bg-white border border-[#bfc9c3] rounded-lg text-[13px] font-mono outline-none focus:border-[#003527]"
                    />
                    <input
                      type="password"
                      placeholder="CVC / CVV"
                      maxLength={4}
                      className="w-full px-3.5 py-2 bg-white border border-[#bfc9c3] rounded-lg text-[13px] font-mono outline-none focus:border-[#003527]"
                    />
                  </div>
                </div>
              )}

              {/* Price Summary Row */}
              <div className="pt-3 border-t border-[#bfc9c3]/50">
                <div className="flex justify-between items-center font-body text-[14px] text-[#404944] mb-1">
                  <span>{t('cart.total', 'Tổng cộng')}:</span>
                  <div className="text-right">
                    <span className="font-bold text-[#003527] font-display text-[19px] block">
                      {formatPrice(total)}
                    </span>
                    {language !== 'vi' && (
                      <span className="text-[12px] text-[#707974] font-body">
                        (~{Math.round(total * 25400).toLocaleString('vi-VN')} ₫)
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCheckingOut(false)}
                  className="w-1/3 py-3 border border-[#bfc9c3] rounded-xl font-body text-[14px] font-medium text-[#404944] hover:bg-[#f8f9ff] cursor-pointer transition-colors"
                >
                  {t('cart.back', 'Quay lại')}
                </button>
                <button
                  type="submit"
                  className={`w-2/3 py-3 rounded-xl font-body text-[14px] font-bold text-white cursor-pointer shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 ${
                    paymentMethod === 'paypal'
                      ? 'bg-[#003087] hover:bg-[#00205b]'
                      : 'bg-[#003527] hover:bg-[#064e3b]'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    {paymentMethod === 'qr'
                      ? (language === 'vi' ? 'Xác nhận đã chuyển khoản' : 'I Have Transferred')
                      : paymentMethod === 'paypal'
                      ? (language === 'vi' ? 'Xác nhận đã chuyển PayPal' : 'Confirm PayPal Transfer')
                      : t('cart.confirmPayment', 'Xác nhận thanh toán')}
                  </span>
                </button>
              </div>
            </form>
          ) : items.length === 0 ? (
            <div className="py-16 text-center text-[#707974]">
              <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-40 text-[#003527]" />
              <p className="font-body text-[16px] text-[#404944] mb-2 font-medium">
                {t('cart.empty', 'Giỏ hàng của bạn đang trống')}
              </p>
              <p className="font-body text-[13px] text-[#707974] max-w-xs mx-auto mb-6">
                {t('cart.emptyDesc', 'Hãy khám phá các công cụ và tài nguyên số chuyên sâu tại mục Cửa hàng.')}
              </p>
              <button
                onClick={onClose}
                className="bg-[#003527] text-white px-6 py-2.5 rounded-xl font-body text-[14px] font-medium hover:bg-[#064e3b] cursor-pointer"
              >
                {t('cart.browseProducts', 'Khám phá sản phẩm')}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3.5 p-3 rounded-xl border border-[#bfc9c3]/50 bg-[#f8f9ff]"
                >
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#eff4ff] flex-shrink-0 border border-[#bfc9c3]/40">
                    <img
                      src={item.product.image}
                      alt={item.product.imageAlt}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-display text-[14px] font-bold text-[#0b1c30] line-clamp-1">
                          {item.product.title}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-[#707974] hover:text-red-600 transition-colors p-1 cursor-pointer"
                          title="Xóa khỏi giỏ"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="font-body text-[12px] text-[#707974]">
                        {item.product.category}
                      </span>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      <span className="font-display text-[15px] font-bold text-[#003527]">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>

                      <div className="flex items-center gap-2 border border-[#bfc9c3] rounded-lg bg-white px-2 py-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="text-[#404944] hover:text-[#003527] cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-body text-[13px] font-bold px-1 min-w-[18px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="text-[#404944] hover:text-[#003527] cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Access & Promo Code Input / Applied Badge */}
              <div className="pt-4 border-t border-[#bfc9c3]/50">
                {appliedCodeResult && appliedCodeResult.isValid ? (
                  <div className="bg-[#eff4ff] border border-[#003527]/30 rounded-xl p-3.5 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="p-1 rounded-md bg-[#003527] text-white">
                          <Key className="w-3.5 h-3.5" />
                        </span>
                        <div>
                          <span className="font-mono text-[13px] font-bold text-[#003527]">
                            {appliedCodeString}
                          </span>
                          <span className="ml-2 text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#10b981]/20 text-[#003527] border border-[#10b981]/40">
                            {appliedCodeResult.isFullAccess
                              ? 'VIP 100% OFF'
                              : `-${appliedCodeResult.discountPercent}% OFF`}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleRemoveAppliedCode}
                        className="text-[#707974] hover:text-red-600 text-[12px] font-medium transition-colors cursor-pointer"
                      >
                        {language === 'vi' ? 'Hủy mã' : 'Remove'}
                      </button>
                    </div>

                    {appliedCodeResult.grantedPermissions && appliedCodeResult.grantedPermissions.length > 0 && (
                      <div className="pt-1.5 border-t border-[#003527]/10">
                        <span className="text-[11px] font-bold text-[#003527] block mb-1">
                          {language === 'vi' ? 'Quyền hạn được cấp kèm theo:' : 'Granted Privileges:'}
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {appliedCodeResult.grantedPermissions.map((permId) => {
                            const opt = SYSTEM_PERMISSIONS.find((p) => p.id === permId);
                            return (
                              <span
                                key={permId}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-white border border-[#003527]/20 text-[#003527]"
                              >
                                <Sparkles className="w-2.5 h-2.5 text-[#10b981]" />
                                {opt ? (language === 'vi' ? opt.nameVi : opt.nameEn) : permId}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon}>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Key className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#707974]" />
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder={t('cart.couponPlaceholder', 'Nhập mã ưu đãi hoặc mã quyền truy cập')}
                          className="w-full pl-9 pr-3 py-2 bg-[#f8f9ff] border border-[#bfc9c3] rounded-lg text-[13px] font-body uppercase outline-none focus:border-[#003527]"
                        />
                      </div>
                      <button
                        type="submit"
                        className="bg-[#003527] text-white px-4 py-2 rounded-lg text-[13px] font-body font-medium hover:bg-[#064e3b] cursor-pointer"
                      >
                        {t('cart.apply', 'Áp dụng')}
                      </button>
                    </div>
                    {couponMessage && (
                      <p className="font-body text-[12px] mt-1.5 text-red-600">
                        {couponMessage}
                      </p>
                    )}
                  </form>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer with totals */}
        {!orderComplete && !isCheckingOut && items.length > 0 && (
          <div className="p-6 border-t border-[#bfc9c3]/50 bg-[#f8f9ff]">
            <div className="space-y-1.5 mb-4 font-body text-[14px]">
              <div className="flex justify-between text-[#404944]">
                <span>{t('cart.subtotal', 'Tạm tính')}:</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>{t('cart.discount', 'Giảm giá')} ({discountPercent}%):</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-[#0b1c30] text-[17px] pt-2 border-t border-[#bfc9c3]/40 font-display">
                <span>{t('cart.total', 'Tổng cộng')}:</span>
                <span className="text-[#003527]">{formatPrice(total)}</span>
              </div>
            </div>

            <button
              onClick={handleStartCheckout}
              className="w-full bg-[#003527] text-white py-3.5 rounded-xl font-body text-[15px] font-semibold hover:bg-[#064e3b] transition-transform duration-100 active:scale-95 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <span>{t('cart.proceedCheckout', 'Tiến hành thanh toán')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};


