"use client";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface CreatePortalProps {
  container?: Element | DocumentFragment;
  children: ReactNode;
}

export const CreatePortal = ({ container, children }: CreatePortalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) {
    return null;
  }

  return createPortal(children, container || document.body);
};
