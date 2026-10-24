import React, { useState, useEffect } from 'react';
import { Mail, Send, CheckCircle2, Sparkles, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { useData } from '../context/DataContext';

interface NewsletterSubscriptionProps {
  variant?: 'footer' | 'standalone';
  className?: string;
}

export const NewsletterSubscription: React.FC<NewsletterSubscriptionProps> = ({
  variant = 'footer',
  className = '',
}) => {
  const { t, language } = useLanguage();
  const { showSuccess } = useToast();
  const { addContactInquiry } = useData();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>(['all']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Check if current user already subscribed in this browser
  useEffect(() => {
    try {
      const savedEmail = localStorage.getItem('cnt_newsletter_subscribed_email');
      if (savedEmail) {
        setEmail(savedEmail);
        setIsSubscribed(true);
      }
    } catch {
      // ignore localStorage errors
    }
  }, []);

  const topicsList = [
    {
      id: 'economics',
      label: language === 'vi' ? 'Kinh tế & Thị trường' : language === 'ja' ? '経済＆市場' : language === 'zh' ? '经济与市场' : language === 'fr' ? 'Économie & Marchés' : language === 'de' ? 'Ökonomie & Märkte' : 'Economics & Markets',
    },
    {
      id: 'edtech',
      label: language === 'vi' ? 'EdTech & Đào tạo' : language === 'ja' ? 'EdTech＆教育' : language === 'zh' ? '教育科技与培训' : language === 'fr' ? 'EdTech & Éducation' : language === 'de' ? 'EdTech & Bildung' : 'EdTech & Learning',
    },
    {
      id: 'tech',
      label: language === 'vi' ? 'Kiến trúc Công nghệ' : language === 'ja' ? 'テクノロジー' : language === 'zh' ? '系统与技术架构' : language === 'fr' ? 'Architecture Tech' : language === 'de' ? 'Tech-Architektur' : 'Tech Architecture',
    },
  ];

  const toggleTopic = (topicId: string) => {
    if (selectedTopics.includes(topicId)) {
      if (selectedTopics.length > 1) {
        setSelectedTopics(selectedTopics.filter((t) => t !== topicId));
      }
    } else {
      setSelectedTopics([...selectedTopics, topicId]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !email.includes('@') || !email.includes('.')) {
      setErrorMsg(
        language === 'vi'
          ? 'Vui lòng nhập địa chỉ email hợp lệ.'
          : 'Please enter a valid email address.'
      );
      return;
    }

    setIsSubmitting(true);

    // Simulate reliable capture and persistence
    setTimeout(() => {
      try {
        const leadEmail = email.trim().toLowerCase();
        const leadName = name.trim() || 'Người đăng ký nhận tin';

        addContactInquiry({
          name: leadName,
          email: leadEmail,
          service: 'newsletter',
          serviceLabel: `Đăng ký Newsletter (${selectedTopics.join(', ')})`,
          message: `Đăng ký nhận bản tin & ấn phẩm phân tích chuyên sâu. Chủ đề quan tâm: ${selectedTopics.join(', ')}`,
          source: 'newsletter',
        });

        localStorage.setItem('cnt_newsletter_subscribed_email', leadEmail);
      } catch {
        // Fallback for private mode
      }

      setIsSubmitting(false);
      setIsSubscribed(true);
      showSuccess(
        t('toast.newsSuccessTitle', 'Đăng ký nhận tin thành công!'),
        t('toast.newsSuccessDesc', 'Bạn sẽ nhận được các ấn phẩm và bài phân tích mới nhất.')
      );
    }, 600);
  };

  const handleReset = () => {
    setIsSubscribed(false);
    setEmail('');
    setName('');
    try {
      localStorage.removeItem('cnt_newsletter_subscribed_email');
    } catch {
      // ignore
    }
  };

  return (
    <div
      id="newsletter-subscription-container"
      className={`relative overflow-hidden rounded-2xl border transition-all duration-300 ${
        variant === 'footer'
          ? 'bg-gradient-to-br from-[#003527] via-[#054333] to-[#0b241c] text-white border-[#003527]/80 shadow-[0_8px_30px_rgba(0,53,39,0.12)] p-6 md:p-10'
          : 'bg-white border-[#bfc9c3]/60 shadow-[0_4px_24px_rgba(15,23,42,0.06)] p-8 md:p-12 text-[#0b1c30]'
      } ${className}`}
    >
      {/* Background ambient accents */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-64 h-64 bg-[#96f7cf]/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10">
        {isSubscribed ? (
          <div className="flex flex-col items-center text-center py-4 sm:py-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-14 h-14 rounded-full bg-[#96f7cf]/20 text-[#96f7cf] flex items-center justify-center mb-4 shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3
              className={`font-display text-[22px] md:text-[26px] font-bold mb-2 ${
                variant === 'footer' ? 'text-white' : 'text-[#003527]'
              }`}
            >
              {t('news.success', 'Cảm ơn bạn đã đăng ký nhận bản tin thành công!')}
            </h3>
            <p
              className={`font-body text-[15px] md:text-[16px] max-w-md mb-6 ${
                variant === 'footer' ? 'text-emerald-100/90' : 'text-[#404944]'
              }`}
            >
              {language === 'vi'
                ? `Chúng tôi đã ghi nhận email ${email}. Bạn sẽ nhận được các bài phân tích chuyên sâu và ấn phẩm mới nhất ngay khi xuất bản.`
                : `We've confirmed ${email}. You will receive our latest economic breakdowns, EdTech insights, and digital publications directly to your inbox.`}
            </p>
            <button
              onClick={handleReset}
              className="font-body text-[13px] text-[#96f7cf] hover:text-white underline underline-offset-4 transition-colors cursor-pointer"
            >
              {language === 'vi' ? 'Đăng ký với email khác' : 'Subscribe with a different email'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Info Column */}
            <div className="lg:col-span-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#96f7cf] font-body text-[11px] font-bold tracking-widest uppercase mb-3.5 backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>LEAD AUDIENCE & NEWSLETTER</span>
              </div>

              <h3
                className={`font-display text-[24px] md:text-[30px] font-bold leading-tight mb-3 ${
                  variant === 'footer' ? 'text-white' : 'text-[#0b1c30]'
                }`}
              >
                {t('news.title', 'Cập nhật kiến thức mới nhất')}
              </h3>

              <p
                className={`font-body text-[15px] md:text-[16px] leading-relaxed mb-5 ${
                  variant === 'footer' ? 'text-emerald-100/80' : 'text-[#404944]'
                }`}
              >
                {t(
                  'news.desc',
                  'Đăng ký nhận bản tin chuyên sâu về kinh tế, công nghệ giáo dục và phân tích thị trường gửi trực tiếp đến hộp thư của bạn.'
                )}
              </p>

              {/* Topic interest pills */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-[12px] font-body font-semibold text-emerald-200/90 mr-1">
                  {language === 'vi' ? 'Chủ đề quan tâm:' : 'Topics of interest:'}
                </span>
                {topicsList.map((topic) => {
                  const isChecked = selectedTopics.includes(topic.id) || selectedTopics.includes('all');
                  return (
                    <button
                      key={topic.id}
                      type="button"
                      onClick={() => toggleTopic(topic.id)}
                      className={`text-[12px] font-body font-medium px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-[#96f7cf] text-[#003527] font-semibold shadow-xs'
                          : 'bg-white/10 text-white/80 hover:bg-white/20'
                      }`}
                    >
                      {topic.label}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-2 text-[12px] font-body text-emerald-200/70">
                <ShieldCheck className="w-4 h-4 text-[#96f7cf]" />
                <span>{t('news.disclaimer', 'Không thư rác. Hủy đăng ký bất kỳ lúc nào.')}</span>
              </div>
            </div>

            {/* Right Form Column */}
            <div className="lg:col-span-6">
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Mail className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      id="newsletter-email-input"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('news.placeholder', 'Địa chỉ email công việc của bạn')}
                      className="w-full pl-11 pr-4 py-3.5 bg-white text-[#0b1c30] placeholder:text-slate-400 rounded-lg border border-transparent focus:border-[#96f7cf] focus:ring-2 focus:ring-[#96f7cf]/30 outline-none font-body text-[15px] shadow-inner"
                    />
                  </div>

                  <button
                    id="newsletter-submit-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#96f7cf] hover:bg-[#b0f0d6] text-[#003527] px-6 py-3.5 rounded-lg font-body text-[15px] font-bold transition-all duration-150 active:scale-95 shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>{language === 'vi' ? 'Đang gửi...' : 'Submitting...'}</span>
                      </>
                    ) : (
                      <>
                        <span>{t('news.subscribeBtn', 'Đăng ký')}</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

                {errorMsg && (
                  <p className="text-[13px] font-body text-rose-300 font-medium text-left">
                    {errorMsg}
                  </p>
                )}

                <div className="flex items-center justify-between text-[12px] font-body text-emerald-200/80 px-1 pt-1">
                  <span>✨ {language === 'vi' ? 'Phát hành định kỳ 2 tuần/lần' : 'Bi-weekly curated edition'}</span>
                  <span>🔒 {language === 'vi' ? 'Bảo mật 100%' : '100% Secure & Private'}</span>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
