"use client";

import { useToggle } from "@ssok/ui";
import { useEffect } from "react";
import Dialog from "@/shared/components/dialog";

const DialogProvider = () => {
  const { active, activate, deactivate } = useToggle();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) activate();
      else deactivate();
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [deactivate, activate]);

  return active ? <Dialog active={true} /> : null;
};

export default DialogProvider;
