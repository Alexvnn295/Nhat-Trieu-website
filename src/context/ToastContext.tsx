import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ShoppingBag, X, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';
import { ToastItem, ToastType, Product } from '../types';
import { useLanguage } from './LanguageContext';

interface ToastContextType {
  toasts: ToastItem[];
  showToast: (toast: Omit<ToastItem, 'id'>) => string;
  showSuccess: (title: string, message?: string, options?: Partial<ToastItem>) => string;
  showCartAdded: (product: Product, onOpenCart?: () => void) => string;
  showInfo: (title: string, message?: string, options?: Partial<ToastItem>) => string;
  showError: (title: string, message?: string, options?: Partial<ToastItem>) => string;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastItemComponentProps {
  toast: ToastItem;
  onDismiss: (id: string) => void;
}

const ToastItemComponent: React.FC<ToastItemComponentProps> = ({ toast, onDismiss }) => {
  const [isPaused, setIsPaused] = useState(false);
  const { formatPrice } = useLanguage();
  const duration = toast.duration ?? (toast.type === 'cart' ? 4500 : 4000);

  // Determine icon & styling based on type
  const getIcon = () => {
    switch (toast.type) {
      case 'cart':
        return <ShoppingBag className="w-5 h-5 text-[#003527]" />;
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-[#003527]" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'info':
      default:
        return <Sparkles className="w-5 h-5 text-[#003527]" />;
    }
  };

  const getIconBg = () => {
    switch (toast.type) {
      case 'error':
        return 'bg-red-100 text-red-600 border border-red-200';
      case 'cart':
      case 'success':
      case 'info':
      default:
        return 'bg-[#b0f0d6]/50 text-[#003527] border border-[#003527]/20';
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -16, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="status"
      aria-live="polite"
      id={`toast-${toast.id}`}
      className="pointer-events-auto relative w-full bg-white/95 backdrop-blur-md border border-[#bfc9c3]/70 rounded-xl shadow-[0_12px_32px_rgba(0,53,39,0.14)] p-4 overflow-hidden transition-all hover:shadow-[0_16px_40px_rgba(0,53,39,0.18)]"
    >
      <div className="flex items-start gap-3.5">
        {/* Product Thumbnail or Type Icon */}
        {toast.product?.image ? (
          <div className="relative flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border border-[#bfc9c3]/60 bg-[#eff4ff]">
            <img
              src={toast.product.image}
              alt={toast.product.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#003527] text-white flex items-center justify-center shadow">
              <ShoppingBag className="w-3 h-3" />
            </div>
          </div>
        ) : (
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-xs ${getIconBg()}`}
          >
            {getIcon()}
          </div>
        )}

        {/* Text Content */}
        <div className="flex-1 min-w-0 pr-6">
          <div className="flex items-center gap-2">
            <h4 className="font-display text-[15px] font-bold text-[#003527] leading-tight truncate">
              {toast.title}
            </h4>
            {toast.product && (
              <span className="inline-block px-2 py-0.5 text-[11px] font-bold font-body bg-[#eff4ff] text-[#003527] rounded-full">
                {formatPrice(toast.product.price)}
              </span>
            )}
          </div>

          {toast.message && (
            <p className="font-body text-[13px] text-[#404944] mt-0.5 line-clamp-2 leading-relaxed">
              {toast.message}
            </p>
          )}

          {/* Action Button */}
          {toast.action && (
            <div className="mt-2.5">
              <button
                onClick={() => {
                  toast.action?.onClick();
                  onDismiss(toast.id);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] bg-[#003527] hover:bg-[#064e3b] text-white font-body text-[12px] font-semibold transition-transform duration-150 active:scale-95 cursor-pointer shadow-xs"
              >
                <span>{toast.action.label}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={() => onDismiss(toast.id)}
          className="absolute top-3 right-3 w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Dismiss notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Progress countdown bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#003527]/10 overflow-hidden">
        <motion.div
          initial={{ width: '100%' }}
          animate={{ width: isPaused ? '100%' : '0%' }}
          transition={{
            duration: isPaused ? 0 : duration / 1000,
            ease: 'linear',
          }}
          className="h-full bg-gradient-to-r from-[#003527] to-[#2b6954]"
        />
      </div>
    </motion.div>
  );
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timersRef = useRef<Map<string, NodeJS.Timeout>>(new Map());
  const { t } = useLanguage();

  const removeToast = useCallback((id: string) => {
    if (timersRef.current.has(id)) {
      clearTimeout(timersRef.current.get(id));
      timersRef.current.delete(id);
    }
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const clearToasts = useCallback(() => {
    timersRef.current.forEach((timer) => clearTimeout(timer));
    timersRef.current.clear();
    setToasts([]);
  }, []);

  const showToast = useCallback(
    (toast: Omit<ToastItem, 'id'>) => {
      const id = Math.random().toString(36).substring(2, 9) + Date.now();
      const newToast: ToastItem = { ...toast, id };
      const duration = toast.duration ?? (toast.type === 'cart' ? 4500 : 4000);

      setToasts((prev) => {
        // Keep maximum 4 concurrent toasts to avoid cluttering screen
        const updated = [...prev, newToast];
        if (updated.length > 4) {
          const removed = updated.shift();
          if (removed && timersRef.current.has(removed.id)) {
            clearTimeout(timersRef.current.get(removed.id));
            timersRef.current.delete(removed.id);
          }
        }
        return updated;
      });

      if (duration > 0) {
        const timer = setTimeout(() => {
          removeToast(id);
        }, duration);
        timersRef.current.set(id, timer);
      }

      return id;
    },
    [removeToast]
  );

  const showSuccess = useCallback(
    (title: string, message?: string, options?: Partial<ToastItem>) => {
      return showToast({
        type: 'success',
        title,
        message,
        ...options,
      });
    },
    [showToast]
  );

  const showCartAdded = useCallback(
    (product: Product, onOpenCart?: () => void) => {
      return showToast({
        type: 'cart',
        title: t('toast.cartAddedTitle', 'Đã thêm vào giỏ hàng'),
        message: product.title,
        product,
        duration: 5000,
        action: onOpenCart
          ? {
              label: t('toast.cartAddedAction', 'Xem giỏ hàng'),
              onClick: onOpenCart,
            }
          : undefined,
      });
    },
    [showToast, t]
  );

  const showInfo = useCallback(
    (title: string, message?: string, options?: Partial<ToastItem>) => {
      return showToast({
        type: 'info',
        title,
        message,
        ...options,
      });
    },
    [showToast]
  );

  const showError = useCallback(
    (title: string, message?: string, options?: Partial<ToastItem>) => {
      return showToast({
        type: 'error',
        title,
        message,
        ...options,
      });
    },
    [showToast]
  );

  return (
    <ToastContext.Provider
      value={{
        toasts,
        showToast,
        showSuccess,
        showCartAdded,
        showInfo,
        showError,
        removeToast,
        clearToasts,
      }}
    >
      {children}

      {/* Toast Render View Container */}
      <div
        id="toast-notification-region"
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[100] pointer-events-none flex flex-col gap-3 w-full max-w-[92vw] sm:max-w-md"
      >
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <ToastItemComponent
              key={toast.id}
              toast={toast}
              onDismiss={removeToast}
            />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};
