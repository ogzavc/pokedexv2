import * as React from "react";

const useIsMobile = (mobileScreenSize = 768) => {
  const [isMobile, setIsMobile] = React.useState(() => {
    if (typeof window === "undefined") {
      // Return a default value when SSR or during initial load
      return false;
    }
    return window.matchMedia(`(max-width: ${mobileScreenSize}px)`).matches;
  });

  React.useEffect(() => {
    if (typeof window.matchMedia !== "function") {
      console.error("matchMedia not supported by browser!");
      return;
    }

    const mediaListener = window.matchMedia(
      `(max-width: ${mobileScreenSize}px)`
    );
    const checkIsMobile = (event) => {
      setIsMobile(event.matches);
    };

    setIsMobile(mediaListener.matches);

    try {
      mediaListener.addEventListener("change", checkIsMobile);
    } catch {
      mediaListener.addListener(checkIsMobile);
    }

    return () => {
      try {
        mediaListener.removeEventListener("change", checkIsMobile);
      } catch {
        mediaListener.removeListener(checkIsMobile);
      }
    };
  }, [mobileScreenSize]);

  return isMobile;
};

export default useIsMobile;
