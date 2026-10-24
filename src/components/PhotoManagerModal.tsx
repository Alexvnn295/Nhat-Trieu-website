import React, { useState, useRef } from 'react';
import {
  X,
  Camera,
  Check,
  Upload,
  RefreshCw,
  Sparkles,
  Info,
  ShieldCheck,
  FolderOpen,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { PERSONAL_PORTRAITS, PersonalPhoto } from '../data/profileData';

interface PhotoManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PhotoManagerModal: React.FC<PhotoManagerModalProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const { profile, updateProfile } = useData();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [showPathInfo, setShowPathInfo] = useState(false);
  const [slotErrorMap, setSlotErrorMap] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const isVi = language === 'vi';
  const cleanUrl = (u?: string) => (u ? u.split('?')[0] : '');
  const portraits: PersonalPhoto[] = profile.personalPortraits || PERSONAL_PORTRAITS;
  const currentActiveId = profile.activePhotoId || 'photo-01';

  const handleSelectPortrait = (photo: PersonalPhoto) => {
    updateProfile({
      avatarUrl: photo.url,
      activePhotoId: photo.id,
    });
    setUploadSuccess(true);
    setTimeout(() => setUploadSuccess(false), 2000);
  };

  const handleSlotUpload = async (photo: PersonalPhoto, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const result = event.target?.result as string;
      if (result) {
        setSlotErrorMap((prev) => ({ ...prev, [photo.id]: false }));
        // 1. Immediately update UI state
        const updatedPortraits = portraits.map((p) =>
          p.id === photo.id
            ? { ...p, url: result, fallbackUrl: result }
            : p
        );
        updateProfile({
          avatarUrl: result,
          activePhotoId: photo.id,
          personalPortraits: updatedPortraits,
        });
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 2500);

        // 2. Persist to server filesystem & database
        try {
          await fetch('/api/profile/upload-photo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              filename: photo.filename,
              base64Data: result,
              photoId: photo.id,
            }),
          });
        } catch (err) {
          console.error('Server save error:', err);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const result = event.target?.result as string;
      if (result) {
        const customId = `custom-portrait-${Date.now()}`;
        const newPhotoItem: PersonalPhoto = {
          id: customId,
          filename: file.name || `portrait_${Date.now()}.jpg`,
          url: result,
          fallbackUrl: result,
          titleVi: `Ảnh chân dung tải lên (${file.name || 'Mới'})`,
          titleEn: `Uploaded Executive Portrait (${file.name || 'New'})`,
          poseVi: 'Hình ảnh chân dung tùy chỉnh do bạn tải lên hệ thống',
          poseEn: 'Custom executive portrait uploaded by user',
          badgeVi: 'Ảnh Đã Tải Lên',
          badgeEn: 'Uploaded Photo',
          descriptionVi: 'Ảnh chân dung tải lên từ thiết bị cá nhân.',
          descriptionEn: 'Custom portrait uploaded from local device.',
          isDefault: false,
        };

        const updatedPortraits = [...portraits, newPhotoItem];

        updateProfile({
          avatarUrl: result,
          activePhotoId: customId,
          personalPortraits: updatedPortraits,
        });
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 2500);

        // Persist to server
        try {
          await fetch('/api/profile/upload-photo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              filename: file.name || `custom_${Date.now()}.jpg`,
              base64Data: result,
              photoId: customId,
            }),
          });
        } catch (err) {
          console.error('Server save error:', err);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleResetDefault = () => {
    const defaultPhoto = portraits.find((p) => p.isDefault) || portraits[0];
    updateProfile({
      avatarUrl: defaultPhoto.url,
      activePhotoId: defaultPhoto.id,
    });
  };

  return (
    <div
      id="photo-manager-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-[#bfc9c3]/70 shadow-2xl relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-[#bfc9c3]/50 px-5 sm:px-6 py-4 flex items-center justify-between z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#003527] text-[#80e5b7] flex items-center justify-center shadow-xs">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display text-[19px] sm:text-[21px] font-bold text-[#003527]">
                {isVi ? 'Quản lý Hình ảnh Chân dung' : 'Executive Portrait Studio'}
              </h2>
              <p className="font-body text-[13px] text-[#404944]">
                {isVi
                  ? 'Tùy chọn hiển thị 4 bộ ảnh studio chính thức của ông Cao Nguyễn Nhật Triều'
                  : 'Curate and switch between 4 official studio portraits of Mr. Cao Nguyễn Nhật Triều'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#eff4ff] hover:bg-[#dce9ff] text-[#003527] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-6 space-y-6">
          {/* Notification on switch/upload */}
          {uploadSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl flex items-center gap-2.5 text-emerald-800 text-[13px] font-medium animate-in fade-in">
              <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>
                {isVi
                  ? 'Đã cập nhật ảnh đại diện chuyên gia thành công trên toàn bộ trang web!'
                  : 'Executive portrait successfully updated across the website!'}
              </span>
            </div>
          )}

          {/* Intro Notice */}
          <div className="p-4 bg-[#eff4ff] border border-[#003527]/15 rounded-xl flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-[#003527] flex-shrink-0 mt-0.5" />
            <div className="text-[13px] font-body text-[#0b1c30] leading-relaxed">
              <p className="font-semibold text-[#003527] mb-1">
                {isVi ? 'Bộ ảnh Chân dung Doanh nhân Chính thức 2026' : 'Executive Studio Collection 2026'}
              </p>
              <p className="text-[#404944]">
                {isVi
                  ? 'Toàn bộ 4 ảnh chụp studio chuẩn mực: Suit đen may đo cao cấp, sơ mi trắng, cà vạt đỏ và phong thái chuyên gia chiến lược. Bạn có thể chọn bất kỳ ảnh nào làm ảnh đại diện chính hoặc cập nhật tệp ảnh bất kỳ lúc nào.'
                  : 'All 4 studio executive portraits: Tailored black suit, crisp shirt, crimson red tie, and strategic poise. Select any portrait as your active profile image or upload replacement files.'}
              </p>
            </div>
          </div>

          {/* 4 Studio Portraits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {portraits.map((photo, index) => {
              const isSelected =
                currentActiveId === photo.id ||
                (!profile.activePhotoId && index === 0) ||
                cleanUrl(profile.avatarUrl) === cleanUrl(photo.url);

              return (
                <div
                  key={photo.id}
                  onClick={() => handleSelectPortrait(photo)}
                  className={`group relative rounded-xl overflow-hidden border-2 transition-all duration-200 cursor-pointer flex flex-col ${
                    isSelected
                      ? 'border-[#003527] shadow-md ring-2 ring-[#003527]/20 bg-white'
                      : 'border-[#bfc9c3]/60 hover:border-[#003527]/50 bg-white hover:shadow-md'
                  }`}
                >
                  {/* Photo Preview Container */}
                  <div className="relative aspect-[3/4] bg-neutral-900 overflow-hidden flex items-center justify-center">
                    {slotErrorMap[photo.id] ? (
                      <div className="w-full h-full bg-gradient-to-br from-[#00281d] via-[#003527] to-[#041c14] flex flex-col items-center justify-center p-3 text-center text-white">
                        <div className="w-12 h-12 rounded-xl bg-[#004d38] border border-[#a7f3d0]/30 flex items-center justify-center mb-2">
                          <Camera className="w-6 h-6 text-[#a7f3d0]" />
                        </div>
                        <span className="text-[11px] font-mono text-[#d1fae5] font-semibold mb-1">
                          {photo.filename}
                        </span>
                        <span className="text-[10px] text-white/60">
                          {isVi ? 'Chờ tải tệp thật' : 'Ready for upload'}
                        </span>
                      </div>
                    ) : (
                      <img
                        src={photo.url}
                        alt={isVi ? photo.titleVi : photo.titleEn}
                        className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (!target.dataset.fallbackStep) {
                            target.dataset.fallbackStep = '1';
                            target.src = photo.fallbackUrl || `/images/profile/${photo.filename}`;
                          } else if (target.dataset.fallbackStep === '1') {
                            target.dataset.fallbackStep = '2';
                            target.src = `/images/profile/${photo.filename.replace(/\.[^.]+$/, '')}.svg`;
                          } else {
                            setSlotErrorMap((prev) => ({ ...prev, [photo.id]: true }));
                          }
                        }}
                      />
                    )}

                    {/* Badge Top Left */}
                    <div className="absolute top-2 left-2 z-10">
                      <span className="px-2 py-0.5 bg-black/70 backdrop-blur-md text-white text-[10px] font-body font-bold rounded-md border border-white/20 shadow-xs">
                        {isVi ? photo.badgeVi : photo.badgeEn}
                      </span>
                    </div>

                    {/* Filename Tag Bottom Left */}
                    <div className="absolute bottom-2 left-2 z-10">
                      <span className="px-1.5 py-0.5 bg-black/60 text-white/90 text-[10px] font-mono rounded">
                        {photo.filename}
                      </span>
                    </div>

                    {/* Selected Checkmark Badge */}
                    {isSelected && (
                      <div className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full bg-[#003527] text-[#80e5b7] flex items-center justify-center shadow-md border border-white/40">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}
                  </div>

                  {/* Card Description */}
                  <div className="p-3 flex flex-col flex-grow justify-between bg-white">
                    <div>
                      <h4 className="font-display text-[13px] font-bold text-[#003527] line-clamp-1 mb-1">
                        {isVi ? photo.titleVi : photo.titleEn}
                      </h4>
                      <p className="font-body text-[11px] text-[#404944] line-clamp-2 leading-relaxed">
                        {isVi ? photo.poseVi : photo.poseEn}
                      </p>
                    </div>

                    <div className="mt-3 space-y-1.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectPortrait(photo);
                        }}
                        className={`w-full py-1.5 px-2 rounded-lg text-[12px] font-body font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                          isSelected
                            ? 'bg-[#003527] text-white'
                            : 'bg-[#eff4ff] text-[#003527] group-hover:bg-[#003527] group-hover:text-white'
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>{isVi ? 'Đang chọn' : 'Active'}</span>
                          </>
                        ) : (
                          <span>{isVi ? 'Chọn ảnh này' : 'Select Photo'}</span>
                        )}
                      </button>

                      <label
                        onClick={(e) => e.stopPropagation()}
                        className="w-full py-1 px-2 rounded-md border border-dashed border-[#bfc9c3] hover:border-[#003527] text-[11px] font-body text-[#404944] hover:text-[#003527] bg-neutral-50 hover:bg-emerald-50/50 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        title={isVi ? `Tải lên tệp ảnh thật thay thế cho ${photo.filename}` : `Upload local file for ${photo.filename}`}
                      >
                        <Upload className="w-3 h-3" />
                        <span>{isVi ? `Đổi tệp ${photo.filename}` : `Change file`}</span>
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp,image/jpg"
                          onChange={(e) => handleSlotUpload(photo, e)}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Upload Custom Photo Option */}
          <div className="p-4 bg-[#f8f9ff] border border-[#bfc9c3]/60 rounded-xl space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h4 className="font-display text-[15px] font-bold text-[#003527] flex items-center gap-2">
                  <Upload className="w-4 h-4 text-[#003527]" />
                  <span>{isVi ? 'Tải ảnh trực tiếp từ máy tính' : 'Upload from Local Device'}</span>
                </h4>
                <p className="font-body text-[12px] text-[#404944] mt-0.5">
                  {isVi
                    ? 'Bạn có thể tải lên tệp ảnh bất kỳ (JPG, PNG, WebP) để áp dụng ngay lập tức.'
                    : 'Upload any portrait image (JPG, PNG, WebP) to preview instantly.'}
                </p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/jpeg,image/png,image/webp,image/jpg"
                  className="hidden"
                  id="profile-custom-file-input"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-[#003527] text-white hover:bg-[#064e3b] px-4 py-2 rounded-xl text-[13px] font-body font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs w-full sm:w-auto"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{isVi ? 'Chọn tệp ảnh' : 'Choose File'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetDefault}
                  title={isVi ? 'Khôi phục về ảnh mặc định' : 'Reset to default'}
                  className="p-2 rounded-xl border border-[#bfc9c3]/60 hover:bg-[#eff4ff] text-[#404944] hover:text-[#003527] transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Custom Photo Active Warning/Indicator */}
            {profile.activePhotoId === 'custom-upload' && (
              <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg flex items-center justify-between text-[12px] text-amber-900">
                <span className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-4 h-4 text-amber-700 flex-shrink-0" />
                  <span>{isVi ? 'Đang dùng ảnh tự tải lên từ thiết bị' : 'Using device-uploaded photo'}</span>
                </span>
                <button
                  onClick={handleResetDefault}
                  className="underline hover:text-amber-950 font-semibold cursor-pointer"
                >
                  {isVi ? 'Đặt lại studio gốc' : 'Reset to studio'}
                </button>
              </div>
            )}
          </div>

          {/* Collapsible File Path Info */}
          <div className="border border-[#bfc9c3]/40 rounded-xl overflow-hidden text-[12px]">
            <button
              type="button"
              onClick={() => setShowPathInfo(!showPathInfo)}
              className="w-full px-4 py-2.5 bg-[#eff4ff]/60 hover:bg-[#eff4ff] flex items-center justify-between text-[#003527] font-medium transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <FolderOpen className="w-4 h-4 text-[#003527]" />
                <span>
                  {isVi
                    ? 'Thông tin kỹ thuật đường dẫn tệp ảnh (GRU02101, GRU02108, GRU02112, GRU02116)'
                    : 'Technical File Directory Info (GRU02101, GRU02108, GRU02112, GRU02116)'}
                </span>
              </span>
              <Info className="w-4 h-4 text-[#707974]" />
            </button>

            {showPathInfo && (
              <div className="p-4 bg-white space-y-2 font-mono text-[11px] text-[#404944] border-t border-[#bfc9c3]/30 leading-relaxed">
                <p className="font-sans text-[12px] text-[#0b1c30] mb-2 font-normal">
                  {isVi
                    ? 'Tất cả 4 hình ảnh chân dung chính thức của ông Cao Nguyễn Nhật Triều được lưu trữ trực tiếp trong thư mục hệ thống tại:'
                    : 'All 4 official studio portraits of Mr. Cao Nguyễn Nhật Triều are stored in:'}
                </p>
                <div className="p-2.5 bg-neutral-900 text-neutral-200 rounded-lg space-y-1">
                  <div>📁 /public/images/profile/GRU02101.JPG (Chân dung Trực diện Doanh nhân)</div>
                  <div>📁 /public/images/profile/GRU02108.JPG (Tác phong Lãnh đạo & Khởi xướng Chiến lược)</div>
                  <div>📁 /public/images/profile/GRU02112.JPG (Chân dung Trực diện Đĩnh đạc & Bản lĩnh)</div>
                  <div>📁 /public/images/profile/GRU02116.JPG (Góc nghiêng 3/4 - Nụ cười Cố vấn & Hợp tác)</div>
                </div>
                <p className="font-sans text-[11px] text-[#707974] pt-1">
                  {isVi
                    ? 'Toàn bộ ảnh mẫu không thuộc người dùng đã được loại bỏ hoàn toàn, hệ thống chỉ sử dụng các tệp ảnh chính chủ.'
                    : 'All unverified sample photos have been removed; only authentic user-uploaded portraits are active.'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-white/95 backdrop-blur-md border-t border-[#bfc9c3]/50 px-5 sm:px-6 py-3 flex items-center justify-end z-20">
          <button
            onClick={onClose}
            className="bg-[#003527] text-white hover:bg-[#064e3b] px-6 py-2.5 rounded-xl font-body text-[14px] font-semibold transition-colors cursor-pointer shadow-sm"
          >
            {isVi ? 'Hoàn tất & Đóng' : 'Done & Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
