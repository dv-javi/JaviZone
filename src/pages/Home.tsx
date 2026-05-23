import "@/CssPages/home.css";
import { useRef, useState } from "react";
import PixelBlast from "@/Components/Bg-blast/PixelBlast";
import { motion, useInView } from "framer-motion";
import DecryptedText from "@/Components/TextAnimations/DecryptedText/DecryptedText";

const images = import.meta.glob(
  "../assets/Images/*.{png,webp,avif,jpg,jpeg,gif,svg}",
  { eager: true },
) as Record<string, { default: string }>;

const ClipboardIcon = () => (
  <svg
    className="clipboard"
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    viewBox="0 0 6.35 6.35"
  >
    <path
      d="M2.43.265c-.3 0-.548.236-.573.53h-.328a.74.74 0 0 0-.735.734v3.822a.74.74 0 0 0 .735.734H4.82a.74.74 0 0 0 .735-.734V1.529a.74.74 0 0 0-.735-.735h-.328a.58.58 0 0 0-.573-.53zm0 .529h1.49c.032 0 .049.017.049.049v.431c0 .032-.017.049-.049.049H2.43c-.032 0-.05-.017-.05-.049V.843c0-.032.018-.05.05-.05zm-.901.53h.328c.026.292.274.528.573.528h1.49a.58.58 0 0 0 .573-.529h.328a.2.2 0 0 1 .206.206v3.822a.2.2 0 0 1-.206.205H1.53a.2.2 0 0 1-.206-.205V1.529a.2.2 0 0 1 .206-.206z"
      fill="currentColor"
    />
  </svg>
);

const CheckmarkIcon = () => (
  <svg
    className="checkmark"
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    viewBox="0 0 24 24"
  >
    <path
      d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
      fill="currentColor"
    />
  </svg>
);

const InstagramIcon = () => (
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="50"
    height="50"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      fillRule="evenodd"
      d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"
      clipRule="evenodd"
    />
  </svg>
);

const YoutubeIcon = () => (
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="50"
    height="50"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      fillRule="evenodd"
      d="M21.7 8.037a4.26 4.26 0 0 0-.789-1.964 2.84 2.84 0 0 0-1.984-.839c-2.767-.2-6.926-.2-6.926-.2s-4.157 0-6.928.2a2.836 2.836 0 0 0-1.983.839 4.225 4.225 0 0 0-.79 1.965 30.146 30.146 0 0 0-.2 3.206v1.5a30.12 30.12 0 0 0 .2 3.206c.094.712.364 1.39.784 1.972.604.536 1.38.837 2.187.848 1.583.151 6.731.2 6.731.2s4.161 0 6.928-.2a2.844 2.844 0 0 0 1.985-.84 4.27 4.27 0 0 0 .787-1.965 30.12 30.12 0 0 0 .2-3.206v-1.516a30.672 30.672 0 0 0-.202-3.206Zm-11.692 6.554v-5.62l5.4 2.819-5.4 2.801Z"
      clipRule="evenodd"
    />
  </svg>
);

const GithubIcon = () => (
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="50"
    height="50"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      fillRule="evenodd"
      d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z"
      clipRule="evenodd"
    />
  </svg>
);

export default function Home() {
  const section1Ref = useRef(null);
  const isInView = useInView(section1Ref, { amount: 0.3 });
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("dev-jp@outlook.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Error copiando al portapapeles:", err);
    }
  };

  return (
    <>
      <title>Javier Prado</title>
      <div className="home-background" />
      <h1 className="intro-text">
        <DecryptedText
          text="Welcome to JaviZone"
          animateOn="view"
          revealDirection="center"
          speed={60}
          maxIterations={50}
          characters="ABCD1234!?"
          parentClassName="all-letters"
          encryptedClassName="encrypted"
        />
      </h1>
      <p className="intro-sub-text">
        where ideas born in the dark, built for the world.
      </p>

      <main>
        <section className="home-section-1">
          <div
            data-aos="fade-down"
            data-aos-duration="2500"
            data-aos-anchor-placement="center-center"
            className="profile-blur"
          >
            <img
              className="image-profile-home"
              src={images["../assets/Images/image-profile.svg"]?.default}
            />
          </div>

          <section className="section-1-container">
            <div
              data-aos="fade-down"
              data-aos-duration="2500"
              data-aos-anchor-placement="center-center"
              className="dev-bio"
            >
              <h1>
                <DecryptedText
                  text="Who coded this?"
                  animateOn="both"
                  revealDirection="center"
                  speed={60}
                  maxIterations={70}
                  characters="ABCD1234!?"
                  parentClassName="all-letters"
                  encryptedClassName="encrypted"
                />
              </h1>
              <p>
                Javi Zone was created by Javier, a web developer who believes
                great design should feel effortless. With a background in
                accounting, sales, and tech repair, he approaches problems from
                multiple angles to create simple, human-centered solutions. Now,
                he's focused on growing as a full-stack developer and building
                clear, engaging experiences.
              </p>
            </div>

            <section
              data-aos="fade-up"
              data-aos-duration="2500"
              data-aos-anchor-placement="center-center"
              className="copy-email"
            >
              <p>dev-jp@outlook.com</p>
              <button className="copy" onClick={handleCopy}>
                <span className="tooltip">
                  {copied ? "Copied!" : "Copy to clipboard"}
                </span>
                <span className="icon-wrapper">
                  {copied ? <CheckmarkIcon /> : <ClipboardIcon />}
                </span>
              </button>
            </section>
          </section>
        </section>

        <div className="home-section-2" ref={section1Ref}>
          <PixelBlast
            variant="circle"
            pixelSize={3}
            color="#82868659"
            patternScale={3}
            patternDensity={1}
            pixelSizeJitter={0.5}
            enableRipples
            rippleSpeed={0.4}
            rippleThickness={0.12}
            rippleIntensityScale={1}
            speed={0.6}
            edgeFade={0.25}
            transparent
          />

          <div className="section-2-container">
            <h2
              className="context-tittle"
              data-aos="zoom-in"
              data-aos-duration="1000"
            >
              Here
            </h2>
            <p
              className="context-sub-tittle"
              data-aos="zoom-in"
              data-aos-duration="3000"
            >
              My ideas come to life
            </p>

            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width="200"
              height="200"
              viewBox="0 0 512 512"
              className="rotating-bat-3d"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={
                isInView
                  ? {
                      scale: [0.6, 0.7, 0.7],
                      opacity: 1,
                      rotateY: [0, 360],
                      rotateX: [0, 10, -10, 0],
                      y: [5, -5, 5],
                    }
                  : { scale: 0.6, opacity: 0 }
              }
              transition={{
                scale: { duration: 1.5, ease: "easeOut" },
                opacity: { duration: 0.8 },
                rotateY: { repeat: Infinity, duration: 8, ease: "linear" },
                rotateX: { repeat: Infinity, duration: 8, ease: "easeInOut" },
                y: { repeat: Infinity, duration: 4, ease: "easeInOut" },
              }}
            >
              <path
                fill="#ffffff"
                d="M384 16c48 32 64 80 64 112c0 128 0 256-32 368l-16-112c-48 32-112 64-144 64s-96-32-144-64L96 496C64 384 64 256 64 128c0-32 16-80 64-112c-16 48-16 96 0 128c64-32 192-32 256 0c16-32 16-80 0-128zm0 256c-33.7 46.8-52 57.2-112 80c33.5 32 95.5 21.5 128-16c14.1-16.3 6.8-44.6-16-64zm-256 0c-22.8 19.4-30.1 47.7-16 64c32.5 37.5 94.5 48 128 16c-60-22.8-78.3-33.2-112-80z"
              />
            </motion.svg>

            <section className="dark-social">
              <a
                href="https://www.instagram.com/_07_javi_/"
                target="_blank"
                data-aos="zoom-in"
                data-aos-duration="2200"
              >
                <div className="dark-blur-icons IG">
                  <InstagramIcon />
                </div>
              </a>
              <a
                href="https://www.youtube.com/@Drm-Javi/videos"
                target="_blank"
                data-aos="zoom-in"
                data-aos-duration="1600"
              >
                <div className="dark-blur-icons YT">
                  <YoutubeIcon />
                </div>
              </a>
              <a
                href="https://github.com/Dv-Javi"
                target="_blank"
                data-aos="zoom-in"
                data-aos-duration="2200"
              >
                <div className="dark-blur-icons GH">
                  <GithubIcon />
                </div>
              </a>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
