import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import Galaxy from "@/Components/Bg-about/Galaxy";
import NotFound from "@/pages/NotFound";
import Projects from "@/pages/Projects";
import emailjs from "@emailjs/browser";
import About from "@/pages/About";
import Me from "@/pages/Me";
import Navbar from "@/pages/Navbar";
import Home from "@/pages/Home";
import Lenis from "lenis";
import "@/app.css";

const Background = () => {
  return (
    <div className="about-bg">
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
};

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
  }, [pathname]);

  return null;
}

function App() {
  const images = import.meta.glob(
    "@/assets/Images/*.{png,webp,avif,jpg,jpeg,svg}",
    { eager: true },
  ) as Record<string, { default: string }>;

  const form = useRef<HTMLFormElement | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const lenisRef = useRef<Lenis | null>(null);
  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.current) return;

    setIsSending(true);
    setIsSubmitted(true);

    emailjs
      .sendForm("Portfolio_Dm", "portfolio_template", form.current, {
        publicKey: "7VuSwVcSerDi5fylS",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          setIsSending(false);
        },
        (error) => {
          console.log("FAILED...", error.text);
          setIsSending(false);
          setIsSubmitted(false);
        },
      );
  };

  useEffect(() => {
    document.title = "Javier Prado";
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current;
    const html = document.documentElement;
    const body = document.body;

    if (showModal) {
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
  }, [showModal]);

  return (
    <>
      <HashRouter>
        <Navbar />
        <ScrollToTop />
        <Background />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Projects" element={<Projects />} />
          <Route path="/About" element={<About />} />
          <Route path="/Me" element={<Me />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>

      <section>
        <button
          className="feedback-tag"
          id="feedback-tag"
          onClick={() => setShowModal(true)}
        >
          Feedback
        </button>

        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)} />
        )}

        <div
          className={`form-container ${showModal ? "visible" : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          <form className="form" ref={form} onSubmit={sendEmail}>
            {!isSubmitted ? (
              <>
                <img
                  className="tiny-picture"
                  src={images["/src/assets/Images/image-profile.avif"]?.default}
                />
                <div className="image-title">Any insights?</div>

                <label className="input-data" htmlFor="name-input">
                  <span className="icons-container">
                    Name
                    <svg
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m8 9 3 3-3 3m5 0h3M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
                      />
                    </svg>
                  </span>
                </label>

                <input
                  className="input"
                  type="text"
                  name="user_name"
                  id="name-input"
                  placeholder="Enter your name"
                  autoComplete="name"
                  minLength={2}
                  maxLength={60}
                  pattern="^[A-Za-zÀ-ÿ\s]+$"
                  required
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(
                      /[^A-Za-zÀ-ÿ\s]/g,
                      "",
                    );
                  }}
                />

                <label className="input-data" htmlFor="msg-input">
                  <span className="icons-container">
                    Message
                    <svg
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 17h6l3 3v-3h2V9h-2M4 4h11v8H9l-3 3v-3H4V4Z"
                      />
                    </svg>
                  </span>
                </label>

                <textarea
                  className="input"
                  id="msg-input"
                  name="message"
                  placeholder="Write your feedback..."
                  minLength={10}
                  maxLength={500}
                  rows={4}
                  required
                ></textarea>
                <button className="submit-button" type="submit">
                  {isSending ? "Sending..." : "Submit"}
                </button>
              </>
            ) : (
              <div className="form-submitted-container">
                <div className="form-submit-btn sent">
                  <img
                    className="sent-picture"
                    src={
                      images["/src/assets/Images/developer-mac.svg"]?.default
                    }
                  />
                </div>
                <p className="thank-you-message">
                  ¡Appreciate it, I'll factor that in.!
                </p>
              </div>
            )}
          </form>
        </div>
      </section>
    </>
  );
}

export default App;
