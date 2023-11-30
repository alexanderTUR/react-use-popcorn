import { useEffect } from "react";

export const useKey = (key, action) => {
  useEffect(() => {
    const callback = (event) => {
      if (event.code.toLowerCase() === key.toLowerCase()) {
        action();
      }
    };
    window.addEventListener("keydown", callback);
    return () => {
      window.removeEventListener("keydown", callback);
    };
  }, [key, action]);
};
