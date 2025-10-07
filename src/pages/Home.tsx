import '../CssPages/home.css';
import { useRef } from "react";
import { useState } from 'react';
import Particles from '../components/Particles';
import PixelBlast from '../components/PixelBlast';
import { motion, useInView } from "framer-motion";
import DecryptedText from '../components/DecryptedText';
const images = import.meta.glob('../assets/Images/*.{png,webp,avif,jpg,jpeg,gif}', { eager: true }) as Record<string, { default: string }>;

export default function Home() {
  const section1Ref = useRef(null);
  const isInView = useInView(section1Ref, { amount: 0.3 });

  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("dev-jp@outlook.com"); // 🔹 cambia este texto por lo que quieras copiar
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Error copiando al portapapeles:", err);
    }
  };

  return (
    <>
      <title>Javier Prado</title>

      <h1 className='intro-text'>
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
      <p className='intro-sub-text'>
        where ideas born in the dark, built for the world.
      </p>

      <main>

        <div className="home-section-1">

          <div style={{ marginTop: '15rem', width: '100%', height: '1080px', position: 'absolute' }}>
            <Particles
              particleColors={['#ffffff', '#ffffff']}
              particleCount={250}
              particleSpread={6}
              speed={0.1}
              particleBaseSize={100}
              moveParticlesOnHover={false}
              alphaParticles={false}
              disableRotation={false}
            />
          </div>

          <div
            data-aos="fade-down-right"
            data-aos-duration="1600"
            className="profile-blur">
            <img
              className='image-profile-home'
              src={images["../assets/Images/image-profile.jpg"]?.default}
            />
            <div
              data-aos="fade-down-left"
              data-aos-duration="1600"
              className='dev-bio'>
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
                JaviZone was created by Javier, a web developer
                who believes good design should feel effortless.
                With a background in accounting, sales, and tech repair,
                he learned to see problems from different angles and craft simple,
                human-centered solutions. Now, he’s focused on growing as a full-stack
                developer, exploring new tools, and building experiences that blend clarity and emotion.
              </p>
            </div>
          </div>
          <section
            data-aos="fade-up-right"
            data-aos-duration="1600"
            className='copy-email'>
            <p>dev-jp@outlook.com</p>
            <button className="copy" onClick={handleCopy}>
              <span
                className="tooltip"
              >
                {copied ? "Copied!" : "Copy to clipboard"}
              </span>

              <span className="icon-wrapper">
                {!copied ? (
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
                ) : (
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
                )}
              </span>
            </button>
          </section>
          <section
            data-aos="fade-up-left"
            data-aos-duration="1600"
            className='dev-skills'>
            <div className="skills-svg HTML">
              <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="#ffffff"><g fill="none"><g fill="#ffffff" clip-path="url(#akarIconsHtmlFill0)"><path d="M5.08 0h1.082v1.069h.99V0h1.082v3.236H7.152V2.153h-.99v1.083H5.081V0Zm4.576 1.073h-.952V0h2.987v1.073h-.953v2.163H9.656V1.073ZM12.165 0h1.128l.694 1.137L14.68 0h1.128v3.236h-1.077V1.632l-.744 1.151h-.019l-.745-1.15v1.603h-1.058V0Zm4.181 0h1.083v2.167h1.52v1.07h-2.603V0Z" /><path fill-rule="evenodd" d="M5.046 22.072L3 4.717h18L18.953 22.07L11.99 24l-6.944-1.928Zm4.137-9.5l-.194-2.18h8.145l.19-2.128H6.664l.574 6.437h7.377l-.247 2.76l-2.374.642h-.002l-2.37-.64l-.152-1.697H7.332l.298 3.342l4.36 1.21l4.367-1.21l.532-5.964l.052-.571H9.183Z" clip-rule="evenodd" /></g><defs><clipPath id="akarIconsHtmlFill0"><path fill="#ffffff" d="M0 0h24v24H0z" /></clipPath></defs></g></svg>
            </div>
            <div className="skills-svg CSS">
              <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path fill="#ffffff" d="M7.502 0h2.578v1.078h-1.5v1.078h1.5v1.078H7.502V0Zm3.093 0h2.579v.938h-1.5v.187h1.5v2.156h-2.579v-.984h1.5v-.188h-1.5V0Zm3.095 0h2.577v.938h-1.5v.187h1.5v2.156H13.69v-.984h1.5v-.188h-1.5V0Z" /><path fill="#ffffff" fill-rule="evenodd" d="m11.991 24l-6.944-1.928L3 4.717h18L18.954 22.07L11.991 24ZM7.047 12.573l.191 2.128h7.377l-.247 2.76l-2.374.642h-.002l-2.37-.64l-.152-1.697H7.333l.298 3.342l4.36 1.21l4.367-1.21l.532-5.964l.052-.571l.384-4.309H6.664l.194 2.129h8.136l-.194 2.18H7.047Z" clip-rule="evenodd" /></svg>
            </div>
            <div className="skills-svg JS">
              <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path fill="#ffffff" d="M6 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3H6Zm7.334 13.055c.72.58 1.438.865 2.156.858c.44 0 .778-.08 1.012-.242a.75.75 0 0 0 .341-.66a.971.971 0 0 0-.34-.748c-.235-.205-.679-.41-1.332-.616c-.784-.227-1.39-.52-1.815-.88c-.418-.36-.63-.862-.638-1.507c0-.609.264-1.118.792-1.529c.514-.41 1.17-.616 1.97-.616c1.114 0 2.009.271 2.683.814l-.77 1.199a2.597 2.597 0 0 0-.935-.462a3.211 3.211 0 0 0-.946-.165c-.38 0-.685.07-.913.209c-.227.14-.34.323-.34.55c0 .25.139.462.417.638c.28.169.756.356 1.43.561c.814.242 1.394.565 1.738.968c.345.403.517.917.517 1.54c0 .638-.245 1.188-.737 1.65c-.484.455-1.188.693-2.112.715c-1.21 0-2.222-.363-3.036-1.089l.858-1.188Zm-5.53.638c.235.147.517.22.847.22c.345 0 .63-.099.858-.297c.227-.205.341-.561.341-1.067v-5.302h1.485v5.588c-.022.865-.271 1.489-.748 1.87a2.466 2.466 0 0 1-.891.484a3.296 3.296 0 0 1-.935.143c-.55 0-1.038-.095-1.463-.286c-.455-.205-.836-.568-1.144-1.089l1.034-.847c.19.257.396.451.616.583Z" /></svg>
            </div>
            <div className="skills-svg TS">
              <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path fill="#ffffff" d="M19.131 3H4.869c-.955 0-1.73.787-1.73 1.758v14.484c0 .97.775 1.758 1.73 1.758h14.262c.956 0 1.73-.787 1.73-1.758V4.758c0-.97-.774-1.758-1.73-1.758m-5.712 9.984h-2.215v6.434H9.439v-6.434H7.223v-1.441h6.196zm5.712 5.277c-.139.317-.377.552-.658.739a3 3 0 0 1-.969.386a5.6 5.6 0 0 1-1.177.12a6.5 6.5 0 0 1-1.211-.11a3.7 3.7 0 0 1-1.004-.33v-1.689l-.066-.053l.066-.015v.068q.441.357.972.545c.347.133.727.2 1.108.2c.242 0 .426-.021.589-.06a1.4 1.4 0 0 0 .415-.168a.7.7 0 0 0 .246-.253a.7.7 0 0 0-.052-.738a1.3 1.3 0 0 0-.346-.335a3 3 0 0 0-.52-.295c-.207-.095-.418-.194-.657-.292c-.589-.281-1.053-.562-1.35-.95c-.301-.35-.45-.808-.45-1.335c0-.422.08-.76.242-1.055c.173-.316.377-.548.658-.738c.277-.193.588-.334.969-.422c.38-.088.762-.133 1.177-.133s.762.024 1.073.073c.311.05.602.127.865.229v1.652a2.3 2.3 0 0 0-.415-.242a3.8 3.8 0 0 0-.97-.275a3 3 0 0 0-.45-.033a2.4 2.4 0 0 0-.553.057a1.3 1.3 0 0 0-.416.161a.8.8 0 0 0-.26.25a.6.6 0 0 0-.093.327q0 .194.104.351q.103.152.295.296c.114.091.27.183.45.274c.207.091.394.183.623.278c.311.133.588.281.83.422c.243.14.447.305.623.492c.187.175.322.387.416.633s.142.523.142.843c0 .457-.108.809-.246 1.125" /></svg>
            </div>
            <div className="skills-svg PS">
              <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path fill="#ffffff" d="M10.45 10.48a1.3 1.3 0 0 1-1 1.33a4.83 4.83 0 0 1-1.61.19c-.14 0-.15-.09-.15-.19V9.26c0-.07.07-.19.11-.19a4.91 4.91 0 0 1 1.71.11a1.28 1.28 0 0 1 .94 1.3" /><path fill="#ffffff" d="M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5m-6 11a3.48 3.48 0 0 1-1.68.54H7.98c-.28 0-.28 0-.28.27v2.32c0 .2-.06.26-.26.26H6.12c-.19 0-.24-.07-.24-.25V7.71c0-.2 0-.26.25-.26h3.13a3.34 3.34 0 0 1 1.62.47a2.75 2.75 0 0 1 1.4 2.39A2.83 2.83 0 0 1 11 13m5.92 3.3a4.62 4.62 0 0 1-2.73.19c-.272-.06-.54-.14-.8-.24a.29.29 0 0 1-.16-.2v-1.51c.32.12.62.26.93.36a3.66 3.66 0 0 0 1.61.14c.107-.02.212-.053.31-.1a.37.37 0 0 0 .08-.63a4 4 0 0 0-.73-.4c-.41-.2-.83-.36-1.22-.59a1.82 1.82 0 0 1-1-1.93a2 2 0 0 1 1.36-1.63a4.21 4.21 0 0 1 2-.17c.32 0 .63.12.95.18c.17 0 .23.14.22.31v1.17c0 .22-.05.24-.25.16a3.87 3.87 0 0 0-2-.34a.9.9 0 0 0-.28.08a.37.37 0 0 0-.1.63c.289.192.593.36.91.5c.38.19.78.34 1.15.55a1.73 1.73 0 0 1 1 1.79a1.92 1.92 0 0 1-1.26 1.64z" /></svg>
            </div>
            <div className="skills-svg TW">
              <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 512 512"><path fill="#ffffff" d="M128 204.667C145.062 136.227 187.738 102 256 102c102.4 0 115.2 77 166.4 89.833c34.138 8.56 64-4.273 89.6-38.5C494.938 221.773 452.262 256 384 256c-102.4 0-115.2-77-166.4-89.833c-34.138-8.56-64 4.273-89.6 38.5zm-128 154C17.062 290.227 59.738 256 128 256c102.4 0 115.2 77 166.4 89.833c34.138 8.56 64-4.273 89.6-38.5C366.938 375.773 324.262 410 256 410c-102.4 0-115.2-77-166.4-89.833c-34.138-8.56-64 4.273-89.6 38.5z" /></svg>
            </div>
            <div className="skills-svg VITE">
              <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path fill="#ffffff" d="m8.525 4.63l-5.132-.915a1.17 1.17 0 0 0-1.164.468a1.16 1.16 0 0 0-.07 1.28l8.901 15.58a1.182 1.182 0 0 0 2.057-.008l8.729-15.578c.49-.875-.262-1.917-1.242-1.739l-4.574.813l-.206.754l4.906-.871a.474.474 0 0 1 .498.697L12.5 20.689a.47.47 0 0 1-.5.234a.47.47 0 0 1-.326-.231L2.772 5.112a.474.474 0 0 1 .496-.7l5.133.916l.074.013z" /><path fill="#ffffff" d="m15.097 5.26l.162-.593l-.6.107zm-5.88-.506l.513.09l-.542.427z" /><path fill="#ffffff" d="m15.549 2.367l-6.1 1.26a.22.22 0 0 0-.126.077a.25.25 0 0 0-.055.142l-.375 6.685a.24.24 0 0 0 .079.194a.21.21 0 0 0 .195.05l1.698-.414c.16-.038.302.11.27.278l-.505 2.606c-.034.176.122.326.285.274l1.049-.336c.162-.052.319.098.284.274l-.801 4.093c-.05.257.272.396.407.177l.09-.147l4.97-10.464c.084-.175-.06-.375-.242-.338l-1.748.356c-.165.034-.304-.128-.258-.297l1.14-4.173c.047-.17-.093-.331-.257-.297" /></svg>
            </div>
            <div className="skills-svg REACT">
              <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path fill="#ffffff" d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236a2.236 2.236 0 0 1-2.236-2.236a2.236 2.236 0 0 1 2.235-2.236a2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622c-1.78-1.653-3.542-2.602-4.887-2.602c-.41 0-.783.093-1.106.278c-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03c-.704 3.113-.39 5.588.988 6.38c.32.187.69.275 1.102.275c1.345 0 3.107-.96 4.888-2.624c1.78 1.654 3.542 2.603 4.887 2.603c.41 0 .783-.09 1.106-.275c1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032c.704-3.11.39-5.587-.988-6.38a2.167 2.167 0 0 0-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127c.666.382.955 1.835.73 3.704c-.054.46-.142.945-.25 1.44a23.476 23.476 0 0 0-3.107-.534A23.892 23.892 0 0 0 12.769 4.7c1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28c-.686.72-1.37 1.537-2.02 2.442a22.73 22.73 0 0 0-3.113.538a15.02 15.02 0 0 1-.254-1.42c-.23-1.868.054-3.32.714-3.707c.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564c-.44-.02-.89-.034-1.345-.034c-.46 0-.915.01-1.36.034c.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093c.406.582.802 1.203 1.183 1.86c.372.64.71 1.29 1.018 1.946c-.308.655-.646 1.31-1.013 1.95c-.38.66-.773 1.288-1.18 1.87a25.64 25.64 0 0 1-4.412.005a26.64 26.64 0 0 1-1.183-1.86c-.372-.64-.71-1.29-1.018-1.946a25.17 25.17 0 0 1 1.013-1.954c.38-.66.773-1.286 1.18-1.868A25.245 25.245 0 0 1 12 8.098zm-3.635.254c-.24.377-.48.763-.704 1.16c-.225.39-.435.782-.635 1.174c-.265-.656-.49-1.31-.676-1.947c.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387c-.18.632-.405 1.282-.66 1.933a25.952 25.952 0 0 0-1.345-2.32zm3.063.675c.484.15.944.317 1.375.498c1.732.74 2.852 1.708 2.852 2.476c-.005.768-1.125 1.74-2.857 2.475c-.42.18-.88.342-1.355.493a23.966 23.966 0 0 0-1.1-2.98c.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98a23.142 23.142 0 0 0-1.086 2.964c-.484-.15-.944-.318-1.37-.5c-1.732-.737-2.852-1.706-2.852-2.474c0-.768 1.12-1.742 2.852-2.476c.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948c-.64.157-1.316.29-2.016.39a25.819 25.819 0 0 0 1.341-2.338zm-9.945.02c.2.392.41.783.64 1.175c.23.39.465.772.705 1.143a22.005 22.005 0 0 1-2.006-.386c.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423c.23 1.868-.054 3.32-.714 3.708c-.147.09-.338.128-.563.128c-1.012 0-2.514-.807-4.11-2.28c.686-.72 1.37-1.536 2.02-2.44c1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532c.66.905 1.345 1.727 2.035 2.446c-1.595 1.483-3.092 2.295-4.11 2.295a1.185 1.185 0 0 1-.553-.132c-.666-.38-.955-1.834-.73-3.703c.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034c.46 0 .915-.01 1.36-.034c-.44.572-.895 1.095-1.345 1.565c-.455-.47-.91-.993-1.36-1.565z" /></svg>
            </div>
            <div className="skills-svg GH">
              <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 20 20"><path fill="#ffffff" d="M20 10.25c0 2.234-.636 4.243-1.908 6.027c-1.271 1.784-2.914 3.018-4.928 3.703c-.234.045-.406.014-.514-.093a.539.539 0 0 1-.163-.4V16.67c0-.863-.226-1.495-.677-1.895a8.72 8.72 0 0 0 1.335-.24c.394-.107.802-.28 1.223-.52a3.66 3.66 0 0 0 1.055-.888c.282-.352.512-.819.69-1.402c.178-.583.267-1.252.267-2.008c0-1.077-.343-1.994-1.028-2.75c.32-.81.286-1.717-.105-2.723c-.243-.08-.594-.03-1.054.147a6.94 6.94 0 0 0-1.198.587l-.495.32a9.03 9.03 0 0 0-2.5-.346a9.03 9.03 0 0 0-2.5.347a11.52 11.52 0 0 0-.553-.36c-.23-.143-.593-.314-1.088-.514c-.494-.2-.868-.26-1.12-.18c-.381 1.005-.412 1.912-.09 2.722c-.686.756-1.03 1.673-1.03 2.75c0 .756.09 1.423.268 2.002c.178.578.406 1.045.683 1.401a3.53 3.53 0 0 0 1.048.894c.421.24.83.414 1.224.52c.395.108.84.188 1.335.241c-.347.32-.56.779-.638 1.375a2.539 2.539 0 0 1-.586.2a3.597 3.597 0 0 1-.742.067c-.287 0-.57-.096-.853-.287c-.282-.192-.523-.47-.723-.834a2.133 2.133 0 0 0-.631-.694c-.256-.178-.471-.285-.645-.32l-.26-.04c-.182 0-.308.02-.378.06c-.07.04-.09.09-.065.153a.738.738 0 0 0 .117.187a.961.961 0 0 0 .17.16l.09.066c.192.09.38.259.567.508c.187.249.324.476.41.68l.13.307c.113.338.304.612.574.821c.269.21.56.343.872.4c.312.058.614.09.905.094c.29.004.532-.011.723-.047l.299-.053c0 .338.002.734.007 1.188l.006.72c0 .16-.056.294-.17.4c-.112.108-.286.139-.52.094c-2.014-.685-3.657-1.92-4.928-3.703C.636 14.493 0 12.484 0 10.25c0-1.86.447-3.574 1.341-5.145a10.083 10.083 0 0 1 3.64-3.73A9.6 9.6 0 0 1 10 0a9.6 9.6 0 0 1 5.02 1.375a10.083 10.083 0 0 1 3.639 3.73C19.553 6.675 20 8.391 20 10.25Z" /></svg>
            </div>
            <div className="skills-svg VS">
              <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="#ffffffff"><g fill="none"><g fill="#ffffffff" clip-path="url(#akarIconsVscodeFill0)"><path d="M.228 8.37s-.584-.427.117-.995L1.98 5.897s.467-.497.962-.064l15.081 11.542v5.534s-.007.87-1.11.774L.227 8.369Z" /><path d="M4.116 11.937L.228 15.509s-.4.3 0 .837l1.805 1.66s.429.465 1.062-.065l4.121-3.158l-3.1-2.846Zm6.824.029l7.13-5.502l-.047-5.505s-.305-1.202-1.32-.576L7.216 9.11l3.724 2.856Z" /><path d="M16.912 23.69c.414.428.916.288.916.288l5.556-2.767c.711-.49.611-1.098.611-1.098V3.588c0-.726-.735-.977-.735-.977L18.444.264c-1.052-.657-1.741.119-1.741.119s.886-.645 1.32.576v21.85c0 .15-.032.297-.095.43c-.127.259-.402.5-1.062.4l.046.051Z" /></g><defs><clipPath id="akarIconsVscodeFill0"><path fill="#000000" d="M0 0h24v24H0z" /></clipPath></defs></g></svg>
            </div>
          </section>

        </div>

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

          <h2
            className='context-tittle'
            data-aos="zoom-in"
            data-aos-duration="1000"
          > Here </h2>

          <p
            className='context-sub-tittle'
            data-aos="zoom-in"
            data-aos-duration="3000"
          > My ideas come to life </p>

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

          <section className='dark-social'>
            <a href='https://www.instagram.com/_07_javi_/' target='_blank'
              data-aos="zoom-in"
              data-aos-duration="2500">
              <div className="dark-blur-icons IG">
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" viewBox="0 0 24 24">
                  <path fill="evenodd" fill-rule="evenodd" d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z" clip-rule="evenodd" />
                </svg>
              </div>
            </a>

            <a href='https://www.youtube.com/@Drm-Javi/videos' target='_blank'
              data-aos="zoom-in"
              data-aos-duration="1000">
              <div className="dark-blur-icons YT">
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M21.7 8.037a4.26 4.26 0 0 0-.789-1.964 2.84 2.84 0 0 0-1.984-.839c-2.767-.2-6.926-.2-6.926-.2s-4.157 0-6.928.2a2.836 2.836 0 0 0-1.983.839 4.225 4.225 0 0 0-.79 1.965 30.146 30.146 0 0 0-.2 3.206v1.5a30.12 30.12 0 0 0 .2 3.206c.094.712.364 1.39.784 1.972.604.536 1.38.837 2.187.848 1.583.151 6.731.2 6.731.2s4.161 0 6.928-.2a2.844 2.844 0 0 0 1.985-.84 4.27 4.27 0 0 0 .787-1.965 30.12 30.12 0 0 0 .2-3.206v-1.516a30.672 30.672 0 0 0-.202-3.206Zm-11.692 6.554v-5.62l5.4 2.819-5.4 2.801Z" clip-rule="evenodd" />
                </svg>
              </div>
            </a>

            <a href='https://github.com/Dv-Javi' target='_blank'
              data-aos="zoom-in"
              data-aos-duration="2500">
              <div className="dark-blur-icons GH">
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z" clip-rule="evenodd" />
                </svg>
              </div>
            </a>

          </section>
        </div>
      </main>
    </>
  );
}
