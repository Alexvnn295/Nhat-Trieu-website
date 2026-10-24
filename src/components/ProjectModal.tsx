import React from 'react';
import { Project } from '../types';
import { X, CheckCircle2, ArrowRight, ExternalLink, Youtube } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenConnect: (projectName: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onOpenConnect,
}) => {
  const { t } = useLanguage();
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto border border-[#bfc9c3]/60 shadow-2xl relative">
        {/* Sticky Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-[#bfc9c3]/50 px-6 py-4 flex items-center justify-between z-20">
          <span className="px-3.5 py-1 bg-[#eff4ff] text-[#003527] text-[12px] font-body font-bold rounded-full border border-[#003527]/10">
            {project.badge}
          </span>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#eff4ff] hover:bg-[#dce9ff] text-[#003527] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close project"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 md:p-10">
          {/* Title */}
          <h1 className="font-display text-[26px] md:text-[34px] font-bold text-[#0b1c30] mb-3">
            {project.title}
          </h1>

          <p className="font-body text-[16px] text-[#404944] leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Metrics Banner (if available) */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-3 gap-3 p-4 bg-[#eff4ff] rounded-xl mb-8 border border-[#bfc9c3]/40">
              {project.metrics.map((metric, i) => (
                <div key={i} className="text-center">
                  <div className="font-display text-[20px] md:text-[24px] font-bold text-[#003527]">
                    {metric.value}
                  </div>
                  <div className="font-body text-[12px] md:text-[13px] text-[#404944] font-medium mt-0.5">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Project Screenshot */}
          <div className="rounded-xl overflow-hidden mb-8 border border-[#bfc9c3]/60 shadow-sm max-h-[400px] bg-[#f8f9ff]">
            <img
              src={project.image}
              alt={project.imageAlt}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Official Press Coverage / Báo chí đưa tin */}
          {(project.pressLinks && project.pressLinks.length > 0) ? (
            <div className="mb-8 p-5 bg-gradient-to-r from-[#eff4ff] to-[#e6f4ea] border border-[#003527]/20 rounded-xl">
              <div className="flex items-center gap-2 text-[12px] font-body font-bold text-[#003527] uppercase tracking-wider mb-2">
                <span className="px-2.5 py-0.5 bg-[#003527] text-white rounded text-[11px]">
                  BÁO CHÍ & TRUYỀN THÔNG
                </span>
                <span>Bài viết báo chí ghi nhận thành tựu</span>
              </div>
              <h3 className="font-display text-[16px] md:text-[17px] font-bold text-[#0b1c30] mb-2 leading-snug">
                {project.pressTitle || project.title}
              </h3>
              <div className="space-y-2 mt-3">
                {project.pressLinks.map((link, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-white rounded-lg border border-[#003527]/15">
                    <div>
                      <span className="text-[11px] font-bold text-[#003527] uppercase block">{link.source}</span>
                      <span className="text-[13px] text-[#2c3732] font-medium">{link.title}</span>
                    </div>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#003527] hover:bg-[#064e3b] text-white rounded font-body text-[12px] font-semibold transition-all shadow-xs flex-shrink-0 self-start sm:self-center"
                    >
                      <span>Xem bài báo</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ) : (project.articleUrl || project.videoUrl) ? (
            <div className="mb-8 p-5 bg-gradient-to-r from-[#eff4ff] to-[#e6f4ea] border border-[#003527]/20 rounded-xl">
              <div className="flex items-center gap-2 text-[12px] font-body font-bold text-[#003527] uppercase tracking-wider mb-2">
                <span className="px-2.5 py-0.5 bg-[#003527] text-white rounded text-[11px]">
                  {project.pressSource || 'Báo chí chính thống'}
                </span>
                <span>Nguồn tin & Phát sóng ghi nhận</span>
              </div>
              <h3 className="font-display text-[16px] md:text-[17px] font-bold text-[#0b1c30] mb-2 leading-snug">
                {project.pressTitle || project.title}
              </h3>
              <div className="flex flex-wrap items-center gap-2 mt-3">
                {project.articleUrl && (
                  <a
                    href={project.articleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-[#eff4ff] text-[#003527] border border-[#003527]/30 rounded font-body text-[13px] font-semibold transition-all shadow-xs"
                  >
                    <span>Đọc bài viết trên {project.pressSource || 'Báo Chính Phủ'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {project.videoUrl && (
                  <a
                    href={project.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#ff0000] hover:bg-[#cc0000] text-white rounded font-body text-[13px] font-semibold transition-all shadow-xs"
                  >
                    <Youtube className="w-4 h-4 fill-current" />
                    <span>Xem Video / Livestream phát sóng</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ) : null}

          {/* Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="mb-8">
              <h2 className="font-display text-[18px] font-bold text-[#0b1c30] mb-3">
                {t('projectModal.highlights', 'Đặc điểm kỹ thuật nổi bật')}
              </h2>
              <div className="space-y-2.5">
                {project.highlights.map((item, index) => (
                  <div key={index} className="flex items-start gap-2.5 font-body text-[15px] text-[#404944]">
                    <CheckCircle2 className="w-5 h-5 text-[#003527] flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack */}
          <div className="mb-8">
            <h2 className="font-display text-[18px] font-bold text-[#0b1c30] mb-3">
              {t('projectModal.techStack', 'Công nghệ ứng dụng')}
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 bg-[#f8f9ff] border border-[#bfc9c3] rounded-lg text-[13px] font-body font-medium text-[#0b1c30]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="pt-6 border-t border-[#bfc9c3]/50 flex flex-wrap gap-4 items-center justify-between">
            <button
              onClick={() => {
                onClose();
                onOpenConnect(project.title);
              }}
              className="bg-[#003527] text-white px-7 py-3 rounded-[4px] font-body text-[15px] font-medium hover:bg-[#064e3b] transition-transform duration-100 active:scale-95 flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <span>{t('projectModal.collabBtn', 'Hợp tác triển khai dự án tương tự')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenConnect(`${t('projectModal.requestCaseStudy')}: ${project.title}`);
              }}
              className="border border-[#003527] text-[#003527] px-5 py-3 rounded-[4px] font-body text-[14px] font-medium hover:bg-[#eff4ff] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>{t('projectModal.requestAnalysis', 'Yêu cầu bản phân tích chi tiết')}</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

