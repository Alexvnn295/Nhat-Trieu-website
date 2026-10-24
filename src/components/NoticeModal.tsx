import React from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface NoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

export const NoticeModal: React.FC<NoticeModalProps> = ({
  isOpen,
  onClose,
  title,
  content,
}) => {
  const { t } = useLanguage();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 md:p-8 border border-[#bfc9c3]/60 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#eff4ff] hover:bg-[#dce9ff] text-[#003527] flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-4 text-[#003527]">
          <ShieldCheck className="w-6 h-6" />
          <h3 className="font-display text-[20px] font-bold">{title}</h3>
        </div>

        <p className="font-body text-[15px] text-[#404944] leading-relaxed mb-6">
          {content}
        </p>

        <button
          onClick={onClose}
          className="w-full bg-[#003527] text-white py-2.5 rounded-[4px] font-body text-[14px] font-medium hover:bg-[#064e3b] transition-colors cursor-pointer"
        >
          {t('common.close', 'Đã hiểu & Đóng')}
        </button>
      </div>
    </div>
  );
};

