import React, { useState } from 'react';
import { Copy, Check, ExternalLink, ShieldCheck, Mail, Globe, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface PayPalPaymentProps {
  totalUsd: number;
  orderId?: string;
  customerEmail?: string;
}

export const PayPalPayment: React.FC<PayPalPaymentProps> = ({
  totalUsd,
  orderId = `TRIEU${Math.floor(100000 + Math.random() * 900000)}`,
  customerEmail = '',
}) => {
  const { language } = useLanguage();
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const paypalEmail = 'trieu2905vnn@gmail.com';
  const paypalRecipientName = 'CAO NGUYEN NHAT TRIEU';
  const transferMemo = customerEmail
    ? `TRIEU ${orderId} ${customerEmail.split('@')[0]}`.slice(0, 50).toUpperCase()
    : `TRIEU ${orderId}`;

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  };

  const paypalDirectUrl = `https://www.paypal.com/myaccount/transfer/homepage/buy/send`;

  return (
    <div className="bg-[#fcfdfd] border border-[#0079C1]/25 rounded-2xl p-4 md:p-5 shadow-xs space-y-4">
      {/* Header with PayPal branding */}
      <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#0079C1]/15">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#003087] text-white flex items-center justify-center font-bold font-serif text-[18px] shadow-xs">
            <span className="italic tracking-tighter text-[#0079C1] bg-white rounded px-1 py-0.2 text-[14px]">P</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="font-display text-[16px] font-bold text-[#003087]">
                PayPal Checkout
              </h4>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                Global
              </span>
            </div>
            <p className="text-[12px] font-body text-[#707974]">
              {language === 'vi'
                ? 'Thanh toán quốc tế bảo mật qua tài khoản PayPal'
                : 'Secure international payment via PayPal account'}
            </p>
          </div>
        </div>

        <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold font-body px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
          Buyer Protection
        </span>
      </div>

      {/* Main Details Card */}
      <div className="space-y-2.5">
        {/* PayPal Email Field */}
        <div className="p-3 bg-[#eff7ff] rounded-xl border border-[#0079C1]/30 flex items-center justify-between">
          <div className="pr-2">
            <span className="text-[11px] font-bold text-[#00457C] uppercase tracking-wider block mb-0.5 flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-[#0079C1]" />
              {language === 'vi' ? 'Email PayPal nhận thanh toán' : 'PayPal Recipient Email'}
            </span>
            <span className="font-mono text-[14px] md:text-[15px] font-bold text-[#003087] select-all">
              {paypalEmail}
            </span>
          </div>
          <button
            type="button"
            onClick={() => handleCopy(paypalEmail, 'paypalEmail')}
            className="flex items-center gap-1 px-3 py-1.5 text-[12px] font-bold bg-[#0079C1] hover:bg-[#00457C] text-white rounded-lg transition-colors cursor-pointer flex-shrink-0 shadow-xs"
          >
            {copiedField === 'paypalEmail' ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>{language === 'vi' ? 'Đã chép' : 'Copied'}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>{language === 'vi' ? 'Sao chép' : 'Copy'}</span>
              </>
            )}
          </button>
        </div>

        {/* Account Holder Name */}
        <div className="p-2.5 bg-white rounded-xl border border-[#bfc9c3]/50 flex items-center justify-between">
          <div className="pr-2">
            <span className="text-[11px] font-bold text-[#707974] uppercase tracking-wider block">
              {language === 'vi' ? 'Tên chủ tài khoản' : 'Account Name'}
            </span>
            <span className="font-body text-[13px] font-bold text-[#0b1c30]">
              {paypalRecipientName}
            </span>
          </div>
          <button
            type="button"
            onClick={() => handleCopy(paypalRecipientName, 'name')}
            className="p-1.5 text-[#003087] hover:bg-[#eff4ff] rounded-lg transition-colors cursor-pointer flex-shrink-0"
            title="Sao chép tên chủ tài khoản"
          >
            {copiedField === 'name' ? (
              <Check className="w-4 h-4 text-emerald-600" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* USD Amount */}
        <div className="p-2.5 bg-[#f8f9ff] rounded-xl border border-[#003087]/20 flex items-center justify-between">
          <div className="pr-2">
            <span className="text-[11px] font-bold text-[#003087] uppercase tracking-wider block">
              {language === 'vi' ? 'Số tiền thanh toán (USD)' : 'Payment Amount (USD)'}
            </span>
            <span className="font-display text-[18px] font-bold text-[#003087]">
              ${totalUsd.toFixed(2)} USD
            </span>
          </div>
          <button
            type="button"
            onClick={() => handleCopy(totalUsd.toFixed(2), 'amount')}
            className="flex items-center gap-1 px-2.5 py-1 text-[12px] font-bold bg-[#003087] text-white hover:bg-[#00457C] rounded-lg transition-colors cursor-pointer flex-shrink-0"
          >
            {copiedField === 'amount' ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#80e5b7]" />
                <span>{language === 'vi' ? 'Đã chép' : 'Copied'}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>{language === 'vi' ? 'Sao chép' : 'Copy'}</span>
              </>
            )}
          </button>
        </div>

        {/* Transfer Memo */}
        <div className="p-2.5 bg-white rounded-xl border border-[#bfc9c3]/50 flex items-center justify-between">
          <div className="pr-2">
            <span className="text-[11px] font-bold text-[#707974] uppercase tracking-wider block">
              {language === 'vi' ? 'Nội dung ghi chú chuyển khoản' : 'PayPal Transfer Note / Memo'}
            </span>
            <span className="font-mono text-[13px] font-bold text-[#0b1c30]">
              {transferMemo}
            </span>
          </div>
          <button
            type="button"
            onClick={() => handleCopy(transferMemo, 'memo')}
            className="flex items-center gap-1 px-2.5 py-1 text-[12px] font-bold bg-[#eff4ff] hover:bg-[#003087] hover:text-white text-[#003087] rounded-lg transition-colors cursor-pointer flex-shrink-0"
          >
            {copiedField === 'memo' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>{language === 'vi' ? 'Đã chép' : 'Copied'}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>{language === 'vi' ? 'Sao chép' : 'Copy'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Direct PayPal Link Button */}
      <a
        href={paypalDirectUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full py-2.5 px-4 bg-[#ffc439] hover:bg-[#f4b628] text-[#003087] font-bold text-[14px] rounded-xl flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-98 cursor-pointer"
      >
        <span className="italic font-serif font-black text-[16px]">PayPal</span>
        <span>{language === 'vi' ? 'Mở PayPal để gửi tiền' : 'Open PayPal to Send Money'}</span>
        <ArrowUpRight className="w-4 h-4" />
      </a>

      {/* Instructions */}
      <div className="pt-2 text-[12px] font-body text-[#404944] bg-[#eff7ff]/70 p-3 rounded-xl border border-[#0079C1]/15 leading-relaxed space-y-1">
        <div className="font-bold text-[#003087] flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5" />
          <span>{language === 'vi' ? 'Hướng dẫn thanh toán PayPal:' : 'PayPal Payment Steps:'}</span>
        </div>
        <ol className="list-decimal list-inside space-y-0.5 text-[#334155] pl-1 text-[11.5px]">
          <li>
            {language === 'vi'
              ? 'Đăng nhập vào tài khoản PayPal của bạn (qua app hoặc web).'
              : 'Log in to your PayPal account (App or Web).'}
          </li>
          <li>
            {language === 'vi' ? (
              <>
                Gửi tiền đến: <strong className="font-mono text-[#003087]">{paypalEmail}</strong>
              </>
            ) : (
              <>
                Send money to: <strong className="font-mono text-[#003087]">{paypalEmail}</strong>
              </>
            )}
          </li>
          <li>
            {language === 'vi' ? (
              <>
                Nhập số tiền <strong>${totalUsd.toFixed(2)} USD</strong> kèm ghi chú <strong>{transferMemo}</strong>
              </>
            ) : (
              <>
                Enter amount <strong>${totalUsd.toFixed(2)} USD</strong> and note <strong>{transferMemo}</strong>
              </>
            )}
          </li>
          <li>
            {language === 'vi'
              ? 'Bấm nút "Xác nhận đã chuyển khoản PayPal" bên dưới sau khi hoàn tất.'
              : 'Click "Confirm PayPal Transfer" below once completed.'}
          </li>
        </ol>
      </div>
    </div>
  );
};
