"use client";

import { useState } from "react";

const useIsMobile = (breakpoint = 768) => {
  const [isMobile, _setIsMobile] = useState(window.innerWidth < breakpoint);

  return isMobile;
};

export default useIsMobile;
