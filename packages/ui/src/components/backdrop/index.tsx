"use client";
import type { PropsWithChildren } from "react";
import { useEffect } from "react";
import { cn } from "@/utils";

export interface BackdropProps
  extends PropsWithChildren<{
    active?: boolean;
    onClose?: () => void;
    className?: string;
  }> {}

const Backdrop = ({
  children,
  active = true,
  onClose,
  className,
}: BackdropProps) => {
  useEffect(() => {
    if (!active) {
      return;
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && onClose) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [active, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  if (!active) {
    return null;
  }

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: onClick 사용하여 팝업 닫기 구현
    // biome-ignore lint/a11y/useKeyWithClickEvents: onClick 사용하여 팝업 닫기 구현
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/50",
        className,
      )}
      onClick={handleBackdropClick}
    >
      {children}
    </div>
  );
};

export default Backdrop;
