import { useState, useEffect, useRef, useCallback } from 'react';
import { BlogPost } from '../types';

export interface AudioReaderState {
  isPlaying: boolean;
  isPaused: boolean;
  isSupported: boolean;
  currentChunkIndex: number;
  totalChunks: number;
  progress: number; // 0 to 100
  rate: number; // 0.75, 1, 1.25, 1.5, 2
  volume: number; // 0 to 1
  selectedVoice: SpeechSynthesisVoice | null;
  availableVoices: SpeechSynthesisVoice[];
  activeSentenceText: string;
  isHighlighted: boolean;
  estimatedTotalSeconds: number;
  currentSeconds: number;
}

export function useBlogAudioReader(post: BlogPost | null, language: string = 'vi') {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
  const [rate, setRate] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('trieu_blog_audio_rate');
      return saved ? parseFloat(saved) : 1.0;
    } catch {
      return 1.0;
    }
  });
  const [volume, setVolume] = useState(1.0);
  const [isHighlighted, setIsHighlighted] = useState(true);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

  const chunksRef = useRef<string[]>([]);
  const isSpeakingRef = useRef(false);
  const currentChunkIndexRef = useRef(0);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Check speech synthesis support
  const isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  // Split text into coherent chunks (sentences / natural speech units)
  const prepareChunks = useCallback((article: BlogPost): string[] => {
    if (!article) return [];
    
    // Combine intro and content
    const fullContent = `${article.title}. ${article.excerpt ? article.excerpt + '.' : ''} ${article.content}`;
    
    // Split by punctuation followed by space or newline, while keeping sensible chunks
    const rawParagraphs = fullContent.split(/\n+/);
    const result: string[] = [];

    for (const paragraph of rawParagraphs) {
      const trimmed = paragraph.trim();
      if (!trimmed) continue;

      // Split paragraph into sentences
      const sentences = trimmed.match(/[^.!?]+[.!?]+|\S+/g) || [trimmed];
      let currentBuffer = '';

      for (const s of sentences) {
        const sentenceTrimmed = s.trim();
        if (!sentenceTrimmed) continue;

        if (currentBuffer.length + sentenceTrimmed.length < 140) {
          currentBuffer += (currentBuffer ? ' ' : '') + sentenceTrimmed;
        } else {
          if (currentBuffer) result.push(currentBuffer);
          currentBuffer = sentenceTrimmed;
        }
      }
      if (currentBuffer) {
        result.push(currentBuffer);
      }
    }

    return result.length > 0 ? result : [article.title, article.excerpt, article.content];
  }, []);

  // Update chunks when post changes
  useEffect(() => {
    if (post) {
      const chunks = prepareChunks(post);
      chunksRef.current = chunks;
      setCurrentChunkIndex(0);
      currentChunkIndexRef.current = 0;
      if (isSupported && window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
      setIsPlaying(false);
      setIsPaused(false);
      isSpeakingRef.current = false;
    } else {
      chunksRef.current = [];
      if (isSupported && window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
      setIsPlaying(false);
      setIsPaused(false);
      isSpeakingRef.current = false;
    }
  }, [post, prepareChunks, isSupported]);

  // Load and filter voices based on language
  useEffect(() => {
    if (!isSupported) return;

    const updateVoices = () => {
      const allVoices = window.speechSynthesis.getVoices();
      if (!allVoices || allVoices.length === 0) return;

      setAvailableVoices(allVoices);

      // Target language prefixes
      const langPrefix = language === 'vi' ? 'vi' : language === 'en' ? 'en' : language;
      
      // Preferred voice match
      const matchingVoices = allVoices.filter(
        (v) => v.lang.toLowerCase().startsWith(langPrefix.toLowerCase())
      );

      if (matchingVoices.length > 0) {
        // Prefer natural / google / microsoft voice if present
        const preferred =
          matchingVoices.find(
            (v) =>
              v.name.includes('Natural') ||
              v.name.includes('Google') ||
              v.name.includes('Neural') ||
              v.name.includes('Premium') ||
              v.name.includes('Mai') ||
              v.name.includes('Linh') ||
              v.name.includes('Nam')
          ) || matchingVoices[0];
        setSelectedVoice(preferred);
      } else {
        // Fallback to default voice
        setSelectedVoice(allVoices[0] || null);
      }
    };

    updateVoices();

    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
  }, [isSupported, language]);

  // Estimate total listening duration (in seconds)
  const totalWords = (post ? `${post.title} ${post.excerpt} ${post.content}` : '').split(/\s+/).length;
  // Average reading speed: 150 words per minute at 1.0x rate
  const estimatedTotalSeconds = Math.max(15, Math.round((totalWords / (150 * rate)) * 60));
  const totalChunks = chunksRef.current.length || 1;
  const progress = totalChunks > 0 ? Math.min(100, Math.round((currentChunkIndex / totalChunks) * 100)) : 0;
  const currentSeconds = Math.round((progress / 100) * estimatedTotalSeconds);

  // Play a specific chunk index
  const speakChunk = useCallback(
    (index: number) => {
      if (!isSupported || !chunksRef.current || chunksRef.current.length === 0) return;

      if (index >= chunksRef.current.length) {
        // Finished article
        setIsPlaying(false);
        setIsPaused(false);
        isSpeakingRef.current = false;
        setCurrentChunkIndex(0);
        currentChunkIndexRef.current = 0;
        return;
      }

      currentChunkIndexRef.current = index;
      setCurrentChunkIndex(index);

      // Cancel previous speech before starting next chunk
      window.speechSynthesis.cancel();

      const textToSpeak = chunksRef.current[index];
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utteranceRef.current = utterance;

      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      utterance.rate = rate;
      utterance.volume = volume;
      utterance.pitch = 1.0;

      // Set language fallback
      if (language === 'vi') {
        utterance.lang = 'vi-VN';
      } else if (language === 'en') {
        utterance.lang = 'en-US';
      } else if (language === 'ja') {
        utterance.lang = 'ja-JP';
      } else if (language === 'zh') {
        utterance.lang = 'zh-CN';
      } else if (language === 'fr') {
        utterance.lang = 'fr-FR';
      } else if (language === 'de') {
        utterance.lang = 'de-DE';
      }

      utterance.onend = () => {
        if (isSpeakingRef.current) {
          const nextIndex = currentChunkIndexRef.current + 1;
          speakChunk(nextIndex);
        }
      };

      utterance.onerror = (e) => {
        if (e.error !== 'canceled' && e.error !== 'interrupted') {
          console.warn('SpeechSynthesis error:', e);
          if (isSpeakingRef.current) {
            const nextIndex = currentChunkIndexRef.current + 1;
            speakChunk(nextIndex);
          }
        }
      };

      isSpeakingRef.current = true;
      setIsPlaying(true);
      setIsPaused(false);
      window.speechSynthesis.speak(utterance);
    },
    [isSupported, rate, volume, selectedVoice, language]
  );

  // Play / Resume handler
  const play = useCallback(() => {
    if (!isSupported) return;

    if (isPaused && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPlaying(true);
      setIsPaused(false);
      isSpeakingRef.current = true;
    } else {
      isSpeakingRef.current = true;
      setIsPlaying(true);
      setIsPaused(false);
      speakChunk(currentChunkIndexRef.current);
    }
  }, [isSupported, isPaused, speakChunk]);

  // Pause handler
  const pause = useCallback(() => {
    if (!isSupported) return;
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      setIsPlaying(false);
      setIsPaused(true);
      isSpeakingRef.current = false;
    }
  }, [isSupported]);

  // Toggle Play / Pause
  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, pause, play]);

  // Stop / Reset
  const stop = useCallback(() => {
    if (!isSupported) return;
    isSpeakingRef.current = false;
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentChunkIndex(0);
    currentChunkIndexRef.current = 0;
  }, [isSupported]);

  // Seek to specific chunk / progress percentage
  const seekTo = useCallback(
    (targetProgressPercent: number) => {
      if (!chunksRef.current || chunksRef.current.length === 0) return;
      const targetIndex = Math.floor((targetProgressPercent / 100) * chunksRef.current.length);
      const clampedIndex = Math.max(0, Math.min(targetIndex, chunksRef.current.length - 1));
      
      if (isPlaying) {
        speakChunk(clampedIndex);
      } else {
        setCurrentChunkIndex(clampedIndex);
        currentChunkIndexRef.current = clampedIndex;
      }
    },
    [isPlaying, speakChunk]
  );

  // Skip forward (e.g. 2 chunks ~ 10-15 seconds)
  const skipForward = useCallback(() => {
    const nextIndex = Math.min(chunksRef.current.length - 1, currentChunkIndexRef.current + 2);
    if (isPlaying) {
      speakChunk(nextIndex);
    } else {
      setCurrentChunkIndex(nextIndex);
      currentChunkIndexRef.current = nextIndex;
    }
  }, [isPlaying, speakChunk]);

  // Skip backward
  const skipBackward = useCallback(() => {
    const prevIndex = Math.max(0, currentChunkIndexRef.current - 2);
    if (isPlaying) {
      speakChunk(prevIndex);
    } else {
      setCurrentChunkIndex(prevIndex);
      currentChunkIndexRef.current = prevIndex;
    }
  }, [isPlaying, speakChunk]);

  // Change playback rate
  const changeRate = useCallback(
    (newRate: number) => {
      setRate(newRate);
      try {
        localStorage.setItem('trieu_blog_audio_rate', String(newRate));
      } catch {
        // ignore
      }
      if (isPlaying) {
        // Restart current chunk with new rate
        speakChunk(currentChunkIndexRef.current);
      }
    },
    [isPlaying, speakChunk]
  );

  // Change voice
  const changeVoice = useCallback(
    (voice: SpeechSynthesisVoice) => {
      setSelectedVoice(voice);
      if (isPlaying) {
        speakChunk(currentChunkIndexRef.current);
      }
    },
    [isPlaying, speakChunk]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (isSupported && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isSupported]);

  const activeSentenceText = chunksRef.current[currentChunkIndex] || '';

  return {
    isPlaying,
    isPaused,
    isSupported,
    currentChunkIndex,
    totalChunks,
    progress,
    rate,
    volume,
    selectedVoice,
    availableVoices,
    activeSentenceText,
    isHighlighted,
    estimatedTotalSeconds,
    currentSeconds,
    play,
    pause,
    togglePlay,
    stop,
    seekTo,
    skipForward,
    skipBackward,
    changeRate,
    changeVoice,
    setVolume,
    setIsHighlighted,
  };
}
