"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type { Toast } from "@/types/toast";

interface ToastContextType {
  toasts: Toast[];
  addToast: (content: string, duration?: number) => string;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export interface ToastProviderProps {
  maxToasts?: number;
  defaultDuration?: number;
  children: ReactNode;
}

const ToastProvider = ({
  maxToasts = 5,
  defaultDuration = 3_000,
  children,
}: ToastProviderProps) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timersRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const removeToast = useCallback((id: string) => {
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }

    // 먼저 exiting 상태로 변경
    setToasts((prev) =>
      prev.map((toast) =>
        toast.id === id ? { ...toast, state: "exiting" } : toast,
      ),
    );

    // 애니메이션 완료(350ms) 후 추가 버퍼를 가진 후 실제 제거
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 500);
  }, []);

  const addToast = useCallback(
    (content: string, duration?: number) => {
      const id = `toast-${Date.now()}-${Math.random()}`;
      const newToast: Toast = {
        id,
        variant: "success",
        content,
        duration: duration || defaultDuration,
        state: "entering",
      };

      setToasts((prev) => {
        const updated = [...prev, newToast];
        if (updated.length > maxToasts) {
          const removed = updated.slice(0, updated.length - maxToasts);
          removed.forEach((toast) => {
            const timer = timersRef.current.get(toast.id);
            if (timer) {
              clearTimeout(timer);
              timersRef.current.delete(toast.id);
            }
          });
          return updated.slice(-maxToasts);
        }
        return updated;
      });

      setTimeout(() => {
        setToasts((prev) =>
          prev.map((toast) =>
            toast.id === id ? { ...toast, state: "visible" as const } : toast,
          ),
        );
      }, 350);

      if (newToast.duration && newToast.duration > 0) {
        const timer = setTimeout(() => {
          removeToast(id);
        }, newToast.duration);
        timersRef.current.set(id, timer);
      }

      return id;
    },
    [defaultDuration, maxToasts, removeToast],
  );

  useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) => clearTimeout(timer));
      timersRef.current.clear();
    };
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToastContext must be used within a ToastProvider");
  }
  return context;
};

export default ToastProvider;
