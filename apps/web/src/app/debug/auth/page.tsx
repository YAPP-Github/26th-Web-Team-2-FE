"use client";

import { useToggle } from "@ssok/ui";
import LoginPopup from "@/shared/components/login-popup";

const DebugAuthPage = () => {
  const { active, deactivate } = useToggle(true);
  return (
    <>
      <p>DebugAuthPage</p>
      <LoginPopup title="" active={active} onClose={deactivate} />
    </>
  );
};

export default DebugAuthPage;
