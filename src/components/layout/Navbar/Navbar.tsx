import { NavLink } from "react-router-dom";
import { assetPaths, getAsset, type ImageModuleMap } from "@/utils/assets";
import "./navbar.css";

const images = import.meta.glob(
  "@/assets/Images/Nav/*.{png,webp,avif,jpg,jpeg,svg}",
  { eager: true },
) as ImageModuleMap;

export default function Navbar() {
  return (
    <nav>
      <div className="nav-logo-left">
        <NavLink to="/">
          <img
            data-aos="fade-down"
            data-aos-duration="1800"
            className="portfolio-logo"
            alt="Javier Prado"
            src={getAsset(images, assetPaths.navLogo)}
          />
        </NavLink>
      </div>
      <div className="nav-logo-right">
        <a href="mailto:dev-jp@outlook.com" target="_blank" rel="noreferrer">
          <img
            data-aos="fade-down"
            data-aos-duration="3000"
            className="outlook-logo"
            alt="Email"
            src={getAsset(images, assetPaths.navOutlook)}
          />
        </a>
      </div>
      <div className="nav-container">
        <ul className="routes">
          <li data-aos="fade-down" data-aos-duration="2000">
            <NavLink to="/projects">Projects</NavLink>
          </li>
          <li data-aos="fade-down" data-aos-duration="2200">
            <NavLink to="/about">About</NavLink>
          </li>
          <li data-aos="fade-down" data-aos-duration="2600">
            <NavLink to="/me">Me?</NavLink>
          </li>
          <li data-aos="fade-down" data-aos-duration="2800">
            <a
              href="https://drive.google.com/file/d/1fY42RL4LrlXi3f47XOh2duB7QCtYHazT/view?usp=sharing"
              target="_blank"
              rel="noreferrer"
            >
              Resume
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
