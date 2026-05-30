import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Galaxy from "@/components/ui/Backgrounds/Space/Galaxy";
import Navbar from "@/components/layout/Navbar/Navbar";
import FeedbackModal from "@/components/layout/FeedbackModal/FeedbackModal";
import { useLenis } from "@/hooks/useLenis";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
  }, [pathname]);

  return null;
}

function GalaxyBackground() {
  return (
    <div className="bg-space">
      <Galaxy
        mouseRepulsion
        mouseInteraction
        density={1}
        glowIntensity={0.2}
        saturation={0}
        hueShift={120}
        twinkleIntensity={0.3}
        rotationSpeed={0.1}
        repulsionStrength={1}
        autoCenterRepulsion={0}
        starSpeed={0.2}
        speed={0.5}
      />
    </div>
  );
}

export default function MainLayout() {
  const lenisRef = useLenis();

  useEffect(() => {
    document.title = "Javier Prado";
  }, []);

  return (
    <>
      <Navbar />
      <ScrollToTop />
      <GalaxyBackground />
      <Outlet />
      <FeedbackModal lenisRef={lenisRef} />
    </>
  );
}
