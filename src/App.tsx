import { HashRouter, Route, Routes } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import NotFound from './pages/NotFound';
import Projects from './pages/Projects';
import emailjs from '@emailjs/browser';
import AboutMe from './pages/AboutMe';
import Navbar from './pages/Navbar';
import Home from './pages/Home';
import Lenis from '@studio-freight/lenis'; // puedes cambiar a 'lenis' si actualizás el paquete
import './App.css';

function App() {
  const images = import.meta.glob('./assets/Images/*.{png,webp,avif,jpg,jpeg}', { eager: true }) as Record<
    string,
    { default: string }
  >;

  const form = useRef<HTMLFormElement | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.current) return;

    setIsSending(true);
    setIsSubmitted(true);

    emailjs
      .sendForm('Portfolio_dm', 'portfolio_template', form.current, {
        publicKey: '7VuSwVcSerDi5fylS',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          setIsSending(false);
        },
        (error) => {
          console.log('FAILED...', error.text);
          setIsSending(false);
          setIsSubmitted(false);
        }
      );
  };

  // Mantén el title en su propio useEffect (como ya tenías)
  useEffect(() => {
    document.title = 'Javier Prado';
  }, []);

  // Lenis init (corregido: no usar `smoothTouch`)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,       // easing duration
      smoothWheel: true,   // suaviza wheel/mouse
      // syncTouch: true,  // <-- habilita esta si querés imitar suavizado en touch (puede ser inestable en algunos iOS)
      // touchMultiplier: 1, // ajustar fuerza del touch si lo necesitás
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <><div className="background"/>
    
      <HashRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Projects' element={<Projects />} />
          <Route path='/AboutMe' element={<AboutMe />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </HashRouter>

      <section>
        <button className="feedback-tag" id="feedback-tag" onClick={() => setShowModal(true)}>
          Feedback
        </button>

        {/* Overlay */}
        {showModal && <div className="modal-overlay" onClick={() => setShowModal(false)} />}

        {/* Modal */}
        <div className={`form-container ${showModal ? 'visible' : ''}`} onClick={(e) => e.stopPropagation()}>
          <form className="form" ref={form} onSubmit={sendEmail}>
            {!isSubmitted ? (
              <>
                <img className="tiny-picture" src={images['./assets/Images/slf.jpeg']?.default} />
                <div className="image-title">Any insights?</div>

                <label className="input-data" htmlFor="name-input">
                  <span className="icons-container">
                    Name
                    <img className="icons" src={images['./assets/Images/name.png']?.default} />
                  </span>
                </label>
                <input className="input" type="text" name="user_name" id="name-input" required />

                <label className="input-data" htmlFor="msg-input">
                  <span className="icons-container">
                    Message
                    <img className="icons" src={images['./assets/Images/message.png']?.default} />
                  </span>
                </label>
                <textarea className="input" name="message" id="msg-input" required />

                <button className="submit-button" type="submit">
                  {isSending ? 'Sending...' : 'Submit'}
                </button>
              </>
            ) : (
              <div className="form-submitted-container">
                <div className="form-submit-btn sent">
                  <img className="sent-picture" src={images['./assets/Images/dvp.avif']?.default} />
                </div>
                <p className="thank-you-message">¡Appreciate it, I'll factor that in.!</p>
              </div>
            )}
          </form>
        </div>
      </section>
    </>
  );
}

export default App;
