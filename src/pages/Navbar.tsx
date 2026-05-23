import { NavLink } from "react-router-dom";
import "@/CssPages/nav.css";

const images = import.meta.glob(
  "@/assets/Images/Nav/*.{png,webp,avif,jpg,jpeg,svg}",
  { eager: true },
) as Record<string, { default: string }>;
const Navbar = () => {
  return (
    <>
      <nav>
        <div className="nav-logo-left">
          <NavLink to="/">
            <img
              data-aos="fade-down"
              data-aos-duration="1800"
              className="portfolio-logo"
              src={images["/src/assets/Images/Nav/Javi-logo.svg"]?.default}
            />
          </NavLink>
        </div>
        <div className="nav-logo-right">
          <a href="mailto:dev-jp@outlook.com" target="_blank">
            <img
              data-aos="fade-down"
              data-aos-duration="3000"
              className="outlook-logo"
              src={images["/src/assets/Images/Nav/outlook.svg"]?.default}
            />
          </a>
        </div>
        <div className="nav-container">
          <ul className="routes">
            <li data-aos="fade-down" data-aos-duration="2000">
              <NavLink to="/Projects">Projects</NavLink>
            </li>
            <li data-aos="fade-down" data-aos-duration="2200">
              <NavLink to="/About">About</NavLink>
            </li>

            <li data-aos="fade-down" data-aos-duration="2800">
              <a
                href="https://drive.google.com/file/d/1FsbPk7JvVt7xrduToyQ_w7OH00YWnH60/view?usp=drive_link"
                target="_blank"
              >
                Resume
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
