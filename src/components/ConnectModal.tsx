import React, { useState, useEffect } from 'react';
import { X, Mail, Send, CheckCircle2, Linkedin, Github, MessageSquare, Youtube, Headphones } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { useData } from '../context/DataContext';

interface ConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSubject?: string;
}

export const ConnectModal: React.FC<ConnectModalProps> = ({
  isOpen,
  onClose,
  initialSubject = '',
}) => {
  const { t } = useLanguage();
  const { showSuccess } = useToast();
  const { addContactInquiry } = useData();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('econ');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialSubject) {
      const lower = initialSubject.toLowerCase();
      if (
        lower.includes('consulting') ||
        lower.includes('tư vấn') ||
        lower.includes('chiến lược') ||
        lower.includes('conseil') ||
        lower.includes('beratung') ||
        lower.includes('咨询') ||
        lower.includes('コンサル')
      ) {
        setService('econ');
        setMessage(
          t(
            'connect.consultingPrefill',
            'Tôi muốn tìm hiểu và trao đổi về nhu cầu tư vấn chiến lược kinh doanh, tối ưu hóa quy trình vận hành hoặc kiến trúc giải pháp công nghệ. Rất mong sớm nhận được phản hồi để sắp xếp buổi trao đổi.'
          )
        );
      } else {
        setMessage(`Tôi quan tâm đến: "${initialSubject}". Rất mong được trao đổi thêm về khả năng hợp tác.`);
      }
    }
  }, [initialSubject, isOpen, t]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Determine service label
    const serviceLabels: Record<string, string> = {
      econ: t('contact.serviceEcon', 'Tư vấn Kinh tế & Tài chính'),
      edtech: t('contact.serviceEdTech', 'Giải pháp Công nghệ Giáo dục (EdTech)'),
      tech: t('contact.serviceTech', 'Kiến trúc Phần mềm & Tự động hóa'),
      other: t('contact.serviceOther', 'Cơ hội Hợp tác khác'),
    };

    addContactInquiry({
      name,
      email,
      service,
      serviceLabel: serviceLabels[service] || service,
      message,
      source: 'contact_modal',
    });

    setSubmitted(true);
    showSuccess(
      t('toast.contactSuccessTitle', 'Yêu cầu hợp tác đã được gửi!'),
      `${t('contact.thankYou', 'Cảm ơn')} ${name || 'bạn'}. ${t('toast.contactSuccessDesc', 'Tôi sẽ phản hồi qua email trong vòng 24 giờ làm việc.')}`
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#bfc9c3]/60 shadow-2xl relative p-6 md:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#eff4ff] hover:bg-[#dce9ff] text-[#003527] flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 text-center">
            <div className="w-16 h-16 bg-[#b0f0d6] text-[#003527] rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="font-display text-[26px] font-bold text-[#003527] mb-3">
              {t('contact.successTitle', 'Tin nhắn đã được gửi thành công!')}
            </h3>
            <p className="font-body text-[16px] text-[#404944] max-w-md mx-auto mb-8">
              {t('contact.thankYou', 'Cảm ơn')} <strong>{name || 'bạn'}</strong> {t('contact.thankYouDesc', 'đã liên hệ. Tôi sẽ phản hồi thư của bạn qua email')} <strong>{email}</strong> {t('contact.within24h', 'trong vòng 24 giờ làm việc.')}
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="bg-[#003527] text-white px-8 py-3 rounded-[4px] font-body text-[15px] font-medium hover:bg-[#064e3b] transition-colors cursor-pointer shadow-sm"
            >
              {t('common.close', 'Đóng cửa sổ')}
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="px-3 py-1 bg-[#eff4ff] text-[#003527] text-[12px] font-body font-bold rounded-full border border-[#003527]/10 inline-block mb-2">
                GET IN TOUCH
              </span>
              <h2 className="font-display text-[26px] md:text-[30px] font-bold text-[#003527]">
                {t('contact.title', 'Kết nối & Hợp tác')}
              </h2>
              <p className="font-body text-[15px] text-[#404944] mt-1">
                {t('contact.subtitle', 'Hãy chia sẻ về nhu cầu dự án hoặc cơ hội đồng hành. Tôi luôn sẵn sàng lắng nghe.')}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-body text-[13px] font-bold text-[#0b1c30] mb-1.5">
                    {t('contact.name', 'Họ và tên')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t('contact.namePlaceholder', 'Ví dụ: Nguyễn Văn A')}
                    className="w-full px-4 py-2.5 bg-[#f8f9ff] border border-[#bfc9c3] rounded-lg focus:border-[#003527] focus:ring-1 focus:ring-[#003527] outline-none font-body text-[15px]"
                  />
                </div>

                <div>
                  <label className="block font-body text-[13px] font-bold text-[#0b1c30] mb-1.5">
                    {t('contact.email', 'Địa chỉ Email')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full px-4 py-2.5 bg-[#f8f9ff] border border-[#bfc9c3] rounded-lg focus:border-[#003527] focus:ring-1 focus:ring-[#003527] outline-none font-body text-[15px]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-body text-[13px] font-bold text-[#0b1c30] mb-1.5">
                  {t('contact.areaOfInterest', 'Lĩnh vực quan tâm')}
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#f8f9ff] border border-[#bfc9c3] rounded-lg focus:border-[#003527] focus:ring-1 focus:ring-[#003527] outline-none font-body text-[15px] cursor-pointer"
                >
                  <option value="econ">{t('contact.serviceEcon', 'Tư vấn Kinh tế & Tài chính chiến lược')}</option>
                  <option value="edtech">{t('contact.serviceEdtech', 'Giải pháp EdTech & Chương trình Đào tạo')}</option>
                  <option value="software">{t('contact.serviceSoftware', 'Phát triển Phần mềm & Kiến trúc Hệ thống')}</option>
                  <option value="research">{t('contact.serviceResearch', 'Hợp tác Nghiên cứu & Giảng dạy')}</option>
                  <option value="other">{t('contact.serviceOther', 'Nội dung hợp tác khác')}</option>
                </select>
              </div>

              <div>
                <label className="block font-body text-[13px] font-bold text-[#0b1c30] mb-1.5">
                  {t('contact.message', 'Nội dung trao đổi')} <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t('contact.messagePlaceholder', 'Mô tả tóm tắt về mục tiêu, quy mô hoặc thời gian dự kiến của bạn...')}
                  className="w-full px-4 py-2.5 bg-[#f8f9ff] border border-[#bfc9c3] rounded-lg focus:border-[#003527] focus:ring-1 focus:ring-[#003527] outline-none font-body text-[15px] resize-none"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#003527] text-white py-3.5 rounded-[4px] font-body text-[15px] font-semibold hover:bg-[#064e3b] transition-transform duration-100 active:scale-95 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>{t('contact.send', 'Gửi tin nhắn')}</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Direct Contact Channels */}
            <div className="mt-8 pt-6 border-t border-[#bfc9c3]/50">
              <p className="font-body text-[13px] font-bold text-[#707974] uppercase tracking-wider mb-3">
                {t('contact.directChannels', 'Kênh liên hệ & Truyền thông')}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                <a
                  href="https://www.youtube.com/@TrieuCaoandTalks"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-[#ff0000]/10 text-[#cc0000] hover:bg-[#ff0000]/20 transition-colors text-[13px] font-body font-medium"
                >
                  <Youtube className="w-4 h-4 flex-shrink-0 text-[#ff0000]" />
                  <span className="truncate">YouTube</span>
                </a>
                <a
                  href="https://open.spotify.com/show/7EHXAnC6XzGiFMpkkCu6Sq?si=e89ea1f2bbb14cbf"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-[#1db954]/10 text-[#15803d] hover:bg-[#1db954]/20 transition-colors text-[13px] font-body font-medium"
                >
                  <Headphones className="w-4 h-4 flex-shrink-0 text-[#1db954]" />
                  <span className="truncate">Spotify Podcast</span>
                </a>
                <a
                  href="mailto:contact@caonguyennhattrieu.com"
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-[#eff4ff] text-[#003527] hover:bg-[#dce9ff] transition-colors text-[13px] font-body font-medium"
                >
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">Email</span>
                </a>
                <a
                  href="https://vn.linkedin.com/in/alexvnn295"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-[#eff4ff] text-[#003527] hover:bg-[#dce9ff] transition-colors text-[13px] font-body font-medium"
                >
                  <Linkedin className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">LinkedIn</span>
                </a>
                <a
                  href="https://github.com/Alexvnn295"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-[#eff4ff] text-[#003527] hover:bg-[#dce9ff] transition-colors text-[13px] font-body font-medium"
                >
                  <Github className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">GitHub</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

