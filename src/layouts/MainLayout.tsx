import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
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

function SpaceBackground() {
  return <div className="bg-space"></div>;
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
      {!isHome && <SpaceBackground />}
      <Outlet />
      <FeedbackModal lenisRef={lenisRef} />
    </>
  );
}
