import FeedbackModal from "@/components/layout/FeedbackModal/FeedbackModal";
import PixelSnow from "@/components/ui/Backgrounds/Pixel/PixelSnow";
import Navbar from "@/components/layout/Navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import { useLenis } from "@/hooks/useLenis";
import { useEffect } from "react";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
  }, [pathname]);

  return null;
}

function PixelBackground() {
  return (
    <div className="background-pixel">
      <PixelSnow
        color="#ffffff"
        flakeSize={0.01}
        minFlakeSize={1.25}
        pixelResolution={200}
        speed={1.25}
        density={0.3}
        direction={125}
        brightness={1}
        depthFade={8}
        farPlane={20}
        gamma={0.4545}
        variant="square"
      />
    </div>
  );
}

export default function MainLayout() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const lenisRef = useLenis();

  useEffect(() => {
    document.title = "Javier Prado";
  }, []);

  return (
    <>
      <Navbar />
      <ScrollToTop />
      {!isHome && <PixelBackground />}
      <Outlet />
      <FeedbackModal lenisRef={lenisRef} />
    </>
  );
}
