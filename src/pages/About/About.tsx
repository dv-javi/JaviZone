import { assetPaths, getAsset, type ImageModuleMap } from "@/utils/assets";
import { bioSections } from "@/data/bioSections";
import "./about.css";

const images = import.meta.glob(
  "@/assets/Images/*.{png,webp,avif,jpg,jpeg,svg}",
  { eager: true },
) as ImageModuleMap;

export default function About() {
  return (
    <>
      <title>Javier Prado</title>
      <header className="header-grid">
        <div className="bio-container">
          <div className="bio-header">
            <span className="bio-label">Bio</span>
            <span className="bio-divider" />
          </div>

          {bioSections.map(({ subtitle, index, text }) => (
            <div
              className="bio-section"
              key={subtitle}
              data-aos="fade-up"
              data-aos-duration={800 + parseInt(index) * 300}
            >
              <div className="bio-section-header">
                <span className="bio-index">{index}</span>
                <p className="sub-titles">{subtitle}</p>
              </div>
              <p className="bio-texts">{text}</p>
            </div>
          ))}

          <p className="signature">Javier Prado</p>
        </div>

        <img
          data-aos="fade-up"
          data-aos-duration="1200"
          className="lanyard"
          alt="Javier Prado wearing a conference lanyard with name badge"
          src={getAsset(images, assetPaths.lanyard)}
        />
        {/* <section className="main-about">
          <div className="my-core-values">
            <h1 className="core-values-title">My Core Values</h1>
          </div>
        </section> */}
      </header>
    </>
  );
}
