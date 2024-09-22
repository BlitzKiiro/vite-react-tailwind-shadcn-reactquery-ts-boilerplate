import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useScroll = () => {
  const { pathname } = useLocation();
  const { hash } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        const yOffset = -100;
        const y =
          element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  }, [pathname, hash]);
};

export default useScroll;
