import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Headphones,
  Sliders,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Highlighter,
  Check,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useBlogAudioReader } from '../hooks/useBlogAudioReader';
import { BlogPost } from '../types';

interface BlogAudioPlayerProps {
  post: BlogPost;
  audioReader: ReturnType<typeof useBlogAudioReader>;
  compact?: boolean;
}

export const BlogAudioPlayer: React.FC<BlogAudioPlayerProps> = ({
  post,
  audioReader,
  compact = false,
}) => {
  const { language, t } = useLanguage();
  const [isSpeedMenuOpen, setIsSpeedMenuOpen] = useState(false);
  const [isVoiceMenuOpen, setIsVoiceMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(1.0);
  const speedMenuRef = useRef<HTMLDivElement>(null);
  const voiceMenuRef = useRef<HTMLDivElement>(null);

  const {
    isPlaying,
    isPaused,
    isSupported,
    progress,
    rate,
    volume,
    selectedVoice,
    availableVoices,
    activeSentenceText,
    isHighlighted,
    estimatedTotalSeconds,
    currentSeconds,
    togglePlay,
    stop,
    seekTo,
    skipForward,
    skipBackward,
    changeRate,
    changeVoice,
    setVolume,
    setIsHighlighted,
  } = audioReader;

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Close menus on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (speedMenuRef.current && !speedMenuRef.current.contains(e.target as Node)) {
        setIsSpeedMenuOpen(false);
      }
      if (voiceMenuRef.current && !voiceMenuRef.current.contains(e.target as Node)) {
        setIsVoiceMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleVolumeToggle = () => {
    if (isMuted) {
      setVolume(prevVolume || 1.0);
      setIsMuted(false);
    } else {
      setPrevVolume(volume);
      setVolume(0);
      setIsMuted(true);
    }
  };

  const speedOptions = [0.75, 1.0, 1.25, 1.5, 2.0];

  // Filter voices for current language
  const currentLangPrefix = language === 'vi' ? 'vi' : language === 'en' ? 'en' : language;
  const filteredVoices = availableVoices.filter((v) =>
    v.lang.toLowerCase().startsWith(currentLangPrefix.toLowerCase())
  );
  const voicesToDisplay = filteredVoices.length > 0 ? filteredVoices : availableVoices.slice(0, 6);

  if (!isSupported) {
    return null;
  }

  return (
    <div className="blog-audio-player-container rounded-2xl bg-gradient-to-r from-[#eff4ff] via-[#f4fbf7] to-[#eff4ff] border border-[#003527]/20 p-4 md:p-5 shadow-xs mb-8 transition-all">
      {/* Top Bar: Title & Status */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3.5">
        <div className="flex items-center gap-2.5">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
            isPlaying
              ? 'bg-[#003527] text-[#80e5b7] shadow-sm animate-pulse'
              : 'bg-[#003527]/10 text-[#003527]'
          }`}>
            <Headphones className="w-4.5 h-4.5" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-[15px] md:text-[16px] font-bold text-[#003527]">
                {language === 'vi' ? 'Nghe bài viết (Audio Reader)' : 'Audio Reader'}
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#003527]/10 text-[#003527]">
                <Sparkles className="w-2.5 h-2.5" />
                {isPlaying ? (language === 'vi' ? 'Đang đọc' : 'Playing') : (language === 'vi' ? 'Giọng đọc AI' : 'AI Speech')}
              </span>
            </div>
            <div className="text-[12px] font-body text-[#707974] flex items-center gap-2">
              <span>{formatTime(currentSeconds)} / {formatTime(estimatedTotalSeconds)}</span>
              <span>•</span>
              <span>{selectedVoice ? selectedVoice.name.split(' ')[0] : 'Standard Voice'} ({rate}x)</span>
            </div>
          </div>
        </div>

        {/* Audio Equalizer animation when playing */}
        <div className="flex items-center gap-2">
          {isPlaying && (
            <div className="flex items-end gap-1 h-5 px-2 py-0.5 bg-[#003527]/10 rounded-md">
              <span className="w-1 bg-[#003527] rounded-full animate-bounce h-3" style={{ animationDelay: '0.1s' }}></span>
              <span className="w-1 bg-[#003527] rounded-full animate-bounce h-5" style={{ animationDelay: '0.3s' }}></span>
              <span className="w-1 bg-[#003527] rounded-full animate-bounce h-2" style={{ animationDelay: '0.2s' }}></span>
              <span className="w-1 bg-[#003527] rounded-full animate-bounce h-4" style={{ animationDelay: '0.4s' }}></span>
            </div>
          )}

          {/* Sentence Highlight Toggle */}
          <button
            onClick={() => setIsHighlighted(!isHighlighted)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[12px] font-body font-medium transition-all cursor-pointer ${
              isHighlighted
                ? 'bg-[#003527] text-white'
                : 'bg-white text-[#707974] hover:text-[#003527] border border-[#bfc9c3]/50'
            }`}
            title={language === 'vi' ? 'Bật/tắt bám sáng chữ đang đọc' : 'Toggle live sentence highlight'}
          >
            <Highlighter className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {language === 'vi' ? 'Bám chữ' : 'Highlight'}
            </span>
          </button>
        </div>
      </div>

      {/* Progress Bar / Scrubber */}
      <div className="relative mb-4 group">
        <div
          className="h-2.5 w-full bg-[#bfc9c3]/40 hover:bg-[#bfc9c3]/60 rounded-full overflow-hidden cursor-pointer transition-colors relative"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const percent = (clickX / rect.width) * 100;
            seekTo(percent);
          }}
        >
          <div
            className="h-full bg-gradient-to-r from-[#003527] to-[#2b6954] rounded-full transition-all duration-150 relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white border-2 border-[#003527] rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        </div>
      </div>

      {/* Interactive Controls Row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Left: Play/Pause/Skip Controls */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Skip Back 10s */}
          <button
            onClick={skipBackward}
            className="p-2 rounded-xl bg-white hover:bg-[#eff4ff] text-[#003527] border border-[#bfc9c3]/50 transition-colors cursor-pointer"
            title={language === 'vi' ? 'Lùi 10 giây' : 'Rewind 10s'}
            aria-label="Rewind 10 seconds"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Main Play / Pause Button */}
          <button
            onClick={togglePlay}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#003527] hover:bg-[#064e3b] text-white font-body font-bold text-[14px] shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer"
            aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-white" />
                <span>{language === 'vi' ? 'Tạm dừng' : 'Pause'}</span>
              </>
            ) : isPaused ? (
              <>
                <Play className="w-4 h-4 fill-white ml-0.5" />
                <span>{language === 'vi' ? 'Tiếp tục' : 'Resume'}</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white ml-0.5" />
                <span>{language === 'vi' ? 'Bắt đầu nghe' : 'Listen Now'}</span>
              </>
            )}
          </button>

          {/* Skip Forward 10s */}
          <button
            onClick={skipForward}
            className="p-2 rounded-xl bg-white hover:bg-[#eff4ff] text-[#003527] border border-[#bfc9c3]/50 transition-colors cursor-pointer"
            title={language === 'vi' ? 'Tua tới 10 giây' : 'Fast forward 10s'}
            aria-label="Forward 10 seconds"
          >
            <RotateCw className="w-4 h-4" />
          </button>

          {/* Reset / Stop */}
          {(isPlaying || isPaused || progress > 0) && (
            <button
              onClick={stop}
              className="px-3 py-1.5 rounded-xl text-[12px] font-body font-medium text-[#707974] hover:text-[#ba1a1a] hover:bg-[#ba1a1a]/10 transition-colors cursor-pointer"
              title={language === 'vi' ? 'Dừng đọc & đặt lại từ đầu' : 'Stop and reset'}
            >
              {language === 'vi' ? 'Dừng lại' : 'Stop'}
            </button>
          )}
        </div>

        {/* Right: Rate, Voice & Volume Options */}
        <div className="flex items-center gap-2">
          {/* Speed Selector Dropdown */}
          <div className="relative" ref={speedMenuRef}>
            <button
              onClick={() => setIsSpeedMenuOpen(!isSpeedMenuOpen)}
              className="flex items-center gap-1 px-3 py-2 rounded-xl bg-white hover:bg-[#eff4ff] text-[#003527] border border-[#bfc9c3]/50 font-body text-[13px] font-bold transition-colors cursor-pointer"
              title={language === 'vi' ? 'Tốc độ đọc' : 'Playback Speed'}
            >
              <span>{rate}x</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </button>

            {isSpeedMenuOpen && (
              <div className="absolute right-0 bottom-full mb-2 w-32 bg-white rounded-xl shadow-xl border border-[#bfc9c3]/60 py-1.5 z-30 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#707974] border-b border-[#bfc9c3]/20">
                  {language === 'vi' ? 'Tốc độ' : 'Speed'}
                </div>
                {speedOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      changeRate(opt);
                      setIsSpeedMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-[13px] font-body transition-colors cursor-pointer ${
                      rate === opt
                        ? 'bg-[#eff4ff] text-[#003527] font-bold'
                        : 'text-[#404944] hover:bg-[#eff4ff]'
                    }`}
                  >
                    <span>{opt}x</span>
                    {rate === opt && <Check className="w-3.5 h-3.5 text-[#003527]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Voice Selector Dropdown (if multiple voices) */}
          {voicesToDisplay.length > 1 && (
            <div className="relative" ref={voiceMenuRef}>
              <button
                onClick={() => setIsVoiceMenuOpen(!isVoiceMenuOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-[#eff4ff] text-[#003527] border border-[#bfc9c3]/50 font-body text-[13px] font-medium transition-colors cursor-pointer max-w-[150px] truncate"
                title={language === 'vi' ? 'Chọn giọng đọc' : 'Choose Voice'}
              >
                <Sliders className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="truncate">{selectedVoice ? selectedVoice.name.split(' ')[0] : 'Voice'}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60 flex-shrink-0" />
              </button>

              {isVoiceMenuOpen && (
                <div className="absolute right-0 bottom-full mb-2 w-64 max-h-60 overflow-y-auto bg-white rounded-xl shadow-xl border border-[#bfc9c3]/60 py-1.5 z-30 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#707974] border-b border-[#bfc9c3]/20">
                    {language === 'vi' ? 'Chọn giọng đọc khả dụng' : 'Available Voices'}
                  </div>
                  {voicesToDisplay.map((voice) => {
                    const isSelected = selectedVoice?.name === voice.name;
                    return (
                      <button
                        key={voice.name}
                        onClick={() => {
                          changeVoice(voice);
                          setIsVoiceMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2 text-[12px] font-body transition-colors cursor-pointer text-left ${
                          isSelected
                            ? 'bg-[#eff4ff] text-[#003527] font-bold'
                            : 'text-[#404944] hover:bg-[#eff4ff]'
                        }`}
                      >
                        <div className="truncate pr-2">
                          <div className="font-semibold truncate">{voice.name}</div>
                          <div className="text-[10px] text-[#707974]">{voice.lang}</div>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-[#003527] flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Volume Mute Toggle */}
          <button
            onClick={handleVolumeToggle}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              isMuted
                ? 'bg-[#ba1a1a]/10 text-[#ba1a1a] border-[#ba1a1a]/30'
                : 'bg-white hover:bg-[#eff4ff] text-[#003527] border-[#bfc9c3]/50'
            }`}
            title={isMuted ? (language === 'vi' ? 'Bật âm thanh' : 'Unmute') : (language === 'vi' ? 'Tắt âm thanh' : 'Mute')}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Active Reading Live Sentence Snippet */}
      {isPlaying && activeSentenceText && isHighlighted && (
        <div className="mt-3.5 pt-3 border-t border-[#003527]/10 flex items-start gap-2 text-[13px] font-body text-[#003527] bg-white/70 px-3 py-2 rounded-xl animate-in fade-in duration-200">
          <span className="w-2 h-2 rounded-full bg-[#10b981] mt-1.5 flex-shrink-0 animate-ping"></span>
          <p className="line-clamp-2 italic leading-relaxed">
            &ldquo;{activeSentenceText}&rdquo;
          </p>
        </div>
      )}
    </div>
  );
};
