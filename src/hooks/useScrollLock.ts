import { useEffect, type RefObject } from "react";
import type Lenis from "lenis";

export function useScrollLock(
  locked: boolean,
  lenisRef?: RefObject<Lenis | null>,
) {
  useEffect(() => {
    const lenis = lenisRef?.current;
    const html = document.documentElement;
    const body = document.body;

    if (locked) {
      const currentScroll = lenis ? lenis.scroll : window.scrollY;
      lenis?.stop();
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
      body.style.touchAction = "none";
      body.dataset.scroll = String(currentScroll);
    } else {
      html.style.overflow = "";
      body.style.overflow = "";
      body.style.touchAction = "";

      const savedScroll = parseFloat(body.dataset.scroll || "0");
      window.scrollTo(0, savedScroll);
      lenis?.start();
    }

    return () => {
      html.style.overflow = "";
      body.style.overflow = "";
      body.style.touchAction = "";
    };
  }, [locked, lenisRef]);
}
