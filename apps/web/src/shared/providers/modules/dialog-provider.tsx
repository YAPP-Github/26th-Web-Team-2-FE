"use client";

import { useToggle } from "@ssok/ui";
import Dialog from "@/shared/components/dialog";

const DialogProvider = () => {
  const { active } = useToggle(window.innerWidth < 768);

  return active ? <Dialog active={true} /> : null;
};

export default DialogProvider;
