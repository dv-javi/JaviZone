import "@/CssPages/about.css";
const images = import.meta.glob(
  "@/assets/Images/*.{png,webp,avif,jpg,jpeg,svg}",
  { eager: true },
) as Record<string, { default: string }>;

const bioSections = [
  {
    subtitle: "Today",
    index: "01",
    text: "I'm 19, a bilingual frontend-focused full stack student with a passion for modern web design. I'm also a drummer and Minecraft server developer blending creativity, logic, and a love for clean digital experiences.",
  },
  {
    subtitle: "Childhood",
    index: "02",
    text: "Born with drumsticks in my hands — rhythm was my first language. Between beats, I was glued to screens tweaking Minecraft worlds and messing with code, building skills before I even knew it. Everything I loved as a kid built the path I walk today.",
  },
  {
    subtitle: "Goals",
    index: "03",
    text: "I dream of becoming a great musician creating art that moves people. In tech, I aim to innovate, build meaningful experiences, and push boundaries with every line of code. Through music and programming, I want to inspire and give back. This is just the beginning and I'm all in.",
  },
];

export default function AboutMe() {
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
          src={images["/src/assets/Images/lanyard.svg"]?.default}
        />
      </header>
    </>
  );
}
