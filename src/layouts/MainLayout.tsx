import FeedbackModal from "@/components/layout/FeedbackModal/FeedbackModal";
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

export default function MainLayout() {
  const lenisRef = useLenis();

  useEffect(() => {
    document.title = "Javier Prado";
  }, []);

  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Outlet />
      <FeedbackModal lenisRef={lenisRef} />
    </>
  );
}
