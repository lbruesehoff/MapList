// Custom React Hook to track window size
import { useState, useEffect } from "react";

export function useWindowSize() {
  const [size, setSize] = useState({
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () =>
      setSize({
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
      });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
}
