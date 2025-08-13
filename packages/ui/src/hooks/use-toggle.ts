import { useCallback, useState } from "react";

export const useToggle = (initialValue = false) => {
  const [active, setActive] = useState(initialValue);

  const activate = useCallback(() => {
    setActive(true);
  }, []);

  const deactivate = useCallback(() => {
    setActive(false);
  }, []);

  const toggle = useCallback(() => {
    setActive((prev) => !prev);
  }, []);

  return {
    active,
    activate,
    deactivate,
    toggle,
  };
};
