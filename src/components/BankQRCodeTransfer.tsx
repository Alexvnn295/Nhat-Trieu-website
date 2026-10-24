import React, { useState } from 'react';
import { Copy, Check, QrCode, ShieldCheck, Download, Smartphone, Maximize2, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface BankAccountInfo {
  id: 'mb' | 'hdbank' | 'techcombank';
  bankCode: string;
  bankFullName: {
    vi: string;
    en: string;
  };
  shortName: string;
  accountNumber: string;
  accountName: string;
  themeColor: string;
  borderColor: string;
  badgeBg: string;
  logoType: 'mb' | 'hdbank' | 'tcb';
}

export const BANK_ACCOUNTS: BankAccountInfo[] = [
  {
    id: 'mb',
    bankCode: 'MB',
    bankFullName: {
      vi: 'Ngân hàng TMCP Quân Đội (MB Bank)',
      en: 'Military Commercial Joint Stock Bank (MB)',
    },
    shortName: 'MB Bank',
    accountNumber: '2020100998888',
    accountName: 'CAO NGUYEN NHAT TRIEU',
    themeColor: '#002bb8',
    borderColor: '#002bb8',
    badgeBg: 'bg-[#eff4ff] text-[#002bb8] border-[#002bb8]/30',
    logoType: 'mb',
  },
  {
    id: 'hdbank',
    bankCode: 'HDBank',
    bankFullName: {
      vi: 'Ngân hàng TMCP Phát triển TP.HCM (HDBank)',
      en: 'Ho Chi Minh City Development Joint Stock Commercial Bank (HDBank)',
    },
    shortName: 'HDBank',
    accountNumber: '0983440188',
    accountName: 'CAO NGUYEN NHAT TRIEU',
    themeColor: '#d8262c',
    borderColor: '#4a4a4a',
    badgeBg: 'bg-[#fff5f5] text-[#d8262c] border-[#d8262c]/30',
    logoType: 'hdbank',
  },
  {
    id: 'techcombank',
    bankCode: 'TCB',
    bankFullName: {
      vi: 'Ngân hàng TMCP Kỹ Thương Việt Nam (Techcombank)',
      en: 'Vietnam Technological and Commercial Joint-stock Bank (Techcombank)',
    },
    shortName: 'Techcombank',
    accountNumber: '8823788888',
    accountName: 'CAO NGUYEN NHAT TRIEU',
    themeColor: '#e31b23',
    borderColor: '#231f20',
    badgeBg: 'bg-[#fafafa] text-[#1a1a1a] border-[#e31b23]/30',
    logoType: 'tcb',
  },
];

interface BankQRCodeTransferProps {
  totalUsd: number;
  orderId?: string;
  customerEmail?: string;
  compact?: boolean;
}

export const BankQRCodeTransfer: React.FC<BankQRCodeTransferProps> = ({
  totalUsd,
  orderId = `TRIEU${Math.floor(100000 + Math.random() * 900000)}`,
  customerEmail = '',
}) => {
  const { language } = useLanguage();
  const [selectedBankId, setSelectedBankId] = useState<'mb' | 'hdbank' | 'techcombank'>('mb');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [imgError, setImgError] = useState<Record<string, boolean>>({});
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const selectedBank = BANK_ACCOUNTS.find((b) => b.id === selectedBankId) || BANK_ACCOUNTS[0];

  // Calculate VND amount accurately (Exchange rate ~ 25,400 VND / USD)
  const amountVnd = Math.round(totalUsd * 25400);
  const transferMemo = customerEmail
    ? `TRIEU ${orderId} ${customerEmail.split('@')[0]}`.slice(0, 50).toUpperCase()
    : `TRIEU ${orderId}`;

  // VietQR Dynamic Generation URL with amount and transfer memo
  const vietQrUrl = `https://img.vietqr.io/image/${selectedBank.bankCode}-${selectedBank.accountNumber}-compact2.png?amount=${amountVnd}&addInfo=${encodeURIComponent(
    transferMemo
  )}&accountName=${encodeURIComponent(selectedBank.accountName)}`;

  // Quick copy helper
  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  };

  // Download QR code image
  const handleDownloadQR = async () => {
    try {
      const response = await fetch(vietQrUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `VietQR_${selectedBank.shortName}_${selectedBank.accountNumber}_${amountVnd}VND.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch {
      window.open(vietQrUrl, '_blank');
    }
  };

  return (
    <div className="bg-[#fcfdfd] border border-[#003527]/15 rounded-2xl p-4 md:p-5 shadow-xs transition-all">
      {/* Title & Bank Selection Tabs */}
      <div className="mb-4">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#003527] text-white flex items-center justify-center shadow-xs">
              <QrCode className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-display text-[15px] md:text-[16px] font-bold text-[#003527]">
                {language === 'vi' ? 'Quét mã VietQR chuyển khoản nhanh' : 'VietQR Instant Bank Transfer'}
              </h4>
              <p className="text-[12px] font-body text-[#707974]">
                {language === 'vi'
                  ? 'Chọn 1 trong 3 ngân hàng bên dưới để quét QR hoặc chuyển khoản'
                  : 'Select one of the 3 available bank accounts below'}
              </p>
            </div>
          </div>

          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold font-body px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5" />
            Napas 24/7
          </span>
        </div>

        {/* 3 Bank Selector Tabs */}
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#eff4ff]/70 rounded-xl border border-[#bfc9c3]/40">
          {BANK_ACCOUNTS.map((bank) => {
            const isSelected = bank.id === selectedBankId;
            return (
              <button
                key={bank.id}
                type="button"
                onClick={() => setSelectedBankId(bank.id)}
                className={`py-2 px-2 rounded-lg font-body text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
                  isSelected
                    ? 'bg-white shadow-sm border border-[#bfc9c3]/60 font-bold text-[#003527]'
                    : 'text-[#404944] hover:bg-white/60 font-medium'
                }`}
              >
                <div className="flex items-center gap-1">
                  {bank.id === 'mb' && (
                    <span className="w-2 h-2 rounded-full bg-[#002bb8]"></span>
                  )}
                  {bank.id === 'hdbank' && (
                    <span className="w-2 h-2 rounded-full bg-[#d8262c]"></span>
                  )}
                  {bank.id === 'techcombank' && (
                    <span className="w-2 h-2 rounded-full bg-[#e31b23]"></span>
                  )}
                  <span className="text-[13px]">{bank.shortName}</span>
                </div>
                <span className="text-[10px] text-[#707974] font-mono tracking-tight hidden xs:inline">
                  {bank.accountNumber.slice(0, 4)}...{bank.accountNumber.slice(-4)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main QR Card & Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-start">
        {/* Left: The Visual QR Frame Replicating Real VietQR Format */}
        <div className="sm:col-span-5 flex flex-col items-center">
          <div
            className="w-full max-w-[240px] bg-white rounded-2xl p-3.5 shadow-md flex flex-col items-center transition-all border-4 relative"
            style={{ borderColor: selectedBank.borderColor }}
          >
            {/* Header: VietQR & napas247 */}
            <div className="w-full flex items-center justify-between border-b border-gray-100 pb-2 mb-2 px-1">
              <div className="flex items-center gap-1 font-bold text-[12px] text-[#e31b23]">
                <span className="tracking-tight text-blue-800">Viet</span>
                <span className="tracking-tight text-red-600">QR</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-bold text-gray-700">
                <span className="text-blue-900">napas</span>
                <span className="text-emerald-600">247</span>
              </div>
            </div>

            {/* QR Code Container */}
            <div
              onClick={() => setIsZoomOpen(true)}
              className="w-full aspect-square bg-[#f8f9fa] rounded-xl overflow-hidden p-1.5 flex items-center justify-center relative group cursor-zoom-in"
              title="Nhấn để phóng to mã QR"
            >
              {!imgError[selectedBank.id] ? (
                <>
                  <img
                    src={vietQrUrl}
                    alt={`VietQR ${selectedBank.shortName} - ${selectedBank.accountNumber}`}
                    className="w-full h-full object-contain rounded-lg transition-transform duration-200 group-hover:scale-102"
                    onError={() => {
                      setImgError((prev) => ({ ...prev, [selectedBank.id]: true }));
                    }}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                    <span className="bg-white/90 text-[#003527] text-[11px] font-bold px-2 py-1 rounded-md shadow-sm flex items-center gap-1">
                      <Maximize2 className="w-3 h-3" />
                      Phóng to
                    </span>
                  </div>
                </>
              ) : (
                /* High contrast fallback QR styling */
                <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center bg-white rounded-lg border border-dashed border-gray-300">
                  <QrCode className="w-16 h-16 text-[#003527] mb-2 animate-pulse" />
                  <span className="text-[12px] font-bold text-[#003527]">{selectedBank.shortName}</span>
                  <span className="text-[11px] font-mono text-gray-600">{selectedBank.accountNumber}</span>
                </div>
              )}
            </div>

            {/* Bank Branding in Card */}
            <div className="w-full mt-2.5 pt-2 border-t border-gray-100 text-center">
              {selectedBank.id === 'mb' && (
                <div className="flex items-center justify-center gap-1.5 text-[15px] font-extrabold text-[#002bb8] tracking-tight">
                  <span className="text-red-500 text-[18px]">★</span>
                  <span>MB</span>
                </div>
              )}
              {selectedBank.id === 'hdbank' && (
                <div className="flex items-center justify-center gap-1 text-[15px] font-extrabold text-[#d8262c]">
                  <span>HDBank</span>
                  <span className="text-amber-500 text-[10px] font-black">▲</span>
                </div>
              )}
              {selectedBank.id === 'techcombank' && (
                <div className="flex items-center justify-center gap-1 text-[13px] font-extrabold text-[#1a1a1a] uppercase tracking-wider">
                  <span className="text-red-600 text-[14px]">◆</span>
                  <span>TECHCOMBANK</span>
                </div>
              )}

              {/* Account Number in Card */}
              <div className="font-mono text-[16px] font-black text-[#0b1c30] tracking-wider mt-0.5">
                {selectedBank.accountNumber}
              </div>

              {/* Account Holder Name */}
              <div className="font-body text-[11px] font-bold text-gray-600 uppercase tracking-wide mt-0.5">
                {selectedBank.accountName}
              </div>

              {/* Card Footer */}
              <div className="mt-2 pt-1.5 border-t border-dashed border-gray-200 text-[10px] text-gray-500 font-body flex items-center justify-center gap-1">
                <span>Dùng</span>
                <span className="text-blue-600 font-bold">Zalo</span>
                <span>hoặc App Ngân hàng quét QR</span>
              </div>
            </div>
          </div>

          {/* Quick QR Download / Zoom Actions */}
          <div className="flex items-center gap-2 mt-2">
            <button
              type="button"
              onClick={() => setIsZoomOpen(true)}
              className="text-[11px] font-body text-[#003527] hover:underline flex items-center gap-1 cursor-pointer py-1 px-2 rounded hover:bg-[#eff4ff]"
            >
              <Maximize2 className="w-3 h-3" />
              {language === 'vi' ? 'Xem lớn' : 'Enlarge'}
            </button>
            <span className="text-gray-300">•</span>
            <button
              type="button"
              onClick={handleDownloadQR}
              className="text-[11px] font-body text-[#003527] hover:underline flex items-center gap-1 cursor-pointer py-1 px-2 rounded hover:bg-[#eff4ff]"
            >
              <Download className="w-3 h-3" />
              {language === 'vi' ? 'Tải ảnh QR' : 'Save QR'}
            </button>
          </div>
        </div>

        {/* Right: Transfer Details & Copy Buttons */}
        <div className="sm:col-span-7 space-y-2.5">
          {/* Bank Name Field */}
          <div className="p-2.5 bg-white rounded-xl border border-[#bfc9c3]/50 flex items-center justify-between">
            <div className="pr-2">
              <span className="text-[11px] font-bold text-[#707974] uppercase tracking-wider block">
                {language === 'vi' ? 'Ngân hàng' : 'Bank'}
              </span>
              <span className="font-body text-[13px] font-bold text-[#0b1c30]">
                {language === 'vi' ? selectedBank.bankFullName.vi : selectedBank.bankFullName.en}
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(selectedBank.shortName, 'bank')}
              className="p-1.5 text-[#003527] hover:bg-[#eff4ff] rounded-lg transition-colors cursor-pointer flex-shrink-0"
              title="Sao chép tên ngân hàng"
            >
              {copiedField === 'bank' ? (
                <Check className="w-4 h-4 text-emerald-600" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Account Number Field */}
          <div className="p-2.5 bg-white rounded-xl border border-[#bfc9c3]/50 flex items-center justify-between">
            <div className="pr-2">
              <span className="text-[11px] font-bold text-[#707974] uppercase tracking-wider block">
                {language === 'vi' ? 'Số tài khoản' : 'Account Number'}
              </span>
              <span className="font-mono text-[16px] font-black text-[#003527] tracking-wider">
                {selectedBank.accountNumber}
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(selectedBank.accountNumber, 'accountNumber')}
              className="flex items-center gap-1 px-2.5 py-1 text-[12px] font-bold bg-[#eff4ff] hover:bg-[#003527] hover:text-white text-[#003527] rounded-lg transition-colors cursor-pointer flex-shrink-0"
            >
              {copiedField === 'accountNumber' ? (
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

          {/* Account Holder Name */}
          <div className="p-2.5 bg-white rounded-xl border border-[#bfc9c3]/50 flex items-center justify-between">
            <div className="pr-2">
              <span className="text-[11px] font-bold text-[#707974] uppercase tracking-wider block">
                {language === 'vi' ? 'Chủ tài khoản' : 'Account Name'}
              </span>
              <span className="font-body text-[13px] font-bold text-[#0b1c30]">
                {selectedBank.accountName}
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(selectedBank.accountName, 'accountName')}
              className="p-1.5 text-[#003527] hover:bg-[#eff4ff] rounded-lg transition-colors cursor-pointer flex-shrink-0"
              title="Sao chép tên chủ tài khoản"
            >
              {copiedField === 'accountName' ? (
                <Check className="w-4 h-4 text-emerald-600" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Transfer Amount Field */}
          <div className="p-2.5 bg-[#f8f9ff] rounded-xl border border-[#003527]/30 flex items-center justify-between">
            <div className="pr-2">
              <span className="text-[11px] font-bold text-[#003527] uppercase tracking-wider block">
                {language === 'vi' ? 'Số tiền thanh toán' : 'Amount'}
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-[17px] font-bold text-[#003527]">
                  {amountVnd.toLocaleString('vi-VN')} ₫
                </span>
                <span className="text-[12px] font-body text-[#707974]">
                  (~${totalUsd.toFixed(2)})
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(amountVnd.toString(), 'amount')}
              className="flex items-center gap-1 px-2.5 py-1 text-[12px] font-bold bg-[#003527] text-white hover:bg-[#064e3b] rounded-lg transition-colors cursor-pointer flex-shrink-0"
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

          {/* Transfer Memo Field */}
          <div className="p-2.5 bg-white rounded-xl border border-[#bfc9c3]/50 flex items-center justify-between">
            <div className="pr-2">
              <span className="text-[11px] font-bold text-[#707974] uppercase tracking-wider block">
                {language === 'vi' ? 'Nội dung chuyển khoản' : 'Transfer Note / Memo'}
              </span>
              <span className="font-mono text-[13px] font-bold text-[#0b1c30]">
                {transferMemo}
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(transferMemo, 'memo')}
              className="flex items-center gap-1 px-2.5 py-1 text-[12px] font-bold bg-[#eff4ff] hover:bg-[#003527] hover:text-white text-[#003527] rounded-lg transition-colors cursor-pointer flex-shrink-0"
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
      </div>

      {/* Guide Note */}
      <div className="mt-3.5 pt-3 border-t border-[#bfc9c3]/30 flex items-start gap-2 text-[12px] font-body text-[#404944] bg-[#eff4ff]/60 p-2.5 rounded-xl">
        <Smartphone className="w-4 h-4 text-[#003527] flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          {language === 'vi' ? (
            <>
              <strong>Lưu ý:</strong> Mở ứng dụng <strong>Ngân hàng</strong> hoặc <strong>Zalo</strong>, chọn tính năng <strong>Quét mã QR</strong> và hướng camera vào mã phía trên. Hệ thống sẽ tự động điền số tiền và nội dung chuyển khoản.
            </>
          ) : (
            <>
              <strong>Note:</strong> Open any <strong>Banking App</strong> or <strong>Zalo</strong>, select <strong>Scan QR</strong>, and point at the code above. The payment details will auto-fill.
            </>
          )}
        </p>
      </div>

      {/* Zoom / Full Preview Modal */}
      {isZoomOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsZoomOpen(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl relative animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsZoomOpen(false)}
              className="absolute right-4 top-4 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-4">
              <h3 className="font-display text-[18px] font-bold text-[#003527]">
                Mã VietQR {selectedBank.shortName}
              </h3>
              <p className="text-[13px] text-gray-500 font-mono">
                TK: {selectedBank.accountNumber} • {selectedBank.accountName}
              </p>
            </div>

            <div className="bg-white rounded-xl p-2 border-2 border-gray-100 shadow-inner flex items-center justify-center">
              <img
                src={vietQrUrl}
                alt="VietQR Full Size"
                className="w-full aspect-square object-contain rounded-lg"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={handleDownloadQR}
                className="flex-1 py-2.5 bg-[#003527] hover:bg-[#064e3b] text-white rounded-xl text-[13px] font-bold flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>Tải ảnh về máy</span>
              </button>
              <button
                type="button"
                onClick={() => setIsZoomOpen(false)}
                className="px-4 py-2.5 border border-gray-200 hover:bg-gray-50 rounded-xl text-[13px] font-medium text-gray-700 cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
