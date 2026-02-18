"use client";

import type { PropsWithChildren } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import IcClose from "@/assets/icons/ic_close.svg?react";
import { cn } from "@/utils";

interface BottomSheetContextValue {
  onClose: () => void;
  active: boolean;
}

const BottomSheetContext = createContext<BottomSheetContextValue | null>(null);

const useBottomSheetContext = () => {
  const context = useContext(BottomSheetContext);
  if (!context) {
    throw new Error(
      "BottomSheet compound components must be used within BottomSheet",
    );
  }
  return context;
};

export interface BottomSheetProps
  extends PropsWithChildren<{
    active?: boolean;
    onClose: () => void;
    showBackdrop?: boolean;
    closeOnBackdropClick?: boolean;
    className?: string;
  }> {}

const CLOSE_DURATION_MS = 500;

const BottomSheetRoot = ({
  children,
  active = false,
  onClose,
  showBackdrop = true,
  closeOnBackdropClick = true,
  className,
}: BottomSheetProps) => {
  const [isClosing, setIsClosing] = useState(false);
  const wasActiveRef = useRef(false);

  useEffect(() => {
    if (active) {
      wasActiveRef.current = true;
      setIsClosing(false);
    } else if (wasActiveRef.current) {
      wasActiveRef.current = false;
      setIsClosing(true);
    }
  }, [active]);

  useEffect(() => {
    if (!isClosing) return;
    const id = setTimeout(() => setIsClosing(false), CLOSE_DURATION_MS);
    return () => clearTimeout(id);
  }, [isClosing]);

  const handleBackdropClick = useCallback(() => {
    if (closeOnBackdropClick && showBackdrop) onClose();
  }, [closeOnBackdropClick, showBackdrop, onClose]);

  const shouldRender = active || isClosing || wasActiveRef.current;
  if (!shouldRender) return null;

  const contextValue: BottomSheetContextValue = { onClose, active: !isClosing };

  const sheetContent = (
    // biome-ignore lint/a11y/noStaticElementInteractions: 시트 클릭 시 배경으로 이벤트 전파 방지
    // biome-ignore lint/a11y/useKeyWithClickEvents: 클릭 전파 방지용, 모바일 터치만 지원
    <div
      className={cn(
        "fixed right-0 bottom-0 left-0 z-modal flex max-h-[90vh] flex-col rounded-t-[1.6rem] border border-neutral-90 border-b-0 bg-white transition-transform ease-out",
        isClosing ? "translate-y-full" : "translate-y-0",
        className,
      )}
      onClick={(e) => e.stopPropagation()}
      style={{ transitionDuration: `${CLOSE_DURATION_MS}ms` }}
    >
      <BottomSheetContext.Provider value={contextValue}>
        {children}
      </BottomSheetContext.Provider>
    </div>
  );

  if (showBackdrop) {
    return (
      <div className="fixed inset-0 z-modal">
        <div
          role="presentation"
          aria-hidden
          className={cn("fixed inset-0 bg-neutral-0 opacity-5 ease-out")}
          style={{ transitionDuration: `${CLOSE_DURATION_MS}ms` }}
          onClick={handleBackdropClick}
        />
        {sheetContent}
      </div>
    );
  }

  return sheetContent;
};

export interface BottomSheetHeaderProps
  extends PropsWithChildren<{
    title?: string;
    className?: string;
  }> {}

const BottomSheetHeader = ({
  title,
  children,
  className,
}: BottomSheetHeaderProps) => {
  const { onClose } = useBottomSheetContext();

  return (
    <header
      className={cn(
        "flex shrink-0 items-center justify-between px-[1.6rem] py-[2.4rem]",
        className,
      )}
    >
      <div className="flex flex-1">
        {title ? (
          <h2 className="text-heading1-semi20 text-neutral-10">{title}</h2>
        ) : (
          children
        )}
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label="닫기"
        className={cn(
          "flex cursor-pointer items-center justify-center transition-colors",
          !title && !children && "ml-auto",
        )}
      >
        <IcClose className="h-[3rem] w-[3rem] text-neutral-40" />
      </button>
    </header>
  );
};

export interface BottomSheetBodyProps
  extends PropsWithChildren<{
    className?: string;
  }> {}

const BottomSheetBody = ({ children, className }: BottomSheetBodyProps) => {
  return (
    <div
      className={cn(
        "flex flex-1 flex-col overflow-y-auto overscroll-contain px-[1.6rem] pt-[0.8rem] pb-[2rem]",
        className,
      )}
    >
      {children}
    </div>
  );
};

export interface BottomSheetFooterProps
  extends PropsWithChildren<{
    className?: string;
  }> {}

const BottomSheetFooter = ({ children, className }: BottomSheetFooterProps) => {
  return (
    <footer
      className={cn(
        "flex shrink-0 items-center px-[1.6rem] pt-[2rem] pb-[3.4rem]",
        className,
      )}
    >
      {children}
    </footer>
  );
};

const BottomSheet = Object.assign(BottomSheetRoot, {
  Header: BottomSheetHeader,
  Body: BottomSheetBody,
  Footer: BottomSheetFooter,
});

export default BottomSheet;
