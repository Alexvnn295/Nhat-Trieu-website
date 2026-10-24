import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Youtube,
  Radio,
  Play,
  Pause,
  ExternalLink,
  Sparkles,
  Volume2,
  VolumeX,
  Check,
  Share2,
  Headphones,
  Calendar,
  Clock,
  ShieldCheck,
  X,
  Film,
  Newspaper,
  HeartPulse,
  TrendingUp,
  Briefcase,
  Rocket,
  MessageSquare,
  Target,
  Quote,
  Users,
  Image as ImageIcon,
  ZoomIn,
  Eye,
  Maximize2,
  Layers,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { GalleryMediaItem } from '../types';
import { GALLERY_MEDIA_ITEMS } from '../data/mockData';

export interface YoutubeVideoItem {
  id: string;
  videoId: string;
  url: string;
  embedUrl: string;
  title: string;
  subtitle: string;
  duration: string;
  badge: string;
  tag: string;
  thumbnail: string;
}

export interface SpotifyEpisodeItem {
  id: string;
  episodeId: string;
  url: string;
  embedUrl: string;
  title: string;
  subtitle: string;
  duration: string;
  releaseDate: string;
  badge: string;
  tag: string;
  isOfficial: boolean;
}

export const MediaShowcase: React.FC = () => {
  const { t, language } = useLanguage();
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [isPlayingPreview, setIsPlayingPreview] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [showEmbedPlayer, setShowEmbedPlayer] = useState<boolean>(true);
  const [showYoutubeEmbed, setShowYoutubeEmbed] = useState<boolean>(false);
  const [youtubeViewMode, setYoutubeViewMode] = useState<'videos' | 'pillars'>('videos');
  const [spotifyViewMode, setSpotifyViewMode] = useState<'episodes' | 'pillars'>('episodes');
  const [activeVideo, setActiveVideo] = useState<string>('wzeNBKWoh0E');
  const [activeSpotifyEpisode, setActiveSpotifyEpisode] = useState<string>('6FASd4wpnZOwexxhqN7o32');
  const [modalVideo, setModalVideo] = useState<YoutubeVideoItem | null>(null);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryMediaItem | null>(null);
  const [galleryFilter, setGalleryFilter] = useState<string>('all');

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const YOUTUBE_URL = 'https://www.youtube.com/@TrieuCaoandTalks';
  const SPOTIFY_URL = 'https://open.spotify.com/show/7EHXAnC6XzGiFMpkkCu6Sq?si=e89ea1f2bbb14cbf';
  const SPOTIFY_EPISODE_URL = 'https://open.spotify.com/episode/6FASd4wpnZOwexxhqN7o32';
  const SPOTIFY_EMBED_URL = 'https://open.spotify.com/embed/show/7EHXAnC6XzGiFMpkkCu6Sq?utm_source=generator&theme=0';
  const SPOTIFY_COVER_IMAGE = 'https://image-cdn-ak.spotifycdn.com/image/ab6765630000ba8a66913a5fa19ef81bac35d142';
  const AUDIO_PREVIEW_URL = 'https://p.scdn.co/mp3-preview/d79979fd12431eb680e1045beeb5d36d77a448a7.mp3';

  const isVi = language === 'vi';

  const handleCopy = (url: string, type: string) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(type);
    setTimeout(() => setCopiedLink(null), 2500);
  };

  const togglePlayAudio = () => {
    if (!audioRef.current) return;
    if (isPlayingPreview) {
      audioRef.current.pause();
      setIsPlayingPreview(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlayingPreview(true);
      }).catch((err) => {
        console.log('Audio autoplay prevented:', err);
      });
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const handleEnded = () => {
      setIsPlayingPreview(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // 4 Trụ cột nội dung chính của kênh TRIEU CAO & Talks
  const contentPillars = [
    {
      id: 'pillar-1',
      icon: TrendingUp,
      title: isVi ? 'KINH TẾ & TÀI CHÍNH' : 'ECONOMY & FINANCE',
      tag: '📊',
      color: '#0284c7',
      bg: 'bg-sky-50 border-sky-200/80 text-sky-950',
      items: isVi
        ? [
            'Phân tích tình hình kinh tế Việt Nam & thế giới',
            'Xu hướng FDI, startup, chứng khoán',
            'Chính sách kinh tế và tác động thực tế',
          ]
        : [
            'Vietnam & global economic environment insights',
            'FDI trends, startup ecosystem & capital markets',
            'Macroeconomic policies and tangible market impacts',
          ],
    },
    {
      id: 'pillar-2',
      icon: Briefcase,
      title: isVi ? 'KINH DOANH & KHỞI NGHIỆP' : 'BUSINESS & STARTUPS',
      tag: '💼',
      color: '#0d9488',
      bg: 'bg-emerald-50 border-emerald-200/80 text-emerald-950',
      items: isVi
        ? [
            'Câu chuyện thành công của doanh nhân',
            'Chiến lược kinh doanh thực tế',
            'Xu hướng thương mại điện tử, công nghệ',
          ]
        : [
            'Proven entrepreneurial success case studies',
            'Practical & applied business execution strategies',
            'E-commerce dynamics and applied technology trends',
          ],
    },
    {
      id: 'pillar-3',
      icon: Rocket,
      title: isVi ? 'KỸ NĂNG & PHÁT TRIỂN BẢN THÂN' : 'SKILLS & SELF-GROWTH',
      tag: '🚀',
      color: '#7c3aed',
      bg: 'bg-purple-50 border-purple-200/80 text-purple-950',
      items: isVi
        ? [
            'Kỹ năng lãnh đạo và quản lý',
            'Tư duy phản biện và ra quyết định',
            'Networking và xây dựng thương hiệu cá nhân',
          ]
        : [
            'Executive leadership & operational management mastery',
            'Critical thinking and high-impact decision making',
            'Strategic networking & professional personal branding',
          ],
    },
    {
      id: 'pillar-4',
      icon: MessageSquare,
      title: isVi ? 'LUẬN ĐÀM & TRANH LUẬN' : 'DIALOGUE & DEBATE',
      tag: '🗣️',
      color: '#e11d48',
      bg: 'bg-rose-50 border-rose-200/80 text-rose-950',
      items: isVi
        ? [
            'Thảo luận các vấn đề xã hội nóng bỏng',
            'Góc nhìn đa chiều về các xu hướng mới',
            'Phân tích case study thực tế',
          ]
        : [
            'Multi-dimensional analysis of hot socio-economic issues',
            'Diverse viewpoints on emerging global movements',
            'Real-world business case study deconstructions',
          ],
    },
  ];

  // 3 Link tập Spotify nổi bật từ kênh TRIEU CAO and Talks
  const spotifyEpisodes: SpotifyEpisodeItem[] = [
    {
      id: 'sp-01',
      episodeId: '6FASd4wpnZOwexxhqN7o32',
      url: 'https://open.spotify.com/episode/6FASd4wpnZOwexxhqN7o32',
      embedUrl: 'https://open.spotify.com/embed/episode/6FASd4wpnZOwexxhqN7o32?utm_source=generator&theme=0',
      title: isVi
        ? 'Triều Cao and Talks 2026 - Banking Insurance Revolution'
        : 'Triều Cao and Talks 2026 - Banking Insurance Revolution',
      subtitle: isVi
        ? 'Tái cấu trúc Bancassurance, FinTech & Làn sóng cách mạng công nghệ Bảo hiểm - Ngân hàng'
        : 'Bancassurance restructuring, FinTech & the 2026 Banking Insurance digital revolution',
      duration: '4:55',
      releaseDate: '19/03/2026',
      badge: isVi ? 'BANCASSURANCE & FINTECH' : 'BANCASSURANCE & FINTECH',
      tag: isVi ? 'Kinh tế & Bancassurance' : 'Economy & Bancassurance',
      isOfficial: true,
    },
    {
      id: 'sp-02',
      episodeId: '0wKFCRLlH4o6ZwJXNHyDjF',
      url: 'https://open.spotify.com/episode/0wKFCRLlH4o6ZwJXNHyDjF',
      embedUrl: 'https://open.spotify.com/embed/episode/0wKFCRLlH4o6ZwJXNHyDjF?utm_source=generator&theme=0',
      title: isVi
        ? 'Computer Vision 2026 - AI "Nhìn thấy" sâu hơn con mắt người!'
        : 'Computer Vision 2026 - AI "Sees" Deeper Than Human Vision!',
      subtitle: isVi
        ? 'Đột phá thị giác máy tính, xử lý ảnh nâng cao và ứng dụng AI nhận diện trong thực tiễn'
        : 'Computer vision breakthroughs, advanced imaging, and real-world AI perception applications',
      duration: 'Audio Talk',
      releaseDate: '2026',
      badge: isVi ? 'COMPUTER VISION 2026' : 'COMPUTER VISION 2026',
      tag: isVi ? 'Thị giác máy tính & AI' : 'Computer Vision & AI',
      isOfficial: true,
    },
    {
      id: 'sp-03',
      episodeId: '72jaYpdwdUqkaoLddRxUDo',
      url: 'https://open.spotify.com/episode/72jaYpdwdUqkaoLddRxUDo',
      embedUrl: 'https://open.spotify.com/embed/episode/72jaYpdwdUqkaoLddRxUDo?utm_source=generator&theme=0',
      title: isVi
        ? 'AGI 2026 - Trí tuệ Nhân tạo Tổng quát không còn là khoa học viễn tưởng!'
        : 'AGI 2026 - Artificial General Intelligence is No Longer Sci-Fi!',
      subtitle: isVi
        ? 'Kỷ nguyên Trí tuệ Nhân tạo Tổng quát (AGI), tác động xã hội, kỹ năng mới và chiến lược tương lai'
        : 'The era of Artificial General Intelligence (AGI), societal impact, and future strategies',
      duration: 'Audio Talk',
      releaseDate: '2026',
      badge: isVi ? 'AGI 2026' : 'AGI 2026',
      tag: isVi ? 'Trí tuệ nhân tạo AGI' : 'Artificial Intelligence AGI',
      isOfficial: true,
    },
  ];

  const currentActiveSpotifyEp =
    spotifyEpisodes.find((ep) => ep.episodeId === activeSpotifyEpisode) || spotifyEpisodes[0];

  // Specific YouTube Videos from the official channel @TrieuCaoandTalks
  const youtubeVideos: YoutubeVideoItem[] = [
    {
      id: 'yt-01',
      videoId: 'wzeNBKWoh0E',
      url: 'https://www.youtube.com/watch?v=wzeNBKWoh0E&t=116s',
      embedUrl: 'https://www.youtube-nocookie.com/embed/wzeNBKWoh0E?start=116&autoplay=1&rel=0',
      title: '06. Cybersecurity Vietnam - Chiến trường số và lá chắn quốc gia ( Trieu Cao and Talks)',
      subtitle: isVi
        ? 'Phân tích chuyên sâu về an ninh mạng tại Việt Nam, bảo vệ hạ tầng dữ liệu số, phòng thủ không gian mạng quốc gia và các chiến lược an toàn thông tin doanh nghiệp.'
        : 'In-depth analysis of Cybersecurity in Vietnam: digital battleground, national cyber defense shields, and enterprise data protection strategies.',
      duration: '1:56',
      badge: isVi ? 'TẬP 06 • AN NINH MẠNG' : 'EP 06 • CYBERSECURITY',
      tag: isVi ? 'Cybersecurity Vietnam' : 'Cybersecurity Vietnam',
      thumbnail: 'https://img.youtube.com/vi/wzeNBKWoh0E/hqdefault.jpg',
    },
    {
      id: 'yt-02',
      videoId: 'ofwSy-C-Tk8',
      url: 'https://www.youtube.com/watch?v=ofwSy-C-Tk8&t=41s',
      embedUrl: 'https://www.youtube-nocookie.com/embed/ofwSy-C-Tk8?start=41&autoplay=1&rel=0',
      title: '07. Future of Work - Con người và máy móc trong kỷ nguyên số ( Trieu Cao and Talks)',
      subtitle: isVi
        ? 'Khám phá bức tranh tương lai việc làm, sự chuyển dịch kỹ năng lao động số, tự động hóa và mô hình hợp tác hiệu quả giữa con người và trí tuệ nhân tạo.'
        : 'Exploring the Future of Work: digital workforce transition, automation, critical future skills, and human-AI collaboration paradigms.',
      duration: '0:41',
      badge: isVi ? 'TẬP 07 • FUTURE OF WORK' : 'EP 07 • FUTURE OF WORK',
      tag: isVi ? 'Future of Work' : 'Future of Work',
      thumbnail: 'https://img.youtube.com/vi/ofwSy-C-Tk8/hqdefault.jpg',
    },
    {
      id: 'yt-03',
      videoId: '1lWIkE-USOc',
      url: 'https://www.youtube.com/watch?v=1lWIkE-USOc',
      embedUrl: 'https://www.youtube-nocookie.com/embed/1lWIkE-USOc?autoplay=1&rel=0',
      title: '05. Green Tech Vietnam - Công nghệ xanh và tương lai bền vững ( Trieu Cao and Talks)',
      subtitle: isVi
        ? 'Bàn luận về công nghệ xanh (Green Tech), chuyển dịch năng lượng tái tạo, cam kết Net Zero, phát triển bền vững ESG và đổi mới sáng tạo môi trường tại Việt Nam.'
        : 'Discussions on Green Tech Vietnam: renewable energy transition, Net Zero commitments, ESG sustainable governance, and environmental innovation.',
      duration: 'Tập 05',
      badge: isVi ? 'TẬP 05 • GREEN TECH' : 'EP 05 • GREEN TECH',
      tag: isVi ? 'Green Tech Vietnam' : 'Green Tech Vietnam',
      thumbnail: 'https://img.youtube.com/vi/1lWIkE-USOc/hqdefault.jpg',
    },
    {
      id: 'yt-04',
      videoId: 'y-_DxX8pUFQ',
      url: 'https://www.youtube.com/watch?si=UJ3MoshsIuSK-RwE&v=y-_DxX8pUFQ&feature=youtu.be',
      embedUrl: 'https://www.youtube-nocookie.com/embed/y-_DxX8pUFQ?autoplay=1&rel=0',
      title: 'Đài Truyền Hình HTV: Thúc đẩy doanh nghiệp công nghệ thương mại hóa sản phẩm',
      subtitle: isVi
        ? 'Bản tin HTV phát sóng buổi trao đổi của ông Cao Nguyễn Nhật Triều (COO Nha Trang Hitech) về thúc đẩy thương mại hóa sản phẩm công nghệ và phát huy lợi thế TP.HCM.'
        : 'HTV Television broadcast featuring Cao Nguyen Nhat Trieu (COO Nha Trang Hitech) on promoting tech businesses to commercialize products and leverage HCMC hub.',
      duration: 'Bản tin HTV',
      badge: isVi ? 'ĐÀI TRUYỀN HÌNH HTV' : 'HTV TELEVISION',
      tag: isVi ? 'Thời sự HTV' : 'HTV News',
      thumbnail: 'https://img.youtube.com/vi/y-_DxX8pUFQ/hqdefault.jpg',
    },
    {
      id: 'yt-05',
      videoId: 'gPXndsELXvw',
      url: 'https://www.youtube.com/live/gPXndsELXvw?si=SgTTNQzKH1KXrKUF&t=660s',
      embedUrl: 'https://www.youtube-nocookie.com/embed/gPXndsELXvw?start=660&autoplay=1&rel=0',
      title: 'Chương trình Luật Phát Triển Đô Thị - Đóng góp ý kiến của ông Cao Nguyễn Nhật Triều (Từ phút 11:00)',
      subtitle: isVi
        ? 'Xuất hiện đóng góp chuyên môn từ phút thứ 11:00 về Khoản 5 Điều 29 (Cơ chế Sandbox, ưu đãi công nghệ chiến lược & đưa TP.HCM thành trung tâm thương mại hóa công nghệ cao).'
        : 'Expert contribution from minute 11:00 on Clause 5 Article 29 (Regulatory sandboxes, strategic incentives & empowering tech commercialization in HCMC).',
      duration: 'Từ phút 11:00',
      badge: isVi ? 'LUẬT PT ĐÔ THỊ • PHÚT 11:00' : 'URBAN LAW • MIN 11:00',
      tag: isVi ? 'Luật Phát Triển Đô Thị' : 'Urban Development Law',
      thumbnail: 'https://img.youtube.com/vi/gPXndsELXvw/hqdefault.jpg',
    },
  ];

  const currentActiveVid = youtubeVideos.find((v) => v.videoId === activeVideo) || youtubeVideos[0];

  return (
    <section id="media-talks-section" className="py-20 px-4 md:px-6 bg-[#f8f9ff] border-t border-[#bfc9c3]/40">
      {/* Hidden Audio Element for Instant Audio Preview */}
      <audio ref={audioRef} src={AUDIO_PREVIEW_URL} preload="metadata" />

      <div className="max-w-[1280px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-[#bfc9c3]/50 pb-6 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#003527]/10 text-[#003527] font-body text-[12px] font-bold tracking-widest uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('media.badge', 'MEDIA & TALK SHOW')}</span>
            </div>
            <h2 className="font-display text-[28px] md:text-[36px] font-bold text-[#0b1c30] tracking-tight">
              {t('media.title', 'Kênh Truyền thông & Podcast')}
            </h2>
            <p className="font-body text-[16px] md:text-[17px] text-[#404944] mt-2 max-w-2xl">
              {t('media.subtitle', 'Khám phá chuỗi video phân tích và podcast chuyên sâu của Cao Nguyễn Nhật Triều trên YouTube và Spotify.')}
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#ff0000]/10 hover:bg-[#ff0000]/20 text-[#cc0000] border border-[#ff0000]/30 px-4 py-2 rounded-lg font-body text-[14px] font-semibold transition-all shadow-xs"
            >
              <Youtube className="w-4 h-4 text-[#ff0000]" />
              <span>YouTube Channel</span>
            </a>
            <a
              href={SPOTIFY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#1db954]/10 hover:bg-[#1db954]/20 text-[#15803d] border border-[#1db954]/30 px-4 py-2 rounded-lg font-body text-[14px] font-semibold transition-all shadow-xs"
            >
              <Headphones className="w-4 h-4 text-[#1db954]" />
              <span>Spotify Podcast</span>
            </a>
          </div>
        </div>

        {/* Media Grid: YouTube Channel & Spotify Podcast */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* ============================================================ */}
          {/* LEFT: YOUTUBE SHOWCASE CARD */}
          {/* ============================================================ */}
          <div className="lg:col-span-6 flex flex-col justify-between bg-white rounded-2xl border border-[#bfc9c3]/60 shadow-[0px_4px_24px_rgba(15,23,42,0.05)] overflow-hidden group hover:shadow-[0px_8px_32px_rgba(15,23,42,0.09)] transition-all duration-300">
            <div className="p-6 md:p-8">
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#ff0000]/10 flex items-center justify-center text-[#ff0000]">
                    <Youtube className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="font-body text-[11px] font-bold uppercase tracking-wider text-[#ff0000] block">
                      {t('media.youtube.badge', 'YOUTUBE CHANNEL')}
                    </span>
                    <h3 className="font-display text-[22px] md:text-[24px] font-bold text-[#0b1c30]">
                      {t('media.youtube.title', 'TRIEU CAO & Talks')}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(YOUTUBE_URL, 'youtube')}
                    className="p-2 rounded-lg hover:bg-[#eff4ff] text-[#707974] hover:text-[#003527] transition-colors cursor-pointer"
                    title="Copy YouTube URL"
                  >
                    {copiedLink === 'youtube' ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Tagline & Handle */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-block px-2.5 py-1 bg-[#ff0000]/10 text-[#cc0000] rounded text-[12px] font-body font-bold">
                  {t('media.youtube.tagline', 'Nơi Tri Thức Gặp Thực Tiễn')}
                </span>
                <span className="inline-block px-2.5 py-1 bg-[#f1f5f9] rounded text-[13px] font-body font-mono text-[#475569]">
                  {t('media.youtube.handle', '@TrieuCaoandTalks')}
                </span>
              </div>

              {/* Description */}
              <p className="font-body text-[14.5px] text-[#404944] leading-relaxed mb-4">
                {t('media.youtube.desc', 'Chào mừng bạn đến với TRIEU CAO & Talks - kênh podcast đa chủ đề hàng đầu về kinh tế, kinh doanh, kỹ năng và những cuộc luận đàm sâu sắc!')}
              </p>

              {/* Quote & Audience Banner */}
              <div className="p-3.5 mb-5 rounded-xl bg-gradient-to-r from-red-50/80 via-amber-50/40 to-slate-50 border border-red-100/90 text-[13px] font-body space-y-2">
                <div className="flex items-start gap-2 text-[#991b1b] italic">
                  <Quote className="w-4 h-4 flex-shrink-0 mt-0.5 opacity-70" />
                  <span>&ldquo;{t('media.youtube.quote', 'Tri thức không chỉ là lý thuyết - mà là công cụ để thay đổi cuộc sống')}&rdquo;</span>
                </div>
                <div className="flex items-center gap-2 text-[#334155] text-[12px] pt-1 border-t border-red-100/60 font-medium">
                  <Users className="w-3.5 h-3.5 text-[#cc0000]" />
                  <span>{t('media.youtube.audience', 'Dành cho: Doanh nhân, quản lý, sinh viên, và mọi người muốn phát triển bản thân')}</span>
                </div>
              </div>

              {/* Sub-Navigation Switcher (Videos vs Pillars) */}
              <div className="flex items-center justify-between gap-2 p-1 bg-[#f1f5f9] rounded-xl mb-4 border border-[#e2e8f0]">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setYoutubeViewMode('videos')}
                    className={`px-3 py-1.5 rounded-lg text-[13px] font-body font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                      youtubeViewMode === 'videos'
                        ? 'bg-white text-[#cc0000] shadow-xs'
                        : 'text-[#64748b] hover:text-[#0f172a]'
                    }`}
                  >
                    <Film className="w-3.5 h-3.5" />
                    <span>{isVi ? `${youtubeVideos.length} Video nổi bật` : `${youtubeVideos.length} Featured Videos`}</span>
                  </button>
                  <button
                    onClick={() => setYoutubeViewMode('pillars')}
                    className={`px-3 py-1.5 rounded-lg text-[13px] font-body font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                      youtubeViewMode === 'pillars'
                        ? 'bg-white text-[#cc0000] shadow-xs'
                        : 'text-[#64748b] hover:text-[#0f172a]'
                    }`}
                  >
                    <Target className="w-3.5 h-3.5" />
                    <span>{isVi ? '4 Trụ cột nội dung' : '4 Content Pillars'}</span>
                  </button>
                </div>

                {youtubeViewMode === 'videos' && (
                  <button
                    onClick={() => setShowYoutubeEmbed(!showYoutubeEmbed)}
                    className="px-2.5 py-1 text-[11px] font-body font-semibold rounded-md border border-[#ff0000]/30 text-[#cc0000] bg-white hover:bg-[#ff0000]/10 transition-colors cursor-pointer mr-1"
                    title={showYoutubeEmbed ? 'Chuyển sang danh sách video' : 'Xem trình phát YouTube'}
                  >
                    {showYoutubeEmbed ? (isVi ? 'Danh sách' : 'List') : (isVi ? 'Trình phát' : 'Player')}
                  </button>
                )}
              </div>

              {/* ============================================================ */}
              {/* VIEW 1: FEATURED VIDEOS (3 VIDEOS) */}
              {/* ============================================================ */}
              {youtubeViewMode === 'videos' && (
                <>
                  {showYoutubeEmbed ? (
                    <div className="mb-6 space-y-3">
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-[#bfc9c3]/60 shadow-md">
                        <iframe
                          src={currentActiveVid.embedUrl.replace('autoplay=1', 'autoplay=0')}
                          title={currentActiveVid.title}
                          className="w-full h-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      </div>
                      <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-[#f8f9ff] border border-[#bfc9c3]/40">
                        <div className="min-w-0 flex-1">
                          <span className="font-body text-[11px] font-bold text-[#cc0000] block">{currentActiveVid.badge}</span>
                          <h4 className="font-body text-[13px] font-semibold text-[#0b1c30] truncate">{currentActiveVid.title}</h4>
                        </div>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          {youtubeVideos.map((vid, idx) => (
                            <button
                              key={vid.id}
                              onClick={() => setActiveVideo(vid.videoId)}
                              className={`w-7 h-7 rounded-md text-[12px] font-mono font-bold transition-all cursor-pointer ${
                                activeVideo === vid.videoId
                                  ? 'bg-[#cc0000] text-white shadow-xs'
                                  : 'bg-white border border-[#bfc9c3]/60 text-[#475569] hover:bg-slate-100'
                              }`}
                              title={`Chuyển sang Video ${idx + 1}`}
                            >
                              {idx + 1}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3 mb-6">
                      {youtubeVideos.map((vid) => (
                        <div
                          key={vid.id}
                          className="flex gap-3.5 p-3 rounded-xl bg-[#f8f9ff] hover:bg-[#eff4ff] border border-[#bfc9c3]/40 transition-all group/item hover:border-[#cc0000]/40"
                        >
                          {/* Video Thumbnail with Play action */}
                          <div
                            onClick={() => setModalVideo(vid)}
                            className="relative w-28 md:w-32 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-slate-900 cursor-pointer group/thumb"
                            title={isVi ? 'Phát video trực tiếp' : 'Play video'}
                          >
                            <img
                              src={vid.thumbnail}
                              alt={vid.title}
                              className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-300"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-black/35 group-hover/thumb:bg-black/20 flex items-center justify-center transition-colors">
                              <div className="w-8 h-8 rounded-full bg-white/90 group-hover/thumb:bg-[#cc0000] text-[#cc0000] group-hover/thumb:text-white flex items-center justify-center shadow transition-colors">
                                <Play className="w-4 h-4 fill-current ml-0.5" />
                              </div>
                            </div>
                            <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] font-mono px-1.5 py-0.5 rounded">
                              {vid.duration}
                            </span>
                          </div>

                          {/* Video Meta & Actions */}
                          <div className="flex-1 min-w-0 flex flex-col justify-between">
                            <div>
                              <div className="flex items-center gap-2 mb-0.5">
                                <span className="text-[10px] font-bold font-body uppercase text-[#cc0000] bg-[#ff0000]/10 px-1.5 py-0.5 rounded">
                                  {vid.tag}
                                </span>
                              </div>
                              <h4
                                onClick={() => setModalVideo(vid)}
                                className="font-body text-[13.5px] font-semibold text-[#0b1c30] group-hover/item:text-[#003527] transition-colors line-clamp-2 leading-snug cursor-pointer hover:underline"
                              >
                                {vid.title}
                              </h4>
                            </div>

                            <div className="flex items-center justify-between gap-2 mt-1">
                              <div className="flex items-center gap-2 font-body text-[11px] text-[#707974]">
                                <span className="text-[#cc0000] font-semibold flex items-center gap-1">
                                  <Play className="w-3 h-3 text-[#cc0000] fill-current" />
                                  HD Video
                                </span>
                              </div>

                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => setModalVideo(vid)}
                                  className="text-[12px] font-body font-semibold text-[#003527] hover:text-[#064e3b] hover:underline cursor-pointer"
                                >
                                  {isVi ? 'Xem ngay' : 'Watch'}
                                </button>
                                <a
                                  href={vid.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[12px] font-body text-[#cc0000] hover:underline flex items-center gap-0.5"
                                  title="Mở trên YouTube"
                                >
                                  <span>YouTube</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {/* ============================================================ */}
              {/* VIEW 2: 4 CONTENT PILLARS (4 TRỤ CỘT NỘI DUNG) */}
              {/* ============================================================ */}
              {youtubeViewMode === 'pillars' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {contentPillars.map((pillar) => {
                    const PillarIcon = pillar.icon;
                    return (
                      <div
                        key={pillar.id}
                        className={`p-3.5 rounded-xl border transition-all ${pillar.bg}`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-base">{pillar.tag}</span>
                          <h4 className="font-body text-[12.5px] font-bold tracking-tight">
                            {pillar.title}
                          </h4>
                        </div>
                        <ul className="space-y-1 text-[11.5px] leading-snug text-[#334155]">
                          {pillar.items.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="text-[10px] text-[#64748b] mt-0.5">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* YouTube CTA Footer */}
            <div className="p-6 bg-[#f8f9ff] border-t border-[#bfc9c3]/40 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-[13px] font-body text-[#404944]">
                <Youtube className="w-4 h-4 text-[#cc0000]" />
                <span>youtube.com/@TrieuCaoandTalks</span>
              </div>
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#cc0000] hover:bg-[#b30000] text-white px-5 py-2.5 rounded-lg font-body text-[14px] font-medium shadow-sm transition-all cursor-pointer"
              >
                <span>{t('media.youtube.cta', 'Truy cập kênh YouTube')}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* ============================================================ */}
          {/* RIGHT: SPOTIFY PODCAST SHOWCASE CARD (TRIEU CAO AND TALKS) */}
          {/* ============================================================ */}
          <div className="lg:col-span-6 flex flex-col justify-between bg-white rounded-2xl border border-[#bfc9c3]/60 shadow-[0px_4px_24px_rgba(15,23,42,0.05)] overflow-hidden group hover:shadow-[0px_8px_32px_rgba(15,23,42,0.09)] transition-all duration-300">
            <div className="p-6 md:p-8">
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#1db954]/10 flex items-center justify-center text-[#1db954]">
                    <Radio className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="font-body text-[11px] font-bold uppercase tracking-wider text-[#15803d] block">
                      {t('media.podcast.badge', 'SPOTIFY PODCAST')}
                    </span>
                    <h3 className="font-display text-[22px] md:text-[24px] font-bold text-[#0b1c30]">
                      {t('media.podcast.title', 'TRIEU CAO and Talks')}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowEmbedPlayer(!showEmbedPlayer)}
                    className="px-2.5 py-1 text-[12px] font-body font-semibold rounded-md border border-[#1db954]/30 text-[#15803d] hover:bg-[#1db954]/10 transition-colors cursor-pointer"
                    title={showEmbedPlayer ? 'Chuyển sang danh sách' : 'Mở trình phát Spotify Embed'}
                  >
                    {showEmbedPlayer ? (isVi ? 'Trình phát Spotify' : 'Embed Player') : (isVi ? 'Danh sách tập' : 'Episode List')}
                  </button>
                  <button
                    onClick={() => handleCopy(SPOTIFY_URL, 'spotify')}
                    className="p-2 rounded-lg hover:bg-[#eff4ff] text-[#707974] hover:text-[#003527] transition-colors cursor-pointer"
                    title="Copy Spotify URL"
                  >
                    {copiedLink === 'spotify' ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Tagline & Verified Host & Channel Badge */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-[#003527] font-body text-[12px] font-bold rounded-md border border-emerald-200/80">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{t('media.podcast.tagline', 'Nơi Tri Thức Gặp Thực Tiễn')}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#1db954]/10 text-[#15803d] font-body text-[12px] font-bold rounded-full">
                  <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                  <span>Verified Spotify Show</span>
                </span>
                <span className="text-[13px] font-body font-medium text-[#404944] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#003527]" />
                  <span>{t('media.podcast.host', 'Host: Cao Nguyễn Nhật Triều')}</span>
                </span>
              </div>

              {/* Show Description */}
              <p className="font-body text-[15px] text-[#404944] leading-relaxed mb-4">
                {t(
                  'media.podcast.desc',
                  'Kênh podcast đa chủ đề hàng đầu về kinh tế, kinh doanh, kỹ năng và những cuộc luận đàm sâu sắc của cá nhân tôi.'
                )}
              </p>

              {/* Slogan Quote & Audience Banner */}
              <div className="mb-5 p-3.5 rounded-xl bg-gradient-to-r from-emerald-50 via-teal-50 to-sky-50 border border-emerald-200/60 flex flex-col gap-2">
                <div className="flex items-start gap-2.5">
                  <Quote className="w-4 h-4 text-emerald-700 mt-0.5 flex-shrink-0" />
                  <p className="text-[13px] font-body font-semibold italic text-emerald-950 leading-snug">
                    &quot;{t('media.podcast.quote', 'Tri thức không chỉ là lý thuyết — mà là công cụ để thay đổi cuộc sống')}&quot;
                  </p>
                </div>
                <div className="flex items-center gap-2 text-[12px] font-body font-medium text-emerald-900/90 pl-6">
                  <Users className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0" />
                  <span>{t('media.podcast.audience', 'Dành cho: Doanh nhân, quản lý, sinh viên, và mọi người muốn phát triển bản thân')}</span>
                </div>
              </div>

              {/* View Switcher: 3 Featured Episodes vs 4 Content Pillars */}
              <div className="flex items-center gap-2 mb-4 p-1 bg-[#eff4ff] rounded-lg w-fit">
                <button
                  onClick={() => setSpotifyViewMode('episodes')}
                  className={`px-3 py-1.5 rounded-md text-[13px] font-body font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                    spotifyViewMode === 'episodes'
                      ? 'bg-white text-[#003527] shadow-sm'
                      : 'text-[#707974] hover:text-[#0b1c30]'
                  }`}
                >
                  <Radio className="w-3.5 h-3.5" />
                  <span>{isVi ? '3 Tập nổi bật' : '3 Featured Episodes'}</span>
                  <span className="ml-1 px-1.5 py-0.2 bg-emerald-100 text-emerald-800 text-[10px] rounded-full font-bold">
                    3
                  </span>
                </button>
                <button
                  onClick={() => setSpotifyViewMode('pillars')}
                  className={`px-3 py-1.5 rounded-md text-[13px] font-body font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                    spotifyViewMode === 'pillars'
                      ? 'bg-white text-[#003527] shadow-sm'
                      : 'text-[#707974] hover:text-[#0b1c30]'
                  }`}
                >
                  <Target className="w-3.5 h-3.5" />
                  <span>{isVi ? '4 Trụ cột nội dung' : '4 Content Pillars'}</span>
                  <span className="ml-1 px-1.5 py-0.2 bg-purple-100 text-purple-800 text-[10px] rounded-full font-bold">
                    4
                  </span>
                </button>
              </div>

              {/* VIEW 1: 3 FEATURED SPOTIFY EPISODES */}
              {spotifyViewMode === 'episodes' && (
                <>
                  {/* Episode Selector Tabs */}
                  <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1">
                    {spotifyEpisodes.map((ep, index) => (
                      <button
                        key={ep.id}
                        onClick={() => setActiveSpotifyEpisode(ep.episodeId)}
                        className={`px-3 py-1.5 rounded-lg text-[12px] font-body font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                          activeSpotifyEpisode === ep.episodeId
                            ? 'bg-[#003527] text-white shadow-sm'
                            : 'bg-[#f8f9ff] text-[#404944] hover:bg-[#eff4ff] border border-[#bfc9c3]/40'
                        }`}
                      >
                        <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold">
                          {index + 1}
                        </span>
                        <span className="truncate max-w-[140px] md:max-w-[180px]">{ep.badge}</span>
                      </button>
                    ))}
                  </div>

                  {/* ACTIVE SPOTIFY EMBED PLAYER */}
                  {showEmbedPlayer && (
                    <div className="mb-5 rounded-xl overflow-hidden border border-[#bfc9c3]/60 bg-black shadow-inner">
                      <iframe
                        title={`Spotify Embed: ${currentActiveSpotifyEp.title}`}
                        src={currentActiveSpotifyEp.embedUrl}
                        width="100%"
                        height="152"
                        frameBorder="0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        className="w-full rounded-xl"
                      />
                    </div>
                  )}

                  {/* SPOTIFY ACTIVE EPISODE BANNER WITH AUDIO PREVIEW */}
                  <div className="mb-5 p-4 rounded-xl bg-gradient-to-br from-[#003527] to-[#044e3b] text-white shadow-md relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
                    
                    <div className="flex items-start gap-4 relative z-10">
                      {/* Official Podcast Cover Art */}
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-neutral-900 border border-white/20 shadow-sm group/cover">
                        <img
                          src={SPOTIFY_COVER_IMAGE}
                          alt={currentActiveSpotifyEp.title}
                          className="w-full h-full object-cover group-hover/cover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                        <button
                          onClick={togglePlayAudio}
                          className="absolute inset-0 bg-black/40 flex items-center justify-center text-white hover:bg-black/60 transition-colors cursor-pointer"
                          title={isPlayingPreview ? 'Tạm dừng nghe thử' : 'Phát bản nghe thử'}
                        >
                          {isPlayingPreview ? (
                            <Pause className="w-6 h-6 text-[#1db954] fill-current" />
                          ) : (
                            <Play className="w-6 h-6 text-white fill-current ml-0.5" />
                          )}
                        </button>
                      </div>

                      {/* Episode Content Meta */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 bg-[#1db954] text-black font-body text-[10px] font-extrabold rounded tracking-wide">
                            {currentActiveSpotifyEp.badge}
                          </span>
                          <span className="text-[11px] font-mono text-emerald-200 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {currentActiveSpotifyEp.releaseDate}
                          </span>
                        </div>

                        <a
                          href={currentActiveSpotifyEp.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-display text-[15px] md:text-[16px] font-bold text-white hover:text-emerald-300 transition-colors line-clamp-1 block"
                        >
                          &quot;{currentActiveSpotifyEp.title}&quot;
                        </a>

                        <p className="text-[12px] font-body text-emerald-100/80 line-clamp-1 mt-0.5">
                          {currentActiveSpotifyEp.subtitle}
                        </p>

                        {/* Audio Preview Controls */}
                        <div className="flex items-center gap-3 mt-3 pt-2 border-t border-white/10">
                          <button
                            onClick={togglePlayAudio}
                            className="inline-flex items-center gap-1.5 px-3 py-1 bg-white text-[#003527] rounded-full text-[12px] font-body font-bold hover:bg-emerald-100 transition-all cursor-pointer shadow-sm"
                          >
                            {isPlayingPreview ? (
                              <>
                                <Pause className="w-3.5 h-3.5 fill-current" />
                                <span>{isVi ? 'Đang phát' : 'Playing'}</span>
                              </>
                            ) : (
                              <>
                                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                                <span>{isVi ? 'Nghe thử âm thanh' : 'Preview Audio'}</span>
                              </>
                            )}
                          </button>

                          <button
                            onClick={toggleMute}
                            className="p-1.5 rounded-full hover:bg-white/10 text-emerald-200 transition-colors cursor-pointer"
                            title={isMuted ? 'Bật âm lượng' : 'Tắt tiếng'}
                          >
                            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                          </button>

                          <div className="flex-1 flex items-center gap-2">
                            {isPlayingPreview && (
                              <div className="flex items-end gap-0.5 h-3.5">
                                <span className="w-1 bg-[#1db954] animate-bounce h-3 rounded-full" style={{ animationDelay: '0ms' }} />
                                <span className="w-1 bg-[#1db954] animate-bounce h-2 rounded-full" style={{ animationDelay: '150ms' }} />
                                <span className="w-1 bg-[#1db954] animate-bounce h-3.5 rounded-full" style={{ animationDelay: '300ms' }} />
                                <span className="w-1 bg-[#1db954] animate-bounce h-1.5 rounded-full" style={{ animationDelay: '450ms' }} />
                              </div>
                            )}
                            <span className="text-[11px] font-mono text-emerald-200">
                              {formatTime(currentTime)} / {duration > 0 ? formatTime(duration) : currentActiveSpotifyEp.duration}
                            </span>
                          </div>

                          <a
                            href={currentActiveSpotifyEp.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] font-body text-emerald-300 hover:underline flex items-center gap-1 ml-auto"
                          >
                            <span>Spotify</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 3 SPOTIFY FEATURED EPISODES LIST */}
                  <div className="space-y-2.5 mb-6">
                    <div className="flex items-center justify-between text-[12px] font-body font-semibold text-[#707974] px-1">
                      <span>{isVi ? 'DANH SÁCH 3 TẬP NỔI BẬT' : 'FEATURED 3 EPISODES'}</span>
                      <span>Spotify Link</span>
                    </div>

                    {spotifyEpisodes.map((ep) => {
                      const isCurrent = activeSpotifyEpisode === ep.episodeId;
                      return (
                        <div
                          key={ep.id}
                          className={`flex items-center justify-between p-3.5 rounded-xl border transition-all duration-200 ${
                            isCurrent
                              ? 'bg-emerald-50/70 border-[#1db954] shadow-sm'
                              : 'bg-[#f8f9ff] hover:bg-[#eff4ff] border-[#bfc9c3]/40'
                          }`}
                        >
                          <div
                            onClick={() => setActiveSpotifyEpisode(ep.episodeId)}
                            className="flex items-center gap-3 min-w-0 pr-2 cursor-pointer flex-1"
                          >
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform ${
                                isCurrent
                                  ? 'bg-[#1db954] text-white scale-110 shadow-sm'
                                  : 'bg-[#1db954]/15 text-[#15803d] hover:scale-105'
                              }`}
                            >
                              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <h4
                                  className={`font-body text-[14px] font-semibold truncate transition-colors ${
                                    isCurrent ? 'text-[#003527]' : 'text-[#0b1c30]'
                                  }`}
                                >
                                  {ep.title}
                                </h4>
                                <span className="px-1.5 py-0.5 bg-[#1db954]/20 text-[#15803d] rounded text-[10px] font-bold whitespace-nowrap">
                                  {ep.badge}
                                </span>
                              </div>
                              <p className="text-[12px] font-body text-[#707974] truncate mt-0.5">
                                {ep.subtitle}
                              </p>
                              <div className="flex items-center gap-2 font-body text-[11px] text-[#707974] mt-1">
                                <span className="text-[#003527] font-medium">{ep.tag}</span>
                                <span>•</span>
                                <span className="flex items-center gap-0.5">
                                  <Clock className="w-3 h-3" />
                                  {ep.duration}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 flex-shrink-0">
                            <a
                              href={ep.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[12px] font-body font-semibold text-[#15803d] hover:text-[#003527] bg-white px-3 py-1.5 rounded-lg border border-emerald-200/80 shadow-2xs hover:bg-emerald-50 transition-colors"
                              title="Nghe tập này trên Spotify"
                            >
                              <span>{isVi ? 'Nghe tập' : 'Open'}</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}

              {/* VIEW 2: 4 CONTENT PILLARS */}
              {spotifyViewMode === 'pillars' && (
                <div className="space-y-3 mb-6">
                  <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-200/60 mb-3">
                    <p className="text-[13px] font-body text-purple-950 leading-relaxed font-medium">
                      {isVi
                        ? 'TRIEU CAO & Talks tập trung vào 4 trục nội dung chiến lược giao thoa giữa lý thuyết và thực tiễn:'
                        : 'TRIEU CAO & Talks focuses on 4 strategic content pillars bridging theory and real-world execution:'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {contentPillars.map((pillar) => {
                      const Icon = pillar.icon;
                      return (
                        <div
                          key={pillar.id}
                          className={`p-4 rounded-xl border transition-all ${pillar.bg}`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-base">{pillar.tag}</span>
                            <Icon className="w-4 h-4" style={{ color: pillar.color }} />
                            <h4 className="font-body text-[13px] font-bold tracking-tight">
                              {pillar.title}
                            </h4>
                          </div>
                          <ul className="space-y-1.5 pl-1">
                            {pillar.items.map((item, idx) => (
                              <li
                                key={idx}
                                className="text-[12px] font-body leading-snug flex items-start gap-1.5 opacity-90"
                              >
                                <span className="text-emerald-700 font-bold mt-0.5">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Spotify CTA Footer */}
            <div className="p-6 bg-[#f8f9ff] border-t border-[#bfc9c3]/40 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-[13px] font-body text-[#404944]">
                <Radio className="w-4 h-4 text-[#1db954]" />
                <span className="truncate max-w-[280px]">open.spotify.com/show/7EHXAnC6XzGiFMpkkCu6Sq</span>
              </div>
              <a
                href={SPOTIFY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#1db954] hover:bg-[#1aa34a] text-white px-5 py-2.5 rounded-lg font-body text-[14px] font-medium shadow-sm transition-all cursor-pointer"
              >
                <span>{t('media.podcast.cta', 'Lắng nghe trên Spotify')}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 3. VISUAL ACTIVITY & PROJECT GALLERY (THƯ VIỆN HÌNH ẢNH THỰC TẾ) */}
        {/* ============================================================ */}
        <div className="mt-12 pt-8 border-t border-[#bfc9c3]/50">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#eff4ff] text-[#003527] rounded-full text-[12px] font-body font-bold border border-[#003527]/10 mb-2">
                <ImageIcon className="w-3.5 h-3.5 text-[#003527]" />
                <span>{isVi ? 'HÌNH ẢNH HOẠT ĐỘNG & DỰ ÁN THỰC TẾ' : 'PROJECTS & ACTIVITY GALLERY'}</span>
              </div>
              <h3 className="font-display text-[22px] md:text-[28px] font-bold text-[#003527] leading-tight">
                {isVi ? 'Dấu ấn thực chiến qua lăng kính truyền thông & dự án' : 'Visual Highlights across Major Milestones & Media'}
              </h3>
              <p className="font-body text-[14px] md:text-[15px] text-[#404944] mt-1 max-w-2xl">
                {isVi
                  ? 'Tổng hợp hình ảnh tiêu biểu về các dự án công nghệ, y tế số, giáo dục, sự kiện kết nối và các cột mốc thực thi chiến lược.'
                  : 'Curated photo collection highlighting key milestones in digital healthcare, education transformation, platform advisory, and events.'}
              </p>
            </div>

            {/* Filter Chips */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { key: 'all', label: isVi ? 'Tất cả hình ảnh' : 'All Photos' },
                { key: 'digital_transformation', label: isVi ? 'Chuyển đổi số' : 'Digital Tech' },
                { key: 'press_coverage', label: isVi ? 'Báo chí & Hệ thống' : 'Press & Network' },
                { key: 'events', label: isVi ? 'Đổi mới & Sự kiện' : 'Events & Innovation' },
                { key: 'media_podcast', label: isVi ? 'Podcast Media' : 'Podcasts' },
              ].map((f) => (
                <button
                  key={f.key}
                  onClick={() => setGalleryFilter(f.key)}
                  className={`px-3.5 py-1.5 rounded-lg text-[13px] font-body font-medium transition-all cursor-pointer ${
                    galleryFilter === f.key
                      ? 'bg-[#003527] text-white shadow-xs'
                      : 'bg-[#eff4ff] text-[#404944] hover:bg-[#dce9ff] hover:text-[#003527]'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {GALLERY_MEDIA_ITEMS.filter(
              (item) => galleryFilter === 'all' || item.category === galleryFilter
            ).map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedGalleryItem(item)}
                className="group relative bg-white rounded-2xl overflow-hidden border border-[#bfc9c3]/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer"
              >
                {/* Image Container with Zoom & Badge */}
                <div className="relative aspect-[16/10] bg-neutral-900 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      if (item.fallbackUrl) {
                        (e.target as HTMLImageElement).src = item.fallbackUrl;
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Top Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md text-white text-[11px] font-body font-bold rounded-md border border-white/20 shadow-xs">
                      {item.badge}
                    </span>
                  </div>

                  {/* Top-Right Quick Zoom Button */}
                  <div className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md text-[#003527] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                    <ZoomIn className="w-4 h-4" />
                  </div>

                  {/* Category Chip Bottom Left */}
                  <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-emerald-300 font-semibold uppercase tracking-wider">
                      {isVi ? item.categoryLabel.vi : item.categoryLabel.en}
                    </span>
                    {item.date && (
                      <span className="text-[11px] font-mono text-white/80">
                        {item.date}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-display text-[16px] md:text-[17px] font-bold text-[#0b1c30] group-hover:text-[#003527] transition-colors line-clamp-2 mb-2 leading-snug">
                      {isVi ? item.title.vi : item.title.en}
                    </h4>
                    <p className="font-body text-[13px] text-[#404944] line-clamp-2 leading-relaxed">
                      {isVi ? item.subtitle.vi : item.subtitle.en}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#bfc9c3]/30 flex items-center justify-between text-[12px] font-body">
                    {item.sourceLink ? (
                      <span className="text-[#003527] font-semibold truncate max-w-[180px]">
                        {item.sourceLink.sourceName}
                      </span>
                    ) : (
                      <span className="text-[#707974]">
                        {isVi ? 'Tài liệu hoạt động' : 'Executive Activity'}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1 text-[#003527] font-bold group-hover:translate-x-0.5 transition-transform">
                      <span>{isVi ? 'Xem chi tiết' : 'View details'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/* OFFICIAL PRESS COVERAGE: BÁO CHÍ ĐƯA TIN CHUYỂN ĐỔI SỐ */}
        {/* ============================================================ */}
        <div className="mt-14 space-y-4">
          <div className="flex items-center gap-2 text-[#003527]">
            <Newspaper className="w-5 h-5" />
            <h3 className="font-display text-[18px] md:text-[20px] font-bold text-[#0b1c30]">
              {isVi ? 'Truyền thông về các dự án/ thành tựu đã tham gia' : 'Media & Press Coverage on Projects & Achievements'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Press Article: Đài Truyền hình HTV */}
            <div className="bg-gradient-to-br from-[#1e1b4b] to-[#0f172a] rounded-2xl p-6 text-white shadow-md border border-[#312e81] flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-0.5 bg-[#fbcfe8] text-[#831843] rounded-full text-[11px] font-body font-bold uppercase tracking-wider">
                    ĐÀI TRUYỀN HÌNH HTV
                  </span>
                  <span className="px-2.5 py-0.5 bg-white/15 text-white rounded-full text-[11px] font-body font-medium">
                    HTV.VN • BẢN TIN THỜI SỰ
                  </span>
                </div>
                <h4 className="font-display text-[16px] md:text-[18px] font-bold text-white leading-snug">
                  {isVi
                    ? 'Thúc đẩy doanh nghiệp công nghệ thương mại hóa sản phẩm - Đài Truyền hình HTV'
                    : 'HTV Television: Promoting Technology Businesses to Commercialize Products'}
                </h4>
                <p className="font-body text-[13px] text-[#eff4ff]/90 leading-relaxed">
                  {isVi
                    ? 'Ông Cao Nguyễn Nhật Triều (Giám đốc điều hành Công ty TNHH MTV Công Nghệ Cao Nha Trang) chia sẻ trên sóng HTV: Nhấn mạnh lợi thế dân số trẻ, năng động và vị thế trung tâm KHCN của TP.HCM giúp doanh nghiệp đưa sản phẩm từ phòng R&D ra thị trường trong nước và quốc tế.'
                    : 'Cao Nguyen Nhat Trieu (COO Nha Trang Hitech) interviewed on HTV: Highlighting HCMC dynamic young talent and premier tech hub status in bridging R&D research into viable commercialized products.'}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-2">
                <span className="text-[12px] text-[#fbcfe8] font-medium">HTV.vn & YouTube</span>
                <div className="flex items-center gap-2 flex-wrap">
                  <a
                    href="https://htv.vn/thuc-day-doanh-nghiep-cong-nghe-thuong-mai-hoa-san-pham-22226090516104883.htm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-white/90 hover:bg-white text-[#1e1b4b] px-3.5 py-2 rounded-[4px] font-body text-[12.5px] font-bold transition-all shadow-xs cursor-pointer"
                  >
                    <span>{isVi ? 'Bài báo HTV' : 'Article'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://www.youtube.com/watch?si=UJ3MoshsIuSK-RwE&v=y-_DxX8pUFQ&feature=youtu.be"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-[#ff0000] hover:bg-[#cc0000] text-white px-3.5 py-2 rounded-[4px] font-body text-[12.5px] font-bold transition-all shadow-xs cursor-pointer"
                  >
                    <Youtube className="w-3.5 h-3.5" />
                    <span>{isVi ? 'Xem Video' : 'Watch Video'}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Media Item: Chương trình Luật Phát Triển Đô Thị */}
            <div className="bg-gradient-to-br from-[#1e293b] to-[#091528] rounded-2xl p-6 text-white shadow-md border border-[#3b82f6]/40 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-0.5 bg-[#bfdbfe] text-[#1e3a8a] rounded-full text-[11px] font-body font-bold uppercase tracking-wider">
                    LUẬT PHÁT TRIỂN ĐÔ THỊ
                  </span>
                  <span className="px-2.5 py-0.5 bg-[#ef4444]/20 text-[#fca5a5] border border-[#ef4444]/30 rounded-full text-[11px] font-body font-bold">
                    TỪ PHÚT THỨ 11:00
                  </span>
                </div>
                <h4 className="font-display text-[16px] md:text-[18px] font-bold text-white leading-snug">
                  {isVi
                    ? 'Chương trình Luật Phát Triển Đô Thị: Đóng góp ý kiến của ông Cao Nguyễn Nhật Triều'
                    : 'Urban Development Law Program: Expert Contributions by Cao Nguyen Nhat Trieu'}
                </h4>
                <p className="font-body text-[13px] text-[#eff4ff]/90 leading-relaxed">
                  {isVi
                    ? 'Xuất hiện từ phút 11:00, ông Cao Nguyễn Nhật Triều (Giám đốc điều hành Nha Trang Hitech) nêu bật kỳ vọng của cộng đồng doanh nghiệp vào Khoản 5 Điều 29: cơ chế thử nghiệm có kiểm soát (Sandbox) và chính sách ưu đãi công nghệ chiến lược để đưa TP.HCM thành trung tâm thương mại hóa sản phẩm R&D.'
                    : 'Featured from minute 11:00, Cao Nguyen Nhat Trieu (COO Nha Trang Hitech) emphasized tech business expectations for Clause 5 Article 29: controlled regulatory sandboxes and strategic incentives empowering tech commercialization in HCMC.'}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-2">
                <span className="text-[12px] text-[#bfdbfe] font-medium">YouTube Livestream</span>
                <a
                  href="https://www.youtube.com/live/gPXndsELXvw?si=SgTTNQzKH1KXrKUF&t=660s"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-[#ef4444] hover:bg-[#dc2626] text-white px-4 py-2 rounded-[4px] font-body text-[13px] font-bold transition-all shadow-xs cursor-pointer"
                >
                  <Youtube className="w-3.5 h-3.5" />
                  <span>{isVi ? 'Xem Video (Phút 11:00)' : 'Watch (From 11:00)'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Press Article 1: Báo Điện tử Chính phủ */}
            <div className="bg-gradient-to-br from-[#003527] to-[#0b2820] rounded-2xl p-6 text-white shadow-md border border-[#003527] flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-0.5 bg-[#b0f0d6] text-[#003527] rounded-full text-[11px] font-body font-bold uppercase tracking-wider">
                    BÁO ĐIỆN TỬ CHÍNH PHỦ
                  </span>
                  <span className="px-2.5 py-0.5 bg-white/15 text-white rounded-full text-[11px] font-body font-medium">
                    ĐỀ ÁN 06 CHÍNH PHỦ
                  </span>
                </div>
                <h4 className="font-display text-[16px] md:text-[18px] font-bold text-white leading-snug">
                  {isVi
                    ? 'HDBank - Ngân hàng đầu tiên đưa kiosk y tế thông minh vào nâng cao trải nghiệm khám chữa bệnh cho người dân'
                    : 'HDBank - First Bank to Deploy Smart Healthcare Kiosks Enhancing Citizen Experience'}
                </h4>
                <p className="font-body text-[13px] text-[#eff4ff]/90 leading-relaxed">
                  {isVi
                    ? 'Dự án Chuyển đổi số Y tế: Triển khai 1.001+ Kiosk y tế thông minh toàn quốc, xác thực CCCD gắn chip sinh trắc học và thanh toán viện phí không tiền mặt, giảm hơn 70% thời gian chờ cho người dân.'
                    : 'Healthcare Digital Transformation: Deployment of 1,001+ Smart Healthcare Kiosks, biometric Citizen ID check-in, and cashless hospital payments, cutting queue times by 70%+.'}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-white/15 flex items-center justify-between">
                <span className="text-[12px] text-[#b0f0d6] font-medium">BaoChinhPhu.vn</span>
                <a
                  href="https://baochinhphu.vn/hdbank-ngan-hang-dau-tien-dua-kiosk-y-te-thong-minh-vao-nang-cao-trai-nghiem-kham-chua-benh-cho-nguoi-dan-102250307164606244.htm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-white hover:bg-[#eff4ff] text-[#003527] px-4 py-2 rounded-[4px] font-body text-[13px] font-bold transition-all shadow-xs cursor-pointer"
                >
                  <span>{isVi ? 'Đọc bài báo' : 'Read Article'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Press Article 2: Báo Đồng Nai */}
            <div className="bg-gradient-to-br from-[#0b2820] to-[#043d2c] rounded-2xl p-6 text-white shadow-md border border-[#003527] flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-0.5 bg-[#b0f0d6] text-[#003527] rounded-full text-[11px] font-body font-bold uppercase tracking-wider">
                    BÁO ĐỒNG NAI
                  </span>
                  <span className="px-2.5 py-0.5 bg-white/15 text-white rounded-full text-[11px] font-body font-medium">
                    CHUYÊN MỤC CHUYỂN ĐỔI SỐ
                  </span>
                </div>
                <h4 className="font-display text-[16px] md:text-[18px] font-bold text-white leading-snug">
                  {isVi
                    ? 'Kết nối hệ sinh thái tài chính số - Đẩy mạnh chuyển đổi số giáo dục & quản lý điện tử'
                    : 'Connecting Digital Financial Ecosystems - Accelerating Education Digital Transformation'}
                </h4>
                <p className="font-body text-[13px] text-[#eff4ff]/90 leading-relaxed">
                  {isVi
                    ? 'Dự án Chuyển đổi số Giáo dục: Đẩy mạnh hoạt động quản lý giáo dục và thanh toán lên giao dịch điện tử và số hóa (Edupay / Smart Campus), kết nối hệ sinh thái tài chính số minh bạch, an toàn.'
                    : 'Education Digital Transformation: Advancing academic management and tuition fee payments into electronic transactions and digitization (Edupay / Smart Campus).'}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-white/15 flex items-center justify-between">
                <span className="text-[12px] text-[#b0f0d6] font-medium">BaoDongNai.com.vn</span>
                <a
                  href="https://baodongnai.com.vn/chuyen-doi-so/202606/ket-noi-he-sinh-thai-tai-chinh-so-8d44066/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-white hover:bg-[#eff4ff] text-[#003527] px-4 py-2 rounded-[4px] font-body text-[13px] font-bold transition-all shadow-xs cursor-pointer"
                >
                  <span>{isVi ? 'Đọc bài báo' : 'Read Article'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Media Item 3: Qualcomm Vietnam Innovation Challenge */}
            <div className="bg-gradient-to-br from-[#052b3b] to-[#021f2b] rounded-2xl p-6 text-white shadow-md border border-[#0a465c] flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-0.5 bg-[#8fe3ff] text-[#002f43] rounded-full text-[11px] font-body font-bold uppercase tracking-wider">
                    QUALCOMM CHALLENGES 2026
                  </span>
                  <span className="px-2.5 py-0.5 bg-white/15 text-white rounded-full text-[11px] font-body font-medium">
                    CHUNG KẾT TOÀN CẦU
                  </span>
                </div>
                <h4 className="font-display text-[16px] md:text-[18px] font-bold text-white leading-snug">
                  {isVi
                    ? 'Nha Trang Hitech vào Chung kết Qualcomm Challenges 2026 với hệ sinh thái Ontrak Chainflow'
                    : 'Nha Trang Hitech Advances to Qualcomm Challenges 2026 Finals with Ontrak Chainflow'}
                </h4>
                <p className="font-body text-[13px] text-[#eff4ff]/90 leading-relaxed">
                  {isVi
                    ? 'Thành tựu công nghệ quốc tế: Nha Trang Hitech xuất sắc vào Vòng Chung kết cuộc thi danh giá Qualcomm Vietnam Innovation Challenge 2026 cùng hệ sinh thái công nghệ cao Ontrak Chainflow.'
                    : 'Global tech milestone: Nha Trang Hitech advanced to the Finals of Qualcomm Vietnam Innovation Challenge 2026 with the Ontrak Chainflow high-tech ecosystem.'}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-white/15 flex items-center justify-between">
                <span className="text-[12px] text-[#8fe3ff] font-medium">Facebook Reel / Video</span>
                <a
                  href="https://www.facebook.com/reel/1411251914186357"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-[#8fe3ff] hover:bg-white text-[#002f43] px-4 py-2 rounded-[4px] font-body text-[13px] font-bold transition-all shadow-xs cursor-pointer"
                >
                  <span>{isVi ? 'Xem Video' : 'Watch Video'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Press Article 4: Báo Doanh Nhân Toàn Cầu - TCA */}
            <div className="bg-gradient-to-br from-[#1a2e3b] to-[#0d1a24] rounded-2xl p-6 text-white shadow-md border border-[#2a4555] flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-0.5 bg-[#bce3ff] text-[#0d273a] rounded-full text-[11px] font-body font-bold uppercase tracking-wider">
                    DOANH NHÂN TOÀN CẦU
                  </span>
                  <span className="px-2.5 py-0.5 bg-white/15 text-white rounded-full text-[11px] font-body font-medium">
                    MẠNG LƯỚI 63 TỈNH THÀNH
                  </span>
                </div>
                <h4 className="font-display text-[16px] md:text-[18px] font-bold text-white leading-snug">
                  {isVi
                    ? 'TCA tưng bừng khai trương văn phòng mới - Phát triển mạng lưới gần 100 VPĐD trên 63 tỉnh thành'
                    : 'TCA Grand Opening of New Offices - Scaling Network across 63 Provinces & Nearly 100 Offices'}
                </h4>
                <p className="font-body text-[13px] text-[#eff4ff]/90 leading-relaxed">
                  {isVi
                    ? 'Thành tựu tại TCA: Phát triển mạng lưới rộng khắp 63 tỉnh thành trên toàn quốc với gần 100 văn phòng đại diện chính thức, tạo nền tảng vững chắc phục vụ hàng triệu khách hàng.'
                    : 'Achievement at TCA: Built and scaled a nationwide distribution network across 63 provinces and cities with nearly 100 official representative offices.'}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-white/15 flex items-center justify-between">
                <span className="text-[12px] text-[#bce3ff] font-medium">DoanhNhanToanCau.net</span>
                <a
                  href="https://doanhnhantoancau.net/tca-tung-bung-khai-truong-van-phong-moi.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-white hover:bg-[#eff4ff] text-[#0d273a] px-4 py-2 rounded-[4px] font-body text-[13px] font-bold transition-all shadow-xs cursor-pointer"
                >
                  <span>{isVi ? 'Đọc bài báo' : 'Read Article'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Press Article 5: Báo PVN - Tập đoàn Dầu khí Việt Nam */}
            <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl p-6 text-white shadow-md border border-[#334155] flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-0.5 bg-[#fef08a] text-[#713f12] rounded-full text-[11px] font-body font-bold uppercase tracking-wider">
                    TẬP ĐOÀN DẦU KHÍ VIỆT NAM
                  </span>
                  <span className="px-2.5 py-0.5 bg-white/15 text-white rounded-full text-[11px] font-body font-medium">
                    HỢP TÁC CHIẾN LƯỢC
                  </span>
                </div>
                <h4 className="font-display text-[16px] md:text-[18px] font-bold text-white leading-snug">
                  {isVi
                    ? 'Bảo hiểm PVI và TC Advisors ký thoả thuận hợp tác và triển khai bảo hiểm TNDS bắt buộc'
                    : 'PVI Insurance and TC Advisors Sign Strategic Partnership Agreement'}
                </h4>
                <p className="font-body text-[13px] text-[#eff4ff]/90 leading-relaxed">
                  {isVi
                    ? 'Hợp tác định chế tài chính: Ký kết triển khai các giải pháp bảo hiểm chuyên nghiệp, chuẩn hóa quy trình phân phối sản phẩm qua hệ sinh thái đại lý toàn quốc của TCA.'
                    : 'Strategic institutional alliance: Signing and deploying comprehensive insurance solutions across TC Advisors nationwide distribution network.'}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-white/15 flex items-center justify-between">
                <span className="text-[12px] text-[#fef08a] font-medium">PVN.vn</span>
                <a
                  href="https://www.pvn.vn/bao-hiem-pvi-va-tc-advisors-ky-thoa-thuan-hop-tac-va-trien-khai-bao-hiem-trach-nhiem-dan-su-bat-buoc-9308"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-white hover:bg-[#eff4ff] text-[#0f172a] px-4 py-2 rounded-[4px] font-body text-[13px] font-bold transition-all shadow-xs cursor-pointer"
                >
                  <span>{isVi ? 'Đọc bài báo' : 'Read Article'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Press Article 6: Ninh Thuan TV */}
            <div className="bg-gradient-to-br from-[#2a2438] to-[#171226] rounded-2xl p-6 text-white shadow-md border border-[#3e3454] flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-0.5 bg-[#e9d5ff] text-[#581c87] rounded-full text-[11px] font-body font-bold uppercase tracking-wider">
                    ĐÀI PT-TH NINH THUẬN
                  </span>
                  <span className="px-2.5 py-0.5 bg-white/15 text-white rounded-full text-[11px] font-body font-medium">
                    TRUNG TÂM BỒI THƯỜNG
                  </span>
                </div>
                <h4 className="font-display text-[16px] md:text-[18px] font-bold text-white leading-snug">
                  {isVi
                    ? 'Khai trương Trung tâm Hỗ trợ Bồi thường TCA - Phục vụ & bảo vệ quyền lợi người dân'
                    : 'Opening of TCA Claim Support Center - Serving & Protecting Client Rights'}
                </h4>
                <p className="font-body text-[13px] text-[#eff4ff]/90 leading-relaxed">
                  {isVi
                    ? 'Bảo vệ quyền lợi khách hàng: Triển khai hàng trăm trung tâm hỗ trợ bồi thường độc lập trên toàn quốc, hỗ trợ người dân giải quyết thủ tục chi trả quyền lợi bảo hiểm minh bạch, nhanh chóng.'
                    : 'Customer protection: Deployed hundreds of independent claim support centers across Vietnam to facilitate transparent, timely claim settlements for policyholders.'}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-white/15 flex items-center justify-between">
                <span className="text-[12px] text-[#e9d5ff] font-medium">NinhThuanTV.vn</span>
                <a
                  href="https://ninhthuantv.vn/tin-tuc/khai-truong-trung-tam-ho-tro-boi-thuong-tca-ninh-thuan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-white hover:bg-[#eff4ff] text-[#171226] px-4 py-2 rounded-[4px] font-body text-[13px] font-bold transition-all shadow-xs cursor-pointer"
                >
                  <span>{isVi ? 'Xem tin tức' : 'View News'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Press Article 7: Báo Tiền Phong - H2Y Platform */}
            <div className="bg-gradient-to-br from-[#2a1b24] to-[#160c13] rounded-2xl p-6 text-white shadow-md border border-[#48283b] flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-0.5 bg-[#fbcfe8] text-[#831843] rounded-full text-[11px] font-body font-bold uppercase tracking-wider">
                    BÁO TIỀN PHONG
                  </span>
                  <span className="px-2.5 py-0.5 bg-white/15 text-white rounded-full text-[11px] font-body font-medium">
                    NỀN TẢNG H2Y VIỆT NAM
                  </span>
                </div>
                <h4 className="font-display text-[16px] md:text-[18px] font-bold text-white leading-snug">
                  {isVi
                    ? 'Thiết lập & tư vấn tạo dựng nền tảng H2Y tại Việt Nam - Triển lãm Beauty Inside You'
                    : 'Establishment & Advisory for H2Y Platform in Vietnam - Beauty Inside You Exhibition'}
                </h4>
                <p className="font-body text-[13px] text-[#eff4ff]/90 leading-relaxed">
                  {isVi
                    ? 'Tư vấn tạo dựng nền tảng H2Y tại Việt Nam thời gian đầu: Thiết lập hệ sinh thái phân phối, kết nối chuỗi cung ứng thương mại và chuỗi triển lãm xúc tiến thương mại mỹ phẩm công nghệ.'
                    : 'Advisory and foundational setup for H2Y platform in Vietnam: Building distribution ecosystems, supply chains, and beauty-tech trade exhibitions.'}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-white/15 flex items-center justify-between">
                <span className="text-[12px] text-[#fbcfe8] font-medium">TienPhong.vn</span>
                <a
                  href="https://tienphong.vn/beauty-inside-you-2023-trien-lam-my-pham-khoi-day-moi-giac-quan-post1521299.tpo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-white hover:bg-[#eff4ff] text-[#831843] px-4 py-2 rounded-[4px] font-body text-[13px] font-bold transition-all shadow-xs cursor-pointer"
                >
                  <span>{isVi ? 'Đọc bài báo' : 'Read Article'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* FULLSCREEN / RESPONSIVE YOUTUBE VIDEO PLAYER MODAL */}
      {/* ============================================================ */}
      {modalVideo && (
        <div
          id="youtube-video-modal"
          className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-6"
          onClick={() => setModalVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-[#0b1c30] text-white rounded-2xl overflow-hidden shadow-2xl border border-white/15"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 md:px-6 bg-[#071322] border-b border-white/10">
              <div className="flex items-center gap-2.5 min-w-0 pr-4">
                <div className="w-8 h-8 rounded-lg bg-[#ff0000]/20 flex items-center justify-center text-[#ff0000] flex-shrink-0">
                  <Youtube className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] font-mono text-[#ff0000] uppercase font-bold tracking-wider block">
                    {modalVideo.badge}
                  </span>
                  <h3 className="font-display text-[15px] md:text-[17px] font-bold text-white truncate">
                    {modalVideo.title}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={modalVideo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-1.5 text-[12px] font-body"
                  title="Mở trên YouTube"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="hidden sm:inline">YouTube</span>
                </a>
                <button
                  onClick={() => setModalVideo(null)}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title="Đóng video"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Embedded Responsive Video Player */}
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={modalVideo.embedUrl}
                title={modalVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            {/* Modal Footer Video Switcher & Information */}
            <div className="p-4 md:p-6 bg-[#071322] border-t border-white/10">
              <p className="font-body text-[14px] text-slate-300 leading-relaxed mb-4">
                {modalVideo.subtitle}
              </p>

              <div className="flex items-center justify-between flex-wrap gap-3 pt-3 border-t border-white/10">
                <div className="text-[12px] font-body text-slate-400">
                  <span>{isVi ? 'Video khác trong kênh:' : 'Other channel videos:'}</span>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {youtubeVideos.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setModalVideo(v)}
                      className={`px-3 py-1.5 rounded-lg text-[12px] font-body font-semibold transition-all cursor-pointer ${
                        modalVideo.id === v.id
                          ? 'bg-[#cc0000] text-white shadow-xs'
                          : 'bg-white/10 hover:bg-white/20 text-slate-200'
                      }`}
                    >
                      {v.tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* ============================================================ */}
      {/* FULLSCREEN / RESPONSIVE IMAGE LIGHTBOX MODAL */}
      {/* ============================================================ */}
      {selectedGalleryItem && (
        <div
          id="gallery-lightbox-modal"
          className="fixed inset-0 z-[130] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={() => setSelectedGalleryItem(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-[#0b1c30] text-white rounded-2xl overflow-hidden shadow-2xl border border-white/20 flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:px-6 bg-[#071322] border-b border-white/10 flex-shrink-0">
              <div className="flex items-center gap-2.5 min-w-0 pr-4">
                <span className="px-2.5 py-1 rounded bg-[#003527] text-emerald-300 font-mono text-[11px] font-bold uppercase tracking-wider">
                  {selectedGalleryItem.badge}
                </span>
                <h3 className="font-display text-[15px] sm:text-[17px] font-bold text-white truncate">
                  {isVi ? selectedGalleryItem.title.vi : selectedGalleryItem.title.en}
                </h3>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {selectedGalleryItem.videoUrl && (
                  <a
                    href={selectedGalleryItem.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-[#ff0000] hover:bg-[#cc0000] text-white transition-colors flex items-center gap-1.5 text-[12px] font-body font-semibold"
                    title="Xem Video / Livestream"
                  >
                    <Youtube className="w-4 h-4" />
                    <span className="hidden sm:inline">{isVi ? 'Xem Video' : 'Watch Video'}</span>
                  </a>
                )}
                {selectedGalleryItem.sourceLink && (
                  <a
                    href={selectedGalleryItem.sourceLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-1.5 text-[12px] font-body"
                    title="Mở nguồn tin tức"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="hidden sm:inline">{selectedGalleryItem.sourceLink.sourceName}</span>
                  </a>
                )}
                <button
                  onClick={() => setSelectedGalleryItem(null)}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title="Đóng xem ảnh"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Image Display */}
            <div className="relative bg-black flex items-center justify-center min-h-[260px] max-h-[55vh] overflow-hidden">
              <img
                src={selectedGalleryItem.imageUrl}
                alt={selectedGalleryItem.imageAlt}
                className="w-full h-full object-contain max-h-[55vh]"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  if (selectedGalleryItem.fallbackUrl) {
                    (e.target as HTMLImageElement).src = selectedGalleryItem.fallbackUrl;
                  }
                }}
              />
            </div>

            {/* Modal Footer Description */}
            <div className="p-4 sm:p-6 bg-[#071322] border-t border-white/10 overflow-y-auto">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-[12px] font-mono text-emerald-400 font-semibold">
                  {isVi ? selectedGalleryItem.categoryLabel.vi : selectedGalleryItem.categoryLabel.en}
                </span>
                {selectedGalleryItem.date && (
                  <>
                    <span className="text-white/30">•</span>
                    <span className="text-[12px] font-mono text-slate-300">
                      {selectedGalleryItem.date}
                    </span>
                  </>
                )}
              </div>

              <p className="font-body text-[14px] sm:text-[15px] text-slate-200 leading-relaxed">
                {isVi ? selectedGalleryItem.subtitle.vi : selectedGalleryItem.subtitle.en}
              </p>

              {/* Tags and Navigation */}
              <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-1.5">
                  {selectedGalleryItem.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300 text-[11px] font-body"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  {GALLERY_MEDIA_ITEMS.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedGalleryItem(item)}
                      className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                        selectedGalleryItem.id === item.id ? 'bg-emerald-400 scale-125' : 'bg-white/30 hover:bg-white/60'
                      }`}
                      title={item.badge}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
