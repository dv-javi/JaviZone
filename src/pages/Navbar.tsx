import { NavLink, } from 'react-router-dom'
import '../CssPages/nav.css'

const images = import.meta.glob('../assets/Images/*.{png,webp,avif,jpg,jpeg}', { eager: true }) as Record<string, { default: string }>;
const Navbar = () => {

  return (
    <>
      <nav>
        <div className='page-logo'>
          <NavLink to="/">
            <img
              data-aos="fade-down"
              data-aos-duration="1800"
              className="portfolio-logo"
              src={images['../assets/Images/Javi-logo.png']?.default}
            />
          </NavLink>
        </div>
        <div className="nav-container">
          <ul className='routes'>
            <li data-aos="fade-down" data-aos-duration="2200"><NavLink to="/Projects">Projects</NavLink></li>
            <li data-aos="fade-down" data-aos-duration="2400"><NavLink to="/AboutMe">AboutMe</NavLink></li>
            <li data-aos="fade-down" data-aos-duration="2800"><a href='https://drive.google.com/file/d/1lRNsq3vWGioND7Q15XhILPyqDf8PB9kq/view?usp=sharing' target='_blank'>Resume</a></li>
          </ul>
        </div>
        <div className="page-contact">
          <a href='mailto:dev-jp@outlook.com' target='_blank'>
            <img className='contact-logo' src={images['../assets/Images/outlook.webp']?.default} />
          </a>
          <a href='https://www.linkedin.com/in/javier-prado07' target='_blank'>
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="-2 -2 24 24" fill="#ffffff"><g fill="#ffffff"><path d="M15 11.13v3.697h-2.143v-3.45c0-.866-.31-1.457-1.086-1.457c-.592 0-.945.398-1.1.784c-.056.138-.071.33-.071.522v3.601H8.456s.029-5.842 0-6.447H10.6v.913l-.014.021h.014v-.02c.285-.44.793-1.066 1.932-1.066c1.41 0 2.468.922 2.468 2.902zM6.213 5.271C5.48 5.271 5 5.753 5 6.385c0 .62.466 1.115 1.185 1.115h.014c.748 0 1.213-.496 1.213-1.115c-.014-.632-.465-1.114-1.199-1.114zm-1.086 9.556h2.144V8.38H5.127v6.447z" /><path d="M4 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4zm0-2h12a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z" /></g></svg>
          </a>
        </div>
      </nav>
    </>
  );
}
export default Navbar;
